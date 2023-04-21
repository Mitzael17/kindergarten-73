export function createVideoPlayer() {

    const videos = document.querySelectorAll('.video');

    videos.forEach( video => {

        const preview = video.querySelector('.video__preview');
        const iframe = video.querySelector('iframe');

        if(!iframe || !preview) return;

        window.addEventListener("blur", () => {
            setTimeout(() => {
                if (document.activeElement.id === iframe.id) {

                    preview.classList.add('hide')

                }
            }, 100);
        });


    })


}