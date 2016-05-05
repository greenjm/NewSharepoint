$(document).ready(function() {

	var initSocketIO = function() {
		var socket = io();

		socket.on("post added", function(post) {
			var html = templatePost(post);
			$(".cd-gallery ul").mixItUp("prepend", $(html));
		});
	}

	var templatePost = function(post) {
		return "<div class='mix " + post.ptag + "' data-id='" + post.id + "'>\
          <p>Title: " + post.title + "</p>\
          <p>User: " + post.user + "</p>\
          <p>Body: " + post.content + "</p>\
          <p>Date Posted: 1 May 2016</p>\
        </div>";
	}

	var addPosts = function(posts) {
		for (var i = 0; i < posts.length; i++) {
			var post = posts[i];
			var html = templatePost(post);
			console.log("html: " + html);
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