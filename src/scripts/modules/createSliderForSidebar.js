import Swiper, {FreeMode} from "swiper";

Swiper.use([FreeMode]);

export function createSliderForSidebar() {

    const sidebarLinks = document.querySelector('.sidebar')?.querySelector('.sidebar__links');

    if(!sidebarLinks) return;

    new Swiper(sidebarLinks, {
        slidesPerView: "auto",
        freeMode: true,
        breakpoints: {
            901: {
                enabled: false
            }
        }
    })

}