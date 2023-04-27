import {outClick} from "../functions/outClick.js";

export function createSpoilers() {

    const spoilers = document.querySelectorAll('[data-spoiler="true"]');

    const spoilersWithFamily = {};

    spoilers.forEach( (spoiler, index) => {

        let spoilerActive = spoiler.classList.contains('active');
        const content = spoiler.querySelector('[data-spoiler-wrapper="true"]');
        const familySpoiler = spoiler.getAttribute('data-family-spoilers');

        if(!content) {

            console.log('Все спойлеры должны иметь контейнер, который имеет селектор data-spoiler-wrapper="true"');
            return;

        }

        if(familySpoiler) {

            if(!spoilersWithFamily[familySpoiler]) spoilersWithFamily[familySpoiler] = [];

            spoilersWithFamily[familySpoiler][index] = {spoiler, content, isActive: false};

        }

        if(content.classList.contains('select-list__items')) {

            const inputs = content.querySelectorAll('input[type="radio"]');

            const spanInArea = spoiler.querySelector('.select-list__area').querySelector('span');

            inputs.forEach( input => {

                input.addEventListener('change', () => {

                    spanInArea.innerHTML = input.dataset.displayOnChange;

                    spoilerActive = false;

                    hide(spoiler, content);

                })

            })

        }


        if(spoiler.getAttribute('data-disable-outclick') !== 'true') {

            outClick(spoiler, () => {

                spoilerActive = false;
                hide(spoiler, content)

            });

        }

        content.addEventListener('click', (event) => {

            event.stopPropagation();

        });

        spoiler.addEventListener('click', () => {

            if(spoilerActive) {

                if(familySpoiler) {

                    spoilersWithFamily[familySpoiler][index].isActive = false;

                }

                spoilerActive = false;

                hide(spoiler, content);

                return;

            }

            if(familySpoiler) {

                const activeSpoilerIndex = spoilersWithFamily[familySpoiler].findIndex( spoilerData => spoilerData.isActive);

                if(activeSpoilerIndex !== -1) {

                    spoilersWithFamily[familySpoiler][activeSpoilerIndex].spoiler.dispatchEvent(new Event('click'));

                }

                spoilersWithFamily[familySpoiler][index].isActive = true;

            }

            spoilerActive = true;

            show(spoiler, content);

        })

        content.addEventListener('transitionend', (event) => handlerTransitionEnd(event, spoilerActive, content));

    })

}



export function createFooterSpoilers() {

    const spoilers =
        [...document.querySelectorAll('.footer__list')]
        .map( spoiler => {

        return {
            node: spoiler,
            isOpen: false,
            title: spoiler.parentElement.querySelector('.footer__title')
        }

    })
        .filter( spoiler => {

            if(spoiler.title === undefined) {

                console.log('Не найдено название списка (footer__title) в футере');
                return false;
            }

            return true;

        });

    if(spoilers.length === 0) return;

    window.addEventListener('resize', handlerResize);

    spoilers.forEach( spoiler => {

        spoiler.title.addEventListener('click', () => {

            if(window.innerWidth > 600) return;

            if(spoiler.isOpen) {

                spoiler.isOpen = false;
                hide(spoiler.title, spoiler.node);
                return;
            }

            spoiler.isOpen = true;
            show(spoiler.title, spoiler.node);

        });
        outClick(spoiler.title, () => {

            if(window.innerWidth > 600) return;

            spoiler.isOpen = false;
            hide(spoiler.title, spoiler.node);

        });

        spoiler.node.addEventListener('click', event => event.stopPropagation());
        spoiler.node.addEventListener('transitionend', (event) => {

            if(window.innerWidth > 600) return;

            handlerTransitionEnd(event, spoiler.isOpen, spoiler.node)

        })

    });


    let isHide = false;

    function handlerResize() {

        if(!isHide && window.innerWidth <= 600) {

            isHide = true;

            spoilers.forEach( spoiler => {

                spoiler.isOpen = false;
                hide(spoiler.title, spoiler.node);

            })

            return;

        }

        if(isHide && window.innerWidth > 600) {

            isHide = false;

            spoilers.forEach( spoiler => {
                spoiler.isOpen = true;
                show(spoiler.title, spoiler.node)
            })

        }

    }

}


function hide(spoiler, content) {


    content.style.height = content.offsetHeight + 'px';
    spoiler.classList.remove('active');

    setTimeout( () => {

        content.style.height = '0px';

    }, 20);

}


function show(spoiler, content) {

    content.style.height = content.scrollHeight + 'px';
    spoiler.classList.add('active');

}

function handlerTransitionEnd(event, isOpen, content) {

    if(!isOpen || event.propertyName !== 'height') return;

    content.style.height = 'auto';

}