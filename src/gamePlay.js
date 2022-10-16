/* eslint-disable import/no-cycle */
import markBoardDiv from "./game-dom";
import { gameBoardLen } from "./player";
import initializeSetup from "./setup";

// gets the index of position div in board div from a given position
function getIndexOfposition(position) {
  const [i, j] = String(position).split(",");
  return +i * gameBoardLen + +j;
}

// to announce winner and ask for play again
function gameOver(message) {
  const gameOverDiv = document.createElement("div");

  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "play again";

  gameOverDiv.appendChild(messageDiv);
  gameOverDiv.appendChild(playAgainButton);

  return gameOverDiv;
}

// ai attacks after the player attack
function aiAttack(aiPlayer, playerBoard, playerBoardDiv, aiBoardDiv, mainDiv) {
  const aiAttackPosition = aiPlayer.getAttackPosition();
  const ship = aiPlayer.attack(playerBoard, aiAttackPosition);
  const positionDiv = [...playerBoardDiv.children][
    getIndexOfposition(aiAttackPosition)
  ];
  if (ship) {
    // it was a hit
    positionDiv.classList.add("hit");
    if (ship.isSunk()) {
      // it sunk a ship
      const arroundPositions = playerBoard.getPositionsAroundShip(ship);
      markBoardDiv(playerBoardDiv, arroundPositions, "invalid");
    }
  } else {
    // it was a miss
    positionDiv.classList.add("miss");
  }

  if (playerBoard.isGameOver()) {
    const gameOverDiv = gameOver("you lost!");
    aiBoardDiv.classList.add("finished");
    mainDiv.appendChild(gameOverDiv);
    const playAgainButton = gameOverDiv.querySelector("button");
    playAgainButton.addEventListener("click", () => {
      mainDiv.innerHTML = "";
      initializeSetup(mainDiv);
    });
  }
}

// event for when player attacks ai board
function playerAttack(
  position,
  humanPlayer,
  aiPlayer,
  playerBoard,
  aiBoard,
  aiBoardDiv,
  playerBoardDiv,
  positionDiv,
  mainDiv
) {
  const ship = humanPlayer.attack(aiBoard, position);
  if (ship) {
    // it was a hit
    positionDiv.classList.add("hit");
    if (ship.isSunk()) {
      // it sunk a ship
      const arroundPositions = aiBoard.getPositionsAroundShip(ship);
      markBoardDiv(aiBoardDiv, arroundPositions, "invalid");
    }
  } else {
    // it was a miss
    positionDiv.classList.add("miss");
  }

  if (aiBoard.isGameOver()) {
    const gameOverDiv = gameOver("you won!");
    aiBoardDiv.classList.add("finished");
    mainDiv.appendChild(gameOverDiv);
    const playAgainButton = gameOverDiv.querySelector("button");
    playAgainButton.addEventListener("click", () => {
      mainDiv.innerHTML = "";
      initializeSetup(mainDiv);
    });
  } else {
    aiAttack(aiPlayer, playerBoard, playerBoardDiv, aiBoardDiv, mainDiv);
  }
}

// main game play function that gets called when game starts
function main(mainDiv, humanPlayer, aiPlayer, playerBoardDiv, aiBoardDiv) {
  const boardsContainer = document.createElement("div");
  boardsContainer.classList.add("boards-container");
  boardsContainer.appendChild(playerBoardDiv);
  boardsContainer.appendChild(aiBoardDiv);

  const aiPostionsDivs = [...aiBoardDiv.children];
  // adding event listener to each position div in ai board div
  for (let i = 0; i < gameBoardLen; i++) {
    for (let j = 0; j < gameBoardLen; j++) {
      aiPostionsDivs[i * gameBoardLen + j].addEventListener("click", (e) => {
        const positionDiv = e.target;
        const position = [i, j];
        playerAttack(
          position,
          humanPlayer,
          aiPlayer,
          humanPlayer.getGameBoard(),
          aiPlayer.getGameBoard(),
          aiBoardDiv,
          playerBoardDiv,
          positionDiv,
          mainDiv
        );
      });
    }
  }
  mainDiv.appendChild(boardsContainer);
}

export default main;
export { playerAttack, aiAttack };
