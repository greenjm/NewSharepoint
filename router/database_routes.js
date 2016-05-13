module.exports = function(app, io) {

	var aerospike = require("aerospike");
	var client = aerospike.client({
	  hosts: [
	      { addr: "137.112.40.132", port: 3000 }
	  ],
	  log: {
	      level: aerospike.log.INFO
	  }
	});

	client.connect(function (response) {
	    if ( response.code === 0) {
	        // handle success
	        console.log("\nConnection to Aerospike cluster succeeded!\n");
	    }
	    else {
	        // handle failure
	        console.log("\nConnection to Aerospike cluster failed!\n");
	        console.log(response);
	    }
	});


	var http = require("http");

	var mongoose = require('mongoose');
	var cookieParser = require("cookie-parser");
	var Schema = mongoose.Schema;

	var bodyParser = require("body-parser");
	var urlencodedParser = bodyParser.urlencoded({ extended: false });

	// var neo = require('neo4j');
	// var db = new neo4j.GraphDatabase('http://username:password@137.112.104.134:7473');



	//Lets connect to our database using the DB server URL.
	mongoose.connect('mongodb://137.112.40.131:27017/');

	http.createServer(function (request, response) {
	}).listen(8081);

	var PostSchema = new Schema({
		title: String,
		content: String,
		user: String,
		date: Date
	});

	var MsgSchema = new Schema({
		content: String,
		sender: String,
		receiver: String,
		timestamp: Date
	});

	var Post = mongoose.model("Posts", PostSchema);
	var Msg = mongoose.model("Msgs", MsgSchema);
	//var blah = new Post({
	//	content: "Stuff"
	//})

	//blah.save();
	app.get("/mongo/getMsgs", urlencodedParser, function(req, res) {
		Msg.find({"$or": [{"$and":[{sender:req.cookies.currentUser},{receiver:req.body.usr}]},{"$and":[{sender:req.body.usr},{receiver:req.cookies.currentUser}]}]}).exec(function(err,msgs) {
			var result = [];
			for (var i = 0; i < msgs.length; i++) {
				var data = {
					mid: msgs[i]._id,
					content: msgs[i].content,
					sender: msgs[i].sender,
					receiver: msgs[i].receiver,
					timestamp: msgs[i].timestamp
				}
				result.push(data);
			}
			res.send(result);
		})
	});

	app.post("/mongo/addMsg", urlencodedParser, function(req,res) {
		var newMessage = new Msg({
			content: req.body.content,
			sender: req.cookies.currentUser,
			receiver: req.body.usr,
			date: new Date()
		});
		
		newMessage.save(function(err, msg) {
			var returnMsg = new Msg({
				content: msg.content,
				sender: msg.sender,
				receiver: msg.receiver,
				date: msg.date
			});

			io.sockets.emit("msg sent", returnMsg);
			res.send("You got mail");
		});
	});
	
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
			date: new Date()
		});
		


		newPost.save(function (err, post) {
			var returnPost = new Post({
				pid: post.id,
				title: req.body.title,
				content: req.body.content,
				user: req.cookies.currentUser,
				ptag: req.body.tag
			});

			var uid = post.id;
			var key = aerospike.key("test", "demo", uid);

			// Record to be written to the database
			var rec = { 
				uid:    post.id,
				ptag:   req.body.tag
			};

			client.put(key, rec, function(err) {
				// Check for err.code in the callback function.
				// AEROSPIKE_OK signifies the success of put operation.
				if ( err.code !== aerospike.status.AEROSPIKE_OK ) {
					console.log("error: %s", err.message);
				} else {
					console.log("PUT WORKED: " + aerospike.status);
					io.sockets.emit("post added", returnPost);
					res.send("Complete");
				}
			});

			// get id of post
			//get tag of post
			//put into correct filter table
		});
	});

	var addTagAndPush = function(result, post, posts, res) {
		var key = aerospike.key("test", "demo", "" + post._id);
		client.get(key, function(err, record, metadata, key) {
			var data = {
				id: post._id,
				title: post.title,
				content: post.content,
				user: post.user,
				ptag: record.ptag
			}
			switch (err.code) {
	        case aerospike.status.AEROSPIKE_OK:
	            result.push(data);
	            if (result.length == posts.length) {
	            	res.send(result);
	            }
	            break;
	        default:
	            console.log("ERR - ", err, key);
	            break;
			}
		});
	}

	app.get("/mongo/getPosts", urlencodedParser, function(req, res) {
		Post.find().lean().exec(function (err, posts) {
			var result = [];

			for (var i = 0; i < posts.length; i++) {
				//console.log("data: " + data.title);
				var post = posts[i];
				addTagAndPush(result, post, posts, res);
			}
		});
	});

	//});
}
