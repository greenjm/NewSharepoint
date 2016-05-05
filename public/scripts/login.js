$(document).ready(function() {
	
	var tryLogin = function() {
		var email = $("#email").val();
		var password = $("#pass").val();

		var data = {
			email: email,
			password: password
		};

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
		tryLogin();
	});

	$("#register").on("click", function() {
		window.location = "/register";
	})

});