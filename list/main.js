
/*
* 列表渲染
*/


/*
* v-for
* 可以使用 v-for 指令基于一个数组渲染一个列表。
* 这个指令使用特殊的语法，形式为 item in items，items 是数据数组，item 是当前数组元素的别名：
* $index，它是当前数组元素的索引：
*/

// 从 1.0.17 开始可以使用 of 分隔符，更接近 JavaScript 遍历器语法：<div v-for="item of items"></div>




var example1 = new Vue({
    el: "#example-1",
    data: {
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ]
    }
})


var example2 = new Vue({
    el: "#example-2",
    data: {
        parentMessage: 'Parent',
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ]
    }
})




/*
* template v-for
* 类似于 template v-if，也可以将 v-for 用在 <template> 标签上，以渲染一个包含多个元素的块。
*/
// <ul>
//   <template v-for="item in items">
//     <li>{{ item.msg }}</li>
//     <li class="divider"></li>
//   </template>
// </ul>




/*
* 数组变动检测
*/


// 变异方法
// Vue.js 包装了被观察数组的变异方法，故它们能触发视图更新。被包装的方法有：
/*  push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()
*/
// 修改上例example1的 items 数组, 添加一条信息。例
example1.items.push({message: 'Baz'})


// 替换数组
// 如 filter(), concat() 和 slice()，不会修改原始数组而是返回一个新数组。
// 在使用非变异方法时，可以直接用新数组替换旧数组：
// 用另一个数组替换数组是一个非常高效的操作。
example1.items = example1.items.filter(function(item) {
    return item.message.match(/Foo/)
})


// track-by
// 如果每个对象都有一个唯一 ID 的属性，便可以使用 track-by 特性给 Vue.js 一个提示，Vue.js 因而能尽可能地复用已有实例。
// 然后在替换数组 items 时，如果 Vue.js 遇到一个包含 _uid: '88937ds' 的新对象，它知道它可以复用这个已有对象的作用域与 DOM 元素。
var example3 = new Vue({
    el: "#example-3",
    data: {
        aa: [
            {
                _uid: '88937ds',
                name: "Jone"
            },
            {
                _uid: 'asd89da',
                name: "Jack"
            }
        ]
    }
})





/*
* 对象 v-for
* 也可以使用 v-for 遍历对象。除了 $index 之外，作用域内还可以访问另外一个特殊变量 $key。
*/

new Vue({
    el: "#repeatObject",
    data: {
        myObject: {
            firstName: 'Jhon',
            lastName: 'Doe',
            age: 30
        }
    }
})



/*
* 值域 v-for
*/

new Vue({
    el: "#demo",
    data: {

    }
})



/*
* 显示过滤/排序的结果
* 有时我们想显示过滤/排序过的数组，同时不实际修改或重置原始数据。有两个办法：
    创建一个计算属性，返回过滤/排序过的数组；
    使用内置的过滤器 filterBy 和 orderBy。
*/
