import SearchModel from "./models/SearchModel.js";
import KeywordModel from "./models/KeywordModel.js";
import HistoryModel from "./models/HistoryModel.js";

import FormComponent from './components/FormComponent.js';

new Vue({
    el: '#app',
    data: {
        query: '',
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '',
        searchResult: [],
        keywords : [],
        histories : [],
    },
    components: {
        'search-form': FormComponent,
    },
    created() {
        this.selectedTab = this.tabs[0];
        this.fetchKeywords();
        this.fetchSearchHistories();
    },
    methods: {
        onSubmit(query) {
            this.query = query;
            this.search();
        },

        search() {
            SearchModel.list(this.query).then(data => {
                this.searchResult = data;
                this.submitted = true;
            });

            HistoryModel.add(this.query);
            this.fetchSearchHistories();
        },

        onReset(e) {
            this.query = '';
            this.submitted = false;
            this.searchResult = [];
        },

        onClickTab(tab) {
            this.selectedTab = tab;
        },

        onClickKeyword(keyword) {
            this.query = keyword;
            this.search();
        },

        onClickRemoveHistory(keyword) {
            HistoryModel.remove(keyword);
            this.fetchSearchHistories();
        },

        fetchKeywords() {
            KeywordModel.list(this.query).then(data => {
                this.keywords = data;
            });
        },

        fetchSearchHistories() {
            HistoryModel.list(this.query).then(data => {
                this.histories = data;
            });
        },
    }
})