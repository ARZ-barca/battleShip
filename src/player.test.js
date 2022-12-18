/* eslint-disable no-undef */
import Player, { gameBoardLen, AiPlayer } from "./player";

let player;
let aiPlayer;
beforeAll(() => {
  player = Player();
  aiPlayer = AiPlayer();
});

test("players have a game board", () => {
  expect(player.gameBoard).toBeDefined();
  expect(aiPlayer.gameBoard).toBeDefined();
});

test("players gameBoqard has correct len", () => {
  expect(player.gameBoardLen).toBe(gameBoardLen);
  expect(aiPlayer.gameBoardLen).toBe(gameBoardLen);
});

test("players initialize their shots correctly", () => {
  expect(player.availableShots.length).toBe(gameBoardLen ** 2);
  expect(player.availableShots[0]).toBe("0,0");
  expect(player.availableShots[5]).toBe("0,5");
  expect(aiPlayer.availableShots.length).toBe(gameBoardLen ** 2);
  expect(aiPlayer.availableShots[0]).toBe("0,0");
  expect(aiPlayer.availableShots[5]).toBe("0,5");
});

// describe("players attack funtionality", () => {
//   let playerShip;
//   let aiShip;
//   beforeAll(() => {
//     player = Player();
//     aiPlayer = AiPlayer();
//     playerShip = player.gameBoard.createShip([0, 0], 2, "x");
//     aiShip = aiPlayer.gameBoard.createShip([0, 0], 2, "x");
//   });
//   afterAll(() => {
//     player = Player();
//     aiPlayer = AiPlayer();
//   });
//   test("players attack registers correctley", () => {
//     player.attack(aiPlayer, [0, 0]);
//     aiPlayer.attack(player, [0, 0]);
//     expect(player.availableShots.length).toBe(gameBoardLen ** 2 - 1);
//     expect(player.availableShots).not.toContain("0,0");
//     expect(aiPlayer.availableShots.length).toBe(gameBoardLen ** 2 - 1);
//     expect(aiPlayer.availableShots).not.toContain("0,0");
//   });
//   test("when ship get sunk shots arround the ship get removed", () => {
//     player.attack(aiPlayer, [0, 1]);

//     expect(aiShip.isSunk()).toBeTruthy();
//     expect(player.availableShots).not.toContain("0,2");
//     expect(player.availableShots).not.toContain("1,0");
//     expect(player.availableShots).not.toContain("1,1");
//     expect(player.availableShots).not.toContain("1,2");
//     expect(player.availableShots).not.toContain("0,1");
//     expect(player.availableShots.length).toBe(gameBoardLen ** 2 - 6);
//   });
//   test("don't remove a shot when a ship sinks if it had been a missed shot before", () => {
//     aiPlayer.attack(player, [0, 1]);
//     aiPlayer.attack(player, [1, 2]);
//     expect(playerShip.isSunk()).toBeTruthy();
//     expect(aiPlayer.availableShots).not.toContain("0,2");
//     expect(aiPlayer.availableShots.length).toBe(gameBoardLen ** 2 - 6);
//   });
//   describe("ai choosing attack position works correctly", () => {
//     afterAll(() => {
//       player = Player();
//       aiPlayer = AiPlayer();
//     });
//     test("ai chooses an available attack 100 times", () => {
//       for (let i = 0; i < 100; i++) {
//         expect(aiPlayer.availableShots).toContain(aiPlayer.getAttackPosition());
//       }
//     });
//   });
// });
