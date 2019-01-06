const Event = require('./Event.js');

class PlayerKilledEvent extends Event {
  constructor(player) {
    super('player killed')
    this.name = player.name;
  }
}

module.exports = PlayerKilledEvent;
