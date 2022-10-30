/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import GameBoard from "./gameBoard";
import { BoardDiv, markShipOnBoard } from "./setup-dom";
import selectEvent, { removeSelectedShip } from "./ship-placement";

let gameBoard;
let boardDiv;
const shipMark = "ship";
const selectedMark = "selected";
const gameBoardLen = 10;

beforeAll(() => {
  gameBoard = GameBoard(gameBoardLen);
  boardDiv = BoardDiv(gameBoardLen);
});

describe("ship gets selected correctly when any ship wasn't selected before", () => {
  let ship;
  beforeAll(() => {
    ship = gameBoard.createShip([0, 0], 2, "x");
    markShipOnBoard(ship, boardDiv, shipMark);
  });
  afterAll(() => {
    gameBoard = GameBoard(gameBoardLen);
    boardDiv = BoardDiv(gameBoardLen);
    removeSelectedShip();
  });
  test("any ship doesn't get selected when click on empty position", () => {
    selectEvent(boardDiv.children[3], gameBoard, boardDiv);
    expect(gameBoard.ships).toContain(ship);
  });
  test("ship get selected when click on ship", () => {
    selectEvent(boardDiv.children[0], gameBoard, boardDiv);
    expect(gameBoard.ships).not.toContain(ship);
    expect(boardDiv.children[0].className).toContain(selectedMark);
    expect(boardDiv.children[1].className).toContain(selectedMark);
  });
});

describe("ship placement works correctly when a ship was selected before", () => {
  describe("click on another ship", () => {
    let ship;
    let ship2;
    beforeAll(() => {
      ship = gameBoard.createShip([0, 0], 2, "x");
      ship2 = gameBoard.createShip([0, 3], 2, "x");
      markShipOnBoard(ship, boardDiv, shipMark);
      markShipOnBoard(ship2, boardDiv, shipMark);
      selectEvent(boardDiv.children[0], gameBoard, boardDiv);
      selectEvent(boardDiv.children[3], gameBoard, boardDiv);
    });

    afterAll(() => {
      gameBoard = GameBoard(gameBoardLen);
      boardDiv = BoardDiv(gameBoardLen);
      removeSelectedShip();
    });

    test("original ship deselected", () => {
      expect(boardDiv.children[0].className).not.toContain(selectedMark);
      expect(boardDiv.children[1].className).not.toContain(selectedMark);

      expect(gameBoard.ships[0].positions).toEqual(ship.positions);
    });

    test("new ship selected", () => {
      expect(boardDiv.children[3].className).toContain(selectedMark);
      expect(boardDiv.children[4].className).toContain(selectedMark);

      expect(gameBoard.ships).not.toContain(ship2);
    });
  });

  describe("click on the same ship", () => {
    let ship;
    let ship2;
    beforeAll(() => {
      ship = gameBoard.createShip([0, 0], 2, "x");
      ship2 = gameBoard.createShip([0, 3], 2, "x");
      markShipOnBoard(ship, boardDiv, shipMark);
      markShipOnBoard(ship2, boardDiv, shipMark);
      selectEvent(boardDiv.children[0], gameBoard, boardDiv);
      selectEvent(boardDiv.children[1], gameBoard, boardDiv);
    });
    afterAll(() => {
      gameBoard = GameBoard(gameBoardLen);
      boardDiv = BoardDiv(gameBoardLen);
      removeSelectedShip();
    });
    test("original ship deleted", () => {
      expect(boardDiv.children[1].className).not.toContain(shipMark);

      expect(gameBoard.ships[1].positions).not.toEqual(ship.positions);
    });

    test("new ship created", () => {
      expect(boardDiv.children[0].className).toContain(shipMark);
      expect(boardDiv.children[gameBoardLen].className).toContain(shipMark);

      expect(gameBoard.ships[1].positions).toEqual({
        "0,0": "good",
        "1,0": "good",
      });
    });

    describe("can't change ship axis if it isn't possible", () => {
      beforeAll(() => {
        const ship = gameBoard.createShip(
          [gameBoardLen - 1, gameBoardLen - 2],
          2,
          "x"
        );
        markShipOnBoard(ship, boardDiv, shipMark);
        selectEvent(
          boardDiv.children[gameBoardLen ** 2 - 2],
          gameBoard,
          boardDiv
        );
        selectEvent(
          boardDiv.children[gameBoardLen ** 2 - 2],
          gameBoard,
          boardDiv
        );
      });
      test("ship is still selected", () => {
        expect(gameBoard.ships.length).toBe(2);
        expect(boardDiv.children[gameBoardLen ** 2 - 2].className).toContain(
          selectedMark
        );
        expect(boardDiv.children[gameBoardLen ** 2 - 1].className).toContain(
          selectedMark
        );
      });
    });
  });

  describe("click on empty position", () => {
    let ship;
    let ship2;
    beforeAll(() => {
      ship = gameBoard.createShip([0, 0], 2, "x");
      ship2 = gameBoard.createShip([0, 3], 2, "x");
      markShipOnBoard(ship, boardDiv, shipMark);
      markShipOnBoard(ship2, boardDiv, shipMark);
    });
    afterAll(() => {
      gameBoard = GameBoard(gameBoardLen);
      boardDiv = BoardDiv(gameBoardLen);
      removeSelectedShip();
    });
    describe("click on an unavailavle position", () => {
      beforeAll(() => {
        selectEvent(boardDiv.children[1], gameBoard, boardDiv);
        selectEvent(boardDiv.children[2], gameBoard, boardDiv);
      });
      test("ship is still selected", () => {
        expect(boardDiv.children[0].className).toContain(selectedMark);
        expect(boardDiv.children[1].className).toContain(selectedMark);
      });
    });
    describe("click on an availavle position", () => {
      beforeAll(() => {
        selectEvent(boardDiv.children[6], gameBoard, boardDiv);
      });
      test("ship is not selected", () => {
        expect(boardDiv.children[0].className).not.toContain(selectedMark);
        expect(boardDiv.children[1].className).not.toContain(selectedMark);
      });
      test("ship old postions is empty", () => {
        expect(boardDiv.children[0].className).not.toContain(shipMark);
        expect(boardDiv.children[1].className).not.toContain(shipMark);
      });
      test("ship new postions is 'ship'", () => {
        expect(boardDiv.children[6].className).toContain(shipMark);
        expect(boardDiv.children[7].className).toContain(shipMark);
      });
    });
  });
});
