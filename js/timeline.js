
"use strict";

function qs(selector, all = false) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

const sections = qs('.section', true);
const timeline = qs('.timeline');
const line = qs('.line');
line.style.bottom = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * .8;

function scrollHandler(e) {
  const {
    scrollY
  } = window;
  up = scrollY < prevScrollY;
  down = !up;
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect(); // const lineHeight = lineRect.bottom - lineRect.top;

  const dist = targetY - timelineRect.top;
  //console.log(dist);

  //set line top to first section
  line.style.top = `10px`;

  //set line according to scroll
  if (dist > 0) {
    line.style.bottom = `calc(100% - ${dist}px)`;
  } else {
    line.style.bottom = `calc(100% - 20px)`;
  }

  sections.forEach(item => {
    //console.log(item);
    const rect = item.getBoundingClientRect(); //console.log(rect);

    if (rect.top + item.offsetHeight / 5 < targetY) {
      item.classList.add('show-me');
    } else {
      item.classList.remove('show-me'); // Remove the class if not in the viewport
    }
  }); // console.log(up, down);

  prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler);