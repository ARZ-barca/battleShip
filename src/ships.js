// method that marks a position as hit
function addHit(state) {
  return {
    hit(hitPosition) {
      state.location[String(hitPosition)] = "hit";
    },
  };
}

// check if ship is sunk
const addIsSunk = (state) => ({
  isSunk() {
    return Object.values(state.location).every((value) => value === "hit");
  },
});

// method for getting location of ship
const addGetLocation = (state) => ({
  getLocation() {
    return state.location;
  },
});

const addGetLen = (state) => ({
  getLen() {
    return state.len;
  },
});

const addGetCreateLoc = (state) => ({
  getCreateLoc() {
    return state.createLoc;
  },
});

// predicts ship positions if created to check for their validity
function predictShipPositions(createLoc, len, axis) {
  const locations = [];
  if (axis === "x") {
    for (let i = createLoc[0], j = createLoc[1], k = 0; k < len; k++) {
      locations.push([i, +j + k]);
    }
  } else if (axis === "y") {
    for (let i = createLoc[0], j = createLoc[1], k = 0; k < len; k++) {
      locations.push([+i + k, j]);
    }
  }
  return locations;
}

// gameboard factory function
function Ship(createLoc, len, axis) {
  const state = {
    location: {},
    createLoc,
    len,
  };
  // populating the location of the ship
  const predictedLocations = predictShipPositions(createLoc, len, axis);
  for (const p of predictedLocations) {
    state.location[String(p)] = "good";
  }
  return {
    ...addGetLocation(state),
    ...addIsSunk(state),
    ...addHit(state),
    ...addGetLen(state),
    ...addGetCreateLoc(state),
  };
}

export default Ship;
export { predictShipPositions };
