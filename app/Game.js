const Player = require('./Player.js');
const Entity = require('./Entity.js');

class Game {
  constructor() {
    this.players = [];
    this.map = {
      boxes: [],
      bombs: []
    };
    setupMap(this.map);

    // Stack of events cleared every time the state of the game is broadcast
    this.events = [];
  }

  addPlayer(name) {
    let player = new Player(name);
    this.players.push(player);
    return player;
  }

  add(type, entity) {
    this.map[type].push(entity);
    this.events.push(new EntityAddedEvent(entity));
  }

  remove(type, entity) {
    this.map[type] = this.map[type].filter(e => e.tag !== entity.tag);
    this.events.push(new EntityRemovedEvent(entity));
  }

  move(type, entity, to) {
    entity.object.position = to;
    this.events.push(new EntityMovedEvent(entity, to));
  }
}

function setupMap(map) {
  map.boxes = generateBoundary(10);
  map.boxes.push(createBox('Wood', [4, 0]));
  map.boxes.push(createBox('Wood', [-3, 2]));
}

function generateBoundary(length) {
  let half = Math.floor(length/2);
  let boxes = [];
  for(let dist = 0; dist < length; dist++) {
    boxes.push(createBox('Stone', [-half + dist, -half]));
    boxes.push(createBox('Stone', [-half + dist, half]));
    boxes.push(createBox('Stone', [-half, -half+dist]));
    boxes.push(createBox('Stone', [half, -half+dist]));
  }
  return boxes;
}

function createBox(texture, position) {
  return new Entity({
    type: 'box',
    texture: texture,
    position: position
  });
}

function createBomb(level, position) {
  return new Entity({
    type: 'bomb',
    level: level,
    position: position
  });
}

module.exports = Game;
