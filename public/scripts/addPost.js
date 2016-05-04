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

			if (checkFields()) {
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
			}
		});
	}

	var checkFields = function() {
		var postTitleField = document.forms["addPostForm"]["postTitleName"].value;
    	var postContentField = document.forms["addPostForm"]["postContentName"].value;
    	console.log(postTitleField);
    	console.log(postContentField);

    	if (postContentField == "" || postTitleField == "") {
    		alert("There are Empty Fields!")
    		return false;
    	}
    	return true;
	}

	addEventListeners();

});