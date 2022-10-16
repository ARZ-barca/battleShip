/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import markBoardDiv from "./game-dom";
import { populatedSetupBoard } from "./setup-dom";

describe("mark positions on board div", () => {
  const boardDiv = populatedSetupBoard();
  const positions = ["0,0", "1,3", "2,2"];
  const mark = "hit";
  markBoardDiv(boardDiv, positions, mark);
  test("positions are marked", () => {
    positions.forEach((p) => {
      expect(
        boardDiv.querySelector(`.p-${p[0]}-${p[2]}`).getAttribute("class")
      ).toContain(mark);
    });
  });
});
