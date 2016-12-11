import {http} from "vue";

export const validateDomain = (domain) => {
    return http.post('validation/domain', {domain});
};

export const postDomain = (name, title, description) => {
    return http.post('create', {name, title, description});
};

export const getDomain = (route) => {
    return http.get('/domain' + route + '/json');
};

export const sendBlogPost = (body) => {
    const fd = new FormData();
    for (let key in body) {
        if (body.hasOwnProperty(key)) {
            fd.append(key, body[key]);
        }
    }
    return http.post('edit/upload', fd);
};