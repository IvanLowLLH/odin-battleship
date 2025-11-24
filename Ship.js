class Ship {
    length = 0;
    hitTimes = 0;
    hasSunk = false;

    constructor(length) {
        this.length = length;
    }

    hit() {
        this.hitTimes++;
    }

    isSunk() {
        if (this.hitTimes === this.length) {
            this.hasSunk = true;
            return true;
        }
        else {
            return false;
        }
    }
}

export default Ship