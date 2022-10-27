import { gameBoardLen as len } from "./player";

// returns a populated div we use as board for placing ship in
function BoardDiv() {
  const div = document.createElement("div");
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const positionDiv = document.createElement("div");
      positionDiv.setAttribute("data-row", i);
      positionDiv.setAttribute("data-column", j);
      div.appendChild(positionDiv);
    }
  }
  div.classList.add("board");
  return div;
}

// add mark to ship position's class
function markShipOnBoard(ship, boardDiv, mark) {
  Object.keys(ship.positions).forEach((p) => {
    const position = p.split(",");
    const selector = `*[data-row="${position[0]}"][data-column="${position[1]}"]`;
    const dom = boardDiv.querySelector(selector);
    dom.classList.add(mark);
  });
}

// removes a ship from board
function unmarkShipOnBoard(ship, boardDiv, mark) {
  Object.keys(ship.positions).forEach((p) => {
    const position = p.split(",");
    const selector = `*[data-row="${position[0]}"][data-column="${position[1]}"]`;
    const dom = boardDiv.querySelector(selector);
    dom.classList.remove(mark);
  });
}

function clearBoardDiv(boardDiv) {
  [...boardDiv.children].forEach((element) => {
    element.className = "";
  });
}

export { BoardDiv, markShipOnBoard, unmarkShipOnBoard, clearBoardDiv };
