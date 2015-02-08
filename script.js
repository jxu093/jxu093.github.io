$(document).ready(function() {
	$(window).scroll(function() {
		var p1 = $("#resume").offset().top*0.95;
		var p2 = $("#projects").offset().top*0.95;
		var p3 = $("#contact").offset().top*0.9;
		var height = $(window).scrollTop();
		// $("#nav-contact").text(height);
		if (height < p1) {
			$("#nav-home").addClass("active");
			$("#nav-resume").removeClass("active");
			$("#nav-projects").removeClass("active");
			$("#nav-contact").removeClass("active");
		}
		else if(height < p2) {
			$("#nav-home").removeClass("active");
			$("#nav-resume").addClass("active");
			$("#nav-projects").removeClass("active");
			$("#nav-contact").removeClass("active");
		}
		else if(height < p3) {
			$("#nav-home").removeClass("active");
			$("#nav-resume").removeClass("active");
			$("#nav-projects").addClass("active");
			$("#nav-contact").removeClass("active");
		}
		else {
			$("#nav-home").removeClass("active");
			$("#nav-resume").removeClass("active");
			$("#nav-projects").removeClass("active");
			$("#nav-contact").addClass("active");
		}
	})
});