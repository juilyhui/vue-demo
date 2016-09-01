
/*
* 列表渲染
*/


/*
* v-for
* 可以使用 v-for 指令基于一个数组渲染一个列表。
* 这个指令使用特殊的语法，形式为 item in items，items 是数据数组，item 是当前数组元素的别名：
* $index，它是当前数组元素的索引：
*/

var example1 = new Vue({
    el: "#example-1",
    data: {
        items: [
            {message: 'Foo'},
            {message: 'Bar'}
        ]
    }
})
