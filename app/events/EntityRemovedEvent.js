class EntityRemovedEvent extends Entity {
  constructor(entity) {
    super('entity removed')
    self.tag = entity.tag;
  }
}

module.exports EntityRemovedEvent;
