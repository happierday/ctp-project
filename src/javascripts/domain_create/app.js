import Vue from 'vue';
import VueRouter from 'vue-router';
import { Button } from 'vuikit';

Vue.use(VueRouter);
Vue.component('VkButton', Button);

const routes = [];

const router = new VueRouter({routes});

const app = new Vue({router}).$mount('#app');
