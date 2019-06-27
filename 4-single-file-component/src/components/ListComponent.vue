<template>
  <div v-if="data.length">
    <ul class="list">
      <li v-for="(item, index) in data"
          v-on:click="onClickListItem(item.keyword)">
        <span v-if="keywordType" class="number">{{index+1}}</span>
        {{item.keyword}}
        <span v-if="historyType" class="date">{{item.date}}</span>
        <button v-if="historyType" class="btn-remove" v-on:click.stop="onClickRemoveListItem(item.keyword)"></button>
      </li>
    </ul>
  </div>
  <div v-else>
    <span v-if="keywordType">추천 검색어가 없습니다.</span>
    <span v-if="historyType">최근 검색어가 없습니다.</span>
  </div>
</template>

<script>
  export default {
    props: ['data', 'type'],
    computed: {
      keywordType() {
        return this.type === 'keywords';
      },
      historyType() {
        return this.type === 'histories'
      },
    },
    methods: {
      onClickListItem(keyword) {
        this.$emit('@click', keyword);
      },

      onClickRemoveListItem(keyword) {
        this.$emit('@remove', keyword);
      },
    }
  }
</script>
