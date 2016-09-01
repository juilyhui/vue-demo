/*
* 指令
*/

// 可以用 Vue.directive(id, definition) 方法注册一个全局自定义指令，它接收两个参数指令 ID 与定义对象。
// 也可以用组件的 directives 选项注册一个局部自定义指令。


/*
* 钩子函数
* 定义对象可以提供几个钩子函数（都是可选的）：
* bind  只调用一次，在指令第一次绑定到元素上时调用。
* update  在 bind 之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值。
* unbind  只调用一次，在指令从元素上解绑时调用。
*/

Vue.directive('my-directive', {
    bind: function(){
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
    },
    update: function(){
        // 值更新时的工作
        // 也会以初始值为参数调用一次
    },
    unbind: function(){
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
    }
})

// 当只需要 update 函数时，可以传入一个函数替代定义对象：
Vue.directive('my-directive', function(value) {
    // 这个函数相当于 update()
})


/*
* 指令实例属性
* 所有的钩子函数将被复制到实际的指令对象中，钩子内 this 指向这个指令对象。这个对象暴露了一些有用的属性：
* el 指令绑定的元素
* vm 拥有该指令的上下文 ViewModel。
* expression 指令的表达式，不包括参数和过滤器。
* arg 指令的参数。
* name 指令的名字，不包含前缀。
* modifiers 一个对象，包含指令的修饰符。
* descriptor 一个对象，包含指令的解析结果。
*
* 你应当将这些属性视为只读的，不要修改它们。你也可以给指令对象添加自定义属性，但是注意不要覆盖已有的内部属性。
*/



Vue.directive('demo', {
    bind: function(){
        console.log('demo bound!')
    },
    update: function(value){
        this.el.innerHTml =
            'name - ' + this.name + '<br>' +
            'expression - ' + this.expression + '<br>' +
            'argument - '   + this.arg + '<br>' +
            'modifiers - '  + JSON.stringify(this.modifiers) + '<br>' +
            'value - '      + value
    }
})

var demo = new Vue({
    el: '#demo',
    data: {
        msg: 'hello!'
    }
})








/*
* 高级选项
*/

/*
* params
* 自定义指令可以接收一个 params 数组，指定一个特性列表，Vue 编译器将自动提取绑定元素的这些特性。例如：
*/
// <div v-example a="hi"></div>
Vue.directive('example', {
    params: ['a'],
    bind: function() {
        console.log(this.params.a) // -> "hi"
    }
})
// 此 API 也支持动态属性。this.params[key] 会自动保持更新。另外，可以指定一个回调，在值变化时调用：
// <div v-example v-bind:a="someValue"></div>
Vue.directive('example', {
    params: ['a'],
    paramsWatchers: {
        a: function(val, oldVal) {
            console.log('a chenged!')
        }
    }
})


/*
* deep
* 如果自定义指令用在一个对象上，当对象内部属性变化时要触发 update，则在指令定义对象中指定 deep: true。
*/

// <div v-my-directive="obj"></div>
Vue.directive('my-directive', {
    deep: true,
    update: function(obj) {
        // 在 `obj` 的嵌套属性变化时调用
    }
})


/*
* twoWay
* 如果指令想向 Vue 实例写回数据，则在指令定义对象中指定 twoWay: true 。该选项允许在指令中使用 this.set(value):
*/

Vue.directive('example', {
    twoWay: true,
    bind: function() {
        this.handler = function() {
            // 将数据写回 vm
            // 如果指令这样绑定 v-example="a.b.c"
            // 它将用给定值设置 `vm.a.b.c`
            this.set(this.el.value)
        }.bind(this);
        this.el.addEventListener('input', this.handler);
    },
    unbind: function(){
        this.el.removeEventListner('input', this.handler);
    }
})

/*
* acceptStatement
* 传入 acceptStatement:true 可以让自定义指令接受内联语句，就像 v-on 那样：
*/

// <div v-my-directive="a++"></div>
Vue.directive('my-directive', {
    acceptStatement: true,
    update: function(fn) {
        // 传入值是一个函数
        // 在调用它时将在所属实例作用域内计算 "a++" 语句
    }
})

/*
* terminal
*
*/



/*
* priority
* 可以给指令指定一个优先级。如果没有指定，普通指令默认是 1000， terminal 指令默认是 2000。
*/
