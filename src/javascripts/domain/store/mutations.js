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
    }
}