var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//api route to forwared requests receiving to '/api/*'
const auth = require('./routes/auth');
app.use('/auth', auth.router);

//api route to forwared requests receiving to '/api/*'
const api = require('./routes/api');
app.use('/api',auth.verifyToken, api);

//defining the host and port
const host = '127.0.0.1' || process.env.host;
const port = 8081 || process.env.port;

// index route '/'
app.get('/', (req, res) => {
    res.send(`Server is running on: ${host} : ${port}`);
});

//start the server
app.listen(port, host, () => {
    console.log("Server is running on:", host, port);
});