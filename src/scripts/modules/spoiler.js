import {outClick} from "../functions/outClick.js";

export function createSpoilers() {

    const spoilers = document.querySelectorAll('[data-spoiler="true"]');

    spoilers.forEach( spoiler => {

        let spoilerActive = spoiler.classList.contains('active');
        const content = spoiler.querySelector('[data-spoiler-wrapper="true"]');

        if(!content) {

            console.log('Все спойлеры должны иметь контейнер, который имеет селектор data-spoiler-wrapper="true"');
            return;

        }


        if(content.classList.contains('select-list__items')) {

            const inputs = document.querySelectorAll('input[type="radio"]');

            const spanInArea = spoiler.querySelector('.select-list__area').querySelector('span');

            inputs.forEach( input => {

                input.addEventListener('change', () => {

                    spanInArea.innerHTML = input.dataset.displayOnChange;

                    spoilerActive = false;

                    hide(spoiler, content);

                })

            })

        }


        outClick(spoiler, () => {

            spoilerActive = false;
            hide(spoiler, content)

        });

        content.addEventListener('click', (event) => {

            event.stopPropagation();

        });

        spoiler.addEventListener('click', () => {

            if(spoilerActive) {

                spoilerActive = false;

                hide(spoiler, content);

                return;

            }

            spoilerActive = true;

            show(spoiler, content);

        })

        content.addEventListener('transitionend', (event) => {

            if(!spoilerActive || event.propertyName !== 'height') return;

            content.style.height = 'auto';

        });

    })

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

}