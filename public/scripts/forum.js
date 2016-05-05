$(document).ready(function() {

	var initSocketIO = function() {
		var socket = io();

		socket.on("new post", function(post) {
			var html = templatePost(post);
			console.log("post: " + post.title);
			console.log("html: " + html);
			$(".cd-gallery ul").mixItUp("prepend", $(html));
		});

		socket.on("post added", function(post) {
			var html = templatePost(post);
			$(".cd-gallery ul").mixItUp("prepend", $(html));
		});
	}

	var templatePost = function(post) {
		return "<div class='mix color-1 check1 radio2 option3'>\
          <p>Title: " + post.title + "</p>\
          <p>User: " + post.user + "</p>\
          <p>Body: " + post.content + "</p>\
          <p>Date Posted: 1 May 2016</p>\
          <p>Tag: " + post.tag + "</p>\
        </div>";
	}

	var addPosts = function(posts) {
		for (var i = 0; i < posts.length; i++) {
			var post = posts[i];
			var html = templatePost(post);
			$(".cd-gallery ul").mixItUp("append", $(html));
		}
	}

	var addEventListeners = function() {
		$.ajax({
				url: '/mongo/getPosts',
				type: 'GET',
				dataType: "json",
				success: function(data) {
					addPosts(data);
				},
				error: function(data) {
					console.log("Error");
				}
		});
	}

	addEventListeners();
	initSocketIO();

});