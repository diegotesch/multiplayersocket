export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
  }

  function addPlayer({ playerId, playerX: x, playerY: y }) {
    state.players[playerId] = { x, y }
  }

  function removePlayer({ playerId }) {
    delete state.players[playerId]
  }

  function addFruit({ fruitId, fruitX: x, fruitY: y }) {
    state.fruits[fruitId] = { x, y }
  }

  function removeFruit({ fruitId }) {
    delete state.fruits[fruitId];
  }

  function movePlayer(command) {
    const controls = {
      ArrowUp: _goToUp,
      ArrowDown: _goToDown,
      ArrowLeft: _goToLeft,
      ArrowRight: _goToRight
    }
    const controlFn = controls[command.keyPressed];
    const player = state.players[command.playerId];
    if(player && controlFn) {
      controlFn(player);
      checkFroFruitCollision(command.playerId)
    }
  }

  function checkFroFruitCollision(playerId) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
        const fruit = state.fruits[fruitId]

        if (player.x === fruit.x && player.y === fruit.y) {
          console.log(`COLLISION between ${playerId} and ${fruitId}`)
          removeFruit({ fruitId });
        }
      }
  }

  function _goToDown(player) {
    player.y = Math.min(player.y + 1, state.screen.height - 1);
  }

  function _goToLeft(player) {
    player.x = Math.max(player.x - 1, 0);
  }

  function _goToRight(player) {
    player.x = Math.min(player.x + 1, state.screen.width - 1);
  }

  function _goToUp(player) {
    player.y = Math.max(player.y - 1, 0);
  }

  return { 
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    state
  }
}