import { predictShipPositions } from "./ships";
import { markShipOnBoard, removeShipFromBoard } from "./setup-dom";

// ships to be created len
const shipsLenghts = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

// creates a ship on board div and in players board object
function createShip(player, boardDiv, createPos, len, axis) {
  const ship = player.createShip(createPos, len, axis);
  const shipPositions = predictShipPositions(createPos, len, axis);
  markShipOnBoard(shipPositions, boardDiv);
  return ship;
}

// removes a ship from board and from player's board object
function removeShip(ship, player, boardDiv) {
  player.removeShip(ship);
  const shipPositions = predictShipPositions(
    ship.getCreatePos(),
    ship.getLen(),
    ship.getAxis()
  );
  removeShipFromBoard(shipPositions, boardDiv);
}

function changeShipAxis(ship, player, boardDiv) {
  removeShip(ship, player, boardDiv);
  const createPos = ship.getCreatePos();
  const len = ship.getLen();
  const oldAxis = ship.getAxis();
  const newAxis = oldAxis === "x" ? "y" : "x";
  if (player.checkPlacement(createPos, len, newAxis))
    return createShip(player, boardDiv, createPos, len, newAxis);

  return createShip(player, boardDiv, createPos, len, oldAxis);
}

export { shipsLenghts, createShip, removeShip, changeShipAxis };
