import template from './name.pug';

const testForNonAlphanumeric = /[^a-zA-Z0-9]/;

module.exports = {
    template: template(),

    computed: {
        isDomainValid() {
            return this.$store.state.isDomainValid
        },
        domain() {
            return this.$store.state.domain;
        }
    },

    methods: {
        updateDomain(event) {
            const domain = event.target.value;
            if (testForNonAlphanumeric.test(domain)) {
                return;
            }
            this.$store.commit('updateDomain', domain);
        }
    }
};
