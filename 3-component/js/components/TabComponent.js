export default {
    template: '#tabs',
    props: ['tabs', 'selectedTab'],
    methods: {
        onClickTab(tab) {
            // child -> parent 로 값을 전달 할 때 사용.
            this.$emit('@change', tab);
        },
    }
}
