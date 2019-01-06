const Entity = require('../../entities/Entity.js');

class PlaceBombHandler {
  constructor(game) {
    this.game = game;
  }

  handle(player, message) {
    player.placeBomb(this.game);
  }
}

module.exports = PlaceBombHandler;
