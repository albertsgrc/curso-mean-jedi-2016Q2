var http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;

var DB_URI = "mongodb://localhost:27017/ejercicio_03";
var db = null;

function insertLightSaber(lightsaberInfo, collection, res) {
    collection.insert(lightsaberInfo, function(err, result) {
        if (err) {
            res.end("No se ha podido añadir la lightsaber:" + err);
            console.error("No se ha podido añadir la lightsaber:" + err);
        }
        else res.end("true");
    });
}

function getLightSaber(query, collection, res) {
    collection.find(query).toArray(function (err, result) {
        if (err) {
            res.end("Error al obtenir las lightsabers: " + err);
            console.error("Error al obtener las lightsabers: " + err);
        }
        else res.end(JSON.stringify(result));
    });
}

function checkConnectedToDB(res) {
    var connected = db !== null;
    if (!connected) res.end("Aún no se ha podido conectar con la BD");
    return connected;
}

function checkUrlPath(path, res) {
    var isCorrect = path === '/lightsaber';
    if (!isCorrect) res.end("URL incorrecta!");
    return isCorrect;
}

MongoClient.connect(DB_URI, function(err, database) {
    if (err) console.error("Error conectando a la BD con uri: " + DB_URI);
    else {
        console.log("Conectado correctamente con la BD");
        db = database;
    }
});

http.createServer(function(req, res) {
    if (!checkConnectedToDB(res)) return false;
    var parsedUrl = url.parse(req.url, true);
    if (!checkUrlPath(parsedUrl.pathname, res)) return false;

    var collection = db.collection('lightsaber');
    switch (req.method) {
        case 'POST': insertLightSaber(parsedUrl.query, collection, res); break;
        case 'GET': getLightSaber(parsedUrl.query, collection, res); break;
        default: res.end("Método incorrecto!");
    }

    return true;
}).listen(8080);
