var express = require("express");
var http = require("http");
var asApi = require("./as_api");
var app = express();

require("./router/routes")(app);
require("./router/aerospike_routes")(app, asApi);
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

var server = http.Server(app);
server.listen(5000, function() {
	console.log("Now listening on port 5000. Visit 'localhost:5000' in a browser to view the site.");
});