$(document).ready(function() {
	
	var $title = $('#postTitle');
	var $contents = $("#mytextarea");

	var addEventListeners = function() {
		$("#submitPost").on("click", function() {
			var post = {
				title: $title.val(),
				contents: $contents.val()
			};

			$.ajax({
				url: '/mongo/addPost',
				type: 'POST',
				data: post,
				success: function(data) {
					console.log("Success!"]);
				},
				error: function(data) {
					console.log("Error");
				}
			});
			
		});
	}

	addEventListeners();

});