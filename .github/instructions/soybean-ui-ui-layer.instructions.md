---
applyTo: 'packages/ui/src/components/**/*.{ts,vue}'
---

# SoybeanUI UI 层规范

按 `soybean-ui-component-overview.instructions.md` 先判模式与场景；本文件只讲 UI 层实现。

## 职责边界

- UI 只负责样式包装、variants 计算、UiContext 注入和 props/listeners 转发
- 禁止在 UI 层放 ARIA 属性、键盘逻辑或状态语义
- UI 应消费 headless 已暴露的 `data-state`、`dir` 与 slot 结构做样式表达，而不是重建语义

## 实现顺序

1. `packages/ui/src/styles/{name}.ts`
2. `types.ts`
3. wrapper `.vue`
4. `index.ts` 与 `packages/ui/src/index.ts`
5. 运行 `pnpm sui ui`

## Step 1：style recipe

- 第一行必须是 `// @unocss-include`
- 使用 `@soybeanjs/cva` 的 `cv()` 或 `scv()` 定义样式 recipe
- `slots` key 必须与 headless `{Name}UiSlot` 完全一致
- 组件有自定义 CSS 变量时，统一使用 `--soybean-` 前缀
- 方向相关样式遵循 `soybean-ui-accessibility-rtl.instructions.md`：优先逻辑属性与逻辑对齐类，只有无法表达时才用 `rtl:` 修饰符

## Step 2：types.ts

- Props 用 `interface`，不要用 `type` 作为主 props 声明
- UI 组件 props 标准包含 `class?: ClassValue`
- 与当前 UI 组件对应的 headless 组件类型，统一从 `@soybeanjs/headless/{name}` 子路径导入或 re-export
- `ClassValue`、`UiClass` 等 headless 全局类型，统一从 `@soybeanjs/headless/types` 导入
- UI 层新增了 headless 没有的结构元素，且该元素也要对外暴露 `ui` 覆盖能力时，必须扩展 `ExtraUiSlot` / `ExtendedUi`

## Step 3：wrapper `.vue`

- `defineOptions({ name: 'S{Name}' })`
- 模板里直接使用 prop 名，不写 `props.xxx`
- `script setup` 顺序遵循 `vue-sfc.instructions.md`
- wrapper 只承接样式注入与 props/listeners 转发，不在这里补写 `aria-*`、键盘逻辑，也不要吞掉需要继续下传给 headless 的 `dir`、`data-*` 或其他语义相关输入

### 3.1 Props 转发策略

#### 适合 `useOmitProps`

- 下游应该接收大多数 props，当前 wrapper 只消费少量 UI 专属 prop
- 常见场景：剔除 `class`、`color`、`size`、`ui` 后透传给 headless root

#### 适合 `usePickProps`

- 一个 wrapper 要把 props 拆给两个或更多子组件
- 每个子组件只应接收明确子集

#### 不必使用的场景

- 基于 `Primitive`
- 只包一层单一子组件
- 当前组件真正额外处理的 prop 只有 3 个或以下

这类简单场景优先直接显式绑定。

### 3.2 组件模式

#### 多 slot wrapper

- 计算 `ui = computed(() => nameVariants(variantProps, props.ui, { root: props.class }))`
- 调用 `provide{Name}Ui(ui)`
- 如果 headless 已提供 `{Name}Compact`，直接渲染它，不再自己遍历 `items`、拼装默认 icon/title/content，也不再为 Compact 额外编排任何非样式逻辑

若 wrapper 仍然需要为了 Compact 写条件分支、默认内容决策、slot 选择、事件包装、结构切换或其它非样式逻辑，应回到 headless 完成下沉，而不是继续堆在 UI 层。

#### 单类名组件

- 直接 `{name}Variants(variantProps, props.class)`
- 不建立 UiContext

## Step 4：index.ts

- UI 组件 barrel 导出默认组件
- 相关 headless 组件类型从 `@soybeanjs/headless/{component}` 子路径 re-export
- 不要从 `@soybeanjs/headless` 根路径 re-export 组件类型；headless 全局类型继续从 `@soybeanjs/headless/types` 导入
- 再导出 UI 层自身的 `types.ts`

## Step 5：注册到 UI 出口

- 更新 `packages/ui/src/index.ts`
- 运行 `pnpm sui ui` 更新 `packages/ui/src/constants/components.ts`（该文件由脚本生成，不要手动编辑）

## 禁止反模式

- `packages/ui/src/styles/{name}.ts` 缺少 `// @unocss-include`
- `slots` key 与 `{Name}UiSlot` 不一致
- `useOmitProps` 遗漏 `class`
- recipe 调用遗漏 `props.ui` 或 `{ root: props.class }`
- 在模板里写 `props.xxx`
- 组件名缺少 `S` 前缀
- 从 `@soybeanjs/headless` 根路径粗暴 re-export 所有类型
- 在 UI 层 `types.ts` 或 `index.ts` 中混用组件子路径类型与 headless 全局类型的导入来源
