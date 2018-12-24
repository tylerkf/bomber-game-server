const Player = require('./entities/Player.js');

const EntityAddedEvent = require('./events/EntityAddedEvent.js');
const EntityRemovedEvent = require('./events/EntityRemovedEvent.js');
const ExplosionEvent = require('./events/ExplosionEvent.js');

const MapFactory = require('./utils/MapFactory.js');

class Game {
  constructor() {
    this.players = [];
    this.events = []; // Stack of events cleared every time the state of the game is broadcast
    this.map = {
      box: [],
      bomb: []
    };

    MapFactory.createStartingMap(this);
  }

  addPlayer(name) {
    let player = new Player(name);
    this.players.push(player);
    return player;
  }

  add(entity) {
    this.map[entity.object.type].push(entity);
    this.events.push(new EntityAddedEvent(entity));
  }

  remove(entity) {
    this.map[entity.object.type] = this.map[entity.object.type].filter(e => e.tag !== entity.tag);
    this.events.push(new EntityRemovedEvent(entity));
  }

  clearEvents() {
    this.events = [];
  }

  getBox(position) {
    return this.map.box.find(box => positionsEqual(box.object.position, position));
  }
}

// Messy non OOP methods need formalising in a class

function positionsEqual(posA, posB) {
  if(posA.length !== posB.length) {
    return false;
  }

  for(let i = 0; i < posA.length; i++) {
    if(posA[i] !== posB[i]) {
      return false;
    }
  }
  return true;
}

module.exports = Game;
