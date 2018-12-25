class PlayerStateHandler {
  handle(player, message) {
    player.updatePosition(message.position, message.velocity, message.state);
  }
}

module.exports = PlayerStateHandler;
