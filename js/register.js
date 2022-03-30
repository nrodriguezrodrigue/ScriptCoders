function init() {
    $('#message').text('');
    $('#file-avatar').change(mostrarImagen);

    $('#form-register').submit(function (event) {
        var image = $('#avatar').attr('src');
        var password = $('#password').val();
        var rpassword = $('#rpassword').val();
        var email = $('email').val();

        if (!(password !== '' && password === rpassword && email !== '' && image !== '')) {
            event.preventDefault();
            $('#message').text('Existen errores en el formulario');
        } else {
            var preferencias = { image: image };
            var preferenciasStr = JSON.stringify(preferencias);

            sessionStorage.setItem('preferencias', preferenciasStr);
        }
    });
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