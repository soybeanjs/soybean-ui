# soybean-ui

## 开发组件流程

### 启动项目

在根目录安装完依赖直接启动项目
```bash
pnpm install
pnpm dev
```

### 新增组件

- 在 `packages/ui/src/components` 下新增组件文件夹，以 kebab-case(小写+短横线) 方式命名，如 `card`。
> 组件参照 `https://www.shadcn-vue.com/`。

- 组件文件夹结构如下：

以`card`组件为例

```
card
├── card-content.vue
├── card-footer.vue
├── card-header.vue
├── card-root.vue
├── card-title-root.vue
├── card-title.vue
├── card.vue // 完整组件(api式，上面的组件均为组件的各个组成部分)
├── index.ts // 导出组件
└── types.ts // 组件类型定义
```

> 注意统一在 `packages/ui/src/components/index.ts` 中导出新增的组件。

### 组件样式

在 `packages/ui-variants/src/variants/` 下新增组件样式文件，如 `card.ts`。

> 注意统一在 `packages/ui-variants/src/index.ts` 中导出新增的组件样式。

### 组件示例

- 在 `src/views/ui/modules` 下新增组件示例文件，如 `card.vue`。
- 在 `src/views/ui/index.vue` 中引入组件示例文件，并添加对应的tab配置。


## 组件规范

当基于`radix-vue`内置的组件进行二次开发时，需要遵循以下规范：

以`popover`组件为例：

1. `index.ts`文件中将二次封装的组件、`radix-vue`局部组件(不需要二次封装)和单个完整组件进行导出，以及类型的导出。

2. 二次封装：需要对`radix-vue`中的组件进行属性的默认变更(如样式)，这是单独建立一个文件，如`popover-content.vue`，不需要二次封装的直接从`radix-vue`中引入即可。

3. 单个完整组件：这里是`popover.vue`，这个文件是将`popover-content.vue`和`popover-arrow.vue`以及`radix-vue`中的`PopoverClose`,`PopoverPortal`,`PopoverRoot`,`PopoverTrigger`组合在一起，这个文件是`api`式的组件，用户可以直接使用。

使用区别：

- 组合使用

```vue
<template>
  <SPopoverRoot>
    <SPopoverTrigger>
      <button>Trigger</button>
    </SPopoverTrigger>
    <SPopoverPortal>
      <SPopoverContent>
        <p>Content</p>
        <SPopoverArrow />
        <SPopoverClose />
      </SPopoverContent>
    </SPopoverPortal>
  </SPopoverRoot>
</template>
```

- api使用

```vue
<template>
  <SPopover>
    <template #trigger>
      <button>Trigger</button>
    </template>
    <template #content>
      <p>Content</p>
    </template>
  </SPopover>
</template>
```

4. 对于需要添加属性class的组件，需要在`types.ts`中定义类型：

```ts
import { PopoverArrowProps as $PopoverArrowProps } from 'radix-vue';
import type { ClassValue } from '@soybean-ui/variants';

export type PopoverArrowProps = $PopoverArrowProps & {
  class?: ClassValue;
};
```
5. 对于使用了`Primitive`组件二次封装的组件类型定义如下

```ts
import type { PrimitivePropsWithClass } from '../../types';

export type CardTitleProps = PrimitivePropsWithClass;
```

6. 二次封装组件时属性和事件的继承

按场景分别使用`radix-vue`提供的以下几个函数
- `useForwardProps`：继承属性
- `useEmitAsProps`：继承事件
- `useForwardPropsEmits`：继承属性和事件

> 继承属性时，一定要注意属性的类型，保证类型的完整性以及正确性。

