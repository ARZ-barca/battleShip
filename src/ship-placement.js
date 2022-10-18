import markBoardDiv from "./game-dom";
import { getHitShip } from "./gameBoard";
import { gameBoardLen } from "./player";
import { predictShipPositions } from "./ships";

let selectedShip;
// activates the board for moving around ship in it
function boardActivate(boardDiv, gameBoard) {
  for (let i = 0; i < gameBoardLen; i++) {
    for (let j = 0; j < gameBoardLen; j++) {
      const positionDiv = [...boardDiv.children][i * gameBoardLen + j];
      positionDiv.addEventListener("click", (e) => {
        if (!selectedShip) {
          // if a ship isn't already slected
          if (e.target.getAttribute("class").includes("ship")) {
            // if player clicked on a ship
            selectedShip = selectShip(gameBoard, [i, j])
          }
        } else {
          // a ship is already selected
          if (e.target.getAttribute("class").includes("ship")) {
            // if player clicked on a ship
            if () {}
          }
        }
      });
    }
  }
}

// selects a ship and remove it from gameBoard os we can place ships arround it
function selectShip(gameBoard, position) {
  const selectedShip = getHitShip(gameBoard.getShips(), position);
  gameBoard.removeShip(selectedShip);
  const shipPositions = predictShipPositions(
    selectedShip.getCreatePos(),
    selectedShip.getLen(),
    selectedShip.getAxis()
  );
  markBoardDiv(boardDiv, shipPositions, "selected");
  return selectedShip
}

function removeSelectedShip() {
  selectedShip = undefined;
}

export default boardActivate;
export { removeSelectedShip };
