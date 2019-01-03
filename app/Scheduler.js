const MapFactory = require('./utils/MapFactory.js');
const ConsoleMessage = require('./message/send/ConsoleMessage.js');

class Scheduler {
  constructor(game, router) {
    let load = new StageLoading(game, router);
    let waiting = new StageWaiting(game, router);
    let playing = new StagePlaying(game, router);
    let end = new StageEnd(game, router);

    load.nextStage = waiting;
    waiting.nextStage = playing;
    playing.nextStage = end;
    end.nextStage = load;

    load.start();
  }
}

module.exports = Scheduler;

class Stage {
  constructor(game, router) {
    this.game = game;
    this.router = router;
  }

  start() {
    this.next();
  }

  canProceed() {
    return true;
  }

  next() {
    if(this.canProceed()) {
      this.nextStage.start();
    } else {
      setTimeout(() => {
        this.next();
      }, 50);
    }
  }
}

class StageLoading extends Stage {
  start() {
    this.router.broadcastAll(new ConsoleMessage('Loading new map', 'server'));
    MapFactory.clearMap(this.game);
    MapFactory.createStartingMap(this.game, 15);

    this.next();
  }
}

class StageWaiting extends Stage {
  start() {
    this.next();
  }

  canProceed() {
    if(this.game.players.length >= 2) {
      this.router.broadcastAll(new ConsoleMessage('Starting game...', 'server'));
      return true;
    } else {
      //this.router.broadcastAll(new ConsoleMessage('Need atleast 2 players to start!', 'server'));
      return false;
    }
  }
}

class StagePlaying extends Stage {
  start() {
    this.next();
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

class StageEnd extends Stage {

}
