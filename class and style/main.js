
/*
* Class 与 Style 绑定
*/



/*
* 1、绑定 HTML Class  v-bind:class=""
* 尽管可以用 Mustache 标签绑定 class，比如 class="{{ className }}"，但是我们不推荐这种写法和 v-bind:class 混用。两者只能选其一！
*/

// 对象语法
var vm = new Vue({
    el: '#demo',
    data: {
        isA: true,
        isB: false,
        classObject: {
            'class-c': true,
            'class-d': true
        },
    },
    computed: {
        classComputed: function(){
            return this.isA ; // 绑定一个返回对象的计算属性
        }
    }
})

// 数组语法
var vm2 = new Vue({
    el: '#demo2',
    data: {
        classA: 'class-a',
        classB: 'class-b',
        isA: true,
        isB: true,
        isC: false
    }
})


/*
* 2、绑定内联样式  v-bind:style=""
* 当 v-bind:style 使用需要厂商前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
*/

// 对象语法
// CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：
var vm3 = new Vue({
    el: "#demo3",
    data: {
        activeColor: 'red',
        fontSize: 30,
        styleObject: {
            color: 'red',
            fontSize: '13px'
        }
    }
})

// 数组语法
var vm4 = new Vue({
    el: "#demo4",
    data: {
        styleObjectA: {
            color: "blue",
        },
        styleObjectB: {
            fontSize: "14px"
        }
    }
})
