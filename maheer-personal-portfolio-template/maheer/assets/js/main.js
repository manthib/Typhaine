(function($) {
    "use strict"; // Start of use strict
    // varible 
    var window_box = $(window),     						// For window ready
		document_func = $(document),        				// For documetn ready
		html_body = $("html, body"),        				// For html and bocy select
		body = $('body'),       							// For body select
		navbar_scroll = $('.navbar-collapse ul li a'),       // For nav section select function
		sticky_header = $('.site-header'),                   // Sticky fix header
        home_fullscreen_slider = $(".home_slider"),           // Home Full Screen Slider
        home_normal_slider = $('.home_slider_normal'),        // Home Normal Slider
		home_nivo_slider = $('#nivoslider'),                  // Home Nivo Slider
		scroll_up = $('.scrollup'),                           // For scroll to top 
		portfolio_box = $('.portfolio_items'),                // For portfolio isotop & popup
		portfolio_box_filter = $('.portfolio_filter'),        // for portfolio filter button
		popup_video = $('.popup-video'),                      // for popup video
		testimonial_slider_box = $('.testimonial_slider'),    // for testimonial slider
		blog_sidebar_select = $('.selectpicker');             // for custom select
	// Page Loader
    window_box.on('load', function () {
        body.addClass('loaded');
    });
    document_func.on('click', 'div.stop_loading', function() {
        body.addClass('loaded');
    });
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    document_func.on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        html_body.stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
    // Highlight the top nav as scrolling occurs
    body.scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });
    // Closes the Responsive Menu on Menu Item Click
    navbar_scroll.on('click', function () {
        $('.navbar-toggle:visible').click();
    });
    // Offset for Main Navigation
    sticky_header.affix({
        offset: {
            top: 50
        }
    })
    // Fullscreen Home Slider
    window_box.on('resizeEnd', function () {
        home_fullscreen_slider.height(window_box.height());
    });
    window_box.on('resize', function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 300);
    }).trigger("resize");
	home_fullscreen_slider.owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        navSpeed: 1300,
        autoplaySpeed: 1300,
        items: 1,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        animateOut: 'fadeOut',
        smartSpeed: 450
    });
    $('.hs_image').hide();
    $('.home_slider .slingle_home_slider').each(function () {
        var itmeImg = $(this).find('.hs_image').attr('src');
        $(this).css({
            backgroundImage: 'url(' + itmeImg + ')'
        });
    });
	var slider_home_item = $('.slingle_home_slider > .slider_area_inner > .container > .row > .col-xs-12 > *');
    home_fullscreen_slider.on('translate.owl.carousel', function () {
        slider_home_item.hide();
    });
    home_fullscreen_slider.on('translated.owl.carousel', function () {
        slider_home_item.show();
    });
    // Home Normal Slider
    home_normal_slider.owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        navSpeed: 1300,
        autoplaySpeed: 1300,
        items: 1,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        animateOut: 'fadeOut',
        smartSpeed: 450
    })
    // Nivo Slider
    if ($.fn.nivoSlider) {
        home_nivo_slider.nivoSlider({
            effect: 'random', // Specify sets like: 'fold,fade,sliceDown'
            slices: 15, // For slice animations
            boxCols: 8, // For box animations
            boxRows: 4, // For box animations
            animSpeed: 500, // Slide transition speed
            pauseTime: 3000, // How long each slide will show
            startSlide: 0, // Set starting Slide (0 index)
            directionNav: true, // Next & Prev navigation
            controlNav: true, // 1,2,3... navigation
            controlNavThumbs: false, // Use thumbnails for Control Nav
            pauseOnHover: true, // Stop animation while hovering
            manualAdvance: false, // Force manual transitions
            prevText: '<i class="fa fa-angle-left"></i>', // Prev directionNav text
            nextText: '<i class="fa fa-angle-right"></i>', // Next directionNav text
            randomStart: false // Start on a random slide
        });
    }
    // Back To Top Script
    window_box.on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            scroll_up.fadeIn();
        } else {
            scroll_up.fadeOut();
        }
    });
    scroll_up.on('click', function () {
        html_body.animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    // Skill Bar Script
    // ##### window on refresh #####
    var progress_bar = $('.bar-inner')
        , skills_top = $('.skill_area').offset().top - 200
        , window_top = window_box.scrollTop();
    if (window_top >= skills_top) {
        progress_bar.each(function () {
            var data_percent = $(this).attr('data-percent');
            $(this).css('width', data_percent)
        });
    };
    // ##### window on scroll #####
    window_box.on('scroll', function () {
        var skills_top = $('.skill_area').offset().top - 200
            , window_top = window_box.scrollTop();
        if (window_top >= skills_top) {
            progress_bar.each(function () {
                var data_percent = $(this).attr('data-percent');
                $(this).css('width', data_percent)
            });
        };
    });
    // Isotope Scritp
    var $grid = portfolio_box.isotope({
      itemSelector: '.portfolio_tile',
      percentPosition: true,
      masonry: {
        columnWidth: '.portfolio_tile'
      }
    });
    portfolio_box_filter.on( 'click', 'li', function() {
        portfolio_box_filter.find('.active').removeClass('active');
        $( this ).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
    $grid.imagesLoaded().progress( function() {
      $grid.isotope('layout');
    });
    // Portfolio Pop Script
    portfolio_box.magnificPopup({
        delegate: 'a',
        type: 'image',
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true,
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });
    // Video Popup
    popup_video.magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    //Owl Carousel
    testimonial_slider_box.owlCarousel({
        loop:true,
        margin:80,
        nav:true,
        autoplay: true,
        nav: true,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            1000:{
                items:2
            }
        }
    })
    // YouTube video active code
    if ($.fn.mb_YTPlayer) {
        $('#video_player').mb_YTPlayer();
    }
    // Bootstrap Custom Select
    if ($.fn.selectpicker) {
        blog_sidebar_select.selectpicker();
    }
    //TYPE EFFECT JS
    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        var that = this;
        var delta = 150 - Math.random() * 100;
        if (this.isDeleting) {
            delta /= 2;
        }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(function () {
            that.tick();
        }, delta);
    };
    window.onload = function () {
        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.02em solid #fff}";
        document.body.appendChild(css);
    };
    // WOW Script
    new WOW().init();
})(jQuery); // End of use strict
