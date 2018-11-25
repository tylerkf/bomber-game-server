const Message = require('./Message.js');

class PlayerPositionMessage extends Message {

  constructor(player) {
    super('player position');
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

module.exports = PlayerPositionMessage;
