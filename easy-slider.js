/**
 * Created by neomurderer on 3/17/17.
 */

class EasySlider {
    constructor(config = {}) {
        this.config = {
            el: '#defaultId',
            slideEl: '.slide',
            buttons: {
                next: '.slide-right',
                prev: '.slide-left'
            }
        };

        // TODO merge config vars

        Object.assign(this.config, config);

        this.initSlider();
        this.initListeners();

    }

    initSlider() {
        // Parse el body and init slides variable

        var config = this.config;

        var slides = [];

        this.slider = $(config.el);
        if (!this.slider.length) {
            throw(`Slider element ${config.el} not found`);
        }
        this.slider.addClass('easy-slider');
        this.slider.find(config.slideEl).each(function (index,slideElement) {
            $(slideElement).hide(); // Hide all slides by default
            console.log(slideElement);
            slides.push(slideElement);
        });

        this.slides = slides;
        this.currentSlide = 0;

        this.setupSlide(0);
    }

    initListeners() {
        var config = this.config;

        var nextSlideButton = $(config.buttons.next);
        var prevSlideButton = $(config.buttons.prev);

        // if(!nextSlideButton.length) { return `Next button element ${config.buttons.next} not found`;}
        // if(!prevSlideButton.length) { return `Prev button element ${config.buttons.prev} not found`;}

        nextSlideButton.on('click',() => {
            this.setupNextSlide();
        });
        prevSlideButton.on('click',() => {
            this.setupPrevSlide();
        });

    }

    setupNextSlide() {
        var currentSlide = this.currentSlide;
        var slideCount = this.slides.length;
        var nextSlide;
        if (currentSlide === slideCount -1) {
            nextSlide = 0;
        } else {
            nextSlide = ++currentSlide;
        }
        this.setupSlide(nextSlide);
    }

    setupPrevSlide() {
        var currentSlide = this.currentSlide;
        var slideCount = this.slides.length;
        var prevSlide;
        if (currentSlide === 0) {
            prevSlide = slideCount -1;
        } else {
            prevSlide = --currentSlide;
        }
        this.setupSlide(prevSlide);
    }
    setupSlide(slideIndex) {

        var $currentSlide = $(this.slides[this.currentSlide]);
        var $nextSlide = $(this.slides[slideIndex]);

        // TODO setup awesome animation. Later
        $currentSlide.hide();
        $nextSlide.show();

        // Update current slide index
        this.currentSlide = slideIndex;
    }
}

