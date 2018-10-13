class Player {
  constructor(name) {
    this.name = name;
    this.position = [0, 0, 0];

    console.log('New player created: (' + this.name + ')');
  }

  updatePosition(x, y, z) {
    this.position = [x, y, z];
    console.log(this.name + "'s position is now " + JSON.stringify(this.position));
  }

}

module.exports = Player;
