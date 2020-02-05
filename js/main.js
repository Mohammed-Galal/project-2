$(function () {
  'use strict'

  var ripples = '.avatar-icon, .btn,.navbar-toggler'
  //creating a style object for the ripple effect
  function RippleStyle(width, height, posX, posY) {
    this.width = (width <= height) ? height : width;
    this.height = (width <= height) ? height : width;
    this.top = posY - (this.height * 0.5);
    this.left = posX - (this.width * 0.5);
  }

  $(ripples).on('mousedown', function (e) {
    //appending an element with a class name "btn-ripple"

    // $('.btn-ripple.active').remove();
    var rippleEl = $('<span class="ripple-an"></span>').appendTo(this);

    //getting the button's offset position
    var pos = $(this).offset();

    //get the button's width and height
    var width = $(this).outerWidth();
    var height = $(this).outerHeight();

    //get the cursor's x and y position within the button
    var posX = e.pageX - pos.left;
    var posY = e.pageY - pos.top;

    //adding a css style to the ripple effect
    var rippleStyle = new RippleStyle(width, height, posX, posY);
    rippleEl.css(rippleStyle);
  });

  //this event listener will be triggered once the ripple animation is done
  $(ripples).on('mouseup click mouseout', '.ripple-an', function () {
    $(this).fadeOut(400, () => {
      $(this).remove()
    });
    setTimeout(() => {
      $(this).fadeOut(400, () => {
        $(this).remove()
      });
    }, 10);
  });

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