module.exports = function(app) {
	var Firebase = require("firebase");
	var bodyParser = require("body-parser");
	var cookieParser = require("cookie-parser");
	var ref = new Firebase("https://newsharepoint.firebaseio.com/");

	var urlencodedParser = bodyParser.urlencoded({ extended: false });

	// GET
	app.get("/", function(req, res) {
		if (req.cookies.currentUser === undefined) {
			res.redirect("/login");
		} else {
			res.render("forum.html");
		}
	});

	app.get("/login", function(req, res) {
		res.render("login.html");
	});

	app.get("/user", function(req, res) {
		if (req.cookies.currentUser === undefined) {
			res.redirect("/login");
		} else {
			res.render("user.html");
		}
	});

  	app.get("/add", function(req, res) {
    	if (req.cookies.currentUser === undefined) {
			res.redirect("/login");
		} else {
			res.render("addpost.html");
		}
  	});

	app.get("/forum", function(req, res) {
		if (req.cookies.currentUser === undefined) {
			res.redirect("/login");
		} else {
			res.render("forum.html");
		}
	});

	app.get("/message", function(req, res) {
		if (req.cookies.currentUser === undefined) {
			res.redirect("/login");
		} else {
			res.render("message.html");
		}
	});

	app.get("/currentUser", function(req, res) {
		if (req.cookies.currentUser === undefined) {
			res.redirect("/login");
		} else {
			res.send(req.cookies.currentUser);
		}
	});

	app.get("/register", function(req, res) {
		res.render("register.html");
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
  				res.cookie("currentUser", authData.password.email).send("set current user");
  			}
		});
	});

	app.post("/register/firebase", urlencodedParser, function(req, res) {
		var email = req.body.email;
		var password = req.body.password;
		var confirm = req.body.confirm;

		if (email == "" || password == "" || password != confirm) {
			res.status(400).send("Either email or password is blank");
		}

		ref.createUser({"email": email, "password": password}, function(error, userData) {
			if (error) {
				console.log("error: " + error);
				res.status(400).send(error);
			} else {
				res.status(200).send("Created user");
			}
		});
	});

	app.post("/logout", function(req, res) {
		if (req.cookies.currentUser === undefined) {
			res.status(400).send("not logged in");
		} else {
			res.clearCookie("currentUser");
			res.status(200).send("Successfully logged out");
		}
	});
}