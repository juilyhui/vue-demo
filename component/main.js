/*
* 组件
*/

// 定义
var MyComponent = Vue.extend({
    template: '<div>A custom compent!</div>'
})
// 注册
Vue.component('my-component', MyComponent);

// 在一个步骤中扩展与注册，将上面两个个步骤合并的写法
// Vue.component('my-component', {
//     template: '<div>A custom component!</div>'
// })

// 创建根实例
new Vue({
    el: "#example"
})



/*
* 局部注册
*/
var Child = Vue.extend({
    // ...
})
var Parent = Vue.extend({
    template: '...',
    component: {
        // <my-component> 只能用在父组件模板内
        'my-component': Child
    }
})


/*
* 注册语法糖
*/

// 在一个步骤中扩展与注册
Vue.component('my-component', {
    template: '<div>A custom component!</div>'
})

// 局部注册也可以这么做
var Parent = Vue.extend({
    component: {
        'my-component': {
            template: '<div>A custom component!</div>'
        }
    }
})

/*
* 组件选项问题
*/

// 传入 Vue 构造器的多数选项也可以用在 Vue.extend() 中，不过有两个特例： data 和 el。试想如果我们简单地把一个对象作为 data 选项传给 Vue.extend()：
var data = {a: 1};
var MyComponent = Vue.extend({
    // data: data // 这么做的问题是 MyComponent 所有的实例将共享同一个 data 对象！
    data: function() { // 我们应当使用一个函数作为 data 选项，让这个函数返回一个新对象; 同理，el 选项用在 Vue.extend() 中时也须是一个函数。
        return {a: 1}
    }
})

/*
* 模板解析
* Vue 的模板是 DOM 模板，使用浏览器原生的解析器而不是自己实现一个。
* 相比字符串模板，DOM 模板有一些好处，但是也有问题，它必须是有效的 HTML 片段。一些 HTML 元素对什么元素可以放在它里面有限制。
* 对于自定义元素，应当使用 is 特性：
*/

// 例如 <my-select><option>...</option></my-select> 不是有效的模板，即使 my-select 组件最终展开为 <select>...</select>。


/*
* Props
*/

/*
* 使用Props传递数据
* 组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。
* 名字形式为 camelCase 的 prop 用作特性时，需要转为 kebab-case（短横线隔开）
*/

// “prop” 是组件数据的一个字段，期望从父组件传下来。子组件需要显式地用 props 选项 声明 props：
Vue.component('child', {
    // 声明 props
    props: ['msg'],
    // prop 可以用在模板内
    // 可以用 `this.msg` 设置
    template: '<span>{{msg}}</span>'
})

/*
* 动态Props
*/

/*
* Props 绑定类型
* 默认为但想绑定: 父组件的属性变化时，将传给子组件。
* .sync 双向绑定
* .once 单次绑定
*/

/*
* Props验证
* 组件可以为 props 指定验证要求。当组件给其他人使用时这很有用，因为这些验证要求构成了组件的 API，确保其他人正确地使用组件。此时 props 的值是一个对象，包含验证要求：
* type   String、Number、Boolean、Function、Object、Array
* 当 prop 验证失败了，Vue 将拒绝在子组件上设置此值
*/
Vue.component('example', {
    props: {
        // 基础类型检测 （`null` 意思是任何类型都可以）
        propA: Number,
        // 多种类型 (1.0.21+)
        propM: [String, Number],
        // 必需且是字符串
        propB: {
          type: String,
          required: true
        },
        // 数字，有默认值
        propC: {
          type: Number,
          default: 100
        },
        // 对象/数组的默认值应当由一个函数返回
        propD: {
          type: Object,
          default: function () {
            return { msg: 'hello' }
          }
        },
        // 指定这个 prop 为双向绑定
        // 如果绑定类型不对将抛出一条警告
        propE: {
          twoWay: true
        },
        // 自定义验证函数
        propF: {
          validator: function (value) {
            return value > 10
          }
        },
        // 转换函数（1.0.12 新增）
        // 在设置值之前转换值
        propG: {
          coerce: function (val) {
            return val + '' // 将值转换为字符串
          }
        },
        propH: {
          coerce: function (val) {
            return JSON.parse(val) // 将 JSON 字符串转换为对象
          }
        }
    }
})

/*
* 父子组件通信
*/

// 父链  子组件可以用 this.$parent 访问它的父组件。根实例的后代可以用 this.$root 访问它。父组件有一个数组 this.$children，包含它所有的子元素。

// 自定义事件
// $.on() 监听事件
// $emit() 在它上面触发事件
// $dispatch() 派发事件，沿父链冒泡
// $broadcast() 广播事件，向下传导给所有后代
// 不同于 DOM 事件，Vue 事件在冒泡过程中第一次触发回调之后自动停止冒泡，除非回调明确返回 true。

// 注册子组件
// 将当前消息派发出去
Vue.component('child', {
    template: '#child-template',
    data: function(){
        return {msg: 'hello'}
    },
    methods: {
        notify: function(){
            if(this.msg.trim()){ // .trim() 删除字符串左右两边空格
                this.$dispatch('child-msg', this.msg) // $dispatch() 派发事件，沿父链冒泡
                this.msg = ''
            }
        }
    }
})
// 初始化父组件
// 将受到消息时将事件推入到一个数组
var parent = new Vue({
    el: "#event-example",
    data: {
        message: []
    },
    // 在创建实例时 `events` 选项简单地调用 `$on`
    events: {
        "child-msg": function(msg){
            // 事件回调内的 `this` 自动绑定到注册它的实例上
            this.message.push(msg)
        }
    }
})

/*
* 使用Slot分发内容
*/


/*
* 动态组件
*
*/

// 多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 <component> 元素，动态地绑定到它的 is 特性：
new Vue({
    el: 'body',
    data: {
        currentView: 'home',
    },
    component: {
        home: {},
        posts: {},
        archive: {}
    }
})
// <component :is="currentView">
//   <!-- 组件在 vm.currentview 变化时改变 -->
// </component>

// keep-alive  如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数：
// <component :is="currentView" keep-alive>
//   <!-- 非活动组件将被缓存 -->
// </component>

// activate 钩子
// 在切换组件时，切入组件在切入前可能需要进行一些异步操作。为了控制组件切换时长，给切入组件添加 activate 钩子：
// 注意 activate 钩子只作用于动态组件切换或静态组件初始化渲染的过程中，不作用于使用实例方法手工插入的过程中。
Vue.component('avticate-example', {
    activate: function(done){
        var self = this;
        loadDataAsync(function(data){
            self.someData = data;
            done();
        })
    }
})

// transition-mode 用于指定两个动态组件之间如何过渡
// 在默认情况下，进入与离开平滑地过渡。
// 这个特性可以指定另外两种模式：
// in-out 新组件先过渡进入，等它的过渡完成之后当前组件过渡出去。
// out-in 当前组件先过渡出去，等它的过渡完成之后新组件过渡进入。
