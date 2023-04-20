import {createFooterSpoilers, createSpoilers} from "./modules/createSpoilers.js";
import {createPasswordFields} from "./modules/createPasswordFields.js";
import {createBurger} from "./modules/createBurger.js";
import {transferContactsInHeader} from "./modules/transferContactsInHeader.js";
import {createDataWithContentBlocks} from "./modules/createDataWithContentBlocks.js";
import {createCollectiveSliders} from "./modules/createCollectiveSliders.js";
import {createDefaultSlider} from "./modules/createDefaultSlider.js";
import {createThemeSwitcher} from "./modules/createThemeSwitcher.js";
import {createMask} from "./modules/createMask.js";
import {createSliderForSidebar} from "./modules/createSliderForSidebar.js";



//createThemeSwitcher();

createSpoilers();
createFooterSpoilers();

createPasswordFields();

const handlerMenuResize = createBurger();
transferContactsInHeader(handlerMenuResize);

createDataWithContentBlocks();

createDefaultSlider();
createCollectiveSliders();

createMask('.tel')

createSliderForSidebar()

new isvek.Bvi({
    target: '.bvi-open',
    fontSize: 24,
    theme: 'white'
});