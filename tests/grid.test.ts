import { Grid } from "../src/core/grid";
import { ShipTypes } from "../src/types/shipTypes";
import { ShotResult } from "../src/types/shotResult";

describe("Grid shipId", () => {
    Object.values(ShipTypes).forEach((ship) => {
        test(`ship type: ${ship}`, () => {
            const shipType = ship as ShipTypes;
            const grid = new Grid();
            grid.shipId = shipType;
            expect(grid.shipId).toBe(shipType);
        });
    });
});

describe("Grid isOccupied", () => {
    let grid = new Grid();

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
