<?php
	if($_SERVER['REQUEST_METHOD'] == "POST") {
		$user = $pass = $email = $birth = "";
		$mes_user = $mes_pass = $mes_birth = $mes_email = "";
		$error = false;
		
		if (empty($_POST['username'])) {
			$mes_user = "Username length min 8 letter!";
			$error = true;
		} else {
			$parttern = ("/^[A-Za-z0-9]+$/"); 
			if(!preg_match($parttern, (mb_strlen($_POST['username'], 'UTF-8') > 8))) {
				$mes_user = "Username have some special character!";
				$error = true;
			} 
			if(preg_match($parttern, (mb_strlen($_POST['username'], 'UTF-8') < 8))) {
				$mes_user = "Username length min 8 letter!";
				$error = true;
			}
			if(preg_match($parttern, (mb_strlen($_POST['username'], 'UTF-8') > 8))) {
				$user = $_POST['username'];
				$mes_user = "OK";
			}
		}
	
		if (empty($_POST['password'])) {
			$mes_pass = "Password length min 8 letter!";
			$error = true;
		} else {
			if(mb_strlen($_POST['password'], 'UTF-8')<8) {
				$mes_pass = "Password length min 8 letter!";
				$error = true;
			} 
			if(mb_strlen($_POST['password'], 'UTF-8')>8) {
					$pass = $_POST['password'];
					$mes_pass = "OK";
			}
		}
		
		if (empty($_POST['email'])) {
			$mes_email = "Email wrong format";
			$error = true;
		} else {
			$parttern = ("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/"); 
			if(!preg_match($parttern,$_POST['email'])) {
				$mes_email = "Email wrong format!";
				$error = true;
			} else { 
				$email = $_POST['email'];
				$mes_email = "OK";
			}
		}
		
		if (empty($_POST['birthday'])) {
			$mes_birth = "Birthday wrong format!";
			$error = true;
		} else {
			$parttern = ("/^\d{1,2}\/\d{1,2}\/\d{4}$/"); 
			if(!preg_match($parttern,$_POST['birthday'])) {
				$mes_birth = "Birthday wrong format";
				$error = true;
			} else {
					$birth = $_POST['birthday'];
					$mes_birth = "OK";
			}
		}
		
		if($error) {
			echo 'Username: '.$mes_user.' <br/>';
			echo 'Password: '.$mes_pass.' <br/>';
			echo 'Email: '.$mes_email.' <br/>';
			echo 'Birthday: '.$mes_birth.' <br/>';
			
		}
	}
	
	$user = $_POST["username"];
	
	mysql_connect("localhost","root",""); 
	mysql_select_db("user");
	
	$sql = "SELECT * FROM login WHERE username = '$user'";
	
	$result = mysql_query($sql);
	$flag = 0;
	while($row=mysql_fetch_array($result)) {
		echo "<h1 style='color:red'> True!!!!</h1>";
		$flag = $flag+1;
	}
	if($flag == 0) {
		echo "<h1 style='color:red'> False!!!!</h1>";
	}
?>