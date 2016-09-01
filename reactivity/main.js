
/*
* 响应式原理
* 响应系统 —— 模型只是普通对象，修改它则更新视图。
*/


// 如何追踪变化----


// 变化检测问题----
// 受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。
// 因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。
var data = {a: 1};
var vm = new Vue({
    data: data
})
// `vm.a` 和 `data.a` 现在是响应的
vm.b = 2 // `vm.b` 不是响应的，后来添加的属性
data.b = 2 // `data.b` 不是响应的，后来添加的属性


// 不过，有办法在实例创建之后添加属性并且让它是响应的。

// 对于 Vue 实例，可以使用 $set(key, value) 实例方法：
vm.$set('b', 2); // `vm.b` 和 `data.b` 现在是响应的

// 对于普通数据对象，可以使用全局方法 Vue.set(object, key, value)：
Vue.set(data, 'c', 3); // `vm.c` 和 `data.c` 现在是响应的

// 有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 添加属性。
// 但是，添加到对象上的新属性不会触发更新。这时可以创建一个新的对象，包含原对象的属性和新的属性：
// 不使用 Object.assign(this.someObject, {a:1, b:2})
this.someObject = Object.assign({}, this.someObject, {a:1, b:2})


// 初始化数据----


// 推荐在 data 对象上声明所有的响应属性。

// 不推荐
var vm = new Vue({
    template: '<div>{{msg}}</div>'
})
vm.$set('smg', 'Hello!')

// 推荐
var vm = new Vue({
    data: {
        // 以一个空值声明 `msg`
        msg: ''
    },
    template: '<div>{{msg}}</div>'
})
// 然后设置 `msg`
vm.msg = 'Hello!';


// 异步更新队列----
// Vue.js 默认异步更新 DOM。每当观察到数据变化时，Vue 就开始一个队列，将同一事件循环内所有的数据变化缓存起来。
// 如果一个 watcher 被多次触发，只会推入一次到队列中。
// 等到下一次事件循环，Vue 将清空队列，只进行必要的 DOM 更新。
// 在内部异步队列优先使用 MutationObserver，如果不支持则使用 setTimeout(fn, 0)。
// MutationObserver h5新特性




// 计算属性的奥秘


// 例子
// 计算属性example只有一个依赖： vm.msg
// Dtae.now() 不是相应依赖，因为它跟Vue的数据观察系统无关。
// 因此，在访问vm.example时会发现时间戳不变，除非vm.msg变了。
var vm = new Vue({
    data: {
        msg: 'hi'
    },
    computed: {
        // example: function(){
        //     return Date.now() + this.msg;
        // }
        example: {
            cache: false, // 为指定的计算属性关闭缓存，这样每次访问vm.example时，时间戳都是新的。但是，只是在 JavaScript 中访问是这样的；数据绑定仍是依赖驱动的（如果在模块中这样绑定计算属性 {{example}}，只有响应依赖发生变化时才更新 DOM。）。
            get: function(){
                return Date.now() + this.msg;
            }
        }
    }
})
