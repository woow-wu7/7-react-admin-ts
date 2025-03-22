# Design Pattern 设计模式

- [[封装 01-设计模式] 设计原则 和 工厂模式(简单抽象方法) 适配器模式 装饰器模式](https://juejin.cn/post/6950958974854234119)
- [[封装 02-设计模式] 命令模式 享元模式 组合模式 代理模式](https://juejin.cn/post/6950958974854234119)
- [[封装 03-设计模式] Decorator 装饰器模式在前端的应用](https://juejin.cn/post/7037871731070992421)
- [[封装 04-设计模式] Publish Subscribe 发布订阅模式在前端的应用](https://juejin.cn/post/7038522552313970696)
- [[深入 23] JS 设计模式 - 代理，策略，单例](https://juejin.cn/post/6918744081460002824)

### 一些单词

```
- design 设计 // TIPS: Pay attention to the pronunciation of the 'design'
- pattern 模式 图案
-
- `adapter 适配器`
- `singleton 单例`
- `strategy 策略`
- `factory 工厂`
- `facade 外观`
- // facade 外观
- // decade 十年

- **适配器模式** // - adapter pattern
  - Adapter
  - 接口适配
  - 参数适配
  - 数据适配
- **单例模式** // --- singleton pattern
  - Singleton
  - 简单单例: ( 闭包 ) -- 注意同时支持单例和多例的场景，比如弹窗是单例，弹窗中还有弹窗就是多例
  - 透明单例
- **代理模式** // --- proxy pattern
  - Proxy
  - 事件代理
  - 缓存代理: 给 ajax 增加缓存功能
- **策略模式** // --- strategy pattern
  - Strategy
  - 工资计算，避免多个 if
  - 表单验证
- **工厂模式** // --- factory pattern
  - Factory
  - 简单工厂
  - 抽象工厂
  - 工厂方法
- **混入模式** // --- mixin pattern
  - Mixin
- **外观模式** // --- facade pattern
  - facade
- **观察者模式** // - observer pattern
- **发布订阅模式** // publish–subscribe pattern

- design 设计
- pattern 模式 图案
TIPS: Pay attention to the pronunciation of the 'design'

pattern 模式 // -------- design pattern 设计模式
singleton 单例模式 // --- singleton pattern 单例模式
adapter 适配 // -------- adapter pattern 适配器模式
strategy 策略 战略 // --- strategy pattern 策略模式
facade 外观 // --------- facade pattern 外观模式
observer 观察者 // ----- observer pattern 观察者模式
subscribe 订阅 // ------ publish-subscribe pattern 发布订阅模式

bonus 奖金
reward 报酬 奖励
prize 奖品 // first prize. // second prize.
medal 奖牌 // gold medal. // silver medal. // bronze medal. // 2. metal medal model module
salary 工资 -- 长期的
wage 工资 ---- 短期的
performance 绩效 性能

加减乘除 add subtract multiply divide
和差积商 sum difference product quotient
```

### 设计原则 ( 6 大设计原则 )

- **单一职责原则**
  - 一个函数只实现一个职责
  - 两个完全不一样的功能，不应该放在一个类中
  - 一个类中应该是一组相关性很高的函数，或者数据的封装
- **开放封闭原则**
  - 可扩展
  - 不可修改
- **最少知识原则**
  - 一个对象，( 类，模块，函数，变量 ) 应该对其他对象有最少的了解
  - 减少对象之间的耦合
- **里氏替换原则**
  - 所有引用基类的地方，必须能够使用其子类直接替换
- **接口隔离原则**
  - 单一接口
- **依赖倒置原则**
  - 实现类 依赖于 接口或者抽象类

# 设计原则 ( 6 大设计原则 ) - The basic principles of design patterns.

```
The basic principles of design patterns.
设计6大基本原则
--

- 单一职责 原则
- 开放封闭 原则
- 最少知识 原则
- 接口隔离 原则
- 依赖倒置 原则
- 里氏替换 原则
```

# (一) 适配器模式 Adapter ------- 适配参数/适配接口/适配地图/Node 环境

- 概念: 将一个类的接口转化为用户需要的另一个接口
- 解决: 类或对象之间 接口 不兼容的问题
- 适配器模式在前端中的应用
  - 接口适配
  - 函数参数适配
  - 数据的适配
  - vue 中的 filter 过滤器
- https://juejin.cn/post/6950958974854234119#heading-15

```
适配器模式在前端中的应用
- 接口适配
- 函数参数适配
- 数据的适配
```

```1111111
1
接口适配
- 需求: 我们要根据支持的地图种类，来渲染，输入有可能是谷歌地图，也有可能是百度地图
---

const googleMap = {
  show() {
    console.log('谷歌地图')
  }
}
const baiduMap = {
  display() {
    console.log('百度地图')
  }
}
- 未使用适配器模式: 时就会报错，接口不兼容
function renderMap(map) {
  map.show();
}
- 使用适配器模式
function adapter(map) {
  if (!map.show) map.show = map.display
  return map
}
renderMap(adapter(googleMap)) // 适配器模式，将不同的接口统一
renderMap(adapter(baiduMap))
```

```2222222
2
函数参数适配
- 场景: 比如当我们函数传入的参数个数较多时，一般会用一个对象，而有的参数是可选时，我们就需要使用 适配器模式来解决兼容问题
- 比如: 对于可选参数，如果不存在时，使用 默认参数
---

function sdk(config) {
  let defaultConfig = {
    name: '',
    age: 0
  }
  for(let key in config) {
    defaultConfig[key] =  defaultConfig[key] || config[key] // 适配器模式 - 函数参数适配 - 当有未传参数时使用默认值
  }

  return defaultConfig
}
sdk({name: 'woow_wu7'})
```

```3333333
3
数据适配
- 需求: 将后端返回的 ( 数组数据 ) 处理成 ( tree型数据 )
---

后端返回的数据
 const arr = [
  { id: 1, parentId: -1 },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 4 },
];

前端转换的数据
// array -> tree
function array2tree(arr) {
  const map = {};
  const res = [];

  arr.forEach((item) => {
    item.children = [];
    map[item.id] = item;
  });

  arr.forEach((item) => {
    if (item.parentId < 0) {
      res.push(item);
    } else {
      map[item.parentId]?.children?.push(item);
    }
  });

  return res;
}

const result = array2tree(arr);
console.log("result: ", result);
```

# (二) 单例模式 Singleton ------- 弹窗

- 保证一个类仅有一个实例，并提供一个访问它的全局访问点
- 即 ( 一个类 ) 在 ( 全局 ) 中只有 ( 一个实例 )
- 优点
  - ( 创建对象 ) 和 ( 管理单例 ) 被分布在不同的方法中
- 应用场景
  - 全局变量
  - 连接数据库，防止多次连接或断开
  - 全局状态管理 redux vuex
  - 登陆框，form 表单，loading 层等
- [我的掘金-JS 设计模式-单例模式](https://juejin.cn/post/6918744081460002824#heading-23)
- [资料](https://juejin.cn/post/6908885198381776910)

### (2.1) 简单单例

```1111111
例1
---

var Singleton = function (name) {
  this.name = name;
};
Singleton.instance = null; // 其实这里不用声明的，因为默认找不到该属性就是undefined
Singleton.getInstance = function () {
  if (!Singleton.instance) {
    Singleton.instance = new Singleton("woow_wu7");
  }
  return Singleton.instance;
};

var a2 = Singleton.getInstance();
var b2 = Singleton.getInstance();
console.log("a2===b2", a2 === b2);
```

```2222222
例子2
利用 闭包 实现单例模式
---

function Singleton(name) { // 构造函数, singleton: 单身, 注意：箭头函数不能作为构造函数，arguments，yield命令
  this.name = name
}
Singleton.getInstance = (() => {
  let instance = null // 闭包变量
  return (name) => {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})(); // IIFE立即调用的函数表达式，注意小括号和中括号开头的前一条语句需要加分号，或者小括号中括号前加分号

const a = Singleton.getInstance('A')
const b = Singleton.getInstance('B') // 这一次传参没用了
console.log('a === b', a === b) // true
```

```3333333
例子3
- 闭包: 例2中我们通过 闭包 实现了单例模式
- 存在问题: 比如弹窗组件，有时候我们需要时单例，单有时候我们又希望有多个实例，比如在 dialog的table中，我们点删除还要弹一个框出来
- 如何解决:
  - 例2: 在例2中，我们直接调用 Singleton 就是多例
  - 例3: 我们也可以优化成 例3 这样

function Single() {
  this.name = "woow_wu7";
}

Single.createSingle = () => {
  let instance = null;

  return () => {
    if (!instance) {
      instance = new Single();
    }

    // 1. 这个 return 很妙，因为instance存不存在，都会走到这里
    // 2. 我们用 this.instance 就不能用箭头函数，我们用变量就能直接使用箭头函数
    return instance;
  };
};

// 单例
const createInstance = Single.createSingle();
const instance1 = createInstance();
const instance2 = createInstance();
console.log("instance1 === instance2", instance1 === instance2);

// 多例
// 1. 除了这种方法，其实直接调 Single 就可以，也就是说 例2 中我们也可直接调 Single
const createInstance2 = Single.createSingle();
const instance3 = createInstance2();
console.log("instance3===instance1", instance3 === instance1);
```

### (2.2) 透明单例

- 优点：解决 ( 简单单例 ) 中的需要调用 createInstance 函数来生成对象的缺点，这里直接通过 new 调用
- 缺点：
  - 不符合单一职责原则，这个对象其实负责了两个功能：单例和创建对象
  - 我们希望的是: ( 创建对象 ) 和 ( 管理单例 ) 被分布在不同的方法中

```
透明单例
---

var Singleton = (function() {
  var instance = null
  return function(name) {
    if (instance) return instance
    this.name = name
    return instance = this // 返回实例对象，instance仅仅是为了做判断
  }
})(); // IIFE返回一个构造函数，同时存在闭包
const a = new Singleton('A')
const b = new Singleton('B')
console.log('a === b', a === b)
console.log('a', a)
```

### (2.3) 利用 singleton 手写一个 登录框

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button class="login">登录1</button>
    <button class="login2">登录2</button>
    <script>
      // singleton
      // 单例模式 - 登录框

      // 闭包的方式实现 单例
      const singleton = (() => {
        let instance = null;
        return (fn, arg) => {
          if (!instance) {
            instance = fn.call(null, arg);
          }
          return instance;
        };
      })();


      // 创建 单例对象 和 管理单例 分别在不同的函数中
      // 满足 单一职责 和 开放封闭 原则
      const createModal = ({ title, content }) => {
        const container = document.createElement("div");
        container.style = "width: 300px; height: 100px; border: 1px solid red";

        const titleDOM = document.createElement("p");
        titleDOM.innerHTML = `${title}`;

        const contentDOM = document.createElement("div");
        contentDOM.innerHTML = `${content}`;

        container.appendChild(titleDOM);
        container.appendChild(contentDOM);

        return container;
      };

      const modal = singleton(createModal, {
        title: "登录框",
        content: "用户名",
      });

      // 只有一个实例 modal
      const showLogin1 = () => {
        modal.firstChild.innerHTML = "登录框1";
        modal.lastChild.innerHTML = "用户名1";
        document.body.appendChild(modal);
      };
      const showLogin2 = () => {
        modal.firstChild.innerHTML = "登录框2";
        modal.lastChild.innerHTML = "用户名2";
        document.body.appendChild(modal);
      };

      const button = document.getElementsByClassName("login")[0];
      button.addEventListener("click", showLogin1, { capture: false });
      const button2 = document.getElementsByClassName("login2")[0];
      button2.addEventListener("click", showLogin2, { capture: false });
    </script>
  </body>
</html>
```

# (三) 代理模式 Proxy ----------- 代理缓存

- 定义: 指给某一个对象提供一个 ( 代理对象 )，并由 ( 代理对象 ) 来控制 ( 原有对象的引用 )
- 类比: 代理模式 有点类似 中介

```
实战
实现一个，代理 ajax 请求，代理后增加缓存功能
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="button">发起请求</button>
    <script>
      // 代理模式 Proxy
      // 定义: 指给某一个对象提供一个 ( 代理对象 )，并由 ( 代理对象 ) 来控制 ( 原有对象的引用 )
      // 类比: 代理模式 有点类似 中介

      // 实战
      // 实现一个，代理 ajax 请求，代理后增加缓存功能

      // 结果: 真实请求下，一般不会直接缓存请求
      // 因为: 请求参数不变时，因为有增删改查的操作，参数没变，请求结果可能变化
      // 扩展: 可以用于函数事件的缓存，比如vue3中缓存事件

      // 1
      // request
      const request = (params) => {
        return new Promise((resolve) =>
          setTimeout(() => resolve(`请求返回的数据: ${params}`), 1000)
        );
      };

      // 2
      // 代理 request，实现缓存功能
      const cache = new Map();

      const proxyRequest = async (fn, params) => {
        if (cache.has(params)) {
          return cache.get(params);
        }

        const res = await fn(params);
        cache.set(params, res);
        return res;
      };

      const fetch = async () => {
        const res = await proxyRequest(request, "woow_wu7");
        console.log("res: ", res);
      };
      const button = document.getElementById("button");
      button.addEventListener("click", fetch, { capture: false });
    </script>
  </body>
</html>
```

# (四) 策略模式 Strategy ------- 表单验证/绩效发放

- 定义
  - ( 策略模式 ) 的主要目的就是将 ( 算法的使用 ) 和 ( 算法的实现 ) 分离开来
- 组成
  - **策略类**: strategy 封装了具体的方法，负责具体的计算过程
  - **环境类**: context 环境类接受客户请求，并将请求委托给 ( 策略类 )
- 优点
  - 1. 避免多重选择语句的出现: if...else
  - 2. 符合开放封闭原则
  - 3. 算法可复用
- 缺点
  - 必须了解所有策略
- 例子
  - 策略模式实现表单验证
  - 1-FRONTEND/13-DESIGN-PATTERN/4-策略模式-表单验证.html

```
4.1
实战 - 计算奖金
题目: s绩效发4倍工资，A绩效发3倍工资，B绩效发2倍工资
---

(1) 未经过任何优化的写法
- 缺点
  - 有很多 if...else
  - 缺乏扩展性: 如要添加C绩效，则需要修改getBonus内部的函数实现，违反开放封闭原则
  - 复用性差
const getBonus = (performance, salary) => {
  if (performance === "S") return 4 * salary;
  if (performance === "A") return 3 * salary;
  if (performance === "B") return 2 * salary;
};
getBonus("S", 1000); // 输出：4000


---
(2) 使用策略模式优化代码
- 优点
  - 避免了大量 if...else
  - 可扩展: 所有计算 ( 奖金bonus ) 的逻辑都不在 ( getBonus ) 函数(即环境类context)中，而是分布在各个 ( 策略对象strategy ) 中
  - context环境类不负责计算，只是负责将请求委托给strategy策略类
// 策略类
const strategy = {
  S: (salary) => 4 * salary,
  A: (salary) => 3 * salary,
  B: (salary) => 2 * salary,
}
// 环境类
const getBonus = (performance, salary) => strategy[performance](salary)
getBonus('S', 1000) // 输出：4000
```

```
4.2
实战 - 表单验证
---

(1) 未使用任何优化
const form = document.querySelector("form");
function validate(form) {
  if (form.username.value === "") {
    console.log("用户名不能为空");
    return false;
  }
  if (form.password.value === "") {
    console.log("密码不能为空");
    return false;
  }
  console.log("验证成功");
  return true;
}
form.onsubmit = (form) => {
  const isPass = validate(form);
  if (isPass) {
    // 提交数据
  }
};


---
(2) 使用 策略模式 优化表单验证

// 策略类 Strategy
// - 负责具体方法的计算实现
const strategy = {
  notEmpty: (arg, form) => {
    if (!form[arg.name].value) return arg.err;
  },
  minLength: (arg, form) => {
    const min = arg.min;
    if (form[arg.name].value.length < min) return arg.err;
  },
};
// 环境类 context
// - 接受客户请求，并把请求委托给策略类
class Validator {
  constructor(form) {
    this.form = form;
    this.rules = [];
  }
  add = (arg) => this.rules.push(() => strategy[arg.rule](arg, form));
  trigger = () => {
    for (let i = 0; i < this.rules.length; i++) {
      const err = this.rules[i]();
      if (err) return err;
    }
  };
}

// form
const form2 = document.querySelector("form");
form2.onsubmit = () => {
  const validator = new Validator(form2);
  validator.add({
    name: "username",
    rule: "notEmpty",
    err: "用户名不能为空",
  });
  validator.add({
    name: "password",
    rule: "minLength",
    min: 6,
    err: "密码最小长度为6位",
  });
  const err = validator.trigger();
  if (err) {
    console.log("err", err);
    return;
  }
  console.log("validate success");
};
```

# (五) 工厂模式 Factory

- 非工厂模式的缺点
  - 缺点: 我们要分别去三家门店买不同的小动物 Cat Dog Mouse
- 工厂模式
  - 优点: 不需要分别去三家不同的店买三种不同的小动物，而是一家超市，里面有各种小动物
- 分类
  - 简单工厂: `门店 -> 工厂创建产品`，即 `是老板也是服务员`
  - 工厂方法: `门店 -> 根据类型，创建工厂 -> 工厂创建产品`，即 `即由原来的老板做，变成了发命令让别人来做`
  - 抽象工厂

```
1
未使用工厂模式
- 缺点: 我们要分别去三家门店买不同的小动物
class Dog {}
class Cat {}
class Mouse {}
```

```
2
简单工厂
- 解决: 不需要分别去三家不同的店买三种不同的小动物，而是一家超市，里面有各种小动物
---

class Animals {
  create = (name) => {
    // 根据传入的类型，调用不同的构造函数，创建不同的实例
    // 即调用不同的工厂 生产 不同的产品
    switch (name) {
      case "cat":
        return new Cat();
      case "Dog":
        return new Dog();
      case "Mouse":
        Animals;
        return new Mouse();
      default:
        return new Error("error");
    }
  };
}
const dog = Animals.create("dog"); // 生产dog
const cat = Animals.create("cat"); // 生产cat
console.log(dog);
console.log(cat);
```

```
3
工厂方法
- 在简单工厂模式中，是由工厂来创建产品的，即是老板也是服务员
- 在工厂方法模式中，不再由工厂来创建产品，而是先创建具体的工厂，然后具体的工厂来创建产品
- 即由原来的老板做，变成了发命令让别人来做
---

class Animal {}  // ------------------------ 1. 产品
class Cat extends Animal { } // ------------ 具体产品 cat
class Dog extends Animal { } // ------------ 具体产品 dog

class AnimalFactory { // -------------------- 3. 具体类型的工厂，抽象类
  createAnimal()
}
class CatFactory extends AnimalFactory { // --- 创建cat的工厂，实现类
  // 实现类 实现 抽象类的方法
  createAnimal() {
    return new Cat('cat')
  }
}
class DogFactory extends AnimalFactory { // --- 创建dog的工厂，实现类
  // 实现类 实现 抽象类的方法
  createAnimal() {
    return new Dog('dog')
  }
}

class Factory { // ------------------------- 2. 工厂类
  // --------------------------------------- 根据类型，让具体的工厂去生产产品
  // 根据传入的类型，调用不同的构造函数，创建不同的实例
  // 门店 -> 创建工厂 -> 工厂再生产对应 产品
  static create(name) {
    switch (name) {
      case 'cat':
        return new CatFactory().createAnimal()
      case 'dog':
        return new DogFactory().createAnimal()
      default:
        return new Error('出错了')
    }
  }
}

const dog = Factory.create('dog')
const cat = Factory.create('cat')
console.log(dog)
console.log(cat)
```

````
4
抽象工厂
---

class Cat {}
class Dog {}
class ChineseCat extends Cat {} // 中国猫
class ChineseDog extends Dog {} // 中国狗
class EnglishCat extends Cat {} // 美国猫
class EnglishDog extends Dog {} // 美国狗

class AnimalFactory { // ------------------------------- 抽象工厂类 => 抽象动物工厂
    createCat()
    createDog()
}

class ChineseAnimalFactory extends AnimalFactory { // ----------- 实现类 => 中国动物工厂
  createCat() {
    return new ChineseCat()
  }
  createDog() {
    return new ChineseDog()
  }
}

class EnglishAnimalFactory extends AnimalFactory { // ----------- 实现类 => 美国动物工厂
  createCat() {
    return new EnglishCat()
  }
  createDog() {
    return new EnglishDog()
  }
}

const chineseAnimal = new ChineseAnimalFactory() // ------------- 中国动物
const chineseCat = chineseAnimal.createCat() // ----------------- 中国猫
console.log(chineseCat)```
````

# (六) 混入模式 Mixin

- 概念: 混入模式，是让一个 ( 目标类 Target ) 具有 ( 源类 Origin ) 上的属性和方法，即字面意思混入

```
1
混入模式 Mixin
---

// target
class Cat {
  constructor(color) {
    this.color = color; // 实例属性
  }
  sex = "male"; // ------- 实例属性 新的写法
}

// origin
class CatSkill {
  // 1. 类中的 方法 是挂在 CatSkill.prototype 上的
  walk() {
    console.log("walk");
  }
  jump() {
    console.log("jump");
  }

  // 2. 这个是实例属性(该实例属性是一个方法)，不在 CatSkill.prototype 上，而是在 new CatSkill() 生成的实例上
  run = () => console.log("run");
}

// 混入
// mixin(Cat, CatSkill) ---------- 混入所有
// mixin(Cat, CatSkill, 'walk') -- 只混入'walk'属性
const mixin = (target, origin, ...rest) => {
  if (res.length) {
    rest.forEach((key) => {
      target.prototype[key] = origin.prototype[key];
    });
  } else {
    for (let key in origin.prototype) {
      target.prototype[key] = origin.prototype[key];
    }
  }
};
```

```
2
混合模式Mixin 和 Object.assign() 的区别
---

1
Object.assign(target, source1, source2)
- 1. 当有重复的 key 时，source 将覆盖掉 target 中的 key，即 ( 后面的属性覆盖前面的属性 )
- 2. 返回的是一个新的对象
- 3. 只有一个参数时，直接返回该参数 Object.assign(obj) === obj // true
- 4. 如果该参数不是对象，则会先转成对象，然后返回

---
2
区别
// - Object.assign() 属于混入模式，只不过使用了自己的 ( 合并策略 )
// - 不同的混合模式 有不同的 合并策略
const target = {
  age: 10,
  name: "woow_wu7",
};
const source = {
  age: 20,
  sex: "male",
};
const obj = Object.assign(target, source);
console.log("obj: ", obj); // { name : "woow_wu7", age: 20, sex: 'male' }
```

# (七) 外观模式 Facade

- 概念
  - 是一种通过给多个复杂的子系统提供一个 ( 一致的接口 )，而使得这些子系统更容易被访问的模式
  - 外部: 不同关心系统内容的过程和具体细节，从而降低复杂度，提高可维护性
- 类比
  - 之前需要到 5 个不同的部门才能办理万房产证，现在只需要一个 ( 综合部门 ) 办理即可，他们会帮我们去 5 个部门去办理
- **角色**
  - Facade 外观
  - Sub 子系统
  - Client 客户
- 链接
  - https://www.51cto.com/article/722623.html

```
外观模式 facade 应用
---
计算器
  - 加法 add
  - 减法 subtract
  - 乘法 multiply
  - 除法 divide
---

class Sum {
  sum(a, b) {
    return a + b;
  }
}
class Subtract {
  subtract(a, b) {
    return a - b;
  }
}

// 外观模式
// - 集成了 加减乘除 的工能
class Calculate {
  sum = new Sum();
  subtract = new Subtract();

  sumFn = (a, b) => this.sum.sum(a, b);
  subtractFn = (a, b) => this.subtract.subtract(a, b);
}

const calculate = new Calculate();
const sum = calculate.sumFn(1, 2);
console.log("sum: ", sum);
```
