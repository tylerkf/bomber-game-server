const Event = require('./Event.js');

class EntityRemovedEvent extends Event {
  constructor(entity) {
    super('entity removed')
    self.tag = entity.tag;
  }
}

module.exports = EntityRemovedEvent;
