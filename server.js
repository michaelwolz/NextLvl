const express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    config = require('./config');

const app = express();
const port = process.env.Port || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set ('view engine', 'handlebars');

app.disable('etag');

mongoose.connect('mongodb://localhost/react-tweets');

// Index Route
app.get('/', routes.index);

// Page Route
app.get('/page/:page/:skip', routes.page);

app.use("/", express.static(__dirname + "/public/"));

const server = http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});