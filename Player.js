import Gameboard from "./Gameboard.js";

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.playedCoors = new Map();
    }

    checkPlay(coor) {
        const [rowIndex, colIndex] = coor;
        if (this.playedCoors.has(rowIndex)) {
            if (this.playedCoors.get(rowIndex).includes(colIndex)) {
                return false;
            } else {
                this.playedCoors.get(rowIndex).push(colIndex);
                return true;
            }
        } else {
            this.playedCoors.set(rowIndex, []);
            this.playedCoors.get(rowIndex).push(colIndex);
            return true;
        }
    }
}

export default Player;