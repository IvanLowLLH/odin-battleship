import Player from "./Player.js";

const userPlayer = new Player("user");
const cpuPlayer = new Player("cpu");

let player = userPlayer;

function changePlayer() {
    if (player === userPlayer) {
        player = cpuPlayer;
    } else {
        player = userPlayer;
    }
}

export function initialisePlayerGameboard() {
    // For User
    userPlayer.gameboard.addShip([[3,8], [4,8]]);
    userPlayer.gameboard.addShip([[1,2], [1,3], [1,4]]);
    userPlayer.gameboard.addShip([[5,5], [6,5], [7,5]]);
    userPlayer.gameboard.addShip([[9,4], [9,5], [9,6], [9,7]]);
    userPlayer.gameboard.addShip([[4,1], [5,1], [6,1], [7,1], [8,1],]);

    // For CPU
    cpuPlayer.gameboard.addShip([[0,3], [0,4]]);
    cpuPlayer.gameboard.addShip([[1,7], [2,7], [3,7]]);
    cpuPlayer.gameboard.addShip([[4,1], [5,1], [6,1]]);
    cpuPlayer.gameboard.addShip([[9,0], [9,1], [9,2], [9,3]]);
    cpuPlayer.gameboard.addShip([[7,4], [7,5], [7,6], [7,7], [7,8]]);
}

export function getUserPlayer() {
    return userPlayer;
}

export function getCPUPlayer() {
    return cpuPlayer;
}

export function userPlayRound(selectedRow, selectedCol) {
    const hitResult = cpuPlayer.gameboard.receiveAttack([selectedCol, selectedRow]);
    return hitResult;
}

export function cpuPlayRound() {
    let validPlay = false;
    let randomRow = 0;
    let randomCol = 0;
    while (!validPlay) {
        randomRow = Math.floor(Math.random() * 10);
        randomCol = Math.floor(Math.random() * 10);
        validPlay = cpuPlayer.checkPlay([randomRow, randomCol]);
    }
    const hitResult = userPlayer.gameboard.receiveAttack([randomCol, randomRow]);
    return [hitResult, randomRow, randomCol];
}