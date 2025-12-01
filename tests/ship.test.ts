import { Ship } from "../src/core/ship";
import { ShipTypes } from "../src/types/shipTypes";

test("throws an error when a negative length is provided", () => {
    expect(() => new Ship(ShipTypes.battleship, -5)).toThrow(
        "Length must be positive",
    );
});

test("increments numHits when hit is called", () => {
    let ship = new Ship(ShipTypes.destroyer, 3);
    ship.hit();
    expect(ship.numHits).toBe(1);
});

test("returns true for isSunk after all parts are hit", () => {
    let ship = new Ship(ShipTypes.submarine, 3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk).toBe(true);
});

test("after ship is sunk, hit function can no longer be called", () => {
    let ship = new Ship(ShipTypes.submarine, 3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(() => ship.hit()).toThrow("Ship has already been sunk");
});
