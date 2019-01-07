const StageLoading = require('./stages/Loading.js');
const StageWaiting = require('./stages/Waiting.js');
const StagePlaying = require('./stages/Playing.js');
const StageEnd = require('./stages/End.js');

class Scheduler {
  constructor(game, router) {
    let load = new StageLoading();
    let waiting = new StageWaiting();
    let playing = new StagePlaying();
    let end = new StageEnd();

    load.nextStage = waiting;
    waiting.nextStage = playing;
    playing.nextStage = end;
    end.nextStage = load;

    this.currentStage = load;

    game.subscribeToEvents(this);
  }

  startLoop() {
    this.currentStage.start();
  }

  isPlaying() {
    return (this.currentStage instanceof StagePlaying);
  }

  hasEnded() {
    return (this.currentStage instanceof StageEnd);
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
