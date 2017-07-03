window.onload = function () {

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


    document.getElementById("save").onclick = ajax;


    function ajax() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/words', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.send( JSON.stringify({russian:"русский", english:"английский"}) );

        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState != 4) return;
            if (xhr.status == 200) {
                modal.style.display = "none";
            }
        };
    }


};
