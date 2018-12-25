const BoxEntity = require('../entities/BoxEntity.js');
const EntityMovedEvent = require('../events/EntityMovedEvent.js');

class MapFactory {
  static clearMap(game) {
    for(let i = game.map.box.length; i > 0; i--) {
      game.remove(game.map.box[i-1]);
    }
    for(let i = game.map.bomb.length; i > 0; i--) {
      game.remove(game.map.bomb[i-1]);
    }
  }

  static createStartingMap(game, size) {
    if((size % 2) !== 1) {
      console.error('Error: Game size not odd, setting to default of 11');
      size = 11;
    }

    let boundary = this._generateBoundary(size);
    this._addEntities(game, boundary);

    //let woodBoxes = this._generateWoodBoxes(size);
    //this._addEntities(game, woodBoxes);

    let grid = this._generateGridBoundaries(size);
    this._addEntities(game, grid);

    this._testMovingBox(game);
  }

  static _generateGridBoundaries(size) {
    let n = Math.floor((size - 5)/2);
    let boxes = [];

    let cursor = [Math.floor(size/2)-2, Math.floor(size/2)-2]
    for(let i = 0; i <= n; i++) {
      for(let j = 0; j <= n; j++) {
        boxes.push(new BoxEntity('Stone', [cursor[0] - i*2, cursor[1] - j*2]));
      }
    }
    return boxes;
  }

  static _addEntities(game, array) {
    for(let i = 0; i < array.length; i++) {
      game.add(array[i]);
    }
  }

  static _generateBoundary(size) {
    let directions = [[-1,0],[0,-1],[1,0],[0,1]];
    let cursor = [Math.floor(size/2),Math.floor(size/2)];
    let boxes = [];
    for(let i = 0; i < directions.length; i++) {
      let dir = directions[i];
      for(let j = 0; j < size - 1; j++) {
        boxes.push(new BoxEntity('Stone', [cursor[0]+=dir[0], cursor[1]+=dir[1]]));
      }
    }
    return boxes;
  }

  static _generateWoodBoxes(size) {
    let boxes = [];
    let cursor = [Math.floor(size/2)-1,Math.floor(size/2)-1];
    for(let i = 0; i < size - 2; i++) {
      for(let j = 0; j < size - 2; j++) {
        if(Math.random() >= 0.5 && cursor[0] - i !== 0 && cursor[1] - j !== 0) {
          boxes.push(new BoxEntity('Wood', [cursor[0] - i, cursor[1] - j]));
        }
      }
    }
    return boxes;
  }

  static _testMovingBox(game) {
    let movingBox = new BoxEntity('Wood', [-6, 2]);
    game.add(movingBox);
    setInterval(() => {
      if(movingBox.object.position[1] >= 4) {
        movingBox.object.position[1]=2;
      } else {
        movingBox.object.position[1]+=0.05;
      }
      game.events.push(new EntityMovedEvent(movingBox));
    }, 50);
  }
}

module.exports = MapFactory;
