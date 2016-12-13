import template from "./index.pug";
import "./index.scss";

module.exports = {
    template: template(),
    computed: {
        blogPost() {
            const blogPosts = this.$store.state.blogPosts;
            for (let i = 0; i < blogPosts.length; i++) {
                if (blogPosts[i].id === this.$route.params.post) {
                    return blogPosts[i];
                }
            }
        },
        domainBackgroundImage() {
            if (!this.$store.state.backgroundImage) {
                return;
            }

            return 'url("' + this.$store.state.backgroundImage + '")';
        },
        blogPostBackgroundImage() {
            if (!this.blogPost.url) {
                return;
            }

            return 'url("' + this.blogPost.url + '")';
        },
        user() {
            return {name: this.$store.state.user.name, picture: 'url("' + this.$store.state.user.picture + '")'};
        },
        title() {
            return this.$store.state.title;
        },
        description() {
            return this.$store.state.description;
        }
    },
    methods: {
        goBack() {
            this.$router.push(this.$router.currentRoute.path.replace(this.$route.params.post, ''));
        }
    }
};