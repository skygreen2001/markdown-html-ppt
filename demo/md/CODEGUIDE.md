# 前端代码开发规范

> ** 导演：周月璞 **

> ** 制片：周月璞 **

前端代码开发规范共包括以下六个部分:

- 命名规则
- HTML
- CSS, SCSS, LESS, SASS
- JavaScript
- GitHub命名规范
- 项目实践

## 命名规则
- 项目命名
- 目录命名
- JS文件命名
- CSS, SCSS文件命名
- HTML文件命名

### 项目命名

全部采用小写方式，以下划线分隔。

```
例：my_project_name
```

### 目录命名

参照项目命名规则；有复数结构时，要采用复数命名法。

```
例：scripts, styles, images, data_models
```

### JS文件命名

参照项目命名规则。

```
例：account_model.js
```

### CSS, SCSS文件命名

参照项目命名规则。

```
例：retina_sprites.css
```

### HTML文件命名

参照项目命名规则。

```
例：error_report.html
```

## HTML
- 语法
- lang属性
- 字符编码
- IE兼容模式
- 属性顺序
- 尽量避免JS生成标签
- 减少标签数量

### 语法
- 缩进使用soft tab（4个空格）
- 嵌套的节点应该缩进
- 在属性上，使用双引号，不要使用单引号
- 属性名全小写，用中划线做分隔符
- 不要在自动闭合标签结尾处使用斜线（HTML5 规范 指出他们是可选的）

```html
<html>
    <body>
        <img src="images/company_logo.png" alt="Company">
        <h1 class="hello-world">Hello, world!</h1>
    </body>
</html>
```

### lang属性
- 根据HTML5规范：应在html标签上加上lang属性。

  这会给语音工具和翻译工具帮助，告诉它们应当怎么去发音和翻译。

- 例如中文只给出了zh，但是没有区分香港，台湾，大陆。

  而微软给出了一份更加详细的语言列表，其中细分了zh-cn, zh-hk, zh-tw。

```html
<html lang="en-us">
...
</html>
```

### 字符编码

通过声明一个明确的字符编码，让浏览器轻松、快速的确定适合网页内容的渲染方式，通常指定为'UTF-8'。

```html
<meta charset="UTF-8">
```

### IE兼容模式

用 <meta> 标签可以指定页面应该用什么版本的IE来渲染；

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

### 属性顺序
- class
- id
- name
- data-*
- src, for, type, href, value, max-length, max, min, pattern
- placeholder, title, alt
- aria-*, role
- required, readonly, disabled

```html
<a class="..." id="..." data-modal="toggle" href="#">Example link</a>
```

### 尽量避免JS生成标签

在JS文件中生成标签让内容变得更难查找，更难编辑，性能更差。应该尽量避免这种情况的出现。

### 减少标签数量

在编写HTML代码时，需要尽量避免多余的父节点；很多时候，需要通过迭代和重构来使HTML变得更少。

```html
<span class="avatar"><img src="..."></span>
```

## CSS, SCSS, LESS, SASS
- 缩进
- 分号
- 空格
- 换行
- 注释
- 引号
- 命名

### 缩进

使用soft tab（4个空格）。

```css
.element {
    position: absolute;
    top: 10px;
    left: 10px;
}
```

### 分号

每个属性声明末尾都要加分号。

```css
.element {
    width: 20px;
    height: 20px;
    background-color: red;
}
```

### 空格

以下几种情况不需要空格:

- 属性名后
- 多个规则的分隔符','前
- !important '!'后
- 属性值中'('后和')'前
- 行末不要有多余的空格

```css
.element {
    color: red !important;
    background-color: rgba(0, 0, 0, .5);
    ...
}
```

### 换行

以下几种情况需要换行:

- '{'后和'}'前
- 每个属性独占一行
- 多个规则的分隔符','后
- '{'前  (这个不需要换行的)


```css
.element {
    color: red;
    background-color: black;
}
.element,
.dialog {
    ...
}
```

### 注释

- 注释统一用'/* */'（scss中也不要用'//'）
- 缩进与下一行代码保持一致；
- 可位于一个代码行的末尾，与代码间隔一个空格。

```css
.modal-header {
    /* 50px */
    width: 50px;

    color: red; /* color red */
}
```

### 引号

- 最外层统一使用双引号；
- url的内容要用引号；
- 属性选择器中的属性值需要引号。

```css
.element:after {
    content: "";
    background-image: url("logo.png");
}
li[data-type="single"] {
}
```

### 命名

- 类名使用小写字母，以中划线分隔
- id使用小写字母，以中划线分隔

```css
/* class */
.element-content {
}
/* id */
#my-dialog {
}
```

## JavaScript
- 引号
- 变量命名
- 变量声明
- 函数
- 数组、对象
- 括号
- null
- undefined
- jshint
- 杂项

### 引号

最外层统一使用单引号。

```js
var y = 'foo',
z = '<div id="test"></div>';
```

### 变量命名
- 标准变量采用驼峰式命名
- 'ID'在变量名中全大写
- 'URL'在变量名中全大写
- 'Android'在变量名中大写第一个字母
- 'iOS'在变量名中小写第一个，大写后两个字母
- 常量全大写，用下划线连接
- 构造函数，大写第一个字母
- jquery对象必须以'$'开头命名

### 变量声明

一个函数作用域中所有的变量声明尽量提到函数首部，
用一个var声明，不允许出现两个连续的var声明。

```js
function doSomethingWithItems(items) {
    // use one var
    var value = 10,
        result = value + 10,
        i,
        len;
    for (i = 0, len = items.length; i < len; i++) {
        result += 10;
    }
}
```

### 函数
- 无论是函数声明还是函数表达式，'('前不要空格，但'{'前一定要有空格；
- 参数之间用', '分隔，注意逗号后有一个空格。

```js
// no space before '(', but one space before'{'
var doSomething = function(item1, item2) {
    // do something
};
function doSomething(item1, item2) {
    // do something
}
```

### 数组、对象
- 对象属性名不需要加引号；
- 对象以缩进的形式书写，不要写在一行；
- 数组、对象最后不要有逗号。

```js
// good
var a = {
    b: 1,
    c: 2
};
```

### 括号

下列关键字后必须有大括号:

- if, else, for, while, do, switch, try, catch, finally, with。
 （即使代码块的内容只有一行）

```js
// not good
if (condition)
    doSomething();
// good
if (condition) {
    doSomething();
}
```

### null

- 适用场景
  - 初始化一个将来可能被赋值为对象的变量
  - 与已经初始化的变量做比较
  - 作为一个返回对象的函数的返回值

- 不适用场景
  - 不要用null来判断函数调用时有没有传参数
  - 不要与未初始化的变量做比较

```js
var a = null;
if (a === null) {
}
```

### undefined

- 永远不要直接使用undefined进行变量判断；
- 使用typeof和字符串'undefined'对变量进行判断。

```js
// not good
if (person === undefined) {
    ...
}
// good
if (typeof person === 'undefined') {
    ...
}
```

### jshint
- 用'===', '!=='代替'==', '!='；
- for-in里一定要有hasOwnProperty的判断；
- 变量不要先使用后声明；
- 不要在一句代码中单单使用构造函数，记得将其赋值给某个变量；
- 不要在同个作用域下声明同名变量；
- 不要在一些不需要的地方加括号，例：delete(a.b)；

### 杂项
- 不要混用tab和space；
- 不要在一处使用多个tab或space；
- 换行符统一用'LF'；
- 对上下文this的引用只能使用'_this', 'ctrl', 'self'其中一个来命名；
- 行尾不要有空白字符；

```js
function Person() {
    var _this = this;
    var that = this;
    // good
    var self = this;
}
```

## Github Coding Convention

这里专指Github社区中总结的 **JavaScript** 的代码标准

- Last comma(逗号)
- Space(空格键)
- Function followed by no space(方法后面不加空格)
- Arguments definition(参数定义) with no space
- Object Literal(对象字面量) Definition types
- How to write conditional statement(条件语句)
- Single quote(引号)

### Last comma(逗号)

```js
var foo = 1,
    bar = 2,
    baz = 3;

var obj = {
    foo: 1,
    bar: 2,
    baz: 3
};
```

### Space(空格键) vs. Tab

```js
//space
function foo() {
  return "bar";
}
```

### Function followed by no space(方法后面不加空格)

```js
//no space
function foo() {
  return "bar";
}
```

### Arguments definition(参数定义) with no space

```js
//no space
function fn(arg1, arg2) {
}
//or
if (true) {
    ...
}
```

### Object Literal(字面上的对象) Definition types

```js
//Followed by space √
{   foo: 1,
    bar: 2,
    baz: 3
}

//No space
{
  foo:1,
  bar:2,
  baz:3
}

//Using space in before/after
{
  foo : 1,
  bar : 2,
  baz : 3
}
```

### How to write conditional statement(条件语句)

```js
//Condition with one space
if (true) {
  //...
}

while (true) {
  //...
}

switch (v) {
  //...
}
```

### Single quote(引号)

```js
//Single quote
var foo = 'bar';
var obj = {
    'foo': 'bar'
};
```

## 谢谢您的关注

> ** 感谢您的观看！ **

  [上海沃渡信息科技有限公司](http://www.uw52.com)

> ** 感谢Github  **

  ![Github](https://octodex.github.com/images/linktocat.jpg "linktocat") [Popular Coding Convention on Github](http://sideeffect.kr/popularconvention#javascript)

> ** 感谢腾讯全端AlloyTeam 团队  **

  ✍ [Code Guide by @AlloyTeam](http://alloyteam.github.io/CodeGuide/)
