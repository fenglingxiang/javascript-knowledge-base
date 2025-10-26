Function.prototype.myApply = function (context, args) {
  context = context || window
  if (typeof context !== 'object') context = new Object(context)
  args = Array.isArray(args) ? args : [] //确保args是数组
  const fnKey = Symbol("fnKey")
  context[fnKey] = this //临时存储函数对象
  const res = context[fnKey](...args) //调用函数
  delete context[fnKey] //删除临时属性
  return res //返回函数执行结果
}

const arr = [1, 2, 3]

console.log(Math.max.myApply(null, arr))