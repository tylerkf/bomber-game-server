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
      if(game.map.bomb.includes(this)) {
        this.explode(game);
      }
    }, 2000);
  }

  explode(game, causedBy) {
    let center = this.object.position;
    game.events.push(new ExplosionEvent(center));
    game.getPlayers(center).forEach(p => p.kill());
    [[1,0], [-1,0], [0,1], [0,-1]].forEach((dir) => {
      for(let j = 1; j <= this.object.level; j++) {
        let pos = [center[0] + j * dir[0], center[1] + j * dir[1]];
        if(this._explodeAt(pos, game, causedBy)) {
          game.getPlayers(pos).forEach(p => p.kill());
        } else {
          break;
        }
      }
    });
    game.remove(this);
  }

  _explodeAt(position, game, ignore) {
    if(typeof ignore !== 'undefined') {
      if(MapFactory.positionsEqual(ignore.object.position, position)) {
        return false;
      }
    }

    let box = game.getBox(position);
    if(typeof box === 'undefined') {
      let bomb = game.getBomb(position);
      if(typeof bomb === 'undefined') {
        game.events.push(new ExplosionEvent(position));
      } else {
        bomb.explode(game, this);
      }
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
