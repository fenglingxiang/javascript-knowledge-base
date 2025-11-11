## 延迟 js 脚本加载的方法

1. 增加 defer 属性，可以让 js 脚本加载和 html 解析同步进行，但是会等到页面全部解析完才执行 js 脚本，且通常来说加了 defer 属性的 js 脚本是按顺序执行的

```html
<script src="script.js" defer></script>
```

2. 增加 async 属性后，js 脚本会立即下载并在下载完后立即执行，哪个先下载完就先执行哪一个，执行过程会阻塞页面渲染

```html
<script src="script.js" async></script>
```

3. 动态创建 script 标签，将标签插入到页面中

```js
const script = document.createElement("script");
script.src = "script.js";
document.head.appendChild(script);
```

4. 增加定时器，延时加载 js 脚本

```js
const timer = setTimeout(() => {
  clearTimeout(timer);
  const script = document.createElement("script");
  script.src = "script.js";
  document.body.appendChild(script);
}, 1000);
clearTimeout(timer);
```

5. 将 js 脚本放在 body 标签的底部，这样 js 脚本会等到页面解析完再执行

### 区分不同场景使用不同处理方法

- 对于一些非关键脚本，可以直接添加 async 进行异步加载
- 对于关键脚本也就是依赖 dom 元素渲染的脚本，可以添加 defer 属性进行优化
- 对于按需加载的场景，则可以按需动态创建
