const Stage = require('./Stage.js');
const ConsoleMessage = require('../message/send/ConsoleMessage.js');

class StagePlaying extends Stage {
  constructor() {
    super(['player killed', 'player removed']);
  }

  start() {
    getScheduler().setCurrentStage(this);

    getGame().players.forEach((p) => {
      //let spawn = Spawn.createSpawnPoint(getGame(), 15);
      //p.position = [spawn[0], spawn[1], 0];
      p.position = [0, 0, 0];
      p.isdead = false;
      p.frozen = false;
    });

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
