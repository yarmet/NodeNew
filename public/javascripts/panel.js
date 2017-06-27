/**
 * Created by ruslan on 26.06.2017.
 */

document.getElementById("logout").onclick = function () {
    var f = document.createElement("form");
    f.setAttribute('method', "post");
    f.setAttribute('action', "/logout");
    document.body.appendChild(f);
    f.submit();
};