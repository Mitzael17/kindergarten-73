import {createFooterSpoilers, createSpoilers} from "./modules/createSpoilers.js";
import {createPasswordFields} from "./modules/createPasswordFields.js";
import {createBurger} from "./modules/createBurger.js";
import {transferContactsInHeader} from "./modules/transferContactsInHeader.js";
import {createDataWithContentBlocks} from "./modules/createDataWithContentBlocks.js";
import {createCollectiveSliders} from "./modules/createCollectiveSliders.js";

createSpoilers();
createFooterSpoilers();

createPasswordFields();

const handlerMenuResize = createBurger();
transferContactsInHeader(handlerMenuResize);

createDataWithContentBlocks();

createCollectiveSliders();