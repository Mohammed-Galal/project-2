$(function () {
    'use strict';

    $('.ripple').each(function () {
        $(this).addClass('ripple-req');
    });

    //creating a style object for the ripple effect
    function RippleStyle(width, height, posX, posY) {
        this.width = (width <= height) ? height : width;
        this.height = (width <= height) ? height : width;
        this.top = posY - (this.height * 0.5);
        this.left = posX - (this.width * 0.5);
    };

    $('.ripple').on('touchstart mousedown', function (e) {
        //appending an element with a class name "btn-ripple"
        var rippleEl = $('<span class="ripple-an"></span>').appendTo(this);

        //getting the button's offset position
        var pos = $(this).offset();

        //get the button's width and height
        var width = $(this).outerWidth();
        var height = $(this).outerHeight();

        if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
            var posX = e.targetTouches[0].pageX - pos.left;
            var posY = e.targetTouches[0].pageY - pos.top;
        } else {
            var posX = e.pageX - pos.left;
            var posY = e.pageY - pos.top;
        }

        var rippleStyle = new RippleStyle(width, height, posX, posY);
        rippleEl.css(rippleStyle);
    });

    // mousemove mouseleave mouseout 
    $('.ripple').on('mouseup touchend touchcancel', '.ripple-an', function () {
        $(this).fadeOut(400, () => {
            $(this).remove()
        });
    });

    $('.ripple').on('touchmove blur focusout', function () {
        $('.ripple-an').fadeOut(400, () => {
            $('.ripple-an').remove()
        });
    });
});