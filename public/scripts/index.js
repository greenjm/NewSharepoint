$(document).ready(function() {
	
	var addEventListeners = function() {
		$("#button").on("click", function() {
			console.log("HELLO");
		});
	}

	addEventListeners();

});