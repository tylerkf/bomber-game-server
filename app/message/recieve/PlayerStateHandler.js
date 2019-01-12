class PlayerStateHandler {
  handle(player, message) {
    player.update(message.position, message.velocity, message.state);
  }
}

module.exports = PlayerStateHandler;
