import { gameBoardLen } from "./player";

// adds a class to given positions of game baord div
function markBoardDiv(boardDiv, positions, mark) {
  for (const position of positions) {
    const [i, j] = String(position).split(",");
    [...boardDiv.children][+i * gameBoardLen + +j].classList.add(mark);
  }
}

export default markBoardDiv;
