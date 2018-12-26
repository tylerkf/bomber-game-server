const Event = require('./Event.js');

class PlayerAddedEvent extends Event {
  constructor(player) {
    super('player added');
    this.name = player.name;
  }
}

module.exports = PlayerAddedEvent;
