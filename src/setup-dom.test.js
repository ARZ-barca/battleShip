/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import Player, { gameBoardLen } from "./player";
import { populatedSetupBoard } from "./setup-dom";

let player1;

beforeAll(() => {
  player1 = Player();
});

describe("player gameBoard get populated correctly", () => {
  const boardDiv = populatedSetupBoard();
  test("created div has correct number of children", () => {
    expect(boardDiv.children.length).toBe(gameBoardLen ** 2);
  });
});
