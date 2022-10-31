/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import attack from "./attack";
import Player, { AiPlayer } from "./player";
import { BoardDiv, markShipOnBoard } from "./setup-dom";

let player;
let ai;
let playerBoardDiv;
let aiBoardDiv;

beforeAll(() => {
  player = Player();
  ai = AiPlayer();
  playerBoardDiv = BoardDiv();
  aiBoardDiv = BoardDiv();

  player.gameBoard.createShip([0, 0], 2, "x");
  player.gameBoard.ships.forEach((ship) => {
    markShipOnBoard(ship, playerBoardDiv, "ship");
  });

  ai.gameBoard.createShip([0, 0], 2, "x");
  ai.gameBoard.ships.forEach((ship) => {
    markShipOnBoard(ship, aiBoardDiv, "ship");
  });
});

describe("attack", () => {
  beforeAll(() => {
    attack(player, ai, [0, 0], aiBoardDiv.children[0]);
    attack(player, ai, [0, 3], aiBoardDiv.children[3]);
  });
  test("hit was marked correctly", () => {
    expect(aiBoardDiv.children[0].className).toContain("hit");
  });
  test("miss was marked correctly", () => {
    expect(aiBoardDiv.children[3].className).toContain("miss");
  });
});
