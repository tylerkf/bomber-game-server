const Entity = require('../../entities/Entity.js');

class PlaceBombHandler {
  handle(player, message) {
    player.placeBomb();
  }
}

module.exports = PlaceBombHandler;
