window.onload = Main;

let gameArea;
let errorArea;
let startButton;
let restartButton;
let selectedDiff;
let re;

let nowPlaying = false;
let difficulty;
let diffNumber;
let numbers = [];
let cards = [];
let firstFlg = true;
let firstCard;
let unitCount = 0;

let startTime;
let timer; //経過秒数
let backTimer; //カードをめくる時間

function Main() {
    gameArea = document.getElementById("gamearea");

    errorArea = document.getElementById('error');
    difficulty = document.getElementsByName('diff');
    re = document.getElementById('result');

    startButton = document.getElementById('startbutton');
    startButton.addEventListener("click", buttonAction);
    restartButton = document.getElementById('restartbutton');
    restartButton.addEventListener("click", restartAction);

};


function turn(e) {
    let div = e.target;
    if (nowPlaying) {
        if (backTimer) return; //カードのタイマー作動中の時

        if (div.innerHTML == "") {
            div.className = "card";
            div.innerHTML = div.number;
        } else {
            return;
        }
        if (firstFlg) { //１枚目のカードなら
            firstCard = div;
            firstFlg = false;
        } else { //２枚目のカードなら
            if (firstCard.number == div.number) { //一致した時
                unitCount++;
                backTimer = setTimeout(function() {
                    div.className = 'finish';
                    firstCard.className = 'finish';
                    backTimer = NaN;

                    if (countUnit == diffNumber) { //クリア
                        nowPlaying = false;
                        clearInterval(timer);
                        changingDisable();
                    }
                }, 500)
            } else { //一致しない時
                backTimer = setTimeout(function() {
                    div.className = 'back';
                    div.innerHTML = '';
                    firstCard.className = 'back';
                    firstCard.innerHTML = '';
                    firstCard = null;
                    backTimer = NaN;
                }, 500);
            }
        }
        firstFlg = true;
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

        startTime = new Date();
        timerStart();
    }
}

function restartAction() {
    nowPlaying = false;
    clearInterval(timer);
    numbers = [];
    cards = [];
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }
    re.innerHTML = "時間: -"
    changingDisable();
}

function timerStart() {
    timer = setInterval(showSecond, 1000);
}

function showSecond() {
    let nowTime = new Date();
    let elapsedTime = Math.floor((nowTime - startTime) / 1000);
    let str = '時間: ' + elapsedTime + '秒';

    re.innerHTML = str;
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
            diffNumber = 6;
            break;
        case "NORMAL":
            diffNumber = 9;
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
}