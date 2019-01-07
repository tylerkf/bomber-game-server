const Message = require('./Message.js');

class GameStateMessage extends Message {

  constructor() {
    super('game state');
  }

  generate() {
    return {
      players: getGame().players,
      map: getGame().map,
    };
  }

}

module.exports = GameStateMessage;
