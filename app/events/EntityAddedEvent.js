class EntityAddedEvent extends Event {
  constructor(entity) {
    super('entity added');
    this.tag = entity.tag;
    this.object = entity.object;
  }
}
