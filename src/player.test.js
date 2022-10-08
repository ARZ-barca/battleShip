/* eslint-disable no-undef */
import Player, { gameBoardLen, AiPlayer } from "./player";

let player1;
let player2;
beforeAll(() => {
  player1 = Player();
  player2 = AiPlayer();
});

test("players have a game board", () => {
  expect(player1.getGameBoard()).toBeDefined();
  expect(player2.getGameBoard()).toBeDefined();
});

test("players gameBoqard has correct len", () => {
  expect(player1.getGameBoardLen()).toBe(gameBoardLen);
  expect(player2.getGameBoardLen()).toBe(gameBoardLen);
});

test("players initialize their shots correctly", () => {
  expect(player1.getAvailableShots().length).toBe(gameBoardLen ** 2);
  expect(player1.getAvailableShots()[0]).toBe("0,0");
});

describe("players attack funtionality", () => {
  beforeAll(() => {
    player1.attack(player2.getGameBoard(), [0, 0]);
  });
  afterAll(() => {
    player1 = Player();
    player2 = AiPlayer();
  });
  test("players attack registers correctley", () => {
    expect(player1.getAvailableShots().length).toBe(gameBoardLen ** 2 - 1);
    expect(player1.getAvailableShots()).not.toContain("0,0");
  });
  test("oponent recieved the attack correctly", () => {
    expect(player2.getGameBoard().getAttacks().missedShots).toContain(
      String([0, 0])
    );
  });
  describe("ai choosing attack position works correctly", () => {
    beforeAll(() => {
      for (let i = 0; i < gameBoardLen ** 2 - 3; i++) {
        player2.attack(player1.getGameBoard(), player2.getAttackPosition());
      }
    });
    test("ai player chooses one of available shots", () => {
      expect(player2.getAvailableShots()).toContain(
        player2.getAttackPosition()
      );
    });
  });
});
