$(document).ready(function() {

	var addEventListeners = function() {
		$.ajax({
				url: '/mongo/getPosts',
				type: 'GET',
				success: function(data) {
					console.log("Success!");
				},
				error: function(data) {
					console.log("Error");
				}
		});
	}

	addEventListeners();

});