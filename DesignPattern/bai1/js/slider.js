$(document).ready(function() {
	var SlideModule = (function() {
		
		var slide = $(".mySlides");
		var dots = $(".dot");
		var currIndex = 0
		var interval;
		var timerSlide = 2000;

		var SlideModule = function() {}

		var SlideModule = function(time) {
			timerSlide = time;
		}

		var showSlides = function(newIndex) {
			$(slide[currIndex]).css("display", "none");
			dots[currIndex].className = dots[currIndex].className.replace(" active", "");
			
			$(slide[newIndex]).css("display", "block");
			dots[newIndex].className += " active";

			interval = setInterval(function() {
				currIndex = newIndex;
				newIndex = (newIndex < slide.length - 1) ? newIndex + 1 : 0;
				showSlides(newIndex);
			}, timerSlide);
		}

		var slideInt = function() {
			showSlides(currIndex);
		}

		var prev = function() {
			var newIndex;
			if (currIndex > 0) {
				newIndex = currIndex - 1;
			} else {
				newIndex = slide.length - 1;
			}
			clearInterval(interval);
			slideShow(newIndex);
		}
		
		var next = function() {
			var newIndex = (currIndex < slide.length - 1) ? currIndex + 1 : 0;
			clearInterval(interval);
			showSlides(newIndex);
		}

		var click = function(idot) {
			clearInterval(interval);
			showSlides(idot);
		}

		SlideModule.prototype = {
			constructor: SlideModule,
			show: slideInt,
			prev: prev,
			next: next,
			click: click
		}

		return SlideModule;
	})();

	var slideModule = new SlideModule(1000);

	slideModule.show();

	$("#prev").click(function() {
		slideModule.prev();
	});

	$("#next").click(function() {
		slideModule.next();
	});

	$(".dot").click(function() {
		slideModule.click($(".dot").index(this));
	});
});
