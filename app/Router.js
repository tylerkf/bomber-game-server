const url = require('url');
const WebSocket = require('ws');

const GameStateMessage = require('./message/send/GameStateMessage.js');
const GameStateUpdateMessage = require('./message/send/GameStateUpdateMessage.js');
const ConsoleMessage = require('./message/send/ConsoleMessage.js');

const PlayerStateHandler = require('./message/recieve/PlayerStateHandler.js');
const PlaceBombHandler = require('./message/recieve/PlaceBombHandler.js');

const Authenticator = require('./utils/Authenticator.js');

class Router {

  constructor(game, server) {
    this.game = game;
    this.authenticator = new Authenticator(game);

    this.wss = new WebSocket.Server({
       server: server,
       verifyClient: this.authenticator.onHandshake
    });

    this.handlers = {};
    this.handlers['player state'] = new PlayerStateHandler();
    this.handlers['place bomb'] = new PlaceBombHandler(this.game);

    this.wss.on('connection', (ws, req) => this.onConnection(ws, req));

    let gameStateUpdate = new GameStateUpdateMessage(this.game);
    setInterval(() => {
      this.broadcastAll(gameStateUpdate);
    }, 33);
  }

  onConnection(ws, req) {
    const player = this.game.addPlayer(req.requestedName);
    ws.player = player;

    let welcome = new ConsoleMessage(ws.player.name + ' joined the game', 'Server');
    this.broadcastAll(welcome);

    let gameState = new GameStateMessage(this.game);
    ws.send(gameState.asString());

    ws.on('message', message => this.onMessage(message, ws))
    ws.on('close', () => this.onClose(ws));
  }

  onClose(ws) {
    this.game.removePlayer(ws.player);
    let leaving = new ConsoleMessage(ws.player.name + ' left the game', 'Server');
    this.broadcastAll(leaving);
  }

  onMessage(message, ws) {
    const data = JSON.parse(message);
    const player = ws.player;

    try {
      this.handlers[data.type].handle(player, data);
    } catch(error) {
      console.error('Failed to handle server message from ' + player.name);
      console.error(error);
    }
  }

  broadcastAll(message, except = '') {
    let bytes = message.asString();

    if(message instanceof ConsoleMessage) {
      console.log('broadcast: ' + message.text);
    }

    this.wss.clients.forEach(ws => {
      if(ws.readyState === WebSocket.OPEN && !(ws.player && ws.player.name === except)) {
        ws.send(bytes);
      }
    });
  }

}

module.exports = Router;
