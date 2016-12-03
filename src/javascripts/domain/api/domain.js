import {http} from "vue";

export const validateDomain = (domain) => {
    return http.post('validation/domain', {domain});
};

export const postDomain = (body) => {
    return http.post('create', body);
};