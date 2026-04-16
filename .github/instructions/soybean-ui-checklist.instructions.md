---
applyTo: '**/*.{ts,tsx,js,jsx,vue,md}'
---

# SoybeanUI 组件任务收尾清单

仅在组件开发任务收尾阶段应用本文件。

收尾时按“实现顺序的逆序”检查：先看验证结果，再看 tests/docs/playground，再看出口面，再回看 headless 与 UI 分层是否干净。

如果某一层还没通过，就不要继续往后勾选下一层。

## 场景判断

- 已明确本轮属于场景 A：从 0 到 1 新建组件，或场景 B：迁入外部代码后规范化，或场景 C：现有组件规范对齐
- 场景 B 中，已先梳理需要保留的行为、状态模型、公开 API、a11y 语义
- 场景 C 中，已先整理当前组件与 instructions 的差距清单

## 任务闭环

- 开始实现前，已查看至少一个同模式的 headless 组件和一个 UI 组件
- 已明确当前任务属于多 slot 基础组件、Compact 聚合组件、单类名组件之一
- 开始写新函数、新类型前，已检查 `headless/src/composables/`、`headless/src/shared/`、`headless/src/types/` 是否已有可复用实现
- 若仓库内没有合适 composable，已先检查 `@vueuse/core`
- 新建组件时，已检查 barrel、constants、namespaced、playground、docs、tests
- 为现有组件加功能或修 bug 时，已同步更新所有受影响层和出口面
- 已运行与改动匹配的验证，或明确记录无法运行的原因

## Headless

- `types.ts`、`context.ts`、SFC 和 `index.ts` 符合分层规范
- Context 中的值保持响应式
- 无 UI 样式、无 `@soybeanjs/ui` 导入
- 稳定聚合结构已正确下沉为 `{Name}Compact`
- 分片根元素带有正确的 `data-slot`
- 场景 B 中，外部代码中的逻辑和语义已正确拆入 headless，而不是残留在 UI wrapper
- 场景 C 中，已优先修复 headless 的结构与语义边界问题

## UI

- `variants.ts` 第一行是 `// @unocss-include`
- `slots` key 与 headless `UiSlot` 一致
- `mergeSlotVariants` 正确合并 `props.class`
- `useOmitProps` / `usePickProps` 使用有明确理由
- 无 ARIA 逻辑、无业务语义泄漏到 UI 层
- 场景 B 中，外部样式实现已被重构为 SoybeanUI 的 UI wrapper 结构
- 场景 C 中，已补齐 UI 层的命名、导出、class 合并和 props 转发规范

## A11y 与 RTL

- ARIA、role、键盘交互都在 headless
- 状态对外正确反映到 `aria-*` 与 `data-state`
- 方向性组件已补齐 `dir` 透传与 RTL 样式翻转

## 集成出口

- `headless/src/index.ts` 与 `src/index.ts` 已更新
- 两侧 `constants/components.ts` 已按字母顺序更新
- `headless/src/namespaced/index.ts` 已同步更新

## Playground / Docs / Tests

- playground 示例可以说明主要公开能力
- 中英文文档结构同步
- `docs/src/constants/menus.ts` 已更新
- 组件测试覆盖 rendering、state、disabled、accessibility 核心场景
- 场景 B 中，即使外部代码没有自带 docs / tests，也已按仓库规范补齐
- 场景 C 中，只要本轮改动影响公开行为或结构语义，就已同步更新 docs / tests

## 验证

- `pnpm typecheck`
- `pnpm lint`
- 相关 `pnpm test`
- 场景 B 与场景 C 中，已额外验证结构调整没有带来行为回退

## 结果说明

- 若本轮新增了新的 composable、shared helper 或类型，而不是复用仓库现有实现或 `@vueuse/core`，已在结果总结中明确说明原因

若有未完成项，必须在交付说明中明确列出。
