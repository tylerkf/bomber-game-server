const Stage = require('./Stage.js');
const ConsoleMessage = require('../message/send/ConsoleMessage.js');

class StagePlaying extends Stage {
  constructor() {
    super(['player killed']);
  }

  start() {
    getScheduler().setCurrentStage(this);
    getRouter().broadcastAll(new ConsoleMessage('Game started...', 'server'));
  }

  canProceed() {
    let alive = getGame().players.filter(p => !p.isdead);
    if(alive.length == 1) {
      getRouter().broadcastAll(new ConsoleMessage(alive[0].name + ' has won!', 'server'));
      return true;
    } else {
      return false;
    }
  }
}

module.exports = StagePlaying;
