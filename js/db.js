var MongoClient = require('mongodb').MongoClient;
const DB_URI = 'mongodb+srv://javigamer:scriptcoders@cluster0.uohkx.mongodb.net/scriptcoders';

const initDB = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            }
            else {
                console.log("Conexión correcta");
                db.close();
            }
        }
    )
}

const createCollection = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            }
            else {
                db.db("scriptcoders").createCollection("salas", function (err, res) {
                    if (err) {
                        if (err.ok == 0 && err.code == 48) {
                            console.log("La Colección ya existe");
                        }
                        else {
                            console.log("Error al crear la conexión");
                        }                        
                    }
                    else {
                        console.log("Colección creada!");
                        db.close();
                    }                    
                });
            }
        }
    )
}

const createCollectionJugadores = () => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            }
            else {
                db.db("scriptcoders").createCollection("jugadores", function (err, res) {
                    if (err) {
                        if (err.ok == 0 && err.code == 48) {
                            console.log("La Colección ya existe");
                        }
                        else {
                            console.log("Error al crear la conexión");
                        }
                    }
                    else {
                        console.log("Colección creada!");
                        db.close();
                    }
                });
            }
        }
    )
}

const insertSala = (sala) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            }
            else {
                db.db("scriptcoders").collection("salas").insertOne(sala, function (err, res) {
                    if (err) {
                        if (err.index == 0 && err.code == 11000) {
                            console.log("La sala ya existe en la BBDD");
                        }
                        else {
                            console.log("Error al insertar datos");
                        }    
                    }
                    else {
                        console.log("Datos de sala insertados!");
                        db.close();
                    }
                });
            }
        }
    )
}

const insertJugador = (jugador) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            }
            else {
                db.db("scriptcoders").collection("jugadores").insertOne(jugador, function (err, res) {
                    if (err) {
                        console.log(err);
                        if (err.index == 0 && err.code == 11000) {
                            console.log("El jugador ya existe en la BBDD");
                        }
                        else {
                            console.log("Error al insertar datos de jugadores");
                        }
                    }
                    else {
                        console.log("Datos de jugador insertados!");
                        db.close();
                    }
                });
            }
        }
    )
}

const getSala = (idSala, sala) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            }
            else {
                db.db("scriptcoders").collection("salas").findOne({ _id: idSala}, function (err, res) {
                    if (err) {
                        console.log("Error al buscar la sala");
                    }
                    else {
                        console.log(sala);
                        sala = res;
                        console.log(sala);
                        db.close();
                    }
                });
            }
        }
    )
}

const getJugador = (idJugador, jugador) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            }
            else {
                db.db("scriptcoders").collection("jugadores").findOne({ _id: idJugador }, function (err, res) {
                    if (err) {
                        console.log("Error al buscar al Jugador");
                    }
                    else {
                        console.log(jugador);
                        jugador = res;
                        console.log(jugador);
                        db.close();
                    }
                });
            }
        }
    )
}

const getJugadores = (jugadores) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            }
            else {
                db.db("scriptcoders").collection("jugadores").find({}).toArray(function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    res.forEach((i) => {
                        jugadores.push(i);
                    })

                    db.close();
                });
            }
        }
    )
}

const actualizarSala = (idSala, sala) => {
    MongoClient.connect(
        DB_URI,
        (err, db) => {
            if (err) {
                console.log("Error en la conexión a la Base de Datos");
            } 
            else {
                db.db("scriptcoders").collection("salas").updateOne({ _id: idSala }, { $set: sala }, function (err, res) {
                    if (err) {
                        console.log("Error al actualizar la sala");
                    }
                    else {
                        console.log(res);
                        sala = res;
                        db.close();
                    }
                });
            }
        }
    )
}

module.exports = {
    initDB,
    createCollection,
    createCollectionJugadores,
    insertSala,
    insertJugador,
    getSala,
    getJugador,
    getJugadores,
    actualizarSala
}

