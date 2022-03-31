function init() {
    $('#avatar').on('dragstart', drag);

    $('#sala1, #sala2, #sala3, #sala4').on('drop', drop);
    $('#sala1, #sala2, #sala3, #sala4').on('dragover', allowDrop);

    var preferencias = JSON.parse(sessionStorage.getItem('preferencias'));
    $('#avatar').attr('src', preferencias.image);
}

function allowDrop(ev) {
    ev.originalEvent.preventDefault();
}

function drag(ev) {
    ev.originalEvent.dataTransfer.setData("text", ev.originalEvent.target.id);
}

function drop(ev) {
    ev.originalEvent.preventDefault();
    var data = ev.originalEvent.dataTransfer.getData("text");
    ev.originalEvent.target.appendChild(document.getElementById(data));

    var preferencias = JSON.parse(sessionStorage.getItem('preferencias'));
    preferencias['sala'] = ev.currentTarget.id;
    var preferenciasStr = JSON.stringify(preferencias);

    sessionStorage.setItem('preferencias', preferenciasStr);
}

$(function () {
    init();
});
