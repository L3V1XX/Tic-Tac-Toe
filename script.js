const selectBox = document.querySelector(".select-box");
selectBtnX = selectBox.querySelector(".options .playerX");
selectBtnO = selectBox.querySelector(".options .playerO");
playBoard = document.querySelector(".play-board");
players = document.querySelector(".players");
allBox = document.querySelectorAll("section span");
resultBox = document.querySelector(".result-box");
wonText = resultBox.querySelector(".won-text");
replayBtn = resultBox.querySelector("button");


window.onload = () => {
    for(let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

    selectBtnX.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectBtnO.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSing = "X";
let runBot = true;

function clickedBox(element) {
    if(players.classList.contains('player')) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        playerSing = "O";
        playSound();
        element.setAttribute("id", playerSing);
    }else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        playSound();
        element.setAttribute("id", playerSing);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) +200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomDelayTime);
}


function bot(runBot){
    if(runBot){
        playerSing = "O";
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0) {
            if(players.classList.contains('player')) {
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove("active");
                playerSing = "X";
                playSound();
                allBox[randomBox].setAttribute("id", playerSing);
            }else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                playSound();
                allBox[randomBox].setAttribute("id", playerSing);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSing = "X";
    }
}

function playSound(){
    let audio = new Audio('sounds/click.mp3');
    audio.play();
}

function getId(idgame){
    return document.querySelector(".box" + idgame).id;
}


function checkIdSign(val1, val2, val3, sign){
    if(getId(val1) == sign && getId(val2) == sign && getId(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkIdSign(1, 2, 3, playerSing) || checkIdSign(4, 5, 6, playerSing) || checkIdSign(7, 8, 9, playerSing) || checkIdSign(1, 4, 7, playerSing) || checkIdSign(2, 5, 8, playerSing) || checkIdSign(3, 6, 9, playerSing) || checkIdSign(1, 5, 9, playerSing) || checkIdSign(3, 5, 7, playerSing)) {
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);

        wonText.innerHTML = `¡El jugador ${playerSing} ha ganado!`;
    }else{
        if(getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
            wonText.textContent = `¡Empate!`;
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}