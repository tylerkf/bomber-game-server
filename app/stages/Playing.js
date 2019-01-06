const Stage = require('./Stage.js');
const ConsoleMessage = require('../message/send/ConsoleMessage.js');

class StagePlaying extends Stage {
  constructor(scheduler, game, router) {
    super(scheduler, game, router, ['player killed']);
  }

  start() {
    this.scheduler.setCurrentStage(this);
    this.router.broadcastAll(new ConsoleMessage('Game started...', 'server'));
  }

  canProceed() {
    let alive = this.game.players.filter(p => !p.isdead);
    if(alive.length == 1) {
      this.router.broadcastAll(new ConsoleMessage(alive[0].name + ' has won!', 'server'));
      return true;
    } else {
      return false;
    }
  }
}

module.exports = StagePlaying;
