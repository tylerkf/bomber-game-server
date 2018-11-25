const Message = require('./Message.js');

class ConsoleMessage extends Message {

  constructor(text, from) {
    super('console message');
    this.text = text;
    this.from = from;
  }

  asJSON() {
    return {
      type: this.type,
      text: this.text,
      from: this.from
    };
  }

}

module.exports = ConsoleMessage;
