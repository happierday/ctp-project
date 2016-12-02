import {checkDomain} from "../api/validaton";
import debounce from "lodash.debounce";
import {DOMAIN_INVALID, DOMAIN_TAKEN, DOMAIN_VALID} from "./constants";

const checkDomainValid = debounce((state, domain) => {
    checkDomain(domain).then((res) => {
        if (res.body == true) {
            state.isDomainValid = DOMAIN_VALID
        } else {
            state.isDomainValid = DOMAIN_TAKEN;
        }
    }).catch(console.log);
}, 500);

export default {
    updateDomain(state, {domain, valid}) {
        state.domain = domain;
        state.isDomainValid = DOMAIN_INVALID;

        if (!valid) {
            checkDomainValid.cancel();
            return;
        }

        checkDomainValid(state, domain);
    },
    updateTitle(state, title) {
        state.title = title;
    },
    updateDescription(state, description) {
        state.description = description;
    }
}