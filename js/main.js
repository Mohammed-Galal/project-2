$(function () {
  'use strict'

  const ripples = '.avatar-icon, .btn,.navbar-toggler'
  //creating a style object for the ripple effect
  function RippleStyle(width, height, posX, posY) {
    this.width = (width <= height) ? height : width;
    this.height = (width <= height) ? height : width;
    this.top = posY - (this.height * 0.5);
    this.left = posX - (this.width * 0.5);
  }

  if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
    $(ripples).on('touchstart', function (e) {

      //appending an element with a class name "btn-ripple"
      var rippleEl = $('<span class="ripple-an"></span>').appendTo(this);

      //getting the button's offset position
      var pos = $(this).offset();

      //get the button's width and height
      var width = $(this).outerWidth();
      var height = $(this).outerHeight();

      var posX = e.targetTouches[0].pageX - pos.left;
      var posY = e.targetTouches[0].pageY - pos.top;

      var rippleStyle = new RippleStyle(width, height, posX, posY);
      rippleEl.css(rippleStyle);
    });
  } else {
    $(ripples).on('mousedown', function (e) {

      //appending an element with a class name "btn-ripple"
      var rippleEl = $('<span class="ripple-an"></span>').appendTo(this);

      //getting the button's offset position
      var pos = $(this).offset();

      //get the button's width and height
      var width = $(this).outerWidth();
      var height = $(this).outerHeight();

      var posX = e.pageX - pos.left;
      var posY = e.pageY - pos.top;

      var rippleStyle = new RippleStyle(width, height, posX, posY);
      rippleEl.css(rippleStyle);
    });
  }

  $(ripples).on('mouseup mouseleave mouseout touchend blur focusout', '.ripple-an', function () {
    $(this).fadeOut(400, () => {
      $(this).remove()
    });
    setTimeout(() => {
      $(this).fadeOut(400, () => {
        $(this).remove()
      });
    }, 10);
  });

  $(ripples).blur(function () {
    $('.ripple-an').fadeOut(400, () => {
      $('.ripple-an').remove()
    });
  })


  // =======================  NAVBAR  =========================

  var scrolled = function () {
    $('section,#home').each(function () {
      if ($(window).scrollTop() >= $(this).offset().top) {
        $('[data-scroll-target=' + $(this).attr('id') + ']').parent().addClass('active').siblings().removeClass('active');
      } else {
        $('[data-scroll-target=' + $(this).attr('id') + ']').parent().removeClass('active');
      }
    });

    if ($(".navbar").offset().top > $('.navbar').height()) {
      $(".navbar").addClass("bg-dark");
    } else {
      $(".navbar").removeClass("bg-dark");
    }
  };
  // Collapse now if page is not at top
  scrolled();
  // Collapse the navbar when page is scrolled
  $(window).scroll(scrolled);

  $('[data-scroll-target]').click(function (e) {
    e.preventDefault();
    $('html, body').scrollTop($('#' + $(this).attr('data-scroll-target')).offset().top);
  });

  $('.nav-item').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });


});