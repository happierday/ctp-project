import Vue from "vue";
import MdlFabFlinger from './components/mdl-fab-flinger';
import template from "./index.pug";
import "./index.scss";
import {getDomain} from "../../api/domain";

Vue.component('mdl-fab-flinger', MdlFabFlinger);

module.exports = {
    template: template(),
    created() {
        if (!this.backgroundImage) {
            getDomain().then(({body}) => {
                this.$store.commit('replaceState', body);
            });
        }
    },
    computed: {
        title() {
            return this.$store.state.title;
        },
        description() {
            return this.$store.state.description;
        },
        backgroundImage() {
            if (!this.$store.state.backgroundImage) {
                return;
            }

            return 'url("' + this.$store.state.backgroundImage + '")';
        }
    },
    method: {
        addUpload(){
            this.$store.commit('addPost', 'upload');
        }
    }
};