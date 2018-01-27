// require app, mongoose
var app = require('./server/server.js');
var mongoose = require('mongoose');

// set mongoURI
var mongoURI = 'mongodb://localhost/houseworks';

// connect db
mongoose.connect(mongoURI);

// set port
var port = process.env.PORT || 27017;

// listen on port
app.listen(port);

console.log("Server is listening on port " + port);