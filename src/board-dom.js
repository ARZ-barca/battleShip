import Player, { AiPlayer, gameBoardLen as len } from "./player";
import { predictShipPositions } from "./ships";
import { getHitShip } from "./gameBoard";

// place ship in Dom
function placeShipInDom(shipPositions, boardDom) {
  shipPositions.forEach((p) => {
    const selector = `.p-${String(p).replace(",", "-")}`;
    const dom = boardDom.querySelector(selector);
    dom.classList.add("ship");
  });
}

// place ship in board
function placeShip(player, boardDom, createPos, len, axis) {
  const board = player.getGameBoard();
  board.createShip(createPos, len, axis);
  const shipPositions = predictShipPositions(createPos, len, axis);
  placeShipInDom(shipPositions, boardDom);
}

// populate human board
function popHboard(boardDom, len) {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const positionDom = document.createElement("div");
      positionDom.classList.add("position", `p-${i}-${j}`);
      boardDom.appendChild(positionDom);
    }
  }
}

// board dom can receive attack
function receiveAttackDom(board, boardDom, attacker, position, positionDom) {
  attacker.attack(board, position);
  if (board.checkAttack(position)) {
    positionDom.textContent = "X";
    const ship = getHitShip(board.getShips(), position);
    if (ship.isSunk()) {
      const positionsAroundShip = board.getPositionsAroundShip(ship);
      positionsAroundShip.forEach((p) => {
        const selector = `.p-${String(p).replace(",", "-")}`;
        const dom = boardDom.querySelector(selector);
        dom.textContent = "O";
      });
    }
  } else {
    positionDom.textContent = "O";
  }
}

// populate Ai board
function popAiBoard(board, attacker, boardDom, len) {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const positionDom = document.createElement("div");
      positionDom.classList.add("position", `p-${i}-${j}`);
      boardDom.appendChild(positionDom);
      positionDom.addEventListener("click", () => {
        receiveAttackDom(board, boardDom, attacker, [i, j], positionDom);
      });
    }
  }
}

// human and ai players
const hPlayer = Player();
const aiPlayer = AiPlayer();

// main game loop
function main() {
  const humanBoardDom = document.querySelector(".game-board.human");
  const aiBoardDom = document.querySelector(".game-board.ai");
  popHboard(humanBoardDom, len);
  popAiBoard(aiPlayer.getGameBoard(), hPlayer, aiBoardDom, len);
  placeShip(hPlayer, humanBoardDom, [1, 1], 4, "x");
  placeShip(aiPlayer, aiBoardDom, [1, 1], 2, "x");
  placeShip(aiPlayer, aiBoardDom, [5, 5], 4, "y");
}

export default main;
