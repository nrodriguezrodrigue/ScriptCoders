
window.onload = init;

var jugador = {
    tipoElem: "jugador",
    username: "",
    password: "",
    pathAvatar: ""
};

function init(){
    $('#form-login').submit(function (event) {
        event.preventDefault();
        validate();
    });

}

function validate(){
    debugger;
    var email = $('#email').val();
    var password = $('#password').val();
    
    var valid = false;
    if(email !== '' && password !== ''){
        valid = true;

        $.post("http://localhost:3000/login", { email: email, password: password }, function (respuesta) {
            if (respuesta["codigo"] == 200) {
                localStorage.clear();
                sessionStorage.clear();
                console.log("Jugadores: ");
                console.log(respuesta["jugadores"]);
                respuesta["jugadores"].forEach((i) => {
                    jugador = {
                        tipoElem: "jugador",
                        username: i["username"],
                        password: i["password"],
                        pathAvatar: i["pathAvatar"]
                    }
                    localStorage.setItem('jugador:' + jugador["username"], JSON.stringify(jugador));
                });

                console.log(respuesta);
                jugador = {
                    tipoElem: "jugador",
                    username: email,
                    password: password,
                }
                sessionStorage.setItem("jugador", JSON.stringify(jugador));
                window.location = "../views/salas.html"; // Redirige a otra p�gina
            }
            else {
                console.log(respuesta);
                //window.location.href = window.location.href;
            }
        });
    }

    return valid;
}


var socket = io.connect("http://localhost:3000", { forceNew: true });

socket.on("messages", function (data) {
    console.log(data);
    //render(data);
});

function render(data) {
    var html = data
        .map(function (elem, index) {
            return `<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`;
        })
        .join(" ");

    document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
    var message = {
        author: "javier",
        text: e,
    };

    socket.emit("new-message", message);
    return false;
}