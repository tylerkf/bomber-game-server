const Stage = require('./Stage.js');

const PLAYERS_TO_START = 2;

class StageWaiting extends Stage {
  constructor() {
    super(['*']);
  }

  start() {
    getScheduler().setCurrentStage(this);
    getRouter().setTitleMessage('Need ' + PLAYERS_TO_START + ' players to start...');
  }

  canProceed() {
    return getGame().players.length >= PLAYERS_TO_START;
  }
}

module.exports = StageWaiting;
