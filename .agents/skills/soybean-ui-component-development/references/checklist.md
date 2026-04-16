# 开发校验清单

完成组件开发后逐项确认。

## 任务闭环

- [ ] 开始实现前，已查看至少一个同模式的 headless 组件和一个 UI 组件，未凭空发明目录结构或 API
- [ ] 已明确当前任务属于“多 slot 基础组件”/“Compact 聚合组件”/“单类名组件”之一，并按该模式实现
- [ ] 新建组件时，除非用户明确缩小范围，否则已补齐 barrel、constants、namespaced、playground、docs、tests
- [ ] 为现有组件新增功能或修 bug 时，已同步更新所有受影响层和注册文件，而不是只改单个目录
- [ ] 结束前已运行与改动匹配的验证，或明确记录无法运行的原因

## Headless 层 (`headless/src/components/{component}/`)

- [ ] `types.ts` 使用 `UiClass<{Name}UiSlot>` 定义 `{Name}Ui`（非 `Record<..., ClassValue>`）
- [ ] Props interface extends `/** @vue-ignore */ HTMLAttributes`（或具体 HTML 属性类型）
- [ ] Context 中所有值都是响应式（`ComputedRef` 或 `ShallowRef`），使用 `transformPropsToContext` 转换
- [ ] 消费必有值的 context 时直接解构所需状态；只有可选 context 才保留整体对象
- [ ] `context.ts` 导出 `provide{Name}Ui`（`use{Name}Ui` 仅内部用，不导出）
- [ ] 所有 SFC 通过 `use{Name}Ui('root')` 或 `use{Name}Ui()` 获取类名，绑定到 `:class`
- [ ] 数据驱动且结构稳定的多 slot 组件已在 headless 层新增 `{Name}Compact`，未把聚合逻辑留在 UI wrapper
- [ ] 每个 headless 分片组件的根元素都带有正确的 `data-slot="{slotName}"`
- [ ] 聚合组件中的默认图标通过 headless `IconRender` 渲染，并由 `ConfigProvider.iconRender` 驱动
- [ ] 受控/非受控 state 通过 `useControllableState` 处理
- [ ] 无任何 `<style>` 块、无 UnoCSS 类名、无内联样式
- [ ] 无 `@soybeanjs/ui` 导入（循环依赖）
- [ ] `index.ts` 导出了组件、`provide{Name}Ui`、types
- [ ] `headless/src/index.ts` 已添加 re-export

## 无障碍（a11y）

- [ ] 可交互元素绑定了正确的 `role`（参照 WAI-ARIA APG 对应模式）
- [ ] 状态通过 `aria-expanded` / `aria-checked` / `aria-selected` / `aria-disabled` 反映（而非仅靠 class）
- [ ] `aria-labelledby` / `aria-controls` 关联对通过 `useId()` 生成的唯一 ID 连接
- [ ] 纯装饰性子元素（图标等）添加了 `aria-hidden="true"`
- [ ] 状态变化通过 `data-state` 属性暴露（`open/closed`、`checked/unchecked` 等）
- [ ] 所有可交互元素均可通过键盘（Tab / Enter / Space / Arrow）操作
- [ ] 焦点顺序合理，复杂组件（对话框等）有焦点陷阱
- [ ] UI 层（`src/`）**未添加**任何 ARIA 属性或键盘逻辑

## UI 层 (`src/components/{component}/`)

- [ ] `variants.ts` **第一行**为 `// @unocss-include`
- [ ] `variants.ts` 的 `slots` key 与 headless `{Name}UiSlot` **完全一致**
- [ ] `.vue` 文件的 `script setup` 顺序符合 `imports → defineOptions → props/emits type → defineProps/defineEmits → hooks/composables → 业务逻辑 → init → provider → watch → lifecycle → defineExpose`
- [ ] `<template>` 中直接使用 prop 名，不写 `props.xxx`
- [ ] Props 用 `interface`（非 `type`），包含 `class?: ClassValue`
- [ ] `types.ts` 中 headless 类型导入方式与同模式现有组件保持一致，不在同一组件内随意混用路径；`index.ts` 中 re-export 使用 `@soybeanjs/headless/{component}`（子路径）
- [ ] UI 层新增的额外结构元素如果也需要 `ui` 样式，已扩展 `ExtraUiSlot` / `ExtendedUi`（参考 `src/components/accordion/types.ts`）
- [ ] props 转发策略是有意选择的：props 多或需要拆分子集时用 `useOmitProps` / `usePickProps`；基于 `Primitive` 且本层额外处理 prop <= 3 时优先直接显式绑定
- [ ] `useOmitProps(props, ['class', 'color', 'size', 'ui', ...])` 包含所有 UI 专属 prop（含 `class`）
- [ ] 多 slot：`mergeSlotVariants(variants, props.ui, { root: props.class })`
- [ ] 如果 headless 已提供 `{Name}Compact`，UI wrapper 直接渲染它，不再自己遍历 `items` 或拼装默认 icon/title/content
- [ ] 单类名：`cn(variants({...}), props.class)`
- [ ] `defineOptions({ name: 'S{Name}' })` ← S 前缀
- [ ] 无业务逻辑、无 ARIA 状态
- [ ] `index.ts` 从 `@soybeanjs/headless/{component}` 子路径 re-export headless 类型
- [ ] `src/index.ts` 已添加 re-export

## RTL 适配（含方向性布局的组件必填）

- [ ] `types.ts` 添加了 `dir?: Direction` prop
- [ ] `context.ts` 使用 `useDirection(params.dir)` 解析方向（继承 ConfigProvider 全局设置）
- [ ] `dir` 值存入 context 并向子组件传递
- [ ] 根元素绑定了 `:dir="dir"` 属性
- [ ] `variants.ts` 中水平方向相关类使用了 `rtl:` 修饰符或 UnoCSS 逻辑属性（`ms-*`/`me-*`/`ps-*`/`pe-*`）
- [ ] 方向性图标（箭头、chevron）在 RTL 模式下正确翻转（`rtl:rotate-180` 等）

## Barrel 文件与 Constants 注册

- [ ] `headless/src/index.ts` 已添加 re-export
- [ ] `src/index.ts` 已添加 re-export
- [ ] `headless/src/constants/components.ts` 已按字母顺序添加条目（camelCase key + 无 S 前缀的 PascalCase 组件名数组，存在聚合入口时包含 `{Name}Compact`）
- [ ] `src/constants/components.ts` 已按字母顺序添加条目（camelCase key + S 前缀组件名数组）
- [ ] `headless/src/namespaced/index.ts` 顶部 import 块已按字母顺序添加所有子组件（存在聚合入口时包含 `Compact`）
- [ ] `headless/src/namespaced/index.ts` 底部已按字母顺序添加 Namespace 对象导出（`as { ... }` 类型标注；存在聚合入口时包含 `Compact`）

## TypeScript

- [ ] 无 `as any` / `@ts-ignore` / `@ts-expect-error`
- [ ] 运行 `pnpm typecheck` 无新增报错
- [ ] 运行 `pnpm lint` 无新增报错

## Playground 示例 (`playground/examples/{component}/`)

- [ ] 目录已创建，文件名为 kebab-case
- [ ] `index.vue` 用 `<SCard title="{Name}" split :ui="{ content: 'flex-c gap-4' }">` 包裹所有子示例
- [ ] 每个特性对应独立 `.vue` 文件（`basic.vue`、`color.vue`、`size.vue` 等）
- [ ] 每个子示例有 `<h3 class="playground-title">` 标题
- [ ] 所有示例从 `@soybeanjs/ui` 导入（非源码路径）
- [ ] 在 playground 中运行 `pnpm dev` 能看到新组件 Tab 并正常渲染

## 单元测试 (`test/specs/components/{component}.spec.ts`)

- [ ] 文件已创建于 `test/specs/components/{component}.spec.ts`
- [ ] 所有 `mount()` 带 `attachTo: document.body`（ARIA 关联 + axe-core 依赖 DOM 上下文）
- [ ] 每个 `it()` 内结尾调用 `wrapper.unmount()`（防止 DOM 污染后续测试）
- [ ] 每个 `it()` 内独立挂载，未使用 `beforeEach` 共享 wrapper
- [ ] `rendering` describe：冒烟测试通过（slot 渲染、自定义 class、关键子元素）
- [ ] 状态 describe：`modelValue` 正确反映到 `aria-*` / `data-state` 属性
- [ ] 状态 describe：交互触发方式正确（Button/AccordionTrigger 用 `click`；TabsTrigger 用 `mousedown {button: 0}`）
- [ ] 状态 describe：`emit('update:modelValue')` 有对应测试
- [ ] 禁用 describe：断言方式与组件实现匹配（`aria-disabled` / `element.disabled` / `data-disabled` 三选一）
- [ ] 禁用 describe：禁用时点击不触发 emit
- [ ] `accessibility` describe：使用 `getA11yViolations` 检查无 violation
- [ ] `role="switch"` / icon-only button 等缺少可见文字的控件，a11y 测试时传入 `aria-label`
- [ ] 运行 `pnpm test` 新增测试全部通过

## 文档 (`docs/src/docs/`)

- [ ] 中英文文档各一份：`zh-CN/components/{component}.md` 和 `en/components/{component}.md`
- [ ] 文档包含：概述、用法代码块、演示（playground 代码块）、API 表格
- [ ] `playground` 代码块中的文件名与实际 `playground/examples/{component}/` 下的文件名一一对应
- [ ] `DataTable preset="props"` 包含所有公开 props（含 `class`、`ui`）
- [ ] `DataTable preset="emits"` 包含所有事件
- [ ] `DataTable preset="slots"` 包含所有插槽
- [ ] `TypeTable` 列出 `Ui` 类型的所有字段（与 `{Name}UiSlot` 对应）
- [ ] 中英文内容结构相同，仅语言不同
- [ ] `docs/src/constants/menus.ts` 对应分组的 `items` 数组中已按字母顺序插入组件 camelCase key
