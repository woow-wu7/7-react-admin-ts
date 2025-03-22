# VUE3 中使用 TS

```
1
在 props 中用 typescript 指定类型时，如果指定 ( 默认值 ) ？
---

import { withDefaults } from "vue";
interface IProps {
  name: string,
  age: number,
}

const props = withDefaults(defineProps<IProps>(), {
  name: 'woow_wu7',
  age: () => 20, // 可以是一个具有返回值的函数
})
```

```
2
组件的 mouse 事件类型
---

<ThumbComponent  @mousedown="onMouseHDown" />
const onMouseHDown = (e: MouseEvent) => {}

<div ref="refVThumbRoot" ></div>
const refHThumbRoot = ref<HTMLDivElement>();
```
