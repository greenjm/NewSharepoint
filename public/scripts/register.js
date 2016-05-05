$(document).ready(function() {
	
	var tryRegister = function() {
		var email = $("#email").val();
		var password = $("#pass").val();
		var confirm = $("#confirm-pass").val();

		var data = {
			email: email,
			password: password,
			confirm: confirm
		};

		$.ajax({
			url: "/register/firebase",
			type: "POST",
			data: data,
			success: function(data) {
				console.log("SUCCESS: " + data);
				window.location = "/login";
			},
			error: function(data) {
				console.log("ERROR: " + data);
			}
		})
	}

	$("#sign-up").on("click", function() {
		tryRegister();
	});

});