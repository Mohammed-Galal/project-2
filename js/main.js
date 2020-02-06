$(function () {
  'use strict'

  // =======================  NAVBAR  =========================

  var scrolled = function () {
    $('section,#home').each(function () {
      if ($(window).scrollTop() >= $(this).offset().top) {
        $('[data-scroll-target=' + $(this).attr('id') + ']').parent().addClass('active').siblings().removeClass('active');
      } else {
        $('[data-scroll-target=' + $(this).attr('id') + ']').parent().removeClass('active');
      }
    });
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