window.onload = Main;
document.onclick = Click;

let TextArea
let message = "";

function Main() {
    TextArea = document.getElementById("textarea");

};

function Click(evt) {
    message = message + "ウオ";
    TextArea.innerHTML = message;
};