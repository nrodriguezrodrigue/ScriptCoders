'use strict';
var express = require('express');
var router = express.Router();
const { Jugador, Pareja, Pixel, Tablero, Sala } = require("../js/Modelo.js");

    //POST - Insert a new User in the DB
router.post('/', function (req, res) {
        console.log('POST');

        respuesta = {
            error: true,
            codigo: 500,
            tablero: null,
            jugador: null,
            jugadores: jugadores
        };

        let email = req.body.email;
        let password = req.body.password;

        let encontrado = false;
        
        jugadores.forEach((i) => {
            if (req.body.email == i.username && req.body.password == i.password) {
                encontrado = true;
                respuesta = {
                    error: false,
                    codigo: 200,
                    tablero: null,
                    jugador: i,
                    jugadores: jugadores
                };
            }
        })
        console.log(respuesta);
        res.send(respuesta);
    });

module.exports = router;