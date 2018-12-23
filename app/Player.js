class Player {
  constructor(name) {
    this.name = name;
    this.state = 'idle';
    this.position = [0, 0, 0];
    this.velocity = [0, 0, 0];

    console.log('New player created: (' + this.name + ')');
  }
}

module.exports = Player;
