/**
 * Created by ruslan on 25.07.2017.
 */


var username = document.getElementById("username");
var password = document.getElementById("password");
var button = document.getElementById("login");
var remember = document.getElementById("remember");




button.disabled = true;

function updateState() {
    if (check(username) && check(password)) {
        blockButton(button, false)
    } else {
        blockButton(button, true);
    }
}

function check(input) {
    var length = input.value.length;
    return length >= 3 && length <= 15;
}

function blockButton(button, boolean) {
    if (boolean) {
        inner('btn-success', 'btn-danger', true)
    } else {
        inner('btn-danger', 'btn-success', false)
    }
    function inner(removeClass, addClass, blocked) {
        button.classList.remove(removeClass);
        button.classList.add(addClass);
        button.disabled = blocked;
    }
}


button.onclick = function () {
    var json = JSON.stringify({username: username.value, password: password.value, remember: remember.checked });
    ajax("/login", json)
        .then(function (response) {
            window.location.href="/";
        }, function (err) {
            alert(  err.statusText)
        })
};