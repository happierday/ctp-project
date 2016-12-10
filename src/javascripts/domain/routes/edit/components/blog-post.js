import template from "./blog-post.pug";
import "./blog-post.scss";

export default {
    template: template(),
    props: ['blogPost'],
    computed: {
        user() {
            return {name: this.$store.state.user.name, picture: 'url("' + this.$store.state.user.picture + '")'};
        }
    },
    methods: {
        cancel() {
            this.$store.commit('cancelBlogPost', this.blogPost);
        },
        save() {
            this.$store.dispatch('saveBlogPost', this.blogPost);
        },
        updateTitle(event) {
            this.$store.commit('updateBlogPost', {blogPost: this.blogPost, key: 'title', value: event.target.value});
        },
        updateFile(event) {
            const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
            this.$store.commit('updateBlogPost', {blogPost: this.blogPost, key: 'title', value: file ? file.name : ''});
            this.$store.commit('updateBlogPost', {blogPost: this.blogPost, key: 'file', value: file});
        },
        handleMediaClick(event) {
            if (event.target.tagName === 'INPUT') {
                return;
            }

            const {editing, type, url} = this.blogPost;
            if (editing) {
                if (type === 'upload') {
                    this.$refs['file-input'].click();
                }
            } else {
                if (type === 'upload') {
                    window.location.href = url;
                }
            }
        }
    }
};
