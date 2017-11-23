$(document).ready(function() {
	var SlideModule = (function() {
		
		var slide = $(".slide");
		var listIndex = $(".list-index");
		var currIndex = 0
		var interval;
		var timeTick = 2000;

		var SlideModule = function() {}

		var SlideModule = function(time) {
			timeTick = time;
		}

		var slideShow = function(newIndex) {
			$(slide[currIndex]).css("display", "none");
			listIndex[currIndex].className = listIndex[currIndex].className.replace(" boder-index", "");

			$(slide[newIndex]).css("display", "block");
			listIndex[newIndex].className += " boder-index";

			interval = setInterval(function() {
				currIndex = newIndex;
				newIndex = (newIndex < slide.length - 1) ? newIndex + 1 : 0;
				slideShow(newIndex);
			}, timeTick);
		}

		var slideInt = function() {
			slideShow(currIndex);
		}

		var preSlide = function() {
			var newIndex;
			if (currIndex > 0) {
				newIndex = currIndex - 1;
			} else {
				newIndex = slide.length - 1;
			}
			clearInterval(interval);
			slideShow(newIndex);
		}
		
		var nextSlide = function() {
			var newIndex = (currIndex < slide.length - 1) ? currIndex + 1 : 0;
			clearInterval(interval);
			slideShow(newIndex);
		}

		var clickSlide = function(iPic) {
			clearInterval(interval);
			slideShow(iPic);
		}

		SlideModule.prototype = {
			constructor: SlideModule,
			show: slideInt,
			previous: preSlide,
			next: nextSlide,
			click: clickSlide
		}

		return SlideModule;
	})();

	var slideModule = new SlideModule(1000);

	slideModule.show();

	$("#btn_pre").click(function() {
		slideModule.previous();
	});

	$("#btn_next").click(function() {
		slideModule.next();
	});

	$(".list-index").click(function() {
		slideModule.click($(".list-index").index(this));
	});
});
