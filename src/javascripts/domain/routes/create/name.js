import template from "./name.pug";
import {DOMAIN_TAKEN, DOMAIN_VALID} from "../../store/constants";

const testForNonAlphanumeric = /[^a-zA-Z0-9]/;

module.exports = {
    template: template(),

    computed: {
        error() { //I know it's a bad way to do it
            const isDomainValid = this.$store.state.isDomainValid;

            if (isDomainValid == DOMAIN_TAKEN) {
                const errorLabel = document.querySelector('.mdl-textfield__error');

                if (errorLabel) {
                    errorLabel.style.visibility = 'visible';

                    const textField = document.querySelector('.mdl-textfield');
                    if (textField.className.indexOf('is-invalid') == -1) {
                        textField.className += ' is-invalid';
                    }
                }
                return 'Domain name has already been taken.';
            } else {
                return 'Domain name can only be alphanumeric.';
            }
        },
        isDomainValid() {
            return this.$store.state.isDomainValid == DOMAIN_VALID;
        },
        domain() {
            return this.$store.state.domain;
        }
    },

    methods: {
        updateDomain(event) {
            const domain = event.target.value;
            const valid = domain.length && !testForNonAlphanumeric.test(domain);

            if (valid) {
                const errorLabel = document.querySelector('.mdl-textfield__error');
                if (errorLabel) {
                    errorLabel.style.visibility = 'hidden';
                }
            }
            this.$store.commit('updateDomain', {domain, valid});
        },
        nextPage() {
            if (this.$store.state.isDomainValid != DOMAIN_VALID) {
                return;
            }

            this.$router.push('layout');
        }
    }
};
