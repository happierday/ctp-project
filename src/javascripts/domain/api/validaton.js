import {http} from "vue";

export const checkDomain = (domain) => {
    return http.post('validation/domain', {domain});
};

