<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" v-model="inputValue" v-on:keyup="onKeyup" placeholder="검색어를 입력하세요" autofocus>
    <button type="reset" v-show="inputValue.length" v-on:click="onReset" class="btn-reset"></button>
  </form>
</template>

<script>
export default {
  // parent -> child 로 값을 전달 할 때 사용.
  props: ['value'],
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    value(newVal, oldVal) {
      this.inputValue = newVal;
    }
  },
  methods: {
    onSubmit() {
      // child -> parent 로 값을 전달 할 때 사용.
      this.$emit('@submit', this.inputValue.trim());
    },

    onKeyup() {
      if(!this.inputValue.length) {
        this.onReset();
      }
    },

    onReset() {
      this.inputValue = '';
      this.$emit('@reset');
    },
  }
}
</script>
