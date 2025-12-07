import { Grid } from "../src/core/grid";
import { ShipTypes } from "../src/types/shipTypes";
import { ShotResult } from "../src/types/shotResult";
import { Ship } from "../src/core/ship";

describe("Grid ship assignment", () => {
    const shipsToTest = [
        new Ship(ShipTypes.carrier, 5),
        new Ship(ShipTypes.battleship, 4),
        new Ship(ShipTypes.destroyer, 3),
        new Ship(ShipTypes.submarine, 3),
        new Ship(ShipTypes.patrol_boat, 2),
    ];

    shipsToTest.forEach((ship) => {
        test(`assigning ship length ${ship.length}`, () => {
            const grid = new Grid();
            grid.ship = ship;

            expect(grid.ship).toBe(ship);
        });
    });
});

describe("Grid isOccupied", () => {
    const grid = new Grid();

    test("isOccupied: true", () => {
        grid.isOccupied = true;
        expect(grid.isOccupied).toBe(true);
    });

    test("isOccupied: false", () => {
        grid.isOccupied = false;
        expect(grid.isOccupied).toBe(false);
    });
});

describe("Grid shotResult", () => {
    Object.values(ShotResult).forEach((ship) => {
        test(`ship result: ${ship}`, () => {
            const shotResult = ship as ShotResult;
            const grid = new Grid();
            grid.shotResult = shotResult;
            expect(grid.shotResult).toBe(shotResult);
        });
    });
});
