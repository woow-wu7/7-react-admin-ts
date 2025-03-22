// class
// - public
// - private
// - protected
// - readonly

class Cons {
  attr1 = 1;

  // 实例属性:
  // - 这样声明的属性是-实例属性，相当于在constructor中通过 this.pub = 2 声明
  public pub = 2; // ------- public 公共属性 可以在任何地方访问 ( 声明它的类内部 子类 实例 ) 中都能被访问
  private pri = 3; // ------ private 私有属性 只能在 ( 声明它的 类 内部 ) 访问，不能在 子类 实例 中访问到
  protected pro = 4; // ---- protected 保护属性 只能在声明它的 ( 类 及其 子类 ) 中访问，不能在 ( 实例 ) 中访问到

  readonly name = "readonly";

  getPri = () => {
    console.log("this.pri", this.pri); // private 私有属性 只能在声明他的 类 中访问
  };
  getPro = () => {
    console.log("this.pro", this.pro); // protected 保护属性 只能在声明他的 ( 类 及其 子类 ) 中访问
  };

  changeName = () => {
    this.name = "can not be modified"; // 报错，Cannot assign to 'name' because it is a read-only property.ts(2540)
    // Report Error:  Because this this a readonly attribute.
    // English
    // - attribute 属性 n
    // - property 财产 属性 n
  };
}

// 实例
const cons = new Cons();
console.log("cons", cons);
console.log("cons.pub", cons.pub);
console.log("cons.pri", cons.pri); // 报错，属性“pri”为私有属性，只能在类“Cons”中访问
console.log("cons.pro", cons.pro); // 报错，属性“pro”受保护，只能在类“Cons”及其子类中访问

console.log("cons.getPri()", cons.getPri());
console.log("cons.getPro()", cons.getPro());

// 子类
class ChildCons extends Cons {
  getPro = () => {
    console.log("this.pro", this.pro); // protected 可以在声明他的 ( 类 和 子类 ) 中访问
  };
}
const childCons = new ChildCons();
console.log("childCons.getPro()", childCons.getPro());
