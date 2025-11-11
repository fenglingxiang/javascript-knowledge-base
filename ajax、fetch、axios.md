## ajax、fetch、axios 的区别

- ajax 是一种技术概念，代表的是异步的 JavaScript 和 XML，核心是通过 XMLHttpRequest 对象实现的
- fetch 是现代浏览器提供的 api, 基于 promise，更加简洁
- axios 是一个基于 promise 对 XMLHttpRequest、featch 封装的 http 库，提供更强大的功能

| 特性               | Ajax                                             | Fetch Api                                                                   | Axios                              |
| ------------------ | ------------------------------------------------ | --------------------------------------------------------------------------- | ---------------------------------- |
| **语法/使用**      | 回调函数方式，代码冗长<br />（回调地狱）         | 基于 Promise，语法简洁清晰                                                  | 基于 Promise，API 设计直观清晰简洁 |
| **请求/响应处理**  | 需要手动处理，如设置请<br />求头，响应结果格式化 | 需手动处理，如不会自动携带<br />cookie，需要手动设置 credentials: "inculde" | 会自动转换 JSON 数据，配置更加合理 |
| **浏览器兼容性**   | 非常好，全部浏览器都支持                         | 现代浏览器支持，IE 完全不支持                                               | 良好，通过封装处理了兼容性问题     |
| **请求超时/取消**  | 原生支持超时设置，但是不支持取消                 | 不支持超时跟取消,如果要取消可以借助 abortController                         | 支持超时跟取消                     |
| **拦截器**         | 不支持                                           | 不支持                                                                      | 支持请求跟响应拦截器               |
| **请求进度**       | 支持监听请求进度                                 | 不支持                                                                      | 支持                               |
| **CSRF/XSRF 防护** | 需手动实现                                       | 需手动实现                                                                  | 内置支持                           |
| **体积**           | 原生无需引入                                     | 原生无需引入                                                                | 需引入第三方依赖                   |

### 示例

- ajax

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/user", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr onreadystatechange = () => {
  if(xhr.readyState !== 4) return
  if(xhr.status === 200) {
    xhr.responseText = transformData(xhr.responseText)
  }
}
xhr.onerror = () => {
  console.log("NetWork Error")
}
xhr.ontimeout = () => {
  console.log("Timeout")
}
xhr.send()

// 处理响应结果
const transformData = (data) => {
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}
```

- Fetch Api

```js
const contoller = new AbortController();
const signal = contoller.signal;

fetch("/api/user", {
  method: "GET",
  headers: {
    /**
     * Content-Type 用于指定请求体数据的格式
     * application/json
     * application/x-www-form-urlencoded
     * multipart/form-data
     */
    "Content-Type": "application/json",
  },
  /**
   * body请求数据，格式需要与 Content-Type 对应
   * application/json: JSON.stringify({name: "张三"})
   * application/x-www-form-urlencoded: name=张三
   * multipart/form-data: new FormData()对象
   * Blob: new Blob()对象,二进制数据，如：文件上传
   */
  body: JSON.stringify({ name: "张三" }),
  /**
   * mode 请求模式，控制跨域行为
   * cors: 允许跨域
   * no-cors: 不允许跨域
   * same-origin: 只允许同源
   */
  mode: "cors", //请求模式
  /**
   * credentials: 请求携带 cookie
   * omit: 不携带
   * same-origin: 只携带同源 cookie
   * include: 携带所有 cookie
   */
  credentials: "include",
  singal,
})
  .then(res => {
    if (res.status === 200) {
      return res.json();
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

//请求取消
const cancel = () => {
  signal.abort();
}
```

- Axios

```shell
# 安装
yarn add axios
npm i axios
pnpm add axios
```

```js
import axios from "axios";

axios
  .post("/api/user", {
    name: "张三",
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// axios实例
const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

// 请求拦截器
instance.interceptors.request.use(config => {
  // 处理请求前的数据
  // ...
  return config;
});

// 响应拦截器
instance.interceptors.response.use(response => {
  // 处理服务器响应数据
  // ...
  return response;
});

instance.get("/api/user").then(res => {
  console.log(res);
});
```
