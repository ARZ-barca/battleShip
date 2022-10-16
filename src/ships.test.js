/* eslint-disable no-undef */

import Ship, { predictShipPositions } from "./ships";

test("predict a ship positions", () => {
  expect(predictShipPositions([1, 1], 2, "y")).toEqual([
    [1, 1],
    [2, 1],
  ]);
});

describe("Ship factory function for a ship with create pocation of [0, 0] and length of 4 and on x axis", () => {
  const createPos = [0, 0];
  const axis = "x";
  const len = 4;
  let ship;
  beforeEach(() => {
    ship = Ship(createPos, len, axis);
  });

  test("ship's length is 4", () => {
    expect(Object.keys(ship.getPositions()).length).toBe(len);
  });

  test("ship's position is correct", () => {
    expect(ship.getPositions()).toEqual({
      "0,0": "good",
      "0,1": "good",
      "0,2": "good",
      "0,3": "good",
    });
  });

  test("ship's create pose is set correctly", () => {
    expect(ship.getCreatePos()).toEqual([0, 0]);
  });

  test("ship's last pose is set correctly", () => {
    expect(ship.getLastPos()).toEqual([0, 3]);
  });

  test("ship's len and axis is set correctly", () => {
    expect(ship.getAxis()).toBe("x");
    expect(ship.getLen()).toBe(4);
  });

  test("ships hit method works properly", () => {
    const hitPosition = [0, 0];
    ship.hit(hitPosition);
    expect(ship.getPositions()[String(hitPosition)]).toBe("hit");
  });

  test("if you hit every position isSunk method returns true and false otherwise", () => {
    ship.hit([0, 0]);
    ship.hit([0, 1]);
    ship.hit([0, 2]);
    expect(ship.isSunk()).toBeFalsy();
    ship.hit([0, 3]);
    expect(ship.isSunk()).toBeTruthy();
  });
});

describe("Ship factory function for a ship with create location of [5, 5] and length of 4 and on Y axis", () => {
  const createPos = [5, 5];
  const axis = "y";
  const len = 4;
  let ship;
  beforeEach(() => {
    ship = Ship(createPos, len, axis);
  });

  test("ship's length is 4", () => {
    expect(Object.keys(ship.getPositions()).length).toBe(len);
  });

  test("ship's location is correct", () => {
    expect(ship.getPositions()).toEqual({
      "5,5": "good",
      "6,5": "good",
      "7,5": "good",
      "8,5": "good",
    });
  });

  test("ship's last pose is set correctly", () => {
    expect(ship.getLastPos()).toEqual([8, 5]);
  });
});
