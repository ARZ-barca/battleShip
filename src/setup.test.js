/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import Player, { gameBoardLen } from "./player";
import { populatedSetupBoard } from "./setup-dom";
import { changeShipAxis, createShip, removeShip } from "./setup";

describe("create ship effects dom and player board", () => {
  const player = Player();
  const boardDiv = populatedSetupBoard();
  createShip(player, boardDiv, [0, 0], 2, "x");
  describe("ship gets marked correctly on board div", () => {
    test("ship's first position on board is marked", () => {
      expect(boardDiv.children[0].getAttribute("class")).toContain("ship");
    });
    test("ship's second position on board is marked", () => {
      expect(boardDiv.children[1].getAttribute("class")).toContain("ship");
    });
  });
  describe("player creates the ship", () => {
    test("players game board contains a ship", () => {
      expect(player.getGameBoard().getShips().length).toBe(1);
    });
  });
});

describe("remove ship effects dom and player board", () => {
  const player = Player();
  const boardDiv = populatedSetupBoard();
  const ship = createShip(player, boardDiv, [0, 0], 2, "x");
  removeShip(ship, player, boardDiv);
  describe("ship removed correctly from board div", () => {
    test("ship's first position on board is not marked", () => {
      expect(boardDiv.children[0].getAttribute("class")).not.toContain("ship");
    });
    test("ship's second position on board is not marked", () => {
      expect(boardDiv.children[1].getAttribute("class")).not.toContain("ship");
    });
  });
  describe("player removes the ship", () => {
    test("players game board doesn't contains any ship", () => {
      expect(player.getGameBoard().getShips().length).toBe(0);
    });
  });
});

describe("change ship axis effects dom and player board", () => {
  describe("we can change ship axis for a ship that is possible to do", () => {
    const player = Player();
    const boardDiv = populatedSetupBoard();
    const ship = createShip(player, boardDiv, [0, 0], 2, "x");
    const newShip = changeShipAxis(ship, player, boardDiv);
    describe("old ship removed correctly from board div", () => {
      test("old ship's position on board is not marked", () => {
        expect(boardDiv.children[1].getAttribute("class")).not.toContain(
          "ship"
        );
      });
    });
    describe("player removes the old ship", () => {
      test("players game board doesn't contain old ship", () => {
        expect(player.getGameBoard().getShips()).not.toContain(ship);
      });
    });
    describe("new ship added to the board div", () => {
      test("new ship's position on board is marked", () => {
        expect(boardDiv.children[gameBoardLen].getAttribute("class")).toContain(
          "ship"
        );
      });
    });
    describe("player creats new ship in game board object", () => {
      test("players game board contains new ship", () => {
        expect(player.getGameBoard().getShips()).toContain(newShip);
      });
    });
  });
  describe("we can't change ship axis for a ship that is possible to do", () => {
    const player = Player();
    const boardDiv = populatedSetupBoard();
    const ship = createShip(player, boardDiv, [gameBoardLen - 1, 0], 2, "x");
    const newShip = changeShipAxis(ship, player, boardDiv);
    test("we can't change axis so old ship and new ship must be same (have the same end)", () => {
      expect(ship.getLastPos()).toEqual(newShip.getLastPos());
    });
  });
});
