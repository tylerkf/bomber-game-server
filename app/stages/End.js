const Stage = require('./Stage.js');

class StageEnd extends Stage {

  start() {
    getScheduler().setCurrentStage(this);

    setTimeout(() => {
      this.nextStage.start();
    }, 3000);
  }
}

module.exports = StageEnd;
