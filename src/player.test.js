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

describe("players can place ship's in their game board", () => {
  let ship;
  beforeAll(() => {
    player1 = Player();
    player2 = AiPlayer();
    ship = player1.createShip([0, 0], 4, "x");
  });

  afterAll(() => {
    player1 = Player();
    player2 = AiPlayer();
  });

  test("players game board contains the ship", () => {
    expect(player1.getGameBoard().getShips().length).toBe(1);
    expect(player1.getGameBoard().getShips()).toContain(ship);
  });
});

describe("players can check a ship's placement validity in their game board", () => {
  beforeAll(() => {
    player1 = Player();
    player2 = AiPlayer();
    player1.createShip([0, 0], 4, "x");
  });

  afterAll(() => {
    player1 = Player();
    player2 = AiPlayer();
  });

  test("can't place on top of another ship", () => {
    expect(player1.checkPlacement([1, 1], 2, "x")).toBeFalsy();
  });
});

describe("players can remove a ship their game board", () => {
  let ship;
  beforeAll(() => {
    player1 = Player();
    player2 = AiPlayer();
    ship = player1.createShip([0, 0], 4, "x");
    player1.removeShip(ship);
  });

  afterAll(() => {
    player1 = Player();
    player2 = AiPlayer();
  });

  test("player's gameBoard does'n contain the ship", () => {
    expect(player1.getGameBoard().getShips()).not.toContain(ship);
  });
});

describe("players can change a ship axis", () => {
  let ship;
  let newShip;
  beforeAll(() => {
    player1 = Player();
    player2 = AiPlayer();
    ship = player1.createShip([0, 0], 4, "x");
    newShip = player1.changeShipAxis(ship, "y");
  });

  afterAll(() => {
    player1 = Player();
    player2 = AiPlayer();
  });

  test("player's gameBoard does'n contain the original ship", () => {
    expect(player1.getGameBoard().getShips()).not.toContain(ship);
  });

  test("player's gameBoard contain the new ship", () => {
    expect(player1.getGameBoard().getShips()).toContain(newShip);
  });
});

// test("players initialize their shots correctly", () => {
//   expect(player1.getAvailableShots().length).toBe(gameBoardLen ** 2);
//   expect(player1.getAvailableShots()[0]).toBe("0,0");
// });

// describe("players attack funtionality", () => {
//   beforeAll(() => {
//     player1.attack(player2.getGameBoard(), [0, 0]);
//   });
//   afterAll(() => {
//     player1 = Player();
//     player2 = AiPlayer();
//   });
//   test("players attack registers correctley", () => {
//     expect(player1.getAvailableShots().length).toBe(gameBoardLen ** 2 - 1);
//     expect(player1.getAvailableShots()).not.toContain("0,0");
//   });
//   test("oponent recieved the attack correctly", () => {
//     expect(player2.getGameBoard().getAttacks().missedShots).toContain(
//       String([0, 0])
//     );
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
//   });
// });
