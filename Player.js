import Gameboard from "./Gameboard.js";

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.playedMoves = new Set();
    }

    checkPlay(coor) {
        const [rowIndex, colIndex] = coor;
        const key = `${rowIndex},${colIndex}`;

        if (this.playedMoves.has(key)) {
            return false;
        } else {
            this.playedMoves.add(key);
            return true;
        }
    }
}

export default Player;