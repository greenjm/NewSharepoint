module.exports = function(app, api) {
	var dbStatusCode = null;

	api.connect(function(response) {
 		dbStatusCode = response;
 		if ( dbStatusCode === 0) {
     		// handle success
     		console.log("Connection to Aerospike cluster succeeded!");
 		}
 		else {
     		// handle failure
     		console.log("Connection to Aerospike cluster failed!");
 		}
	});

	app.get("/aerospike/testRoute", function(req, res) {
		api.readRecord('Hello', function(response) {
			if (dbStatusCode === 0) {
	            if ( response.status === 0) {
	                // handle success
	                console.log("SUCCESS");
	            }
	            else {
	                // handle failure
	                console.log("FAILURE");
	            }
	            res.send(response.message);
        	}
        }); 
	});
}