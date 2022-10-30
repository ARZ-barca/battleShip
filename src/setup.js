import { BoardDiv, clearBoardDiv, markShipOnBoard } from "./setup-dom";
import Player, { gameBoardLen } from "./player";
import selectEvent, { removeSelectedShip } from "./ship-placement";

// ships to be created lengths
const shipsLenghts = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

// // changes a ship axis in board div and in player's board object if possible
// function changeShipAxis(ship, player, boardDiv) {
//   removeShip(ship, player, boardDiv);
//   const createPos = ship.getCreatePos();
//   const len = ship.getLen();
//   const oldAxis = ship.getAxis();
//   const newAxis = oldAxis === "x" ? "y" : "x";
//   if (player.checkPlacement(createPos, len, newAxis))
//     return createShip(player, boardDiv, createPos, len, newAxis);

//   return createShip(player, boardDiv, createPos, len, oldAxis);
// }

// initialize the setup
function initializeSetup(mainDiv) {
  const playerBoardDiv = BoardDiv(gameBoardLen);
  const player = Player();

  const boardDivContainer = document.createElement("div");
  boardDivContainer.classList.add("board-container");
  boardDivContainer.appendChild(playerBoardDiv);

  const randomButton = document.createElement("button");
  randomButton.textContent = "random";
  randomButton.classList.add("random");

  // const startButton = document.createElement("button");
  // startButton.textContent = "start";
  // startButton.classList.add("start");

  mainDiv.appendChild(boardDivContainer);
  mainDiv.appendChild(randomButton);
  // mainDiv.appendChild(startButton);

  // populate game board and board div with random ships
  player.gameBoard.randomize(shipsLenghts);
  player.gameBoard.ships.forEach((ship) => {
    markShipOnBoard(ship, playerBoardDiv, "ship");
  });

  randomButton.addEventListener("click", () => {
    clearBoardDiv(playerBoardDiv);
    player.gameBoard.clear();
    player.gameBoard.randomize(shipsLenghts);
    player.gameBoard.ships.forEach((ship) => {
      markShipOnBoard(ship, playerBoardDiv, "ship");
    });
    removeSelectedShip();
  });

  [...playerBoardDiv.children].forEach((element) => {
    element.addEventListener("click", (e) =>
      selectEvent(e.target, player.gameBoard, playerBoardDiv)
    );
  });

  // startButton.addEventListener("click", () => {
  //   const aiPlayer = AiPlayer();
  //   const aiBoardDiv = populatedSetupBoard();
  //   populateBoardRandom(aiPlayer, aiBoardDiv, shipsLenghts);
  //   mainDiv.innerHTML = "";
  //   main(mainDiv, player, aiPlayer, playerBoardDiv, aiBoardDiv);
  // });
}

export default initializeSetup;

export {
  shipsLenghts,
  // createShip,
  // removeShip,
  // changeShipAxis,
  // populateBoardRandom,
};
