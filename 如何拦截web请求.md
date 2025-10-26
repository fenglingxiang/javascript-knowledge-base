## 如何拦截 web 请求

1. 拦截 XMLHttpRequest (XHR), 通过重写 open、send 方法实现

```js
const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function (method, url, async) {
  // 根据具体业务进行拦截
  return originalOpen.apply(this, method, url, async);
};

XMLHttpRequest.prototype.send = function (body) {
  // 根据具体业务进行请求前拦截

  // 发起请求
  return originalSend.apply(this, body);
};
```

2.拦截 fetch 请求，通过重写 fetch 方法实现

```js
const originalFetch = window.fetch;

window.fetch = function (url, options) {
  // 请求前拦截处理

  // 发起请求
  return originalFetch(url, options).then(response => {
    // 如果需要修改body，克隆response并读取body修改
    return response
      .clone()
      .text()
      .then(body => {
        // 根据业务处理
        const newResponse = new Response(body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          url: response.url,
        });
        return newResponse; //返回新的response
      });
  });
};
```

3. 对于页面内跳转, 通过监听 click 事件, 阻止默认跳转

```js
document.addEventListener("click", e => {
  // 根据具体业务实现，通过e.preventDefault()阻止跳转
});
```

4. 对于动态记载资源的行为可以通过重写 createElement 方法实现

```js
const originalCreateElement = document.createElement;

document.createElement = function (tagName) {
  const element = originalCreateElement.call(document, tagName);
  if (tagName.toLowerCase() === "script") {
    defineProperty(element, "src", {
      get: () => {
        returrn src;
      },
      set: value => {
        // 根据业务拦截
        // src = value  //正常赋值就正常还在资源
      }
    });
  }
  return element;
};
```
