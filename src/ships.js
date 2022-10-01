// gameboard factory function
function Ship(createLoc, len, axis) {
  const location = {};
  // populating the location of the ship
  if (axis === "x") {
    for (let i = createLoc[0], j = createLoc[1], k = 0; k < len; k++) {
      location[String([i, +j + k])] = "good";
    }
  } else if (axis === "y") {
    for (let i = createLoc[0], j = createLoc[1], k = 0; k < len; k++) {
      location[String([+i + k, j])] = "good";
    }
  }

  // marks a position as hit
  function hit(hitPosition) {
    location[String(hitPosition)] = "hit";
  }

  // check if ship is sunk
  function isSunk() {
    return Object.values(location).every((value) => value === "hit");
  }

  // method for getting location of ship
  function getLocation() {
    return location;
  }

  return { getLocation, hit, isSunk };
}

export default Ship;
