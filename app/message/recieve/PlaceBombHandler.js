const Entity = require('../../entities/Entity.js');
const ExplosionEvent = require('../../events/ExplosionEvent.js');

class PlaceBombHandler {
  constructor(game) {
    this.game = game;
  }

  handle(player, message) {
    player.placeBomb(message.level, this.game);
  }
}

module.exports = PlaceBombHandler;
