function init() {
    $('#logout').on('click', logout);
    $('#avatar').on('dragstart', drag);

    $('#sala1, #sala2, #sala3, #sala4').on('drop', drop);
    $('#sala1, #sala2, #sala3, #sala4').on('dragover', allowDrop);

    $('#sala1, #sala2, #sala3, #sala4').on('click', gotoTablero);

    var preferencias = JSON.parse(localStorage.getItem('preferencias'));
    if (preferencias) {
        let img = '<img class="rounded-circle" alt="avatar" id="avatar" draggable="true" src="' + preferencias.image + '"/>';
        if(preferencias.sala){
            $('#'+preferencias.sala).html(img);
        }else{
            $('#avatar').html(img);
        }
    }
}

function logout() {
    console.log(sessionStorage);
    Object.keys(sessionStorage).forEach(function (key) {
        if (key) {
            var x = JSON.parse(sessionStorage.getItem(key));
            sessionStorage.removeItem(x["username"]);
        }
    });
    window.location.href = "http://localhost:3000";
}

function gotoTablero(){
    window.location = '../views/tablero.html';
}

function allowDrop(ev) {
    ev.originalEvent.preventDefault();
}

function drag(ev) {
    ev.originalEvent.dataTransfer.setData("text", ev.originalEvent.target.id);
}

function drop(ev) {
    console.log(ev);
    ev.originalEvent.preventDefault();
    var data = ev.originalEvent.dataTransfer.getData("text");
    console.log(data);
    ev.originalEvent.target.appendChild(document.getElementById(data));

    debugger
    var preferencias = JSON.parse(localStorage.getItem('preferencias'));
    preferencias['sala'] = ev.currentTarget.id;
    var preferenciasStr = JSON.stringify(preferencias);

    localStorage.setItem('preferencias', preferenciasStr);
}

function printJugadores() {    
    Object.keys(localStorage).forEach(function (key) {
        var x = JSON.parse(localStorage.getItem(key));
        console.log(x["username"]);
        jugador = $("<a href='#' class='list-group-item list-group-item-action' id='" + x["username"] + "' draggable='true'>" + x["username"] + "</a></br>").on('dragstart', drag);
        $('#jugadores').append(jugador);
    });
}

$(function () {
    init();
});
