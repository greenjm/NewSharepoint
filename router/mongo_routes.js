module.exports = function(app) {
	var http = require("http");

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	//Lets connect to our database using the DB server URL.
	mongoose.connect('mongodb://137.112.40.131:27017/');

	http.createServer(function (request, response) {
	}).listen(8081);

	var PostSchema = new Schema({
		content: String
	});

	var Post = mongoose.model("Posts", PostSchema);

	var blah = new Post({
		content: "Stuff"
	})

	blah.save();

	app.get("/mongo/addPost", function(data) {
		//blah.save(function(err){});
		//Post.find({}, function(err, post) {
			console.log(data);
		//});
	});
}