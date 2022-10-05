import Ship, { predictShipPositions } from "./ships";

// change the given positions in the game boards
function changeGameBoardPositions(state, positions, value) {
  positions.forEach((p) => {
    state.positions[String(p)] = value;
  });
}

// get the ship positions as a list
function getShipPositions(ship) {
  return Object.keys(ship.getPositions());
}

// changes positions in game board to 'ship'
function changeShipPositions(state, ship) {
  const shipPositions = getShipPositions(ship);
  changeGameBoardPositions(state, shipPositions, "ship");
}

// get positions arround ship
function getPositionsAroundShip(state, ship) {
  const shipPositions = getShipPositions(ship);
  const aroundPositions = [];
  shipPositions.forEach((p) => {
    const pAsList = p.split(",");
    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        const newPos = String([+pAsList[0] + i, +pAsList[1] + j]);
        if (
          (state.positions[newPos] === "empty" ||
            state.positions[newPos] === "unavailable") &&
          !aroundPositions.includes(newPos)
        ) {
          aroundPositions.push(newPos);
        }
      }
    }
  });
  return aroundPositions;
}

// changes arround the ship positions to 'unavailable'
function changeAroundShipPositions(state, ship) {
  const aroundPositions = getPositionsAroundShip(state, ship);
  changeGameBoardPositions(state, aroundPositions, "unavailable");
}

// add ship to the gameboard ships
function addShipToGameBoardShips(state, ship) {
  state.ships.push(ship);
}

// method for placing ships in gameboard (returns the ship)
function createShip(state, createPos, len, axis) {
  const ship = Ship(createPos, len, axis);
  changeShipPositions(state, ship);
  changeAroundShipPositions(state, ship);
  addShipToGameBoardShips(state, ship);
  return ship;
}

// adds the createShip method to object
const addCreateShip = (state) => ({
  createShip: (createPos, len, axis) => createShip(state, createPos, len, axis),
});

// makes the ship positions 'empty'
function emptyShipPositions(state, ship) {
  const shipPositions = getShipPositions(ship);
  changeGameBoardPositions(state, shipPositions, "empty");
}

// makes around the ship's position empty
function emptyAroundShipPosition(state, ship) {
  const aroundPositions = getPositionsAroundShip(state, ship);
  changeGameBoardPositions(state, aroundPositions, "empty");
}

// removes the ship from gameBoard ships
function removeShipFromGameBoardShips(state, ship) {
  const shipIndex = state.ships.indexOf(ship);
  state.ships.splice(shipIndex, 1);
}

// method for removing the ship (needs one arg)
function removeShip(state, ship) {
  emptyShipPositions(state, ship);
  emptyAroundShipPosition(state, ship);
  removeShipFromGameBoardShips(state, ship);
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
  const aroundPositions = getPositionsAroundShip(state, ship);
  aroundPositions.forEach((p) => {
    if (!state.missedShots.includes(p) && !state.unavailableShots.includes(p)) {
      state.unavailableShots.push(p);
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
