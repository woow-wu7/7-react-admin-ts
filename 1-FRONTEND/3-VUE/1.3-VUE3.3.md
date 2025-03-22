# Vue3.3 新特性

### 如何开启 3.3 的一些新功能支持 ( defineModel, defineProps 的响应式解构 )

```
vite中需要配置
---

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
         propsDestructure: true
      }
    }),
  ],
})
```

## (一) defineModel / defineModels

```1111111
1
Vue3.3 之前的写法
---

父组件
<Child v-model="state.count" />
const state = reactive({ count: 0 })

子组件
<input :value="modelValue" @input="onInput" />
defineProps({ modelValue: Number })
const emit = defineEmits(['update:modelValue'])
function onInput(e: any) {
  emit('update:modelValue', e.target.value)
}


扩展1
<input v-model="searchText" />
相当于
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>

扩展2
<CustomInput v-model="searchText" />
相当于
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>

扩展3
v-model
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>
<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

```1111111
defineModel 的写法
---

父组件
<Child v-model="state.count" />
const state = reactive({ count: 0 })

子组件
<input v-model="modelValue" />
const modelValue = defineModel()
```

## (二) defineOptions

```
defineOptions
- 作用: 用来在 script setup 中定义和 setup 同级的属性
- 应用:
  - 1. 比如在写组件库时，组件名需要用到两个script，defineOptions就能很好的解决
    - <script lang="ts">export default { name: DvWatermark }</script>
    - <script lang="ts" setup></script>
- 总结
  - defineProps
  - defineEmits
  - defineSlots
  - defineExpose
  - defineOptions
  - defineModel or defineModels (实验阶段)
---

defineOptions({ name: 'DefineOptionsChildTest' })
```

## (三) defineEmits 的变化

```
// BEFORE
const emit = defineEmits<{
  (e: 'foo', id: number): void
  (e: 'bar', name: string, ...rest: any[]): void
}>()

// AFTER
const emit = defineEmits<{
  foo: [id: number]
}>()
  bar: [name: string, ...rest: any[]]

emits('foo', state.id)
```

## (四) defineProps 的两个变化

```
1
响应式解构
---

1. 在vite中配置
export default defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true
      }
    }),
  ],
})

2. 使用
<template>
  <!-- 注意这里的count不是解构的count，而是props.count的简写 -->
  {{ count }}
</template>

<script setup lang="ts">
import { watch } from 'vue'
const { count } = defineProps({ count: Number })
watch(
  () => count,
  () => {
    console.log('count', count) // 在 vite 中开启 propsDestructure: true 后，count将会变化
  }
)
</script>
```

```
2
支持 props 的引入声明，extends，& 等等
支持 泛型
---
1
<script setup lang="ts">
import type { Props } from './foo'
// imported + intersection type
defineProps<Props & { extraProp?: string }>()
</script>

2
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

# 资料

官网说明 https://blog.vuejs.org/posts/vue-3-3#definemodel
核心成员介绍 https://juejin.cn/post/7231940493256032316
