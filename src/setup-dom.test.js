/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import { gameBoardLen, gameBoardLen as len } from "./player";
import {
  BoardDiv,
  markShipOnBoard,
  unmarkShipOnBoard,
  clearBoardDiv,
} from "./setup-dom";
import Ship from "./ships";

describe("BoardDiv works as expected", () => {
  const boardDiv = BoardDiv();
  test("created div has correct number of children", () => {
    expect(boardDiv.children.length).toBe(len ** 2);
  });
  test("returned div has class of 'board'", () => {
    expect(boardDiv.getAttribute("class")).toContain("board");
  });
  test("each of board divs has correct 'data-row' and 'data-column'", () => {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        expect(boardDiv.children[i * len + j].getAttribute("data-row")).toBe(
          String(i)
        );
        expect(boardDiv.children[i * len + j].getAttribute("data-column")).toBe(
          String(j)
        );
      }
    }
  });
});

describe("ships on board get marked correctly", () => {
  let ship;
  let boardDiv;
  const mark = "ship";
  beforeAll(() => {
    ship = Ship([0, 0], 2, "y");
    boardDiv = BoardDiv();
    markShipOnBoard(ship, boardDiv, mark);
  });

  test("ship's position's has 'ship' class", () => {
    const firstPosDiv = boardDiv.querySelector(
      '*[data-row="0"][data-column="0"]'
    );
    const secondPosDiv = boardDiv.querySelector(
      '*[data-row="1"][data-column="0"]'
    );
    expect(firstPosDiv.getAttribute("class")).toContain(mark);
    expect(secondPosDiv.getAttribute("class")).toContain(mark);
  });
});

describe("ships on board get unmarked correctly", () => {
  let ship;
  let boardDiv;
  const mark = "ship";
  beforeAll(() => {
    ship = Ship([0, 0], 2, "y");
    boardDiv = BoardDiv();
    markShipOnBoard(ship, boardDiv, mark);
    unmarkShipOnBoard(ship, boardDiv, mark);
  });

  test("ship's position's has 'ship' class", () => {
    const firstPosDiv = boardDiv.querySelector(
      '*[data-row="0"][data-column="0"]'
    );
    const secondPosDiv = boardDiv.querySelector(
      '*[data-row="1"][data-column="0"]'
    );
    expect(firstPosDiv.getAttribute("class")).not.toContain(mark);
    expect(secondPosDiv.getAttribute("class")).not.toContain(mark);
  });
});

describe("clearing a board div", () => {
  const ship1 = Ship([0, 0], 2, "y");
  const ship2 = Ship([0, 2], 1, "y");
  const ship3 = Ship([0, 4], 1, "x");
  const ship4 = Ship([0, 6], 4, "y");
  const mark = "ship";

  const boardDiv = BoardDiv(gameBoardLen);
  markShipOnBoard(ship1, boardDiv, mark);
  markShipOnBoard(ship2, boardDiv, mark);
  markShipOnBoard(ship3, boardDiv, mark);
  markShipOnBoard(ship4, boardDiv, mark);

  clearBoardDiv(boardDiv);
  test("none of board positions have class 'ship'", () => {
    [...boardDiv.children].forEach((element) => {
      expect(element.getAttribute("class")).not.toContain(mark);
    });
  });
  test("you can mark ship on board after clearing it", () => {
    markShipOnBoard(ship1, boardDiv, mark);
    const firstPosDiv = boardDiv.querySelector(
      '*[data-row="0"][data-column="0"]'
    );
    expect(firstPosDiv.getAttribute("class")).toContain(mark);
  });
});
