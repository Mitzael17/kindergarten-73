export function createFixedHeader(handlerMenuClick) {

    const headerContainer = document.querySelector('header');
    const header = document.querySelector('#header-container');
    const needScrollTopToFixed = 400;
    const burgerList = header.querySelector('.header__burgerList');

    if(!header) {

        console.log('Не найдена шапка сайта!')
        return;

    }

    const headerStates = new Proxy({isFixed: false, isHide: false}, {

        set(target, prop, state) {

            if(prop === 'isFixed') {

                target[prop] = state;

                if(state) {

                    headerContainer.style.height = headerContainer.offsetHeight + 'px';

                    header.classList.add('fixed');

                    return true;
                }

                header.classList.remove('fixed');
                headerContainer.style.height = null;

                return true;

            }

            if(prop === 'isHide') {

                target[prop] = state;

                if(state) {

                    header.classList.add('hide');

                    if(burgerList.classList.contains('active')) handlerMenuClick();

                    return true;

                }

                header.classList.remove('hide');

                return true;

            }



        }

    })

    let prevScrollTop = document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {

        const currentScrollTop = document.documentElement.scrollTop;

        if(currentScrollTop > needScrollTopToFixed && !headerStates.isFixed) headerStates.isFixed = true;
        if(currentScrollTop < needScrollTopToFixed && headerStates.isFixed) headerStates.isFixed = false;

        if(currentScrollTop < prevScrollTop - 10 && headerStates.isHide) {

            headerStates.isHide = false;

            prevScrollTop = currentScrollTop

            return;

        }

        if(!headerStates.isHide && currentScrollTop > prevScrollTop + 10) {

            headerStates.isHide = true;

        }

        prevScrollTop = currentScrollTop;

    })

}