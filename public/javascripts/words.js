window.onload = function () {

    var rusInput = document.getElementById('rusInput');
    var engInput = document.getElementById('engInput');


    var table = document.getElementById('table');

    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    };
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    var btnSaveWord = document.getElementById("save");
    btnSaveWord.onclick = function () {
        var json = JSON.stringify({russian: rusInput.value, english: engInput.value});
        ajax("/words", json, function () {
            modal.style.display = "none";
        })
    };

    function ajax(url, json, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status == 200) {
                callback(this.responseText);
            }
        };
    }

    var buttonLoadWords = document.getElementById('load');
    buttonLoadWords.onclick = function () {
        fillTable()
    };

    function fillTable() {
        ajax('/getWords', null, function (el) {
            deleteRows();
            addRowsInTable(JSON.parse(el))
        })
    }

    fillTable();

    function deleteRows() {
        var rowsCount = table.getElementsByTagName("tr").length;
        for (var i = 0; i < rowsCount; i++) {
            table.deleteRow(0);
        }
    }

    function addRowsInTable(arr) {
        arr.forEach(function (word, index) {
            var row = table.insertRow(index);
            var cell = row.insertCell(0);
            cell.innerHTML = word._id;
            cell = row.insertCell(1);
            cell.innerHTML = word.russian;
            cell = row.insertCell(2);
            cell.innerHTML = word.english;
        })
    }


};
