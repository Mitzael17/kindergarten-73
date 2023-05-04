import Swiper, {FreeMode} from "swiper";

Swiper.use([FreeMode])

export function createAchievementsPageSliders() {

    const achievementsYearsSlider = document.querySelector('.achievementsPath');

    if(!achievementsYearsSlider) return;

    const links = [...achievementsYearsSlider.querySelectorAll('.achievementsPath__year')];
    const initialIndex = links.findLastIndex( link => link.classList.contains('active'));

    new Swiper(achievementsYearsSlider, {

        navigation: {
            nextEl: '.slide-button-container-next',
            prevEl: '.slide-button-container-prev'
        },
        slidesPerView: 'auto',
        freeMode: true,
        grabCursor: true,
        initialSlide: initialIndex > 0 ? initialIndex - 1 : 0

    });

}