

/*
* 过滤器
*/

// 可以用全局方法 Vue.filter() 注册一个自定义过滤器，它接收两个参数：过滤器 ID 和过滤器函数。


Vue.filter('reverse', function(value) {
    return value.split('').reverse().join('')
})

// 过滤器函数可以接收任意数量的参数：

Vue.filter('wrap', function(value, begin, end) {
    return begin + value + end
})


/*
* 双向过滤器
*/

Vue.filter('currencyDisplay',
    // model -> view
    // 在更新 `<input>` 元素之前格式化值
    read: function(val) {
        return '$' + val.toFixed(2);
    },
    // view -> model
    // 在写回数据之前格式化值
    write: function(val, oldVal) {
        var number = + val.replace(/[^\d.]/g, '');
        return isNaN(number) ? 0 : parseFloat(number.toFixed(2));
    }
})

/*
* 动态参数
*/

// 如果过滤器参数没有用引号包起来，则它会在当前 vm 作用域内动态计算。另外，过滤器函数的 this 始终指向调用它的 vm。例如：

// <input v-model="userInput">
// <span>{{msg | concat userInput}}</span>
Vue.filter('concat', function(value, input) {
    // `input` === `this.userInput`
    return value + input;
})
