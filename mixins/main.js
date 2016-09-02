
/*
* 混合
* 混合以一种灵活的方式为组件提供分布复用功能。混合对象可以包含任意的组件选项。
* 当组件使用了混合对象时，混合对象的所有选项将被“混入”组件自己的选项中。
*/

// 混合：封装组件的一些复用功能



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
/*
* .extend()    创建基础 Vue 构造器的“子类”。参数是一个对象，包含组件选项。
*/

// 创建可复用的构造器 组件
var Component = Vue.extend({
    mixins: [myMixin]  // 定义的Component,继承了一个名为myMixin的混合
})
// 创建一个 Component 实例
var component = new Component()  // -> "hello from mixin!"



/*
* 选项合并
* 当混合对象与组件包含同名选项时，这些选项将以适当的策略合并。
* 例如，同名钩子函数被并入一个数组，因而都会被调用。
* 另外，混合的钩子将在组件自己的钩子之前调用。
*/





/*
* created钩子  在实例创建之后同步调用。
* 此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。但是还没有开始 DOM 编译，$el 还不存在。
*/

// 定义一个混合对象，这个对象里有一个created钩子
var mixinDemo = {
    created: function(){
        console.log('mixin hook called')
    }
}

new Vue({
    mixins: [mixinDemo], // 引入混合对象
    created: function(){ // 这个组件中也有一个created钩子
        console.log('component hook called')
    }
})

// 混合的钩子将在组件自己的钩子之前调用
// -> "mixin hook called"
// -> "component hook called"



// 值为对象的选项，如 methods, components 和 directives 将合并到同一个对象内。如果键冲突则组件的选项优先。
// Vue.extend() 使用同样的合并策略。
var mixinDemo2 = {
    methods: {
        foo: function() {
            conole.log('foo')
        },
        conflicting: function() {
            console.log('form minxin')
        }
    }
}

var vmObj = new Vue({
    mixins: [mixinDemo2],
    methods: {
        bar: function() {
            console.log('bar')
        },
        conflicting: function() {
            console.log('form self')
        }
    }
})

vmObj.foo(); // -> "foo"
vmObj.bar(); // -> "bar"
vmObj.conflicting(); // -> "from self"






/*
* 全局混合 Vue.mixin()
* 也可以全局注册混合。小心使用！一旦全局注册混合，它会影响所有之后创建的 Vue 实例。
* 如果使用恰当，可以为自定义选项注入处理逻辑：
*/

// 慎用全局混合，因为它影响到每个创建的 Vue 实例，包括第三方组件。在大多数情况下，它应当只用于自定义选项，就像下面示例一样。


// 为 `myOption` 自定义选项注入一个处理器
Vue.mixin({
    created: function() {
        var myOption = this.$options.myOption;
        if(myOption) {
            console.log(myOption);
        }
    }
})

new Vue({
    myOption: 'hello';
})

// -> "hello!"




/*
* 自定义选项合并策略
*/

// 在合并自定义选项时，默认的合并策略是简单地覆盖已有值。
// 如果想用自定义逻辑合并自定义选项，则向 Vue.config.optionMergeStrategies 添加一个函数：
Vue.config.optionMergeStrategies.myOption = function(toVal, fromVal) {
    // 返回 mergedVal
}

// 对于多数值为对象的选项，可以简单地使用 methods 所用的合并策略:
var strategies = Vue.config.optionMergeStrategies;
strategies.myOption = strategies.methods;









//
