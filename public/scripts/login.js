$(document).ready(function() {
	
	var tryLogin = function() {
		var email = $("#email").val();
		var password = $("#pass").val();
		console.log("email: " + email + ". password: " + password);

		var data = {
			email: email,
			password: password
		};

		console.log("data: " + data.email);

		$.ajax({
			url: "/login/firebase",
			type: "POST",
			data: data,
			success: function(data) {
				console.log("SUCCESS: " + data);
				window.location = "/forum";
			},
			error: function(data) {
				console.log("ERROR: " + data);
			}
		})
	}

	$("#sign-in").on("click", function() {
		console.log("CLICKED");
		tryLogin();
	});

});