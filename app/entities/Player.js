const BombEntity = require('./BombEntity.js');
const ExplosionEvent = require('../events/ExplosionEvent.js');

class Player {
  constructor(name) {
    this.name = name;
    this.state = 'idle';
    this.position = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.isdead = false;
    this.level = 1;
  }

  updatePosition(position, velocity, state) {
    if(!this.isdead) {
      this.position = position;
      this.velocity = velocity;
      this.state = state;
    }
  }

  getGridPosition() {
    return [Math.round(this.position[0]),Math.round(this.position[1])];
  }

  placeBomb(game) {
    let bomb = new BombEntity(this.level, [Math.round(this.position[0]), Math.round(this.position[1])]);
    game.add(bomb);
    bomb.prime(game);
  }

  kill() {
    console.log(this.name + ' died');
    this.isdead = true;
    this.position = [-10, 0, 0];
  }
}

module.exports = Player;
