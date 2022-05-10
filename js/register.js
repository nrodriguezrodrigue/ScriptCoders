function init() {
    localStorage.clear();
    sessionStorage.clear();
    
    $('#message').text('');
    $('#file-avatar').change(mostrarImagen);

    $('#form-register').submit(function (event) {
        var image = $('#avatar').attr('src');
        var password = $('#password').val();
        var rpassword = $('#rpassword').val();
        var email = $('#email').val();
        var result = false; 
        var jugador = {
            tipoElem: "jugador",
            username: "",
            password: "",
            pathAvatar: ""
        };

        event.preventDefault();

        if (!(password !== '' && password === rpassword && email !== '' && image !== '')) {
            event.preventDefault();
            $('#message').text('Existen errores en el formulario');
        } else {
            var preferencias = { image: image };
            var preferenciasStr = JSON.stringify(preferencias);
                        
            $.post("http://localhost:3000/register", { email: email, password: password, path: image }, function (respuesta) {
            debugger;    
            if (respuesta["codigo"] == 200) {
                    console.log(respuesta);
                    jugador = {
                        tipoElem: "jugador",
                        username: email,
                        password: password,
                        pathAvatar: image
                    }
                    debugger;
                    localStorage.setItem('jugador', JSON.stringify(jugador));
                    localStorage.setItem('preferencias', preferenciasStr);
                    $('#message').text('Usuario registrado correctamente');
                    console.log(localStorage);
                }
                else {
                    console.log(respuesta);
                }
            });
            
            result = true;
        }

        //return result;
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