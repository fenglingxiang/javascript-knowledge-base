## Promise

1. 是 js 处理异步操作的一个对象，可以避免回调地狱的情况，让代码可读性更高，更有利于维护
2. promise 有 3 个状态,状态一旦改变就不会再变, 分别是：

- pending（等待中
- fulfilled(已成功)
- rejected(已失败)

3. promise 的静态方法有:

- resolve 返回一个状态为 fulfilled 的 promise 对象
- reject 返回一个状态为 rejected 的 promise 对象
- all 接收一个 promise 数组，当所有 promise 执行完成返回一个包含所有结果的数组，可以在.then 中获取；如果有一个 promise 执行失败则立即返回失败结果，可以在 catch 中捕获失败
- race 接收一个 promise 数组，返回第一个执行完成的 promise 的结果，不管成功还是失败
- allSettled 接收一个 promise 数组，返回一个包含所有结果的数组，不管成功还是失败
- any 接收一个 promise 数组，返回第一个执行成功的 promise 的结果， 如果全部失败则返回一个 AggregateError 对象

4. promise 常用方法有:

- then 接收两个参数，第一个参数是成功时的回调，第二个参数是失败时的回调
- catch 接收一个参数，参数是失败时的回调
- finally 接收一个参数，参数是无论成功还是失败都会执行的回调

```js
// 成功的情况
function fn1() {
  return Promise.resolve(1);
}

function fn2() {
  return Promise.resolve(2);
}

function fn3() {
  return Promise.resolve(3);
}

Promise.all([fn1(), fn2(), fn3()]).then(results => {
  console.log(results); // [1, 2, 3]
});

Promise.race([fn1(), fn2(), fn3()]).then(results => {
  console.log(results); // 1
});

Promise.any([fn1(), fn2(), fn3()])
  .then(results => {
    console.log(results); // [1
  })
  .catch(error => {
    console.error("Error:", error); // Error: 1
  });

// 有失败的情况
function fn1() {
  return Promise.reject(1);
}

function fn2() {
  return Promise.resolve(2);
}

function fn3() {
  return Promise.resolve(3);
}

Promise.all([fn1(), fn2(), fn3()]).catch(error => {
  console.error("Error:", error); // Error: 1
});

Promise.race([fn1(), fn2(), fn3()]).catch(error => {
  console.error("Error:", error); // Error: 1
});

Promise.allSettled([fn1(), fn2(), fn3()]).then(results => {
  console.log(results);
  /**[
    { status: 'rejected', reason: 1 },
    { status: 'fulfilled', value: 2 },
    { status: 'fulfilled', value: 3 }
    ]**/
});
```

## Promise 的简易实现

```js
class MyPromise {
  constructor(callback) {
    this.state = "pending";
    this.value = undefined; //成功值
    this.reason = undefined; //失败原因
    this.onFulfilledCallbacks = []; //成功回调函数队列
    this.onRejectedCallbacks = []; //失败回调函数队列

    const resolve = value => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;

        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = reason => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;

        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      callback(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled" && typeof onFulfilled === "function") {
      onFulfilled(this.value);
    }
    if (this.state === "rejected" && typeof onRejected === "function") {
      onRejected(this.reason);
    }
    if (this.state === "pending") {
      this.onFulfilledCallbacks.push(() => onFulfilled(this.value));
      this.onRejectedCallbacks.push(() => onRejected(this.reason));
    }
    return this;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    const P = this.constructor;
    return this.then(value =>
      P.resolve(onFinally()).then(
        () => value,
        reason =>
          P.resolve(onFinally()).then(() => {
            throw reason;
          })
      )
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }

  static all(promises) {
    const results = [];
    promises?.forEach(item => {
      item.then(res => {
        results.push(res);
      });
    });
  }

  static race(promises) {}

  static allSettled(promises) {}

  static any(promises) {}
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(456);
  }, 100);
});
p1.then(res => {
  console.log(res);
});
```
