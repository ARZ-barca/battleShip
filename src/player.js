import GameBoard from "./gameBoard";

const gameBoardLen = 10;

// initialize the available shots
function initializeShots(state) {
  for (let i = 0; i < gameBoardLen; i++) {
    for (let j = 0; j < gameBoardLen; j++) {
      state.availableShots.push(String([i, j]));
    }
  }
}

// add getGameBoard method to an object
const addGetGameBoard = (state) => ({
  getGameBoard: () => state.gameBoard,
});

// add getGameBoardLen method to an object
const addGetGameBoardLen = (state) => ({
  getGameBoardLen: () => state.gameBoardLen,
});

// add addGetAvailableShots method to an object
const addGetAvailableShots = (state) => ({
  getAvailableShots: () => state.availableShots,
});

// attack method
function attack(state, oponentBoard, position) {
  const positionIndex = state.availableShots.indexOf(String(position));
  oponentBoard.receiveAttack(position);
  state.availableShots.splice(positionIndex, 1);
}

// add attack method to an object
const addAttack = (state) => ({
  attack: (oponentBoard, position) => attack(state, oponentBoard, position),
});

// method for ai to choose an attack position
function getAttackPosition(state) {
  const len = state.availableShots.length;
  const i = Math.floor(Math.random() * len);
  return state.availableShots[i];
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

  initializeShots(state);

  return {
    ...addGetGameBoard(state),
    ...addGetGameBoardLen(state),
    ...addGetAvailableShots(state),
    ...addAttack(state),
  };
}

// factory function for ai Player
function AiPlayer() {
  const state = {
    gameBoard: GameBoard(gameBoardLen),
    gameBoardLen,
    availableShots: [],
  };

  initializeShots(state);

  return {
    ...addGetGameBoard(state),
    ...addGetGameBoardLen(state),
    ...addGetAvailableShots(state),
    ...addAttack(state),
    ...addGetAttackPosition(state),
  };
}

export default Player;
export { gameBoardLen, AiPlayer };
