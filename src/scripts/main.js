import {createSpoilers} from "./modules/createSpoilers.js";
import {createPasswordFields} from "./modules/createPasswordFields.js";
import {createBurger} from "./modules/createBurger.js";
import {transferContactsInHeader} from "./modules/transferContactsInHeader.js";

createSpoilers();
createPasswordFields();
const handlerMenuResize = createBurger();
transferContactsInHeader(handlerMenuResize);