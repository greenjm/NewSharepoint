$(document).ready(function() {

	var templatePost = function(post) {
		return "<div class='mix color-1 check1 radio2 option3'>\
          <p>Title: " + post.title + "</p>\
          <p>User:</p>\
          <p>Body: " + post.content + "</p>\
          <p>Date Posted: 1 May 2016</p>\
          <p>Tag:</p>\
        </div>";
	}

	var addPosts = function(posts) {
		for (var i = 0; i < posts.length; i++) {
			var post = posts[i];
			var html = templatePost(post);
			console.log(html);
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

});