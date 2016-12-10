import template from "./blog-post.pug";
import "./blog-post.scss";

export default {
    template: template(),
    props: ['blogPost'],
    computed: {
        user() {
            return {name: this.$store.state.user.name, picture: 'url("' + this.$store.state.user.picture + '")'};
        },
        backgroundImage() {
            if (this.blogPost.editing || this.blogPost.type !== 'text') {
                return;
            }

            return this.blogPost.url ? `url("${this.blogPost.url}")` :`url("https://source.unsplash.com/720x480/?${this.blogPost.title.split(/[^a-z]+/i)[0]}")`;
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
        updateText(event) {
            this.$store.commit('updateBlogPost', {blogPost: this.blogPost, key: 'text', value: event.target.value});
        },
        updateFile(event) {
            const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
            this.$store.commit('updateBlogPost', {blogPost: this.blogPost, key: 'title', value: file ? file.name : ''});
            this.$store.commit('updateBlogPost', {blogPost: this.blogPost, key: 'file', value: file});
        },
        handleMediaClick(event) {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }

            const {editing, type, url} = this.blogPost;
            if (editing) {
                this.$refs['file-input'].click();
            } else {
                if (type === 'upload') {
                    window.location.href = url;
                } else {
                    this.$router.push('post/' + this.blogPost.id);
                }
            }
        }
    }
};
