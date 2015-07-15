
this.imagePreview = function(){	
		xOffset = 10;
		yOffset = 30;

		$("a.preview").click(function(e){

		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t + "</br>" : "";
		$("body").prepend("<p id='preview'><img src='"+ this.href +"' alt='Image preview' />"+ c +"</p>");								 
		$("#preview")
			.css("top",(e.pageY- xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");
			this.title = this.t;		

    });
		document.onkeydown = keyevent; 
		function keyevent(){ 
			if(event.keyCode==27) {	
				while($("#preview").length > 0)
					$("#preview").remove();
			}
		
		};
	
		
};


// starting the script on page load
$(document).ready(function(){
		imagePreview();
});
//
