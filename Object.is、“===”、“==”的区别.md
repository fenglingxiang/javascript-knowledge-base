## Object.is、“===”、“==”的区别

1. "=="：会进行类型转换，如果类型不同，会进行类型转换，然后进行比较

```js
"1" == 1; // true "1"会先转换为1，然后进行比较

"1" == true; // true "1"会先转换为1，true也会转换成1，然后进行比较

null == undefined; //直接返回true

// 对象 → 原始值 (使用 valueOf() 或 toString())
"1" == { a: 1 }; //false {a: 1}会调用toString()转换为"[object Object]"，然后进行比较

// 如何使a==1&&a==2&&a==3 成立
let a = {
  value: 1,
  valueOf: function () {
    return this.value++;
  },
};
a == 1 && a == 2 && a == 3; //true
```

### 转换流程

```text
A == B 的比较过程：

1. 如果 Type(A) === Type(B)
   → 返回 A === B 的结果

2. 如果 A 是 null, B 是 undefined
   → 返回 true

3. 如果 A 是 undefined, B 是 null
   → 返回 true

4. 如果 A 是数字, B 是字符串
   → 返回 A == ToNumber(B)

5. 如果 A 是字符串, B 是数字
   → 返回 ToNumber(A) == B

6. 如果 A 是布尔值
   → 返回 ToNumber(A) == B

7. 如果 B 是布尔值
   → 返回 A == ToNumber(B)

8. 如果 A 是字符串/数字, B 是对象
   → 返回 A == ToPrimitive(B)

9. 如果 A 是对象, B 是字符串/数字
   → 返回 ToPrimitive(A) == B

10. 其他情况
   → 返回 false

ToPrimitive 对象 → 原始值 (使用 valueOf() 或 toString())
```

2. "==="：不会进行类型转换，如果类型不同，直接返回 false

3. Object.is：判断两个值是否相等，与 "===" 类似，但是有一些区别

```js
// 特殊情况
NaN === NaN; //false
Object.is(NaN, NaN); //true
+0 === -0; // true
Object.is(+0, -0); //false
```
