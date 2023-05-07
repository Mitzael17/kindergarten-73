export function setRightVh() {

    const handlerResize = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    handlerResize();

    window.addEventListener('resize', handlerResize);

}