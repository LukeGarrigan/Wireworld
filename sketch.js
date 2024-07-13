// Find my blog at https://codeheir.com/
// I do a lot of p5.js stuff that might interest you!

let grid;
let columns;
let rows;
let size = 20;
let paused = false;
let hideButtons = false;

let mouseStates = ['Erase', 'Electron Head', 'Electron Tail', 'Conductor'];
let currentMouseState = 3;
// 0 = empty (black)
// 1 = electron head (blue)
// 2 = electron tail (red)
// 3 = conductor (yellow)


function setup() {
    frameRate(6);
    createCanvas(800, 600);
    columns = width / size;
    rows = height / size;
    grid = createGrid();
    textSize(20);
    textAlign(CENTER);

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }


    for (let i = 0; i < 10; i++) {
        grid[15 + i][10] = 3;
        grid[15 + i][15] = 3;
    }

    for (let i = 0; i < 5; i++) {
        grid[15][10 + i] = 3;
        grid[24][10 + i] = 3;
    }


    grid[16][10] = 2;
    grid[17][10] = 1;

}

function draw() {
    background(0);



    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * size;
            let y = j * size;
            stroke(0, 0, 0);
            if (grid[i][j] == 0) {
                fill(0, 0, 0);

            }
            else if (grid[i][j] == 1) {
                fill(0, 255, 255);

            } else if (grid[i][j] == 2) {
                fill(255, 100, 100);

            } else if (grid[i][j] == 3) {
                fill(255,255,0);
                // stroke(255,255,0);
            }
            rect(x, y, size, size);
        }
    }

    if (!hideButtons) {
        showButtons();
    }


    if (!paused) {
        grid = createNewGeneration();
    }

}

function showButtons() {


    if (currentMouseState == 0) {
        fill(100, 100, 100);
    } else if (currentMouseState == 1) {
        fill(0, 255, 255);
    } else if (currentMouseState == 2) {
        fill(255, 100, 100);
    } else {
        fill(255,255,0);
    }

    rect(width / 2 - 70, 10, 140, 30)
    fill(0, 0, 0);

    text(mouseStates[currentMouseState], width / 2, 30);


    fill(100, 100, 100);
    rect(10, 10, 90, 30)
    fill(0, 0, 0);


    text(paused ? 'Unpause' : 'Pause', 55, 30);
}


function createNewGeneration() {
    let nextGeneration = createGrid();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {

            if (grid[i][j] == 0) {
                nextGeneration[i][j] = 0;
            } else if (grid[i][j] == 1) {
                nextGeneration[i][j] = 2;
            } else if (grid[i][j] == 2) {
                nextGeneration[i][j] = 3;
            } else if (grid[i][j] == 3) {
                let electronNeighbours = countElectronNeighbours(i, j);
                if (electronNeighbours == 1 || electronNeighbours == 2) {
                    nextGeneration[i][j] = 1;
                } else {
                    nextGeneration[i][j] = 3;
                }
            }

        }
    }

    return nextGeneration;
}


function countElectronNeighbours(x, y) {
    let sum = 0;
    const neighbours = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let neighbour of neighbours) {
        let newX = x + neighbour[0];
        let newY = y + neighbour[1];

        if (newX >= 0 && newX < grid.length && newY >=0 && newY < grid[0].length) {

            if (grid[newX][newY] == 1) {
                sum++;
            }

        }

    }

    return sum;
}

function createGrid() {
    let arr = new Array(columns);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}


function mousePressed() {

    let topLeft = width / 2 - 70;
    if (mouseX >= topLeft && mouseX <= topLeft + 140 && mouseY >= 10 && mouseY <= 10 + 30) {
        currentMouseState = (currentMouseState + 1) % 4;
        return;
    }

    if (mouseX >= 10 && mouseX <= 100 && mouseY >= 10 && mouseY <= 40) {
        // frameRate(0);
        paused = !paused;
        return;
    }

    let x = floor(mouseX / size);
    let y = floor(mouseY / size);


    grid[x][y] = currentMouseState;

}


function keyPressed() {
    if (keyCode === 32) { // space
        hideButtons = !hideButtons;
    }
    if (keyCode === 67) {
        clearGrid();
    }


    console.log(keyCode);
}

function clearGrid() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}