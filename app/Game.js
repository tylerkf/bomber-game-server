const Player = require('./Player.js');

class Game {
  constructor() {
    this.players = [];
    this.map = {
      boxes: this.generateBoundary(15).concat([
        [0,-1],[0,1]
      ]),
      bombs: [
        [[3,-2],1],
        [[-2,3],2]
      ]
    }

    this.addPlayer = this.addPlayer.bind(this);
  }

  generateBoundary(length) {
  	let half = Math.floor(length/2);
  	let points = [];
  	for(let dist = 0; dist < length; dist++) {
  		points.push([-half + dist, -half]);
  		points.push([-half + dist, half]);
  		points.push([-half, -half+dist]);
  		points.push([half, -half+dist]);
  	}
  	return points;
  }


  addPlayer(name) {
    let player = new Player(name);
    this.players.push(player);
    return player;
  }


}

module.exports = Game;
