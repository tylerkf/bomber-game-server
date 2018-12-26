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

    MapFactory.createStartingMap(this, 15);
  }

  addPlayer(name) {
    let player = new Player(name);
    this.players.push(player);
    return player;
  }

  removePlayer(name) {
    this.players = this.players.filter(p => p.name !== name);
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

  getPlayers(gridPosition) {
    return this.players.filter((player) => {
      return MapFactory.positionsEqual(player.getGridPosition(), gridPosition)
    });
  }

  getBox(position) {
    return this.map.box.find(box => MapFactory.positionsEqual(box.object.position, position));
  }

  getBomb(position) {
    return this.map.bomb.find(bomb => MapFactory.positionsEqual(bomb.object.position, position));
  }
}

module.exports = Game;
