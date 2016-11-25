import {checkDomain} from "../api/validaton";
import debounce from 'lodash.debounce';

const checkDomainValid = debounce((state, domain) => {
    checkDomain(domain).then(() => state.isDomainValid = true).catch(() => state.isDomainValid = false);
}, 500);

export default {
    updateDomain(state, domain) {
        state.domain = domain;
        state.isDomainValid = false;

        if (domain.length) {
            checkDomainValid(state, domain);
        } else {
            checkDomainValid.cancel();
        }
    }
}