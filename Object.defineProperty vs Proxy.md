## Object.defineProperty vs Proxy

都能用来实现数据劫持，但是 Proxy 更加的强大，可以监听到数组的变化，而 Object.defineProperty 只能监听到属性的变化，不能监听到数组的变化。

### Object.defineProperty

```js
const person = {
  name: "张三",
  age: 18,
};

Object.defineProperty(person, "name", {
  get() {
    console.log("get name");
    // 下划线代表的是私有属性，不希望被外界访问
    return this._name;
  },

  set(value) {
    console.log("set name");
    this._name = value;
  },
});

person.name = "李四"; //"set name"
console.log(person.name); //"get name"  "李四"

// 局限性，只能针对单个属性
person.sex = "男"; //不触发拦截
delete person.name; //不触发拦截
console.log("name" in person); //true 不触发拦截
```

### Proxy

```js
const person = {
  name: "Alice",
  age: 18,
  city: "New York",
};

const _Person = new Proxy(person, {
  get(target, key) {
    console.log("get key");
    return Reflect.get(target, key);
  },

  set(target, key, value) {
    console.log("set key");
    Reflect.set(target, key, value);
  },

  // 拦截 in 操作符
  has(target, key) {
    console.log("has key");
    Reflect.has(target, key);
  },

  // 拦截删除操作
  deleteProperty(target, key) {
    console.log("delete key");
    Reflect.deleteProperty(target, key);
  },

  // 拦截 Object.keys()等获取自身属性的操作
  ownKeys(target) {
    console.log("ownKeys");
    Reflect.ownKeys(target);
  },

  // 拦截 Object.defineProperty()、Object.defineProperties操作
  defineProperty(target, key, descriptor) {
    console.log("defineProperty");
    Reflect.defineProperty(target, key, descriptor);
  },
});

_Person.name = "Bob"; //set key
_Person.sex = "male"; //set key
console.log(_Person.name); //get key -> Bob

delete _Person.city; //delete key

Object.keys(_Person); //ownKeys
Object.getOwnPropertyNames(_Person); //ownKeys

console.log("sex" in _Person); //has key -> true

Object.defineProperty(_Person, "county", {
  value: "CHINA",
  writable: true,
  enumerable: true,
  configurable: true,
}); //defineProperty

const Fn = function (name) {
  this.name = name;
};
const _Fn = new Proxy(Fn, {
  // 拦截构造函数
  construct(target, args, newTarget) {
    console.log("construct");
    return Reflect.construct(target, args, newTarget);
  },
});

const _NewFn = new _Fn("Charlie"); //construct
console.log(_NewFn); //Fn { name: 'Charlie' }
```

### 拦截数组能力对比

**Object.defineProperty 对数组拦截的限制**

```js
const arr = [1, 2, 3];

Object.defineProperty(arr, "0", {
  get() {
    console.log("读取数组第一个元素");
    return value;
  },
  set(newVal) {
    console.log("设置数组第一个元素");
    value = newVal;
  },
});

arr[0] = 10; //设置数组第一个元素
console.log(arr[0]); //读取数组第一个元素 10

console.log(arr[1]); //2 不触发拦截
arr.push(4); //数组方法不触发拦截
```

**Proxy 对数组的全面拦截**

```js
const arr = [1, 2, 3];

const _arr = new Proxy(arr, {
  get(target, key) {
    if (target[key] instanceof Function) {
      return function (...args) {
        console.log(`target key: ${key}`);
        return Reflect.apply(target[key], target, args);
      };
    }
    console.log("get key");
    return Reflect.get(target, key);
  },

  set(target, key, value) {
    console.log("set key");
    return Reflect.set(target, key, value);
  },
});

_arr[0]; //get key
_arr[1] = 10; //set key
_arr.push(4); //target key: push
_arr.splice(0, 1); //target key: splice
_arr.pop(); //target key: pop
_arr.shift(100); //target key: shift
_arr.unshift(100); //target key: unshift
_arr.length; //get key
```

### vue 响应式的简单实现

- vue2.x 通过 Object.defineProperty 结合发布订阅者模式实现响应式

```js
class VueReactive {
  constructor(data) {
    this._data = data;
    this.observe();
  }

  observe() {
    Object.keys(this._data).forEach(key => {
      this.defineReactive(this._data, key, this._data[key]);
    });
  }

  defineReactive(target, key, value) {
    const dep = new Dep();
    Object.defineProperty(target, key, {
      get() {
        dep.depend(); //依赖收集
        return value;
      },

      set(newVal) {
        if (newVal === value) return;
        value = newVal;
        dep.notify(); //通知更新
      },
    });
  }
}
```

- vue3.x 通过 Proxy 实现响应式

```js
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      track(target, key); //依赖收集
      return result;
    },

    set(value) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key); //通知更新
      return result;
    },

    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      trigger(target, key); //通知更新
      return result;
    },
  });
}
```

### 总结

- Object.defineProperty 适用于少量属性级别的拦截，兼容性好，性能更好
- Proxy 适用于拦截整个对象，包括拦截对对象的各种操作，适合实现复杂的响应系统
