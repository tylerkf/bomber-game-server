const Message = require('./Message.js');

class GameStateUpdateMessage extends Message {

  constructor() {
    super('game state update');
  }

  generate() {
    let capture  = JSON.stringify({
      type: this.type,
      players: getGame().players,
      events: getGame().events
    });

    getGame().clearEvents();
    return capture;
  }

  asString() {
    return this.generate();
  }

}

module.exports = GameStateUpdateMessage;
