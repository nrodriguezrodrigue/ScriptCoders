'use strict';
var express = require('express');

const { Jugador, Pareja, Pixel, Tablero, Sala } = require("../js/Modelo.js");
// Incluyo MongoDB
const { getSala, getJugador, actualizarSala } = require("../js/DB.js");

var messages = [
    {
        id: 1,
        text: "Hola soy un mensaje2323",
        author: "Carlos Azaustre",
    },
];

var infoSala_ACK = {
    idSala: 0,
    tablero: null,
    j1: null,
    j2: null
}

module.exports = function (io) {
    io.on("connection", function (socket) {
        console.log("Alguien se ha conectado con Sockets");
        socket.emit("messages", messages);

        socket.on("new-message", function (data) {
            messages.push(data);

            io.sockets.emit("messages", messages);
        });

        socket.on("infoSala", function (data) {
            getSala(data["idSala"], salas[data["idSala"]]);
            let encontrado = false;
            let jugador = null;

            jugadores.forEach((i) => {
                if (data["username"] == i.username) {
                    jugador = new Jugador(i["nombre"], i["username"], i["password"], i["pathAvatar"]);
                    encontrado = true;
                }
            })

            messages.push(data);
            console.log(data);
            if (encontrado) {
                if (salas[data["idSala"]].pareja.getJugador1() === null) {
                    salas[data["idSala"]].pareja.setJugador1(new Jugador(jugador["nombre"], jugador["username"], jugador["password"], jugador["pathAvatar"]));
                }
                else if (salas[data["idSala"]].pareja.getJugador2() === null && !(salas[data["idSala"]].pareja.getJugador1().getUsername() === jugador.getUsername())) {
                    salas[data["idSala"]].pareja.setJugador2(new Jugador(jugador["nombre"], jugador["username"], jugador["password"], jugador["pathAvatar"]));
                }
                actualizarSala(data["idSala"], salas[data["idSala"]]);
            }

            // Actualzo BBDD
            actualizarSala(data["idSala"], salas[data["idSala"]]);

            // Respuesta
            infoSala_ACK = {
                sala: salas[data["idSala"]],
                username: data["username"]
            }

            io.sockets.emit("infoSala_ACK", infoSala_ACK);
        });

        socket.on("escribirPixel", function (data) {
            console.log(data);
            
            var numJugador = "1";   // Por defecto se escribe como si fuese el jugador 1

            if (salas[data["idSala"]].pareja.getJugador2() !== null && salas[data["idSala"]].pareja.getJugador2().getUsername() == data["username"]) {
                numJugador = "2";
            }
            salas[data["idSala"]].tablero.escribirPixel(data["coordX"], data["coordY"], numJugador);
            salas[data["idSala"]].tablero.printTablero();
            actualizarSala(data["idSala"], salas[data["idSala"]]);
            // Respuesta
            infoSala_ACK = {
                sala: salas[data["idSala"]]
            }

            io.sockets.emit("escribirPixel_ACK", infoSala_ACK);
        });
    });    
}









