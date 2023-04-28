export function createFixedHeader() {

    const headerContainer = document.querySelector('header');
    const header = document.querySelector('#header-container');
    const needScrollTopToFixed = 400;
    
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

                    return true;

                }

                header.classList.remove('hide');

                return true;

            }



        }

    })

    let prevWidth = window.innerWidth;
    let prevScrollTop = document.documentElement.scrollTop;

    if(prevWidth <= 480 && document.documentElement.scrollTop > needScrollTopToFixed) {

        headerStates.isFixed = true;

    }

    window.addEventListener('resize', () => {

        if(prevWidth === window.innerWidth) return;

        prevWidth = window.innerWidth;

        if(window.innerWidth > 480 && headerStates.isFixed) {

            headerStates.isFixed = false;
            return;

        }

        if(window.innerWidth <= 480 && document.documentElement.scrollTop > needScrollTopToFixed && !headerStates.isFixed) headerStates.isFixed = true;

    })

    window.addEventListener('scroll', () => {

        if(window.innerWidth > 480) return;

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