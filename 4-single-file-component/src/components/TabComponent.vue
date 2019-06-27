<template>
  <ul class="tabs">
    <li v-for="tab in tabs"
        v-bind:class="{active: tab === selectedTab}"
        v-on:click="onClickTab(tab)">
      {{tab}}
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['tabs', 'selectedTab'],
    methods: {
      onClickTab(tab) {
        // child -> parent 로 값을 전달 할 때 사용.
        this.$emit('@change', tab);
      },
    }
  }
</script>
