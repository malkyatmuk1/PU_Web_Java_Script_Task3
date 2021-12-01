var gameBoard = document.getElementById("gameBoard");
var izero, jzero, movedElementId;
var randomArray;
function start() {
    var randomNumbers = getRandomNumbers(0, 16);
    randomArray = setInTwoDimensionalArray(randomNumbers);
    setZeroCoordinates(randomArray);
    render(16, randomArray);
}
function getRandomNumbers(start, end) {
    const elements = [];
    while (elements.length < (end - start)) {
        var el = Math.floor(Math.random() * (end - start) + start);
        if (elements.indexOf(el) === -1) elements.push(el);
    }
    return elements;
}
function setInTwoDimensionalArray(randomNumbers) {
    const twoArray = [[], [], [], []];
    var k = 0;
    for (var i = 0; i < randomNumbers.length / 4; i++) {
        for (var j = 0; j < randomNumbers.length / 4; j++) {
            console.log(i, j);
            twoArray[i].push(randomNumbers[k]);
            k++;
        }
    }
    return twoArray;
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    movedElementId = parseInt(ev.target.id, 10);
    
    console.log("move el", movedElementId);
}

function drop(ev) {
    ev.preventDefault();
    console.log(ev.target.id);
    changeElementWithZero(movedElementId);
    render(16, randomArray);
    // var data = ev.dataTransfer.getData("text");
    //  ev.target.appendChild(document.getElementById(data));
}
function setZeroCoordinates(arr) {
    arr.forEach((a, index) => {
        if (a.indexOf(0) >= 0) {
            izero = index;
            jzero = a.indexOf(0);
        }
    })
}
function isDraggable(i, j) {
    return ((i + 1 === izero || i - 1 === izero) && j === jzero) || ((j + 1 === jzero || j - 1 === jzero) && i === izero);
}
function setDropDragOver(i, j) {
    if (i === izero && j === jzero)
        return `ondrop="drop(event)" ondragover="allowDrop(event)"`;
    else return "";
}
function render(length, randomArray) {
    gameBoard.innerHTML = "";
    for (var i = 0; i < length / 4; i++) {
        for (var j = 0; j < length / 4; j++) {
            var isDraggableVal = isDraggable(i, j);
            gameBoard.innerHTML += `<div id="${randomArray[i][j]}" draggable="${isDraggableVal}"
             class="element${randomArray[i][j] === 0 ? ' zero' : ""}"
             ${isDraggableVal ? "ondragstart='drag(event)'" : ""}
             ${setDropDragOver(i, j)}>${randomArray[i][j]}</div>`;
        }
    }
}
function changeElementWithZero(elementId) {
    var coordinateI, coordinateJ;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++){
            if(randomArray[i][j] === elementId){
                coordinateI = i;
                coordinateJ = j;
                break;
            }
        }
    }

    var tempI = izero, tempJ = jzero;
    izero = coordinateI;
    jzero = coordinateJ;
    coordinateI = tempI;
    coordinateJ = tempJ;
    randomArray[izero][jzero] = 0;
    randomArray[coordinateI][coordinateJ] = elementId;
}
start();