import Vue from "vue";
import store from "./store";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import VueMdl from "vue-mdl";

Vue.use(VueMdl);

const Create = {
    path: '/create',
    component: () => System.import('./routes/create/index.js'),
    children: [
        {path: 'name', component: () => System.import('./routes/create/name.js')},
        {path: 'layout', component: () => System.import('./routes/create/layout.js')},
        {path: '*', redirect: 'name'}
    ]
};


Vue.use(VueRouter);
const routes = [Create];
const router = new VueRouter({routes, mode: 'history', base: '/domain'});

Vue.use(VueResource);
Vue.http.options.root = '/domain';

const app = new Vue({router, store}).$mount('#app');
