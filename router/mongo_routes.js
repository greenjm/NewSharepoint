module.exports = function(app) {
	var http = require("http");

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var bodyParser = require("body-parser");
	var urlencodedParser = bodyParser.urlencoded({ extended: false });

	//Lets connect to our database using the DB server URL.
	mongoose.connect('mongodb://137.112.40.131:27017/');

	http.createServer(function (request, response) {
	}).listen(8081);

	var PostSchema = new Schema({
		title: String,
		content: String
	});

	var Post = mongoose.model("Posts", PostSchema);

	//var blah = new Post({
	//	content: "Stuff"
	//})

	//blah.save();

	app.post("/mongo/addPost", urlencodedParser, function(req, res) {
		//blah.save(function(err){});
		//Post.find({}, function(err, post) {
			console.log(req.body.title);
			console.log(req.body.content);
		var newPost = new Post({
			title: req.body.title,
			content: req.body.content,
		});
		newPost.save();
	});

	app.get("/mongo/getPosts", urlencodedParser, function(req, res) {
		Post.find().lean().exec(function (err, post) {
    		return res.end(JSON.stringify(post));
		});
	});
}