module.exports = function(io) {
	io.sockets.on("connection", function(socket) {
		/**socket.on("post added", function(post) {
			console.log("post.user: " + post.user);
			console.log("post['user']: " + post['user']);
			console.log("post.title: " + post.title);
			io.sockets.emit("new post", post);
		});**/
	});
}