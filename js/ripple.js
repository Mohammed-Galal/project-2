const in__mobile = window.navigator.userAgent.toLowerCase().match(/mobile/i);

const ripple__ele = function(event) {
  "use strict";
  if (this.hasAttribute("disabled")) return;
  //getting the element"s offset position
  const pos = {
    top: this.getBoundingClientRect().top + window.scrollY,
    left: this.getBoundingClientRect().left + window.scrollX
  };
  //get the element's dimentions
  const dimention =
    this.offsetWidth <= this.offsetHeight
      ? this.offsetHeight
      : this.offsetWidth;
  let posX =
    (in__mobile ? event.targetTouches[0].pageX : event.pageX) - pos.left;
  let posY =
    (in__mobile ? event.targetTouches[0].pageY : event.pageY) - pos.top;
  //getting the cursor/touch position
  const top = posY - dimention * 0.5 + "px;";
  const left = posX - dimention * 0.5 + "px;";
  const rippleEl = document.createElement("span");
  rippleEl.className = "ripple-an";
  rippleEl.style.cssText = `width: ${dimention}px; height: ${dimention}px; top: ${top}px; left: ${left}px;`;
  this.appendChild(rippleEl);
  rippleEl.addEventListener(in__mobile ? "touchend" : "mouseup", ripple_fade);
};

function ripple_fade() {
  document.querySelectorAll(".ripple-an").forEach(o => {
    o.style.opacity = 0;
    o.addEventListener("transitionend", () => o.remove());
  });
}

window.onload = function() {
  const ripple_elems = document.querySelectorAll(".ripple");
  ripple_elems.forEach((ele, ind, nod) => {
    ele.addEventListener(in__mobile ? "touchstart" : "mousedown", ripple__ele, {
      passive: true
    });
  });
};

window.addEventListener(in__mobile ? "touchend" : "mouseup", ripple_fade);
// addEventListener(in__mobile ? "touchend" : "mouseup", ripple_fade);

// const data__Spy = document.querySelectorAll("[data-spy]");
