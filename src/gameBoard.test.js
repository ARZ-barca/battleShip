import GameBoard from "./gameBoard";

describe("GameBoard factory function with gameBoard length of 10", () => {
  const gameBoardLen = 10;
  let gameBoard = GameBoard(gameBoardLen);

  test("gameBoard has correct number of positions", () => {
    expect(Object.keys(gameBoard.getPositions()).length).toBe(
      gameBoardLen ** 2
    );
  });

  test("gameBoard positions are all 'empty'", () => {
    expect(Object.values(gameBoard.getPositions())).toEqual(
      [...Array(gameBoardLen ** 2)].fill("empty")
    );
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
    beforeAll(() => {
      ship1 = gameBoard.createShip([0, 0], 4, "x");
      gameBoard.removeShip(ship1);
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
    test("game board dosn't has the ship", () => {
      expect(gameBoard.getShips()).not.toContain(ship1);
    });
  });

  describe("changing a ship axis for a ship with original axis of 'x'", () => {
    let newShip;
    let ship1;
    beforeAll(() => {
      ship1 = gameBoard.createShip([0, 0], 4, "x");
      newShip = gameBoard.changeShipAxis(ship1, "y");
    });
    afterAll(() => {
      gameBoard = GameBoard(gameBoardLen);
    });
    test("ship's origial create location is still 'ship'", () => {
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
      newShip = gameBoard.changeShipAxis(ship1, "x");
    });
    afterAll(() => {
      gameBoard = GameBoard(gameBoardLen);
    });
    test("ship's origial create location is still 'ship'", () => {
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
  });

  describe("check possibility of placing ships in different positions", () => {
    let ship1;
    let ship2;
    beforeAll(() => {
      ship1 = gameBoard.createShip([0, 0], 4, "x");
      ship2 = gameBoard.createShip([5, 5], 4, "y");
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
      expect(gameBoard.checkPlacement([0, 9], 2, "x")).toBeFalsy();
      expect(gameBoard.checkPlacement([8, 3], 3, "y")).toBeFalsy();
    });
  });
});
