/* eslint-disable no-undef */
import GameBoard, { getHitShip } from "./gameBoard";

const gameBoardLen = 10;
let gameBoard;
beforeAll(() => {
  gameBoard = GameBoard(gameBoardLen);
});
test("gameBoard has correct number of positions", () => {
  expect(Object.keys(gameBoard.getPositions()).length).toBe(gameBoardLen ** 2);
});

test("gameBoard positions are all 'empty'", () => {
  expect(Object.values(gameBoard.getPositions())).toEqual(
    [...Array(gameBoardLen ** 2)].fill("empty")
  );
});

test("gameBoard storse positions in correct format", () => {
  expect(Object.keys(gameBoard.getPositions())[0]).toBe("0,0");
});

describe("ship creation tests", () => {
  let ship1;
  let ship2;
  let ship3;
  beforeAll(() => {
    ship1 = gameBoard.createShip([0, 0], 4, "x");
    ship2 = gameBoard.createShip([0, 6], 1, "x");
    ship3 = gameBoard.createShip([3, 3], 4, "y");
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });

  test("test number of ships", () => {
    expect(gameBoard.getShips().length).toBe(3);
  });

  test("gameBoard has the ships", () => {
    expect(gameBoard.getShips()).toContain(ship1);
    expect(gameBoard.getShips()).toContain(ship2);
    expect(gameBoard.getShips()).toContain(ship3);
  });

  test("first ship's position in game board is marked with 'ship'", () => {
    expect(gameBoard.getPositions()[String([0, 0])]).toBe("ship");
    expect(gameBoard.getPositions()[String([0, 1])]).toBe("ship");
  });

  test("second ship's position in game board is marked with 'ship'", () => {
    expect(gameBoard.getPositions()[String([0, 6])]).toBe("ship");
  });

  test("third ship's position in game board is marked with 'ship'", () => {
    expect(gameBoard.getPositions()[String([3, 3])]).toBe("ship");
    expect(gameBoard.getPositions()[String([6, 3])]).toBe("ship");
  });

  test("around first ship position in game board is marked with 'unavailable'", () => {
    expect(gameBoard.getPositions()[String([1, 0])]).toBe("unavailable");
    expect(gameBoard.getPositions()[String([0, 4])]).toBe("unavailable");
  });
  test("around second ship position in game board is marked with 'unavailable'", () => {
    expect(gameBoard.getPositions()[String([0, 7])]).toBe("unavailable");
    expect(gameBoard.getPositions()[String([1, 6])]).toBe("unavailable");
  });
  test("around third ship position in game board is marked with 'unavailable'", () => {
    expect(gameBoard.getPositions()[String([3, 4])]).toBe("unavailable");
    expect(gameBoard.getPositions()[String([7, 3])]).toBe("unavailable");
  });
});

describe("removing a ship", () => {
  let ship1;
  let ship2;
  let ship3;
  let ship4;
  let ship5;
  beforeAll(() => {
    ship1 = gameBoard.createShip([0, 0], 4, "x");
    ship2 = gameBoard.createShip([9, 0], 4, "x");
    ship3 = gameBoard.createShip([9, 0], 4, "x");
    ship4 = gameBoard.createShip([9, 0], 4, "x");
    ship5 = gameBoard.createShip([9, 0], 4, "x");
    gameBoard.removeShip(ship1);
    gameBoard.removeShip(ship2);
    gameBoard.removeShip(ship3);
    gameBoard.removeShip(ship4);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("ship's original position is empty", () => {
    expect(gameBoard.getPositions()[String([0, 0])]).toBe("empty");
    expect(gameBoard.getPositions()[String([0, 3])]).toBe("empty");
  });
  test("around ship's original position is empty", () => {
    expect(gameBoard.getPositions()[String([1, 0])]).toBe("empty");
    expect(gameBoard.getPositions()[String([0, 4])]).toBe("empty");
  });
  test("game board dosn't have the removed ships", () => {
    expect(gameBoard.getShips()).not.toContain(ship1);
    expect(gameBoard.getShips()).not.toContain(ship2);
    expect(gameBoard.getShips()).not.toContain(ship3);
    expect(gameBoard.getShips()).not.toContain(ship4);
  });

  test("game board dosn't have the removed ships", () => {
    expect(gameBoard.getShips()).toContain(ship5);
  });

  test("game board has correct number of ships", () => {
    expect(gameBoard.getShips().length).toBe(1);
  });
});

describe("changing a ship axis for a ship with original axis of 'x'", () => {
  let newShip;
  let ship1;
  beforeAll(() => {
    ship1 = gameBoard.createShip([0, 0], 4, "x");
    newShip = gameBoard.changeShipAxis(ship1);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("ship's origial create position is still 'ship'", () => {
    expect(gameBoard.getPositions()[String([0, 0])]).not.toBe("empty");
  });
  test("ship's origial place is 'empty'", () => {
    expect(gameBoard.getPositions()[String([0, 3])]).toBe("empty");
  });
  test("around ship's origial place is 'empty'", () => {
    expect(gameBoard.getPositions()[String([1, 4])]).toBe("empty");
    expect(gameBoard.getPositions()[String([0, 4])]).toBe("empty");
  });
  test("gameBoard doesn't contain the ship in its ships", () => {
    expect(gameBoard.getShips()).not.toContain(ship1);
  });
  test("ship's new place is 'ship'", () => {
    expect(gameBoard.getPositions()[String([1, 0])]).toBe("ship");
    expect(gameBoard.getPositions()[String([3, 0])]).toBe("ship");
  });
  test("around ship's new place is 'unavailable'", () => {
    expect(gameBoard.getPositions()[String([0, 1])]).toBe("unavailable");
    expect(gameBoard.getPositions()[String([4, 1])]).toBe("unavailable");
  });
  test("gameBoard does contain the new ship in its ships", () => {
    expect(gameBoard.getShips().length).toBe(1);
    expect(gameBoard.getShips()).toContain(newShip);
  });
});

describe("changing a ship axis for a ship with original axis of 'y'", () => {
  let newShip;
  let ship1;
  beforeAll(() => {
    ship1 = gameBoard.createShip([0, 0], 4, "y");
    newShip = gameBoard.changeShipAxis(ship1);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("ship's origial create position is still 'ship'", () => {
    expect(gameBoard.getPositions()[String([0, 0])]).not.toBe("empty");
  });
  test("ship's origial place is 'empty'", () => {
    expect(gameBoard.getPositions()[String([3, 0])]).toBe("empty");
  });
  test("around ship's origial place is 'empty'", () => {
    expect(gameBoard.getPositions()[String([4, 1])]).toBe("empty");
    expect(gameBoard.getPositions()[String([4, 0])]).toBe("empty");
  });
  test("gameBoard doesn't contain the ship in its ships", () => {
    expect(gameBoard.getShips()).not.toContain(ship1);
  });
  test("ship's new place is 'ship'", () => {
    expect(gameBoard.getPositions()[String([0, 1])]).toBe("ship");
    expect(gameBoard.getPositions()[String([0, 3])]).toBe("ship");
  });
  test("around ship's new place is 'unavailable'", () => {
    expect(gameBoard.getPositions()[String([1, 0])]).toBe("unavailable");
    expect(gameBoard.getPositions()[String([1, 4])]).toBe("unavailable");
  });
  test("gameBoard does contain the new ship in its ships", () => {
    expect(gameBoard.getShips().length).toBe(1);
    expect(gameBoard.getShips()).toContain(newShip);
  });

  test("gameBoard has correct number of positions after ship creation", () => {
    expect(Object.keys(gameBoard.getPositions()).length).toBe(
      gameBoardLen ** 2
    );
  });
});

describe("check possibility of placing ships in different positions", () => {
  beforeAll(() => {
    gameBoard.createShip([0, 0], 4, "x");
    gameBoard.createShip([5, 5], 4, "y");
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("can't place a ship on top of another ship", () => {
    expect(gameBoard.checkPlacement([0, 0], 2, "x")).toBeFalsy();
    expect(gameBoard.checkPlacement([0, 3], 2, "y")).toBeFalsy();
    expect(gameBoard.checkPlacement([5, 4], 2, "x")).toBeFalsy();
  });
  test("can't place a ship on 'unaveilable' positions", () => {
    expect(gameBoard.checkPlacement([0, 4], 2, "x")).toBeFalsy();
    expect(gameBoard.checkPlacement([1, 3], 2, "y")).toBeFalsy();
    expect(gameBoard.checkPlacement([5, 6], 2, "x")).toBeFalsy();
  });
  test("can't place a ship out of game board", () => {
    expect(gameBoard.checkPlacement([0, gameBoardLen], 2, "x")).toBeFalsy();
    expect(gameBoard.checkPlacement([gameBoardLen - 1, 3], 3, "y")).toBeFalsy();
  });
});

describe("removing ships tests", () => {
  let ship1;
  beforeAll(() => {
    ship1 = gameBoard.createShip([0, 0], 4, "x");
    gameBoard.removeShip(ship1);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });

  test("ship's origial place is 'empty'", () => {
    expect(gameBoard.getPositions()[String([3, 0])]).toBe("empty");
  });

  test("around ship's origial place is 'empty'", () => {
    expect(gameBoard.getPositions()[String([4, 1])]).toBe("empty");
    expect(gameBoard.getPositions()[String([4, 0])]).toBe("empty");
  });

  test("gameBoard doesn't contain the ship in its ships", () => {
    expect(gameBoard.getShips()).not.toContain(ship1);
  });
});

describe("game board check attack correctly", () => {
  beforeAll(() => {
    gameBoard.createShip([0, 0], 4, "x");
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });

  test("gameboard recognizes an attack will miss", () => {
    expect(gameBoard.checkAttack([1, 0])).toBeFalsy();
  });

  test("gameboard recognizes an attack will miss", () => {
    expect(gameBoard.checkAttack([0, 0])).toBeTruthy();
  });
});

describe("get the ship that got hit", () => {
  let ship1;
  let ship2;
  beforeAll(() => {
    ship1 = gameBoard.createShip([0, 0], 4, "x");
    ship2 = gameBoard.createShip([2, 0], 4, "x");
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });

  test("first ship got hit", () => {
    expect(getHitShip(gameBoard.getShips(), [0, 0])).toBe(ship1);
  });

  test("second ship got hit", () => {
    expect(getHitShip(gameBoard.getShips(), [2, 0])).toBe(ship2);
  });
});

describe("game board receive attack", () => {
  let ship1;
  let ship2;
  beforeAll(() => {
    ship1 = gameBoard.createShip([0, 0], 4, "x");
    ship2 = gameBoard.createShip([2, 0], 2, "x");
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([0, 2]);
    gameBoard.receiveAttack([2, 0]);
    gameBoard.receiveAttack([3, 0]);
    gameBoard.receiveAttack([2, 1]);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("first ship got hit", () => {
    expect(ship1.getPositions()).toEqual({
      "0,0": "hit",
      "0,1": "good",
      "0,2": "hit",
      "0,3": "good",
    });
    expect(ship1.isSunk()).toBeFalsy();
  });
  test("second ship got hit", () => {
    expect(ship2.getPositions()).toEqual({
      "2,0": "hit",
      "2,1": "hit",
    });
    expect(ship2.isSunk()).toBeTruthy();
  });
});

describe("game over", () => {
  beforeAll(() => {
    gameBoard.createShip([0, 0], 4, "x");
    gameBoard.createShip([2, 0], 2, "x");
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([0, 1]);
    gameBoard.receiveAttack([0, 2]);
    gameBoard.receiveAttack([2, 0]);
    gameBoard.receiveAttack([2, 1]);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("game is not over", () => {
    expect(gameBoard.isGameOver()).toBeFalsy();
  });
  test("game is over", () => {
    gameBoard.receiveAttack([0, 3]);
    expect(gameBoard.isGameOver()).toBeTruthy();
  });
});

// describe("game board receiveAttack functionality", () => {
//   let ship;
//   beforeAll(() => {
//     ship = gameBoard.createShip([0, 0], 4, "x");
//     gameBoard.receiveAttack([0, 0]);
//     gameBoard.receiveAttack([0, 1]);
//     gameBoard.receiveAttack([0, 2]);
//     gameBoard.receiveAttack([1, 1]);
//     gameBoard.receiveAttack([0, 3]);
//   });
//   afterAll(() => {
//     gameBoard = GameBoard(gameBoardLen);
//   });
//   test("game board receive hit shots corectly", () => {
//     expect(gameBoard.getAttacks().hitShots).toContain(String([0, 0]));
//     expect(gameBoard.getAttacks().hitShots).toContain(String([0, 3]));
//     expect(gameBoard.getAttacks().hitShots).not.toContain(String([1, 1]));
//   });
//   test("game board receive miss shots corectly", () => {
//     expect(gameBoard.getAttacks().missedShots.length).toBe(1);
//     expect(gameBoard.getAttacks().missedShots).toContain(String([1, 1]));
//   });
//   test("game board sink the ship correctly corectly", () => {
//     expect(ship.isSunk()).toBeTruthy();
//   });
//   test("game board marks around the sunk ship correctly", () => {
//     expect(gameBoard.getAttacks().unavailableShots).toContain(String([0, 4]));
//     expect(gameBoard.getAttacks().unavailableShots).toContain(String([1, 0]));
//     expect(gameBoard.getAttacks().unavailableShots).toContain(String([1, 3]));
//   });
// });

// describe("game board can tell if all of the ships have been sunk", () => {
//   beforeAll(() => {
//     gameBoard.createShip([0, 0], 1, "x");
//     gameBoard.createShip([2, 3], 2, "y");
//     gameBoard.receiveAttack([0, 0]);
//     gameBoard.receiveAttack([2, 3]);
//   });
//   afterAll(() => {
//     gameBoard = GameBoard(gameBoardLen);
//   });

//   test("isGameOver method workds correctly", () => {
//     expect(gameBoard.isGameOver()).toBeFalsy();
//     gameBoard.receiveAttack([3, 3]);
//     expect(gameBoard.isGameOver()).toBeTruthy();
//   });
// });
