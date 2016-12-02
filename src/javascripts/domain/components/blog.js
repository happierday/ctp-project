import template from './blog.pug';
import './blog.scss';

const component = {};

component.template = template();

component.computed = {
    title() {
        return this.$store.state.title;
    }
};

export default component
