import {http} from "vue";

export const checkDomain = (domain) => {
    return new Promise((resolve, reject) => {
        http.post('validation/domain', {domain}).then(resolve).catch(reject);
    });
};

