var CURR_INDEX = 0;
var RUNAUTO;

var OLD_INDEX = CURR_INDEX;
showSlide();

function showSlide() {
	var slide = document.getElementsByClassName("slide");
	var listIndex = document.getElementsByClassName("list-index");

	if (CURR_INDEX >= slide.length) {
		CURR_INDEX = 0;
	}

	if (CURR_INDEX < 0) {
		CURR_INDEX = slide.length - 1;
	}

	/* OLD_INDEX */
	slide[OLD_INDEX].style.display = "none";
	listIndex[OLD_INDEX].className = listIndex[OLD_INDEX].className.replace(" boder-index", "");
	
	/* CURR_INDEX */
	slide[CURR_INDEX].style.display = "block";
	listIndex[CURR_INDEX].className += " boder-index";
	
	clearTimeout(RUNAUTO);
	RUNAUTO = setTimeout(function() {
		OLD_INDEX = CURR_INDEX++;
		showSlide();
	}, 2000);
}

function preSlide() {
	OLD_INDEX = CURR_INDEX--;
	showSlide();
}

function nextSlide() {
	OLD_INDEX = CURR_INDEX++;
	showSlide();
}

function picChosse(iPic) {
	OLD_INDEX = CURR_INDEX;
	CURR_INDEX = iPic;
	showSlide();
}