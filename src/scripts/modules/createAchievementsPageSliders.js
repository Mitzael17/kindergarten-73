import Swiper, {FreeMode} from "swiper";

Swiper.use([FreeMode])

export function createAchievementsPageSliders() {

    const achievementsYearsSlider = document.querySelector('.achievementsPath');
    const achievementsItemsSlider = document.querySelector('.achievementsItems');

    if(!achievementsYearsSlider || !achievementsItemsSlider) return;

    const links = [...achievementsYearsSlider.querySelectorAll('.achievementsPath__year')];
    const gallerySliders = [...document.querySelectorAll('.achievementsPageSlider')];

    if(links.length === 0) {

        console.log('Не найдены элементы пагинации для слайдера достижений');
        return;

    }

    if(links.length !== gallerySliders.length) {

        console.log(`Количество слайдов и пунктов пагинации не совпадает. Пагинация - ${links.length}. Слайдеры - ${gallerySliders.length}`)
        return;

    }

    new Swiper(achievementsYearsSlider, {

        navigation: {
            nextEl: '.slide-button-container-next',
            prevEl: '.slide-button-container-prev'
        },
        slidesPerView: 'auto',
        freeMode: true,

    });

    const achievementsSwiper = new Swiper(achievementsItemsSlider, {
        allowTouchMove: false,
        speed: 1000,
        autoHeight: true
    });

    // ----------------

    changeSlide(links.findLast(link => link.classList.contains('active')) ?? links[0])

    links.forEach( (link) => {

        const span = link.querySelector('span');

        if(!span) {

            console.log('Пункт пагинации должен иметь span атрибут')
            return;

        }

        span.addEventListener('click', () => {

            changeSlide(link);

        })

    } )

    //-----

    gallerySliders.forEach( slider => initLazyLoading(slider));


    function initLazyLoading(slider) {

        const button = slider.querySelector('.button');
        const limitOpen = 20;

        if(!button) {

            console.log('Не найдена кнопка для ленивой загрузки!');
            return;

        }

        let hiddenSliders = [...slider.querySelectorAll('.achievementsItem')].filter( item => !item.classList.contains('active'));

        button.addEventListener('click', () => {

            for( let index = 0; index < limitOpen; index++ ) {

                const element = hiddenSliders[index];

                if(element === undefined) break;

                element.style.display = 'block';



                setTimeout(() => {

                    element.classList.add('active');

                }, 20)

            }

            hiddenSliders = hiddenSliders.slice(limitOpen);
            achievementsSwiper.update();

            if(hiddenSliders.length === 0) button.style.display = 'none';

        });

    }

    function changeSlide(newSlideYear) {

        const activeSlideIndex = links.indexOf(newSlideYear);

        links.forEach( (slide, index) => {

            if(index > activeSlideIndex) {

                slide.classList.remove('active');
                return;

            }

            slide.classList.add('active');

            if(index === activeSlideIndex) {

                achievementsSwiper.slideTo(activeSlideIndex);

            }

        });

    }


}