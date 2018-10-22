const Message = require('./base/Message.js');

class PlayerJoinedMessage extends Message {
  constructor(player) {
    super('player joined');
    this.player = player;
  }

  asJSON() {
    return {
      type: this.type,
      name: this.player.name,
      position: this.player.position
    };
  }
}

module.exports = PlayerJoinedMessage;
