$(function(){
    $("#header").load("./includedHTML/header.html"); 
});

$(document).ready(function() {

	$(document).on("click", "#header-logout", function() {
		console.log("clicked");
		$.ajax({
			url: '/logout',
			type: 'POST',
			success: function(data) {
				console.log("SUCCESS: " + data);
				window.location = "/login";
			},
			error: function(data) {
				console.log("ERROR: " + data);
			}
		});
	});
	
});