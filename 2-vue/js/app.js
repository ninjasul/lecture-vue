import SearchModel from "./models/SearchModel.js";

new Vue({
    el: '#app',
    data: {
        query: '',
        submitted: false,
        searchResult: []
    },
    methods: {
        onSubmit(e) {
            this.search();
        },

        onKeyup(e) {
            if(!this.query.length) {
                this.onReset();
            }
        },

        search() {
            SearchModel.list(this.query).then(data => {
                this.searchResult = data;
                this.submitted = true;
            });
        },

        onReset(e) {
            this.query = '';
            this.submitted = false;
            this.searchResult = [];
        },

    }
})