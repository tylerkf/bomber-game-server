const Event = require('./Event.js');

class PlayerRemovedEvent extends Event {
  constructor(player) {
    super('player removed');
    this.name = player.name;
  }
}

module.exports = PlayerRemovedEvent;
