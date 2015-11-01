(function($){
  "use strict"; // Start of use strict    

  /* Initialization */

  $(window).load(function(){

    // Page loader
    $(".page-loader div").delay(0).fadeOut();
    $(".page-loader").delay(200).fadeOut("slow");

    $(window).trigger("scroll");
    $(window).trigger("resize");

  });

  $(document).ready(function(){

    $(window).trigger("resize");

    init_classic_menu();     
  	init_wishlist();
    init_parallax();      
    init_cart_panel();

    init_to_top();
    init_owl_carousel();
    init_fancybox(); 
    init_accordion(); 
    init_wow();   


  });

  $(window).resize(function(){

    init_classic_menu_resize();
    js_height_init();

  });



  // Sections   
  var pageSection = $("section");
  pageSection.each(function(indx){

    if ($(this).attr("data-background")){
      $(this).css("background-image", "url(" + $(this).data("background") + ")");
    }
    
  });    

  function height_line(height_object, height_donor){
    height_object.height(height_donor.height());
    height_object.css({
      "line-height": height_donor.height() + "px"
    });
  }  


  /* Navigation */    
  function init_classic_menu_resize(){

    // Mobile menu max height
    $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");

    // Mobile menu style toggle
    if ($(window).width() <= 1024) {
      $(".main-nav").addClass("mobile-on");
    }
    else 
      if ($(window).width() > 1024) {
        $(".main-nav").removeClass("mobile-on");
        $(".desktop-nav").show();
      }
  }

  function init_classic_menu(){    

    // Navbar sticky

    $(".js-stick").sticky({
      topSpacing: 0
    });        

    height_line($(".inner-nav ul > li > a"), $(".main-nav"));

    $(".mobile-nav").css({
      "width": $(".main-nav").height() + "px"
    });

    // Transparent menu

    if ($(".main-nav").hasClass("transparent")){
      $(".main-nav").addClass("js-transparent"); 
    }

    $(window).scroll(function(){        

      if ($(window).scrollTop() > 10) {
        $(".js-transparent").removeClass("transparent");
        $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").addClass("small-height");
        $(".preheader").addClass("slide-up");
        $(".breadcrumbs").addClass("slide-up");
      }
      else {
        $(".js-transparent").addClass("transparent");
        $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").removeClass("small-height");
        $(".preheader").removeClass("slide-up");
        $(".breadcrumbs").removeClass("slide-up");
      }


    });

    // Mobile menu toggle

    $(".mobile-nav .nav-toggle").click(function(){

      if ($(".desktop-nav").hasClass("js-opened")) {
        $(".desktop-nav").slideUp("slow", "easeOutExpo").removeClass("js-opened");
        $(this).removeClass("active");
      }
      else {
        $(".desktop-nav").slideDown("slow", "easeOutQuart").addClass("js-opened");
        $(this).addClass("active");
      }

    });

    $(".desktop-nav").find("a:not(.mn-has-sub)").click(function(){
      if ($(".mobile-nav").hasClass("active")) {
        $(".desktop-nav").slideUp("slow", "easeOutExpo").removeClass("js-opened");
        $(".mobile-nav").removeClass("active");
      }
    });


    // Sub menu

    $(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");

    $(".mn-has-sub").click(function(){

      if ($(".main-nav").hasClass("mobile-on")) {
        if ($(this).parent("li:first").hasClass("js-opened")) {
          $(this).parent("li:first").find(".mn-sub:first").slideUp(function(){
            $(this).parent("li:first").removeClass("js-opened");
            $(this).parent("li:first").find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
          });
        }
        else {
          $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
          $(this).parent("li:first").addClass("js-opened");
          $(this).parent("li:first").find(".mn-sub:first").slideDown();
        }

        return false;
      }

    });

    $(".mn-has-sub").parent("li").hover(function(){

      if (!($(".main-nav").hasClass("mobile-on"))) {

        $(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
      }

    }, function(){

      if (!($(".main-nav").hasClass("mobile-on"))) {

        $(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
      }

    });

  }

  /* Cart panel */
  function init_cart_panel(){

    //open the cart panel
    $('.cart-btn').on('click', function(event){
      event.preventDefault();
      $('.cart-panel').addClass('is-visible');
    });
    //close the cart panel
    $('.cart-panel').on('click', function(event){
      if( $(event.target).is('.cart-panel') ) { 
        $('.cart-panel').removeClass('is-visible');
        event.preventDefault();
      }
    });

  }
  
  

  /* To top */
  function init_to_top(){

    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
      ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
      if( $(this).scrollTop() > offset_opacity ) { 
        $back_to_top.addClass('cd-fade-out');
      }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
        scrollTop: 0 ,
      }, scroll_top_duration
                            );
    });

  }


})(jQuery); // End of use strict


/* Wish List */
function init_wishlist(){
  $("button.add-wishlist").click(function(e){
    e.preventDefault();
    var d = $(this).parent();
    $.ajax({
      type:"POST",
      url:"/contact",
      data:d.serialize(),
      beforeSend:function(){

      },
      success:function(n){
        d.html('<a class="add-wishlist" href="/pages/wish-list"><i class="fa fa-heart"></i></a>');
        if (!!$.prototype.fancybox)
          $.fancybox.open([{
            type: 'inline',
            autoScale: true,
            minHeight: 30,
            content: '<p class="fancybox-error">' + 'Added to your wishlist.' + '</p>',
            helpers: {
              overlay: {
                locked: false
              }
            }
          }], {
            padding: 0
          });
        else
          alert('added to wishlist');
      },
      error:function(){

      }
    })
  });
}


/* Parallax */    
function init_parallax(){

  $window = $(window);
  $('section[data-type="background"]').each(function(){
    var $bgobj = $(this);
    $(window).scroll(function() {

      var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
      var coords = '50% '+ yPos + 'px';

      $bgobj.css({ backgroundPosition: coords });

    });
  });	

}

/* Owl Carousel */
function init_owl_carousel(){
  (function($){
    "use strict";

    // Fullwidth slider
    $(".fullwidth-slider").owlCarousel({ 
      slideSpeed: 350,
      autoPlay: 5000,
      singleItem: true,
      navigation: true,
      navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });             

    // Product slider
    var owl = $(".product-slider");
    owl.owlCarousel({
      slideSpeed: 500,
      autoPlay: false,
      pagination: false            
    });
    $(".go-right").click(function(){
      owl.trigger('owl.next');
    })
    $(".go-left").click(function(){
      owl.trigger('owl.prev');
    })  

    /* Product images slider */
    $("#product-images").owlCarousel({  
      singleItem: true,
      slideSpeed: 1000,
      autoHeight: true,
      navigation: true,
      navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      pagination: false
    }); 

    /* Production slider */
    $("#production-images").owlCarousel({  
      slideSpeed: 1000,
      autoHeight: true,
      navigation: true,
      navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      pagination: false
    });



  })(jQuery);
};

/* Fancybox */
function init_fancybox(){
  (function($){        

    $(".fancybox").fancybox({
      afterShow: function () {
        $(".fancybox-inner").contents().find("input.form-control:first").attr("tabindex",1).focus();
      },
      helpers: {
        overlay: {
          locked: false
        },
        media: {}
      }
    }); 

  })(jQuery);
};  

/* Accordion */
function init_accordion(){

  var allToggles = $(".accordion > dd").hide();
  allToggles.first().slideDown();

  $(".accordion > dt > a").click(function(){

    if ($(this).hasClass("active")) {

      $(this).parent().next().slideUp();
      $(this).removeClass("active");

    }
    else {
      var current = $(this).parent().next("dd");
      $(this).addClass("active");
      $(this).parent().next().slideDown();
    }

    return false;
  });

};         

/* Height 100% */
function js_height_init(){
  (function($){
    $(".js-height-full").height($(window).height() * 1.0);
    $(".js-height-parent").each(function(){
      $(this).height($(this).parent().first().height());
    });
  })(jQuery);
}

/* WOW animations */
function init_wow(){
  (function($){    

    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 90,
      mobile: false, 
      live: true 
    });

    if ($("body").hasClass("appear-animate")){
      wow.init(); 
    }        

  })(jQuery);
}


/* Swatch */
function updatePricing() {}

$(document).ready(function(){
  $(".swatch :radio").change(function() {
    var t = $(this).closest(".swatch").attr("data-option-index");
    var n = $(this).val();
    $(this).closest("form").find(".single-option-selector").eq(t).val(n).trigger("change")
  });
});








