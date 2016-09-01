
/*
* 条件渲染
*/


/*
* v-if
*/


/*
* template v-if
* 把一个 <template> 元素当做包装元素，并在上面使用 v-if，最终的渲染结果不会包含它。
*/

var vm1 = new Vue({
    el: "#demo1",
    data: {
        ok: true
    }
})


/*
* v-show
* 不支持 <template>语法
*/


/*
* v-else
* v-else 元素必须立即跟在 v-if 或 v-show 元素的后面——否则它不能被识别。
* 可以用 v-else 指令给 v-if 或 v-show 添加一个 “else 块”：
*/

var vm2 = new Vue({
    el: "#demo2",
    data: {

    }
})
