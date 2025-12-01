import { Grid } from "./grid";
import { Ship } from "./ship";
import { ShipTypes } from "../types/shipTypes";
import { ShotResult } from "../types/shotResult";

export class Gameboard {
    private _board: Map<string, Grid>;
    private _shipCoords: Map<ShipTypes, string[]>;

    constructor() {
        this._shipCoords = new Map<ShipTypes, string[]>();
        this._board = this.createBoard();
    }

    get board() {
        return this._board;
    }

    get shipCoords() {
        return this._shipCoords;
    }

    resetBoard(): void {}

    allShipsSunk(): boolean {
        return false;
    }

    lookup(coordinate: string) {
        let grid = this._board.get(coordinate);

        if (!grid) {
            throw new Error(`Invalid coordinate: ${coordinate}`);
        } else {
            return grid;
        }
    }

    receiveAttack(coordinate: string): ShotResult {
        let grid = this.lookup(coordinate);

        if (grid.shotResult !== ShotResult.notFired) {
            throw new Error("Coordinate already attacked");
        }

        if (grid.isOccupied) {
            grid.ship?.hit();
            if (grid.ship?.isSunk) {
                return ShotResult.sunk;
            } else {
                return ShotResult.hit;
            }
        } else {
            return ShotResult.miss;
        }
    }

    placeShip(ship: Ship, coordinates: string[]) {
        if (this.validCoordinates(coordinates) === false) {
            throw new Error("Coordinate already occupied");
        }

        if (ship.length !== coordinates.length) {
            throw new Error("Ship length mismatches total coordinates");
        }

        let shipCoordinates: string[] = [];

        for (const coordinate of coordinates) {
            let grid = this.lookup(coordinate);

            grid.isOccupied = true;
            grid.ship = ship;
            shipCoordinates.push(coordinate);
        }

        this._shipCoords.set(ship.type, shipCoordinates);
    }

    private createBoard(): Map<string, Grid> {
        let board = new Map<string, Grid>();
        const letters = "ABCDEFGHIJ".split("");
        const coordinates: string[] = [];

        for (const letter of letters) {
            for (let number = 1; number <= 10; number++) {
                coordinates.push(`${letter}${number}`);
            }
        }

        for (const coordinate of coordinates) {
            let grid = new Grid();
            board.set(coordinate, grid);
        }

        return board;
    }

    private validCoordinates(cordinates: string[]): boolean {
        for (const cordinate of cordinates) {
            if (this.lookup(cordinate)?.isOccupied === true) {
                return false;
            }
        }
        return true;
    }
}
