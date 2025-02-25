const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
const RED = '#ff0000';
let map = [];
let firstPlayer = true;
let isGameOver = false;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    const dimension = prompt('Введите ');
    renderGrid(dimension);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        map.push([]);
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
            map[i].push(EMPTY);
        }
        container.appendChild(row);
    }
}

function isGameOver(){

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === EMPTY) continue;
            
            if (j + 2 < map[i].length && map[i][j] === map[i][j + 1] && map[i][j + 1] === map[i][j + 2]) {
                renderSymbolInCell(map[i][j], i, j, RED);
                renderSymbolInCell(map[i][j + 1], i, j + 1, RED);
                renderSymbolInCell(map[i][j + 2], i, j + 2, RED);
                return map[i][j];
            } else if (i + 2 < map.length && map[i][j] === map[i + 1][j] && map[i + 1][j] === map[i + 2][j]) {
                renderSymbolInCell(map[i][j], i, j, RED);
                renderSymbolInCell(map[i + 1][j], i + 1, j, RED);
                renderSymbolInCell(map[i + 2][j], i + 2, j, RED);
                return map[i][j];
            } else if (i + 2 < map.length && map[i][j] === map[i + 1][j + 1] && map[i + 1][j + 1] === map[i + 2][j + 2]) {
                renderSymbolInCell(map[i][j], i, j, RED);
                renderSymbolInCell(map[i + 1][j + 1], i + 1, j + 1, RED);
                renderSymbolInCell(map[i + 2][j + 2], i + 2, j + 2, RED);
                return map[i][j];
            } else if (i + 2 < map.length && map[i][j] === map[i + 1][j - 1] && map[i + 1][j - 1] === map[i + 2][j - 2]) {
                renderSymbolInCell(map[i][j], i, j, RED);
                renderSymbolInCell(map[i + 1][j - 1], i + 1, j - 1, RED);
                renderSymbolInCell(map[i + 2][j - 2], i + 2, j - 2, RED);
                return map[i][j];
            }
        }
    }
    return EMPTY;
}

function isFriendship() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === EMPTY){
                return false;
            }
        }
    }
    return true;
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (isGameOver) return;

    

    if (map[row][col] != EMPTY) return;

    if (firstPlayer) {
        renderSymbolInCell(CROSS, row, col);
        map[row][col] = CROSS;
    } else {
        renderSymbolInCell(ZERO, row, col);
        map[row][col] = ZERO;
    }
    firstPlayer = !firstPlayer;
    let winner = isGameOver()
    if (winner != EMPTY) {
        alert(`winner is ${winner}`)
        isGameOver = true;
    }

    if (isFriendship()){
        alert("Победила дружба");
        isGameOver = true;
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}


function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
    renderGrid(map.length)
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
