const path = '/';
const component = {};

component.template = '<div>' +
    '<h1>Welcome to Domain Creation.</h1>' +
    '<h2>What would you like your domain name to be?</h2>' +
    '<div>' +
    '<md-input-container><md-input @change="updateDomain"></md-input></md-input-container>' +
    '<router-link to="/settings" v-bind:class="{disabled:!isDomainValid}"><md-button class="md-fab" v-bind:disabled="!isDomainValid"><md-icon>arrow_forward</md-icon></md-button></router-link>' +
    '</div>' +
    '</div>';

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