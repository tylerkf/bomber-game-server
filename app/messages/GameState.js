const Message = require('./base/Message.js');

class GameStateMessage extends Message {
  constructor(game) {
    super('game state');
    this.game = game;
  }

  asJSON() {
    let players = this.game.players.map(p => {
      return {
        name: p.name,
        position: p.position
      };
    })

    return {
      type: this.type,
      players: players,
      map: this.game.map
    };
  }
}

module.exports = GameStateMessage;
