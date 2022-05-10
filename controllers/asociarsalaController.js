'use strict';
var express = require('express');
var router = express.Router();

const { Jugador, Pareja, Pixel, Tablero, Sala } = require("../js/Modelo.js");

// A�ado Mongo
const { actualizarJugador, getJugador } = require("../js/DB.js");


router.post('/', function (req, res) {
    let error = false;
    let respuesta = {
        error: true,
        codigo: 500,
        mensaje: 'Error al asociar la sala al jugadorr'
    };

    debugger;
    const id = 'ID: ' + req.body.username;
    const numSala = req.body.salaId;

    if (numSala && id) {
        // Invocar al método que asocia un usuario a una sala
        getJugador(id).then((jugador) => {
            debugger;
            jugador.salaId = numSala;
            actualizarJugador(jugador).then( () =>{

                debugger;
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: 'El usurio ya tiene asociada la sala'
                }
                res.send(respuesta);
            });
        });
    }
});

module.exports = router;