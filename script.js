window.onload = Main;

let gameArea;
let errorArea;
let startButton;
let selectedDiff;

let nowPlaying = false;
let difficulty;
let diffNumber;
let numbers = [];
let cards = [];
let firstFlg = true;
let firstCard;
let unitCount = 0;

function Main() {
    gameArea = document.getElementById("gamearea");

    errorArea = document.getElementById('error');
    difficulty = document.getElementsByName('diff');

    startButton = document.getElementById('startbutton');
    startButton.addEventListener("click", buttonAction);

};


function turn(e) {
    let div = e.target;
    if (nowPlaying) {
        if (div.innerHTML == "") {
            div.className = "card";
            div.innerHTML = div.number;
        }
    }
}

function buttonAction() {
    errorArea.innerHTML = "";
    for (let i = 0; i < difficulty.length; i++) { //難易度を取得
        if (difficulty[i].checked) {
            selectedDiff = difficulty[i].value;
            break;
        }
    }
    if (selectedDiff == undefined) { // 未選択の時
        errorArea.innerHTML = "難易度を選んでください。";
    } else { //正しく難易度が選ばれている場合
        nowPlaying = true;
        changingDisable();
        createTarget(selectedDiff); //問題生成
        unitCount = 0;

        console.log(selectedDiff); //for debuf

    }
}

function changingDisable() {
    let forms = new Array(document.getElementById('easy'),
        document.getElementById('normal'),
        document.getElementById('hard'));
    if (nowPlaying) { //プレイ中
        for (let i = 0; i < 3; i++) {
            forms[i].disabled = true;
        }
    } else { //プレイ中以外
        for (let i = 0; i < 3; i++) {
            forms[i].disabled = false;
        }
    }
}

function createTarget(d) {
    switch (d) { //まず難易度から問題作成用の数字を決定
        case "EASY":
            diffNumber = 4;
            break;
        case "NORMAL":
            diffNumber = 8;
            break;
        case "HARD":
            diffNumber = 12;
            break;
        default: //難易度を選ばずにスタートが押されたとき
            break;
    }
    //以下に問題生成の処理を書く
    CreateNumbers(diffNumber);
    CreateTable(); //カードを表示
}

function CreateNumbers(n) { //問題用の番号を生成
    numbers = [];
    for (var i = 0; i < n; i++) { // n組みのペアの数字
        numbers.push(i);
        numbers.push(i);
    }
    shuffleNumbers(numbers);
    console.log(numbers); //for debug
}

function shuffleNumbers(arr) { //シャッフル用
    var n = arr.length;
    var temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function CreateTable() {
    for (let i = 0; i < diffNumber * 2; i++) {
        let div = document.createElement('div');
        div.className = 'back'
        div.index = i;
        div.number = numbers[i];
        div.innerHTML = "";
        div.onclick = turn;
        gameArea.appendChild(div);
        cards.push(div);
    }
    console.log(cards); //for debug
}