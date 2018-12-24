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

  static createStartingMap(game) {
    let boundary = this._generateBoundary(10);
    this._addEntities(game, boundary);

    let woodBoxes = this._generateWoodBoxes(10);
    this._addEntities(game, woodBoxes);

    this._testMovingBox(game);
  }

  static _addEntities(game, array) {
    for(let i = 0; i < array.length; i++) {
      game.add(array[i]);
    }
  }

  static _generateBoundary(length) {
    let directions = [[-1,0],[0,-1],[1,0],[0,1]];
    let cursor = [Math.floor(length/2),Math.floor(length/2)];
    let boxes = [];
    for(let i = 0; i < directions.length; i++) {
      let dir = directions[i];
      for(let j = 0; j < length; j++) {
        boxes.push(new BoxEntity('Stone', [cursor[0]+=dir[0], cursor[1]+=dir[1]]));
      }
    }
    return boxes;
  }

  static _generateWoodBoxes(boundaryLength) {
    let boxes = [];
    let cursor = [Math.floor(boundaryLength/2)-1,Math.floor(boundaryLength/2)-1];
    for(let i = 0; i < boundaryLength - 1; i++) {
      for(let j = 0; j < boundaryLength - 1; j++) {
        if(Math.random() >= 0.5) {
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
