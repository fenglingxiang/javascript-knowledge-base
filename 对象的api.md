## 对象的 api

1. 创建和定义对象

```js
const obj = Object.create({});
Object.defineProperty(obj, "name", {
  value: "zs",
  enumerable: true,
  writable: true,
  configurable: true,
});
Object.defineProperties(obj, {
  name: {
    value: "zs",
    enumerable: true,
    writable: true,
    configurable: true,
  },
  age: {
    value: 18,
    enumerable: true,
    writable: true,
    configurable: true,
  },
});
```

2. 遍历和访问

```js
const obj = { a: 1, b: 2, c: 3, [Symbol("d")]: 4 };
Object.keys(obj); // ["a", "b", "c"]
Object.values(obj); // [1, 2, 3]
Object.entries(obj); //[["a", 1], ["b", 2], ["c", 3]
Object.getOwnPropertyNames(obj); // ["a", "b", "c"]
Object.getOwnPropertySymbols(obj); // [Symbol("d")]
```

3. 属性描述

```js
const obj = { a: 1, b: 2, c: 3, [Symbol("d")]: 4 };

Object.getOwnPropertyDescriptor(obj, "a"); // {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptors(obj); // {a: {value: 1, writable: true, enumerable: true, configurable: true}, b: {value: 2, writable: true, enumerable: true, configurable: true}, c: {value: 3, writable: true, enumerable: true, configurable: true}, Symbol(d): {value: 4, writable: true, enumerable: true, configurable: true}}
```

4. 对象保护

```js
const obj = { a: 1, b: 2, c: 3, [Symbol("d")]: 4 };
Object.freeze(obj); //浅冻结对象，不可新增修改删除，对象内的应用类型属性不受影响
Object.isFrozen(obj); //true 判断是否冻结
Object.seal(obj); //密封对象 对象无法新增删除，但是可以修改
Object.isSealed(obj); //true 判断是否密封
Object.preventExtensions(obj); //禁止扩展，无法新增属性
Object.isExtensible(obj); //true 判断是否禁止扩展
```

5. 原型操作

```js
const obj = { a: 1, b: 2, c: 3, [Symbol("d")]: 4 };
Object.setPrototypeOf(obj, { a: 100, b: 200 }); //设置原型
Object.getPrototypeOf(obj); //获取原型
```

6. 比较和合并

```js
const obj1 = { a: 1 };
const obj2 = { a: 1 };

Object.is(obj1, obj2); //false 判断两个对象是否相等
Object.assign(obj1, obj2); //合并对象，将obj2的属性合并到obj1，返回obj1
```

7. 数组转换成对象

```js
const arr = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
];
Object.fromEntries(arr); //{a: 1, b: 2, c: 3}
```
