
/*
* 过渡
* 通过 Vue.js 的过渡系统，可以在元素从 DOM 中插入或移除时自动应用过渡效果。
* Vue.js 会在适当的时机为你触发 CSS 过渡或动画，你也可以提供相应的 JavaScript 钩子函数在过渡过程中执行自定义的 DOM 操作。
*/

// transition 特性可以与下面资源一起用：
// v-if
// v-show
// v-for （只在插入和删除时触发，使用 vue-animated-list 插件）
// 动态组件 （介绍见组件）
// 在组件的根节点上，并且被 Vue 实例 DOM 方法（如 vm.$appendTo(el)）触发。




// 当多个元素一起过渡时，Vue.js 会批量处理，只强制一次布局。

/*
* CSS 过渡
*/
new Vue({
    el: "#demo1",
    data: {
        show: false,
    },
    methods: {
        toggle: function(){
            var _this = this;
            _this.show = !_this.show;
        }
    }
})

Vue.transition('expand', {
    beforeEnter: function(el) {
        el.textContent = 'beforeEnter';
    },
    enter: function(el) {
        el.textContent = 'enter';
        // 没有第二个参数
        // 由 CSS transitionend 事件决定过渡何时结束

        // 有第二个参数  function(el, done){}
        // 过渡只有在调用 `done` 时结束
    },
    afterEnter: function (el) {
        el.textContent = 'afterEnter'
    },
    enterCancelled: function (el) {
        // handle cancellation
    },
    beforeLeave: function (el) {
        el.textContent = 'beforeLeave'
    },
    leave: function (el) {
        el.textContent = 'leave'
    },
    afterLeave: function (el) {
        el.textContent = 'afterLeave'
    },
    leaveCancelled: function (el) {
        // handle cancellation
    }
})






/*
* CSS动画
* CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。
*/



/*
* JavaScript 过渡
* 也可以只使用 JavaScript 钩子，不用定义任何 CSS 规则。
* 当只使用 JavaScript 过渡时，enter 和 leave 钩子需要调用 done 回调，否则它们将被同步调用，过渡将立即结束。
*/

// 为 JavaScript 过渡显式声明 css: false 是个好主意，Vue.js 将跳过 CSS 检测。这样也会阻止无意间让 CSS 规则干扰过渡。

// 在下例中我们使用 jQuery 注册一个自定义的 JavaScript 过渡：

Vue.transition('fade', {
    css: false,
    enter: function(el, done) {
        $(el).css('opacity', 0).animate({
            opacity: 1
        }, 1000, done)
    },
    enterCancelled: function(el){
        $(el).stop()
    },
    leave: function(el, done){
        $(el).animate({
            opacity: 1
        }, 1000, done)
    },
    leaveCancelled: function(el) {
        $(el).stop();
    }

})
