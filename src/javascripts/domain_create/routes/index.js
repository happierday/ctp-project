const path = '/';
const component = {};

component.template = '<div>' +
    '<h1>Welcome to Domain Creation.</h1>' +
    '<h2>What would you like your domain name to be?</h2>' +
    '<form >' +
    '<md-input-container><md-input></md-input></md-input-container>' +
    '<md-button class="md-fab" v-bind:disabled=""><md-icon>send</md-icon></md-button>' +
    '</form>' +
    '</div>';

export default {
    path, component
}