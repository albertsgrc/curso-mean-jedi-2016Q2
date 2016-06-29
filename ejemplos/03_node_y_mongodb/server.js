var http = require('http');
var log = require('winston');
var url = require('url');
var Mongodb = require('mongodb');
var MongoClient = Mongodb.MongoClient;

var DB_URI = "mongodb://localhost:27017/students";
var db = null;

function insertStudent(studentInfo, collection, res) {
    collection.insert(studentInfo, function(err, result) {
        if (err) {
            res.end("Couldn't add that student:" + err);
            log.error("Couldn't add that student:" + err);
        }
        else res.end("true");
    });
}

function getStudent(query, collection, res) {
    collection.find(query).toArray(function (err, result) {
        if (err) {
            res.end("Error retrieveing student/s: " + err);
            log.error("Error retrieveing student/s: " + err);
        }
        else res.end(JSON.stringify(result));
    });
}

function checkConnectedToDB(res) {
    var connected = db !== null;
    if (!connected) res.end("Not yet connected to database");
    return connected;
}

function checkUrlPath(path, res) {
    var isCorrect = path === '/students';
    if (!isCorrect) res.end("Wrong url!");
    return isCorrect;
}

//Nos conectamos a la BD
MongoClient.connect(DB_URI, function(err, database) {
    if (err) log.error("Error connecting to database with uri: " + DB_URI);
    else {
        log.info("Successfully connected to database");
        db = database;
    }
});

http.createServer(function(req, res) {
    
    //Funciones para comprobar que estamos conectados a la BD 
    //y que la url es valida
    if (!checkConnectedToDB(res)) return false;
    var parsedUrl = url.parse(req.url, true);
    if (!checkUrlPath(parsedUrl.pathname, res)) return false;

    //Peticiones HTTP
    var collection = db.collection('students');
    switch (req.method) {
        case 'POST': insertStudent(parsedUrl.query, collection, res); break;
        case 'GET': getStudent(parsedUrl.query, collection, res); break;
        default: res.end("Invalid method!");
    }

    return true;
}).listen(8080);
