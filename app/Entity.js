class Entity {
  constructor(object) {
    this.tag = Entity.nextTag++;
    this.object = object;
  }
}

Entity.nextTag = 0;

module.exports = Entity;
