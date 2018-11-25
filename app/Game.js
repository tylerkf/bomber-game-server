const Player = require('./Player.js');

class Game {
  constructor() {
    this.players = [];
    this.map = {
      boxes: this.generateBoundary(15).concat([
        [0,-1, 'Wood'],[0,1, 'Wood']
      ]).concat(this.generateBoundary(6)),
      bombs: [
        [[3,-2],1],
        [[-2,3],2]
      ]
    }

    this.addPlayer = this.addPlayer.bind(this);
  }

  generateBoundary(length) {
  	let half = Math.floor(length/2);
  	let boxes = [];
  	for(let dist = 0; dist < length; dist++) {
  		boxes.push([-half + dist, -half, 'Stone']);
  		boxes.push([-half + dist, half, 'Stone']);
  		boxes.push([-half, -half+dist, 'Stone']);
  		boxes.push([half, -half+dist, 'Stone']);
  	}
  	return boxes;
  }


  addPlayer(name) {
    let player = new Player(name);
    this.players.push(player);
    return player;
  }


}

module.exports = Game;
