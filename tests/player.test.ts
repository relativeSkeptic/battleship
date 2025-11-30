import { Player } from "../src/core/player";

// Creating mock class in order to test abstract Player class
class MockPlayer extends Player {
    constructor() {
        super();
    }
}

describe("Player ships", () => {
    const player = new MockPlayer();

    const expectedShips = [
        "carrier",
        "battleship",
        "destroyer",
        "submarine",
        "patrol_boat",
    ];

    test("creates all required ship types", () => {
        expectedShips.forEach((shipName) => {
            expect(player.ships.has(shipName)).toBe(true);
        });
    });

    test("creates the correct number of ships", () => {
        expect(player.ships.size).toBe(expectedShips.length);
    });

    test("getter returns correct number of ships", () => {
        expect(player.ships.size).toBe(expectedShips.length);
    });
});
