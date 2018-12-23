const Message = require('./Message.js');

class GameStateUpdateMessage extends Message {

  constructor(game) {
    super('game state update');
    this.game = game;
  }

  generate() {
    return {
      players: this.game.players,
      events: this.game.events
    };

    this.game.events = [];
  }

}

module.exports = GameStateUpdateMessage;
