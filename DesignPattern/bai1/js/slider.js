var TIME;

$(document).ready(function() {
	var SlideModule = (function() {
		var img = $(".img");
		var thumbs = $(".thumb");
		var currIndex = 0
		
		var interval;
		var timerSlide;

		var SlideModule = function(time) {
			timerSlide = time;
		}

		var showSlide = function(newIndex) {
			stopSlide(currIndex);
			currIndex = newIndex;
			startSlide(currIndex);
			blurSlide(currIndex);
			effectSlider(currIndex);
			loopImg();
		}
		
		function stopSlide(index) {
			img.eq(index).hide();
			//$("#thumb"+(index)).removeClass('active');
		}
		
		function startSlide(index) {
			img.eq(index).show();
			//$("#thumb"+(index)).addClass('active');
		}
		
		function blurSlide(index) {
			img.css({"opacity": "0"});
			thumbs.css("opacity", "0.3");
			thumbs.eq(index).css("opacity", "1");
		}
		
		function effectSlider(index) {
			img.animate({right: 0}, 0);
			img.eq(index).css({"opacity": "1"});
			img.animate({right: 690}, timerSlide);
		}
		
		function loopImg() {
			clearTimeout(TIME);
			TIME = setTimeout(function() {
				nextSlide();
			}, timerSlide);
		}

		var slideInt = function() {
			showSlide(currIndex);
		}

		var prevSlide = function() {
			var newIndex = currIndex - 1;
			if (currIndex < 0) {
				newIndex = img.length - 1;
			}
			showSlide(newIndex);
		}
		
		var nextSlide = function() {
			var newIndex = currIndex + 1;
			if (currIndex > img.length - 1) {
				newIndex = 0;
			}
			showSlide(newIndex);
		}

		var clickSlide = function(index) {
			showSlide(index);
		}

		SlideModule.prototype = {
			constructor: SlideModule,
			show: slideInt,
			prev: prevSlide,
			next: nextSlide,
			click: clickSlide
		}

		return SlideModule;
	})();

	var slideModule = new SlideModule(2000);

	slideModule.show();

	$(".prev").click(function() {
		slideModule.prev();
	});

	$(".next").click(function() {
		slideModule.next();
	});
	
	$("#thumb").click(function(index) {
		showSlide(index);
	});

	$(".thumb").click(function() {
		slideModule.click($(".thumb").index(this));
	});
});
