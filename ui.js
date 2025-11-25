import * as gameLogic from "./gameLogic.js"

const userBoard = document.getElementById("user-board");
const enemyBoard = document.getElementById("enemy-board");
let cpuTurnNow = false;

function renderGameboard() {
    // Render user player board;
    userBoard.textContent = "";
    const playergameBoard = gameLogic.getUserPlayer().gameboard.getBoard();
    
    playergameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.rowIndex = rowIndex;
            cellButton.dataset.colIndex = colIndex;
            if (typeof cell === "object" && cell !== null) {  // Cell contains ship
                cellButton.classList.add("ship");
            }
            userBoard.appendChild(cellButton);
        })
    })

    // Render enemy board
    playergameBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.rowIndex = rowIndex;
            cellButton.dataset.colIndex = colIndex;
            enemyBoard.appendChild(cellButton);
        })
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clickBoard(event) {
    const selectedRow = event.target.dataset.rowIndex;
    const selectedCol = event.target.dataset.colIndex;

    if (!selectedRow || !selectedCol || cpuTurnNow) {
        return
    }
    const hitResult = gameLogic.userPlayRound(selectedRow, selectedCol);
    if (hitResult === null) {  // invalid hit
        return
    }
    updateBoard("enemy", hitResult, selectedRow, selectedCol);
    cpuTurn();
}

async function cpuTurn() {
    cpuTurnNow = true;
    await sleep(2000);
    const [cpuHitResult, cpuSelectedRow, cpuselectedCol] = gameLogic.cpuPlayRound();
    updateBoard("user", cpuHitResult, cpuSelectedRow, cpuselectedCol);
    cpuTurnNow = false;
}

function updateBoard(boardName, hitResult, selectedRow, selectedCol) {
    let selectedButton = null;
    if (boardName === "enemy") {
        selectedButton = enemyBoard.querySelector(`[data-row-index="${selectedRow}"][data-col-index="${selectedCol}"]`);
    } else {
        selectedButton = userBoard.querySelector(`[data-row-index="${selectedRow}"][data-col-index="${selectedCol}"]`);
    }
    if (hitResult) {
        selectedButton.classList.add("hit");
    } else {
        selectedButton.classList.add("miss");
    }
}

function setupEnemyBoardEventListeners() {
    enemyBoard.addEventListener("click", clickBoard);
}

export function loadUI() {
    renderGameboard();
    setupEnemyBoardEventListeners()
}