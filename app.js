var express = require("express");
var http = require("http");
var cookieParser = require("cookie-parser");
var app = express();

//require("./router/routes")(app);
app.use(cookieParser());
require("./router/aerospike_routes")(app);
require("./router/mongo_routes")(app);
require("./router/routes")(app);
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

var server = http.Server(app);
server.listen(5000, function() {
	console.log("Now listening on port 5000. Visit 'localhost:5000' in a browser to view the site.");
});