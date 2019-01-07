const Entity = require('./Entity.js');
const MapFactory = require('../utils/MapFactory.js');
const ExplosionEvent = require('../events/ExplosionEvent.js');

class BombEntity extends Entity {
  constructor(level, position=[0,0]) {
    super({
      type: 'bomb',
      level: level,
      position: position
    });
  }

  prime(game) {
    setTimeout(() => {
      if(getGame().map.bomb.includes(this)) {
        this.explode();
      }
    }, 2000);
  }

  explode(causedBy) {
    let center = this.object.position;
    getGame().pushEvent(new ExplosionEvent(center));
    getGame().getPlayers(center).forEach(p => p.kill(getGame()));

    [[1,0], [-1,0], [0,1], [0,-1]].forEach((dir) => {
      for(let j = 1; j <= this.object.level; j++) {
        let pos = [center[0] + j * dir[0], center[1] + j * dir[1]];
        if(this._explodeAt(pos, causedBy)) {
          getGame().getPlayers(pos).forEach(p => p.kill(getGame()));
        } else {
          break;
        }
      }
    });

    getGame().remove(this);
  }

  _explodeAt(position, ignore) {
    if(typeof ignore !== 'undefined') {
      if(MapFactory.positionsEqual(ignore.object.position, position)) {
        return false;
      }
    }

    let box = getGame().getBox(position);
    if(typeof box === 'undefined') {
      let bomb = getGame().getBomb(position);
      if(typeof bomb === 'undefined') {
        getGame().pushEvent(new ExplosionEvent(position));
      } else {
        bomb.explode(this);
      }
    } else if (box.object.texture === 'Wood'){
      getGame().pushEvent(new ExplosionEvent(position));
      getGame().remove(box);
    } else {
      return false;
    }
    return true;
  }
}

module.exports = BombEntity;
