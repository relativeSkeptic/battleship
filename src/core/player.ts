import { Ship } from "../core/ship";
import { ShipTypes } from "../types/shipTypes";

export abstract class Player {
    private _ships: Map<string, Ship>;

    constructor() {
        this._ships = this.createShips();
    }

    get ships() {
        return this._ships;
    }

    protected createShips(): Map<string, Ship> {
        const newShips = new Map<string, Ship>();

        newShips.set(ShipTypes.carrier, new Ship(ShipTypes.carrier, 5));
        newShips.set(ShipTypes.battleship, new Ship(ShipTypes.battleship, 4));
        newShips.set(ShipTypes.destroyer, new Ship(ShipTypes.destroyer, 3));
        newShips.set(ShipTypes.submarine, new Ship(ShipTypes.submarine, 3));
        newShips.set(ShipTypes.patrol_boat, new Ship(ShipTypes.patrol_boat, 2));

        return newShips;
    }

    protected generateCoordinates(): string[] {
        const letters = "ABCDEFGHIJ".split("");
        const coords: string[] = [];

        for (const letter of letters) {
            for (let number = 1; number <= 10; number++) {
                coords.push(`${letter}${number}`);
            }
        }

        return coords;
    }
}
