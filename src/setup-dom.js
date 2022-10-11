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

export {
  populatedSetupBoard,
  addEventToBoard,
  markShipOnBoard,
  removeShipFromBoard,
};

// import Player, { AiPlayer, gameBoardLen as len } from "./player";
// import { predictShipPositions } from "./ships";
// import { getHitShip } from "./gameBoard";

// // place ship in Dom
// function placeShipInDom(shipPositions, boardDom) {
//   shipPositions.forEach((p) => {
//     const selector = `.p-${String(p).replace(",", "-")}`;
//     const dom = boardDom.querySelector(selector);
//     dom.classList.add("ship");
//   });
// }

// // populate human board
// function popHboard(boardDom, len) {
//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j < len; j++) {
//       const positionDom = document.createElement("div");
//       positionDom.classList.add("position", `p-${i}-${j}`);
//       boardDom.appendChild(positionDom);
//     }
//   }
// }

// // place ship in board
// function placeShip(player, boardDom, createPos, len, axis) {
//   const board = player.getGameBoard();
//   board.createShip(createPos, len, axis);
//   const shipPositions = predictShipPositions(createPos, len, axis);
//   placeShipInDom(shipPositions, boardDom);
// }

// // event listener for attacking ai board so we can remove it later
// let attackEventListener;
// // board dom can receive attack
// function receiveAttackDom(board, boardDom, attacker, position, positionDom) {
//   attacker.attack(board, position);
//   if (board.checkAttack(position)) {
//     positionDom.textContent = "X";
//     const ship = getHitShip(board.getShips(), position);
//     if (ship.isSunk()) {
//       const positionsAroundShip = board.getPositionsAroundShip(ship);
//       positionsAroundShip.forEach((p) => {
//         const selector = `.p-${String(p).replace(",", "-")}`;
//         const dom = boardDom.querySelector(selector);
//         dom.textContent = "O";
//         dom.classList.remove("selectable");
//       });
//     }
//   } else {
//     positionDom.textContent = "O";
//   }
// }

// function aiAttacks(humanBoard, humanBoardDom, aiPlayer) {
//   const attackPosition = aiPlayer.getAttackPosition();
//   const selector = `.p-${String(attackPosition).replace(",", "-")}`;
//   const positionDom = humanBoardDom.querySelector(selector);
//   receiveAttackDom(
//     humanBoard,
//     humanBoardDom,
//     aiPlayer,
//     attackPosition,
//     positionDom
//   );
// }

// // populate Ai board
// function popAiBoard(
//   aiPlayer,
//   aiBoard,
//   aiBoardDom,
//   humanPlayer,
//   humanBoard,
//   humanBoardDom,
//   len
// ) {
//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j < len; j++) {
//       const positionDom = document.createElement("div");
//       positionDom.classList.add("position", `p-${i}-${j}`, "selectable");
//       aiBoardDom.appendChild(positionDom);
//       attackEventListener = () => {
//         //  to check if shot is available
//         if (aiBoard.getAttacks().unavailableShots.includes(String([i, j]))) {
//           return;
//         }
//         receiveAttackDom(aiBoard, aiBoardDom, humanPlayer, [i, j], positionDom);
//         if (aiBoard.isGameOver()) {
//           console.log("player won");
//           aiBoardDom.classList.add("game-over");
//           return;
//         }
//         aiAttacks(humanBoard, humanBoardDom, aiPlayer);
//         if (humanBoard.isGameOver()) {
//           console.log("ai won");
//           aiBoardDom.classList.add("game-over");
//           return;
//         }
//         positionDom.classList.remove("selectable");
//         // check if game is over
//       };
//       positionDom.addEventListener("click", attackEventListener, {
//         once: true,
//         capture: false,
//       });
//     }
//   }
// }

// // human and ai players and boards
// const hPlayer = Player();
// const aiPlayer = AiPlayer();
// const humanBoardDom = document.querySelector(".game-board.human");
// const aiBoardDom = document.querySelector(".game-board.ai");
// const aiBoard = aiPlayer.getGameBoard();
// const humanBoard = hPlayer.getGameBoard();

// // main game loop (popAiBoard is where loops happens)
// function main() {
//   popHboard(humanBoardDom, len);
//   popAiBoard(
//     aiPlayer,
//     aiBoard,
//     aiBoardDom,
//     hPlayer,
//     humanBoard,
//     humanBoardDom,
//     len
//   );
//   placeShip(hPlayer, humanBoardDom, [1, 1], 1, "x");
//   placeShip(aiPlayer, aiBoardDom, [1, 1], 2, "x");
//   placeShip(aiPlayer, aiBoardDom, [5, 5], 4, "y");
// }

// export default main;
// export { placeShipInDom };
