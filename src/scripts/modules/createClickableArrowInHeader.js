export function createClickableArrowInHeader() {

    const header_menu = document.querySelector('.header__menu');

    if(!header_menu) return;

    const links = header_menu.querySelectorAll('.link');

    links.forEach( link => {

        const arrow = link.querySelector('.select-list__arrow');

        if(!arrow) return;

        arrow.addEventListener('click', (event) => {

            if(window.innerWidth > 900) return;

            event.preventDefault();
            return false;

        })

    })

}