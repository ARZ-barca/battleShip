import { markShipOnBoard } from "./setup-dom";

// event for when player attacks ai board
function attack(attacker, target, position, element, targetBoardDiv) {
  attacker.attack(target, position);

  // to check if attack hit or miss
  const hitShip = target.gameBoard.getHitShip(position);
  if (hitShip) {
    // attack was a hit
    element.classList.add("hit");
    if (hitShip.isSunk()) {
      markShipOnBoard(hitShip, targetBoardDiv, "sunk");
    }
  } else {
    // attack was a miss
    element.classList.add("miss");
  }
}

export default attack;
