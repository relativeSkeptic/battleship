import { Player } from "./player";

export class Computer extends Player {
    private _randomMoves: string[];

    constructor() {
        super();
        this._randomMoves = this.generateMoves();
    }

    takeTurn(): string {
        if (this._randomMoves.length === 0) {
            throw new Error("No moves left");
        }
        return this._randomMoves.pop()!;
    }

    reset(): void {
        this._randomMoves = this.generateMoves();
    }

    private generateMoves(): string[] {
        const coords = this.generateCoordinates();

        for (let i = coords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [coords[i], coords[j]] = [coords[j], coords[i]];
        }

        return coords;
    }
}
