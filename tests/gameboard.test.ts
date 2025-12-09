import { Gameboard } from "../src/core/gameboard";
import { Grid } from "../src/core/grid";
import { Ship } from "../src/core/ship";
import { ShipTypes } from "../src/types/shipTypes";
import { ShipLength } from "../src/types/shipLength";
import { ShotResult } from "../src/types/shotResult";

describe("constructor", () => {
    const gameboard = new Gameboard();

    test("board contains 100 total coordinates", () => {
        expect(gameboard.board.size).toBe(100);
    });

    test("board should contain all A1 through J10 keys", () => {
        const letters = "ABCDEFGHIJ".split("");

        for (const letter of letters) {
            for (let num = 1; num <= 10; num++) {
                const key = `${letter}${num}`;
                expect(gameboard.board.has(key)).toBe(true);
            }
        }
    });

    test("all entries contain new Grid objects", () => {
        for (const value of gameboard.board.values()) {
            expect(value instanceof Grid).toBe(true);
        }
    });
});

describe("lookup function", () => {
    const gameboard = new Gameboard();

    test("returns correct Grid object when passed valid coordinate", () => {
        expect(gameboard.lookup("A1")).toBeInstanceOf(Grid);
    });

    test("returns error on invalid coordinate", () => {
        expect(() => gameboard.lookup("A32")).toThrow(
            "Invalid coordinate: A32",
        );
    });
});

describe("placeShip function", () => {
    test("places valid ship on board without error", () => {
        const gameboard = new Gameboard();
        const patrol_boat = new Ship(
            ShipTypes.patrol_boat,
            ShipLength.patrol_boat,
        );
        gameboard.placeShip(patrol_boat, ["A1", "A2"]);

        expect(gameboard.lookup("A1").isOccupied).toBe(true);
        expect(gameboard.lookup("A2").isOccupied).toBe(true);

        expect(gameboard.lookup("A1").ship?.type).toBe(ShipTypes.patrol_boat);
        expect(gameboard.lookup("A2").ship?.type).toBe(ShipTypes.patrol_boat);

        expect(gameboard.ships[0].type).toBe(ShipTypes.patrol_boat);

        expect(gameboard.shipCoords.get(ShipTypes.patrol_boat)).toStrictEqual([
            "A1",
            "A2",
        ]);
    });

    test("ship overlap throws error", () => {
        const gameboard = new Gameboard();
        const patrol_boat = new Ship(
            ShipTypes.patrol_boat,
            ShipLength.patrol_boat,
        );
        const submarine = new Ship(ShipTypes.submarine, ShipLength.submarine);

        gameboard.placeShip(patrol_boat, ["C1", "C2"]);
        expect(() =>
            gameboard.placeShip(submarine, ["C2", "C3", "C4"]),
        ).toThrow("Coordinate is already occupied: C2");
    });

    test("coordinates not in straight line throws error", () => {
        const gameboard = new Gameboard();
        const destroyer = new Ship(ShipTypes.destroyer, ShipLength.destroyer);

        expect(() => gameboard.placeShip(destroyer, ["D2", "J6"])).toThrow(
            "Coordinates are not in a straight line D2,J6",
        );
    });

    test("coordinates not contiguous throws error", () => {
        const gameboard = new Gameboard();
        const battleship = new Ship(
            ShipTypes.battleship,
            ShipLength.battleship,
        );

        expect(() =>
            gameboard.placeShip(battleship, ["E4", "E5", "E6", "E8"]),
        ).toThrow("Coordinates are not in a straight line E4,E5,E6,E8");
    });

    test("coordinates length does not match ship length throws error", () => {
        const gameboard = new Gameboard();
        const carrier = new Ship(ShipTypes.carrier, ShipLength.carrier);

        expect(() => gameboard.placeShip(carrier, ["B1", "C1", "D1"])).toThrow(
            "Ship length mismatches total coordinates",
        );
    });

    test("coordinate arrays less than 1 throw error", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(ShipTypes.patrol_boat, ShipLength.patrol_boat);
        expect(() => gameboard.placeShip(ship, ["F7"])).toThrow(
            "Coordinates length is too short",
        );
    });
});

describe("receiveAttack function", () => {
    test("successfully hits valid target", () => {
        const gameboard = new Gameboard();
        const battleship = new Ship(
            ShipTypes.battleship,
            ShipLength.battleship,
        );
        gameboard.placeShip(battleship, ["C4", "D4", "E4", "F4"]);

        expect(gameboard.receiveAttack("C4")).toBe(ShotResult.hit);
        expect(gameboard.board.get("C4")?.shotResult).toBe(ShotResult.hit);
    });

    test("successfully misses valid target", () => {
        const gameboard = new Gameboard();
        const battleship = new Ship(
            ShipTypes.battleship,
            ShipLength.battleship,
        );
        gameboard.placeShip(battleship, ["C4", "D4", "E4", "F4"]);

        expect(gameboard.receiveAttack("J10")).toBe(ShotResult.miss);
        expect(gameboard.board.get("J10")?.shotResult).toBe(ShotResult.miss);
    });

    test("successfully sinks valid target", () => {
        const gameboard = new Gameboard();
        const battleship = new Ship(
            ShipTypes.battleship,
            ShipLength.battleship,
        );
        gameboard.placeShip(battleship, ["C4", "D4", "E4", "F4"]);
        gameboard.receiveAttack("C4");
        gameboard.receiveAttack("D4");
        gameboard.receiveAttack("E4");

        expect(gameboard.receiveAttack("F4")).toBe(ShotResult.sunk);
        expect(gameboard.board.get("F4")?.shotResult).toBe(ShotResult.sunk);
    });

    test("attacking same coordinate twice throws error", () => {
        const gameboard = new Gameboard();
        const battleship = new Ship(
            ShipTypes.battleship,
            ShipLength.battleship,
        );
        gameboard.placeShip(battleship, ["C4", "D4", "E4", "F4"]);
        gameboard.receiveAttack("C4");

        expect(() => gameboard.receiveAttack("C4")).toThrow(
            "Coordinate already attacked",
        );
    });

    test("attacking invalid coordinate throws error", () => {
        const gameboard = new Gameboard();

        expect(() => gameboard.receiveAttack("K52")).toThrow(
            "Invalid coordinate: K52",
        );
    });
});

describe("allShipsSunk function", () => {
    test("returns true when no ships are on the board", () => {
        const gameboard = new Gameboard();
        expect(gameboard.allShipsSunk()).toBe(true);
    });

    test("returns true when one ship is on the board", () => {
        const gameboard = new Gameboard();
        const patrol_boat = new Ship(
            ShipTypes.patrol_boat,
            ShipLength.patrol_boat,
        );
        gameboard.placeShip(patrol_boat, ["B6", "B7"]);
        gameboard.receiveAttack("B6");
        gameboard.receiveAttack("B7");

        expect(gameboard.allShipsSunk()).toBe(true);
    });

    test("returns true when multiple ships are on the board", () => {
        const gameboard = new Gameboard();

        const patrol_boat = new Ship(
            ShipTypes.patrol_boat,
            ShipLength.patrol_boat,
        );
        const destroyer = new Ship(ShipTypes.destroyer, ShipLength.destroyer);
        const submarine = new Ship(ShipTypes.submarine, ShipLength.submarine);

        gameboard.placeShip(patrol_boat, ["D6", "D7"]);
        gameboard.placeShip(destroyer, ["A1", "B1", "C1"]);
        gameboard.placeShip(submarine, ["H6", "H5", "H4"]);

        gameboard.receiveAttack("D6");
        gameboard.receiveAttack("D7");
        gameboard.receiveAttack("A1");
        gameboard.receiveAttack("B1");
        gameboard.receiveAttack("C1");
        gameboard.receiveAttack("H6");
        gameboard.receiveAttack("H5");
        gameboard.receiveAttack("H4");

        expect(gameboard.allShipsSunk()).toBe(true);
    });
});

describe("resetBoard function", () => {
    test("ships array is emptied", () => {
        const gameboard = new Gameboard();

        const patrol_boat = new Ship(
            ShipTypes.patrol_boat,
            ShipLength.patrol_boat,
        );
        gameboard.placeShip(patrol_boat, ["J6", "J7"]);

        expect(gameboard.lookup("J6").isOccupied).toBe(true);

        gameboard.resetBoard();

        expect(gameboard.lookup("J6").isOccupied).toBe(false);
        expect(gameboard.ships.length).toBe(0);
    });

    test("shipsCoords map is emptied", () => {
        const gameboard = new Gameboard();

        const patrol_boat = new Ship(
            ShipTypes.patrol_boat,
            ShipLength.patrol_boat,
        );
        gameboard.placeShip(patrol_boat, ["J6", "J7"]);

        expect(gameboard.lookup("J6").isOccupied).toBe(true);

        gameboard.resetBoard();

        expect(gameboard.lookup("J6").isOccupied).toBe(false);
        expect(gameboard.shipCoords.size).toBe(0);
    });
});
