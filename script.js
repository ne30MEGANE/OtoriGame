window.onload = Main;
document.onclick = Click;

let TextArea

function Main() {
    TextArea = document.getElementById("textarea");

};
function Click(evt) {
    TextArea.innerHTML = "クリックするなっていったのに・・・";
};