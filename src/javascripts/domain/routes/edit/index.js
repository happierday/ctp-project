import Vue from "vue";
import MdlFabFlinger from './components/mdl-fab-flinger';
import BlogPost from './components/blog-post';
import template from "./index.pug";
import "./index.scss";
import {getDomain} from "../../api/domain";

Vue.component('mdl-fab-flinger', MdlFabFlinger);
Vue.component('blog-post', BlogPost);

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
        blogPosts() {
            return this.$store.state.blogPosts;
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
    methods: {
        addUpload(){
            this.$store.commit('addBlogPost', 'upload');
        },
        addText(){
            this.$store.commit('addBlogPost', 'text');
        }
    }
};