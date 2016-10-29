var moment = {};
require(['vue', 'vuikit'], function (Vue, Vuikit) {
    Vue.use(Vuikit);

    var app = new Vue({
        el: '#app',
        data: {
            counter: 0
        },
        methods: {
            incrementCounter: function () {
                this.counter++;
            }
        }
    })
});