import {outClick} from "../functions/outClick.js";

export function createBurger() {

    const burgerWrapper = document.querySelector('#burger');

    if(!burgerWrapper) return () => {};

    const burger = burgerWrapper.querySelector('.header__burgerMenu');
    const menu = burgerWrapper.querySelector('.header__burgerList');

    const desktopMenu = document.querySelector('.header__menu').querySelector('ul');

    const links = [...desktopMenu.children].map( link => {

        return {
            inHeader: true,
            node: link
        }

    }).reverse();

    const header = document.querySelector('.header');
    const headerContent = header.querySelector('.header__content');

    let isOpen = false;

    burgerWrapper.addEventListener('click', event => event.stopPropagation());
    burger.addEventListener('click', handlerClick);
    outClick(burger, () => isOpen && handlerClick());

    window.addEventListener('resize', handlerResize);
    handlerResize();

    return handlerResize;

    function handlerClick() {

        isOpen = !isOpen;

        if(isOpen) {

            menu.classList.add('active');
            burger.classList.add('active');
            return;

        }

        menu.classList.remove('active');
        burger.classList.remove('active');

    }

    function handlerResize() {

        if(headerContent.offsetWidth > header.offsetWidth) {

            while(headerContent.offsetWidth > header.offsetWidth) {

                const linkId = links.findIndex( link => link.inHeader);

                if(linkId === -1) break;

                links[linkId].inHeader = false;
                links[linkId].node.style.display = 'none';

            }

            return;

        }

        let linkId = links.findLastIndex( link => !link.inHeader);

        while(linkId !== -1) {

            links[linkId].node.style.display = null;

            if(headerContent.offsetWidth > header.offsetWidth) {

                links[linkId].node.style.display = 'none';
                break;

            }

            links[linkId].inHeader = true;

            linkId = links.findLastIndex( link => !link.inHeader);

        }



    }

}