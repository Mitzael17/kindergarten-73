export function transferContactsInHeader(callback) {

    const header = document.querySelector('.header');
    const contacts = header.querySelector('.header__contacts');
    const content = header.querySelector('.header__content');

    let isItInHeader = true;
    let initialStart = true;

    if(!contacts) return;

    window.addEventListener('resize', handlerResize);
    handlerResize();

    function handlerResize() {

        const isWeakEyeThemeActive = document.documentElement.classList.contains('theme-visually-impaired');

        if(isItInHeader && ((window.innerWidth <= 1000 && !isWeakEyeThemeActive) || (isWeakEyeThemeActive && window.innerWidth <= 1300) )) {

            isItInHeader = false;
            header.append(contacts);

            setTimeout( () => {
                callback();
                callback();
            }, 150);

            initialStart = false;

            return;

        }

        if(!isItInHeader && ((window.innerWidth > 1000 && !isWeakEyeThemeActive) || (isWeakEyeThemeActive && window.innerWidth > 1300)) ) {

            isItInHeader = true;
            content.append(contacts);

            setTimeout( () => {
                callback();
                callback();
            }, 150);

            initialStart = false;

            return;

        }

        if(!initialStart) return;

        initialStart = false;

        callback();

    }

}