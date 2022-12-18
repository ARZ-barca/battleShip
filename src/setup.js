import {
  BoardDiv,
  clearBoardDiv,
  markShipOnBoard,
  unmarkShipOnBoard,
} from "./setup-dom";
import Player, { gameBoardLen, AiPlayer } from "./player";
import selectEvent, {
  removeSelectedShip,
  getSelectedShip,
} from "./ship-placement";
import attack from "./attack";

// ships to be created lengths
const shipsLenghts = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

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

  const startButton = document.createElement("button");
  startButton.textContent = "start";
  startButton.classList.add("start");

  // container for buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(randomButton);
  buttonContainer.appendChild(startButton);

  // rules for ship selection
  // select a ship by clicking on it
  // change ship axis by clicking on it again
  // move ship by clicking on empty spot
  // you can't place ship next to each other

  const rules = document.createElement("ol");
  rules.classList.add("rules");
  rules.innerHTML = `
    <li>select a ship by clicking on it</li>
    <li>change ship axis by clicking on it again</li>
    <li>move ship by clicking on an empty spot</li>
    <li>you can't place ships next to each other</li>
  `;

  mainDiv.appendChild(boardDivContainer);
  mainDiv.appendChild(rules);
  mainDiv.appendChild(buttonContainer);

  // populate game board and board div with random ships
  player.gameBoard.randomize(shipsLenghts);
  player.gameBoard.ships.forEach((ship) => {
    markShipOnBoard(ship, playerBoardDiv, "ship");
  });

  // player randomizes his board
  randomButton.addEventListener("click", () => {
    clearBoardDiv(playerBoardDiv);
    player.gameBoard.clear();
    player.gameBoard.randomize(shipsLenghts);
    player.gameBoard.ships.forEach((ship) => {
      markShipOnBoard(ship, playerBoardDiv, "ship");
    });
    removeSelectedShip();
  });

  // when player tries to replace a ship
  [...playerBoardDiv.children].forEach((element) => {
    element.addEventListener("click", (e) =>
      selectEvent(e.target, player.gameBoard, playerBoardDiv)
    );
  });

  startButton.addEventListener("click", () => {
    const aiPlayer = AiPlayer();
    const aiBoardDiv = BoardDiv(gameBoardLen);
    aiPlayer.gameBoard.randomize(shipsLenghts);
    aiPlayer.gameBoard.ships.forEach((ship) => {
      markShipOnBoard(ship, aiBoardDiv, "ship");
    });

    mainDiv.innerHTML = "";

    // if player selected a ship before starting the game
    // create the ship because it was removed
    const selectedShip = getSelectedShip();
    if (selectedShip) {
      // a ship was selected before starting the game
      unmarkShipOnBoard(selectedShip, playerBoardDiv, "selected");
      player.gameBoard.createShip(
        selectedShip.createPos,
        selectedShip.len,
        selectedShip.axis
      );
    }
    // to ignore click events after the game started
    playerBoardDiv.classList.add("player");
    // to hide ai ships
    aiBoardDiv.classList.add("ai");

    boardDivContainer.appendChild(playerBoardDiv);
    boardDivContainer.appendChild(aiBoardDiv);

    mainDiv.appendChild(boardDivContainer);

    // when player attacks ai
    [...aiBoardDiv.children].forEach((element) => {
      element.addEventListener("click", (e) => {
        // player attack positioon
        const attackPosition = [
          e.target.getAttribute("data-row"),
          e.target.getAttribute("data-column"),
        ];

        attack(player, aiPlayer, attackPosition, e.target, aiBoardDiv);
        if (aiPlayer.gameBoard.isGameOver()) {
          // player won and game ends
          playerBoardDiv.classList.add("over");
          aiBoardDiv.classList.add("over");
          gameOver("you", mainDiv);
        } else {
          // game continues

          // ai attack position
          const aiAttackPosition = aiPlayer.getAttackPosition().split(",");

          // player board elemnt to mark
          const selector = `*[data-row="${aiAttackPosition[0]}"][data-column="${aiAttackPosition[1]}"]`;
          const positionDiv = playerBoardDiv.querySelector(selector);

          attack(
            aiPlayer,
            player,
            aiAttackPosition,
            positionDiv,
            playerBoardDiv
          );
          if (player.gameBoard.isGameOver()) {
            // ai won and game ends
            playerBoardDiv.classList.add("over");
            aiBoardDiv.classList.add("over");
            gameOver("ai", mainDiv);
          }
        }
      });
    });
  });
}

function gameOver(winnerName, mainDiv) {
  const gameOverDiv = document.createElement("div");
  gameOverDiv.classList.add("game-over");

  const winnerText = document.createElement("p");
  winnerText.textContent = `${winnerName} won`;
  winnerText.classList.add("winner-text");

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = `Play Again`;
  playAgainButton.classList.add("play-again");

  gameOverDiv.appendChild(winnerText);
  gameOverDiv.appendChild(playAgainButton);

  playAgainButton.addEventListener("click", () => {
    mainDiv.innerHTML = "";
    initializeSetup(mainDiv);
  });
  mainDiv.appendChild(gameOverDiv);
}

export default initializeSetup;

export { shipsLenghts };
