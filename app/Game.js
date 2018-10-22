const Player = require('./Player.js');

class Game {
  constructor() {
    this.players = [];

    this.addPlayer = this.addPlayer.bind(this);
  }

  addPlayer(name) {
    let player = new Player(name);
    this.players.push(player);
    return player;
  }
}

module.exports = Game;
