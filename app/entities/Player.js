const BombEntity = require('./BombEntity.js');
const ExplosionEvent = require('../events/ExplosionEvent.js');
const PlayerKilledEvent = require('../events/PlayerKilledEvent.js');

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
    if(!this.isdead && !getScheduler().hasEnded()) {
      this.position = position;
      this.velocity = velocity;
      this.state = state;
    }
  }

  getGridPosition() {
    return [Math.round(this.position[0]),Math.round(this.position[1])];
  }

  placeBomb() {
    if(!getScheduler().isPlaying()) {
      return;
    }

    let bomb = new BombEntity(this.level, this.getGridPosition());
    getGame().add(bomb);
    bomb.prime();
  }

  kill() {
    if(!getScheduler().isPlaying()) {
      return;
    }

    this.isdead = true;
    getGame().pushEvent(new PlayerKilledEvent(this));
    console.log(this.name + ' died');
    this.position = [0, 0, 0];
  }
}

module.exports = Player;
