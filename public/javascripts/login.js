/**
 * Created by ruslan on 25.07.2017.
 */

var username = document.getElementById("username");
var password = document.getElementById("password");
var button = document.getElementById("submit");
var remember = document.getElementById("remember");
var errorStatus = document.getElementById("errorstatus");

button.disabled = true;

updateState();

function updateState() {
    var usernameCorrected = check(username);
    var passwordCorrected = check(password);
    unblockInput(username, usernameCorrected);
    unblockInput(password, passwordCorrected);
    unblockButton(button, usernameCorrected && passwordCorrected)
}

function check(input) {
    var length = input.value.length;
    return length >= 3 && length <= 15 && !(/\s/g.test(input.value));
}


function unblockButton(button, corrected) {
    button.classList.add(corrected ? "btn-success" : "btn-danger");
    button.classList.remove(corrected ? "btn-danger" : "btn-success");
    button.disabled = !corrected;
}


function unblockInput(input, corrected) {
    input.classList.remove(corrected ? "red" : "green");
    input.classList.add(corrected ? "green" : "red");
}


button.onclick = function () {
    var json = JSON.stringify({username: username.value, password: password.value, remember: remember.checked});
    ajax("/login", json)
        .then(function (response) {
            window.location.href = "/";
        }, function (err) {
            errorStatus.innerHTML = JSON.parse(err.message).description;
        })
};