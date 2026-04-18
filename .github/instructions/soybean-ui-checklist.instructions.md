---
applyTo: '**/*.{ts,tsx,js,jsx,vue,md}'
---

# SoybeanUI 组件任务收尾清单

仅在组件开发任务收尾阶段应用本文件。

如果当前还在判模式、找参照、拆分层或补主体实现，这份文件只可作为预览清单，不作为当前阶段的执行顺序。

收尾时按“实现顺序的逆序”检查：先看验证结果，再看 tests/docs/playground，再看出口面，再回看 headless 与 UI 分层是否干净。

如果某一层还没通过，就不要继续往后勾选下一层。

开始收尾前，组件模式、开发场景、完整交付范围与实现顺序应已按 `soybean-ui-component-overview.instructions.md` 完成判定；本文件不重复承担这些前置决策。

## 验证

- 已运行 `pnpm typecheck`
- 已运行 `pnpm lint`
- 已运行相关 `pnpm test` 或定向组件测试
- 若有未运行项，已明确记录原因
- 场景 B 与场景 C 中，已额外验证结构调整没有带来行为回退

## Playground / Docs / Tests

- playground 示例可以说明主要公开能力
- 中英文文档结构同步
- `docs/src/constants/menus.ts` 已更新
- 组件测试覆盖 rendering、state、disabled、accessibility 核心场景
- 场景 B 中，即使外部代码没有自带 docs / tests，也已按仓库规范补齐
- 场景 C 中，只要本轮改动影响公开行为或结构语义，就已同步更新 docs / tests

## 集成出口

- `headless/src/index.ts` 与 `src/index.ts` 已更新
- 两侧 `constants/components.ts` 已按字母顺序更新
- `headless/src/namespaced/index.ts` 已同步更新

- 新建组件时，已检查并补齐完整交付面的其余入口
- 为现有组件加功能或修 bug 时，已同步更新所有受影响层和出口面

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

## 结果说明

- 若本轮新增了新的 composable、shared helper 或类型，而不是复用仓库现有实现或 `@vueuse/core`，已在结果总结中明确说明原因

若有未完成项，必须在交付说明中明确列出。
