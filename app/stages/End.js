const Stage = require('./Stage.js');

class StageEnd extends Stage {
  constructor(scheduler, game, router) {
    super(scheduler, game, router);
  }

  start() {
    this.scheduler.setCurrentStage(this);

    setTimeout(() => {
      this.nextStage.start();
    }, 3000);
  }
}

module.exports = StageEnd;
