"use strict";
var stars = document.querySelectorAll(".star");
var body = document.querySelector("body");
var mouseEvents = [stars[0], stars[1], stars[2], stars[3], stars[4]];
var mouseOvers = [0];
var clickEvents = [];
var clicked = false;

// Lanzamiento de Event Listeners
function fireEvents() {
  stars.forEach(star => {
    star.addEventListener("mouseenter", mouseFill);
    star.addEventListener("click", remover);
    star.addEventListener("touchstart", mouseFill);
  });
}
// Lanzamiento listener fuera del star-container
document.addEventListener("click", function(event) {
  if (!event.target.closest(".star-container")) {
    reset();
  } else {
    return;
  }
});

// función reset para resetear formulario al clickar fuera del star-container
function reset() {
  mouseOvers = [0];
  clickEvents = [];
  clicked = false;

  stars.forEach(star => star.classList.remove("fill"));
  fireEvents();
}

// ##### Mouse Filling #### //
// Usamos una función para llenar estrellas (fillLeft) y otra para vaciar (emptyRight) mediante evento mouseover
function fillLeft(id) {
  for (let i = 0; i <= id; i++) {
    stars[i].classList.add("fill");
  }
}

function emptyRight(id) {
  for (let i = 4; i >= id; i--) {
    stars[i].classList.remove("fill");
  }
}

function mouseFill() {
  var element = event.target;
  var id = parseInt(this.id);
  mouseOvers.unshift(id);
  for (let i = 0; i <= id; i++) {
    if (mouseOvers[1] < id) {
      fillLeft(id);
    } else {
      emptyRight(id + 1);
    }
  }
}

// #### Mouse Clicking #### //

function cleanStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("fill");
  }
}

function clickFill(id) {
  clickEvents.unshift(id);
  cleanStars();
  for (let i = 0; i <= id; i++) {
    stars[i].classList.add("fill");
  }
}

function remover() {
  var element = event.target;
  var id = parseInt(this.id);
  for (let i = 0; i < stars.length; i++) {
    if (!clicked) {
      mouseEvents[i].removeEventListener("mouseenter", mouseFill);
    } else {
      clickFill(id);
    }
  }
  clicked = true;
}

document.addEventListener("DOMContentLoaded", fireEvents);
