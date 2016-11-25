import Vue from "vue";
import store from './store';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import VueMdl from "vue-mdl";
import Create from './routes/create/index';
import Blog from './components/blog';
import "babel-polyfill";

Vue.use(VueMdl);

Vue.use(VueRouter);
const routes = [Create];
const router = new VueRouter({routes, mode: 'history', base: '/domain'});

Vue.use(VueResource);
Vue.http.options.root = '/domain';

Vue.component('blog', Blog);

const app = new Vue({router, store}).$mount('#app');
