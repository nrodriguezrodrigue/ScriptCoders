function init() {
    $('#file-avatar').change(mostrarImagen);
}

function mostrarImagen(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        $('#avatar').attr('src', event.target.result);
    }
    reader.readAsDataURL(file);
}

$(function () {
    init();
});