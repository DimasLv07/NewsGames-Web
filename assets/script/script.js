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



