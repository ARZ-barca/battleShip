import Ship from "./ships";

describe("Ship factory function for a ship with create location of [0, 0] and length of 4 and on x axis", () => {
  const createLoc = [0, 0];
  const axis = "x";
  const len = 4;
  const ship = Ship(createLoc, len, axis);

  test("ship's length is 4", () => {
    expect(ship.location.length).toBe(4);
  });

  test("ship's location is correct", () => {
    expect(ship.location).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ]);
  });
});
