import Swiper, {Navigation} from "swiper";
import {outClick} from "../functions/outClick.js";
Swiper.use([Navigation])

export function createCollectiveSliders() {

    const sliders = document.querySelectorAll('.collective__slider');

    sliders.forEach( slider => {

        const swiper = new Swiper(slider, {

            navigation: {
                nextEl: '.slide-button-container-next',
                prevEl: '.slide-button-container-prev'
            },
            slidesPerView: 'auto',
            resizeObserver: true

        });

        const slides = [...slider.querySelectorAll('.collectiveSlide')];

        let pointer = 0;

        slides.at(-1).addEventListener('pointerenter', () => {

            if(pointer++ > 0) return;

            slides.forEach( slide => slide.classList.add('move'))

        });

        slides.at(-1).addEventListener('pointerleave', () => {

            if(--pointer > 0) return;

            slides.forEach( slide => slide.classList.remove('move'));

        })

        slides.at(-1).addEventListener('click', (event) => {

            slides.at(-1).classList.toggle('active');

            if(slides.at(-1).classList.contains('active')) {

                slides.forEach( slide => slide.classList.add('move'))
                return;

            }

            slides.forEach( slide => slide.classList.remove('move'))
            pointer--

        })

        outClick(slides.at(-1), () => {

            slides.at(-1).classList.remove('active');
            slides.forEach( slide => slide.classList.remove('move'))

        })

    })

}