const Entity = require('./Entity.js');

class BoxEntity extends Entity {
  constructor(texture, position=[0,0]) {
    super({
      type: 'box',
      texture: texture,
      position: position
    });
  }
}

module.exports = BoxEntity;
