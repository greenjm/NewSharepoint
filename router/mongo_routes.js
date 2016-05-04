module.exports = function(app, io) {
	var http = require("http");

	var mongoose = require('mongoose');
	var cookieParser = require("cookie-parser");
	var Schema = mongoose.Schema;

	var bodyParser = require("body-parser");
	var urlencodedParser = bodyParser.urlencoded({ extended: false });

	//Lets connect to our database using the DB server URL.
	mongoose.connect('mongodb://137.112.40.131:27017/');

	http.createServer(function (request, response) {
	}).listen(8081);

	var PostSchema = new Schema({
		title: String,
		content: String,
		id: Number,
		more: String,
	});

	var Post = mongoose.model("Posts", PostSchema);

	//var blah = new Post({
	//	content: "Stuff"
	//})

	//blah.save();

	//io.sockets.on("connection", function(socket) {

	app.post("/mongo/addPost", urlencodedParser, function (req, res) {
		var newPost = new Post({
			title: req.body.title,
			content: req.body.content,
			id: 5,
			more: "Stuff"
		});
		newPost.save();
		io.sockets.emit("post added", newPost);
		res.send("Complete");
	});

	app.get("/mongo/getPosts", urlencodedParser, function(req, res) {
		Post.find().lean().exec(function (err, post) {
    		return res.end(JSON.stringify(post));
		});
	});

	//});
}