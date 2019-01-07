const Stage = require('./Stage.js');

const ConsoleMessage = require('../message/send/ConsoleMessage.js');
const MapFactory = require('../utils/MapFactory.js');


class StageLoading extends Stage {

  start() {
    getScheduler().setCurrentStage(this);

    getGame().players.forEach((p) => {
      p.position = [0, 0, 0];
      p.isdead = false;
    });

    getRouter().broadcastAll(new ConsoleMessage('Loading new map', 'server'));
    MapFactory.clearMap(getGame());
    MapFactory.createStartingMap(getGame(), 15);

    this.nextStage.start();
  }
}

module.exports = StageLoading;
