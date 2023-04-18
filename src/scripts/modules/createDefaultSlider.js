import Swiper from "swiper";

export function createDefaultSlider() {

    const sliders = document.querySelectorAll('.defaultSlider');

    sliders.forEach( slider => {

        new Swiper(slider, {

            navigation: {
                nextEl: '.slide-button-container-next',
                prevEl: '.slide-button-container-prev'
            },
            slidesPerView: 'auto',

        });

    });

}