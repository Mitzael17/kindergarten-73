import Swiper, {FreeMode} from "swiper";

Swiper.use([FreeMode]);

export function createSliderForSidebar() {

    const sidebarLinks = document.querySelector('.sidebar')?.querySelector('.sidebar__links');

    if(!sidebarLinks) return;

    const currentLinkIndex = [...sidebarLinks.querySelectorAll('.sidebar__item')]?.findIndex( link => link.classList.contains('active'));

    new Swiper(sidebarLinks, {
        slidesPerView: "auto",
        freeMode: true,
        breakpoints: {
            901: {
                enabled: false
            }
        },
        initialSlide: currentLinkIndex !== -1 ? currentLinkIndex : 0
    })


}