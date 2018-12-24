class Message {
  constructor(type) {
    this.type = type;
  }

  asString() {
    const obj = Object.assign({type: this.type},this.generate());
    return JSON.stringify(obj);
  }

  generate() {
    return {type: this.type};
  }
}

module.exports = Message;
