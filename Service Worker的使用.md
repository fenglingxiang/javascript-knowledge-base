## Service Work 的使用

Service Work 是运行在浏览器后台的脚本, 它充当网络代理可以拦截和处理网络请求, 支持离线缓存, 消息推送, 后台同步等功能

```html
<script>
  if ("serviceWorker" in navigator) {
    // 注册service worker
    navigator.serviceWorker
      .register("./sw.js")
      .then(registration => {
        console.log("service worker 注册成功");

        // 监听service worker 更新
        registration.onupdatefound = () => {
          console.log("service worker 更新成功");
        };

        // 监听service worker 状态改变
        registration.onstatuschange = () => {
          console.log("service worker 状态改变");
        };
      })
      .catch(error => {
        console.log("service worker 注册失败");
      });

    // 监听service worker 控制权转移
    navigator.serviceWorker.oncontrollerchange = () => {
      console.log("service worker 控制权转移");
    };
  }
</script>
>
```

```js
// 静态缓存名称、版本
const STATIC_CACHE_NAME = "static-v1";
// 动态缓存名称、版本
const DYNAMIC_CACHE_NAME = "dynamic-v1";
// 需要缓存的静态资源
const STATIC_ASSETS = [];

// 安装阶段 - 缓存静态资源
self.addEventListener("install", event => {
  console.log("安装Service Worker");

  // 跳过等待阶段，直接激活
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cacheNames => {
        Promise.all(
          cacheNames.map(cacheName => {
            // 删除旧版本缓存
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME
            ) {
              return cacheNames.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // 立即控制所有客户端
        return self.clients.claim();
      })
  );
});

// 拦截和处理请求
self.addEventListener("fetch", event => {
  // 跳过非get请求
  if (event.request.method !== "GET") return;

  // 跳过浏览器扩展请求
  if (event.request.url.startsWith("chrome-extension://")) return;

  event.respondWith(
    // 尝试从缓存中获取
    caches.match(event.request).then(cacheResponse => {
      if (cacheResponse) {
        console.log("从缓存中获取", event.request.url);
        return cacheResponse;
      }

      // 没有缓存就正常发起网络请求
      return fetch(event.request)
        .then(fetchResponse => {
          // 检查响应是否正常
          if (!fetchResponse || fetchResponse.status !== 200) {
            return fetchResponse;
          }

          // 克隆响应，因为响应只能使用一次
          const responseToCache = fetchResponse.clone();

          // 添加动态缓存
          caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            // 只缓存同源资源
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, responseToCache);
            }
          });

          return fetchResponse;
        })
        .catch(err => {
          console.log("网络请求失败", err);

          // 如果请求的是html文件，返回离线页面
          if (evnet.request.destination === "document") {
            // 从缓存中获取离线页面
            return caches.match("/offline.html");
          }

          return err;
        });
    })
  );
});

// 处理消息
self.addEventListener("message", event => {
  console.log("收到消息", event.data);
});

// 通过PushManager.subscrbe()订阅推送
self.addEventListener("push", event => {
  console.log("收到推送", event.data);
  event.waitUntil(
    self.registration.showNotification("收到推送", {
      body: "Hello World",
      icon: "icon.png",
      badge: "badge.png",
    })
  );
});
```

### 自动触发场景

| 触发时机   | 缓存内容     | 适用场景           |
| ---------- | ------------ | ------------------ |
| SW 安装    | 核心静态资源 | 首次访问、应用更新 |
| Fetch 拦截 | 请求的资源   | 所有网络请求       |
| 后台同步   | 待同步的数据 | 网络恢复时         |
| 定期同步   | 更新的内容   | 新闻、博客         |

### 手动触发场景

| 触发时机 | 缓存内容         | 适用场景   |
| -------- | ---------------- | ---------- |
| 手动缓存 | 指定资源/页面    | 主动控制   |
| 预测缓存 | 可能要访问的内容 | 智能预加载 |
| 阅读模式 | 阅读内容         | 离线阅读   |
| 收藏内容 | 用户收藏         | 个人资料   |
