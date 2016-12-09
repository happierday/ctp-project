import template from "./index.pug";
import "./index.scss";
import {getDomain} from "../../api/domain";

module.exports = {
    template: template(),
    created() {
        if (!this.backgroundImage) {
            getDomain().then(({body}) => {
                this.$store.commit('replaceState', body);
            });
        }
    },
    computed: {
        title() {
            return this.$store.state.title;
        },
        description() {
            return this.$store.state.description;
        },
        backgroundImage() {
            return this.$store.state.backgroundImage;
        }
    }
};