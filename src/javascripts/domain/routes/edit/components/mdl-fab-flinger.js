import template from "./mdl-fab-flinger.pug";
import "./mdl-fab-flinger.scss";

export default {
    template: template(),
    data() {
        return {
            showing: false
        };
    },
    methods: {
        flingFab(){
            this.showing = !this.showing;

            if (this.showing) {
                document.addEventListener('click', this.handleOutsideClick);
            } else {
                document.removeEventListener('click', this.handleOutsideClick);
            }
        },
        handleOutsideClick(e) {
            if (e.target.parentNode.id !== 'fab_btn') {
                this.showing = false;
            }
        }
    }
};
