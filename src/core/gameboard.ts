import { Grid } from "./grid";
import { Ship } from "./ship";
import { ShipTypes } from "../types/shipTypes";
import { ShotResult } from "../types/shotResult";

export class Gameboard {
    private _board: Map<string, Grid>;
    private _ships: Ship[];
    private _shipCoords: Map<ShipTypes, string[]>;

    constructor() {
        this._board = this.createBoard();
        this._ships = [];
        this._shipCoords = new Map<ShipTypes, string[]>();
    }

    get board() {
        return this._board;
    }

    get shipCoords() {
        return this._shipCoords;
    }

    resetBoard(): void {
        this._board.clear();
        this._ships = [];
        this._shipCoords.clear();
        this._board = this.createBoard();
    }

    allShipsSunk(): boolean {
        for (const ship of this._ships) {
            if (ship.isSunk === false) {
                return false;
            }
        }
        return true;
    }

    lookup(coordinate: string) {
        const grid = this._board.get(coordinate);

        if (!grid) {
            throw new Error(`Invalid coordinate: ${coordinate}`);
        } else {
            return grid;
        }
    }

    receiveAttack(coordinate: string): ShotResult {
        const grid = this.lookup(coordinate);

        if (grid.shotResult !== ShotResult.notFired) {
            throw new Error("Coordinate already attacked");
        }

        if (grid.isOccupied) {
            grid.ship?.hit();
            if (grid.ship?.isSunk) {
                grid.shotResult = ShotResult.sunk;
                return ShotResult.sunk;
            } else {
                grid.shotResult = ShotResult.hit;
                return ShotResult.hit;
            }
        } else {
            grid.shotResult = ShotResult.miss;
            return ShotResult.miss;
        }
    }

    placeShip(ship: Ship, coordinates: string[]): void {
        if (this.validateCoordinates(coordinates) === false) {
            throw new Error("Coordinate already occupied");
        }

        if (ship.length !== coordinates.length) {
            throw new Error("Ship length mismatches total coordinates");
        }

        const shipCoordinates: string[] = [];

        for (const coordinate of coordinates) {
            const grid = this.lookup(coordinate);

            grid.isOccupied = true;
            grid.ship = ship;
            shipCoordinates.push(coordinate);
        }

        this._shipCoords.set(ship.type, shipCoordinates);
        this._ships.push(ship);
    }

    private createBoard(): Map<string, Grid> {
        const board = new Map<string, Grid>();
        const letters = "ABCDEFGHIJ".split("");
        const coordinates: string[] = [];

        for (const letter of letters) {
            for (let number = 1; number <= 10; number++) {
                coordinates.push(`${letter}${number}`);
            }
        }

        for (const coordinate of coordinates) {
            const grid = new Grid();
            board.set(coordinate, grid);
        }

        return board;
    }

    private validateCoordinates(coordinates: string[]): boolean {
        if (coordinates.length < 2) {
            throw new Error(`Coordinates length is too short`);
        }
        for (const coordinate of coordinates) {
            if (this.lookup(coordinate)?.isOccupied === true) {
                throw new Error(
                    `Coordinate is already occupied: ${coordinate}`,
                );
            }
        }
        if (this.isStraightLine(coordinates) !== true) {
            throw new Error(
                `Coordinates are not in a straight line ${coordinates}`,
            );
        }
        return true;
    }

    private isStraightLine(coordinates: string[]): boolean {
        //Converts both values to integers for easier testing
        const XYcoordinate = coordinates.map((coordinate) =>
            this.convertToXYcoordinates(coordinate),
        );

        const xCoordinate = XYcoordinate.map((coordinate) => coordinate.x);
        const yCoordinate = XYcoordinate.map((coordinate) => coordinate.y);

        let allXSame = true;
        for (const x of xCoordinate) {
            if (x !== xCoordinate[0]) {
                allXSame = false;
            }
        }

        let allYSame = true;
        for (const y of yCoordinate) {
            if (y !== yCoordinate[0]) {
                allYSame = false;
            }
        }

        //Ship is neither horizontal or vertical
        if (allXSame !== true && allYSame !== true) {
            return false;
        }

        const sorted = [...XYcoordinate];

        if (allXSame) {
            sorted.sort((a, b) => a.y - b.y);
        } else {
            sorted.sort((a, b) => a.x - b.x);
        }

        for (let i = 1; i < sorted.length; i++) {
            if (allXSame) {
                if (sorted[i].y !== sorted[i - 1].y + 1) {
                    return false;
                }
            } else {
                if (sorted[i].x !== sorted[i - 1].x + 1) {
                    return false;
                }
            }
        }

        return true;
    }

    private convertToXYcoordinates(coordinate: string) {
        const column = coordinate[0].toUpperCase();
        const row = parseInt(coordinate.slice(1));

        const x = column.charCodeAt(0) - "A".charCodeAt(0);
        const y = row - 1;

        return { x, y };
    }
}
