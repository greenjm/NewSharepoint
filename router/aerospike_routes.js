module.exports = function(app) {
	var aerospike = require("aerospike");

	var client = aerospike.client({
	  hosts: [
	      { addr: "137.112.40.132", port: 3000 }
	  ],
	  log: {
	      level: aerospike.log.INFO
	  }
	});

	client.connect(function (response) {
	    if ( response.code === 0) {
	        // handle success
	        console.log("\nConnection to Aerospike cluster succeeded!\n");
	    }
	    else {
	        // handle failure
	        console.log("\nConnection to Aerospike cluster failed!\n");
	        console.log(response);
	    }
	});

	app.post("/aerospike/addPostFilter", function(req, res) {
		
	});

	app.get("/aerospike/testRoute", function(req, res) {
		var uid = 0;
		var key = aerospike.key("test", "demo", uid);

		// Record to be written to the database
		var rec = { 
			uid:    1000,
			name:   "user_name",
			dob:    { mm: 12, dd: 29, yy: 1995}, 
			friends: [1001, 1002, 1003],
			avatar: new Buffer([0xa, 0xb, 0xc])
		};

		client.put(key, rec, function(err) {
			// Check for err.code in the callback function.
			// AEROSPIKE_OK signifies the success of put operation.
			if ( err.code !== aerospike.status.AEROSPIKE_OK ) {
				console.log("error: %s", err.message);
			} else {
				console.log("PUT WORKED: " + aerospike.status);
			}
		});

		client.get(key, function(err, record, metadata, key) {
			switch (err.code) {
	        case aerospike.status.AEROSPIKE_OK:
	            console.log("OK - ", key, metadata, record);
	            res.status(200).send(record);
	            break;
	        case aerospike.status.AEROSPIKE_ERR_RECORD_NOT_FOUND:
	        	res.status(200).send(record);
	            console.log("NOT_FOUND - ", key);
	            break;
	        default:
	            console.log("ERR - ", err, key);
			}
			client.close();
		});
	});
}