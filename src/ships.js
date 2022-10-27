// method that marks a position as hit
function addGetHit(state) {
  return {
    getHit(position) {
      state.positions[String(position)] = "hit";
    },
  };
}

// check if ship is sunk
const addIsSunk = (state) => ({
  isSunk() {
    return Object.values(state.positions).every((value) => value === "hit");
  },
});

// predicts ship positions if created to check for their validity
function predictShipPositions(createPos, len, axis) {
  const createPosList = String(createPos).split(",");
  const positions = [];
  if (axis === "x") {
    for (let i = createPosList[0], j = createPosList[1], k = 0; k < len; k++) {
      positions.push([+i, +j + k]);
    }
  } else if (axis === "y") {
    for (let i = createPosList[0], j = createPosList[1], k = 0; k < len; k++) {
      positions.push([+i + k, +j]);
    }
  }

  return positions;
}

// gameboard factory function
function Ship(createPos, len, axis) {
  const state = {
    positions: {},
    createPos,
    axis,
    len,
  };
  // populating the positions of the ship
  const predictedPositions = predictShipPositions(createPos, len, axis);
  for (const p of predictedPositions) {
    state.positions[String(p)] = "good";
  }

  return {
    get positions() {
      return state.positions;
    },
    get len() {
      return state.len;
    },
    get axis() {
      return state.axis;
    },
    get createPos() {
      return state.createPos;
    },
    ...addIsSunk(state),
    ...addGetHit(state),
  };
}

export default Ship;
export { predictShipPositions };
