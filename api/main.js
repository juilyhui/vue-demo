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
extendExample.$mount("#extend-div")

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
}）
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
