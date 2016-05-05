$(document).ready(function() {

	var socket = io();

    tinymce.init({
    	selector: '#mytextarea'
    });
	

	var $title = $('#postTitle');
	var $contents = $("#mytextarea");



	var addEventListeners = function() {
    var ptag_value = function() {
        var oRadio = document.getElementsByName('postTag');
 
        for(var i = 0; i < oRadio.length; i++) {
          if(oRadio[i].checked) {
            return oRadio[i].value;
            }
        }
 
      return '';
      };
		$("#submitPost").on("click", function() {
			var tempContents = tinymce.activeEditor.getContent();
			var post = {
				title: $title.val(),
				content: tempContents,
        tag: ptag_value
			};
			
			if (tempContents != "" || post.title != "") {
				$.ajax({
					url: '/mongo/addPost',
					type: 'POST',
					data: post,
					success: function(data) {
						console.log("Success!");
						socket.emit("post added", post);
						window.location = "/forum";
					},
					error: function(data) {
						console.log("Error");
					}
				});
        $.ajax({
          url: '/aerospike/addPostFilter',
          type: 'POST',
          data: post});
			} else{
				alert("There are Empty Fields!")
			}
		});
	}

	addEventListeners();

});

function getRadioVal(form) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.getElementsByName('postTag');
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}
