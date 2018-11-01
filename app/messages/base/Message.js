class Message {
  constructor(type) {
    this.type = type;
  }

  asString() {
    //console.log(JSON.stringify(this.asJSON()));
    return JSON.stringify(this.asJSON());
  }

  asJSON() {
    return {type: this.type};
  }
}

module.exports = Message;
