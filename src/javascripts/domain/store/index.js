import Vue from "vue";
import Vuex from "vuex";
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import {DOMAIN_INVALID} from './constants';

Vue.use(Vuex);

let state;

const dataEl = document.querySelector('#domain-data');
if (dataEl) {
    state = JSON.parse(dataEl.text);
} else {
    state = {
        domain: '',
        isDomainValid: DOMAIN_INVALID,
        title: '',
        description: '',
        backgroundImage: null
    };
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});