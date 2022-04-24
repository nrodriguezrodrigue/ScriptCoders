var express = require("express");

var register = require('./controllers/registerController');
var login = require('./controllers/loginController');

var app = express();

var servidor = require('http').Server(app);
var io = require('socket.io')(servidor);
var bodyParser = require("body-parser");


/////////////////////////////////////////////////////////////////////////

const { Jugador, Pareja, Pixel, Tablero, Sala } = require("./js/Modelo.js");

// Creación de los elementos iniciales de la app
global.jugadores = [];
global.salas = [];
salas[0] = new Sala("Sala 0");
salas[0].tablero.initTablero();

salas[1] = new Sala("Sala 1");
salas[1].tablero.initTablero();

salas[2] = new Sala("Sala 2");
salas[2].tablero.initTablero();

salas[3] = new Sala("Sala 3");
salas[3].tablero.initTablero();


global.respuesta = {
    error: false,
    codigo: 500,
    tablero: null,
    jugador: null
};

global.respuesta2 = {
    error: true,
    codigo: 500,
    mensaje: 'Fallo en el register'
};
/////////////////////////////////////////////////////////////////////////



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/login', login);
app.use('/register', register);
//app.use('/juego', juego);
app.use(express.static(__dirname + "/"));

app.get('/', function (req, res) {
  res.sendFile('views/login.html', {root: __dirname })
});

/*
app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});
*/

servidor.listen(3000);


// load consumer.js and pass it the socket.io object
var juego = require('./controllers/juegoController');
juego(io);
