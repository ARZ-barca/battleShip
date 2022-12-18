import GameBoard from "./gameBoard";

const gameBoardLen = 10;

// attack method for a player to attack another player
function attack(state, targetPlayer, position) {
  const positionIndex = state.availableShots.indexOf(String(position));
  if (positionIndex !== -1) {
    state.availableShots.splice(positionIndex, 1);
  }
  targetPlayer.gameBoard.getHit(position);

  const ship = targetPlayer.gameBoard.getHitShip(position);
  if (ship && ship.isSunk()) {
    // it hit a ship and ship sunk
    const positions = targetPlayer.gameBoard.getPositionsAroundShip(ship);
    positions.forEach((p) => {
      const positionIndex = state.availableShots.indexOf(String(p));
      if (positionIndex !== -1) {
        state.availableShots.splice(positionIndex, 1);
      }
    });
  }
}

// add attack method to an object
const addAttack = (state) => ({
  attack: (targetPlayer, position) => attack(state, targetPlayer, position),
});

// choose a random element from array
function randomElement(array) {
  const len = array.length;
  const i = Math.floor(Math.random() * len);
  return array[i];
}

// const prevAttack;
// method for ai to choose an attack position
function getAttackPosition(state) {
  return randomElement(state.availableShots);
}

// add getAttackPosition method to an object
const addGetAttackPosition = (state) => ({
  getAttackPosition: () => getAttackPosition(state),
});

// factory function for human Player
function Player() {
  const state = {
    gameBoard: GameBoard(gameBoardLen),
    gameBoardLen,
    availableShots: [],
  };

  // initialize the available shots
  for (let i = 0; i < gameBoardLen; i++) {
    for (let j = 0; j < gameBoardLen; j++) {
      state.availableShots.push(String([i, j]));
    }
  }

  return {
    get state() {
      return state;
    },
    get gameBoard() {
      return state.gameBoard;
    },
    get gameBoardLen() {
      return state.gameBoardLen;
    },
    get availableShots() {
      return state.availableShots;
    },
    ...addAttack(state),
  };
}

// factory function for ai Player
function AiPlayer() {
  const player = Player();
  const { state } = player;
  return { ...player, ...addGetAttackPosition(state) };
}

export default Player;
export { gameBoardLen, AiPlayer };
