const StageLoading = require('./stages/Loading.js');
const StageWaiting = require('./stages/Waiting.js');
const StagePlaying = require('./stages/Playing.js');
const StageEnd = require('./stages/End.js');

class Scheduler {
  constructor(game, router) {
    this.currentStage = null;

    let load = new StageLoading(this, game, router);
    let waiting = new StageWaiting(this, game, router);
    let playing = new StagePlaying(this, game, router);
    let end = new StageEnd(this, game, router);

    load.nextStage = waiting;
    waiting.nextStage = playing;
    playing.nextStage = end;
    end.nextStage = load;

    game.subscribeToEvents(this);

    load.start();
  }

  setCurrentStage(stage) {
    console.log('Game entered stage ' + stage.getType());
    this.currentStage = stage;
  }

  onEvent(type) {
    this.currentStage.onEvent(type);
  }

}

module.exports = Scheduler;
