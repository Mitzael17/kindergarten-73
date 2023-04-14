export function outClick(element, callback) {

    document.body.addEventListener('click', ({target}) => {

        if(element.contains(target)) return;

        callback();

    })

}