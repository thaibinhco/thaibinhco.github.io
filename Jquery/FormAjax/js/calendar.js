const MINCELL = 21;			// after cell Sat
const MAXCELL = MINCELL + 7 * 6;

var DATE = new Date();
var TODAY = DATE.getDate();
var CURR_MONTH = DATE.getMonth() + 1;
var CURR_YEAR = DATE.getFullYear();
var SHOW = false;

var OLD_CELL_CHOSSE = null;

init();

function init() {
	for (var i = 1980; i <= 2099; i++) {
		$("#year").append("<option value='" + i + "'>" + i + "</option>");
	}
	
	getCalendar(CURR_YEAR, CURR_MONTH);
	
	pickDate();
	$("#table_calendar").css("display", "none");
}

function getPicker(year, month, day) {
	$("#birthday").val(year + "/" + month + "/" + day);
}

function getCalendar(year, month) {
	getMonthYear(year, month);
	getDay(year, month);
}

function getMonthYear(year, month) {
	$("#month").val(month);
	$("#year").val(year);
}

function getDay(year, month) {
	var sDate = new Date(year, month - 1, 1).getDay();
	var dateOfMonth = new Date(year, month, 0).getDate();
	var cellBegin = MINCELL + sDate;
	var cellEnd = cellBegin + dateOfMonth;

	/* clear cells before position list day of calendar */
	for (var i = MINCELL; i < cellBegin; i++) {
		clearCell($("td:eq(" + i + ")"));
	}
	
	/* get list day of calendar */
	var day = 1;
	for (var i = cellBegin; i <= cellEnd; i++) {
		$("td:eq(" + i + ")").html(day++);
		$("td:eq(" + i + ")").css("backgroundColor", "#23fc3c");
		$("td:eq(" + i + ")").css("border", "none");
	}
	
	/* clear cells after position list day of calendar */
	for (var i = cellEnd; i < MAXCELL; i++) {
		clearCell($("td:eq(" + i + ")"));
	}
	
	/* get today of calendar */
	if (year === DATE.getFullYear() && month === (DATE.getMonth() + 1)) {
		var currDate = cellBegin - 1 + TODAY;
		$("td:eq(" + currDate + ")").css("backgroundColor", "#00fcfc");
	}
}

/* set cell empty */
function clearCell(cell) {
	cell.html("");
	cell.css("backgroundColor", "#eda957");
	cell.css("border", "none");
}

$(".preYear").click(function() {
	CURR_YEAR--;
	checkYear();
	getCalendar(CURR_YEAR, CURR_MONTH);
});

$(".nextYear").click(function() {
	CURR_YEAR++;
	checkYear();
	getCalendar(CURR_YEAR, CURR_MONTH);
});

$(".preMonth").click(function() {
	CURR_MONTH--;
	if (CURR_MONTH < 1) {
		CURR_MONTH = 12;
		CURR_YEAR--;
		checkYear();
	}
	getCalendar(CURR_YEAR, CURR_MONTH);
});

$(".nextMonth").click(function() {
	CURR_MONTH++;
	if (CURR_MONTH > 12) {
		CURR_MONTH = 1;
		CURR_YEAR++;
		checkYear();
	}
	getCalendar(CURR_YEAR, CURR_MONTH);
});

function checkYear() {
	if (CURR_YEAR > 2099) {
		CURR_YEAR = 2099;
		alert("Year cannot be greater than 2099!");
	} else if (CURR_YEAR < 1980) {
		CURR_YEAR = 1980;
		alert("Year cannot be less than 1980!");
	}
}

$("#month").click(function() {
	CURR_MONTH = parseInt($("#month").val());
	getCalendar(CURR_YEAR, CURR_MONTH);
});

$("#year").click(function() {
	CURR_YEAR = parseInt($("#year").val());
	getCalendar(CURR_YEAR, CURR_MONTH);
});

function pickDate() {
	for (var i = MINCELL; i < MAXCELL; i++) {
		$("td:eq(" + i + ")").on("click", function() {
			
			if ($(this).html() != "") {
				
				/* remove border of dateChosse before */
				if (OLD_CELL_CHOSSE != null) {
					$(OLD_CELL_CHOSSE).css("border", "none");
				}
				
				$(this).css("border", "1px solid red");		// get border of dateChosse
				getPicker(CURR_YEAR, CURR_MONTH, $(this).html());		// getPicker: dateChosse
				$("td img").click();		// hide calendar
				
				OLD_CELL_CHOSSE = this;			// save position dateChosse
			}
		});
	}
}

$("td img").click(function() {
	SHOW = !SHOW;
	if (SHOW) {
		$("#table_calendar").css("display", "block");
	} else {
		$("#table_calendar").css("display", "none");
	}
});