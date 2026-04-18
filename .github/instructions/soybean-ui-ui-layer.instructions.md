---
applyTo: 'src/components/**/*.{ts,vue}'
---

# SoybeanUI UI 层规范

## 职责边界

- UI 层只负责样式包装、variants 计算、UiContext 注入和 props/listeners 转发
- 禁止在 UI 层放 ARIA 属性、键盘逻辑或状态语义

## 与 A11y / RTL 规范的关系

- 本文件只约束 UI 层如何承接 headless 已有的状态、方向和值，不重新定义组件语义。
- `role`、`aria-*`、`tabindex`、键盘交互、焦点管理都以 `soybean-ui-accessibility-rtl.instructions.md` 为准，并继续留在 headless。
- UI 层应消费 headless 已暴露的 `data-state`、`dir`、slot 结构来做样式表达，而不是在 wrapper 中重新生成语义属性。

## 场景补充

### 场景 A：从 0 到 1

- 在 headless 稳定后，直接按 Step 1 到 Step 5 推进

### 场景 B：迁入其它仓库现有代码后规范化

- 外部组件的样式、slots 包装、props 透传方式要重构成 SoybeanUI 的 `variants.ts`、`types.ts`、wrapper `.vue`、`index.ts`
- 不要把外部仓库已有的 class 拼接、单文件样式逻辑、ARIA 逻辑一起搬进 UI 层

### 场景 C：对现有组件做规范对齐

- 先检查 `variants.ts`、`types.ts`、wrapper、导出与 `class` 合并是否符合当前规范
- 优先修复会影响公开能力和分层边界的问题，再处理写法一致性

## 新组件 UI 顺序

headless 稳定后，再按下面顺序做 UI：

1. `variants.ts`
2. `types.ts`
3. wrapper `.vue`
4. `index.ts`
5. 接入 `src/index.ts` 与 `src/constants/components.ts`

## Step 1：variants.ts

- 第一行必须是 `// @unocss-include`
- `slots` key 必须与 headless `{Name}UiSlot` 完全一致
- 组件有自定义 CSS 变量时，统一使用 `--soybean-` 前缀
- 方向相关样式遵循 `soybean-ui-accessibility-rtl.instructions.md`：优先逻辑属性与逻辑对齐类，只有无法表达时才用 `rtl:` 修饰符

## Step 2：types.ts

- Props 用 `interface`，不要用 `type` 作为主 props 声明
- UI 组件 props 标准包含 `class?: ClassValue`
- headless 类型通过组件子路径导入或 re-export，保持与邻近同模式组件一致
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

- 计算 `ui = computed(() => mergeSlotVariants(variants, props.ui, { root: props.class }))`
- 调用 `provide{Name}Ui(ui)`
- 如果 headless 已提供 `{Name}Compact`，直接渲染它，不再自己遍历 `items`、拼装默认 icon/title/content，也不再为 Compact 额外编排任何非样式逻辑

若 wrapper 仍然需要为了 Compact 写条件分支、默认内容决策、slot 选择、事件包装、结构切换或其它非样式逻辑，应回到 headless 完成下沉，而不是继续堆在 UI 层。

#### 单类名组件

- 直接 `cn(variants(...), props.class)`
- 不建立 UiContext

进入 Step 4 前，wrapper 的 props 转发、样式注入与组件模式实现必须已经稳定。

## Step 4：index.ts

- UI 组件 barrel 导出默认组件
- 相关 headless 类型从 `@soybeanjs/headless/{component}` 子路径 re-export
- 再导出 UI 层自身的 `types.ts`

## Step 5：注册到 UI 出口

- 更新 `src/index.ts`
- 更新 `src/constants/components.ts`

完成 UI 阶段后，再进入 playground、docs、tests。

场景 B 与场景 C 中，只要组件仍然对外公开，这一步就不能省略。

## 禁止反模式

- `variants.ts` 缺少 `// @unocss-include`
- `slots` key 与 `{Name}UiSlot` 不一致
- `useOmitProps` 遗漏 `class`
- `mergeSlotVariants` 第三个参数不传 `{ root: props.class }`
- 在模板里写 `props.xxx`
- 组件名缺少 `S` 前缀
- 从 `@soybeanjs/headless` 根路径粗暴 re-export 所有类型
