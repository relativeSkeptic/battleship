import { ShipTypes } from "../types/shipTypes";

export class Ship {
    private _length: number;
    private _numHits: number = 0;
    private _isSunk: boolean = false;
    private _shipType: ShipTypes;

    constructor(shipType: ShipTypes, length: number) {
        if (length < 1) {
            throw new Error("Length must be positive");
        }
        if (shipType === ShipTypes.none) {
            throw new Error("Invalid ship type");
        }
        this._length = length;
        this._shipType = shipType;
    }

    get length(): number {
        return this._length;
    }

    get numHits(): number {
        return this._numHits;
    }

    get isSunk(): boolean {
        return this._isSunk;
    }

    get shipType(): ShipTypes {
        return this._shipType;
    }

    hit(): void {
        if (this._isSunk) {
            throw new Error("Ship has already been sunk");
        }
        this._numHits += 1;
        if (this._numHits >= this._length) {
            this._isSunk = true;
        }
    }
}
