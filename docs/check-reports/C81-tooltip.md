# C81 `tooltip` 检查优化报告

> **组件编号：** C81（`tooltip`）
> **组件名称：** `STooltip`（headless 基座：`TooltipRoot`/`TooltipTrigger`/`TooltipPositioner`(+Impl)/`TooltipPopup`/`TooltipArrow`/`TooltipCompact`，构建于共享 `Popper` + `ConfigProvider` tooltip 配置）
> **模式：** 多槽 + Compact（positioner/popup/arrow 等 UI 槽）
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-15、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `tooltip` 完成全维度审计。`TooltipRoot` 经 `useControllableState` 维护 `open`（默认 `false`）并合并全局 `ConfigProvider` tooltip 配置（`delayDuration`/`skipDelayDuration`/`disabled`/`ignoreNonKeyboardFocus`/`disableHoverableContent`/`disableClosingTrigger`），`provideTooltipOpenDelayedContext` 管理打开延迟；`TooltipPopup` 暴露视觉隐藏 `role="tooltip"` 文本节点供屏幕阅读器；`TooltipCompact` 聚合 trigger/portal/positioner/popup/arrow 默认装配；UI 层 `STooltip` `tooltipVariants` 注入（6 尺寸 + 箭头）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                   多槽 + Compact 模式正确：`TooltipCompact` 持有聚合编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；悬停/焦点触发、`delayDuration` 延迟、Escape/指针离开关闭、视觉隐藏 `role="tooltip"` 完整（D1-15/D1-16）                    |
| D2 行业对标 |  ✅  |                      对标 radix/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（`title`/`placement`）：SoybeanUI 提供逐槽 `*Props` + `size` 体系 + 箭头 + `ConfigProvider` 全局延迟默认 + 无障碍 `role="tooltip"` 节点                       |
| D3 API 设计 |  ✅  |           `open`/`v-model:open`/`defaultOpen`/`content`/`placement`/`showArrow`/`delayDuration`/`skipDelayDuration`/`ignoreNonKeyboardFocus`/`disableHoverableContent`/`disableClosingTrigger`/`disabled`/`size` 命名与主流库一致；受控/非受控统一            |
| D4 类型系统 |  ✅  |                                                     `TooltipProps`/`Emits`/`Slots`/`Ui` 导出完整；`TooltipRootProps` 精确（延迟/行为开关 JSDoc 明确）；`TooltipCompactProps`/`TooltipPopupProps` 层级清晰                                                     |
| D5 代码规范 |  ✅  |                                         `eslint` 0 errors；`useOmitProps` 含 `class`；`TooltipCompact` 委托键与 `TooltipCompactProps` 严格一致；`createDefaultTooltipConfig` 默认配置独立；`tooltipVariants` 简洁规范                                         |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                                  单测 7 项全通过（触发器/`open` 渲染/`content` 回退/自定义 class/聚焦 `update:open`/a11y 关闭 0 违规/a11y 打开 0 违规）；SSR 无顶层 `window`/`document` 访问                                                  |

---

## 二、行业对标矩阵

> `tooltip` 是 **基于 popper + ConfigProvider 默认的 headless 聚合** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为带 `title`/`placement` prop 的单一样式化提示。

| 能力              | SoybeanUI | shadcn/ui | Ant Design Tooltip | Element Plus Tooltip | Mantine Tooltip | Naive UI Tooltip |
| :---------------- | :-------: | :-------: | :----------------: | :------------------: | :-------------: | :--------------: |
| Headless/样式分离 |    ✅     |    ✅     |         —          |          —           |        —        |        —         |
| Popper 定位（12） |    ✅     |    ✅     |         ✅         |          ✅          |       ✅        |        ✅        |
| 延迟调节          |    ✅     |    ✅     |         —          |          ✅          |       ✅        |        —         |
| 箭头              |    ✅     |    ✅     |         —          |          —           |        —        |        —         |
| 尺寸（6）         |    ✅     |     —     |         —          |          —           |        —        |        —         |
| 焦点触发          |    ✅     |    ✅     |         ✅         |          ✅          |       ✅        |        ✅        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [tooltip.md（en）](../../apps/docs/src/docs/en/components/tooltip.md) 与 [tooltip.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/tooltip.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dialog/alert/toast 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：9 条能力（headless 分离/悬停焦点/延迟调节/定位/箭头/内容/行为开关/尺寸/无障碍）。
- `Component family`：`STooltip` 及 7 个 headless 部件职责说明（含 popper 复用 + ConfigProvider 合并）。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（延迟调节/`ignoreNonKeyboardFocus`/portal 渲染/箭头配置/非模态）+ `Roadmap`。
- `FAQ`：4 组问答（添加提示/定位/打开时机/隐藏箭头）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`TooltipCompact` 持有 trigger/portal/positioner/popup/arrow 默认装配，UI 层 `STooltip` 无结构编排。
- **D1-15/D1-16 无障碍 + 键盘**：`TooltipPopup` 暴露视觉隐藏 `role="tooltip"` 文本节点；触发为原生元素（asChild）；Escape/指针离开关闭。
- **D7-04 SSR**：tooltip 无顶层 `window`/`document` 访问。
- **D5 规范**：`createDefaultTooltipConfig` 将默认延迟/行为配置独立封装，`ConfigProvider` 合并单一来源。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/tooltip.spec.ts`：**7 项全部通过**（触发器/`open` 渲染/`content` 回退/自定义 class/聚焦 `update:open`/a11y 关闭 0 违规/a11y 打开 0 违规）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                               |
| :-------------- | :---------- | :--------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 当前 tooltip 重点项未含 e2e；真实悬停/焦点/portal/颜色对比建议浏览器覆盖，排期评估 |
