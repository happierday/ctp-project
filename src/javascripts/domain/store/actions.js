import {validateDomain, postDomain} from "../api/domain";
import debounce from "lodash.debounce";
import {DOMAIN_INVALID, DOMAIN_TAKEN, DOMAIN_VALID} from "./constants";

const checkDomainValid = debounce((commit, domain) => {
    validateDomain(domain).then(({body}) => {
        if (body == true) {
            commit('updateDomainValid', DOMAIN_VALID);
        } else {
            commit('updateDomainValid', DOMAIN_TAKEN);
        }
    });
}, 500);

const testForNonAlphanumeric = /[^a-zA-Z0-9]/;

export default {
    updateDomain({commit}, domain) {
        commit('updateDomain', domain);
        commit('updateDomainValid', DOMAIN_INVALID);

        if (!domain.length || testForNonAlphanumeric.test(domain)) {
            checkDomainValid.cancel();
            return;
        }

        checkDomainValid(commit, domain);
    },
    createDomain(store, {state}) {
        console.log(this);
        console.log(store);
        return postDomain(state.domain, state.title, state.description);
    }
}
