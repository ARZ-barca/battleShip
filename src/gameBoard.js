import Ship from "./ships";

// changes positions in game board
function changeShipPositions(state, ship) {
  const shipPositions = Object.keys(ship.getLocation());
  shipPositions.forEach((p) => {
    state.positions[p] = "ship";
  });
}

// changes arround the ship positions to 'unavailable'
function changeAroundShipPositions(state, ship) {
  const shipPositions = Object.keys(ship.getLocation());
  shipPositions.forEach((p) => {
    const pAsList = p.split(",");
    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        if (
          state.positions[String([+pAsList[0] + i, +pAsList[1] + j])] ===
          "empty"
        ) {
          state.positions[String([+pAsList[0] + i, +pAsList[1] + j])] =
            "unavailable";
        }
      }
    }
  });
}

// method for placing ships in gameboard
function createShip(state, createLoc, len, axis) {
  const ship = Ship(createLoc, len, axis);
  changeShipPositions(state, ship);
  changeAroundShipPositions(state, ship);
  state.ships.push(ship);
  return ship;
}

// adds the createShip method to object
const addCreateShip = (state) => ({
  createShip: (createLoc, len, axis) => createShip(state, createLoc, len, axis),
});

// makes the ship positions 'empty'
function emptyShipPositions(state, ship) {
  const shipPositions = Object.keys(ship.getLocation());
  shipPositions.forEach((p) => {
    state.positions[p] = "empty";
  });
}

// makes around the ship's position empty
function emptyAroundShipPosition(state, ship) {
  const shipPositions = Object.keys(ship.getLocation());
  shipPositions.forEach((p) => {
    const pAsList = p.split(",");
    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        if (
          state.positions[String([+pAsList[0] + i, +pAsList[1] + j])] ===
          "unavailable"
        ) {
          state.positions[String([+pAsList[0] + i, +pAsList[1] + j])] = "empty";
        }
      }
    }
  });
}

// removes the ship from gameBoard ships
function removeShipFromGameBoardShip(state, ship) {
  const shipIndex = state.ships.indexOf(ship);
  state.ships.splice(shipIndex, 1);
}

// method for removing the ship (needs one arg)
function removeShip(state, ship) {
  emptyShipPositions(state, ship);
  emptyAroundShipPosition(state, ship);
  removeShipFromGameBoardShip(state, ship);
}

// adds the removeship to an object
const addRemoveShip = (state) => ({
  removeShip: (ship) => {
    removeShip(state, ship);
  },
});

// method for repositioning the ship
// const addRepositionShip = (state) => ({
//   rePositionShip(ship, createLoc, axis) {
//     const shipPositions = Object.keys(ship.getLocation());
//     for (let i = -1; i < 2; i += 1) {
//       for (let j = -1; j < 2; j += 1) {
//         state.positions[String([+pAsList[0] + i, +pAsList[1] + j])] = empty;
//       }
//     }
//   },
// });

// method for getting the positions of game board
const addGetPositions = (state) => ({
  getPositions() {
    return state.positions;
  },
});

// method for getting the ships of game board
const addGetShips = (state) => ({
  getShips() {
    return state.ships;
  },
});

// game board factory function
function GameBoard(gameBoardLen) {
  // positions in game board
  const state = {
    positions: {},
    ships: [],
    gameBoardLen,
  };

  // populating the game board
  for (let i = 0; i < gameBoardLen; i++) {
    for (let j = 0; j < gameBoardLen; j++) {
      state.positions[String([i, j])] = "empty";
    }
  }

  return {
    ...addGetPositions(state),
    ...addGetShips(state),
    ...addCreateShip(state),
    ...addRemoveShip(state),
  };
}

export default GameBoard;
