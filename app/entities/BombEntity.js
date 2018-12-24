const Entity = require('./Entity.js');

const ExplosionEvent = require('../events/ExplosionEvent.js');

class BombEntity extends Entity {
  constructor(level, position=[0,0]) {
    super({
      type: 'bomb',
      level: level,
      position: position
    });
  }

  explode(game) {
    let center = this.object.position;
    game.events.push(new ExplosionEvent(center));

    let directions = [[1,0], [-1,0], [0,1], [0,-1]];
    for(let i = 0; i < directions.length; i++) {
      let dir = directions[i];
      for(let j = 1; j <= this.object.level; j++) {
        let pos = [center[0] + j * dir[0], center[1] + j * dir[1]];
        if(!this._explodeAt(pos, game)) {
          break;
        }
      }
    }
    game.remove(this);
  }

  _explodeAt(position, game) {
    let box = game.getBox(position);
    if(typeof box === 'undefined') {
      game.events.push(new ExplosionEvent(position));
    } else if (box.object.texture === 'Wood'){
      game.events.push(new ExplosionEvent(position));
      game.remove(box);
    } else {
      return false;
    }
    return true;
  }
}

module.exports = BombEntity;
