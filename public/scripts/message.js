$(document).ready(function() {

	$("#right-panel").hide();
	console.log("currentUser: " + $.cookie("currentUser"));

	//tinymce.init({
    //	selector: '#message-reply'
    //});

    tinymce.init({
    	selector: '#message-new'
    });

    var addEventListeners = function() {
    	$("#user-conversations-list").on("click", ".user-conversations-list-item", function() {
    		var username = $(this).find(".user-conversations-name").html();
    		$("#message-header").html(username);
    		$("#message-list").html("");
    		$("#right-panel").show();
    		populateMessages(username);
    	});

    	$("#message-reply-button").on("click", function() {
    		var to = $(this).closest("#right-panel").find("#message-header").html();
    		tinymce.activeEditor.setContent("");
    		$("#message-to").val(to);
    	});

    	$("#message-send-button").on("click", function() {
    		var receiver = $("#message-to").val();
    		var content = tinymce.activeEditor.getContent();
    		if (receiver === "" || content === "") {
    			console.log("bad values");
    			return;
    		}
    		sendMessage(receiver, content);
    	});

    	$("#new-message-button").on("click", function() {
    		$("#message-to").val("");
    		tinymce.activeEditor.setContent("");
    	});
    }

    var initSocketIO = function() {
    	var socket = io();

    	socket.on("msg sent", function(msg) {
    		console.log("SOCKET IO");
    		if (msg.sender !== $.cookie("currentUser") && msg.receiver !== $.cookie("currentUser")) {
    			return;
    		}

    		if ($("#message-header").html() === msg.sender || $("#message-header").html() === msg.receiver) {
    			var html = templateMessage(msg);
    			$("#message-list").prepend(html)
    		}
    		var conversationFound = false;
    		$(".user-conversations-list-item").each(function(i, el) {
    			if ($(el).find(".user-conversations-name").html() === msg.sender || $(el).find(".user-conversations-name").html() === msg.receiver) {
    				updateConversationInfo(el, msg);
    			}
    		});
    	});
    }

    var populateMessages = function(username) {
    	console.log("TODO. username: " + username);
    }

    var populateConversations = function() {
    	console.log("TODO");
    }

    var templateMessage = function(msg) {
    	return "<li class='list-group-item'>\
        			<h4 class='message-sender-name'>" + msg.sender + "</h4>\
        			<p>" + msg.content + "</p>\
        			<p><small>Received: " + moment(msg.date).format("MM/DD/YYYY") + "</small></p>\
      			</li>";
    }

    var templateConversation = function(user) {
    	return "<li class='list-group-item user-conversations-list-item'>\
    				<h4 class='user-conversations-name'>" + user.name + "</h4>\
    				<p><small>Last message: <span class='user-conversation-last-date'>5/12/2016</span></small></p></li>";
    }

    var updateConversationInfo = function(el, msg) {
    	$(el).find(".user-conversations-last-date").html(moment(msg.date).format("MM/DD/YYYY"));
    }

    var sendMessage = function(receiver, content) {
    	var data = {
    		usr: receiver,
    		content: content
    	};

    	$.ajax({
    		url: '/mongo/addMsg',
    		type: 'POST',
    		data: data,
    		success: function(data) {
    			console.log("SUCCESS: " + data);
    			$("#message-cancel-button").trigger("click");
    		},
    		error: function(data) {
    			console.log("ERROR: " + data);
    		}
    	});
    	
    }

    initSocketIO();
    addEventListeners();
    populateConversations();

});