## new.target 用于判断是否是通过 new 调用的

```js
function Person(name) {
  console.log(new.target);
  if (!new.target) throw new Error("Person() must be called with new");
  this.name = name;
  console.log(name);
}

try {
  Person("John");
} catch (e) {
  console.log(e);
}

try {
  new Person("John");
} catch (e) {
  console.log(e);
}
```
