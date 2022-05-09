'use strict';
var express = require('express');
var router = express.Router();

const { Jugador, Pareja, Pixel, Tablero, Sala } = require("../js/Modelo.js");

// Añado Mongo
const { insertJugador, getJugador } = require("../js/DB.js");


router.post('/', function (req, res) {
    let error = false;
    respuesta2 = {
        error: true,
        codigo: 500,
        mensaje: 'Fallo en el register'
    };

    if (!req.body.email || req.body.email == '' || req.body.email == null) {
        respuesta2 = {
            error: true,
            codigo: 501,
            mensaje: 'El campo nombre y apellido son requeridos'
        }
        error = true;
    } else {
        jugadores.forEach((i) => {
            if (req.body.email == i.username) {
                respuesta2 = {
                    error: true,
                    codigo: 502,
                    mensaje: 'El usuario ya existe'
                };
                error = true;
            }
        });
    }

    if (!error) {
        respuesta2 = {
            error: false,
            codigo: 200,
            mensaje: 'El usuario ha sido creado'
        };
        var gamer = new Jugador(req.body.username, req.body.email, req.body.password, req.body.path);
        jugadores.push(gamer);
        insertJugador(gamer);
    }

    console.log();

    res.send(respuesta2);
});

module.exports = router;