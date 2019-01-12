const Event = require('./Event.js');

class TitleMessageUpdateEvent extends Event {
  constructor(title) {
    super('title message');
    this.title = title;
  }
}

module.exports = TitleMessageUpdateEvent;
