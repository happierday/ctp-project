import template from './index.pug';

const path = '/create';
const component = {};

component.template = template();

component.computed = {
    isDomainValid() {
        return this.$store.state.isDomainValid
    },
    domain() {
        return this.$store.state.domain;
    }
};

component.methods = {
    updateDomain(domain) {
        this.$store.commit('updateDomain', domain);
    },
    next() {
        console.log(document.querySelector('#next-link'));
        document.querySelector('#next-link').click();
    }
};

export default {
    path, component
}