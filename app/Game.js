const Player = require('./Player.js');
const Entity = require('./Entity.js');

const EntityAddedEvent = require('./events/EntityAddedEvent.js');
const EntityMovedEvent = require('./events/EntityMovedEvent.js');
const EntityRemovedEvent = require('./events/EntityRemovedEvent.js');
const ExplosionEvent = require('./events/ExplosionEvent.js');

class Game {
  constructor() {
    this.players = [];
    this.events = []; // Stack of events cleared every time the state of the game is broadcast
    this.map = {
      boxes: [],
      bombs: []
    };
    setupMap(this.map);

    let movingBox = createBox('Wood', [-3, 2]);
    this.map.boxes.push(movingBox);
    setInterval(() => {
      if(movingBox.object.position[1] >= 4) {
        movingBox.object.position[1]=2;
      } else {
        movingBox.object.position[1]+=0.05;
      }
      this.events.push(new EntityMovedEvent(movingBox));
    }, 50);
  }

  addPlayer(name) {
    let player = new Player(name);
    this.players.push(player);

    this.events.push(new ExplosionEvent([2,1]));
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

  clearEvents() {
    this.events = [];
  }
}

function setupMap(map) {
  map.boxes = generateBoundary(10);
  map.boxes.push(createBox('Wood', [4, 0]));
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

module.exports = Game;
