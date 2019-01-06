class Stage {
  constructor(scheduler, game, router, relevantEvents = []) {
    this.game = game;
    this.router = router;
    this.scheduler = scheduler;

    this.relevantEvents = relevantEvents;
  }

  start() {
    this.scheduler.setCurrentStage(this);
  }

  canProceed() {
    return true;
  }

  getType() {
    return this.constructor.name;
  }

  onEvent(event='') {
    if(this.relevantEvents.includes(event) || this.relevantEvents.includes('*')) {
      if(this.canProceed()) {
        if(this.nextStage) {
          this.nextStage.start();
        } else {
          console.error(this.getType() + ' ended but no next stage defined');
        }
      }
    }
  }

}

module.exports = Stage;
