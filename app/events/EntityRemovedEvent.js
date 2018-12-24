const Event = require('./Event.js');

class EntityRemovedEvent extends Event {
  constructor(entity) {
    super('entity removed')
    this.tag = entity.tag;
  }
}

module.exports = EntityRemovedEvent;
