// method that marks a position as hit
function addHit(state) {
  return {
    hit(hitPosition) {
      state.positions[String(hitPosition)] = "hit";
    },
  };
}

// check if ship is sunk
const addIsSunk = (state) => ({
  isSunk() {
    return Object.values(state.positions).every((value) => value === "hit");
  },
});

// method for getting positions of ship
const addGetPositions = (state) => ({
  getPositions() {
    return state.positions;
  },
});

const addGetLen = (state) => ({
  getLen() {
    return state.len;
  },
});

const addGetCreatePos = (state) => ({
  getCreatePos() {
    return state.createPos;
  },
});

// predicts ship positions if created to check for their validity
function predictShipPositions(createPos, len, axis) {
  const positions = [];
  if (axis === "x") {
    for (let i = createPos[0], j = createPos[1], k = 0; k < len; k++) {
      positions.push([i, +j + k]);
    }
  } else if (axis === "y") {
    for (let i = createPos[0], j = createPos[1], k = 0; k < len; k++) {
      positions.push([+i + k, j]);
    }
  }
  return positions;
}

// gameboard factory function
function Ship(createPos, len, axis) {
  const state = {
    positions: {},
    createPos,
    len,
  };
  // populating the positions of the ship
  const predictedPositionss = predictShipPositions(createPos, len, axis);
  for (const p of predictedPositionss) {
    state.positions[String(p)] = "good";
  }
  return {
    ...addGetPositions(state),
    ...addIsSunk(state),
    ...addHit(state),
    ...addGetLen(state),
    ...addGetCreatePos(state),
  };
}

export default Ship;
export { predictShipPositions };
