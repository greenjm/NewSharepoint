$(document).ready(function() {

	$("#right-panel").hide();

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
    			alert("bad values");
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
    				conversationFound = true;
    			}
    		});
    		if (!conversationFound) {
    			populateConversations();
    		}
    	});
    }

    var populateMessages = function(username) {
    	$.ajax({
    		url: '/mongo/getMsgs?username=' + username,
    		type: 'GET',
    		dataType: 'json',
    		success: function(messages) {
    			for (var i = 0; i < messages.length; i++) {
    				var message = messages[i];
    				var html = templateMessage(message);
    				$("#message-list").prepend(html);
    			}
    		},
    		error: function(data) {
    			console.log("ERROR: " + data);
    		}
    	});
    }

    var populateConversations = function() {
    	$("#user-conversations-list li").remove();
    	$.ajax({
    		url: '/neo4j/getConversations',
    		type: 'GET',
    		dataType: 'json',
    		success: function(conversations) {
    			for (var i = 0; i < conversations.length; i++) {
    				var conversation = conversations[i];
    				var html = templateConversation(conversation);
    				$("#user-conversations-list").append(html);
    			}
    		},
    		error: function(data) {
    			console.log("ERROR: " + data);
    		}
    	})
    }

    var templateMessage = function(msg) {
    	return "<li class='list-group-item'>\
        			<h4 class='message-sender-name'>From: " + msg.sender + "</h4>\
        			<p>" + msg.content + "</p>\
        			<p><small>Received: " + moment(msg.timestamp).format("MM/DD/YYYY") + "</small></p>\
      			</li>";
    }

    var templateConversation = function(conversation) {
    	return "<li class='list-group-item user-conversations-list-item'>\
    				<h4 class='user-conversations-name'>" + conversation["r.username"] + "</h4>\
    				<p><small>Last message: <span class='user-conversation-last-date'>" + moment(conversation["t.date"]).format("MM/DD/YYYY") + "</span></small></p></li>";
    }

    var updateConversationInfo = function(el, msg) {
    	$(el).find(".user-conversations-last-date").html(moment(msg.timestamp).format("MM/DD/YYYY"));
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
    			$("#message-cancel-button").trigger("click");
    		},
    		error: function(data) {
    			alert("ERROR: message not sent");
    		}
    	});
    	
    }

    initSocketIO();
    addEventListeners();
    populateConversations();

});