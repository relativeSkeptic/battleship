import { ShotResult } from "../types/shotResult";
import { ShipTypes } from "../../src/types/shipTypes";

export class Grid {
    private _isOccupied: boolean;
    private _shipId: ShipTypes;
    private _shotResult: ShotResult;

    constructor() {
        this._isOccupied = false;
        this._shipId = ShipTypes.none;
        this._shotResult = ShotResult.notFired;
    }

    set isOccupied(occupied: boolean) {
        this._isOccupied = occupied;
    }

    set shipId(shipName: ShipTypes) {
        this._shipId = shipName;
    }

    set shotResult(result: ShotResult) {
        this._shotResult = result;
    }

    get isOccupied(): boolean {
        return this._isOccupied;
    }

    get shipId(): ShipTypes {
        return this._shipId;
    }

    get shotResult(): ShotResult {
        return this._shotResult;
    }
}
