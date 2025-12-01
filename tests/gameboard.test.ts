import { Gameboard } from "../src/core/gameboard";
import { Ship } from "../src/core/ship";
import { ShipTypes } from "../src/types/shipTypes";
import { ShotResult } from "../src/types/shotResult";

test("gameboard creates 100 unique squares A1 - J10", () => {
    const gameboard = new Gameboard();
    expect(gameboard.board.size).toBe(100);
});

describe("Lookup function", () => {
    describe("Initial values", () => {
        const gameboard = new Gameboard();
        const grid = gameboard.lookup("A1");

        test("isOccupied: false", () => {
            expect(grid?.isOccupied).toBe(false);
        });

        test("shotResult: notFired", () => {
            expect(grid?.shotResult).toBe(ShotResult.notFired);
        });
    });

    describe("Updated values", () => {
        const gameboard = new Gameboard();
        const grid = gameboard.lookup("A1");

        const randomIsOccupied = Math.random() > 0.5;

        const shipLengths: Record<ShipTypes, number> = {
            carrier: 5,
            battleship: 4,
            destroyer: 3,
            submarine: 3,
            patrol_boat: 2,
        };

        const shipTypesArray = Object.values(ShipTypes);
        const randomType =
            shipTypesArray[Math.floor(Math.random() * shipTypesArray.length)];

        const randomShip = new Ship(randomType, shipLengths[randomType]);

        const shotResults = Object.values(ShotResult);
        const randomShotResult =
            shotResults[Math.floor(Math.random() * shotResults.length)];

        if (grid) {
            grid.isOccupied = randomIsOccupied;
            grid.ship = randomShip;
            grid.shotResult = randomShotResult;
        }

        const updatedGrid = gameboard.lookup("A1");

        test(`isOccupied: ${randomIsOccupied}`, () => {
            expect(updatedGrid?.isOccupied).toBe(randomIsOccupied);
        });

        test(`ship is correctly assigned`, () => {
            expect(updatedGrid?.ship).toBe(randomShip);
        });

        test(`shotResult: ${randomShotResult}`, () => {
            expect(updatedGrid?.shotResult).toBe(randomShotResult);
        });
    });
});
