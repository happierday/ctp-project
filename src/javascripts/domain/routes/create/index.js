import Vue from "vue";
import Blog from './components/blog';
import template from "./index.pug";
import './index.scss';

Vue.component('blog', Blog);

module.exports = {
    template: template()
};