class PlayerStateHandler {
  handle(player, message) {
    player.position = message.position;
    player.state = message.state;
    player.velocity = message.velocity;
  }
}

module.exports = PlayerStateHandler;
