import template from './layout.pug';

module.exports = {
    template: template(),

    computed: {
        title() {
            return this.$store.state.title;
        },
        description() {
            return this.$store.state.description;
        },
        emptyFields() {
            return this.title.length == 0 || this.description.length == 0;
        }
    },

    methods: {
        updateTitle(event) {
            this.$store.commit('updateTitle', event.target.value);
        },
        updateDescription(event) {
            this.$store.commit('updateDescription', event.target.value);
        },
        lastPage() {
            this.$router.push('name');
        },
        createDomain() {
            if (this.emptyFields) {
                return;
            }

            this.$store.dispatch('createDomain').then(({body}) => {
                if (body == false) {
                    this.lastPage();
                    return;
                }

                this.$router.push('/edit');
            }).catch(() => this.$router.push('/edit'));
        }
    }

};
