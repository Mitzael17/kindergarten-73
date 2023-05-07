import {createFooterSpoilers, createSpoilers} from "./modules/createSpoilers.js";
import {createPasswordFields} from "./modules/createPasswordFields.js";
import {createBurger} from "./modules/createBurger.js";
import {transferContactsInHeader} from "./modules/transferContactsInHeader.js";
import {createDataWithContentBlocks} from "./modules/createDataWithContentBlocks.js";
import {createCollectiveSliders} from "./modules/createCollectiveSliders.js";
import {createDefaultSlider} from "./modules/createDefaultSlider.js";
import {createMask} from "./modules/createMask.js";
import {createSliderForSidebar} from "./modules/createSliderForSidebar.js";
import {createAchievementsPageSliders} from "./modules/createAchievementsPageSliders.js";
import {createVideoPlayer} from "./modules/createVideoPlayer.js";
import {createPopUpForImages} from "./modules/createPopUpForImages.js";
import {createObserverForBvi} from "./modules/createObserverForBvi.js";
import {createFixedHeader} from "./modules/createFixedHeader.js";
import {createClickableArrowInHeader} from "./modules/createClickableArrowInHeader.js";
import {createPopupMessage} from "./modules/createPopupMessage.js";
import {createLazyLoad} from "./modules/createLazyLoad.js";
import {setRightVh} from "./functions/setRightVh.js";


createLazyLoad();
createClickableArrowInHeader();
createSpoilers();
createFooterSpoilers();

createPasswordFields();

const [handlerMenuResize, handlerMenuClick] = createBurger();
transferContactsInHeader(handlerMenuResize);

createFixedHeader(handlerMenuClick);
createDataWithContentBlocks();

createDefaultSlider();
createCollectiveSliders();

createMask('.tel')

createSliderForSidebar()

new isvek.Bvi({
    target: '.bvi-open',
    fontSize: 16,
    builtElements: true
});

createObserverForBvi();

createAchievementsPageSliders();

createVideoPlayer();

createPopUpForImages();
createPopupMessage();

setRightVh();
