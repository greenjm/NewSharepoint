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

	$.ajax({
		url: "/neo4j/getPrefs",
		type: "GET",
		success: function(tags) {
			$("input[type='checkbox']").each(function(i, el) {
				$(el).prop("checked", false);
			});
			for (var i = 0; i < tags.length; i++) {
				var tag = tags[i];
				$("input[type='checkbox']").each(function(i, el) {
					if (el.value === tag["type"]) {
						$(el).prop("checked", true);						
					}
				});
			}
		},
		error: function(data) {
			console.log(data);
		}
	});

	var addEventListeners = function() {
		$("#savePrefs").on("click", function() {
			var tags = [];
			$("input[type='checkbox']:checked").each(function(i, el) {
				tags.push(el.value);
			});
			var data = {
				tags: JSON.stringify(tags)
			};
			$.ajax({
				url: "/neo4j/setPrefs",
				type: "POST",
				data: data,
				success: function(data) {
					alert(data);
				},
				error: function(data) {
					console.log(data);
				}
			});
		});
	}

	addEventListeners();
});