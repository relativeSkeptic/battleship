import { ShotResult } from "../types/shotResult";
import { Ship } from "./ship";

export class Grid {
    private _isOccupied: boolean;
    private _ship: Ship | null;
    private _shotResult: ShotResult;

    constructor() {
        this._isOccupied = false;
        this._ship = null;
        this._shotResult = ShotResult.notFired;
    }

    set isOccupied(occupied: boolean) {
        this._isOccupied = occupied;
    }

    set ship(ship: Ship) {
        this._ship = ship;
    }

    set shotResult(result: ShotResult) {
        this._shotResult = result;
    }

    get isOccupied(): boolean {
        return this._isOccupied;
    }

    get ship(): Ship | null {
        return this._ship;
    }

    get shotResult(): ShotResult {
        return this._shotResult;
    }
}
