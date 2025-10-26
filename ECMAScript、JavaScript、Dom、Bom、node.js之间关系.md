## ECMAScript、JavaScript、Dom、Bom、node.js之间关系

1. ECMAScript是由ECMA国际组织制定的脚本语言规范
2. JavaScript是基于ECMAScript实现的一种脚本语言，它还包含DOM、BOM等
3. DOM是文档对象模型，定义了HTML和XML的标准，允许开发者通过js访问和操作文档内容、结构、样式
4. BOM是浏览器提供的对象模型，用于访问和操作浏览器窗口，它包含一些内置对象，比如window、location、navigator、history等等
5. node.js是基于Chrome V8 JavaScript的js运行环境，让开发者能使用js编写服务的脚本，它包含了ECMAScript的实现，也包含了一些内置对象，比如fs，http用于操作文件系统，处理网络请求等，它不包含DOM和BOM，因为它运行在服务端，没有浏览器环境