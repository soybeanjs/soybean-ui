---
applyTo: 'headless/src/components/**/*.{ts,vue}'
---

# SoybeanUI Headless 规范

## 职责边界

- headless 只负责逻辑、状态、a11y、结构聚合和默认语义
- 禁止添加 UnoCSS 类名、`<style>`、内联样式或任何视觉样式
- 禁止从 `@soybeanjs/ui` 导入
- 写新逻辑前，先检查 `headless/src/composables/`、`headless/src/shared/`、`headless/src/types/` 是否已有可复用实现

## 场景补充

### 场景 A：从 0 到 1

- 直接按本文件的 Step 1 到 Step 7 顺序推进

### 场景 B：迁入其它仓库现有代码后规范化

- 先提炼出外部实现里的状态、交互、a11y、数据结构和默认语义
- 再按本文件顺序拆成 `types.ts`、`context.ts`、分片组件、必要的 `{Name}Compact`
- 不要把外部组件的样式类、DOM 结构习惯或单层文件组织直接照搬到 headless

### 场景 C：对现有组件做规范对齐

- 先检查 context 是否响应式、分片是否暴露 `data-slot`、聚合逻辑是否放错层
- 优先修结构和语义边界，再考虑局部实现风格统一

## 新组件 headless 顺序

开发一个新 headless 组件时，按下面顺序推进：

1. `types.ts`
2. `context.ts`
3. 基础分片组件 SFC
4. 必要时新增 `{Name}Compact`
5. `index.ts`
6. 接入 `headless/src/index.ts`、`headless/src/constants/components.ts`、`headless/src/namespaced/index.ts`

## Step 1：types.ts

- 多 slot 组件使用 `UiClass<{Name}UiSlot>` 定义 `{Name}Ui`
- Props 使用 `interface`，并 `extends /** @vue-ignore */ HTMLAttributes` 或更具体的 HTML 属性类型
- 先复用 `headless/src/types/common.ts` 中已有类型，不要重复定义 `Side`、`Align`、`Direction` 等公共类型
- 写新类型前，先检查 `headless/src/types/` 中现有定义，不要在组件目录里重复造类型
- 受控/非受控状态用 `useControllableState`
- 多选组件优先复用 `SelectionProps<M>` / `SelectionEmits<M>`

## Step 2：context.ts

- context 中的值必须是响应式，使用 `ComputedRef` 或 `ShallowRef`
- 直接来自 props 的字段优先使用 `transformPropsToContext` 或 `PropsToContext`
- 需要新的 composable 或状态工具时，先检查 `headless/src/composables/` 是否已有对应能力
- 如果 `headless/src/composables/` 没有，再检查 `@vueuse/core` 是否已有可直接使用的 composable
- 只在 provider 之外也需要消费的派生值放在组件里先算好，再传给 `provideXContext`
- 只供子组件消费的基础设施状态，如 element ref、生成的 id，可放在 `useContext` 的回调里派生
- 消费必有值的 context 时直接解构所需状态；只有可选 context 才保留整体对象

## Step 3：基础分片组件 SFC

- 分片组件通过 `use{Name}Ui('root')` 或 `use{Name}Ui()` 获取类名
- 每个 headless 分片组件根元素都要暴露稳定的 `data-slot="{slotName}"`
- 需要暴露 DOM 句柄时使用 `useForwardElement`
- 状态通过 `data-state` 等 `data-*` 属性暴露，不要用 class 传状态

## Step 4：UI Context

- 多 slot 组件通过 `useUiContext` 建立 `provide{Name}Ui` / `use{Name}Ui`
- 对外只导出 `provide{Name}Ui`
- `use{Name}Ui` 仅供同组件族内部使用，不要从 barrel 暴露

## Step 5：Compact 聚合组件

符合以下条件时，应把聚合逻辑下沉到 headless：

- 输入是列表数据
- 结构稳定
- UI 层只是重复拼装现有 headless 分片

此时应：

- 在 headless 新增 `{Name}CompactProps`、`{Name}CompactEmits`、`{Name}CompactSlots`
- 新增 `{component}-compact.vue`
- 把 `items` 遍历、`Root/Item/Header/Trigger/Content` 组合、默认标题/描述/图标渲染下沉到 headless
- 默认图标通过 headless `IconRender` 渲染，并由 `ConfigProvider.iconRender` 驱动

## Step 6：常用实现模式

- 用 `transformPropsToContext(props, [...])` 让 props 到 context 保持响应式
- 使用 `useControllableState(() => props.xxx, value => emit('update:xxx', value), defaultValue)` 处理受控/非受控模式
- 需要把本组件的部分 UI slot 传给内部子 headless 组件时，在 `useUiContext` 回调中映射并注入
- 只有在仓库已有 `composables/shared/types` 与 `@vueuse/core` 都不满足时，才新增新的 headless composable 或 shared helper

## Step 7：导出与注册

- `index.ts` 导出组件、`provide{Name}Ui` 和相关 types
- 正式出口还要同步接入 `headless/src/index.ts`
- 同步更新 `headless/src/constants/components.ts`
- 同步更新 `headless/src/namespaced/index.ts`

场景 B 与场景 C 里，只要组件仍是正式公开组件，这一步就不能跳过。

## 禁止反模式

- 在 headless 中添加样式类，包括 `hidden`、`sr-only`
- 直接操作 DOM，如 `document.querySelector`
- 在 context 中存非响应式原始值
- 对外导出 `use{Name}Ui`
- 把稳定聚合结构继续留在 UI wrapper 层
