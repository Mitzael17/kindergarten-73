export function createLazyLoad() {

    const images = document.querySelectorAll('img');

    images.forEach( image => {

        image.addEventListener('load', () => {

            if(!image.nextElementSibling?.classList.contains('swiper-lazy-preloader')) return;

            image.nextElementSibling.remove();

        })

    })

}