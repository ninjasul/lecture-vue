export default {
    template: '#search-result',
    props: ['data', 'query'],
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
