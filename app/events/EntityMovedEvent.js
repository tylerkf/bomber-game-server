class EntityMovedEvent extends Event {
  constructor(entity, to) {
    super('entity moved');
    this.tag = entity.tag;
    this.position = to;
  }
}
