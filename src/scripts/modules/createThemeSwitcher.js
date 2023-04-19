export function createThemeSwitcher() {

    const switcher = document.querySelector('#theme-switcher');

    if(!switcher) return;

    switcher.addEventListener('click', () => {

        document.documentElement.classList.toggle('theme-visually-impaired');

        setTimeout( () => {

            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('resize'));

        }, 500)

    })

}