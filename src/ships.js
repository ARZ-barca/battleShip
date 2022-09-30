function Ship(createLoc, len, axis) {
  const location = [];
  // populating the location of the ship
  for (let i = createLoc[0], j = createLoc[1], k = 0; k < len; k++) {
    location.push([i, j + k]);
  }
  return { location };
}

export default Ship;
