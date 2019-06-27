<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form v-bind:value="query"
                   v-on:@submit="onSubmit"
                   v-on:@reset="onReset"></search-form>

      <div class="content">
        <div v-if="submitted" class="content">
          <search-result v-bind:data="searchResult" v-bind:query="query"></search-result>
        </div>
        <div v-else>
          <tabs v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@change="onClickTab"></tabs>

          <div v-if="selectedTab === tabs[0]">
            <list v-bind:data="keywords" type="keywords" v-on:@click="onClickKeyword"></list>
          </div>
          <div v-else>
            <list v-bind:data="histories" type="histories" v-on:@click="onClickKeyword" v-on:@remove="onClickRemoveHistory"></list>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SearchModel from "./models/SearchModel.js";
import KeywordModel from "./models/KeywordModel.js";
import HistoryModel from "./models/HistoryModel.js";

import FormComponent from './components/FormComponent.vue';
import ListComponent from './components/ListComponent.vue';
import ResultComponent from './components/ResultComponent.vue';
import TabComponent from './components/TabComponent.vue';

export default {
  name: 'app',
  data () {
    return {
      query: '',
      submitted: false,
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      searchResult: [],
      keywords : [],
      histories : [],
    }
  },
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'list' : ListComponent,
    'tabs' : TabComponent,
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
}
</script>
