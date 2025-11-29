import { Ship } from "../core/ship";
import { createShips } from "../utils/createShips";

export class Computer {
  private _ships: Map<string, Ship>;

  constructor() {
    this._ships = createShips();
  }

  get ships() {
    return this._ships;
  }
}
