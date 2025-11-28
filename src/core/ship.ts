export class Ship {
  private _length: number;
  private _numHits: number = 0;
  private _isSunk: boolean = false;

  constructor(length: number) {
    if (length < 1) {
      throw new Error("Length must be positive");
    }
    this._length = length;
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
