module.exports = function(io) {
	io.sockets.on("connection", function(socket) {
		socket.on("post added", function(post) {
			io.sockets.emit("new post", post);
		});
	});
}