var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
var http = require("http");
var io = require("socket.io");

//require("./router/routes")(app);
app.use(cookieParser());
require("./router/aerospike_routes")(app);
require("./router/routes")(app);
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

var server = http.Server(app);
server.listen(5000, function() {
	console.log("Now listening on port 5000. Visit 'localhost:5000' in a browser to view the site.");
});

var listener = io.listen(server);
require("./router/socketio")(listener);
require("./router/mongo_routes")(app, listener);