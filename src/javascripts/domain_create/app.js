import Vue from "vue";
import VueRouter from "vue-router";
import Index from "./routes/index";
import VueMaterial from "vue-material";
import 'vue-material/dist/vue-material.css';

Vue.use(VueMaterial);
Vue.material.theme.register('default', {
    primary: 'white',
    accent: 'cyan'
});

Vue.use(VueRouter);

const routes = [Index];

const router = new VueRouter({routes, mode: 'history', base: '/domain/create/'});

const app = new Vue({router}).$mount('#app');
