import Ship, { predictShipPositions } from "./ships";

// changes positions in game board to 'ship'
function changeShipPositions(state, ship) {
  const shipPositions = Object.keys(ship.getPositions());
  shipPositions.forEach((p) => {
    state.positions[p] = "ship";
  });
}

// changes arround the ship positions to 'unavailable'
function changeAroundShipPositions(state, ship) {
  const shipPositions = Object.keys(ship.getPositions());
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

// method for placing ships in gameboard (returns the ship)
function createShip(state, createPos, len, axis) {
  const ship = Ship(createPos, len, axis);
  changeShipPositions(state, ship);
  changeAroundShipPositions(state, ship);
  state.ships.push(ship);
  return ship;
}

// adds the createShip method to object
const addCreateShip = (state) => ({
  createShip: (createPos, len, axis) => createShip(state, createPos, len, axis),
});

// makes the ship positions 'empty'
function emptyShipPositions(state, ship) {
  const shipPositions = Object.keys(ship.getPositions());
  shipPositions.forEach((p) => {
    state.positions[p] = "empty";
  });
}

// makes around the ship's position empty
function emptyAroundShipPosition(state, ship) {
  const shipPositions = Object.keys(ship.getPositions());
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

// adds removeship method to an object
const addRemoveShip = (state) => ({
  removeShip: (ship) => {
    removeShip(state, ship);
  },
});

// method for repositioning the ship
function changeShipAxis(state, ship, newAxis) {
  removeShip(state, ship);
  const shipCreatePos = ship.getCreatePos();
  const shipLen = ship.getLen();
  const newShip = createShip(state, shipCreatePos, shipLen, newAxis);
  return newShip;
}

// adds changeShipAxix method to an object
const addChangeShipAxis = (state) => ({
  changeShipAxis: (ship, newAxis) => changeShipAxis(state, ship, newAxis),
});

// method that checks for placement validity
function checkPlacement(state, createPos, len, axis) {
  const predictedPositions = predictShipPositions(createPos, len, axis);
  for (const p of predictedPositions) {
    if (state.positions[String(p)] !== "empty") {
      return false;
    }
  }
  return true;
}

// adds checkPlacement method to an object
const addCheckPlacement = (state) => ({
  checkPlacement: (createPos, len, axis) =>
    checkPlacement(state, createPos, len, axis),
});

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

// returns the ship that got hit
function getHitShip(ships, attackPosition) {
  for (const ship of ships) {
    if (Object.keys(ship.getPositions()).includes(String(attackPosition))) {
      return ship;
    }
  }
}

// mark around a ship in game board as unavailableShot for hit
function markAroundShip(state, ship) {
  const shipPositions = Object.keys(ship.getPositions());
  shipPositions.forEach((p) => {
    const pAsList = p.split(",");
    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        if (
          !state.missedShots.includes(
            String([+pAsList[0] + i, +pAsList[1] + j])
          ) &&
          state.positions[String([+pAsList[0] + i, +pAsList[1] + j])] ===
            "unavailable" &&
          !state.unavailableShots.includes(
            String([+pAsList[0] + i, +pAsList[1] + j])
          )
        ) {
          state.unavailableShots.push(
            String([+pAsList[0] + i, +pAsList[1] + j])
          );
        }
      }
    }
  });
}

// checks an attack for hit or miss
function checkAttack(state, attackPosition) {
  if (state.positions[String(attackPosition)] === "ship") {
    state.hitShots.push(String(attackPosition));
    return true;
  }
  state.missedShots.push(String(attackPosition));
  return false;
}

// method for receieveing an attack
function receiveAttack(state, attackPosition) {
  if (checkAttack(state, attackPosition)) {
    const ship = getHitShip(state.ships, attackPosition);
    ship.hit(attackPosition);
    if (ship.isSunk()) {
      markAroundShip(state, ship);
    }
  }
}

// adds receiveAttack method to an object
const addReceiveAttack = (state) => ({
  receiveAttack: (attackPosition) => receiveAttack(state, attackPosition),
});

// method for getting attacks on a ship
const addGetAttacks = (state) => ({
  getAttacks() {
    const { missedShots } = state;
    const { hitShots } = state;
    const { unavailableShots } = state;
    return { missedShots, hitShots, unavailableShots };
  },
});

// game board factory function
function GameBoard(gameBoardLen) {
  // positions in game board
  const state = {
    positions: {},
    ships: [],
    gameBoardLen,
    // used after the ship placement
    missedShots: [],
    hitShots: [],
    unavailableShots: [],
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
    ...addChangeShipAxis(state),
    ...addCheckPlacement(state),
    ...addReceiveAttack(state),
    ...addGetAttacks(state),
  };
}

export default GameBoard;
