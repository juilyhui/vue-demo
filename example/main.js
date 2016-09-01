
/*
* 实例
*/

var data = {a: 1};

var vm = new Vue({
    // 选项  可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。
    el: "#example",
    data: data
})

// vm.a === data.a   会互相影响

// vm.$data === data

// vm.$el === document.getElementById('example')

// $watch 是一个实例方法
vm.$watch('a', function(newVal, oldVal){
    // 这个回调将在 `vm.a`  改变后调用
})



// 扩展 Vue 构造器
var MyComponent = Vue.extend({
    // 扩展选项
})
