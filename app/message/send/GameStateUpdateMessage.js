const Message = require('./Message.js');

class GameStateUpdateMessage extends Message {

  constructor(game) {
    super('game state update');
    this.game = game;
  }

  generate() {
    let capture  = JSON.stringify({
      type: this.type,
      players: this.game.players,
      events: this.game.events
    });

    this.game.clearEvents();
    return capture;
  }

  asString() {
    return this.generate();
  }

}

module.exports = GameStateUpdateMessage;
