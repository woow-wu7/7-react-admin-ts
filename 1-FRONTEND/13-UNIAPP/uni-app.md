# uni-app

```
1
block 和 template 标签的区别？
- <template/> 和 <block/> 并不是一个组件，它们仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性
- <block/> 在不同的平台表现存在一定差异，推荐统一使用 <template/>

2
tap 和 click
- @click: 是组件被点击时触发，会有约300ms的延迟内置处理优化了
- @tap: 是手指触摸离开时触发，没有300ms的延迟，但是会有事件穿透
- 编译到小程序端，@click 会被转换成 @tap

3
条件编译
#ifdef：if defined 仅在某平台存在
#ifndef：if not defined 除了某平台均存在
%PLATFORM%：平台名称
详见官网: https://uniapp.dcloud.net.cn/tutorial/platform.html#%E8%B7%A8%E7%AB%AF%E5%85%BC%E5%AE%B9
```
