/*
* -----API-----
*/

/*
* 全局配置 -----
*/

// // debug     Boolean类型，默认为false
// // 只有开发版本可以使用调试模式
// Vue.config.debug = true; // 为所有的警告打印栈追踪; 把所有的锚节点以注释节点显示在 DOM 中，更易于检查渲染结果的结构。
//
// // delimiters     字符串数组（Array<string>）类型，默认值：["{{", "}}"]
// Vue.config.delimiters = ['${', '}'] //ES6 模板字符串。 修改文本插值的定界符。
// /*
// 例：默认的文本插值形式如下： <p>{{message}}</p>
// 按照上面的 Vue.config.delimiters = ['${', '}'] 修改之后，文本插值应该这么写：<p>${message}</p>
// */
//
// // unsafeDelimters     字符串数则类型，默认值：["{{{", "}}}"]
// Vue.config.unsafeDelimters = ['{!!", "!!}'] // 修改原生 HTML 插值的定界符。用法同 delimiters。
//
// // silent     Bloolean类型，默认为false
// Vue.config.silent = true; // 取消 Vue.js 所有的日志与警告。
//
// // async     Boolea类型，默认为true
// Vue.config.async = false; // 关闭异步模式，可能导致性能下降，并且影响 watcher 回调的调用顺序； async: false不推荐用在生产环境中。
//
// // devtools     Bloolean类型，默认为true(生产版为默认为false)
// // 该设置会在加载 Vue 之后立即同步
// Vue.config.devtools = true; // 允许 vue-devtools 检查代码。


/*
* 全局API -----
*/

//----- Vue.extend(options)     创建基础 Vue 构造器的“子类”。参数是一个对象，包含组件选项。可以创建组件构造器。el 和 data 选项，在 Vue.extend() 中它们必须是函数。
// @param {Object} options
var extendObj = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>'
})
var extendExample = new extendObj({
    data: {
        firstName: 'jin',
        lastName: 'jinghui',
        alias: 'juily'
    }
})
extendExample.$mount("#extend-div") // 初始化时没有指定元素（new Vue()中），调用vm.$mount()手动编译

//----- Vue.nextTick(callback)     延迟回调在下次 DOM 更新循环之后执行。在修改数据之后立即使用这个方法，等待 DOM 更新。
// @params {Func} callback
var nextTickVm = new Vue({
    el: '#nextTick-div',
    data: {
        msg: 'hai'
    }
})
nextTickVm.msg = 'hello';
console.log("befor nextTick ==", nextTickVm.$el.textContent) // -> hai  Dom没有更新
Vue.nextTick(function(){
    console.log("after nextTick ==", nextTickVm.$el.textContent) // -> hello  Dom更新了
})

//----- Vue.set(object, key, value) （全局方法） / vm.$set(key, value)   设置对象的属性。如果对象是响应的，将触发视图更新。这个方法主要用于解决 不能检测到属性添加的限制。
// @param {object} object
// @param {string} key
// @param {*} value
var setData = {a: 1}
var setVm = new Vue({
    el: '#set-div',
    data: setData
})
// setVm.b = 2; // html中 b 不响应
setVm.$set('b', 2); // html中 b 响应
Vue.set(setData, 'c', 3); // 全局方法

//----- Vue.delete(object, key)     删除对象的属性。如果对象是响应的，将触发视图更新。这个方法主要用于解决 不能检测到属性删除的限制。
// @param {Object} object
// @param {String} key
Vue.delete(setData, 'b'); // 删除了setData中的‘b’

//----- Vue.directive(id, [definition])     注册或获取全局指令。
// @param {String} id
// @param {Func | Object} [definition]
// 注册 第一种写法
Vue.directive('my-directive', {
    bind: function() {},
    update: function() {},
    unbind: function() {}
})
// 注册 第二种写法 传入一个函数
Vue.directive('my-directive', function(){
    // 这里相当于上面的 update 函数
})
// 获取，返回已注册的指令
var myDirective1 = Vue.directive('my-directive');

//----- Vue.elementDirective(id, [definition])     注册或获取全局的元素指令。
// @param {String} id
// @param {Object} [definition]
// 注册
Vue.elementDirective("my-element", {
    bind: function() {},
    unbind: function() {}
})
// 获取，返回已注册的元素指令
var elDirective = Vue.elementDirective('my-element')

//----- Vue.filter(id, [definition])     注册或获取全局过滤器
// @param {String} id
// @param {Func | Object} [definition]
// 注册
Vue.filter('my-filter', function(value){
    // return ... 返回处理后的值
})
// 注册 双向过滤器
Vue.filter('my-filter', {
    read: function() {},
    write: function() {}
})
// 获取 返回已注册的指令
var myFilter = Vue.filter('my-filter');

//----- Vue.component(id, [definition])     注册或获取全局组件
// @param {String} id
// @param {FUnc | Object} [definition]
// 注册组件，传入一个扩展的构造器
Vue.component('my-component', Vue.extend({
    // ...
}))
// 注册组件，传入一个选项对象（自动调用 Vue.extend()）
Vue.component('my-component', {
    // ...
})
// 获取注册的组件（始终返回构造器）
Vue.component = Vue.component('my-component');

//----- Vue.transition(is, [hooks])     注册或获取全局的过渡钩子对象
// @param {String} id
// @param {Object} [hooks]
// 注册
Vue.transition('fade', {
    enter: function(){},
    leave: function(){}
})
// 获取注册的钩子
var fadeTransition = Vue.transition('fade');

// Vue.partial(id, [partial])   注册或获取全局的partial(特殊元素)
// @param {String} id
// @param {String} [partial]
/*
关于 partial 特殊元素
<partial> 元素是已注册的 partial 的插槽，partial 在插入时被 Vue 编译。 <partial> 元素本身会被替换。<partial> 元素需要指定 name 特性。
*/
// 注册
Vue.partial('my-partial', '<div>Hi</div>');
// 获取注册的partial
var myPartial = Vue.partial('my-partial');

//----- Vue.use(plugin, [options])     安装 Vue.js 插件。
// @param {Object | Func} plugin
// @param {Object} [options]
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  // Vue.myGlobalMethod = ...
  // 2. 添加全局资源
  // Vue.directive('my-directive', {})
  // 3. 添加实例方法
  // Vue.prototype.$myMethod = ...
}
Vue.use(MyPulgin);
Vue.use(MyPulgin, {someOption: true}); // 传入一个选项对象

//----- Vue.mixin(mixin) 全局应用一个混合，将影响所有 Vue 实例。插件作者可以用它向组件注入自定义逻辑。不推荐。
// @param {Object} mixin




/*
* 选项/数据 -----
*/

//----- data   类型： Object | Func
// 在实例创建之后，可以用 vm.$data 访问原始数据对象。Vue 实例也代理了数据对象所有的属性。
// 名字以 _ 或 $开始的属性不会被 Vue 实例代理，因为它们可能与 Vue 的内置属性与 API 方法冲突。用 vm.$data._property 访问它们。
var data = {a: 1};
var dataVm = new Vue({
    data: data
})
console.log(dataVm.a)  // -> 1
dataVm.$data === data  // true
// 在组件中data必须是函数
var dataComponent = Vue.extend({
    data: function(){
        return {a: 1}
    }
})

//----- props   类型： Array | Object
// 包含一些特性：期望使用的父组件数据的属性。可以是数组或对象。对象用于高级配置，如类型检查，自定义验证，默认值等。
// 简单语法
Vue.component('props-demo-simple', {
    props: ['size', 'myMessage']
})
// 对象语法，指定验证要求
Vue.component('props-demo-advanced', {
    props: {
        // 只检测类型
        size: Number,
        // 检测类型 + 其他验证
        name: {
            type: String,
            required: true,
            // 双向绑定
            twoWay: true
        }
    }
})

//----- propsData   类型：Object   1.0.22+
// 只用于 new 创建实例中。在创建实例的过程传递 props。主要作用是方便测试。
var Comp = Vue.extend({
    props: ['msg'],
    template: '<div>{{msg}}</div>'
})
var compVm = new Comp({
    propsData: {
        msg: 'hello'
    }
})

//----- computed   类型：Object  实例计算属性
var computedVm = new Vue({
    data: {a: 1},
    computed: {
        // 仅读取，值只需为函数
        aDouble: function(){
            return this.a * 2;
        },
        // 读取和设置
        aPlus: {
            get: function(){
                return this.a + 1;
            },
            set: function(v){
                this.a = v - 1;
            }
        }
    }
})
computedVm.aPlus // -> 2
computedVm.aPlus = 3;  // 调用了aPlus里的set函数，set(3),this.a = 3-1 = 2;
computedVm.a // -> 2
computedVm.aDouble // -> 4

//----- methods   类型：Object  实例方法
// 实例可以直接访问这些方法，也可以用在指令表达式内。方法的 this 自动绑定到实例。
var methodsVm = new Vue({
    data: {a: 1},
    methods: {
        plus: function(){
            this.a++;
        }
    }
})
methodsVm.plus();
methodsVm.a // -> 2

//----- watch  类型：Object
// 一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项。在实例化时为每个键调用 $watch() 。
var watchVm = new Vue({
    data: {
        a: 1
    },
    watch: {
        'a': function(val, oldVal){
            console.log('new: %s, old: %s', val, oldVal);
        },
        'b': 'someMethod', // someMethod 为方法名
        // 深度 watcher
        'c': {
            handler: function(val, oldVal){/*...*/},
            deep: true
        }
    }
})
watchVm.a = 2 // -> new: 2, old: 1




 /*
 * 选项 / Dom -----
 */

//----- el   类型：String | HTMLElement | Function（在组件定义中只能是函数）
// 值可以是 CSS 选择符，或实际 HTML 元素，或返回 HTML 元素的函数。元素可以用 vm.$el 访问。
// 如果在初始化时指定了这个选项，实例将立即进入编译过程。否则，需要调用 vm.$mount()，手动开始编译。

//----- template 类型：String   实例模板。
// 模板默认替换挂载元素。如果 replace 选项为 false，模板将插入挂载元素内。
// 两种情况下，挂载元素的内容都将被忽略，除非模板有内容分发 slot。

//----- replace   类型： Boolean   默认为：true   只能与 template 选项一起用。   决定是否用模板替换挂载元素。
// 如果设为 true（这是默认值），模板将覆盖挂载元素，并合并挂载元素和模板根节点的 attributes。
// 如果设为 false 模板将覆盖挂载元素的内容，不会替换挂载元素自身。
new Vue({
    el: '#replace',
    template: '<p class="bar">replaced</div>'
})
// 把html中的<div id="replace" class="foo"></div>替换成<p class="foo bar" id="replace">replaced</p>
// replace 设为 false 的情况
new Vue({
    el: '#insert',
    replace: false,
    template: '<p class="bar">inserted</p>'
})
// 获取到html中的<div id="insert" class="foo"></div>，变成
// <div id="insert" class="foo">
//   <p class="bar">inserted</p>
// </div>




/*
* 选项/生命周期钩子-----
*/

//----- init  类型：Func   在实例开始初始化时同步调用。此时数据观测、事件和 watcher 都尚未初始化。

//----- created   类型：Func   在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。但是还没有开始 DOM 编译，$el 还不存在。

//----- beforeCompile   类型：FUnc   在编译开始前调用。

//----- compiled   类型：FUnc   在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新。但是不担保 $el 已插入文档。

//----- ready   类型：FUnc   在编译结束和 $el 第一次插入文档之后调用，如在第一次 attached 钩子之后调用。注意必须是由 Vue 插入（如 vm.$appendTo() 等方法或指令更新）才触发 ready 钩子。

//----- attached   类型：FUnc   在 vm.$el 插入 DOM 时调用。必须是由指令或实例方法（如 $appendTo()）插入，直接操作 vm.$el 不会 触发这个钩子。

//----- detached   类型：FUnc   在 vm.$el 从 DOM 中删除时调用。必须是由指令或实例方法删除，直接操作 vm.$el 不会 触发这个钩子。

//----- beforeDestroy   类型：FUnc   在开始销毁实例时调用。此时实例仍然有功能。

//----- destroyed   类型：FUnc   在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，所有的子实例也已经被销毁。如果有离开过渡，destroyed 钩子在过渡完成之后调用。
