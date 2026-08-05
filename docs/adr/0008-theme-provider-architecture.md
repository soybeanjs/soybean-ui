# ADR-8: 主题引擎组件化（ThemeProvider / ThemeGenerator）

## 状态

Accepted（2026-08-05）

## 语境

主题渲染逻辑全部内嵌在 `SConfigProvider`（`useConfigProviderTheme`），使"全局配置"与"主题"耦合。需求将主题引擎组件化：独立 `ThemeProvider`、新增 `ThemeGenerator` 处理预设，并仅针对 preset 实现 SSR 兼容。

背景事实：

- `@soybeanjs/theme` 已提供 `generateCss(preset: ThemeColorPreset, options)`，可从**完整 token 集合**输出 CSS（`createTheme` 则是 base/primary → 派生 → CSS 的更高层封装）。
- 项目遵循 headless/UI 分层：headless 持有逻辑与状态，UI 持有样式与渲染。
- ADR-6/D9 已移除 feedback 作为可选预设维度（固定 classic 规则）。

## 决策

- **D1 tokens 为原始语义对象**：`ThemeProvider.tokens` 是用户编写的 `{ light, dark }` 语义 token 对象，直接经 `generateCss` 输出 CSS；base/primary/feedback 仅为 `ThemeGenerator` 填充 token 的输入，不进入 ThemeProvider 的 CSS 派生路径。
- **D2 tokens 形状**：`{ light: Partial<ThemeColors>; dark?: Partial<ThemeColors> }`（即现有 `CustomThemeColorPreset`），字段全可选、缺失回退默认。
- **D3 默认兜底**：ThemeProvider 用内置默认主题（zinc/indigo 派生全集）填充缺失键，零配置即用。
- **D4 完整主题**：`size` / `radius` / `menuColor` / `menuAccent` 一并移入 ThemeProvider，使其成为完整主题渲染组件。
- **D5 feedback 为分类组**：feedback 是 `ThemeTokenGroup` 之一，非可选预设维度；用户仅可按组覆盖。
- **D6 组成方式**：headless `useThemeGenerator`（计算完整 tokens）+ 薄 UI `ThemeGenerator`（渲染 ThemeProvider，并以 `#default="{ tokens }"` 暴露完整 tokens）。
- **D7 持久化最小化**：丢弃 config 级持久化（`persistTheme` / `themeConfig` / cookie 整体持久化不再下沉），仅保留 preset 的 SSR 解析（`presetProvider` + `isServer`）。

## 后果

**积极：**

- 关注点分离：ConfigProvider 只管非主题配置，主题归 ThemeProvider；
- 复用已验证的 `generateCss`，无第二套 CSS 派生实现；
- `useThemeGenerator` 纯逻辑可单测；ThemeGenerator 暴露完整 tokens 便于应用读取/持久化；
- SSR 复杂度收敛到 preset 单一场景。

**消极/代价：**

- 破坏性变更：ConfigProvider 移除 `theme` / `persistTheme` 等，需迁移期兼容（保留 `theme` 标记 deprecated 并转发）；
- config 级持久化能力不再内建，应用需自行持有主题状态（可利用 `@soybeanjs/theme` 的 `createThemeStore`）。

## 备选方案

1. **tokens 为 resolved preset 输出（Q1-A）**：ThemeProvider 消费 `createTheme` 的完整 preset。否决——tokens 未作为独立语义模型，无法表达用户原始自定义 token。
2. **持久化整体迁移到 ThemeProvider（Q7-B）**：保留 config 级持久化。否决——违背"仅针对 preset 实现 SSR 兼容"的范围约束，增加复杂度。
3. **feedback 重新作为可选维度（Q5-B）**：否决——与 ADR-6/D9 冲突，需引擎改动与快照更新。
4. **ThemeGenerator 仅渲染（Q6-A/B）**：要么隐藏 tokens 不可读出，要么要求用户手动接线。否决——采用 A/B 兼具的 headless/UI 组合（Q6-C）。
