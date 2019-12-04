$(function($) {

    'use strict';

    //------------------------------------------------------------------------------------------------------------------
    // Variables
    //------------------------------------------------------------------------------------------------------------------

    var $body_html = $('body, html'),
        $html = $('html'),
        $body = $('body'),

        $navigation = $('#navigation'),
        navigation_height = $navigation.height(),

        $scroll_to_top = $('#scroll-to-top'),

        $preloader = $('#preloader'),
        $loader = $preloader.find('.loader');

    if (navigation_height <= 0) navigation_height = 60;

    //------------------------------------------------------------------------------------------------------------------
    // Is mobile
    //------------------------------------------------------------------------------------------------------------------

    var ua_test = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
        is_mobile = ua_test.test(navigator.userAgent);

    $html.addClass(is_mobile ? 'mobile' : 'no-mobile');

    //------------------------------------------------------------------------------------------------------------------
    // Background Parallax
    //------------------------------------------------------------------------------------------------------------------

    $.stellar({
        responsive: true,
        horizontalOffset: 0,
        verticalOffset: 0,
        horizontalScrolling: false,
        hideDistantElements: false
    });

    //------------------------------------------------------------------------------------------------------------------
    // ScrollSpy
    //------------------------------------------------------------------------------------------------------------------

    $body.scrollspy({
        offset:  51,
        target: '#navigation'
    });

    //------------------------------------------------------------------------------------------------------------------
    // Affixed Navbar
    //------------------------------------------------------------------------------------------------------------------

    $('.affix').affix({
        offset: {
            top: navigation_height
        }
    });

    //------------------------------------------------------------------------------------------------------------------
    // Dropdown By Click on Mobile (old version)
    //------------------------------------------------------------------------------------------------------------------

    //if (is_mobile) {
    //    $('.dropdown-toggle').each(function() {
    //        $(this).attr('data-toggle', 'dropdown');
    //    });
    //}

    //------------------------------------------------------------------------------------------------------------------
    // Dropdown :hover
    //------------------------------------------------------------------------------------------------------------------

    $.fn.dropdownMouse = function () {

        $.fn.dropdownMouse.shown = {};

        return $('li.dropdown', this).each(function () {

            $(this).on('mouseover', function () {
                $(this).addClass('open');
                $.fn.dropdownMouse.shown[this] = 1;
            });

            $(this).on('mouseout', function () {
                $.fn.dropdownMouse.shown[this] = 0;
                if (0 == $.fn.dropdownMouse.shown[this]) $(this).removeClass('open');
            });

        });
    };

    //$navigation.dropdownMouse();

    $('.dropdown').mouseenter(function(){
        $('.dropdown-toggle', this).trigger('click');
    });

    //$('.dropdown').hover(function(){
    //    $('.dropdown-toggle', this).trigger('click');
    //});

    //$('.dropdown').mouseenter(function() {
    //    // Disable for mobile view
    //    if($('.navbar-toggle').is(':visible')) return;
    //    // Keeps it open when hover it again
    //    if(!$(this).hasClass('open')) {
    //        $('.dropdown-toggle', this).trigger('click');
    //    }
    //});

    //------------------------------------------------------------------------------------------------------------------
    // Top Line Toggle
    //------------------------------------------------------------------------------------------------------------------

    $('.top-line-toggle').click(function() {

        var $top_line = $('.top-line'),
            $this = $(this);

        $top_line.slideToggle('fast', 'linear');
        $this.toggleClass('in');
    });

    $(window).scroll(function () {

        var $scroll_top = $(this).scrollTop();

        var $top_line = $('.top-line'),
            $top_line_toggle = $('.top-line-toggle');

        if ($scroll_top > 70) {

            // Hide TopLine after page scroll
            if (is_mobile && $top_line_toggle.hasClass('in')) {
                $top_line.slideToggle('fast', 'linear');
                $top_line_toggle.toggleClass('in');
            }

            return;
        }

        if ($top_line.css('display') == 'none') {
            $top_line.slideToggle('fast', 'linear');
            $top_line_toggle.addClass('in');
        }

    });

    //------------------------------------------------------------------------------------------------------------------
    // Search Form Collapse
    //------------------------------------------------------------------------------------------------------------------

    var $search_form = $('.search-form');

    if (is_mobile) {
        $search_form.addClass('in');
    } else {
        $search_form.find('button').click(function() {
            $search_form.toggleClass('in');
        });
    }

    //------------------------------------------------------------------------------------------------------------------
    // Scroll To Top
    //------------------------------------------------------------------------------------------------------------------

    $(window).scroll(function () {

        var $scroll_top = $(this).scrollTop();

        if ($scroll_top > navigation_height) {
            $scroll_to_top.addClass('in');
        } else {
            $scroll_to_top.removeClass('in');
        }
    });

    $scroll_to_top.click(function() {
        $.scrollWindow(0);
    });

    //------------------------------------------------------------------------------------------------------------------
    // Smooth Scrolling
    //------------------------------------------------------------------------------------------------------------------

    $('a[href^="#"]').click(function(event) {

        event.preventDefault();

        var $this = $(this),
            target = $this.attr('href');

        // Don't return false!
        if (target == '#') return;

        if ($this.hasClass('smooth-scroll')) {
            var offset = $(target).offset().top - navigation_height;
            $.scrollWindow(offset);
        }
    });

    $.scrollWindow = function(offset) {
        $body_html.animate({
            scrollTop: offset
        }, 750);
    };

    //------------------------------------------------------------------------------------------------------------------
    // Animation
    //------------------------------------------------------------------------------------------------------------------

    // Init WOW
    new WOW().init({ mobile: false });

    // Animate Numbers
    var $animate_number = $('.animate-number');

    if ($animate_number.length > 0) {

        $animate_number.appear();

        $body.on('appear', '.animate-number', function () {
            $animate_number.each(function () {
                var $this = $(this);
                if (!$this.hasClass('animate-stop')) {
                    $this.animateNumber({
                        number: $this.attr('data-value')
                    }, 750);
                    $this.addClass('animate-stop');
                }
            });
        });
    }

    //------------------------------------------------------------------------------------------------------------------
    // Magnific
    //------------------------------------------------------------------------------------------------------------------

    $('.image-popup').magnificPopup({
        closeBtnInside : true,
        type           : 'image',
        mainClass      : 'mfp-with-zoom'
    });

    $('.iframe-popup').magnificPopup({
        type      : 'iframe',
        mainClass : 'mfp-with-zoom'
    });

    //------------------------------------------------------------------------------------------------------------------
    // Carousels
    //------------------------------------------------------------------------------------------------------------------

    $("#slider").owlCarousel({
        pagination            : false,
        navigation            : false,
        responsive            : true,
        singleItem            : true,
        autoHeight            : true,
        //mouseDrag             : false,
        //touchDrag             : false,
        transitionStyle       : 'fadeUp',
        autoPlay              : 5000
    });

    $(".img-carousel-pagination").owlCarousel({
        pagination        : true,
        navigation        : false,
        responsive        : true,
        singleItem        : true,
        transitionStyle   : 'fadeUp'
    });

    $(".carousel").owlCarousel({
        pagination        : true,
        navigation        : false,
        responsive        : true,
        items             : 3,
        transitionStyle   : 'fadeUp',
        navigationText    : [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ]
    });

    //------------------------------------------------------------------------------------------------------------------
    // Circle progress
    //------------------------------------------------------------------------------------------------------------------

    $('.circle-progress').each(function(index, element) {

        var $this = $(element),
            $circles = $this.find('circle'),
            $bar = $this.find('.bar'),
            percents = $this.data('percents'),
            r = $bar.attr('r'),
            l = Math.PI * r * 2,
            pct;

        if (percents > 100) percents = 100;
        if (percents < 0) percents = 0;

        pct = ((100 - percents) / 100) * l;

        $circles.css('strokeDasharray', l);
        $bar.css('strokeDashoffset', pct);

        // Update attr (for animation)
        // $this.data('percents', percents);
    });

    //------------------------------------------------------------------------------------------------------------------
    // Ajax forms
    //------------------------------------------------------------------------------------------------------------------

    $('.form-ajax').each(function(){

        $(this).validate({
            submitHandler: function(form) {

                var $submit_button = $(form).find('[type=submit]'),
                    submit_button_text = $submit_button.html();

                $submit_button.attr('disabled', true);
                $submit_button.html('<i class="fa fa-fw fa-spinner fa-spin"></i>');

                $.ajax({

                    type   : 'post',
                    url    : 'sendmail.php',
                    data   : $(form).serialize(),

                    success: function() {

                        $('.result-icon .icon').removeClass('fa-times').addClass('fa-check');
                        $('.modal-result').html('Message sent successfully :)');

                        $('.modal.in').modal('hide');
                        $('#result').modal('show');

                        $submit_button.attr('disabled', false);
                        $submit_button.html(submit_button_text);
                    },

                    error: function(){

                        $('.result-icon .icon').removeClass('fa-check').addClass('fa-times');
                        $('.modal-result').html('Error sending message :(');

                        $('.modal.in').modal('hide');
                        $('#result').modal('show');

                        $submit_button.attr('disabled', false);
                        $submit_button.html(submit_button_text);
                    }
                });
            }
        });
    });

    // Left Body Padding Fix
    $('.modal').on('hide.bs.modal', function () {
        var $body = $('body');
        if (parseInt($body.css('padding-right')) > 0) {
            $body.css('padding-right', '');
        }
    });

    //------------------------------------------------------------------------------------------------------------------
    // Google Maps
    //------------------------------------------------------------------------------------------------------------------

    if ($('#map-canvas').length > 0) {

        var lat_lng = new google.maps.LatLng(-37.85787, 144.5191615),
            map_center = new google.maps.LatLng(-37.728687, 145.162939),
            //hue ='#ff5555',
            marker_title = 'Company Name',
            marker_information =
                '<div id="map-window">' +
                '<h4>We are here!</h4>' +
                '</div>';


        // map settings
        var settings = {
            zoom          : 9,
            center        : map_center,
            mapTypeControl: false,
            mapTypeId     : google.maps.MapTypeId.ROADMAP,
            styles        : [
                {
                    //stylers: [
                    //    { hue: hue },
                    //    { saturation: -20 }
                    //]
                }, {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers    : [
                        { lightness: 100 },
                        { visibility: 'simplified' }
                    ]
                }, {
                    featureType: 'road',
                    elementType: 'labels',
                    stylers    : [
                        { visibility: 'off' }
                    ]
                }
            ]
        };

        // create map
        var map = new google.maps.Map(document.getElementById('map-canvas'), settings);

        // map marker (see global)
        var marker = new google.maps.Marker({
            position: lat_lng,
            map: map,
            title: marker_title
        });

        // tooltip
        var info_window = new google.maps.InfoWindow({
            content: marker_information
        });

        // open tooltip
        info_window.open(map, marker);
    }

    //------------------------------------------------------------------------------------------------------------------
    // Finish loading
    //------------------------------------------------------------------------------------------------------------------

    $(window).load(function() {

        /* Remove preloader */

        $loader.delay(1500).fadeOut();
        $preloader.delay(500).fadeOut('slow');

        $body.addClass('loaded');
    });

});