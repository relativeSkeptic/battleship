import { ShipTypes } from "../types/shipTypes";

export class Ship {
    private _length: number;
    private _numHits: number = 0;
    private _isSunk: boolean = false;
    private _type: ShipTypes;

    constructor(shipType: ShipTypes, length: number) {
        if (length < 1) {
            throw new Error("Length must be positive");
        }
        this._length = length;
        this._type = shipType;
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

    get type(): ShipTypes {
        return this._type;
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
