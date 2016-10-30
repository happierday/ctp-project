const path = '/';
const component = {};

component.template = '<div>' +
    '<h1>Welcome to Domain Creation.</h1>' +
    '<h2>Give your domain a name.</h2>' +
    '<div>' +
    '<md-input-container><md-input></md-input></md-input-container>' +
    '<router-link to="/settings"><md-button class="md-fab"><md-icon>send</md-icon></md-button></router-link>' +
    '</div>' +
    '</div>';

export default {
    path, component
}