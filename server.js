//REQUIREMENTS
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    config = require('./config');


//INIT
const port = process.env.Port || 8080;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/nextlvl');

//ROUTER
app.use('/api', routes);


//START SERVER
app.listen(port);
console.log('Server running on port: ' + port);