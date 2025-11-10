## js 中的错误类型

1. Error 常用于自定义错误时出现

```js
new Error("error message"); //Error: error message
```

2. EvalError 当错误使用 eval 函数时出现

3. RangeError 当使用超出范围的数字时出现

```js
new Array(-1); //RangeError: Invalid array length
```

4. ReferenceError 当使用未定义的变量时出现

```js
let a = 1;
a = b; //ReferenceError: b is not defined
```

5. SyntaxError 当语法错误时出现

```js
let person = {name: 'zhangsan'; age: 18}; //Uncaught SyntaxError: Unexpected token ';'
```

6. TypeError 当类型错误时出现

```js
let a = 1;
a(); //Uncaught TypeError: a is not a function
```
