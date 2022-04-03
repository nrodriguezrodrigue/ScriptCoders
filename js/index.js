const http = require('http');
const { bodyParser } = require('./lib/bodyParser');

let database = [];

//POST
//En el body escribimos y enviamos
async function createUserRegister(req, res) {
    try {
        await bodyParser(req);
        database.push(req.body)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(database));
        res.end();
    
    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Invalid Data');
        res.end();       
        }
}


//GET localhost:3000
function getUserRegister(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(database));
      res.end();
}


//PUT
//http://localhost:3000/registrados?id=2 (escribimos el texto por que queramos añadir y se cambia por el que haya en el id 2)
async function UpdateUserRegister(req, res) {
    try {
        let { url } = req;
        let isQuery = url.split("?")[1]; 
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];
        
        if (idKey === "id") {
            await bodyParser(req);
            database[idValue - 1] = req.body;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(database));
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Invalid Request Query');
            res.end();       
            }
    } catch (error) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Invalid Body data was provided', err.message);
        response.end(); 
        }
}


//DELETE
//http://localhost:3000/registrados?id=0
async function deleteUserRegister(req, res) {
    let { url } = req;

    let idQuery = url.split("?")[1]; 
    let idKey = idQuery.split("=")[0];
    let idValue = idQuery.split("=")[1];

    if (idKey === 'id') {
        database.splice(idValue - 1, 1);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('DELETE succefuly');
        res.end();       
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('Invalid Query');
        res.end();    
    }
}




const server = http.createServer((req, res) => {

    const { url, method } = req;
	
    console.log(`URL : ${url} - Method: ${method}`);

    switch(method) {
        case "GET":
            if (url === "/") {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({ message: 'Registro' } ));
                res.end();
            }
            if (url === "/registrados") {
                getUserRegister(req, res);
            }
            break;
    
        case "POST":
            if (url === "/registrados")   {
               createUserRegister(req, res);
            } 
            break;

        case "PUT":
            UpdateUserRegister(req, res);
            break;

        case "DELETE":
            deleteUserRegister(req, res);
            break;

        default:
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Not found');
            res.end();
    }

})

server.listen(3000);
console.log('Server on port', 3000);

