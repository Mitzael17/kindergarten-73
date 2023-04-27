import Swiper, {Navigation} from "swiper";
Swiper.use([Navigation])

export function createCollectiveSliders() {

    const sliders = document.querySelectorAll('.collective__slider');

    sliders.forEach( slider => {

        new Swiper(slider, {

            navigation: {
                nextEl: '.slide-button-container-next',
                prevEl: '.slide-button-container-prev'
            },
            slidesPerView: 'auto',
            resizeObserver: true

        });

        const sliderCoords = slider.getBoundingClientRect();
        const slides = [...slider.querySelectorAll('.collectiveSlide')];

        let pointer = 0;

        let shouldMove = isShouldMove();

        let timerForResize;

        window.addEventListener('resize', () => {

            clearTimeout(timerForResize);
            timerForResize = setTimeout(() => shouldMove = isShouldMove(), 3000);

        });

        slides.at(-1).addEventListener('pointerenter', () => {

            if(pointer++ > 0 || window.innerWidth <= 800 || !shouldMove) return;

            slides.forEach( slide => slide.classList.add('move'))

        });

        slides.at(-1).addEventListener('pointerleave', () => {

            if(--pointer > 0 || window.innerWidth <= 800) return;

            slides.forEach( slide => slide.classList.remove('move'));

        })

        function isShouldMove() {

            const slide = slides.at(-1);
            const coords = slide.getBoundingClientRect();
            const imgWidth = slide.querySelector('.collectiveSlide__img')?.offsetWidth ?? 0;
            const contentWidth = slide.querySelector('.collectiveSlide__content')?.offsetWidth ?? 0;

            return coords.x - sliderCoords.x + imgWidth + contentWidth > slider.offsetWidth;

        }

    })


}