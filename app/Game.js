const uuid = require('uuid/v1');
const Player = require('../app/Player.js');

class Game {
  constructor() {
    this.players = {};
  }

  addPlayer(json) {
    let id = uuid();
    this.players[id] = new Player(id, json['name']);
  }
}

module.exports = Game;
