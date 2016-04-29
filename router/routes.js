module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render("index.html");
	});
	app.get("/user", function(req, res) {
		res.render("user.html");
	});
}