var CURR_INDEX = 0;
var RUNAUTO;

var OLD_INDEX = CURR_INDEX;
showSlide();

function showSlide() {
	var slide = $(".slider");
	var listIndex = $(".list-index");

	if (CURR_INDEX >= slide.length) {
		CURR_INDEX = 0;
	}

	if (CURR_INDEX < 0) {
		CURR_INDEX = slide.length - 1;
	}

	/* OLD_INDEX */
	$(slide[OLD_INDEX]).css("display", "none");
	listIndex[OLD_INDEX].className = listIndex[OLD_INDEX].className.replace(" boder-index", "");
	
	/* CURR_INDEX */
	$(slide[CURR_INDEX]).css("display", "block");
	listIndex[CURR_INDEX].className += " boder-index";
	
	clearTimeout(RUNAUTO);
	RUNAUTO = setTimeout(function() {
		OLD_INDEX = CURR_INDEX++;
		showSlide();
	}, 2000);
}

$("#btn_pre").click(function() {
	OLD_INDEX = CURR_INDEX--;
	showSlide();
});

$("#btn_next").click(function() {
	OLD_INDEX = CURR_INDEX++;
	showSlide();
});

$(".list-index").click(function() {
	OLD_INDEX = CURR_INDEX;
	CURR_INDEX = $(".list-index").index(this);
	showSlide();
});