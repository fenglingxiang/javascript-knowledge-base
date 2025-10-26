## Async、await 原理

async、await 是利用 promise 和 generator 函数实现的，await 则利用 generator 的暂停和恢复能力实现阻塞 promise 获取其结果，最终 async 函数会返回一个 promise 对象

## Async函数的实现

```js
function myAsync(genFn) {
  return function(...args) {
    const gen = genFn.apply(this, args) //生成迭代器
    return new Promise((resolve, reject) => {
      fucntion step(key, data) {
        let res
        try {
          res = gen[key](data)
        } catch(err) {
          return reject(err)
        }

        const { value, done } = res
        if(done) {
          return resolve(value)
        }else {
          Promise.resolve(value).then(res => step('next', res), err => step('throw', err))
        }
      }
      step("next")
    })
  }
}

function* test(a = 0) {
  const res = yield Promise.resolve(1)
  return a += res
}

const fn = myAsync(test)
fn(10).then(res => console.log(res)) //11

```
