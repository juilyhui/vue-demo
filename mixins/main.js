
/*
* 混合
* 混合以一种灵活的方式为组件提供分布复用功能。混合对象可以包含任意的组件选项。
* 当组件使用了混合对象时，混合对象的所有选项将被“混入”组件自己的选项中。
*/


// 定义一个混合对象
var myMixin = {
    created: function() {
        this.hello()
    },
    methods: {
        hello: function(){
            console.log('hello form mixin!')
        }
    }
}
// 定义一个组件，使用这个混合对象
var Component = Vue.extend({
    mixins: [myMixin]
})

var component = new Component()  // -> "hello from mixin!"
