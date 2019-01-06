const Stage = require('./Stage.js');

const ConsoleMessage = require('../message/send/ConsoleMessage.js');
const MapFactory = require('../utils/MapFactory.js');


class StageLoading extends Stage {
  constructor(scheduler, game, router) {
    super(scheduler, game, router);
  }

  start() {
    this.scheduler.setCurrentStage(this);

    this.game.players.forEach((p) => {
      p.position = [0, 0, 0];
      p.isdead = false;
    });

    this.router.broadcastAll(new ConsoleMessage('Loading new map', 'server'));
    MapFactory.clearMap(this.game);
    MapFactory.createStartingMap(this.game, 15);

    this.nextStage.start();
  }
}

module.exports = StageLoading;
