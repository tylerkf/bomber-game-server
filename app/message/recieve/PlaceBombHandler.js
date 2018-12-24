const Entity = require('../../Entity.js');
const ExplosionEvent = require('../../events/ExplosionEvent.js');

class PlaceBombHandler {
  constructor(game) {
    this.game = game;
  }

  handle(player, message) {
    let bomb = createBomb(message.level, [Math.round(player.position[0]), Math.round(player.position[1])]);
    this.game.add('bombs', bomb);
    setTimeout(() => {
      this.game.remove('bombs', bomb);
      this.game.events.push(new ExplosionEvent(bomb.object.position));
    }, 2000);
  }
}

function createBomb(level, position) {
  return new Entity({
    type: 'bomb',
    level: level,
    position: position
  });
}

module.exports = PlaceBombHandler;
