export function createDataWithContentBlocks() {

    const blocks = document.querySelectorAll('[data-width-content="true"]');
    const items = [];

    window.addEventListener('resize', handlerResize)

    blocks.forEach( block => {

        const span = block.firstElementChild;

        if(!span) return;

        items.push({
            spanNode: span,
            blocNode: block,
            prevSize: span.offsetWidth
        });

    })


    let prevWidth = window.innerWidth;
    let isFirstLaunch = true;

    handlerResize();

    function handlerResize() {

        if(prevWidth === window.innerWidth && !isFirstLaunch) return

        prevWidth = window.innerWidth;
        isFirstLaunch = false;

        items.forEach( item => {

            item.blocNode.style.maxWidth = 'none';

            const resize = setTimeout( () => {

                if(item.spanNode.offsetWidth === item.prevSize) {

                    item.blocNode.style.maxWidth = item.prevSize + 2 + 'px';

                    return;

                }

                item.blocNode.style.maxWidth = item.spanNode.offsetWidth + 2 + 'px';

                item.prevSize = item.spanNode.offsetWidth;

            }, 100)

            window.addEventListener('resize', () => clearTimeout(resize), {once: true});

        })

    }

}