// set the starting position of the cursor outside of the screen




$("#homeNav").on("click", function () {
    $("#active").click()
});

$("input, textarea").bind('keypress', function (e) {
    e.stopPropagation();
})



$(document).on("keypress", function (e) {

    var key = e.key
    if (key === 'a') {
        $("#active").click()
    }


})


const container = document.querySelector('.slider');
const slider = document.querySelector('.slider__slides');
const slides = document.querySelectorAll('.slider__slide');
const prevBtn = document.querySelector('.slider__button--prev');
const nextBtn = document.querySelector('.slider__button--next');
const numSlides = slides.length;


let slideWidth = slides[0].offsetWidth;
let slideMarginRight = parseInt(getComputedStyle(slides[0]).marginRight);
let moveX = slideWidth + slideMarginRight;


const firstClone = slides[0].cloneNode(true);
const lastClone = slides[numSlides - 1].cloneNode(true);

firstClone.setAttribute('id', 'first-clone');
lastClone.setAttribute('id', 'last-clone');

slider.appendChild(firstClone);
slider.prepend(lastClone);

const allSlides = document.querySelectorAll('.slider__slide');


slider.style.transform = `translateX(${-moveX}px)`;

let counter = 1;

nextBtn.addEventListener('click', () => {
    counter++;
    slider.style.transition = 'transform 0.5s ease-in-out, opacity 0.2s';
    slider.style.transform = `translateX(${-(moveX * counter)}px)`;
    if (counter >= allSlides.length) counter = numSlides;
    console.log(counter);
});

prevBtn.addEventListener('click', () => {
    counter--;
    slider.style.transition = 'transform 0.5s ease-in-out, opacity 0.2s';
    slider.style.transform = `translateX(${-(moveX * counter)}px)`;
    if (counter < 0) counter = 0
});

slider.addEventListener('transitionend', () => {
    if (allSlides[counter].id === 'first-clone') {
        slider.style.transition = 'none';
        counter = 1;
        slider.style.transform = `translateX(${-(moveX * counter)}px)`;
    }

    if (allSlides[counter].id === 'last-clone') {
        slider.style.transition = 'none';
        counter = numSlides;
        slider.style.transform = `translateX(${-(moveX * counter)}px)`;
    }
});

window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth;
    slideMarginRight = parseInt(getComputedStyle(slides[0]).marginRight);
    moveX = slideWidth + slideMarginRight;
    slider.style.transition = 'none';
    slider.style.transform = `translateX(${-(moveX * counter)}px)`;
});

// SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

// Animasi Home
sr.reveal('.home-text', {})
sr.reveal('#hero button', {
    delay: 200
})
sr.reveal('#hero img', {
    delay: 1000
})

// Animasi About
sr.reveal('#about img', {
    delay: 500
})
sr.reveal('#about p', {
    delay: 300
})
sr.reveal('#about h1', {
    delay: 400
})

// Animasi Skills
sr.reveal('#feature h1', {})
sr.reveal('#feature p', {
    distance: '20px',
    delay: 50,
    interval: 100
})
sr.reveal('#feature figcaption', {
    distance: '20px',
    delay: 50,
    interval: 100
})
sr.reveal('#feature img', {
    delay: 400
})

sr.reveal('#contact h1', {})
sr.reveal('#contact button', {
    delay: 400
})
sr.reveal('input', {
    delay: 200
})
sr.reveal('textarea', {
    delay: 300
})


// Animasi Contact
sr.reveal('#profile img', {})
sr.reveal('#profile h3', {})

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #814BD7 }";
    document.body.appendChild(css);
};