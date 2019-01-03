class Entity {
  constructor(object) {
    this.tag = Entity.nextTag++;
    this.object = object;
  }
}

Entity.nextTag = 1; // A unique tag to give to the next entity

module.exports = Entity;
