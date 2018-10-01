class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.position = [0, 0, 0];

    console.log('New player created: (' + this.name + ',' + this.id + ')');
  }

  positionUpdate(json) {
    let pos = json['position'];
    this.position = [pos['x'], pos['y'], pos['z']];
    console.log('Received/processed pos update for player: ' + this.id);
  }

}

module.exports = Player;
