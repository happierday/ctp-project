import Vue from "vue";
import MdlFabFlinger from './components/mdl-fab-flinger';
import BlogPost from './components/blog-post';
import template from "./index.pug";
import "./index.scss";

Vue.component('mdl-fab-flinger', MdlFabFlinger);
Vue.component('blog-post', BlogPost);

module.exports = {
    template: template(),
    created() {
        if (!this.backgroundImage) {
            this.$store.dispatch('getDomain', this.$router.currentRoute.path);
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
        ownDomain() {
            return this.$router.currentRoute.path === '/edit';
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
        },
        showMore(){
            this.$store.dispatch('showMoreBlogPosts', this.$router.currentRoute.path);
        }
    }
};