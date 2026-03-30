(function ($) {
    "use strict";

    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();


    // Initiate the wowjs
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate — separate strings, smartBackspace disabled
    if ($('.hero .hero-text h2').length == 1) {
        var typed = new Typed('.hero .hero-text h2', {
            strings: [
                "AI in Healthcare",
                "Machine Learning Engineer",
                "AI Automation Strategist",
                "Published Researcher",
                "2x Patent Holder",
                "Academic Speaker",
                "Workshop Facilitator"
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2500,
            startDelay: 500,
            loop: true,
            smartBackspace: false
        });
    }


    // Hero Flip Card — auto-flip every 5 seconds, pause on hover
    var flipCard = document.querySelector('.flip-card');
    var flipCardInner = document.querySelector('.flip-card-inner');
    var flipInterval;

    function startFlip() {
        flipInterval = setInterval(function () {
            if (flipCardInner) {
                flipCardInner.classList.toggle('flipped');
            }
        }, 5000);
    }

    if (flipCard && flipCardInner) {
        startFlip();

        flipCard.addEventListener('mouseenter', function () {
            clearInterval(flipInterval);
        });

        flipCard.addEventListener('mouseleave', function () {
            startFlip();
        });

        flipCard.addEventListener('click', function () {
            flipCardInner.classList.toggle('flipped');
        });
    }


    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        dots: true,
        loop: true,
        nav: true,
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        responsive: {
            0:{
                items:1
            }
        }
    });


    // Portfolio filter (if still present on page)
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Click-to-expand lightbox for gallery and achievement images
    $(document).on('click', '.gallery-item img, .achievement-card .achievement-img img', function (e) {
        e.stopPropagation();
        var src = $(this).attr('src');
        var overlay = $('<div class="image-lightbox-overlay"><img src="' + src + '" alt="Expanded view"></div>');
        $('body').append(overlay);
        // Prevent body scroll
        $('body').css('overflow', 'hidden');
    });

    // Close lightbox on click
    $(document).on('click', '.image-lightbox-overlay', function () {
        $(this).remove();
        $('body').css('overflow', '');
    });

    // Close lightbox on Escape key
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('.image-lightbox-overlay').remove();
            $('body').css('overflow', '');
        }
    });

})(jQuery);
