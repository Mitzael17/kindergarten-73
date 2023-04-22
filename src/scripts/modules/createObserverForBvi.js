export function createObserverForBvi() {

    const observer = new MutationObserver(handlerMutation);

    observer.observe(document.body, {attributes: true});

    const bviBody = document.querySelector('.bvi-body');

    let prevFontSize = bviBody?.dataset?.bviFontsize ?? '16';
    let wasBviActive = document.body.classList.contains('bvi-active');

    if(wasBviActive) {

        handlerChangeFontSize(bviBody);

    }

    setTimeout(() => {
        wasBviActive = document.body.classList.contains('bvi-active');
        handlerMutation();
    }, 500)

    let isFirstLaunch = true;

    function handlerMutation() {

        const isBviActive = document.body.classList.contains('bvi-active');

        if( (isBviActive && !wasBviActive) || (wasBviActive && isFirstLaunch)) {

            wasBviActive = true;

            const bviBody = document.querySelector('.bvi-body');

            const bviButtonPlus = document.querySelector('.bvi-link.bvi-fontSize-plus');
            const bviButtonMinus = document.querySelector('.bvi-link.bvi-fontSize-minus');

            document.documentElement.classList.add('theme-visually-impaired');

            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('resize'));

            bviButtonPlus.addEventListener('click', () => handlerChangeFontSize(bviBody));
            bviButtonMinus.addEventListener('click', () => handlerChangeFontSize(bviBody));

        }

        if(!isBviActive && wasBviActive) {

            document.documentElement.classList.remove('theme-visually-impaired');

            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('resize'));

            wasBviActive = false;

        }

        isFirstLaunch = false;

    }

    function handlerChangeFontSize(bviBody) {

        const currentFontSize = bviBody.dataset.bviFontsize;

        if(currentFontSize === prevFontSize) return;

        if(currentFontSize > 18) document.documentElement.classList.add('theme-visually-impaired');
        else document.documentElement.classList.remove('theme-visually-impaired');

        prevFontSize = currentFontSize;

        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));

    }

}