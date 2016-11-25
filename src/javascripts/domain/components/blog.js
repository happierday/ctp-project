import template from './blog.pug';
import './blog.scss';

const component = {};

component.template = template();

component.computed = {
    domain() {
        return this.$store.state.domain;
    }
};

export default component
