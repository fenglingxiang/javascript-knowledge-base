Function.prototype.myCall = function (context, ...args) {
  context = context || window
  if (typeof context !== 'object') context = new Object(context)
  const fnKey = Symbol("fnKey")
  context[fnKey] = this //临时存储函数对象
  const res = context[fnKey](...args) //调用函数
  delete context[fnKey] //删除临时属性
  return res //返回函数执行结果
}

const obj = {
  name: "张三",
}

function test(x, y) {
  console.log(x, y)
  console.log(this.name)
}

test.myCall(obj, 1, 2) 