
/*
* 计算属性
* 计算属性默认是getter，需要时也可以提供一个setter
*/


var app = new Vue({
    el: "#example",
    data: {
        a: 1
    },
    computed: {
        b: function(){
            return this.a + 1;
        }
    }
})

console.log("b = ", app.b);
app.a = 2;
console.log("b = ", app.b)


/*
* 计算属性 vs .$watch
*/
// Vue.js 提供了一个方法 $watch，它用于观察 Vue 实例上的数据变动。
// 当一些数据需要根据其它数据变化时， $watch 很诱人 —— 特别是如果你来自 AngularJS。
// 不过，通常更好的办法是使用计算属性而不是一个命令式的 $watch 回调。


// 使用 .$watch
var vm = new Vue({
    el: "#demo",
    data: {
        firstName: 'Foo',
        lastName: "Bar",
        fullName: "Foo Bar"
    }
})

vm.$watch('firstName', function(val) {
    this.fullName = val + '' + this.lastName;
})

vm.$watch('lastName', function(val){
    this.fullName = this.firstName + '' +val;
})


// 使用计算属性   推荐
var vm2 = new Vue({
    el: "#demo",
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
    },
    computed: {
        fullName: function(){
            return this.firstName + ' ' +this.lastName;
        }
    }
})




/*
* 计算setter
*/

// 现在在调用 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会有相应更新。
var vm3 = new Vue({
    el: "#demo",
    data: {
        firstName: 'Foo',
        lastName: 'Boo'
    },
    computed: {
        fullName: {
            // getter
            get: function(val){
                return this.firstName + ' ' + this.lastName;
            },
            // setter
            set: function(newValue){
                console.log("newValue-------", newValue)
                var names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
})

vm3.fullName = 'John Doe'
