class ExplosionEvent extends Event {
  constructor(position) {
    super('explosion');
    this.position = position;
  }
}

module.exports = ExplosionEvent;
