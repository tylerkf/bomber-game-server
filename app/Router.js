const uuid = require('uuid/v1');
const url = require('url');
const WebSocket = require('ws');

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

      ws.on('message', message => this.onMessage(message, ws))
    });

    setInterval(() => {
      const positions = game.players.map( player => {
        return {
          name: player.name,
          x: player.position[0],
          y: player.position[1],
          z: player.position[2]
        }
      });

      this.wss.clients.forEach(ws => {
        if(ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(positions));
        }
      });
    }, 1000);
  }

  onMessage(message, ws) {
    const info = JSON.parse(message);
    const player = ws.player;
    switch(info.type) {
      case 'position':
        player.updatePosition(info.x, info.y, info.z);
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
