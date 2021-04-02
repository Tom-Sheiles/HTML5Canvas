var canvas = document.getElementById("game");
var speedSlider = document.getElementById("speedSlide")
var gridSlider = document.getElementById("gridSize")
var drawer = canvas.getContext("2d");
var width = 1000, height = 720;
var gridSize = 20;

var nXCells;
var nYCells;

var running = true;

let x, y;
var cellPosition;
var cellSpeed = 1;
var xCoeff, yCoeff;
init();

gridSlider.onchange = () =>{
    running = false;
    gridSize = parseInt(gridSlider.value);
    init();
}

speedSlider.oninput = () =>{
    cellSpeed = speedSlider.value;
}


function init(){
    drawer.fillStyle = "#73e065";

    nXCells = (width+gridSize)/gridSize;
    nYCells = (height+gridSize)/gridSize;
    console.log(nXCells);

    x = 0, y = 0;
    cellPosition = getGridPos(nXCells/2, nYCells/2);
    xCoeff = 1;
    yCoeff = 1;

    running = true;
    window.requestAnimationFrame(renderLoop);
}


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


function renderLoop()
{
    drawer.clearRect(0, 0, width, height);

    drawGrid();
    drawGridRect(cellPosition.x, cellPosition.y);

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

    if(running){
        window.requestAnimationFrame(renderLoop);
    }else{
        drawer.clearRect(0, 0, width, height);
    }
}


