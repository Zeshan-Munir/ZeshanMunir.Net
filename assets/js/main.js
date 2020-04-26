(function ($) {
    "use strict";

    function portfolioInit() {
        var portfolioGrid = $(".portfolio-grid");
        var portfolioFilter = $(".portfolio-filters");
        if (portfolioGrid) {
            portfolioGrid.shuffle({ speed: 450, itemSelector: "figure" });
            portfolioFilter.on("click",
                ".filter",
                function (e) {
                    portfolioGrid.shuffle("update");
                    e.preventDefault();
                    $(".portfolio-filters .filter").parent().removeClass("active");
                    $(this).parent().addClass("active");
                    portfolioGrid.shuffle("shuffle", $(this).attr("data-group"));
                });
        }
    }

    function mobileMenuHide() {
        var windowWidth = $(window).width(), siteHeader = $("#site_header");
        if (windowWidth < 1025) {
            siteHeader.addClass("mobile-menu-hide");
            $(".menu-toggle").removeClass("open");
            setTimeout(function () { siteHeader.addClass("animate"); }, 500);
        } else {
            siteHeader.removeClass("animate");
        }
    }

    function customScroll() {
        var windowWidth = $(window).width();
        if (windowWidth > 1024) {
            $(".animated-section, .single-page-content").each(function () { $(this).perfectScrollbar(); });
        } else {
            $(".animated-section, .single-page-content").each(function () { $(this).perfectScrollbar("destroy"); });
        }
    }

    $(window).on("load",
        function () {
            $(".preloader").fadeOut(800, "linear");
            var ptPage = $(".animated-sections");
            if (ptPage[0]) {
                PageTransitions.init({ menu: "ul.main-menu" });
            }
        }).on("resize",
            function () {
                mobileMenuHide();
                $(".animated-section").each(function () { $(this).perfectScrollbar("update"); });
                customScroll();
            });
    $(document).on("ready",
        function () {
            var movementStrength = 23;
            var height = movementStrength / $(document).height();
            var width = movementStrength / $(document).width();
            $("body").on("mousemove",
                function (e) {
                    var pageX = e.pageX - ($(document).width() / 2);
                    var pageY = e.pageY - ($(document).height() / 2);
                    var newValueX = width * pageX * -1;
                    var newValueY = height * pageY * -1;
                    var elements = $(".lm-animated-bg");
                    elements.addClass("transition");
                    elements.css({
                        "background-position": "calc( 50% + " + newValueX + "px ) calc( 50% + " + newValueY + "px )"
                    });
                    setTimeout(function () { elements.removeClass("transition"); }, 300);
                });
            $(".menu-toggle").on("click",
                function () {
                    $("#site_header").addClass("animate");
                    $("#site_header").toggleClass("mobile-menu-hide");
                    $(".menu-toggle").toggleClass("open");
                });
            $(".main-menu").on("click", "a", function () { mobileMenuHide(); });
            $(".sidebar-toggle").on("click", function () { $("#blog-sidebar").toggleClass("open"); });
            var $portfolioContainer = $(".portfolio-grid");
            $portfolioContainer.imagesLoaded(function () { portfolioInit(this); });
            var $container = $(".blog-masonry");
            $container.imagesLoaded(function () { $container.masonry(); });
            customScroll();
            $(".text-rotation").owlCarousel({
                loop: true,
                dots: false,
                nav: false,
                margin: 0,
                items: 1,
                autoplay: true,
                autoplayHoverPause: false,
                autoplayTimeout: 3800,
                animateOut: "animated-section-scaleDown",
                animateIn: "animated-section-scaleUp"
            });
            $(".testimonials.owl-carousel").owlCarousel({
                nav: true,
                items: 3,
                loop: false,
                navText: false,
                autoHeight: true,
                margin: 25,
                responsive: { 0: { items: 1 }, 480: { items: 1 }, 768: { items: 2 }, 1200: { items: 2 } }
            });
            $(".clients.owl-carousel").imagesLoaded().owlCarousel({
                nav: true,
                items: 2,
                loop: false,
                navText: false,
                margin: 10,
                autoHeight: true,
                responsive: { 0: { items: 2 }, 768: { items: 4 }, 1200: { items: 5 } }
            });
            $(".form-control").val("")
                .on("focusin", function () { $(this).parent(".form-group").addClass("form-group-focus"); }).on(
                    "focusout",
                    function () {
                        if ($(this).val().length === 0) {
                            $(this).parent(".form-group").removeClass("form-group-focus");
                        }
                    });
            $("body").magnificPopup({
                delegate: "a.lightbox",
                type: "image",
                removalDelay: 300,
                mainClass: "mfp-fade",
                image: { titleSrc: "title", gallery: { enabled: true } },
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' +
                        '<div class="mfp-close"></div>' +
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                        '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
                        "</div>",
                    patterns: {
                        youtube: { index: "youtube.com/", id: null, src: "%id%?autoplay=1" },
                        vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                        gmaps: { index: "//maps.google.", src: "%id%&output=embed" }
                    },
                    srcAction: "iframe_src"
                },
                callbacks: { markupParse: function (template, values, item) { values.title = item.el.attr("title"); } }
            });
            //$("#map").googleMap({ zoom: 16 });
            //$("#map").addMarker({ address: "Lahore, Pakistan" });


            var jobStartDate = new Date(Date.UTC(2012, (12 - 1), 11, 9, 0, 0, 0));
            var today = new Date();
            var miliseconds = Math.floor(today - jobStartDate);
            var days = miliseconds / (1000 * 60 * 60 * 24);
            var workHours = Math.round((days / 365) * 240 * 8);

            document.getElementById("workHoursCount").innerHTML = workHours.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;

        });
})(jQuery);