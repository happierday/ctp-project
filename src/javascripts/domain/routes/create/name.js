import template from './name.pug';

const path = '';
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

const testForNonAlphanumeric = /[^a-zA-Z0-9]/;

component.methods = {
    updateDomain(event) {
        const domain = event.target.value;
        if (testForNonAlphanumeric.test(domain)) {
            console.log('bad');
            return;
        }
        this.$store.commit('updateDomain', domain);
    }
};

export default {
    path, component
}