$(document).ready(function() {
    
    if (!localStorage.getItem('agree-cookie')) {
        document.getElementById('cookie').classList.remove('d-none');
    }

    var cookieButton = document.getElementById('cookieButton');
    if (cookieButton) {
        cookieButton.addEventListener('click', function() {
            localStorage.setItem('agree-cookie', 'ok');
            document.getElementById('cookie').classList.add('d-none');
        });
    }

	var winWidth = $(window).width();
	var winHeight = $(window).height();
	
	$('.input-phone').mask("+7 (999) 999-99-99");
	
	/*
	var scroll = new SmoothScroll('a.smooth-scroll', {
    	header: null, // Selector for fixed headers (must be a valid CSS selector)
    	speed: 500, // Integer. How fast to complete the scroll in milliseconds
    	offset: 0, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
  });
  */

  $(window).scroll(function() {
  	if ($(window).scrollTop() > winHeight) {
  		$('#up').fadeIn();
  	}
  	else {
  		$('#up').fadeOut();
  	}
  });

  $('#startSlider').slick({
  	autoplay:true,
  	autoplaySpeed: 3000,
		infinite: true,
		fade:true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow:'<button type="button" class="slick-prev svg-bg"><svg width="67" height="48" viewBox="0 0 67 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 23.616L33.8365 18H37V18.768L34.4195 22.35L33.2308 24L34.6356 25.95L37 29.232V30H33.8365L30 24.384V23.616Z" fill="white"/><path class="arrow-bg" d="M67 38V10C67 4.47715 62.5228 0 57 0H33.5H19.9624C17.8734 0 15.8368 0.654241 14.1386 1.87087L4.17615 9.00813C1.55488 10.8861 0 13.9127 0 17.1373V24V30.8627C0 34.0873 1.55488 37.1139 4.17615 38.9919L14.1386 46.1291C15.8368 47.3458 17.8734 48 19.9624 48H33.5H57C62.5228 48 67 43.5229 67 38Z" fill="white" /></svg></button>',
		nextArrow:'<button type="button" class="slick-next svg-bg"><svg width="67" height="48" viewBox="0 0 67 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37 23.616L33.1635 18H30V18.768L32.5805 22.35L33.7692 24L32.3644 25.95L30 29.232V30H33.1635L37 24.384V23.616Z" fill="white"/><path class="arrow-bg" d="M0 38V10C0 4.47715 4.47715 0 10 0H33.5H47.0376C49.1266 0 51.1632 0.654241 52.8614 1.87087L62.8239 9.00813C65.4451 10.8861 67 13.9127 67 17.1373V24V30.8627C67 34.0873 65.4451 37.1139 62.8239 38.9919L52.8614 46.1291C51.1632 47.3458 49.1266 48 47.0376 48H33.5H10C4.47715 48 0 43.5229 0 38Z" fill="white"></svg></button>'
	});

	$('#startSlider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('#startSliderNav').find('.active').removeClass('active');
	  $('#sn' + nextSlide).addClass('active');
	});

	$('.start-nav').click(function() {
		if (!$(this).hasClass('active')) {
			var id = $(this).attr('id');
			var num = id.slice(2);
			$('#startSlider').slick('slickGoTo', num);
		}
	});
    

	$('#rotationSlider').slick({
		infinite: true,
		fade:true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false
	});

	$('#rotationSlider').on('afterChange', function(event, slick, currentSlide) {
		var num = currentSlide + 1;
		if (num < 10) {
			num = '0' + num;
		}

		$('#rsCounter').text(num);
	});

	$('.slick-prev.static').click(function() {
		var wrapper = $(this).closest('.slider-with-arrows');
		var slider = wrapper.find('.slick-slider');
		slider.slick('slickPrev');
	});

	$('.slick-next.static').click(function() {
		var wrapper = $(this).closest('.slider-with-arrows');
		var slider = wrapper.find('.slick-slider');
		slider.slick('slickNext');
	});

	/*

	$('.slick-prev.added').click(function() {
		var wrapper = $(this).closest('.slider-with-arrows');
		var slider = wrapper.find('.slick-slider');
		var counter = $(this).closest('.slider-buttons').find('.slides-count');
		if (counter) {
			var current = parseFloat(counter.text());
			if (current > 1) {
				slider.slick('slickPrev');
				current -= 1;
				if (current < 10) {
					current = '0' + current;
				}
				counter.text(current);
			}
		}
	});

	$('.slick-next.added').click(function() {
		var wrapper = $(this).closest('.slider-with-arrows');
		var slider = wrapper.find('.slick-slider');
		var counter = $(this).closest('.slider-buttons').find('.slides-count');
		if (counter) {
			var current = parseFloat(counter.text());
			var count = parseFloat($(this).closest('.slider-buttons').find('.slides-length').text());

			if (current < count) {
				slider.slick('slickNext');
				current += 1;
				if (current < 10) {
					current = '0' + current;
				}
				counter.text(current);
			}
		}
	});

	*/

	$('#centeredSlider').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow:'<button type="button" class="slick-prev svg-bg"><svg width="67" height="48" viewBox="0 0 67 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 23.616L33.8365 18H37V18.768L34.4195 22.35L33.2308 24L34.6356 25.95L37 29.232V30H33.8365L30 24.384V23.616Z" fill="white"/><path class="arrow-bg" d="M67 38V10C67 4.47715 62.5228 0 57 0H33.5H19.9624C17.8734 0 15.8368 0.654241 14.1386 1.87087L4.17615 9.00813C1.55488 10.8861 0 13.9127 0 17.1373V24V30.8627C0 34.0873 1.55488 37.1139 4.17615 38.9919L14.1386 46.1291C15.8368 47.3458 17.8734 48 19.9624 48H33.5H57C62.5228 48 67 43.5229 67 38Z" fill="white" /></svg></button>',
		nextArrow:'<button type="button" class="slick-next svg-bg"><svg width="67" height="48" viewBox="0 0 67 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37 23.616L33.1635 18H30V18.768L32.5805 22.35L33.7692 24L32.3644 25.95L30 29.232V30H33.1635L37 24.384V23.616Z" fill="white"/><path class="arrow-bg" d="M0 38V10C0 4.47715 4.47715 0 10 0H33.5H47.0376C49.1266 0 51.1632 0.654241 52.8614 1.87087L62.8239 9.00813C65.4451 10.8861 67 13.9127 67 17.1373V24V30.8627C67 34.0873 65.4451 37.1139 62.8239 38.9919L52.8614 46.1291C51.1632 47.3458 49.1266 48 47.0376 48H33.5H10C4.47715 48 0 43.5229 0 38Z" fill="white"></svg></button>',
		focusOnSelect: true,
		centerMode: true,
		variableWidth: true
	});

	$('#centeredSlider').on('afterChange', function(event, slick, currentSlide) {
		var num = currentSlide + 1;
		if (num < 10) {
			num = '0' + num;
		}

		$('#csCounter').text(num);
	});

  $('.manufacture-item').on('mouseenter', function() {
    if (winWidth > 992) {
      var block = $(this).find('.manufacture-introtext');
      block.slideDown();
    }
  });

  $('.manufacture-item').on('mouseleave', function() {
    if (winWidth > 992) {
      var block = $(this).find('.manufacture-introtext');
      block.slideUp();
    }
  });
	
	/* 
	if ($('#beforeAfterNav').is('div')) {
    	$('#beforeAfterNav').on('afterChange', function(event, slick, currentSlide) {
            var text = $('#beforeAfterNav').find('.before-after-thumb.slick-current').attr('data-text');
            $('#beforeAfterText').text(text);
        });
	}
	
	$(window).on('click', function(e) {
	    if (e.target.classList.contains('is-close') || e.target.classList.contains('fancybox__slide')) {
	        videos = document.getElementsByTagName('video');
	        
	        if (videos.length > 0) {
	            for (i=0;i < videos.length;i++) {
	                videos[i].pause();
	            }
	        }
	    }
	});

	$('.menu-toggler').click(function() {
		$('#mobileMenu').toggleClass('active');
		$('body').toggleClass('disabled');
		$(this).toggleClass('active');
	});

	$('.submenu-toggler').click(function() {
		$(this).closest('li').find('ul').slideToggle();
		$(this).toggleClass('active');
	});

	$('.short-text').each(function() {
		var thisHeight = $(this).height();
		var maxHeight = $(this).attr('data-max');
		if (thisHeight > maxHeight) {
			$(this).height(maxHeight);
			$(this).addClass('active');
			$(this).attr('data-height', thisHeight);
		}
	});

	$('.read-more').click(function() {
		var block = $(this).prev('.short-text');
		var blockHeight = block.attr('data-height');
		var maxHeight = block.attr('data-max');

		if (block.hasClass('opened')) {
			block.height(maxHeight);
			block.removeClass('opened');
		}
		else {
			block.height(blockHeight);
			block.addClass('opened');
		}

		var text1 = $(this).text();
		var text2 = $(this).attr('data-text');

		$(this).text(text2);
		$(this).attr('data-text', text1);
	});

	$('.spoiler-toggler').click(function() {
		var wrapper = $(this).closest('.spoiler-item');
		wrapper.find('.spoiler-text').slideToggle();
		wrapper.toggleClass('active');
	});
	
	if ($('#beforeAfterElements').is('div')) {
	    startDrag();
	    
	    $(document).ajaxStop(startDrag());
	}
	
    
    $('.confInput').change(function() {
	    var button = $(this).closest('form').find('button');
	    if ($(this).is(':checked')) {
	        button.prop('disabled', false);
	    }
	    else {
	        button.prop('disabled', true);
	    }
	});
    
	document.addEventListener('si:send:success', function(e) {
        Fancybox.close();
    	
    	var formID = e.detail.target.id;
    	
    	if (formID) {
        	
    	}
    });
*/

	$(window).resize(function() {
		winWidth = $(window).width();
		winHeight = $(window).height();
	});

});
