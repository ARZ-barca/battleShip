/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import { gameBoardLen } from "./player";
import {
  populatedSetupBoard,
  addEventToBoard,
  markShipOnBoard,
  removeShipFromBoard,
} from "./setup-dom";
import { predictShipPositions } from "./ships";

describe("player gameBoard get populated correctly", () => {
  const boardDiv = populatedSetupBoard();
  test("created div has correct number of children", () => {
    expect(boardDiv.children.length).toBe(gameBoardLen ** 2);
  });
  test("returned div has class of 'game-board'", () => {
    expect(boardDiv.getAttribute("class")).toContain("game-board");
  });
});

describe("board's each position has the event listener", () => {
  const mockCallBack = jest.fn();
  const boardDiv = populatedSetupBoard();
  addEventToBoard(boardDiv, mockCallBack);
  boardDiv.children[0].click();
  test("board first element respondes to click", () => {
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});

describe("ships on board get marked correctly", () => {
  const shipPositions = predictShipPositions([0, 0], 2, "y");
  const boardDiv = populatedSetupBoard();
  markShipOnBoard(shipPositions, boardDiv);
  const pos1 = boardDiv.querySelector(".p-0-0");
  const pos2 = boardDiv.querySelector(".p-1-0");
  const nonShipPos1 = boardDiv.querySelector(".p-0-1");
  const nonShipPos2 = boardDiv.querySelector(".p-1-1");
  test("ships first position has 'ship' class", () => {
    expect(pos1.getAttribute("class")).toContain("ship");
  });
  test("ships second position has 'ship' class", () => {
    expect(pos2.getAttribute("class")).toContain("ship");
  });
  test("random positions don't have 'ship' class", () => {
    expect(nonShipPos1.getAttribute("class")).not.toContain("ship");
    expect(nonShipPos2.getAttribute("class")).not.toContain("ship");
  });
});

describe("ships on board get removed correctly", () => {
  const shipPositions = predictShipPositions([0, 0], 2, "y");
  const boardDiv = populatedSetupBoard();
  markShipOnBoard(shipPositions, boardDiv);
  const pos1 = boardDiv.querySelector(".p-0-0");
  const pos2 = boardDiv.querySelector(".p-1-0");
  removeShipFromBoard(shipPositions, boardDiv);
  test("ships first position doesn't have 'ship' class", () => {
    expect(pos1.getAttribute("class")).not.toContain("ship");
  });
  test("ships second position doesn't have 'ship' class", () => {
    expect(pos2.getAttribute("class")).not.toContain("ship");
  });
});
