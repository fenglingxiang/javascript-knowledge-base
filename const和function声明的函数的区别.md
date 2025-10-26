## const和function声明的函数的区别

1. function定义的函数会进行函数提升，const定义的不会
2. const可以定义匿名函数，function不行
3. const定义的函数是块级作用域，function定义的只有在严格模式下才具有块级作用域，否则会被提升到函数或全局作用域顶部
4. const定义的函数不能被重新赋值，function的可以被覆盖