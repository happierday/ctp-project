import {http} from "vue";

export const validateDomain = (domain) => {
    return http.post('validation/domain', {domain});
};

export const postDomain = (name, title, description) => {
    return http.post('create', {name, title, description});
};