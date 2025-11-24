import * as gameLogic from "./gameLogic.js"

const playerBoard = document.getElementById("user-player");
const cpuBoard = document.getElementById("cpu-player");

function renderGameboard() {
    // Render user player board;
    playerBoard.textContent = "";
    const playergameBoard = gameLogic.getUserPlayer();
    
    playergameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex))
    })

}