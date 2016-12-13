import {validateDomain, postDomain, sendBlogPost, getDomainJSON, getBlogPostsJSON} from "../api/domain";
import debounce from "lodash.debounce";
import {DOMAIN_INVALID, DOMAIN_TAKEN, DOMAIN_VALID} from "./constants";

const checkDomainValid = debounce((commit, domain) => {
    validateDomain(domain).then(({body}) => {
        if (body == true) {
            commit('updateDomainValid', DOMAIN_VALID);
        } else {
            commit('updateDomainValid', DOMAIN_TAKEN);
        }
    });
}, 500);

const testForNonAlphanumeric = /[^a-zA-Z0-9]/;

export default {
    updateDomain({commit}, domain) {
        commit('updateDomain', domain);
        commit('updateDomainValid', DOMAIN_INVALID);

        if (!domain.length || testForNonAlphanumeric.test(domain)) {
            checkDomainValid.cancel();
            return;
        }

        checkDomainValid(commit, domain);
    },
    createDomain({state}) {
        return postDomain(state.domain, state.title, state.description);
    },
    getDomain({commit}, route) {
        getDomainJSON(route).then(({body}) => {
            if (body.type === '') {
                window.location = '/404';
                return;
            }
            commit('replaceState', body);
        });
    },
    saveBlogPost({commit}, blogPost) {
        commit('saveBlogPost', blogPost);

        sendBlogPost(blogPost).then(({body}) => {
            commit('savedBlogPost', {blogPost, changes: body});
        });
    },
    showMoreBlogPosts({state, commit}, route) {
        getBlogPostsJSON(route, state.blogPosts.length).then(({body}) => {
            commit('addBlogPosts', body);
        });
    }
}
