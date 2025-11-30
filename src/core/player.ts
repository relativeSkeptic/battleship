import { Ship } from "../core/ship";

export class Player {
    private _ships: Map<string, Ship>;

    constructor() {
        this._ships = this.createShips();
    }

    get ships() {
        return this._ships;
    }

    protected createShips(): Map<string, Ship> {
        let newShips = new Map<string, Ship>();

        newShips.set("carrier", new Ship(5));
        newShips.set("battleship", new Ship(4));
        newShips.set("destroyer", new Ship(3));
        newShips.set("submarine", new Ship(3));
        newShips.set("patrol_boat", new Ship(2));

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
