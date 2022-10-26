import Ship, { predictShipPositions } from "./ships";

// returns a random axis : 'x' or 'y'
function getRandomAxis() {
  return Math.floor(Math.random() * 100) % 2 === 0 ? "x" : "y";
}

// change the given positions in the game boards
function changeGameBoardPositions(state, positions, value) {
  positions.forEach((p) => {
    state.positions[String(p)] = value;
  });
}

// get positions arround ship
function getPositionsAroundShip(state, ship) {
  const shipPositions = Object.keys(ship.positions);
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

// // adds get positions around ship method to object
// const addGetPositionsAroundShip = (state) => ({
//   getPositionsAroundShip: (ship) => getPositionsAroundShip(state, ship),
// });

// method for placing ships in gameboard (returns the ship)
function createShip(state, createPos, len, axis) {
  const ship = Ship(createPos, len, axis);
  // change ship's positions
  const shipPositions = Object.keys(ship.positions);
  changeGameBoardPositions(state, shipPositions, "ship");
  // change positions arround the ship
  const aroundPositions = getPositionsAroundShip(state, ship);
  changeGameBoardPositions(state, aroundPositions, "unavailable");
  // adding ship to the game board ships
  state.ships.push(ship);
  return ship;
}

// adds the createShip method to object
const addCreateShip = (state) => ({
  createShip: (createPos, len, axis) => createShip(state, createPos, len, axis),
});

// method for removing the ship (needs one arg)
function removeShip(state, ship) {
  // change positions arround the ship
  const aroundPositions = getPositionsAroundShip(state, ship);
  changeGameBoardPositions(state, aroundPositions, "empty");
  // change ship's positions
  const shipPositions = Object.keys(ship.positions);
  changeGameBoardPositions(state, shipPositions, "empty");
  // remove ship from the game board ships
  const shipIndex = state.ships.indexOf(ship);
  state.ships.splice(shipIndex, 1);
}

// adds removeship method to an object
const addRemoveShip = (state) => ({
  removeShip: (ship) => {
    removeShip(state, ship);
  },
});

// // method for repositioning the ship
// function changeShipAxis(state, ship) {
//   removeShip(state, ship);
//   const shipCreatePos = ship.getCreatePos();
//   const shipLen = ship.getLen();
//   const newAxis = ship.getAxis() === "x" ? "y" : "x";
//   const newShip = createShip(state, shipCreatePos, shipLen, newAxis);
//   return newShip;
// }

// // adds changeShipAxix method to an object
// const addChangeShipAxis = (state) => ({
//   changeShipAxis: (ship, newAxis) => changeShipAxis(state, ship, newAxis),
// });

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

// returns the ship that got hit
function getHitShip(state, attackPosition) {
  for (const ship of state.ships) {
    if (Object.keys(ship.positions).includes(String(attackPosition))) {
      return ship;
    }
  }
}

// adds getHitShip method to an object
const addGetHitShip = (state) => ({
  getHitShip: (attackPosition) => getHitShip(state, attackPosition),
});

// method for receieveing an attack
function getHit(state, attackPosition) {
  const ship = getHitShip(state, attackPosition);
  if (ship) {
    // a ship got hit
    ship.getHit(attackPosition);
  }
}

// adds getHit method to an object
const addGetHit = (state) => ({
  getHit: (attackPosition) => getHit(state, attackPosition),
});

// method for checking if the game is over
function isGameOver(state) {
  let gameOver = true;
  state.ships.forEach((ship) => {
    if (!ship.isSunk()) {
      gameOver = false;
    }
  });
  return gameOver;
}

// add isGameOver to an object
const addisGameOver = (state) => ({
  isGameOver: () => isGameOver(state),
});

// removes all of board's ships
function clear(state) {
  const shipsNumber = state.ships.length;
  for (let i = 0; i < shipsNumber; i++) {
    removeShip(state, state.ships[0]);
  }
}

const addClear = (state) => ({
  clear: () => {
    clear(state);
  },
});

// method returns a Ship with random create location and axis and given length
function getRandomShip(state, len) {
  const allPositions = Object.keys(state.positions);
  while (true) {
    const randomPos =
      allPositions[Math.floor(allPositions.length * Math.random())];
    const randomAxis = getRandomAxis();
    if (checkPlacement(state, randomPos, len, randomAxis)) {
      return Ship(randomPos, len, randomAxis);
    }
    const otherAxis = randomAxis === "x" ? "y" : "x";
    if (checkPlacement(state, randomPos, len, otherAxis)) {
      return Ship(randomPos, len, otherAxis);
    }
    allPositions.splice(allPositions.indexOf(randomPos), 1);
  }
}

const addGetRandomShip = (state) => ({
  getRandomShip: (len) => {
    getRandomShip(state, len);
  },
});

// method for randomizing the board with given arrays of lengths
function randomize(state, lengths) {
  for (const len of lengths) {
    const ship = getRandomShip(state, len);
    createShip(state, ship.createPos, ship.len, ship.axis);
  }
}

const addRandomize = (state) => ({
  randomize: (lengths) => {
    randomize(state, lengths);
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
    get positions() {
      return state.positions;
    },
    get ships() {
      return state.ships;
    },
    ...addCreateShip(state),
    ...addRemoveShip(state),
    // ...addChangeShipAxis(state),
    ...addCheckPlacement(state),
    ...addGetHitShip(state),
    ...addGetHit(state),
    ...addisGameOver(state),
    ...addClear(state),
    ...addGetRandomShip(state),
    ...addRandomize(state),
  };
}

export default GameBoard;
export { getRandomAxis };
