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
        {path: '*', redirect: 'name'},
        {path: '', redirect: 'name'}
    ],
    beforeEnter(to, from, next) {
        if (document.querySelector('#domain-data')) {
            next('/edit');
        } else {
            next();
        }
    }
};

const Edit = {
    path: '/edit',
    component: () => System.import('./routes/edit/index.js'),
    beforeEnter(to, from, next) {
        if (!document.querySelector('#domain-data') && from.path !== '/create/layout') {
            next('/create');
        } else {
            next();
        }
    }
};

const Domain = {
    path: '/view/:domain',
    component: () => System.import('./routes/edit/index.js')
};

const ViewPost = {
    path: '/view/:domain/:post',
    component: () => System.import('./routes/post/index.js')
};

const EditPost = {
    path: '/edit/:post',
    component: () => System.import('./routes/post/index.js')
};

Vue.use(VueRouter);
const routes = [ViewPost, EditPost, Domain, Create, Edit,
    {path: '*', redirect: '/create'},
    {path: '*', redirect: '/create'}
];
const router = new VueRouter({
    routes, mode: 'history', base: '/domain', scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

Vue.use(VueResource);
Vue.http.options.root = '/domain';

const app = new Vue({router, store}).$mount('#app');