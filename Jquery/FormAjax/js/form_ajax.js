$("#username").change(function() {
	if ($("#username").val().length < 8 || $("#username").val().length > 50) {
		$("#user_message").html("Username in 8-50 character!");
		return false;
	}
	if (isSpecialCharacter($("#username").val())) {
		$("#user_message").html("Not enter special character!");
		return false;
	}
	$("#user_message").css("color", "green");
	$("#user_message").html("OK");
	return true;
});

function isSpecialCharacter(str){
 return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

$("#password").change(function() {
	if ($("#password").val().length < 8 || $("#password").val().length > 30) {
		$("#pass_message").html("Password in 8-30 character!");
		return false;
	}
	$("#pass_message").css("color", "green");
	$("#pass_message").html("OK");
	return true;
});

$("#email").change(function() {
	if (!validateEmail($("#email").val())) {
		$("#email_message").html("Email is not valid!");
		return false;
	}
	$("#email_message").css("color", "green");
	$("#email_message").html("OK");
	return true;
});

function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
}

$("#birthday").change(function() {
	if (!isValidDate($("#birthday").val())) {
		$("#birthday_message").html("Date not format!");
		return false;
	}
	$("#birthday_message").css("color", "green");
	$("#birthday_message").html("OK");
	return true;
});

function isValidDate(dateString) {
	var reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
	if(!reg.test(dateString)) {
			return false;
	}

	var parts = dateString.split("/");
	var day = parseInt(parts[0], 10);
	var month = parseInt(parts[1], 10);
	var year = parseInt(parts[2], 10);
	
	if(year < 1980 || year > 2099 ||
		month == 0 || month > 12 ||
		day < 1 || day > 31) {
		return false;
	}
 return true;
}

$("#btnSubmit").click(function() {
	if (check_inputBirthday() && check_inputUsername() && check_inputPassword()) {
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				$("res").html(xhttp.responseText);
			}
		};
		var user = $("#username").value;
		var pass = $("#password").value;
		var queryString = "?username=" + user + "&password=" + pass;
		console.log(queryString);
		xhttp.open("GET", "login.php" + queryString, true);
		xhttp.send();
	} else {
		$("res").html("Please input validate!");
	}
});

$("#btnRefresh").click(function() {
	$("#username").val("");
	$("#password").val("");
	$("#email").val("");
	$("#birthday").val("");
	$("#user_message").val("");
	$("#pass_message").val("");
	$("#email_message").val("");
	$("#birthday_message").val("");
});