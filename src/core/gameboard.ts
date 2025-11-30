import { generateCoordinates } from "../utils/generateCoorinates";
import { Grid } from "./grid";
import { Ship } from "./ship";

const GRID_SIZE = 100;

export class Gameboard {
    private _board: Map<string, Grid>;
    private _shipCoords: Map<string, string[]>;

    constructor() {
        this._board = this.createBoard();
    }

    lookup(coordinate: string) {
        return this._board.get(coordinate);
    }

    placeShip(ship: Ship, coordinates: string[]) {
        if (this.validCoordinates(coordinates) === false) {
            throw new Error("Invalid coordinates");
        }
    }

    private createBoard(): Map<string, Grid> {
        let board = new Map<string, Grid>();

        const cordinates = generateCoordinates();
        for (const coordinate in cordinates) {
            let grid = new Grid();
            board.set(coordinate, grid);
        }

        return board;
    }

    private validCoordinates(coodinates: string[]): boolean {
        return true;
    }
}
