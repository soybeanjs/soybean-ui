# GitHub Copilot Instructions

这是当前仓库里 GitHub Copilot 的兼容入口文件。

assistant-neutral 的总入口是 `.github/assistant-rules.md`；本文件保留用于 GitHub Copilot 兼容和仓库既有入口习惯。

## 读取优先级

1. 先遵循 `.github/assistant-rules.md`
2. 再遵循本文件
3. 最后遵循 `.github/instructions/` 下与当前任务和文件匹配的 instruction 文件

## 仓库基线

- 先读取根目录 `AGENTS.md`
- 这是 SoybeanUI monorepo：`headless/` 负责逻辑、状态、a11y；`src/` 负责样式包装
- 数据流只能是 `headless -> src`，禁止反向依赖
- 组件开发默认要求覆盖完整交付面，而不是只改局部骨架
- 组件开发时，优先复用 `headless` 内已有的 `composables`、`shared`、`types`，不要先写新的工具函数、常量或类型
- 当仓库里没有合适的 composable 时，先检查 `@vueuse/core` 是否已有可用实现；只有两边都不满足时，才允许手动新增函数，并且要在结果总结中明确说明原因

## 通用任务

普通 TypeScript、JavaScript、Vue 编辑优先遵循这些 instruction 文件：

- `.github/instructions/import-order.instructions.md`
- `.github/instructions/typescript-functional-style.instructions.md`
- `.github/instructions/vue-sfc.instructions.md`

如果任务涉及 commit message、changelog 或 release summary，再额外遵循：

- `.github/instructions/git-commit-convention.instructions.md`

## 组件任务

当任务属于以下任一情况时，视为 SoybeanUI 组件开发任务：

- 新建组件
- 将其它仓库的现有组件代码迁入并规范化
- 对现有已开发组件做规范补齐或结构对齐
- 为现有组件加功能
- 修复组件行为或 a11y
- 为组件补齐 variants、playground、docs、tests
- 调整 headless / UI 分层边界
- 将稳定结构的 UI 聚合逻辑下沉为 `{Name}Compact`

这类任务必须把下列 instruction 文件作为权威规范：

- `.github/instructions/soybean-ui-component-overview.instructions.md`
- `.github/instructions/soybean-ui-headless.instructions.md`
- `.github/instructions/soybean-ui-ui-layer.instructions.md`
- `.github/instructions/soybean-ui-accessibility-rtl.instructions.md`
- `.github/instructions/soybean-ui-playground.instructions.md`
- `.github/instructions/soybean-ui-docs.instructions.md`
- `.github/instructions/soybean-ui-testing.instructions.md`
- `.github/instructions/soybean-ui-checklist.instructions.md`

## 组件任务执行原则

- 组件模式判断、开发场景、阶段顺序、完整交付面统一以 `soybean-ui-component-overview.instructions.md` 为准
- headless、UI、a11y、playground、docs、testing 分别看对应细分 instructions，不在本文件重复展开
- `soybean-ui-checklist.instructions.md` 只在实现完成后的收尾阶段使用

## Source Of Truth

- assistant-neutral 的规范入口维护在 `.github/assistant-rules.md`
- GitHub Copilot 的兼容入口维护在本文件
- 本仓库的 AI 组件开发规范正文维护在 `.github/assistant-rules.md`、本文件与 `.github/instructions/` 中
- 组件开发过程、分层边界、交付面与验证要求都以 instructions 为准
