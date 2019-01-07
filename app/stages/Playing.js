const Stage = require('./Stage.js');
const ConsoleMessage = require('../message/send/ConsoleMessage.js');

class StagePlaying extends Stage {
  constructor() {
    super(['player killed', 'player removed']);
  }

  start() {
    getScheduler().setCurrentStage(this);
    getRouter().broadcastAll(new ConsoleMessage('Game started...', 'server'));
    getRouter().setTitleMessage('');
  }

  canProceed() {
    let alive = getGame().players.filter(p => !p.isdead);
    if(alive.length == 1) {
      getRouter().setTitleMessage(alive[0].name + ' has won!');
      return true;
    } else {
      return false;
    }
  }
}

module.exports = StagePlaying;
