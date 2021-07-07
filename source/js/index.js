const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");
const slider = document.querySelector('.slider__wrap');
const thumb = slider.querySelector('.thumb');
const progressBar= slider.querySelector('.progress');

thumb.ondragstart = function() {
  return false;
};

thumb.addEventListener('mousedown', (e) => {
  e.preventDefault();

  let shiftX = e.clientX - thumb.getBoundingClientRect().left;

  const onMouseMove = (event) => {
    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = slider.offsetWidth - 23;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumb.style.left = newLeft + 'px';
    progressBar.style.clip = `rect(auto, ${newLeft}px, auto, auto)`;
  }

  const onMouseUp = () => {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

nav.classList.remove("nav--nojs");

navToggle.addEventListener("click", function() {
  if (nav.classList.contains("nav--closed")) {
      nav.classList.remove("nav--closed");
      nav.classList.add("nav--opened");
  } else {
    nav.classList.add("nav--closed");
    nav.classList.remove("nav--opened");
  }
});
