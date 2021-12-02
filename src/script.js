var gameBoard = document.getElementById("gameBoard");
var izero, jzero, movedElementId;
var randomArray;
//NI
var orderedArray  = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]]; //NI
function startGame() {
    var randomNumbers = getRandomNumbers(0, 16);
    randomArray = setInTwoDimensionalArray(randomNumbers);
    setZeroCoordinates(randomArray);
    render(16, randomArray);


    //Йоана
    reset();
    startStopwatch();
    //Йоана
    message.innerHTML ="Рестартирай играта";

}


//Генерира случайни числа. Ползва се само в startGame()
function getRandomNumbers(start, end) {   //start = 0, end = 16
    const elements = [];
    while (elements.length < (end - start)) {
        var el = Math.floor(Math.random() * (end - start) + start);
        // console.log(elements.indexOf(el) + "index na el");
        if (elements.indexOf(el) === -1) elements.push(el);
        // console.log(el);
    }
    return elements;
}
function setInTwoDimensionalArray(randomNumbers) {
    const twoArray = [[], [], [], []];
    var k = 0;
    for (var i = 0; i < randomNumbers.length / 4; i++) {
        for (var j = 0; j < randomNumbers.length / 4; j++) {
            // console.log(i, j);
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
    
    // console.log("move el", movedElementId);
}

function drop(ev) {
    ev.preventDefault();
    // console.log(ev.target.id);
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

    
            checkWinCondition(length, randomArray, orderedArray);
        }
    }
}

// NI

function checkWinCondition(length, randomArray, orderedArray){
    let correctNumbers = 0; 
    for (var i = 0; i < length / 4; i++) {
        for (var j = 0; j < length / 4; j++) {
            // console.log("CURRENT ARRAY " + randomArray[i][j]);
            // console.log("ORDERED ARRAY" + orderedArray[i][j]);
            if(randomArray[i][j] === orderedArray[i][j]){
                ++correctNumbers;
                // console.log("CORRECT NUMBERS:" + correctNumbers);
                if(correctNumbers >= 15){  //15 todo тествах го с 2
                    message.innerHTML ="ПОБЕДА!<br>Започни нова игра?";
                    pause();

                }
            }
        }
    }

}

// NI END

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
// start();


//Йоана

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}


let startTime;
let elapsedTime = 0;
let timerInterval;


function print(txt) {
    document.getElementById("display").innerHTML = txt;
}


function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    // showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    // showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    // showButton("PLAY");
}


// function showButton(buttonKey) {
//     const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
//     const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
//     buttonToShow.style.display = "block";
//     buttonToHide.style.display = "none";
// }

// let playButton = document.getElementById("playButton");
// let pauseButton = document.getElementById("pauseButton");
// let resetButton = document.getElementById("resetButton");

// playButton.addEventListener("click", startStopwatch);
// pauseButton.addEventListener("click", pause);
// resetButton.addEventListener("click", reset);
