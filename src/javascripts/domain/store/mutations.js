export default {
    updateDomain(state, domain) {
        state.domain = domain;
    },
    updateDomainValid(state, isDomainValid) {
        state.isDomainValid = isDomainValid;
    },
    updateTitle(state, title) {
        state.title = title;
    },
    updateDescription(state, description) {
        state.description = description;
    },
    replaceState(state, newState) {
        let key;
        for (key in state) {
            if (state.hasOwnProperty(key)) {
                state[key] = null;
            }
        }

        for (key in newState) {
            if (newState.hasOwnProperty(key)) {
                state[key] = newState[key];
            }
        }
    },
    addBlogPost({blogPosts}, type) {
        if (type === 'upload') {
            blogPosts.unshift({
                type,
                editing: true,
                saving: false,
                createdAt: new Date(),
                title: '',
                url: null,
                file: null
            });
        } else {
            blogPosts.unshift({
                type,
                editing: true,
                saving: false,
                createdAt: new Date(),
                title: '',
                text: '',
                url: null,
                file: null
            });
        }
    },
    updateBlogPost(state, {blogPost, key, value}) {
        blogPost[key] = value;
    },
    saveBlogPost(state, blogPost) {
        blogPost.editing = false;
        blogPost.saving = true;
        delete blogPost.old;
    },
    savedBlogPost(state, {blogPost, changes}) {
        blogPost.saving = false;

        for (let key in changes) {
            if (changes.hasOwnProperty(key)) {
                blogPost[key] = changes[key];
            }
        }
    },
    cancelBlogPost({blogPosts}, blogPost) {
        if (blogPost.old) {
            blogPost = blogPost.old;
        } else {
            blogPosts.splice(blogPosts.indexOf(blogPost), 1);
        }
    }
}