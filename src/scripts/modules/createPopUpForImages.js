export function createPopUpForImages() {

    const elements = document.querySelectorAll('[data-popup-group]');

    if(elements.length === 0) return;

    const popupGroups = new Set([...elements].map( element => element.dataset.popupGroup));
    let isDown = false;

    popupGroups.forEach( nameGroup => {

        const [popup, images, arrowPrev, arrowNext] = createPopup();
        const elementsCurrentGroup = [];

        const stepY = popup.offsetHeight / 100;
        const stepX = popup.offsetWidth / 100;

        const popupStates = new Proxy({
            downCoords: [0, 0],
            currentCoords: [0, 0],
            upCoords: [0, 0]
        }, {

            set(target, prop, newValue) {

                if(prop === 'downCoords') {

                    target[prop] = newValue;
                    return true;

                }

                if(prop === 'currentCoords') {

                    const [currentX, currentY] = newValue;
                    const [initialX, initialY] = popupStates['downCoords'];


                    if(currentX > initialX && images[0].src && activeImageIndex !== 0 && window.innerWidth <= 500) {

                        let opacity = ((currentX - initialX) / (stepX * 30 / 100)).toFixed();

                        if(opacity > 100) opacity = 100;

                        opacity = opacity * 0.01

                        images[1].style.opacity = 1 - opacity;
                        images[0].style.opacity = opacity;


                    }

                    if(currentX < initialX && images[0].src && activeImageIndex < elementsCurrentGroup.length - 1 && window.innerWidth <= 500) {

                        let opacity = ((initialX - currentX) / (stepX * 30 / 100)).toFixed();

                        if(opacity > 100) opacity = 100;

                        opacity = opacity * 0.01

                        images[1].style.opacity = 1 - opacity;
                        images[2].style.opacity = opacity;


                    }

                    target[prop] = newValue;
                    return true;

                }

                if(prop === 'upCoords') {

                    images[0].style.opacity = '0';
                    images[1].style.opacity = '1';
                    images[2].style.opacity = '0';

                    if(window.innerWidth > 500) {

                        target[prop] = newValue;
                        return true;

                    }

                    const [currentX, currentY] = newValue;
                    const [initialX, initialY] = popupStates['downCoords'];

                    if(currentX > initialX + stepX * 15) {

                        arrowPrev.dispatchEvent(new Event('click'));

                        target[prop] = newValue;
                        return true;

                    }

                    if(currentX < initialX - stepX * 15) {

                        arrowNext.dispatchEvent(new Event('click'));

                        target[prop] = newValue;
                        return true;

                    }

                    if(currentY > initialY + stepY * 15 || currentY < initialY - stepY * 15) {

                        popup.dispatchEvent(new Event('click'));

                        target[prop] = newValue;
                        return true;

                    }

                    target[prop] = newValue;
                    return true;


                }

            }

        })

        popup.addEventListener('pointerdown', (event) => handlerPointer(event, popupStates, 'downCoords'));
        popup.addEventListener('pointermove', (event) => handlerPointer(event, popupStates, 'currentCoords'));
        popup.addEventListener('pointerup', (event) => handlerPointer(event, popupStates, 'upCoords'));

        let activeImageIndex = 0;

        elements.forEach( element => {

            if(element.dataset.popupGroup !== nameGroup) return;

            elementsCurrentGroup.push(element);

            element.addEventListener('click', () => {

                const idElement = elementsCurrentGroup.indexOf(element);

                popup.classList.add('active');
                images[1].src = element.dataset.popupImage;
                activeImageIndex = idElement;

                if(elementsCurrentGroup[activeImageIndex - 1] !== undefined) images[0].src = elementsCurrentGroup[activeImageIndex - 1].src;
                if(elementsCurrentGroup[activeImageIndex + 1] !== undefined) images[2].src = elementsCurrentGroup[activeImageIndex + 1].src;


                document.documentElement.classList.add('blocked');


                if(idElement === 0) arrowPrev.classList.add('disabled');
                else arrowPrev.classList.remove('disabled');

                if(idElement === elementsCurrentGroup.length - 1) arrowNext.classList.add('disabled');
                else arrowNext.classList.remove('disabled');

            })

        })

        arrowPrev.addEventListener('click', () => {

            if(!elementsCurrentGroup[activeImageIndex - 1]) {

                arrowPrev.classList.add('disabled');
                return;

            }

            images[2].src = elementsCurrentGroup[activeImageIndex].src;

            activeImageIndex = activeImageIndex - 1;
            images[1].src = elementsCurrentGroup[activeImageIndex].src;

            if(!elementsCurrentGroup[activeImageIndex - 1]) arrowPrev.classList.add('disabled');
            else images[0].src = elementsCurrentGroup[activeImageIndex - 1].src;

            arrowNext.classList.remove('disabled');

        });

        arrowNext.addEventListener('click', () => {

            if(!elementsCurrentGroup[activeImageIndex + 1]) {

                arrowNext.classList.add('disabled');
                return;

            }

            images[0].src = elementsCurrentGroup[activeImageIndex].src;

            activeImageIndex = activeImageIndex + 1;
            images[1].src = elementsCurrentGroup[activeImageIndex].src;

            if(!elementsCurrentGroup[activeImageIndex + 1]) arrowNext.classList.add('disabled');
            else images[2].src = elementsCurrentGroup[activeImageIndex + 1].src;

            arrowPrev.classList.remove('disabled');

        });

    });

    function createPopup() {

        const popup = document.createElement('div');
        const popupImages = [document.createElement('img'), document.createElement('img'), document.createElement('img')];
        const arrowPrev = document.createElement('div');
        const arrowNext = document.createElement('div');

        arrowNext.classList.add('popup__arrow', 'popup__arrow--next');
        arrowPrev.classList.add('popup__arrow', 'popup__arrow--prev');

        popup.classList.add('popup');

        popup.addEventListener('click', (event) => handlerClickPopup(event, popup, arrowNext, arrowPrev));

        popupImages.forEach( (popupImage, index) => {

            popupImage.classList.add('popup__content');
            popupImage.alt = 'loading...';

            if(index !== 1) popupImage.classList.add('popup__optionalImage');

            popup.append(popupImage);

        });

        popup.append(arrowPrev, arrowNext);
        document.body.append(popup);

        return [popup, popupImages, arrowPrev, arrowNext];

    }

    function handlerPointer(event, states, prop) {

        if(prop === 'downCoords') isDown = true;
        if(prop === 'upCoords') isDown = false;

        if(prop === 'currentCoords' && !isDown) return;

        states[prop] = [event.clientX, event.clientY];

    }



    function handlerClickPopup(event, popup, arrowNext, arrowPrev) {

        if(!event.target.contains(popup)) return;

        popup.classList.remove('active');
        document.documentElement.classList.remove('blocked');

    }

}