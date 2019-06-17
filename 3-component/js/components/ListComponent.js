export default {
    template: '#list',
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
