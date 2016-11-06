import Vue from "vue";
import store from './store';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import VueMaterial from "vue-material";
import 'vue-material/dist/vue-material.css';
import Index from "./routes/index";
import Settings from "./routes/layout";
import "babel-polyfill";

Vue.use(VueMaterial);
Vue.material.theme.register('default', {
    primary: 'white',
    accent: 'cyan'
});

Vue.use(VueRouter);
const routes = [Index, Settings];
const router = new VueRouter({routes, mode: 'history', base: '/domain'});

Vue.use(VueResource);
Vue.http.options.root = '/domain';

const app = new Vue({router, store}).$mount('#app');
