function checkInputUsername() {
	var txt_user = document.getElementById("username").value;
	var mes_user = document.getElementById("user_message");
	if (txt_user.length < 8 || txt_user.length > 50) {
		mes_user.innerHTML = "Username in 8-50 character!";
		return false;
	}
	if (isSpecialCharacter(txt_user)) {
		mes_user.innerHTML = "Not enter special character!";
		return false;
	}
	mes_user.style.color = "green";
	mes_user.innerHTML = "OK";
	return true;
}

function isSpecialCharacter(str){
 return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

function checkInputPassword() {
	var txt_pass = document.getElementById("password").value;
	var mes_pass = document.getElementById("pass_message");
	if (txt_pass.length < 8 || txt_pass.length > 30) {
		mes_pass.innerHTML = "Password in 8-30 character!";
		return false;
	}
	mes_pass.style.color = "green";
	mes_pass.innerHTML = "OK";
	return true;
}

function checkInputEmail() {
	var txt_email = document.getElementById("email").value;
	var mes_email = document.getElementById("email_message");
	if (!validateEmail(txt_email)) {
		mes_email.innerHTML = "Email is not valid!";
		return false;
	}
	mes_email.style.color = "green";
	mes_email.innerHTML = "OK";
	return true;
}

function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
}

function checkInputBirthday() {
	var txt_birth = document.getElementById("birthday").value;
	var mes_birth = document.getElementById("birthday_message");
	if (!isValidDate(txt_birth)) {
		mes_birth.innerHTML = "Date not format!";
		return false;
	}
	mes_birth.style.color = "green";
	mes_birth.innerHTML = "OK";
	return true;
}

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

function submit_login() {
	if (check_inputBirthday() && check_inputUsername() && check_inputPassword()) {
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				document.getElementById("res").innerHTML = xhttp.responseText;
			}
		};
		var user = document.getElementById("username").value;
		var pass = document.getElementById("password").value;
		var queryString = "?username=" + user + "&password=" + pass;
		console.log(queryString);
		xhttp.open("GET", "login.php" + queryString, true);
		xhttp.send();
	} else {
		document.getElementById("res").innerHTML = "Please input validate!";
	}
}

function refresh_login() {
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	document.getElementById("email").value = "";
	document.getElementById("birthday").value = "";
	document.getElementById("user_message").value = "";
	document.getElementById("pass_message").value = "";
	document.getElementById("email_message").value = "";
	document.getElementById("birthday_message").value = "";
}