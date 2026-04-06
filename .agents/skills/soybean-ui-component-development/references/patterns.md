# 常见组件模式参考

从实际源码中提取的模式，开发时直接对照。

---

## 1. 受控/非受控状态

```typescript
// headless SFC 中
const open = useControllableState(
  () => props.open, // getter：来自 props
  value => emit('update:open', value ?? false), // setter：触发 emit
  true // defaultValue（props 为 undefined 时使用）
);
```

`useControllableState` 规则：

- `props.open === undefined` → 内部维护 `shallowRef`（非受控）
- `props.open !== undefined` → 返回 computed proxy（受控）

---

## 2. Props 转 Context（响应式）

```typescript
provide{Name}RootContext({
  open,                                           // 已是 ShallowRef
  ...transformPropsToContext(props, ['disabled', 'orientation'])
  // 等价于: { disabled: computed(() => props.disabled), orientation: computed(() => props.orientation) }
});
```

> Context 中的值**必须是响应式**（`ComputedRef` 或 `ShallowRef`），直接存原始值会失去响应性。

---

## 3. 多选组合（SelectionProps）

用于 accordion、tabs、listbox 等有单/多选模式的组件：

```typescript
// headless types.ts
import type { SelectionProps, SelectionEmits } from '../../types';

export interface AccordionRootProps<M extends boolean = false>
  extends SelectionProps<M>, /** @vue-ignore */ HTMLAttributes { ... }

// headless SFC
const { modelValue, isMultiple, onModelValueChange } = useSelection(props, value => {
  emit('update:modelValue', value);
});

// 泛型组件：<script setup lang="ts" generic="M extends boolean = false">
```

---

## 4. 继承 UI slot 给子 headless 组件

当一个组件（如 accordion）需要将自己的部分 UI slots 传给内部子组件（如 collapsible）：

```typescript
// context.ts
export const [provideAccordionUi, useAccordionUi] = useUiContext<AccordionUiSlot>('AccordionUi', ui => {
  const collapsibleUi = computed(() => ({
    root: ui.value?.item, // accordion 的 item slot → collapsible 的 root slot
    trigger: ui.value?.trigger,
    content: ui.value?.content
  }));

  provideCollapsibleUi(collapsibleUi); // 注入给子组件

  return ui; // 还是返回自己的 ui 供自身组件使用
});
```

---

## 5. 多态组件（as prop）

使用 `PrimitiveProps` 让组件支持 `as` 和 `asChild`：

```typescript
// headless types.ts
import type { PrimitiveProps } from '../primitive/types';

export interface ButtonProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes { ... }
```

```vue
<!-- headless SFC -->
<template>
  <Primitive v-bind="forwardedProps" :class="cls">
    <slot />
  </Primitive>
</template>
```

---

## 6. 带 data 属性的 ARIA 状态

headless 层通过 `data-*` 属性暴露状态供 CSS 选择器：

```typescript
const dataDisabled = computed(() => (props.disabled ? '' : undefined));
const dataState = computed<DisclosureState>(() => getDisclosureState(open.value));
// 'open' | 'closed'
```

在 `variants.ts` 中用 UnoCSS 响应：

```typescript
trigger: `hover:underline [&[data-state=open]>.trigger-icon]:rotate-180`;
content: `data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up`;
```

---

## 7. 访问注入的 context（子组件）

```typescript
// 子组件内：consumerName 参数用于在缺失 provider 时报错
const { open, disabled } = use{Name}RootContext('{Name}Trigger');

// 可选 context（不报错）
const buttonGroupContext = useButtonGroupContext();  // 返回 null 或 context
if (buttonGroupContext) {
  // ...
}
```

---

## 8. 暴露 DOM ref

```typescript
// 在 context.ts 中
const [triggerElement, setTriggerElement] = useForwardElement();
// triggerElement: ShallowRef<HTMLElement | undefined>
// setTriggerElement: (el: HTMLElement) => void

// 在 SFC 中
<template>
  <button :ref="setTriggerElement" />
</template>
```

---

## 9. useOmitProps / usePickProps 的选择

优先按“转发复杂度”选择，而不是机械统一写法。

### 适合 `useOmitProps`

当下游组件应接收大多数 props，只有少量 prop 由当前组件自己消费时，用 `useOmitProps` 更清楚。

```typescript
const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui']);
```

常见于：UI wrapper 把样式类、变体、局部子组件 props 留在当前层，其余直接透传给 headless root。

### 适合 `usePickProps`

当一个组件要把 props 拆给多个子组件，且每个子组件只应拿到明确子集时，用 `usePickProps`。

```typescript
const forwardedRootProps = usePickProps(props, ['modelValue', 'defaultValue']);
const forwardedOptionsProps = usePickProps(props, ['items', 'itemProps', 'groupProps']);
```

常见于：`tree-menu`、`command`、`dropdown-menu` 这类“一个外壳 + 多个内部块”的组件。

### 不必使用的场景

如果组件基于 `Primitive` 或只包一层单一子组件，而且当前组件真正额外处理的 prop 只有 3 个或以下，优先直接显式绑定。

```vue
<Primitive :as="props.as" :as-child="props.asChild" :disabled="props.disabled">
  <slot />
</Primitive>
```

这种场景强行引入 `useOmitProps` / `usePickProps`，通常只会增加一层间接性，没有实际收益。
