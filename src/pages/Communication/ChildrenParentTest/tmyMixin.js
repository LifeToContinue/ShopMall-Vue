export default {
    data() {
        return {
            msg: '赵丽颖'
        }
    },
    methods: {
        giveMoney(money) {
            this.money -= money
            // this.$parent 代表的就是这个子组件对象的父组件对象
            //禁用   只要你确定这个组件只有一个父组件对象就可以用
            this.$parent.money += money

        }
    }
}