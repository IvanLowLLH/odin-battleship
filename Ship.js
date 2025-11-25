class Ship {

    constructor(length) {
        this.length = length;
        this.hitTimes = 0;
    }

    hit() {
        this.hitTimes++;
    }

    isSunk() {
        return this.hitTimes >= this.length;
    }
}

export default Ship