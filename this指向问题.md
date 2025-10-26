## this 指向问题

1. 函数调用时，this 指向全局
2. 方法调用时 this 指向调用者
3. 构造函数调用时，this 指向实例对象
4. 箭头函数调用时，this 指向定义时的作用域的 this
5. 作为回调函数时，this 可能不指向原对象

```js
const obj = {
  a: 1,
  fn: function () {
    console.log(this.a);
  },
};

obj.fn(); // 1
setTimeout(obj.fn, 1000); //期望是1，但是this指向window，所以是undefined
//解决办法
setTimeout(obj.fn.bind(obj), 1000); //bind绑定this指向
setTimeout(() => obj.fn(), 1000); //箭头函数，this指向定义时的作用域的this
```

6. dom 事件绑定，this 指向触发事件的元素

```js
const button = {
  a: 1
  click: function() {
    console.log(this.a);
  }
}

document.getElementById("btn").addEventListener("click", button.click) //期望是1，但是this指向id为btn的元素，所以是undefined
// 解决办法
document.getElementById("btn").addEventListener("click", button.click.bind(button)) //bind绑定this指向
document.getElementById("btn").addEventListener("click", () => button.click()) //箭头函数，this指向定义时的作用域的this
```

7. 函数赋值给变量，this 指向该变量定义时的作用域的 this

```js
const obj = {
  a: 1,
  fn: function () {
    console.log(this.a);
  },
};
const obj2 = {
  a: 2,
  fn: obj.fn,
};
obj.fn(); //1
obj2.fn(); //2
const fn = obj.fn;
fn(); //undefined
```

8. 嵌套函数 this 指向会丢失

```js
const a = {
  b: 1,
  fn1: function () {
    console.log("fn1", this.b);

    function fn2() {
      console.log("fn2", this.b);
    }
    fn2();
  },
};

a.fn1(); // fn1 1 fn2 undefined
```

9. call、apply、bind 可以改变 this 指向
