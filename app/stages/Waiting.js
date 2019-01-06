const Stage = require('./Stage.js');

const PLAYERS_TO_START = 2;

class StageWaiting extends Stage {
  constructor(scheduler, game, router) {
    super(scheduler, game, router, ['*']);
  }

  start() {
    this.scheduler.setCurrentStage(this);
    this.onEvent();
  }

  canProceed() {
    if(this.game.players.length >= PLAYERS_TO_START) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = StageWaiting;
