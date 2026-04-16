# Copilot Instructions

这是当前仓库里 Copilot 的顶层大脑文件。

## 读取优先级

1. 先遵循本文件
2. 再遵循 `.github/instructions/` 下与当前任务和文件匹配的 instruction 文件

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

## 新组件 0 到 1 执行顺序

1. 先在 `soybean-ui-component-overview.instructions.md` 中判断组件模式与交付面
2. 先查看一个同模式的 headless 组件和一个 UI 组件
3. 先实现 headless：`types.ts`、`context.ts`、基础分片组件，必要时新增 `{Name}Compact`
4. 再实现 UI：`variants.ts`、`types.ts`、wrapper `.vue`、`index.ts`
5. 再接入出口面：barrel、constants、namespaced
6. 再补 playground、docs、tests
7. 最后运行验证并按 checklist 收尾

## 其它组件开发场景

### 场景 1：从 0 到 1 新建组件

- 直接按上面的 0 到 1 顺序推进
- 默认要求完整交付面

### 场景 2：迁入其它仓库现有代码后规范化

- 先确认需要保留的行为、状态模型、公开 API 与交互语义
- 再把代码按 SoybeanUI 的 headless / UI 分层拆开，不要直接整块照搬
- 先保证逻辑完整和行为不回退，再把目录结构、类型、导出、样式注入、a11y、docs、tests 对齐到仓库规范

### 场景 3：对现有组件做规范对齐

- 先做差距检查，再开始改代码
- 优先修复分层边界、导出面、a11y、RTL、测试和文档缺口
- 不要为了追求形式统一而改坏已有稳定行为

## Source Of Truth

- 本仓库的 AI 组件开发规范只维护在本文件与 `.github/instructions/` 中
- 组件开发过程、分层边界、交付面与验证要求都以 instructions 为准
