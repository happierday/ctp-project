import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuikit from 'vuikit';

Vue.use(VuiRouter);
Vue.use(Vuikit);

const routes = [];

const router = new VueRouter({routes});

const app = new Vue({router}).mount('#app');
