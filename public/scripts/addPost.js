$(document).ready(function() {

      tinymce.init({
      selector: '#mytextarea'
      });
	

	var $title = $('#postTitle');
	var $contents = $("#mytextarea");

	var addEventListeners = function() {
		$("#submitPost").on("click", function() {
			console.log("STUFF" + tinymce.activeEditor.getContent());
			var tempContents = tinymce.activeEditor.getContent();
			var post = {
				title: $title.val(),
				content: tempContents
			};

			if (tempContents != "" || post.title != "") {
				$.ajax({
					url: '/mongo/addPost',
					type: 'POST',
					data: post,
					success: function(data) {
						console.log("Success!");
						window.location = "/forum";
					},
					error: function(data) {
						console.log("Error");
					}
				});
			} else{
				alert("There are Empty Fields!")
			}
		});
	}

	addEventListeners();

});