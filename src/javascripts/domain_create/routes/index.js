import template from './index.pug';

const path = '/';
const component = {};

component.template = template();

component.computed = {
    isDomainValid() {
        return this.$store.getters.isDomainValid
    }
};

component.methods = {
    updateDomain(domain) {
        this.$store.commit('updateDomain', domain);
    }
};

export default {
    path, component
}