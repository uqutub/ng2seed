///<reference path="./../typings/tsd.d.ts" />

import express = require("express");
import http = require("http");
import path = require("path");
import bodyParser = require("body-parser");
import socket = require("socket.io");

// if use mongoose
// import mongoose = require('mongoose'); 					
// mongoose.connect('mongodb://localhost:27017/dbName');	

let port: number = process.env.PORT || 4000;

//Server Creation
let app: express.Express = express();
let server: http.Server = http.createServer(app);
let io: SocketIO.Server = socket(server);

server.listen(port, ()=>{
    console.log('listening on http://localhost:'+port);
});

// res.header("Access-Control-Allow-Origin", "*");
// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

// logger middle ware
app.use((req, res, next) => {
    console.log("Logging: " + req.method.toString() + ": " + req.url.toString());
    next();
});

// Middlewaress
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./../../client/build")));

// set vairiables in Express
app.set("port", port);
app.set("env", "development");
app.set("address", "localhost");

// Handle Routes after some middlewares
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../../client/build/index.html"));
});

app.get("/api/test", (req, res) => {
    res.json({success: true, data: "Hello World"});
});


// For Socket creating array of Fruits
let fruits = ['Apple', 'Banana'];

io.sockets.on("connection", function (socket) {

    socket.emit("message", { message: "you are using socket.io" });
    
    socket.on('addFruit', (data) => {
        io.sockets.emit('addedFruit', data);
        //fruits.push(data);
    });
    
    socket.on('getFruits', () => {
        io.sockets.emit('getAllFruits', fruits);
    });

});
