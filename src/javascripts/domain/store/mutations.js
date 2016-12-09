export default {
    updateDomain(state, domain) {
        state.domain = domain;
    },
    updateDomainValid(state, isDomainValid) {
        state.isDomainValid = isDomainValid;
    },
    updateTitle(state, title) {
        state.title = title;
    },
    updateDescription(state, description) {
        state.description = description;
    },
    replaceState(state, newState) {
        let key;
        for (key in state) {
            if (state.hasOwnProperty(key)) {
                state[key] = null;
            }
        }

        for (key in newState) {
            if (newState.hasOwnProperty(key)) {
                state[key] = newState[key];
            }
        }
    }
}