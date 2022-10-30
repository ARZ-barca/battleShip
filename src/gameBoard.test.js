/* eslint-disable no-undef */
import GameBoard from "./gameBoard";

const gameBoardLen = 10;
let gameBoard;
beforeAll(() => {
  gameBoard = GameBoard(gameBoardLen);
});

test("gameBoard has correct number of positions", () => {
  expect(Object.keys(gameBoard.positions).length).toBe(gameBoardLen ** 2);
});

test("gameBoard positions are all 'empty'", () => {
  expect(Object.values(gameBoard.positions)).toEqual(
    [...Array(gameBoardLen ** 2)].fill("empty")
  );
});

test("gameBoard storse positions in correct format", () => {
  expect(Object.keys(gameBoard.positions)[0]).toBe("0,0");
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
    expect(gameBoard.ships.length).toBe(3);
  });

  test("gameBoard has the ships", () => {
    expect(gameBoard.ships).toContain(ship1);
    expect(gameBoard.ships).toContain(ship2);
    expect(gameBoard.ships).toContain(ship3);
  });

  test("first ship's position in game board is marked with 'ship'", () => {
    expect(gameBoard.positions[String([0, 0])]).toBe("ship");
    expect(gameBoard.positions[String([0, 1])]).toBe("ship");
  });

  test("second ship's position in game board is marked with 'ship'", () => {
    expect(gameBoard.positions[String([0, 6])]).toBe("ship");
  });

  test("third ship's position in game board is marked with 'ship'", () => {
    expect(gameBoard.positions[String([3, 3])]).toBe("ship");
    expect(gameBoard.positions[String([6, 3])]).toBe("ship");
  });

  test("around first ship position in game board is marked with 'unavailable'", () => {
    expect(gameBoard.positions[String([1, 0])]).toBe("unavailable");
    expect(gameBoard.positions[String([0, 4])]).toBe("unavailable");
  });
  test("around second ship position in game board is marked with 'unavailable'", () => {
    expect(gameBoard.positions[String([0, 7])]).toBe("unavailable");
    expect(gameBoard.positions[String([1, 6])]).toBe("unavailable");
  });
  test("around third ship position in game board is marked with 'unavailable'", () => {
    expect(gameBoard.positions[String([3, 4])]).toBe("unavailable");
    expect(gameBoard.positions[String([7, 3])]).toBe("unavailable");
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
    ship2 = gameBoard.createShip([3, 0], 4, "x");
    ship3 = gameBoard.createShip([5, 0], 4, "x");
    ship4 = gameBoard.createShip([9, 0], 4, "x");
    ship5 = gameBoard.createShip([7, 0], 4, "x");
    gameBoard.removeShip(ship1);
    gameBoard.removeShip(ship2);
    gameBoard.removeShip(ship3);
    gameBoard.removeShip(ship4);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("ship's original position is empty", () => {
    expect(gameBoard.positions[String([0, 0])]).toBe("empty");
    expect(gameBoard.positions[String([0, 3])]).toBe("empty");
  });
  test("around ship's original position is empty", () => {
    expect(gameBoard.positions[String([1, 0])]).toBe("empty");
    expect(gameBoard.positions[String([0, 4])]).toBe("empty");
  });
  test("game board dosn't have the removed ships", () => {
    expect(gameBoard.ships).not.toContain(ship1);
    expect(gameBoard.ships).not.toContain(ship2);
    expect(gameBoard.ships).not.toContain(ship3);
    expect(gameBoard.ships).not.toContain(ship4);
  });

  test("game board dosn't have the removed ships", () => {
    expect(gameBoard.ships).toContain(ship5);
  });

  test("game board has correct number of ships", () => {
    expect(gameBoard.ships.length).toBe(1);
  });

  test("game board doesn't make around other ship's empty when they shuold be 'unavailable'", () => {
    expect(gameBoard.positions[String([8, 0])]).toBe("unavailable");
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
    expect(gameBoard.checkPlacement([4, 5], 2, "x")).toBeFalsy();
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

describe("getHitShip", () => {
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
    expect(gameBoard.getHitShip([0, 0])).toBe(ship1);
  });

  test("second ship got hit", () => {
    expect(gameBoard.getHitShip([2, 0])).toBe(ship2);
  });

  test("if shot arround a ship return undefined", () => {
    expect(gameBoard.getHitShip([2, 4])).toBeUndefined();
  });

  test("if shot misses by more than 1 distance return undefined", () => {
    expect(gameBoard.getHitShip([2, 5])).toBeUndefined();
  });
});

describe("gameBoard's getHit", () => {
  let ship1;
  let ship2;
  beforeAll(() => {
    ship1 = gameBoard.createShip([0, 0], 4, "x");
    ship2 = gameBoard.createShip([2, 0], 2, "x");
    gameBoard.getHit([0, 0]);
    gameBoard.getHit([0, 2]);
    gameBoard.getHit([2, 0]);
    gameBoard.getHit([3, 0]);
    gameBoard.getHit([2, 1]);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("first ship got hit", () => {
    expect(ship1.positions).toEqual({
      "0,0": "hit",
      "0,1": "good",
      "0,2": "hit",
      "0,3": "good",
    });
  });
  test("second ship got hit", () => {
    expect(ship2.positions).toEqual({
      "2,0": "hit",
      "2,1": "hit",
    });
  });
});

describe("game over", () => {
  beforeAll(() => {
    gameBoard.createShip([0, 0], 2, "x");
    gameBoard.createShip([2, 0], 2, "x");
    gameBoard.getHit([0, 0]);
    gameBoard.getHit([0, 1]);
    gameBoard.getHit([2, 0]);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("game is not over", () => {
    expect(gameBoard.isGameOver()).toBeFalsy();
  });
  test("game is over", () => {
    gameBoard.getHit([2, 1]);
    expect(gameBoard.isGameOver()).toBeTruthy();
  });
});

describe("clear gameBoard", () => {
  beforeAll(() => {
    gameBoard.createShip([0, 0], 2, "x");
    gameBoard.createShip([2, 0], 2, "x");
    gameBoard.clear();
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("gameBoard doesn't have any ship after clear", () => {
    expect(gameBoard.ships.length).toBe(0);
  });

  test("gameBoard positions are all 'empty'", () => {
    expect(Object.values(gameBoard.positions)).toEqual(
      [...Array(gameBoardLen ** 2)].fill("empty")
    );
  });
});

describe("random ships get created correctly", () => {
  const len = 4;
  let ship;
  beforeAll(() => {
    gameBoard.createShip([0, 0], 2, "x");
    gameBoard.createShip([2, 0], 2, "x");
    gameBoard.createShip([4, 0], 2, "x");
    gameBoard.createShip([6, 0], 2, "x");
    gameBoard.createShip([0, 3], 2, "y");
    gameBoard.createShip([0, 6], 2, "y");
    ship = gameBoard.getRandomShip(len);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("ship has correct length", () => {
    expect(ship.len).toBe(len);
  });
  test("ship has 'x' axis or 'y' and not always the same", () => {
    const randomAxises = [];
    for (let i = 0; i < 100; i++) {
      const ship = gameBoard.getRandomShip(len);
      randomAxises.push(ship.axis);
      expect(ship.axis).toMatch(/x|y/);
    }
    expect(randomAxises).toContain("x");
    expect(randomAxises).toContain("y");
  });
  test("ship's placement is valid for 100 times", () => {
    for (let i = 0; i < 100; i++) {
      const ship = gameBoard.getRandomShip(len);
      expect(
        gameBoard.checkPlacement(ship.createPos, len, ship.axis)
      ).toBeTruthy();
    }
  });
});

describe("game board randomizes correctly", () => {
  const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  beforeAll(() => {
    gameBoard.randomize(lengths);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
  });
  test("game board has correct number of ships", () => {
    expect(gameBoard.ships.length).toBe(lengths.length);
  });
  test("game board throw an error if game board is to small for the given ships", () => {
    expect(() => gameBoard.randomize(Array(100).fill(4))).toThrow();
  });
});
