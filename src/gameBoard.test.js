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

  // describe("repositioning a ship", () => {
  //   describe("repositioning the create location", () => {
  //     beforeAll(() => {
  //       const ship1 = gameBoard.createShip([0, 0], 4, "x");
  //       gameBoard.rePositionShip(ship1, [5, 5], "x");
  //     });
  //     afterAll(() => {
  //       gameBoard = GameBoard(gameBoardLen);
  //     });
  //     test("ship's origial place is empty", () => {
  //       expect(gameBoard.getPositions()[String([0, 0])]).toBe("empty");
  //       expect(gameBoard.getPositions()[String([0, 3])]).toBe("empty");
  //     });
  //     test("around ship's origial place is empty", () => {
  //       expect(gameBoard.getPositions()[String([1, 0])]).toBe("empty");
  //       expect(gameBoard.getPositions()[String([0, 4])]).toBe("empty");
  //     });
  //   });
  // });
});
