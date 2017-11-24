var RUNAUTO;
var CURR_INDEX = 0;
var OLD_INDEX = CURR_INDEX;

showSlides();

function showSlides() {
	var slide = $(".mySlides");
	var dots = $(".dot");

	if (CURR_INDEX >= slide.length) {
		CURR_INDEX = 0;
	}

	if (CURR_INDEX < 0) {
		CURR_INDEX = slide.length - 1;
	}

	/* OLD_INDEX */
	slide[OLD_INDEX].style.display = "none";
	dots[OLD_INDEX].className = dots[OLD_INDEX].className.replace(" active", "");
	
	/* CURR_INDEX */
	slide[CURR_INDEX].style.display = "block";
	dots[CURR_INDEX].className += " active";
	
	clearTimeout(RUNAUTO);
	RUNAUTO = setTimeout(function() {
		OLD_INDEX = CURR_INDEX++;
		showSlides();
	}, 2000);
}

$(".prev").click(function() {
	OLD_INDEX = CURR_INDEX--;
	showSlides();
});

$(".next").click(function() {
	OLD_INDEX = CURR_INDEX++;
	showSlides();
});

$(".dot").click(function() {
	OLD_INDEX = CURR_INDEX;
	CURR_INDEX = $(".dot").index(this);
	showSlides();
});