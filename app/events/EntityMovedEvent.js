const Event = require('./Event.js');

class EntityMovedEvent extends Event {
  constructor(entity) {
    super('entity moved');
    this.tag = entity.tag;
    this.position = entity.object.position;
  }
}

module.exports = EntityMovedEvent;
