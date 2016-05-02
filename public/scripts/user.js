$(document).ready(function() {
	$.ajax({
		url: "/currentUser",
		type: "GET",
		success: function(data) {
			$("#user-email").html(data);
		},
		error: function(data) {
			console.log("ERROR: " + data);
		}
	});
});