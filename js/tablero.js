var ROWS = 6;
var COLUMNS = 6;
const WIDTH = 50;
const HEIGTH = 50;
var sala = null;
var jugador = "";

var socket = io.connect("http://localhost:3000", { forceNew: true });
// Defino los mensajes a enviar
var infoSala_msg = {
    idSala: 0,
};
var escribirPixel_msg = {
    username: "", // email del jugador que escribe en el tablero
    idSala: 0,
    coordX: 0,
    coordY: 0
};

// Función para enviar mensajes via Websocket

function sendMessage(msg, data) {
    socket.emit(msg, data);
    return false;
}

function init() {

    debugger;
    let elemento = $('#tablero').get(0);
    lienzo = elemento.getContext("2d");
    lienzo.fillStyle = "#FFBD16";

    let offsetX = 0;
    let offsetY = 0;
    let x = 100;
    let y = 100;

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            lienzo.strokeRect(x + offsetX, y + offsetY, WIDTH, HEIGTH);
            offsetX += 80;
        }
        offsetY += 90;
        offsetX = 0;
    }
}

function init2() {
    debugger;

    socket.on("escribirPixel_ACK", function (data) {
        console.log(data);
        sala = data["sala"];
    });

    var intervalID = window.setInterval(printSquares, 800, sala);

    ROWS = sala["tablero"]["filas"];
    COLUMNS = sala["tablero"]["columnas"];

    // El modelo deb proporcionar la zona por donde el jugador puede empezar (arriba o abajo)
    // petición ajax
    let color = 1 // 1 empezar por arriba
    /*
    if (sala["pareja"]["jugador2"] !== null && sala["pareja"]["jugador2"] == jugador) {
        color = 0 // 0 empezar por abajo
    }
    */
    let fill = 'red';
    if (color === 0) {
        fill = 'green';
    }
    const canvas = document.getElementById('tablero');
    const ctx = canvas.getContext('2d');

    

    let matrixSquares = [];

    let offsetX = 0;
    let offsetY = 0;
    let x = 100;
    let y = 100;

    for (let i = 0; i < ROWS; i++) {
        let arraySquares = [];
        for (let j = 0; j < COLUMNS; j++) {
            const squares = new Path2D();
            squares.rect(x + offsetX, y + offsetY, WIDTH, HEIGTH);
            ctx.stroke(squares);
            squares.painted = null;

            arraySquares.push(squares);

            offsetX += 80;
        }
        offsetY += 90;
        offsetX = 0;

        matrixSquares.push(arraySquares);
    }
    
    function paintedSquare(color) {
        let exist = false;
        matrixSquares.forEach((arraySquares, i) => {
            arraySquares.forEach((squares, j) => {
                if (squares.painted === color) {
                    exist = true;
                }
            });
        });

        return exist;
    }

    //printSquares(sala);

    // Listen for mouse moves
    canvas.addEventListener('click', function (event) {
        // Check whether point is inside circle
        let currentSquares;
        let row;
        let column;
        matrixSquares.forEach((arraySquares, i) => {
            arraySquares.forEach((squares, j) => {
                //console.log('i =' + i);
                //console.log('j =' + j);
                if (ctx.isPointInPath(squares, event.offsetX, event.offsetY)) {
                    currentSquares = squares;
                    row = i;
                    column = j;
                }
            });
        });

        if (currentSquares && !currentSquares.painted) {
            let exist = paintedSquare(color);
            if (!exist) {
                if (row === (ROWS - 1) && color === 0) {

                    ctx.fillStyle = 'red';
                    ctx.fill(currentSquares);
                    currentSquares.painted = 0;

                } else if (row === 0 && color === 1) {
                    ctx.fillStyle = 'green';
                    ctx.fill(currentSquares);
                    currentSquares.painted = 1;
                }       

                escribirPixel_msg = {
                    username: jugador, // email del jugador que escribe en el tablero
                    idSala: 0,
                    coordX: row,
                    coordY: column
                };
                sendMessage("escribirPixel", escribirPixel_msg);
                
                
            } else {
                // Buscar el adyacente [row, column] indican la posición donde está
                let painted = false;
                let square;

                //Arriba se localiza el cuadrado sin pintar
                if (row + 1 <= ROWS - 1) {
                    square = matrixSquares[row + 1][column];
                    painted = square.painted != null && square.painted === color;
                }


                if (!painted && row + 1 <= ROWS - 1 && column + 1 <= COLUMNS - 1) {
                    // Arriba izquierda se localiza el cuadrado sin pintar
                    square = matrixSquares[row + 1][column + 1];
                    painted = square.painted != null && square.painted === color;
                }

                if (!painted && column + 1 <= COLUMNS - 1) {
                    // A la izquierda se localiza el cuadrado sin pintar
                    square = matrixSquares[row][column + 1];
                    painted = square.painted != null && square.painted === color;
                }

                if (!painted && row - 1 >= 0 && column + 1 <= COLUMNS - 1) {
                    // Abajo izquierda se localiza el cuadrado sin pintar
                    square = matrixSquares[row - 1][column + 1];
                    painted = square.painted != null && square.painted === color;
                }

                if (!painted && row - 1 >= 0) {
                    // Abajo se localiza el cuadrado sin pintar
                    square = matrixSquares[row - 1][column];
                    painted = square.painted != null && square.painted === color;
                }

                if (!painted && row - 1 >= 0 && column - 1 >= 0) {
                    // Abajo derecha se localiza el cuadrado sin pintar
                    square = matrixSquares[row - 1][column - 1];
                    painted = square.painted != null && square.painted === color;
                }

                if (!painted && column - 1 >= 0) {
                    // Derecha se localiza el cuadrado sin pintar
                    square = matrixSquares[row][column - 1];
                    painted = square.painted != null && square.painted === color;
                }

                if (!painted && row + 1 <= ROWS - 1 && column - 1 >= 0) {
                    // Arriba derecha se localiza el cuadrado sin pintar
                    square = matrixSquares[row + 1][column - 1];
                    painted = square.painted != null && square.painted === color;
                }

                if (painted) {
                    // Pintamos el cuadrado
                    if (color === 1) {
                        ctx.fillStyle = 'green';
                        ctx.fill(currentSquares);
                        currentSquares.painted = 1;
                    } else {
                        ctx.fillStyle = 'red';
                        ctx.fill(currentSquares);
                        currentSquares.painted = 0;
                    }
                    // Enviar por web socket el cuadrado pintado                
                    escribirPixel_msg = {
                        username: jugador, // email del jugador que escribe en el tablero
                        idSala: 0,
                        coordX: row,
                        coordY: column
                    };
                    sendMessage("escribirPixel", escribirPixel_msg);
                    
                }

            }
        }        
    });

    function printSquares() {

        // Printo avatares
        let image = null;


        if (sala["pareja"]["jugador1"] !== null) {
            image = document.createElement('img');
            image.src = sala["pareja"]["jugador1"]["pathAvatar"];
            ctx.drawImage(image, 200, 20, 50, 50);
        }
        if (sala["pareja"]["jugador2"] !== null) {
            image = document.createElement('img');
            image.src = sala["pareja"]["jugador2"]["pathAvatar"];
            ctx.drawImage(image, 300, 20, 50, 50);
        }

        var currentS = null;
        var index = 0;
        matrixSquares.forEach((arraySquares, i) => {
            arraySquares.forEach((squares, j) => {
                index = i * COLUMNS + j;
                if (sala["tablero"]["mapa"][index]["ocupado"] > "0") {
                    currentS = squares;
                    row = i;
                    column = j;

                    if (sala["tablero"]["mapa"][index]["ocupado"] > "1") {
                        ctx.fillStyle = 'red';
                        ctx.fill(currentS);
                        currentS.painted = 0;
                    }
                    else {
                        ctx.fillStyle = 'green';
                        ctx.fill(currentS);
                        currentS.painted = 1;
                    }
                }
            });
        });
    }
}


$(function () {
    Object.keys(sessionStorage).forEach(function (key) {
        var x = JSON.parse(sessionStorage.getItem(key));
        try {
            jugador = x["username"];
        } catch (e) {
            console.log(x);
        }
    });

    socket.on("infoSala_ACK", function (data) {
        console.log(data);
        console.log(jugador);
        sala = data["sala"];
        if (data["username"] !== null && data["username"] == jugador) {
            init2();
        }        
    });
    infoSala_msg = {
        idSala: 0,
        username: jugador
    };
    sendMessage("infoSala", infoSala_msg);    
});
