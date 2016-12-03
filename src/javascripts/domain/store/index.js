import Vue from "vue";
import Vuex from "vuex";
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import {DOMAIN_INVALID} from './constants';

Vue.use(Vuex);

const state = {
    domain: '',
    isDomainValid: DOMAIN_INVALID,
    title: '',
    description: ''
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});