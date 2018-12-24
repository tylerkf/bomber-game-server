const BombEntity = require('./BombEntity.js');
const ExplosionEvent = require('../events/ExplosionEvent.js');

class Player {
  constructor(name) {
    this.name = name;
    this.state = 'idle';
    this.position = [0, 0, 0];
    this.velocity = [0, 0, 0];
  }

  placeBomb(level, game) {
    let bomb = new BombEntity(level, [Math.round(this.position[0]), Math.round(this.position[1])]);
    game.add(bomb);
    setTimeout(() => {
      bomb.explode(game);
    }, 2000);
  }
}

module.exports = Player;
