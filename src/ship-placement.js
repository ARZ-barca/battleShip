// import markBoardDiv from "./game-dom";
// import { getHitShip } from "./gameBoard";
// import { gameBoardLen } from "./player";
// import { predictShipPositions } from "./ships";

import { markShipOnBoard, unmarkShipOnBoard } from "./setup-dom";

const shipMark = "ship";
const selectedMark = "selected";

let selectedShip;

function removeSelectedShip() {
  selectedShip = undefined;
}

function getSelectedShip() {
  return selectedShip;
}

function selectEvent(element, gameBoard, boardDiv) {
  const position = [
    element.getAttribute("data-row"),
    element.getAttribute("data-column"),
  ];
  if (!selectedShip) {
    // no ship was selected before
    if (!element.className.includes(shipMark)) {
      // clicked on empty position
      return;
    }
    // clicked on ship
    selectedShip = gameBoard.getHitShip(position);
    gameBoard.removeShip(selectedShip);
    markShipOnBoard(selectedShip, boardDiv, selectedMark);
    return;
  }
  // a ship was selected before
  if (element.className.includes(shipMark)) {
    // clicked on a ship
    if (Object.keys(selectedShip.positions).includes(String(position))) {
      // clicked the same ship
      const otherAxis = selectedShip.axis === "x" ? "y" : "x";
      if (
        gameBoard.checkPlacement(
          selectedShip.createPos,
          selectedShip.len,
          otherAxis
        )
      ) {
        // ship's axis can be changed
        unmarkShipOnBoard(selectedShip, boardDiv, selectedMark);
        unmarkShipOnBoard(selectedShip, boardDiv, shipMark);
        const ship = gameBoard.createShip(
          selectedShip.createPos,
          selectedShip.len,
          otherAxis
        );
        markShipOnBoard(ship, boardDiv, shipMark);
        removeSelectedShip();
      }
      // ship axis can't be changed
      return;
    }
    // clicked another ship
    unmarkShipOnBoard(selectedShip, boardDiv, selectedMark);
    gameBoard.createShip(
      selectedShip.createPos,
      selectedShip.len,
      selectedShip.axis
    );
    selectedShip = gameBoard.getHitShip(position);
    gameBoard.removeShip(selectedShip);
    markShipOnBoard(selectedShip, boardDiv, selectedMark);
    return;
  }
  // clicked on empty positions
  if (
    !gameBoard.checkPlacement(position, selectedShip.len, selectedShip.axis)
  ) {
    // can't place selected ship
    return;
  }
  // can place the ship there
  unmarkShipOnBoard(selectedShip, boardDiv, selectedMark);
  unmarkShipOnBoard(selectedShip, boardDiv, shipMark);
  const newShip = gameBoard.createShip(
    position,
    selectedShip.len,
    selectedShip.axis
  );
  markShipOnBoard(newShip, boardDiv, shipMark);
  removeSelectedShip();
}

// export default boardActivate;
export { removeSelectedShip, getSelectedShip };
export default selectEvent;
