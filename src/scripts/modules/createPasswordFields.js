
export function createPasswordFields() {

    const inputContainers = document.querySelectorAll('.input--password')

    inputContainers.forEach( container => {

        const input = container.querySelector('input');
        const icon = container.querySelector('.icon');

        let isOpen = false;

        if(!input) return;

        if(!icon) {

         console.log('У поля с паролем нету иконки!');
         return;

        }


        icon.addEventListener('click', () => {

            isOpen = !isOpen;

            if(isOpen) {

                input.type = 'text';
                icon.classList.add('open')
                return;

            }

            input.type = 'password';
            icon.classList.remove('open');

        })


    })

}