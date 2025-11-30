import { Ship } from "../core/ship";
import { createShips } from "../utils/createShips";
import { generateCoordinates } from "../utils/generateCoorinates";

export class Computer {
    private _ships: Map<string, Ship>;
    private _randomMoves: string[];

    constructor() {
        this._ships = createShips();
        this._randomMoves = this.generateMoves();
    }

    get ships() {
        return this._ships;
    }

    private generateMoves(): string[] {
        const coords = generateCoordinates();

        for (let i = coords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [coords[i], coords[j]] = [coords[j], coords[i]];
        }

        return coords;
    }
}
