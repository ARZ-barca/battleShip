import GameBoard from "./gameBoard";
// import Ship from "./ships";

const gameBoardLen = 10;

// // method for creating the ship
// function createShip(state, createPos, len, axis) {
//   return state.gameBoard.createShip(createPos, len, axis);
// }

// // add createShip to the player
// const addCreateShip = (state) => ({
//   createShip: (createPos, len, axis) => createShip(state, createPos, len, axis),
// });

// // method for checking the ship placement validity
// function checkPlacement(state, createPos, len, axis) {
//   return state.gameBoard.checkPlacement(createPos, len, axis);
// }

// // add createShip to the player
// const addCheckPlacement = (state) => ({
//   checkPlacement: (createPos, len, axis) =>
//     checkPlacement(state, createPos, len, axis),
// });

// // method for removing a ship
// function removeShip(state, ship) {
//   state.gameBoard.removeShip(ship);
// }

// // add removeShip to the player
// const addRemoveShip = (state) => ({
//   removeShip: (ship) => {
//     removeShip(state, ship);
//   },
// });

// // method for removing a ship
// function changeShipAxis(state, ship) {
//   return state.gameBoard.changeShipAxis(ship);
// }

// // add removeShip to the player
// const addChangeShipAxis = (state) => ({
//   changeShipAxis: (ship) => changeShipAxis(state, ship),
// });

// // returns a random position
// function getRandomPosition(allPositions) {
//   const randomPos =
//     allPositions[Math.floor(allPositions.length * Math.random())];
//   return randomPos;
// }

// // add getRandomShip to player
// const addGetRandomShip = (state) => ({
//   getRandomShip: (len) => getRandomShip(state, len),
// });

// // attack method for a player to attack another player game board
// // returns ship
// function attack(state, oponentBoard, position) {
//   const positionIndex = state.availableShots.indexOf(String(position));
//   state.availableShots.splice(positionIndex, 1);
//   const ship = oponentBoard.receiveAttack(position);
//   // if it hit a ship
//   if (ship) {
//     // if ship sunk
//     if (ship.isSunk()) {
//       const positions = oponentBoard.getPositionsAroundShip(ship);
//       positions.forEach((p) => {
//         const positionIndex = state.availableShots.indexOf(String(p));
//         if (positionIndex !== -1) {
//           state.availableShots.splice(positionIndex, 1);
//         }
//       });
//     }
//   }
//   return ship;
// }

// // add attack method to an object
// const addAttack = (state) => ({
//   attack: (oponentBoard, position) => attack(state, oponentBoard, position),
// });

// // choose a random element from array
// function randomElement(array) {
//   const len = array.length;
//   const i = Math.floor(Math.random() * len);
//   return array[i];
// }

// // method for ai to choose an attack position
// function getAttackPosition(state) {
//   return randomElement(state.availableShots);
// }

// // add getAttackPosition method to an object
// const addGetAttackPosition = (state) => ({
//   getAttackPosition: () => getAttackPosition(state),
// });

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
    // ...addCreateShip(state),
    // ...addCheckPlacement(state),
    // ...addRemoveShip(state),
    // ...addChangeShipAxis(state),
    // ...addGetRandomShip(state),
    // ...addClear(state),
    // ...addGetAvailableShots(state),
    // ...addAttack(state),
  };
}

// factory function for ai Player
function AiPlayer() {
  return {
    ...Player(gameBoardLen),
    // ...addGetGameBoard(state),
    // ...addGetGameBoardLen(state),
    // ...addCreateShip(state),
    // ...addCheckPlacement(state),
    // ...addRemoveShip(state),
    // ...addChangeShipAxis(state),
    // ...addGetRandomShip(state),
    // ...addClear(state),
    // ...addGetAvailableShots(state),
    // ...addAttack(state),
    // ...addGetAttackPosition(state),
  };
}

export default Player;
export { gameBoardLen, AiPlayer };
