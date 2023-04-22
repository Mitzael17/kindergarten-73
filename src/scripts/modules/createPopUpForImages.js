export function createPopUpForImages() {

    const elements = document.querySelectorAll('[data-popup-group]');

    if(elements.length === 0) return;

    const popupGroups = new Set([...elements].map( element => element.dataset.popupGroup));

    popupGroups.forEach( nameGroup => {

        const [popup, image, arrowPrev, arrowNext] = createPopup();
        const elementsCurrentGroup = [];

        let activeImageIndex = 0;

        elements.forEach( element => {

            if(element.dataset.popupGroup !== nameGroup) return;

            elementsCurrentGroup.push(element);

            element.addEventListener('click', () => {

                const idElement = elementsCurrentGroup.indexOf(element);

                popup.classList.add('active');
                image.src = element.dataset.popupImage;
                activeImageIndex = idElement;

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

            activeImageIndex = activeImageIndex - 1;
            image.src = elementsCurrentGroup[activeImageIndex].src;

            if(!elementsCurrentGroup[activeImageIndex - 1]) arrowPrev.classList.add('disabled');

            arrowNext.classList.remove('disabled');

        });

        arrowNext.addEventListener('click', () => {

            if(!elementsCurrentGroup[activeImageIndex + 1]) {

                arrowPrev.classList.add('disabled');
                return;

            }

            activeImageIndex = activeImageIndex + 1;
            image.src = elementsCurrentGroup[activeImageIndex].src;

            if(!elementsCurrentGroup[activeImageIndex + 1]) arrowNext.classList.add('disabled');

            arrowPrev.classList.remove('disabled');

        });

    });

    function createPopup() {

        const popup = document.createElement('div');
        const popupImage = document.createElement('img');
        const arrowPrev = document.createElement('div');
        const arrowNext = document.createElement('div');

        arrowNext.classList.add('popup__arrow', 'popup__arrow--next');
        arrowPrev.classList.add('popup__arrow', 'popup__arrow--prev');
        popupImage.classList.add('popup__content');
        popup.classList.add('popup');

        popupImage.alt = 'loading...';

        popup.addEventListener('click', (event) => handlerClickPopup(event, popup));

        popup.append(popupImage, arrowPrev, arrowNext);
        document.body.append(popup);

        return [popup, popupImage, arrowPrev, arrowNext];

    }


    function handlerClickPopup(event, popup) {

        if(!event.target.contains(popup)) return;

        popup.classList.remove('active');
        document.documentElement.classList.remove('blocked');

    }

}