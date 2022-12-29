import GameBoard from "./gameBoard";

const gameBoardLen = 10;

// so ai can intelligently attack
let nextAiAttacks = [];

// attack method for a player to attack another player
function attack(state, targetPlayer, position) {
  targetPlayer.gameBoard.getHit(position);
}

// get positions arround a give pos that ai hit so it can try to sink the ship
function getAttackPosesForAi(availableShots, pos) {
  const targets = [];
  const posList = String(pos).split(",");
  for (const i of [1, -1]) {
    if (availableShots.indexOf(String([+posList[0] + i, posList[1]])) !== -1) {
      targets.push(String([+posList[0] + i, posList[1]]));
    }
    if (availableShots.indexOf(String([+posList[0], +posList[1] + i])) !== -1) {
      targets.push(String([+posList[0], +posList[1] + i]));
    }
  }
  return targets;
}

function getImpossiblePositions(pos, gameBoard) {
  const posList = String(pos).split(",");
  const hitShip = gameBoard.getHitShip(pos);
  if (
    hitShip.positions[String([+posList[0] + 1, posList[1]])] === "hit" ||
    hitShip.positions[String([+posList[0] - 1, posList[1]])] === "hit"
  ) {
    return [
      String([+posList[0], +posList[1] + 1]),
      String([+posList[0], +posList[1] - 1]),

      String([+posList[0] + 1, +posList[1] + 1]),
      String([+posList[0] + 1, +posList[1] - 1]),
      String([+posList[0] - 1, +posList[1] + 1]),
      String([+posList[0] - 1, +posList[1] - 1]),
    ];
  }
  if (
    hitShip.positions[String([+posList[0], +posList[1] + 1])] === "hit" ||
    hitShip.positions[String([+posList[0], +posList[1] - 1])] === "hit"
  ) {
    return [
      String([+posList[0] + 1, +posList[1]]),
      String([+posList[0] - 1, +posList[1]]),

      String([+posList[0] + 1, +posList[1] + 1]),
      String([+posList[0] - 1, +posList[1] + 1]),
      String([+posList[0] + 1, +posList[1] - 1]),
      String([+posList[0] - 1, +posList[1] - 1]),
    ];
  }
}

function aiAttack(state, targetPlayer, position) {
  const positionIndex = state.availableShots.indexOf(String(position));
  if (positionIndex !== -1) {
    state.availableShots.splice(positionIndex, 1);
  }
  targetPlayer.gameBoard.getHit(position);

  const ship = targetPlayer.gameBoard.getHitShip(position);
  if (ship) {
    // is was a hit
    if (ship.isSunk()) {
      // it hit a ship and ship sunk

      // ai should attack a random pos next
      nextAiAttacks = [];

      const positions = targetPlayer.gameBoard.getPositionsAroundShip(ship);
      positions.forEach((p) => {
        const positionIndex = state.availableShots.indexOf(String(p));
        if (positionIndex !== -1) {
          state.availableShots.splice(positionIndex, 1);
        }
      });
    } else {
      // it hit but ship didn't sink
      nextAiAttacks = nextAiAttacks.concat(
        getAttackPosesForAi(state.availableShots, position)
      );

      // Geniues!!!
      const imposiblePoses = getImpossiblePositions(
        position,
        targetPlayer.gameBoard
      );
      if (imposiblePoses !== undefined) {
        imposiblePoses.forEach((p) => {
          if (nextAiAttacks.indexOf(p) !== -1) {
            nextAiAttacks.splice(nextAiAttacks.indexOf(p), 1);
          }
        });
      }
    }
  }
}

// add attack method to an object
const addAttack = (state) => ({
  attack: (targetPlayer, position) => attack(state, targetPlayer, position),
});

const addAiAttack = (state) => ({
  attack: (targetPlayer, position) => aiAttack(state, targetPlayer, position),
});

// choose a random element from array
function randomElement(array) {
  const len = array.length;
  const i = Math.floor(Math.random() * len);
  return array[i];
}

// method for ai to choose an attack position
function getAttackPosition(state) {
  if (nextAiAttacks.length === 0) return randomElement(state.availableShots);
  const target = nextAiAttacks[0];
  nextAiAttacks.splice(0, 1);
  return target;
}

// add getAttackPosition method to an object
const addGetAttackPosition = (state) => ({
  getAttackPosition: () => getAttackPosition(state),
});

// factory function for human Player
function Player() {
  const state = {
    gameBoard: GameBoard(gameBoardLen),
    gameBoardLen,
    availableShots: [],
  };

  // initialize the available shots
  for (let i = 0; i < gameBoardLen; i++) {
    for (let j = 0; j < gameBoardLen; j++) {
      state.availableShots.push(String([i, j]));
    }
  }

  return {
    get state() {
      return state;
    },
    get gameBoard() {
      return state.gameBoard;
    },
    get gameBoardLen() {
      return state.gameBoardLen;
    },
    get availableShots() {
      return state.availableShots;
    },
    ...addAttack(state),
  };
}

// factory function for ai Player
function AiPlayer() {
  const player = Player();
  const { state } = player;
  return { ...player, ...addGetAttackPosition(state), ...addAiAttack(state) };
}

export default Player;
export { gameBoardLen, AiPlayer };
