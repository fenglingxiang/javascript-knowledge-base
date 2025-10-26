## 本地对象

由ECMAScriipt规定的对象，独立于宿主环境，包括Object, Array，Function, Date, RegExp, Boolean, Number, String等等，无论是在浏览器还是在Node环境都是存在的。需要实例化后才能调用。

## 内置对象
内置对象是由ECMAScript实现提供的，包括本地对象和全局对象，全局对象包含global对象和Math对象，global对象在浏览器中这则是对应window对象。可以直接使用无需通过实例调用。

## 宿主对象
是由宿主环境提供的对象，依赖于宿主环境。比如在浏览器中，提供的宿主对象有window、document、location、history、XMLHttpRequest等；在node环境中提供的宿主对象有global、process、Buffer、fs、http
