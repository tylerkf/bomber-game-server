const Stage = require('./Stage.js');

class StageEnd extends Stage {

  start() {
    getScheduler().setCurrentStage(this);

    getGame().players.forEach((p) => {
      p.state = 'idle';
    });

    setTimeout(() => {
      this.nextStage.start();
    }, 10000);
  }
}

module.exports = StageEnd;
