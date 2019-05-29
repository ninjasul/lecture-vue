export default {
    template: '#search-form',
    // parent -> child 로 값을 전달 할 때 사용.
    props: ['value'],
    data() {
        return {
            inputValue: this.value,
        };
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