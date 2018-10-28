const uuid = require('uuid/v1');
const url = require('url');
const WebSocket = require('ws');

const GameStateMessage = require('./messages/GameState.js');
const PlayerJoinedMessage = require('./messages/PlayerJoined.js');
const PlayerPositionMessage = require('./messages/PlayerPosition.js');

class Router {
  constructor(game, server) {
    this.game = game;

    this.wss = new WebSocket.Server({
       server: server,
       verifyClient: this.onHandshake
    });

    this.wss.on('connection', (ws, req) => {
      const name = parseUrlParameters(req.url)['name'];
      const player = this.game.addPlayer(name);
      ws.player = player;
      console.log('Player ' + name + ' joined the game');

      let gameState = new GameStateMessage(this.game);
      ws.send(gameState.asString());

      this.broadcastAll(new PlayerJoinedMessage(player), name);

      ws.on('message', message => this.onMessage(message, ws))
    });

    console.log('Server URL:"ws://localhost:3001"');

  }

  onMessage(message, ws) {
    const data = JSON.parse(message);
    const player = ws.player;
    switch(data.type) {
      case 'position':
        player.updatePosition(data.x, data.y, data.z);
        this.broadcastAll(new PlayerPositionMessage(player), player.name);
        break;
      default:
        console.log('Unable to handle message from ' + player.name);
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
