class Stage {
  constructor(relevantEvents = []) {
    this.relevantEvents = relevantEvents;
  }

  start() {
    getScheduler().setCurrentStage(this);
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
