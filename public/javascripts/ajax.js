/**
 * Created by ruslan on 25.07.2017.
 */

function ajax(url, json) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
    });
}