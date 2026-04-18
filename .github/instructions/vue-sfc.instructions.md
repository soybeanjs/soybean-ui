---
applyTo: '**/*.vue'
---

# Vue SFC 结构规范

这份规范用于 soybean-ui 代码库中的 `.vue` 文件，重点约束 `script setup` 的组织顺序与职责分层。

## 目标

- 让组件脚本结构稳定、可预测、便于扫描。
- 把类型定义、响应式状态、provider、watch、生命周期分层放置，减少来回跳读。
- 保持 soybean-ui 组件模板在 headless / UI 两层中的写法一致。

## script setup 顺序

推荐顺序如下：

1. import statements
2. `defineOptions`
3. props 类型定义或 `import type`
4. `defineProps`
5. emits 类型定义或 `import type`
6. `defineEmits`
7. hooks / composables 初始化
8. 组件业务逻辑，按语义分块
9. 必要的 `init` 函数
10. context provider
11. `watch` / `watchEffect`
12. 生命周期 hooks
13. `defineExpose`

## 详细说明

### 1. import statements

- import 顺序遵循同目录 `import-order.instructions.md`。
- value import 在前，`import type` 紧跟对应模块。

### 2. defineOptions

- `defineOptions` 尽量靠前，通常紧跟 imports 后。
- UI 组件名称必须保留 `S` 前缀，例如 `SButton`、`SDialog`，Headless 层组件名称则不带 `S` 前缀，例如 `Button`、`Dialog`。

### 3. props 类型定义

- 优先从同级 `types.ts` 导入 props 类型。
- 如果类型很简单，也可以在当前文件内直接声明小型 interface。

```ts
import type { DemoProps } from './types';

interface LocalProps {
  disabled?: boolean;
}
```

### 4. defineProps

- 不使用 props 时可直接 `defineProps<Type>()`。
- 需要在脚本中访问 props 时，使用 `const props = defineProps<Type>()`。
- 即使脚本里保留了 `props` 对象，模板里也直接使用 prop 名，不写 `props.xxx`。

```ts
const props = defineProps<DemoProps>();
```

```vue
<template>
  <Primitive :as="as" :disabled="disabled" />
</template>
```

### 5. emits 类型定义

- emits 类型优先从 `types.ts` 导入。
- 简单场景可以在当前文件内直接声明 tuple-style emits。

```ts
import type { DemoEmits } from './types';

interface LocalEmits {
  change: [value: string];
}
```

### 6. defineEmits

- 不使用 emit 时可直接 `defineEmits<Type>()`。
- 需要在脚本里触发事件时，使用 `const emit = defineEmits<Type>()`。

### 7. hooks / composables 初始化

- `useRoute`、`useRouter`、`useControllableState`、`useForwardListeners`、`useOmitProps` 这类初始化逻辑放在这里。
- 这一段只做“拿能力”和“拿基础上下文”，不要混入大量业务计算。

### 8. 组件业务逻辑

- 按业务语义分块，而不是按 API 类型混排。
- 相关的 `ref`、`computed`、函数尽量靠近放置。
- 可以用简短注释标出逻辑块，但不要写低信息量注释。
- 对对象、数组、实例句柄等不需要深层响应式的数据，优先使用 `shallowRef` 而不是 `ref`。

```ts
// counter logic
const count = ref(0);
const increment = () => {
  count.value++;
};

// toggle logic
const visible = ref(false);
const toggleVisible = () => {
  visible.value = !visible.value;
};
```

### 响应式引用选择

- 需要追踪基础值或确实依赖深层属性响应式更新时，使用 `ref`。
- 如果只关心 `.value` 整体替换，而不需要内部深层属性自动追踪，优先使用 `shallowRef`，这样更符合性能预期。
- 尤其是对象、数组、第三方实例、DOM 句柄、上下文状态容器这类值，默认先考虑 `shallowRef`。

```ts
const open = shallowRef(false);
const activeItem = shallowRef<Item | null>(null);
const popperInstance = shallowRef<PopperInstance | null>(null);
```

```ts
const formState = ref({
  touched: false,
  errors: []
});
```

上面这种需要依赖对象内部字段变化触发更新的场景，才更适合继续使用 `ref`。

### 9. init 函数

- 只有在确实存在初始化流程时才定义 `init`。
- 初始化逻辑集中到一个函数里，避免散落到多个生命周期钩子中。

```ts
async function init() {
  await fetchData();
}
```

### 10. context provider

- `provideXContext`、`provideXUi` 这类 provider 放在业务逻辑之后、watch 与生命周期之前。
- 先把要提供的数据准备好，再统一注入，避免 provider 之前和之后来回穿插定义状态。
- 消费必有值的 context 时直接解构所需状态；只有可选 context 才保留整体对象并判空。

```ts
provideDemoContext({
  count,
  increment,
  visible,
  toggleVisible
});
```

### 11. watch / watchEffect

- `watch`、`watchEffect` 放在 provider 之后。
- 没必要时不要引入 watcher；优先考虑 `computed` 或直接事件流。

### 12. 生命周期 hooks

- 生命周期钩子放在 script 末段。
- 若存在 `init()`，通常在这里或等价创建阶段调用，保持初始化入口集中。

```ts
init();

onMounted(() => {
  // ...
});
```

### 13. defineExpose

- `defineExpose` 放在脚本最后。
- 只有组件确实需要暴露实例 API 时才使用。

```ts
defineExpose({
  count,
  increment
});
```

## SoybeanUI 语境补充

- Headless SFC 中，ARIA 状态、context 注入、受控状态逻辑优先靠近对应逻辑块组织。
- UI SFC 中，`useOmitProps` / `usePickProps`、variant 计算、`provideXUi(ui)` 一般会落在“hooks / composables 初始化”与“业务逻辑 / provider”之间。
- 模板统一直接使用 prop 名；如果和局部变量冲突，优先调整局部变量命名，不回退到 `props.xxx`。
- template 中绑定到事件、插槽参数回调或属性的函数实现，必须写在 `script setup` 里，或从外部显式导入后再在 template 中引用。
- 不要在 template 里直接写内联箭头函数、匿名函数或承载业务逻辑的函数实现；template 只负责绑定已经在脚本中定义好的函数。
- 允许在 template 中给脚本内已定义的函数传参，例如 `@click="handleSelect(item.id)"`；不允许直接写 `@click="() => handleSelect(item.id)"` 这类内联实现。
- 在 soybean-ui 组件里，如果状态值不需要深层响应式，优先 `shallowRef`；这与仓库里大量 headless context、受控状态和元素引用的写法保持一致。
- 若组件非常简单，不必为了凑顺序硬塞空分区；顺序是为了增强可读性，不是制造样板代码。

```vue
<template>
  <button @click="handleClick">Save</button>
  <button @click="handleSelect(item.id)">Select</button>
</template>

<script setup lang="ts">
function handleClick() {
  // ...
}

function handleSelect(id: string) {
  // ...
}
</script>
```

```vue
<template>
  <button @click="() => handleClick()">Save</button>
  <button @click="value => emit('select', value)">Select</button>
</template>
```

## 检查问题

- import 是否符合同目录 `import-order.instructions.md`？
- `defineOptions` 是否足够靠前？
- props / emits 类型与 `defineProps` / `defineEmits` 是否成对且顺序稳定？
- hooks 初始化、业务逻辑、provider、watch、生命周期是否分层清楚？
- template 中绑定的函数是否都已经在 `script setup` 中定义或导入，而不是写成内联实现？
- 不需要深层响应式的状态是否优先使用了 `shallowRef`？
- 是否为了形式保留了不必要的 `init`、watch、`defineExpose`？
