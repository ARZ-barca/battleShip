import { gameBoardLen as len } from "./player";

// returns a populated div we use as board for placing ship in
function populatedSetupBoard() {
  const div = document.createElement("div");
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const positionDiv = document.createElement("div");
      positionDiv.classList.add("position", `p-${i}-${j}`);
      div.appendChild(positionDiv);
    }
  }
  div.classList.add("game-board");
  return div;
}

// adds event to click on each element of board div
function addEventToBoard(boardDiv, cb) {
  [...boardDiv.children].forEach((element) => {
    element.addEventListener("click", cb);
  });
}

// marks a ship on board
function markShipOnBoard(shipPositions, boardDiv) {
  shipPositions.forEach((p) => {
    const selector = `.p-${String(p).replace(",", "-")}`;
    const dom = boardDiv.querySelector(selector);
    dom.classList.add("ship");
  });
}

// removes a ship from board
function removeShipFromBoard(shipPositions, boardDiv) {
  shipPositions.forEach((p) => {
    const selector = `.p-${String(p).replace(",", "-")}`;
    const dom = boardDiv.querySelector(selector);
    dom.classList.remove("ship");
  });
}

function clearBoardDiv(boardDiv) {
  [...boardDiv.children].forEach((element) => {
    element.classList.remove("ship", "selected");
  });
}

export {
  populatedSetupBoard,
  addEventToBoard,
  markShipOnBoard,
  removeShipFromBoard,
  clearBoardDiv,
};
