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
		user: String,
		tag: String
	});

	var Post = mongoose.model("Posts", PostSchema);

	//var blah = new Post({
	//	content: "Stuff"
	//})

	//blah.save();

	app.post("/mongo/addPost", urlencodedParser, function(req, res) {
		//blah.save(function(err){});
		//Post.find({}, function(err, post) {
		//	console.log(req.body.title);
		//	console.log(req.body.content);
		//	console.log(req.body.tag);
		var newPost = new Post({
			title: req.body.title,
			content: req.body.content,
			user: req.cookies.currentUser,
			tag: req.body.tag
		});
		newPost.save(function (err, post) {
			io.sockets.emit("post added", newPost);
			res.send("Complete");
		});
	});

	app.get("/mongo/getPosts", urlencodedParser, function(req, res) {
		Post.find().lean().exec(function (err, post) {
    		return res.end(JSON.stringify(post));
		});
	});

	//});
}