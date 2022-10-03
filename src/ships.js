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

// gameboard factory function
function Ship(createLoc, len, axis) {
  const state = {
    location: {},
  };
  // populating the location of the ship
  if (axis === "x") {
    for (let i = createLoc[0], j = createLoc[1], k = 0; k < len; k++) {
      state.location[String([i, +j + k])] = "good";
    }
  } else if (axis === "y") {
    for (let i = createLoc[0], j = createLoc[1], k = 0; k < len; k++) {
      state.location[String([+i + k, j])] = "good";
    }
  }
  return { ...addGetLocation(state), ...addIsSunk(state), ...addHit(state) };
}

export default Ship;
