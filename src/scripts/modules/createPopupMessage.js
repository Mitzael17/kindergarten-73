import {outClick} from "../functions/outClick.js";

export function createPopupMessage() {

    const popups = document.querySelectorAll('.popupMessage');

    popups.forEach( popup => {

        const closeButtons = popup.querySelectorAll('.buttonClosePopupMessage');

        closeButtons.forEach( button => button.addEventListener('click',  () => closePopup(popup)));

        outClick(popup, () => closePopup(popup));

    })

    function closePopup(popup) {

        popup.classList.remove('active');

    }
}