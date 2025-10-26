## setInterval 可能导致的定时器堆积问题

当定时器内脚本执行时间超过定时器设置的时间间隔，就会导致上一个任务没结束，下一个任务又进入队列了，导致任务堆积，线程卡顿，每次执行的时间间隔可能越来越短。

### 解决方案 setTimeout 递归执行 替代 setInterval

```js
//setInterval写法
setInterval(() => {
  const start = Date.now();
  while (Date.now() - start < 500) {}
  console.log("执行");
}, 300);

//setTimeout递归优化写法
function fn() {
  const start = Date.now();
  while (Date.now() - start < 500) {}
  console.log("执行");

  setTimeout(fn(), 300) //每次固定800ms（500 + 300）执行
}
```
