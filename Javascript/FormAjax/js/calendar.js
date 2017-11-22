const MINCELL = 21;			// after cell Sat
const MAXCELL = MINCELL + 7 * 6;

var DATE = new Date();
var TODAY = DATE.getDate();
var CURR_MONTH = DATE.getMonth() + 1;
var CURR_YEAR = DATE.getFullYear();
var CALENDAR = document.getElementById("table_calendar");
var DISPLAY = document.getElementById("ic_calendar");
var MONTH = document.getElementById("month");
var YEAR = document.getElementById("year");
var PICKED_DAY = document.getElementById("birthday");
var CELLS = document.getElementsByTagName("td");
var SHOW = false;

var OLD_CELL_CHOSSE = null;

init();

function init() {
	for (var i = 1980; i <= 2099; i++) {
		YEAR.innerHTML += "<option value='" + i + "'>"+ i +'</option>';
	}
	
	getCalendar(CURR_YEAR, CURR_MONTH);
	pickDate();
	
	CALENDAR.style.display = "none";
}

function getPicker(year, month, day) {
	PICKED_DAY.value = year + "/" + month + "/" + day;
}

function getCalendar(year, month) {
	getMonthYear(year, month);
	getDay(year, month);
}

function getMonthYear(year, month) {
	MONTH.value = month;
	YEAR.value = year;
}

function getDay(year, month) {
	var sDate = new Date(year, month - 1, 1).getDay();
	var dateOfMonth = new Date(year, month, 0).getDate();
	var cellBegin = MINCELL + sDate;
	var cellEnd = cellBegin + dateOfMonth;

	/* clear cells before position list day of calendar */
	for (var i = MINCELL; i < cellBegin; i++) {
		clearCell(CELLS[i]);
	}
	
	/* get list day of calendar */
	var day = 1;
	for (var i = cellBegin; i <= cellEnd; i++) {
		CELLS[i].innerHTML = day++;
		CELLS[i].style.backgroundColor = "#23fc3c";
		CELLS[i].style.border = "none";
	}
	
	/* clear cells after position list day of calendar */
	for (var i = cellEnd; i < MAXCELL; i++) {
		clearCell(CELLS[i]);
	}
	
	/* get today of calendar */
	if (year === DATE.getFullYear() && month === (DATE.getMonth() + 1)) {
		var currDate = cellBegin - 1 + TODAY;
		CELLS[currDate].style.backgroundColor = "#00fcfc";
	}
}

/* set cell empty */
function clearCell(cell) {
	cell.innerHTML = "";
	cell.style.backgroundColor = "#eda957";
	cell.style.border = "none";
}

/* back to previous month */
function preMonth() {
	CURR_MONTH--;
	if(CURR_MONTH < 1) {
		CURR_MONTH = 12;
		CURR_YEAR--;
	}
	checkYear();
	getCalendar(CURR_YEAR, CURR_MONTH);
}

/* go to next month */
function nextMonth() {
	CURR_MONTH++;
	if (CURR_MONTH > 12) {
		CURR_MONTH = 1;
		CURR_YEAR++;
	}
	checkYear();
	getCalendar(CURR_YEAR, CURR_MONTH);
}

/* back to previous year */
function preYear() {
	CURR_YEAR--;
	checkYear();
	getCalendar(CURR_YEAR, CURR_MONTH);
}

/* go to next year */
function nextYear() {
	CURR_YEAR++;
	checkYear();
	getCalendar(CURR_YEAR, CURR_MONTH);
}

function checkYear() {
	if (CURR_YEAR > 2099) {
		CURR_YEAR = 2099;
		alert("Year cannot be greater than 2099!");
	} else if (CURR_YEAR < 1980) {
		CURR_YEAR = 1980;
		alert("Year cannot be less than 1980!");
	}
}

function pickDate() {
	for (var i = MINCELL; i < MAXCELL; i++) {
		CELLS[i].addEventListener("click", function() {
			
			if (this.innerHTML != "") {
				
				/* remove border of dateChosse before */
				if (OLD_CELL_CHOSSE != null) {
					OLD_CELL_CHOSSE.style.border = "none";
				}
				
				this.style.border = "1px solid red";		// get border of dateChosse
				getPicker(CURR_YEAR, CURR_MONTH, this.innerHTML);		// getPicker: dateChosse
				
				changeShow();
				OLD_CELL_CHOSSE = this;			// save position dateChosse
			}
		});
	}
}

function changeShow() {
	SHOW = !SHOW;
	if (SHOW) {
		CALENDAR.style.display = "block";
	} else {
		CALENDAR.style.display = "none";
	}
}

function pickMonth() {
	CURR_MONTH = parseInt(MONTH.value);
	getCalendar(CURR_YEAR, CURR_MONTH);
}

function pickYear() {
	CURR_YEAR = parseInt(YEAR.value);
	getCalendar(CURR_YEAR, CURR_MONTH);
}