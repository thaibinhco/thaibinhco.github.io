var RUNAUTO;
var CURR_INDEX = 0;
var OLD_INDEX = CURR_INDEX;

showSlides();

function showSlides() {
	var slide = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");

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

function prev() {
	OLD_INDEX = CURR_INDEX--;
	showSlides();
}

function next() {
	OLD_INDEX = CURR_INDEX++;
	showSlides();
}

function chossePic(iPic) {
	OLD_INDEX = CURR_INDEX;
	CURR_INDEX = iPic;
	showSlides();
}