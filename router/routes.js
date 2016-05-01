module.exports = function(app) {
	var Firebase = require("firebase");
	var bodyParser = require("body-parser");
	var ref = new Firebase("https://newsharepoint.firebaseio.com/");

	var urlencodedParser = bodyParser.urlencoded({ extended: false });

	// GET
	app.get("/", function(req, res) {
		res.render("index.html");
	});

	app.get("/login", function(req, res) {
		res.render("login.html");
	});

	app.get("/user", function(req, res) {
		res.render("user.html");
	});

  	app.get("/add", function(req, res) {
    	res.render("addpost.html");
  	});

	app.get("/forum", function(req, res) {
		res.render("forum.html");
	});

	//POST
	app.post("/login/firebase", urlencodedParser, function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if (email == "" || password == "") {
			res.status(400).send("Either email or password is blank");
		}

		ref.authWithPassword(req.body, function(error, authData) {
			if (error) {
    			res.status(400).send(error);
  			} else {
    			res.status(200).send(authData);
  			}
		});
	});
}