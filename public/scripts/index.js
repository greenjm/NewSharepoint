$(document).ready(function() {
	
	var addEventListeners = function() {
		$("#button").on("click", function() {
			console.log("Trying aerospike request");
			$.ajax({
				url: '/aerospike/testRoute',
				type: 'GET',
				success: function(data) {
					console.log("Success! Data is: " + data["name"]);
				},
				error: function(data) {
					console.log("Error! Data is: " + data);
				}
			});
			
		});
	}

	addEventListeners();

});