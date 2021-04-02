var canvas = document.getElementById("game");
var speedSlider = document.getElementById("speedSlide")
var gridSlider = document.getElementById("gridSize")
var drawer = canvas.getContext("2d");
var width = 1000, height = 720;
var gridSize = 10;

var nXCells = (width+gridSize)/gridSize;
var nYCells = (height+gridSize)/gridSize;

gridSlider.oninput = () =>{
    gridSize = gridSlider.value; 
    nXCells = (width+gridSize)/gridSize;
    nYCells = (height+gridSize)/gridSize;
}


let x = 0, y = 0;

drawer.fillStyle = "#73e065";

function drawLine(startX, startY, x2, y2)
{
    drawer.beginPath();
    drawer.strokeStyle = "#bababa";
    drawer.moveTo(startX, startY);
    drawer.lineTo(x2, y2);
    drawer.stroke();
}

function drawGridRect(gridX, gridY)
{
    gridX = parseInt(gridX);
    gridY = parseInt(gridY);
    drawer.fillRect(gridX * gridSize, gridY * gridSize, gridSize, gridSize);
}

function getGridPos(x, y)
{
    x = parseInt(x);
    y = parseInt(y);
    return {x: x, y: y};
}

function drawGrid()
{
    while(x <= width){
        drawLine(x, y, x, height);
        x += gridSize;
    }
    x = 0;
    
    while(y <= height){
        drawLine(x, y, width, y);
        y += gridSize;
    }

    y = 0;
}

var cellPosition = getGridPos(0, nYCells/2);
var xCoeff = 1;
var yCoeff = 1;
var cellSpeed = 0.1;

speedSlider.oninput = () =>{
    cellSpeed = speedSlider.value;
}

window.requestAnimationFrame(renderLoop);
function renderLoop()
{
    drawer.clearRect(0, 0, width, height);

    drawGrid();
    drawGridRect(cellPosition.x, cellPosition.y);
    drawGridRect(0, 10);
    drawGridRect(0, 11);
    drawGridRect(0, 12);
    drawGridRect(0, 13);
    drawGridRect(0, 14);
    drawGridRect(0, 15);

    cellPosition.x += xCoeff * cellSpeed;
    cellPosition.y += yCoeff * cellSpeed;

    if(parseInt(cellPosition.x) >= nXCells-1 || parseInt(cellPosition.x) <= -1)
    {
        xCoeff = -(xCoeff);
    }

    if(parseInt(cellPosition.y) >= nYCells-1 || parseInt(cellPosition.y) <= -1)
    {
        yCoeff = -(yCoeff);
    }

    window.requestAnimationFrame(renderLoop);
}


