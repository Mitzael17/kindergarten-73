export function createClickableArrowInHeader() {

    const header_menu = document.querySelector('.header__menu');

    if(!header_menu) return;

    const backLink = header_menu.querySelector('.header__burgerBack');
    const backLinkSpan = backLink.querySelector('span');

    const anchor = header_menu.querySelector('.header__burgerAnchor');

    const mainContent = header_menu.querySelector('.header__mainContent');
    const logo = backLink.parentElement.querySelector('.logo');

    const links = header_menu.querySelectorAll('.link');
    const breadcrumbs = [];

    backLink.addEventListener('click', handlerBackClick);

    links.forEach( link => {

        const arrow = link.querySelector('.select-list__arrow');

        if(!arrow) return;

        const container = arrow.closest('.header__linkWithSublist');
        const textLink = arrow.previousSibling.textContent;
        const wrapper = container.querySelector('.header__sublistWrapper');
        const list = wrapper.querySelector('.header__sublist');

        wrapper.addEventListener('transitionend', (event) => {

            if(!wrapper.classList.contains('active') || event.propertyName !== 'transform') return;

            if(breadcrumbs.length === 1) {

                mainContent.classList.add('hide');
                return;

            }

            breadcrumbs.at(-2).list.classList.add('hide');

        })

        arrow.addEventListener('click', (event) => {

            if(window.innerWidth > 1000) return;

            event.preventDefault();

            wrapper.classList.add('active');

            breadcrumbs.push({wrapper, list, text: textLink});
            backLinkSpan.innerHTML = textLink;

            backLink.style.display = 'flex';
            logo.style.display = 'none';

            anchor.scrollIntoView({block: 'start', behavior: 'smooth'});

        })

    })


    function handlerBackClick() {

        if(breadcrumbs.length === 0) return;
        breadcrumbs.at(-1).wrapper.classList.remove('active');

        breadcrumbs.pop();

        if(breadcrumbs.length !== 0) {

            backLinkSpan.innerHTML = breadcrumbs.at(-1).text;
            breadcrumbs.at(-1).list.classList.remove('hide');

            return;

        }

        backLinkSpan.innerHTML = '';
        backLink.style.display = 'none';
        logo.style.display = null;
        mainContent.classList.remove('hide');

    }

}