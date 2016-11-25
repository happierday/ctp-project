import template from "./index.pug";
import './index.scss';
import Name from "./name";
import Layout from "./layout";

const path = '/create';
const component = {};

component.template = template();

export default {
    path: path, component: component, children: [Name, Layout]
}