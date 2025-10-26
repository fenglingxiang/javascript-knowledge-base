## axios 拦截器的原理

axios 的拦截器可分为请求拦截器和响应拦截器

1. 请求拦截器是在接口请求前进行拦截，一般用于统一处理请求头
2. 响应拦截是在接口响应后进行拦截，一般是对不同的响应状态进行处理，也可以处理响应结果返回统一的格式

## 拦截器实现

```js
class MyAxios {
  constructor(config = {}) {
    this.config = config;
    this.interceptor = {
      request: new InterceptorManage(),
      response: new InterceptorManage(),
    };
  }

  request(config) {
    config = { ...this.config, ...config };

    const chain = [];

    // 添加请求拦截器
    this.interceptor.request.forEach(item => {
      chain.unshift(item.fulfilled, item.rejected);
    });

    // 添加实际请求
    chain.push(this.dispatchRequest.bind(this)); //对应fulfilled
    chain.push(undefined); //对应rejected

    // 添加响应拦截器
    this.interceptor.response.forEach(item => {
      chain.push(item.fulfilled, item.rejected);
    });

    // 执行链
    let promise = Promise.resolve(config);
    while (chain.length) {
      promise.then(chain.unshift(), chain.unshift());
    }
    return promise;
  }

  dispatchRequest(config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const method = config.method?.toUpperCase() || "GET";
      const url = this.transformUrl(config);
      this.setHeaders(xhr, config.headers);
      xhr.open(method, url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readystate != 4) return;
        if (xhr.status == 200) {
          resolve({
            data: this.transformData(xhr.responseText),
            status: xhr.status,
            message: xhr.statusText,
            headers: this.transformHeaders(xhr.getAllResponseHeaders()),
            config,
          });
        } else {
          reject(
            this.createError(`Request failed, the status is ${xhr.status}`),
            xhr,
            config
          );
        }
      };
      xhr.onerror = () => {
        reject(this.createError(`NetWork Error`), xhr, config);
      };
      xhr.ontimeout = () => {
        reject(this.createError(`Timeout`), xhr, config);
      };
      xhr.send(config.data ? JSON.stringify(config.data) : null);
    });
  }

  transformUrl(config) {
    const { baseUrl = "", url = "", params = {} } = config;
    const fullUrl = baseUrl + url;
    const paramsStr = new URLSearchParams(params).toString();
    return paramsStr ? `${fullUrl}?${paramsStr}` : fullUrl;
  }

  setHeaders(xhr, headers) {
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    if (!headers["Content-Type"] && !headers["content-type"]) {
      xhr.setRequestHeader("content-type", "appication/json");
    }
  }

  transformData(data) {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  transformHeaders(headers = "", xhr) {
    if (!headers) return res;
    headers.split("\r\n").forEach(item => {
      const [key, value] = item.split(":");
      if (key) {
        res[key] = value;
      }
    });
    return res;
  }

  createError(message, req, config) {
    const error = new Error(message);
    error.request = req;
    error.config = config;
    return error;
  },

  get(url, config) {
    return this.request({
      url,
      method: "GET",
      ...config
    })
  }

  post(url, config) {
    return this.request({
      url,
      method: "POST",
      ...config
    })
  }

  put(url, config) {
    return this.request({
      url,
      method: "PUT",
      ...config
    })
  }

  put(url, config) {
    return this.request({
      url,
      method: "DELETE",
      ...config
    })
  }
}

class InterceptorManage {
  constructor() {
    this.handlers = [];
  }

  use(onFulfilled, onRejected) {
    this.handlers.push({ onFulfilled, onRejected });
  }

  forEach(fn) {
    this.handlers.forEach(e => {
      if (e) fn(e);
    });
  }
}
```
