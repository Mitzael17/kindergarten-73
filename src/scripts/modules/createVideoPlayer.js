export function createVideoPlayer() {

    const videos = document.querySelectorAll('.video');

    videos.forEach( video => {

        const preview = video.querySelector('.video__preview');
        const iframe = video.querySelector('iframe');

        if(!iframe || !preview) return;

        if(!document.hasFocus()) {

            let checkBeforeFocus = startFocusObserver(iframe, preview);

            window.addEventListener('focus', () => clearInterval(checkBeforeFocus));

            window.addEventListener('blur', () => {

                if(!preview.classList.contains('hide')) {

                    checkBeforeFocus = startFocusObserver(iframe, preview);

                }

            });

        }


        window.addEventListener("blur", () => {
            setTimeout(() => {
                if (document.activeElement.id === iframe.id) {

                    preview.classList.add('hide')

                }
            }, 100);
        });


    })

    function startFocusObserver(iframe, preview) {

        const checkBeforeFocus = setInterval( () => {

            if (document.activeElement.id === iframe.id) {

                preview.classList.add('hide')
                clearInterval(checkBeforeFocus);

            }

        }, 500)

        return checkBeforeFocus;

    }

}