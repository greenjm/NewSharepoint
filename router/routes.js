module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render("index.html");
	});

	app.get("/login", function(req, res) {
		res.render("login.html");
	});

	app.get("/user", function(req, res) {
		res.render("user.html");
	});

	app.get("/forum", function(req, res) {
		res.render("forum.html");
	});
}