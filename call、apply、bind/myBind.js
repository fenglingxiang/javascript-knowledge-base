Function.prototype.myBind = function (context, ...args) {
  context = context || window
  if (typeof context !== 'object') context = new Object(context)
  const self = this //保存原函数引用
  const fn = function (...innerArgs) {
    const params = [...args, ...innerArgs] //合并参数

    if (this instanceof fn) {//如果是构造函数调用
      return new self(...params) //使用new调用原函数
    } else {//普通函数调用
      return self.call(context, ...params) //改变this指向后调用原函数
    }
  }
  // 如果绑定的是构造函数，那么需要继承构造函数的原型属性和方法
  fn.prototype = Object.create(self.prototype) //保持原函数原型链
  return fn //返回新函数
}

function test2(x, y) {
  this.x = x
  this.y = y
}
const Test3 = test2.myBind(null, 1)
const test3 = new Test3(2)
console.log(test3.x, test3.y)