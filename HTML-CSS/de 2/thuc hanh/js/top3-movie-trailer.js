function loadContent(id){
	document.getElementById("trailer_icon").style.display = "none";
	switch (id) {
		case 1:
      document.getElementById("trailer_icon").style.display = "block";
      document.getElementById("icon1").style.backgroundPosition = "top";
      document.getElementById("icon2").style.backgroundPosition = "bottom";
      document.getElementById("icon3").style.backgroundPosition = "bottom";
			break;
		case 2:			
			document.getElementById("icon2").style.backgroundPosition = "top";
      document.getElementById("icon1").style.backgroundPosition = "bottom";
      document.getElementById("icon3").style.backgroundPosition = "bottom";
			break;
		case 3:
			document.getElementById("icon3").style.backgroundPosition = "top";
      document.getElementById("icon1").style.backgroundPosition = "bottom";
      document.getElementById("icon2").style.backgroundPosition = "bottom";
			break;
	}
}