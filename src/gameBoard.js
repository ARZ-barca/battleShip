import Ship from "./ships";

// game board factory function
function GameBoard(gameBoardLen) {
  // positions in game board
  const positions = {};

  // populating the game board
  for (let i = 0; i < gameBoardLen; i++) {
    for (let j = 0; j < gameBoardLen; j++) {
      positions[String([i, j])] = "empty";
    }
  }

  // stores ships that are created
  const ships = [];

  // changes positions in game board
  function changePositions(ship) {
    const shipPositions = Object.keys(ship.getLocation());
    shipPositions.forEach((p) => {
      positions[p] = "ship";
    });
  }

  // method for placing ships in gameboard
  function createShip(createLoc, len, axis) {
    const ship = Ship(createLoc, len, axis);
    changePositions(ship);
    ships.push(ship);
  }

  // method for getting the positions of game board
  function getPositions() {
    return positions;
  }

  // method for getting the ships of game board
  function getShips() {
    return ships;
  }
  return { getPositions, getShips, createShip };
}

export default GameBoard;
