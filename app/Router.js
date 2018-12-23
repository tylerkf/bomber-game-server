const uuid = require('uuid/v1');
const url = require('url');
const WebSocket = require('ws');

const GameStateMessage = require('./networking/send/GameStateMessage.js');
const GameStateUpdateMessage = require('./networking/send/GameStateUpdateMessage.js');
const ConsoleMessage = require('./networking/send/ConsoleMessage.js');

const PlayerStateHandler = require('./networking/recieve/PlayerStateHandler.js');

class Router {
  constructor(game, server) {
    this.game = game;

    this.wss = new WebSocket.Server({
       server: server,
       verifyClient: this.onHandshake
    });

    let messageHandlers = {};
    messageHandlers['player state'] = new PlayerStateHandler();

    this.wss.on('connection', (ws, req) => {
      const name = parseUrlParameters(req.url)['name'];
      const player = this.game.addPlayer(name);
      ws.player = player;

      let welcomeMessage = 'Player ' + name + ' joined the game';
      console.log(welcomeMessage);
      this.broadcastAll(new ConsoleMessage(welcomeMessage, 'Server'));

      let gameState = new GameStateMessage(this.game);
      ws.send(gameState.asString());

      ws.on('message', message => this.onMessage(message, ws, messageHandlers))
    });

    let gameStateUpdate = new GameStateUpdateMessage(this.game);
    setInterval(() => {
      this.broadcastAll(gameStateUpdate);
    }, 33);

    console.log('Server URL:"ws://localhost:3001"');

  }

  onMessage(message, ws, handlers) {
    const data = JSON.parse(message);
    const player = ws.player;

    try {
      handlers[data.type].handle(player, data);
    } catch(error) {
      console.error('Failed to handle server message from ' + player.name);
      console.error(error);
    }
  }

  onHandshake(info) {
    try {
      let params = parseUrlParameters(info.req.url);
      return params.hasOwnProperty('name');
    } catch(e) {
      return false;
    }
  }

  broadcastAll(message, except = '') {
    this.wss.clients.forEach(ws => {
      if(ws.readyState === WebSocket.OPEN && ws.player.name !== except) {
        ws.send(message.asString());
      }
    });
  }

}

function parseUrlParameters(url) {
  let parsed = {};
  let input = url.substring(2).split('&');
  input.forEach(s => {
    [key, value] = s.split('=');
    if(key !== '') {
      parsed[key] = value;
    }
  });
  return parsed;
}

module.exports = Router;
