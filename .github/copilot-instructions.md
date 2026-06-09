# GitHub Copilot Instructions

这是当前仓库里 GitHub Copilot 的兼容入口文件。

assistant-neutral 总入口是 `.github/assistant-rules.md`。本文件只负责 GitHub Copilot 的仓库内路由，不重复承载完整规范正文。

## 读取优先级

1. 先遵循 `.github/assistant-rules.md`
2. 再遵循本文件
3. 最后遵循 `.github/instructions/` 下与当前任务和文件匹配的 instruction 文件

## 仓库基线

- 先读取根目录 `AGENTS.md`
- 这是 SoybeanUI monorepo：`packages/headless/` 负责逻辑、状态、a11y；`packages/ui/` 负责样式包装
- 数据流只能是 `headless -> ui`，禁止反向依赖
- 组件开发默认要求覆盖完整交付面，而不是只改局部骨架
- 组件开发时，优先复用 `headless` 内已有的 `composables`、`shared`、`types`，不要先写新的工具函数、常量或类型
- 当仓库里没有合适的 composable 时，先检查 `@vueuse/core` 是否已有可用实现；只有两边都不满足时，才允许手动新增函数，并且要在结果总结中明确说明原因

## 任务路由

### 通用 TypeScript / JavaScript / Vue 编辑

优先读：

- `.github/instructions/coding-standards.instructions.md`

如果任务涉及 commit message、changelog 或 release summary，再额外遵循：

- `.github/instructions/git-commit-convention.instructions.md`

### SoybeanUI 组件任务

当任务属于以下任一情况时，视为 SoybeanUI 组件开发任务：

- 新建组件
- 将其它仓库的现有组件代码迁入并规范化
- 对现有已开发组件做规范补齐或结构对齐
- 为现有组件加功能
- 修复组件行为或 a11y
- 为组件补齐 variants、playground、docs、tests
- 调整 headless / UI 分层边界
- 将稳定结构的 UI 聚合逻辑下沉为 `{Name}Compact`

这类任务必须先读：

- `.github/instructions/soybean-ui-component-overview.instructions.md`

再按触达面补充读取：

- `.github/instructions/soybean-ui-headless.instructions.md`
- `.github/instructions/soybean-ui-ui-layer.instructions.md`
- `.github/instructions/soybean-ui-accessibility-rtl.instructions.md`
- `.github/instructions/soybean-ui-playground.instructions.md`
- `.github/instructions/soybean-ui-docs.instructions.md`
- `.github/instructions/soybean-ui-testing.instructions.md`

收尾阶段才读取：

- `.github/instructions/soybean-ui-checklist.instructions.md`

## 规范边界

- `.github/assistant-rules.md` 是总入口
- 本文件只做 Copilot 兼容路由与任务分发
- 普通代码任务的细分路由统一收敛在 `coding-standards.instructions.md`
- 组件任务的阶段路由统一收敛在 `soybean-ui-component-overview.instructions.md`
- 组件模式、开发场景、阶段顺序与完整交付面统一以 `soybean-ui-component-overview.instructions.md` 为准
- 具体组件开发规则以 `.github/instructions/` 下对应文件为准
