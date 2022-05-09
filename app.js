var express = require("express");

var register = require('./controllers/registerController');
var login = require('./controllers/loginController');

var app = express();

var servidor = require('http').Server(app);
var io = require('socket.io')(servidor);
var bodyParser = require("body-parser");

// Incluyo MongoDB
const { initDB, createCollection, createCollectionJugadores, insertSala, insertJugador, getSala, getJugador, getJugadores, actualizarSala } = require("./js/DB.js");

/////////////////////////////////////////////////////////////////////////

const { Jugador, Pareja, Pixel, Tablero, Sala } = require("./js/Modelo.js");

// Creación de los elementos iniciales de la app
global.jugadores = [];
global.salas = [];
salas[0] = new Sala("Sala 0");
salas[0].setID(0);
salas[0].tablero.initTablero();

salas[1] = new Sala("Sala 1");
salas[1].setID(1);
salas[1].tablero.initTablero();

salas[2] = new Sala("Sala 2");
salas[2].setID(2);
salas[2].tablero.initTablero();

salas[3] = new Sala("Sala 3");
salas[3].setID(3);
salas[3].tablero.initTablero();


global.respuesta = {
    error: false,
    codigo: 500,
    tablero: null,
    jugador: null,
    jugadores: null
};

global.respuesta2 = {
    error: true,
    codigo: 500,
    mensaje: 'Fallo en el register'
};

// Aquí incluyo la parte de la BBDD mongo
initDB();
createCollection();

insertSala(salas[0]);
insertSala(salas[1]);
insertSala(salas[2]);
insertSala(salas[3]);

createCollectionJugadores();
getJugadores(jugadores);
actualizarSala(0, salas[0]);
actualizarSala(1, salas[0]);
actualizarSala(2, salas[0]);
actualizarSala(3, salas[0]);


/*
setTimeout(() => {
    console.log(jugadores);
    console.log("hola"); }, 5000);
*/


//salas[0].setDesc("Descripción de sala editada 1");
//actualizarSala(salas[0].getID(), salas[0]);

//JSON.parse(salas[0]);
//console.log(JSON.stringify(salas[0]));
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
