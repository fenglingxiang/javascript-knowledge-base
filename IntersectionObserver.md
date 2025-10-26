## IntersectionObserver 监听观察元素和根元素的交叉状态, 当元素出现在根元素可视区域内时, 就会触发回调函数

```js
const observer = new IntersectionObserver(callback, options);
```

1. 回调函数有两个参数,一个是被观察元素的数组,一个是观察者实例

```js
const observer = new IntersectionObserver((entries, observer) => {});
```

2. options 配置项

- root: 指定根元素,默认是视口
- rootMargin: 指定根元素的外边距
- threshold: 指定交叉比例,默认是 0,取值范围是 0~1, 可以是数组比如[0, 0.25, 0.5, 0.75, 1]

3. api

- observe: 观察元素
- unobserve: 取消观察元素
- disconnect: 取消观察所有元素

4. IntersectionObserverEntry

- boundingClientRect: 目标元素的矩形信息
- intersectionRatio: 目标元素和根元素的交叉比例
- intersectionRect: 目标元素和根元素的交叉矩形信息
- isIntersecting: 是否交叉
- rootBounds: 根元素的矩形信息
- target: 目标元素
- time: 时间戳

## 使用场景

1. 图片懒加载

```html
<div class="container">
  <img src="" :data-src="item" v-for="item in imgs" :key="item" />
</div>
```

```js
const imgs = Array.from(
  { length: 20 },
  (k, v) => `https://example.img.com/${v}.jpg`
);
const observer = new IntersectionObserver(
  (entires, observer) => {
    entires.forEach(item => {
      if (item.isIntersecting) {
        const img = item.target;
        img.src = img["data-src"];
        img.removeArrtibute("data-src");
        observer.unobserve(img);
      }
    });
  },
  {
    root: document.querySelector(".container"),
  }
);
const imgDoms = document.querySelectorAll("img[data-src]");
imgDoms.forEach(img => {
  observer.observe(img);
});
```

2. 触底加载更多

```html
<div id="app">
  <div class="item" v-for="item in list">{{item}}</div>
  <!-- 触发元素 -->
  <div ref="triggerRef"></div>
</div>
```

```js
import { ref, onMounted } from "vue";

const list = ref([]);
const observe = ref();
const triggerRef = ref();
const pageNum = ref(1);
const pageSize = ref(20);
const observer = ref();

onMounted(() => {
  createObserver();
});

const createObserver = () => {
  const rootDom = document.querySelector("#app");
  observer.value = new IntersectionObserver(
    (entires, observer) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    {
      root: rootDom,
      rootMargin: "0px 0px 100px 0px",
    }
  );
  observer.value.observe(triggerRef.value);
};

const loadMore = () => {
  const moreList = Array.from({ length: pageSize.value }, (k, v) => {
    return `${(pageNum.value - 1) * pageSize.value + v + 1}`;
  });
  list.value = list.value.concat(moreList);
  pageNum.value++;
};
```
