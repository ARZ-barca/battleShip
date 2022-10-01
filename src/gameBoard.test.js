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
    beforeAll(() => {
      gameBoard.createShip([0, 0], 4, "x");
      gameBoard.createShip([0, 6], 1, "x");
      gameBoard.createShip([3, 3], 4, "y");
    });
    afterAll(() => {
      gameBoard = GameBoard(gameBoardLen);
    });

    test("test number of ships", () => {
      expect(gameBoard.getShips().length).toBe(3);
    });

    test("ships position in game board is marked with 'ship'", () => {
      expect(gameBoard.getPositions()[String([0, 0])]).toBe("ship");
      expect(gameBoard.getPositions()[String([0, 1])]).toBe("ship");
      expect(gameBoard.getPositions()[String([0, 3])]).toBe("ship");
      expect(gameBoard.getPositions()[String([0, 6])]).toBe("ship");
      expect(gameBoard.getPositions()[String([3, 3])]).toBe("ship");
      expect(gameBoard.getPositions()[String([4, 3])]).toBe("ship");
      expect(gameBoard.getPositions()[String([6, 3])]).toBe("ship");
    });

    // todo
    test("around ship position in game board is marked with 'unavailable'", () => {});
  });
});
