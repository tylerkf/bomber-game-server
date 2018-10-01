let MessageType = {
  'CLIENT_JOIN': 'enter',
  'PLAYER_POSITION': 'position'
};
Object.freeze(MessageType);

class Router {
  constructor(game) {
    this.game = game;

    this.onRecieve = this.onRecieve.bind(this);
    this._onPlayerUpdate = this._onPlayerUpdate.bind(this);
    this._onPlayerPositionUpdate = this._onPlayerPositionUpdate.bind(this);
  }

  onRecieve(json) {
    this._onPlayerUpdate(json);
  }

  _onPlayerUpdate(json) {
    switch(json['type']) {
      case MessageType.PLAYER_POSITION:
        this._onPlayerPositionUpdate(json);
        break;
      case MessageType.CLIENT_JOIN:
        this.game.addPlayer(json);
        break;
      default:
        console.log(json['type']);
        console.log('Unhandled socket message:');
    }
  }

  _onPlayerPositionUpdate(json) {
    let id = json['id'];
    let player = this.game.players[id];
    player.positionUpdate(json);
  }
}

module.exports = Router;
