$(document).ready(function() {
	$(".wrapper").customScrollbar();
	$(window).scroll(function() {
		var winheight = $("body").height();
		var height = $(window).scrollTop();
		// $("#nav-contact").text(height);
		if (height/winheight < 0.05) {
			$("#nav-home").removeClass("active");
		}
		else if (height/winheight < 0.4) {
			$("#nav-home").addClass("active");
			$("#nav-resume").removeClass("active");
		}
		else if(height/winheight < 0.64) {
			$("#nav-home").removeClass("active");
			$("#nav-resume").addClass("active");
			$("#nav-projects").removeClass("active");
			$("#nav-contact").removeClass("active");
		}
		else {
			$("#nav-resume").removeClass("active");
			$("#nav-projects").addClass("active");
			$("#nav-contact").addClass("active");
		}
	})
});