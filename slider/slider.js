"use strict";

function Slider(selector, option = {}) {
    this.sliderEl = document.querySelector(selector);
    if (!this.sliderEl) {
        throw new Error('wrong selector');
    }
    this.slides = document.querySelectorAll('div.slider-item');
    this.idx = 0;
    this.width = option.width ?? 1080;
    this.height = option.height ?? 720;
}

Slider.prototype.init = function () {
    this.sliderEl.style.width = `${this.width}px`;
    this.sliderEl.style.height = `${this.height}px`;

    const firstImg = this.slides[this.idx].querySelector('img');

    const leftArrow = document.createElement('i');
    leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
    this.sliderEl.append(leftArrow);

    const rightArrow = document.createElement('i');
    rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
    this.sliderEl.append(rightArrow);
    const run = () => {
        leftArrow.addEventListener('click', () => {
           this.prev();
        });
        rightArrow.addEventListener('click', () => {
            this.next();
        });
        this.slides[this.idx].classList.remove("hidden-slide");
    };
    if (firstImg.complete) {
        run();
        return;
    }
    const loadIcon = document.createElement('i');
    loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
    this.sliderEl.append(loadIcon);

    firstImg.addEventListener("load", () => {
        loadIcon.remove();
        run();
    });
};
Slider.prototype.prev=function (){
    this.slides[this.idx].classList.add('hidden-slide');
    if (this.idx === 0) {
        this.idx = this.slides.length - 1;
    } else {
        this.idx--;
    }
    this.slides[this.idx].classList.remove('hidden-slide');
}

Slider.prototype.next=function (){
    this.slides[this.idx].classList.add("hidden-slide");
    if (this.idx === this.slides.length - 1) {
        this.idx = 0;
    } else {
        this.idx++;
    }
    this.slides[this.idx].classList.add('hidden-slide');
}