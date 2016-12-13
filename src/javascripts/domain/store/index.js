import Vue from "vue";
import Vuex from "vuex";
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import {DOMAIN_INVALID} from './constants';

Vue.use(Vuex);

let state = {
    domain: '',
    isDomainValid: DOMAIN_INVALID,
    title: '',
    description: '',
    backgroundImage: null,
    user: null,
    blogPosts : []
};

const dataEl = document.querySelector('#domain-data');
if (dataEl) {
    const newState = JSON.parse(dataEl.text);
    for (let key in newState) {
        if (newState.hasOwnProperty(key)) {
            state[key] = newState[key];
        }
    }
}

for (let i = 0; i < state.blogPosts.length; i++) {
    if (!state.blogPosts[i].url) {
        state.blogPosts[i].url = 'https://source.unsplash.com/720x480?nature=' + Math.floor(Math.random() * 5000);
    }
    state.blogPosts[i].createdAt = new Date(state.blogPosts[i].createdAt);
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});