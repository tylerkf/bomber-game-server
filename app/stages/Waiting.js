const Stage = require('./Stage.js');

const PLAYERS_TO_START = 2;

class StageWaiting extends Stage {
  constructor() {
    super(['*']);
  }

  start() {
    getScheduler().setCurrentStage(this);
    this.onEvent();
  }

  canProceed() {
    if(getGame().players.length >= PLAYERS_TO_START) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = StageWaiting;
