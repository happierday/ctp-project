import template from "./name.pug";
import {DOMAIN_TAKEN, DOMAIN_VALID} from "../../store/constants";

module.exports = {
    template: template(),

    computed: {
        error() { //I know it's a bad way to do it
            const isDomainValid = this.$store.state.isDomainValid;

            if (isDomainValid == DOMAIN_TAKEN) {
                const textField = document.querySelector('.mdl-textfield');

                if (textField && textField.className.indexOf('is-invalid') == -1) {
                    textField.className += ' is-invalid';
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
            this.$store.dispatch('updateDomain', event.target.value);
        },
        nextPage() {
            if (this.$store.state.isDomainValid != DOMAIN_VALID) {
                return;
            }

            this.$router.push('layout');
        }
    }
};
