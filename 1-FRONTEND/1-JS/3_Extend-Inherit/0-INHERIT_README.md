# 继承 Extends // Inherit

- [[深入 03] 继承](https://juejin.cn/post/6844904050895372295)
- `ES5`
  - 原型链继承
    - 1.实现方式:
      - 将 ( 子类.prototype ) 指向 ( 父类的实例 )
      - 或者说将 ( 父类的实例 ) 作为 ( 子类实例 ) 的 ( 隐式原型 ) -- ( Child.prototype = new Father() )
    - 2.注意点
      - 当修改了 ( 子类.prototype ) 属性后，需要同时修改 ( 子类.prototype.constructor ) 的指向，让其 ( 从新指向子类自己 )
    - 缺点:
      - 1.传参: 生成子类实例时 不能向父类传参
      - 2.多继承: 不能实现多继承
      - 3.共享: 所有实例共享属性，当是引用类型的属性时，修改相互影响
      - 4.属性: 在子类的 prototype 上挂属性和方法，必须在修改子类的 prototype 指向之后
  - 借用构造函数继承
    - 1. 实现方式
      - 在 ( 子类 ) 中，通过 ( call ) 直接绑定 this 后调用父类，所以可以实现 ( 多继承 - 即调用多个父类 )
      - // TIPS: 因为没有通过 new 的方式调用父类，所以不能继承 Sup.prototype
    - 优点
      - 1. 传参: 在生成子类实例时 能向父类传参
      - 2. 多继承: 能实现多继承 ( 即调用多个父类 )
      - 3. 属性: 所有属性都生成在每个实例上，修改互不影响
    - 缺点
      - 不能继承多个 ( 父类.prototype ) 上的属性和方法，因为 ( 父类没有 new 调用，而是通过 call 调用的；同时也没修改子类 prototype 的指向，不存在原型链继承 )
      - 就是构造函数的缺点，也是优点，作为缺点就是属性和方法都生成在实例上，每次 new 都会新生成一份，造成系统资源浪费(即不共享属性)，对于可以共享的只读属性，应该方法原型链上
  - 组合式继承
  - 派生组合式继承
- `ES6`
  - extends: ES6 中的 class 通过 extends 关键字实现继承
  - class 作为构造函数的语法糖，同时具有`__proto__` 和 prototype
  - **ES6 中存在两条继承线**
    - 父类 是 子类 的原型 --------------------------------------------- 子类的`__proto__`总是指向父类（表示构造函数的继承）
    - 父类的原型 是 子类的原型 的原型 ----------------------------------- 子类的 prototype.`__proto__`总是指向父类的 prototype（表示方法的继承）
  - super
    - 函数
      - super 作为函数时，只能用在构造函数中，表示 ( 父类的构造函数 )
      - 子类在调用 super()之前，是没有 this 对象的，任何对 this 的操作都要放在 super()的后面
    - 对象
      - 普通方法: super 作为对象，在 ( 普通方法 ) 中，表示 ( 父类的原型 )
      - 静态方法: super 作为对象，在 ( 静态方法 ) 中，表示 ( 父类 )

## (一) ES5 中的继承

### (1) 原型链继承

```
// 原型链继承

// 原理
// - 将子类的prototype指向父类的实例，同时修改子类的constructor让其重新指向子类
// - 或者说：将父类的实例 作为 子类实例 的 原型对象 ( 隐式原型 )
//   - 因为修改了子类prototype指向父类实例后，子类的prototype.constructor就指向了父类（修改改回来，防止引用出错）
//   - 2021/07/24补充
//   - 因为：具体是 ( child.constructor ) => ( Child.prototype.constructor ) => ( 父类实例的constructor，即father.constructor ) => ( Father.prototype.constructor ) => Father
//   - 所以：当修改了prototype后，Child.prototype.constructor 指向了 Father，所以constructor需要重新指回Child
//   - 即：修改了 【 Child.prototype = new Father() 】 之后，需要修改Child.prototype.constructor的指向 【 Child.prototype.constructor = Child 】

// 缺点
// - 1.传参: 生成子类实例时不能向父类传参
// - 2.多继承: 不能实现多继承
// - 3.共享: 所有实例共享属性，当是引用类型的属性时，修改相互影响
// - 4.属性: 在子类的 prototype 上挂属性和方法，必须在修改子类的 prototype 指向之后

// 注意
// - 构造函数不能是箭头函数，因为箭头函数没有自己的this，所以不能作为构造函数，即不能new调用

// 链接
// - https://juejin.cn/post/6844904050895372295

// 父类
// 1. 2023-02-01 注意: 构造函数不能是箭头函数，因为箭头函数没有自己的this，所以不能作为构造函数，即不能new调用
function Super(name) {
  this.name = name;
}
Super.prototype.age = 10;

// 子类
function Sub(address) {
  this.address = address;
}
Sub.prototype = new Super("woow_wu7"); // 1. 这里会导致 Sub.prototype.constructor === super.constructor === Super.prototype.constructor === Super
Sub.prototype.constructor = Sub; // 2. 因为1的原因，需要重新修改 constructor 的指向
Sub.prototype.country = "china"; // 缺点：挂载属性必须在上面步骤之后

const sub = new Sub("shanghai"); // 缺点：只能向子类传参，不能向父类传参
console.log("sub: ", sub);
```

### (2) 借用构造函数 继承

```
// 借用构造函数 式继承

// 原理
// - call: 在 ( 子类 ) 中通过 ( call 或者 apply ) 方法来绑定 ( 父类中的this ) 为 ( 子类的实例 )，并在 ( 子类中调用父类 )
// - 从名字上看: 借用构造函数，就是绑定 this，执行父类

// 优点
// - 1. 传参: 在生成子类实例时 能向父类传参
// - 2. 多继承: 能实现多继承 ( 即调用多个父类 )
// - 3. 属性: 所有属性都生成在每个实例上，修改互不影响

// 缺点
// - 不能继承多个 ( 父类.prototype ) 上的属性和方法，因为 ( 父类没有 new 调用，而是通过 call 调用的；同时也没修改子类 prototype 的指向，不存在原型链继承 )
// - 就是构造函数的缺点，也是优点，作为缺点就是属性和方法都生成在实例上，每次 new 都会新生成一份，造成系统资源浪费(即不共享属性)，对于可以共享的只读属性，应该方法原型链上

// 注意
// - 构造函数不能是箭头函数，因为箭头函数没有自己的this，所以不能作为构造函数，即不能new调用

// 链接
// - https://juejin.cn/post/6844904050895372295

function Super1(name1) {
  this.name1 = name1;
}
Super1.prototype.age1 = 10;

function Super2(name2) {
  this.name2 = name2;
}
Super1.prototype.age2 = 20;

// 子类
function Sub(name1, name2, name3) {
  Super1.call(this, name1); // 通过call，绑定super1的this为子类实例，并执行Super1()，相当于 this.name1 = name1，从而实现了 ( 多继承 和 父类传参 )
  Super2.call(this, name2); // 优点：可以多继承，同时继承了Super1和Super2中的 实例属性，且在子类实例上修改属性相互不受影响
  this.name3 = name3; // 缺点：不能继承 ( 父类实例原型链上 ) 的属性和方法，即 age1 和 age2 不能在 sub 上访问到
}

const sub = new Sub(1, 2, 3);
console.log("sub: ", sub);
```

### (3) 组合继承

```
// 组合式继承
// - 原型链继承 + 借用构造函数式继承

// 优点
// - 结合了 原型链继承 和 借用构造函数式继承 的优点
// - 既具有借用构造函数继承的优点（向父类传参，多继承，不存在属性共享）
// - 又具有原型链继承的优点（继承父类实例上的属性和父类实例原型链上的属性和方法，并且是共享）

// 缺点
// - 重复的属性: ( 子类实例中的属性 ) 和 ( 子类.prototype ) 存在相同的属性
//  - 比如: 本例中的 name1属性，在子类实例上存在，同时通过原型链能访问到父类实例中的属性 name1
//  - 父类被调用了两次，一次是借用构造函数是的call调用，一次是原型链继承时的new调用，因为父类两次调用，所以子类和父类实例原型链上有相同的属性和方法，造成浪费

// 注意
// - 构造函数不能是箭头函数，因为箭头函数没有自己的this，所以不能作为构造函数，即不能new调用

// 链接
// - https://juejin.cn/post/6844904050895372295

function Super1(name1) {
  this.name1 = name1;
}
function Super2(name2) {
  this.name2 = name2;
}
Super1.prototype.age1 = 1;
Super2.prototype.age2 = 2;

function Sub(name1, name2, name3) {
  Super1.call(this, name1); // 1. 借用构造函数式继: 多继承，传参，属性都在实例上互不影响
  Super2.call(this, name2);
  this.name3 = name3;
}

// 注意：这里没有传参，在原型链继承这条线上，父类实例上的name1属性是undefined
// 注意：原型链继承这条线，还是不能多继承，（如不能同时继承Super1和Super2所在的prototype）因为是直接赋值
Sub.prototype = new Super1(); // 2. 原型链继承: 公有属都在原型链上
Sub.prototype.constructor = Sub; // 2. 原型链继承在修改prototype后，需要修改constructor指向，不然指向了父类而不是子类

const sub = new Sub(1, 2, 3);
console.log("sub: ", sub);
```

### (4) 寄生组合式继承

```
// 寄生组合式继承

// 解决的问题
// - 两次调用父类: 主要解决了在组合继承中两次调用父类的问题，这导致子类实例的自身属性中有父类实例的属性，子类实例的原型链中也有父类实例原型中的属性

// 原理
// - 1. 新建一个没有任何属性和方法的 构造函数Parasitic
// - 2. 将 ( 子类.prototype ) 指向 ( Parasitic.prototype )，这样子 ( 类实例就只能继承父类.prototype上的属性和方法 )，而不能 ( 继承到父类实例上的属性和方法 )

function Super(name1) {
  this.name1 = name1;
}
Super.prototype.age1 = 1;

function Sub(name1, name2) {
  Super.call(this, name1);
  this.name2 = name2;
}

function Parasitic() {}
Parasitic.prototype = Super.prototype; // Parasitic内没有任何属性，这样就没有执行父类（Super构造函数），而是间接的只 ( 继承了父类实例原型上的属性 )
Sub.prototype = new Parasitic();
Sub.prototype.constructor = Sub; // 修改prototype要同时修改constructor指向
Sub.prototype.age2 = 2;

const sub = new Sub(1, 2);
console.log("sub: ", sub);
```

## (二) ES6 中的继承

```
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg); // -------- super 作为对象，在 静态方法 中，表示 父类
  }

  myMethod(msg) {
    super.myMethod(msg); // -------- super 作为对象，在 普通方法 中，表示 父类的原型；需要注意的是: 因为是父类的原型，所以不能访问实力方法，即constructor中的this对象
  }
}

Child.myMethod(1); // static 1 ----- 直接通过 class 来调用，说明是静态方法 myMethod

var child = new Child();
child.myMethod(2); // instance 2
```
