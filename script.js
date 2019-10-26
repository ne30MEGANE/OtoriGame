window.onload = Main;

let GameArea;
let CardArea;
let errorArea;
let startButton;
let selectedDiff;

let difficulty;
let diffNumber;


function Main() {
    GameArea = document.getElementById("gamearea");
    CreateTable();
    GameArea.appendChild(CardArea);

    errorArea = document.getElementById('error');
    difficulty = document.getElementsByName('diff');

    startButton = document.getElementById('startbutton');
    startButton.addEventListener("click", buttonAction);

};

function CreateTable() {
    CardArea = document.createElement('table');
    for (let i = 0; i < 4; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let td = document.createElement('td');
            td.textContent = "( " + i + " , " + j + " )"
            tr.appendChild(td);
        }
        CardArea.appendChild(tr);
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
        createTarget(selectedDiff); //問題生成
        console.log(diffNumber);
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
}