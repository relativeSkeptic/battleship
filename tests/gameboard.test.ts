import { Gameboard } from "../src/core/gameboard";
import { Ship } from "../src/core/ship";
import { ShipTypes } from "../src/types/shipTypes";
import { ShotResult } from "../src/types/shotResult";

test("Creates proper gameboard squares A1 - J10", () => {
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

    describe("Invalid values", () => {
        const gameboard = new Gameboard();
        test("Z1", () => {
            expect(() => gameboard.lookup("Z1")).toThrow(
                "Invalid coordinate: Z1",
            );
        });
        test("a1", () => {
            expect(() => gameboard.lookup("a1")).toThrow(
                "Invalid coordinate: a1",
            );
        });
        test("testString", () => {
            expect(() => gameboard.lookup("testString")).toThrow(
                "Invalid coordinate: testString",
            );
        });
        test("emptyString", () => {
            expect(() => gameboard.lookup("")).toThrow("Invalid coordinate: ");
        });
    });
});

describe("placeShip function", () => {
    test("valid coordinates", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(ShipTypes.destroyer, 3);
        const coords = ["A1", "A2", "A3"];

        gameboard.placeShip(ship, coords);

        for (const coord of coords) {
            const grid = gameboard.lookup(coord);
            expect(grid?.isOccupied).toBe(true);
            expect(grid?.ship).toBe(ship);
        }
    });

    test("overlapping ships", () => {
        const gameboard = new Gameboard();
        const ship1 = new Ship(ShipTypes.destroyer, 3);
        const coords1 = ["A1", "A2", "A3"];

        gameboard.placeShip(ship1, coords1);

        const ship2 = new Ship(ShipTypes.submarine, 3);
        const coords2 = ["A3", "A4", "A5"];

        expect(() => gameboard.placeShip(ship2, coords2)).toThrow(
            "Coordinate already occupied",
        );
    });

    test("mismatched ship length versus coordinate array", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(ShipTypes.destroyer, 3);
        const coords = ["A1", "A2", "A3", "A4"];

        expect(() => gameboard.placeShip(ship, coords)).toThrow(
            "Ship length mismatches total coordinates",
        );
    });
});
