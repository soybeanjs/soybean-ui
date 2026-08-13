# C87 `color-swatch` 检查优化报告

> **组件编号：** C87（`color-swatch`）
> **组件名称：** `SColorSwatch`（headless 基座：`ColorSwatchRoot`/`ColorSwatchChecker`/`ColorSwatchFill`/`ColorSwatchCompact`）
> **模式：** 多槽 + Compact（root/checker/fill 3 个 UI 槽）
> **优先级：** P3
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D3-01

---

## 一、执行摘要

对 `color-swatch` 完成全维度审计。`ColorSwatchRoot` 渲染 `role="img"`（`color`/`label`，空色 `data-no-color`）；`ColorSwatchCompact` 组合 checker（透明棋盘）+ fill（纯色填充）默认装配；默认插槽暴露 `{ color, alpha }`；UI 层 `SColorSwatch` `colorSwatchVariants` 注入（6 尺寸 × 2 形状）。

**发现 Major ×1**（已修复）——D6 文档结构不完整（且缺 API 节）：

|    维度     | 状态 |                                                                                                                                    说明                                                                                                                                     |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                      多槽 + Compact 模式正确：`ColorSwatchCompact` 持有聚合编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`role="img"` + `aria-label`、`data-no-color`、透明棋盘、OKLCH/alpha 支持完整                                      |
| D2 行业对标 |  ✅  |                                          对标 radix-ui-color/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（普通着色 `<span>`）：SoybeanUI 提供无障碍 `role="img"` 预览 + 透明棋盘 + 形状/尺寸控制 + 插槽作用域                                           |
| D3 API 设计 |  ✅  |                                                                   `color`/`label`/`shape`/`size` 命名与主流库一致；默认插槽暴露 `{ color, alpha }` 语义清晰；`checkerProps`/`fillProps` 通道完整（D3-01）                                                                   |
| D4 类型系统 |  ✅  |                                                  `ColorSwatchProps`/`Slots`/`Ui`（3 槽）导出完整；`ColorSwatchSlotProps`（`color`/`alpha`）精确；`ColorSwatchShape` 联合（square/circle）导出；JSDoc 覆盖 `color`/`label`                                                   |
| D5 代码规范 |  ✅  |                                                               `eslint` 0 errors；`useOmitProps` 含 `class`；`ColorSwatchCompact` 委托键与 `ColorSwatchCompactProps` 严格一致；`colorSwatchVariants` 简洁规范                                                                |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 3 节（缺 API）重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/**API**/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 3 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                                                            单测 3 项全通过（`role="img"` + `aria-label`/空色 `data-no-color`/a11y 0 违规）；SSR 无顶层 `window`/`document` 访问                                                                             |

---

## 二、行业对标矩阵

> `color-swatch` 是 **无障碍只读颜色预览（headless 聚合）** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 用普通着色 `<span>` 渲染色块。

| 能力               | SoybeanUI | shadcn/ui | Ant Design | Element Plus | Mantine | Naive UI |
| :----------------- | :-------: | :-------: | :--------: | :----------: | :-----: | :------: |
| Headless/样式分离  |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 透明棋盘           |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| OKLCH / alpha 支持 |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 无障碍 role/img    |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 形状（方/圆）      |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 尺寸（6）          |    ✅     |     —     |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ，且缺 API 节）

**现象：** [color-swatch.md（en）](../../apps/docs/src/docs/en/components/color-swatch.md) 与 [color-swatch.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/color-swatch.md) 仅有 Overview/Usage/Demos 三节（**缺 API 节**），缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（color-area/color-field/alert 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：7 条能力（headless 分离/透明棋盘/OKLCH + 透明/无障碍标签/形状/尺寸/插槽作用域）。
- `Component family`：`SColorSwatch` + 4 个 headless 部件职责说明。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（`label`/`color`/插槽作用域/`shape`/只读）+ `Roadmap`。
- `FAQ`：3 组问答（显示/圆形/访问解析颜色）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`ColorSwatchCompact` 持有 checker + fill 默认装配，UI 层 `SColorSwatch` 无结构编排。
- **D7-04 SSR**：color-swatch 无顶层 `window`/`document` 访问。
- **D7-05**：a11y 单测 0 违规（`role="img"` + `aria-label`）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/color-swatch.spec.ts`：**3 项全部通过**（`role="img"` + `aria-label`/空色 `data-no-color`/a11y 0 违规）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                              |
| :-------------- | :---------- | :-------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 当前 color-swatch 重点项未含 e2e；真实颜色渲染/透明度棋盘建议浏览器覆盖，排期评估 |
