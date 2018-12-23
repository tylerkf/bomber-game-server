const Message = require('./Message.js');

class GameStateMessage extends Message {

  constructor(game) {
    super('game state');
    this.game = game;
  }

  generate() {
    return {
      players: this.game.players,
      map: this.game.map,
    };
  }

}

module.exports = GameStateMessage;
