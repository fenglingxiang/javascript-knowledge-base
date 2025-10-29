## ES6-ES12 更新

1. ES6(2015)

- class 类

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  speak() {
    console.log(`我叫${this.name},今年${this.age}岁了`);
  }
}

const person = new Person("张三", 18);
person.speak();
```

- ES Module(模块化)

```js
// config.js
export const fn = () => {};

export default {
  x: 1,
  y: 2,
};

// use.js
import config, { fn } from "./config.js";
```

- Arrow Function(箭头函数)

```js
const fn = (x, y) => x + y;
```

- 函数参数默认值

```js
const fn = (x = 1, y = 2) => x + y;

fn(); // 3
fn(10, 20); // 30
```

- 模板字符串

```js
const name = "张三";
const age = 18;
const str = `我叫${name},今年${age}岁了`;
```

- 结构赋值

```js
const obj = {
  a: 1,
  b: 2,
};

const { a, b } = obj;
console.log(a, b); //1, 2

[a, b] = [b, a];
console.log(a, b); //2, 1
```

- 扩展运算符

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]
```

- 对象属性简写

```js
const name = "张三";
const age = 18;
const obj = { name, age }; // {name: "张三", age: 18}
```

- Promise

```js
function fn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

fn().then(res => {
  console.log(res); // 1
});
```

- let\const(块级作用域, 不会变量提升, 不支持重复声明, const 声明的变量不能修改)

```js
let a = 1;
const b = 2;
```

2. ES7(2016)

- Array.prototype.includes

```js
const arr = [1, 2, 3];
arr.includes(3); // true
```

- 指数运算符

```js
const a = 2 ** 3; // 8
```

3. ES8(2017)

- async/await

```js
function fn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

async function fn1() {
  const res = await fn();
  console.log(res); //1
}
```

- Object.values/Object.entries

```js
const obj = { a: 1, b: 2 };
Object.values(obj); //[1, 2] 获取对象属性值组成的数组
Object.entries(obj); // [["a", 1], ["b", 2]] 获取对象属性名和属性值组成的二维数组
```

- String padding (padStart, 长度不够的头部填充, padEnd, 长度不够的尾部填充)

```js
const str = "abc";
str.padStart(5, "0"); //"00abc" 第一个参数是字符串长度，第二个参数是填充的字符，默认是空格
str.padEnd(5, "0"); //"abc00"
```

- Object.getOwnPropertyDescriptors (获取对象属性的描述对象)

- SharedArrayBuffer 对象 (一个用来表示通用的，固定长度的原始二进制数据缓冲区，用来在共享内存上分配大型，固定长度的数组)

- Atomics 对象 (提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作)

4. ES9(2018)

- 异步迭代 (await 和 for...of 结合使用)

```js
async function fn(arr) {
  for await (let item of arr) {
    // ...
  }
}
```

- Promise.finally (添加一个 finally 回调, 不管 Promise 最终是 resolved 还是 rejected, 都会执行)

```js
Promise.resolve(1).finally(() => {
  console.log("finally");
});
```

- Rest/Spread 属性 (Rest 参数和扩展运算符)

```js
function fn(...args) {
  console.log(args);
}
fn(1, 2, 3); //[1, 2, 3]
```

- 正则表达式命名捕获组

```js
const regx = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = regx.exec("2025-10-29");
console.log(match[0]); // 2025-10-29
console.log(match[1]); // 2025
console.log(match[2]); // 10
console.log(match[3]); // 29
console.log(match.groups.year); // 2025
console.log(match.groups.month); // 10
console.log(match.groups.day); // 29
```

- 正则表达式反向断言

```js
const str = "12-34, 56-78";
const regx1 = /(?<=\-)\d{2}/g; // 正向反向断言 匹配一个位置，该位置前面满足给定的条件
const regx2 = /(?<!\-)\d{2}/g; //负向反向断言 匹配一个位置，该位置前面不满足给定的条件
str.match(regx1); //["34", "78"]
str.match(regx2); //["12", "56"]
```

5. ES10(2019)

- flat 和 flatMap

```js
const arr = [1, [2, [3, [4]]]];
arr.flat(Infinity); //[1, 2, 3, 4]

const arr1 = [1, 2, 3, 4];
arr1.flatMap(item => [item * 2]); //[2, 4, 6, 8]
```

- String.trimStart 和 String.trimEnd (去除字符串首尾空格)

- String.prototype.matchAll (返回一个包含所有匹配对象的迭代器)

- Symbol.prototype.description (返回 Symbol 的描述属性)

- Object.fromEntries (它将一个键值对列表（通常是一个数组）转换成一个对象)

6. ES11(2020)

- 空值处理 (表达式在 ?? 的左侧 运算符求值为 undefined 或 null，返回其右侧)

```js
const a = null ?? 1; //1
const b = undefined ?? 2; //2
const c = 0 ?? 3; //0
const d = "" ?? 4; //""
const e = false ?? 5; //false
```

- 可选链 (?.用户检测不确定的中间节点)

```js
const obj = {};
// obj.a.b.c 会报错 typeError: Cannot read property 'c' of undefined

obj.a?.b?.c; //undefined
```

- promise.allSettled (返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 Promise，并带有一个对象数组，每个对象表示对应的 promise 结果)

```js
const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
const p3 = Promise.resolve(3);

Promise.allSettled([p1, p2, p3]).then(res => {
  console.log(res); //[{status: "fulfilled", value: 1}, {status: "rejected", reason: 2}, {status: "fulfilled", value: 3}]
});
```

- import 按需导入

```js
// a.js
export const a = 1;

// b.js
import { a } from "./a.js";
```

- 新基本数据类型 BigInt (任意精度的整数)

- globalThis (全局对象, 在浏览器中是 window, 在 node 中是 global, 在 web worker 中是 self)

7. ES12(2021)

- String.prototype.replaceAll (替换所有匹配的字符串)

```js
const str = "123-456-789";
str.replaceAll("-", ""); // "123456789"
```

- Promise.any (返回一个 promise，只要给定的迭代中的一个 promise 成功，就立即 resolve。如果所有 promises 都失败，就返回一个 reject 的 promise)

```js
const p1 = Promise.reject(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject(3);

Promise.any([p1, p2, p3]).then(res => {
  console.log(res); //2
});

Promise.any([p1, p3]).catch(error => {
  console.error("Error:", error); //Error: AggregateError: All promises were rejected
});
```

- WeakRefs (WeakRef 对象允许你引用另一个对象，而不阻止被引用对象被垃圾回收)

- 逻辑运算符和赋值表达式

```js
a ||= b; //相当于a = a || a = b

a &&= b; //相当于a = a && a = b

a ??= b; //相当于a = a ?? a = b
```

- 数字分隔符，通过"_" 分割数字,增加可读性

```js
const num = 1_000_000; //等价于1000000


```
