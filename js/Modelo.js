class Jugador {
	// Modulo exportado
	constructor(name = "", user = "", pass = "", path = "") {
		this.id = 0;
		this.nombre = name;
		this.username = user;
		this.password = pass;
		this.pathAvatar = path;
	}

	//Setters
	setId(newId) {
		this.id = newId;
	}

	setNombre(newNombre) {
		this.nombre = newNombre;
	}

	setUsername(newUser) {
		this.username = newUser;
	}

	setPassword(newPass) {
		this.id = newPass;
	}

	setPath(newPath) {
		this.id = newPath;
	}

	// Getters

	getId() {
		return this.id;
	}

	getNombre() {
		return this.nombre;
	}

	getUsername() {
		return this.username;
	}

	getPassword() {
		return this.password;
	}

	getPath() {
		return this.pathAvatar;
	}
}

class Pareja {
	// Modulo exportado
	constructor() {
		this.id = 0;
		this.jugador1 = null;
		this.jugador2 = null;
		this.puntuacionJ1 = 0;
		this.puntuacionJ2 = 0;
	}

	//Setters
	setID(newID) {
		this.id = newID;
	}
	setJugador1(newJ1) {
		this.jugador1 = newJ1;
	}
	setJugador2(newJ2) {
		this.jugador2 = newJ2;
	}
	setScoreJ1(newScore) {
		this.puntuacionJ1 = newScore;
	}
	setScoreJ2(newScore) {
		this.puntuacionJ2 = newScore;
	}

	// Getters
	getId() {
		return this.id;
	}

	getJugador1() {
		return this.jugador1;
	}
	getJugador2() {
		return this.jugador2;
	}
	getScoreJ1(newScore) {
		return this.puntuacionJ1;
	}
	getScoreJ2(newScore) {
		return this.puntuacionJ2;
	}

	// Métodos Generales
	delJ1() {
		this.jugador2 = null;
	}
	delJ2() {
		this.getJugador1 = null;
	}

	numJugadores() {
		let result = 0;
		if (this.jugador1 !== null)
			result++;
		if (this.jugador2 !== null)
			result++;
		return result;
	}
}

class Pixel {
	// Modulo exportado
	constructor(coordX = 0, coordY = 0, ocup = false) {
		this.coordX = coordX;
		this.coordY = coordY;
		this.ocupado = false;

	}

	//Setters
	setCoordX(newX) {
		this.coordX = newX;
	}
	setCoordY(newY) {
		this.coordY = newY;
	}
	setOcupado(newOcup) {
		this.ocupado = newOcup;
	}


	// Getters

	getCoordX(newX) {
		return this.coordX;
	}
	getCoordY(newY) {
		return this.coordY;
	}
	getOcupacion(newOcup) {
		return this.ocupado;
	}
	getSymbol() {
		return (this.ocupado) ? "X" : "0";
	}
}

class Tablero {
	// Modulo exportado
	constructor(filas = 0, columnas = 0, pareja = null) {
		this.id = 0;
		this.pareja = pareja;
		this.mapa = new Array();
		this.filas = filas;
		this.columnas = columnas;
	}

	//Setters
	setPareja(newPareja) {
		this.Pareja = newPareja;
	}
	setFilas(newFilas) {
		this.Filas = newFilas;
	}
	setColumnas(newCols) {
		this.Filas = newCols;
	}

	// Getters
	getPareja() {
		return this.Pareja;
	}
	getFilas() {
		return this.Filas;
	}
	getColumnas() {
		return this.Filas;
	}
	getTablero() {
		return this.mapa;
	}

	// Métodos Genéricos
	initTablero() {
		let long = this.filas * this.columnas;
		let r = 0;
		let c = 0;

		for (let i = 0; i < long; i++) {
			if (i > 0 && i % this.columnas == 0) {
				r++;
			}
			c = i % this.columnas;
			this.mapa[i] = new Pixel(r, c, false);
			//console.log(r + "," + c);
		}
	}

	escribirPixel(x, y, value = true) {
		let result = false;
		let index = x * this.columnas + y;

		if (this.mapa[index] !== null) {
			this.mapa[index].setOcupado(value);
		}

		return result;
	}

	getPixel(x, y) {
		let index = x * this.columnas + y;
		let pixel = this.mapa["index"];

		return pixel;
	}

	printTablero() {
		let long = this.filas * this.columnas;
		let i = 0;
		let r = 0;
		let str = "";
		while (long > 0) {
			//console.log(this.mapa[i].getSymbol() + " ");
			if (r < this.mapa[i].getCoordX()) {
				//console.log("\n");
				str += "\n";
				r = this.mapa[i].getCoordX();
			}
			str += this.mapa[i].getSymbol() + " ";


			i++;
			long--;
		}

		console.log(str);
	}
}

class Sala {
	// Modulo exportado
	constructor(desc = "Sala") {
		this.id = 0;
		this.pareja = new Pareja();
		this.desc = desc;
		this.tablero = null;
	}

	//Setters
	setDesc(newDesc) {
		this.desc = newDesc;
	}


	// Getters
	getDesc() {
		return this.desc;
	}


	// Métodos Generales
	initSala(filas = 0, cols = 0) {
		let pareja = new Pareja();
		this.tablero = new Tablero(filas, cols, pareja);
	}

	addJugador1(j) {
		this.pareja.setJugador1() = j;
	}

	addJugador2(j) {
		this.pareja.setJugador2() = j;
	}
}

class Juego {
	// Modulo exportado
	constructor() {
		this.salas = new Array();
	}

	// Getters
	getSalas() {
		return this.salas;
	}

	getSala(index = 0) {
		return this.salas[index];
	}

	// Métodos Genéricos
	crearSala(rows = 4, cols = 4) {
		let sala = new Sala();
		sala.initSala(rows, cols);
		this.salas.push(sala);
	}
}

module.exports = {
	Jugador,
	Pareja,
	Pixel,
	Tablero,
	Sala,
	Juego
}