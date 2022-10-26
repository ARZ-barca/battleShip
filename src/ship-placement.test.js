/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import Player from "./player";
import { populatedSetupBoard } from "./setup-dom";

describe("selecting a ship", () => {
  const boardDiv = populatedSetupBoard();
  const player = Player();
  ship = player.createShip([0, 0], 3, "x");
});
