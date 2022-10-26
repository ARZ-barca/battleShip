/* eslint-disable no-undef */
import Player, { gameBoardLen, AiPlayer } from "./player";

let player1;
let player2;
beforeAll(() => {
  player1 = Player();
  player2 = AiPlayer();
});

test("players have a game board", () => {
  expect(player1.gameBoard).toBeDefined();
  expect(player2.gameBoard).toBeDefined();
});

test("players gameBoqard has correct len", () => {
  expect(player1.gameBoardLen).toBe(gameBoardLen);
  expect(player2.gameBoardLen).toBe(gameBoardLen);
});

// describe("players can change a ship axis", () => {
//   let ship;
//   let newShip;
//   beforeAll(() => {
//     player1 = Player();
//     player2 = AiPlayer();
//     ship = player1.createShip([0, 0], 4, "x");
//     newShip = player1.changeShipAxis(ship);
//   });

//   afterAll(() => {
//     player1 = Player();
//     player2 = AiPlayer();
//   });

//   test("player's gameBoard does'n contain the original ship", () => {
//     expect(player1.getGameBoard().getShips()).not.toContain(ship);
//   });

//   test("player's gameBoard contain the new ship", () => {
//     expect(player1.getGameBoard().getShips()).toContain(newShip);
//   });
// });

// describe("clear player's board", () => {
//   const player = Player();
//   const ship1 = player.createShip([9, 0], 4, "x");
//   const ship2 = player.createShip([0, 0], 4, "x");
//   const ship3 = player.createShip([4, 4], 4, "x");
//   const ship4 = player.createShip([4, 4], 4, "x");
//   const ship5 = player.createShip([4, 4], 4, "x");
//   const ship6 = player.createShip([4, 4], 4, "x");
//   const ship7 = player.createShip([4, 4], 4, "x");
//   const ship8 = player.createShip([4, 4], 4, "x");
//   player.clear();

//   test("player have 0 ships", () => {
//     expect(player.getGameBoard().getShips().length).toBe(0);
//   });

//   test("player have 0 ships", () => {
//     expect(player.getGameBoard().getShips()).not.toContain(ship1);
//     expect(player.getGameBoard().getShips()).not.toContain(ship2);
//     expect(player.getGameBoard().getShips()).not.toContain(ship3);
//     expect(player.getGameBoard().getShips()).not.toContain(ship4);
//     expect(player.getGameBoard().getShips()).not.toContain(ship5);
//     expect(player.getGameBoard().getShips()).not.toContain(ship6);
//     expect(player.getGameBoard().getShips()).not.toContain(ship7);
//     expect(player.getGameBoard().getShips()).not.toContain(ship8);
//   });
// });

// test("players initialize their shots correctly", () => {
//   expect(player1.getAvailableShots().length).toBe(gameBoardLen ** 2);
//   expect(player1.getAvailableShots()[0]).toBe("0,0");
// });

// describe("players attack funtionality", () => {
//   beforeAll(() => {
//     player1 = Player();
//     player2 = AiPlayer();
//     player2.createShip([0, 0], 2, "x");
//   });
//   afterAll(() => {
//     player1 = Player();
//     player2 = AiPlayer();
//   });
//   test("players attack registers correctley", () => {
//     player1.attack(player2.getGameBoard(), [0, 0]);
//     expect(player1.getAvailableShots().length).toBe(gameBoardLen ** 2 - 1);
//     expect(player1.getAvailableShots()).not.toContain("0,0");
//   });
//   test("oponent ship sunk", () => {
//     const ship = player1.attack(player2.getGameBoard(), [0, 1]);
//     expect(ship.isSunk()).toBeTruthy();
//     expect(player1.getAvailableShots()).not.toContain("0,1");
//   });
//   test("players miss attacks registers correctley", () => {
//     const ship = player1.attack(player2.getGameBoard(), [2, 2]);
//     expect(ship).toBeUndefined();
//   });
//   test("around the ships removed from available shots", () => {
//     expect(player1.getAvailableShots()).not.toContain("0,2");
//     expect(player1.getAvailableShots()).not.toContain("1,0");
//     expect(player1.getAvailableShots()).not.toContain("1,1");
//     expect(player1.getAvailableShots()).not.toContain("1,2");
//     expect(player1.getAvailableShots().length).toBe(gameBoardLen ** 2 - 7);
//   });
//   describe("ai choosing attack position works correctly", () => {
//     beforeAll(() => {
//       for (let i = 0; i < gameBoardLen ** 2 - 3; i++) {
//         player2.attack(player1.getGameBoard(), player2.getAttackPosition());
//       }
//     });
//     test("ai player chooses one of available shots", () => {
//       expect(player2.getAvailableShots()).toContain(
//         player2.getAttackPosition()
//       );
//     });
//     test("correct amount of shots", () => {
//       expect(player2.getAvailableShots().length).toBe(3);
//     });
//   });
// });
