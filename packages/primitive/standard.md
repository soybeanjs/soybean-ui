已整改好的组件有:
[accordion](./components/accordion)
[alert-dialog](./components/alert-dialog)
[arrow](./components/arrow)
[aspect-ratio](./components/aspect-ratio)
[avatar](./components/avatar)
[collapsible](./components/collapsible)
[config-provider](./components/config-provider)
[dialog](./components/dialog)
[dismissable-layer](./components/dismissable-layer)
[focus-scope](./components/focus-scope)
[presence](./components/presence)
[primitive](./components/primitive)
[separator](./components/separator)
[teleport](./components/teleport)


1. 项目结构
```
packages/primitive/src/
  ├── components/        # 组件源代码
  ├── composables/      # 组合式函数
  ├── constants/        # 常量定义
  ├── date/            # 日期相关工具
  ├── shared/          # 共享工具函数
  └── types/           # 公共类型定义
```

2. 组件目录结构
```
components/
  └── component-name/          # kebab-case命名
      ├── types.ts            # 类型定义
      ├── context.ts          # 上下文
      ├── shared.ts           # 组件独有的工具函数
      ├── index.ts            # 导出
      ├── component-root.vue  # 根组件
      └── component-*.vue     # 子组件
```

3. 类型定义规范 (types.ts)

```ts
import type { PrimitiveProps } from '../primitive';

// Props类型
export interface ComponentProps {
  prop1?: string;
  prop2?: boolean;
}

// 继承PrimitiveProps
export type ComponentPropsWithPrimitive = ComponentProps & PrimitiveProps;

// Emits类型
export interface ComponentEmits {
  'event-name': [payload: type];
}

// 上下文参数类型
export interface ComponentContextParams {
  state: Ref<StateType>;
  value: Ref<ValueType>;
}

// 上下文类型(继承参数类型)
export interface ComponentContext extends ComponentContextParams {
  method1: (arg: ArgType) => void;
  method2: (arg: ArgType) => void;
}
```

4. 上下文规范 (context.ts)

```ts
import { createContext } from '../../composables';
import type { ComponentContext, ComponentContextParams } from './types';

export const [provideComponentContext, injectComponentContext] = createContext(
  'ComponentName',
  (params: ComponentContextParams) => {
    const context: ComponentContext = {
      ...params,
      method1(arg) {
        // ...
      },
      method2(arg) {
        // ...
      }
    };

    return context;
  }
);
```

5. 导出规范 (index.ts)

```ts
// 1. 组件导入
import ComponentRoot from './component-root.vue';
import ComponentContent from './component-content.vue';
import ComponentHeader from './component-header.vue';
import ComponentItem from './component-item.vue';
import ComponentTrigger from './component-trigger.vue';

// 2. 组件导出
export {
  ComponentRoot,
  ComponentContent,
  ComponentHeader,
  ComponentItem,
  ComponentTrigger
};

// 3. Context导出
export {
  injectComponentItemContext,
  injectComponentRootContext
} from './context';

// 4. 类型导出
export * from './types';
```

6. 组件文件规范 (.vue)

```vue
<script setup lang="ts">
// 1. Vue 相关导入
import { computed, ref } from 'vue';

// 2. 内部依赖导入
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

// 3. 类型导入
import type { ComponentPropsWithPrimitive, ComponentEmits } from './types';

// 4. defineOptions (inheritAttrs 参考原组件)
defineOptions({
  name: 'ComponentName'
  // inheritAttrs: false  // 只在原组件有此属性时添加
});

// 5. Props定义
const { prop1 = 'default', prop2 = false } = defineProps<ComponentPropsWithPrimitive>();

// 6. Model定义
const modelValue = defineModel<ValueType>();

// 7. Emits定义
const emit = defineEmits<ComponentEmits>();

// 8. 组合式函数 (useForwardExpose 解构参考原组件)
useForwardExpose();
// 只在原组件需要时解构: const { forwardRef } = useForwardExpose();

// 9. 组件逻辑
const state = ref(initialState);

// 10. 事件处理函数
function handleEvent() {
  // ...
}

// 11. 监听逻辑
watch(deps, callback);

// 12. 生命周期
onMounted(() => {
  // ...
});
</script>

<template>
  <!-- v-bind="$attrs" 参考原组件是否有绑定 -->
  <Primitive
    :as
    :as-child
    @event="handleEvent"
  >
    <slot />
  </Primitive>
</template>
```
