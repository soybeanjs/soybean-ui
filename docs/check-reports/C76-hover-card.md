# C76 `hover-card` 检查优化报告

> **组件编号：** C76（`hover-card`）
> **组件名称：** `SHoverCard`（headless 基座：`HoverCardRoot`/`HoverCardTrigger`/`HoverCardPositioner`(+Impl)/`HoverCardPopup`/`HoverCardArrow`/`HoverCardCompact`，构建于共享 `Popper`）
> **模式：** 多槽 + Compact（positioner/popup/arrow 等 UI 槽）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `hover-card` 完成全维度审计。`HoverCardRoot` 经 `useControllableState` 维护 `open`（默认 `false`）并提供 `openDelay`（700ms）/`closeDelay`（300ms）与 popper root；`HoverCardPositionerImpl` 组合 `useDismissableLayer`（Escape/外部指针/焦点关闭）；`HoverCardCompact` 聚合 trigger/portal/positioner/popup/arrow 默认装配；UI 层 `SHoverCard` `hoverCardVariants` 注入（6 尺寸 + 箭头）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                            多槽 + Compact 模式正确：`HoverCardCompact` 持有聚合编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；悬停 + 键盘焦点触发、`openDelay`/`closeDelay` 计时、Escape/外部交互关闭完整（D1-16）                            |
| D2 行业对标 |  ✅  |                           对标 radix/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（通用 popover 做悬停预览）：SoybeanUI 提供专用 hover-card + `openDelay`/`closeDelay` + 逐槽 `*Props` + `size` 体系 + 箭头开关                            |
| D3 API 设计 |  ✅  |                                 `open`/`v-model:open`/`defaultOpen`/`openDelay`/`closeDelay`/`placement`/`showArrow`/`size` 命名与主流库一致；受控/非受控统一；逐槽 `*Props`（trigger/portal/positioner/popup/arrow）通道完整                                 |
| D4 类型系统 |  ✅  |                               `HoverCardProps`/`HoverCardEmits`/`HoverCardSlots`/`HoverCardUi` 导出完整；`HoverCardRootProps` 精确（`openDelay`/`closeDelay` JSDoc 明确）；`HoverCardTriggerProps = PopperAnchorProps` 复用精确                               |
| D5 代码规范 |  ✅  |                                                           `eslint` 0 errors；`useOmitProps` 含 `class`；`HoverCardCompact` 委托键与 `HoverCardCompactProps` 严格一致；`hoverCardVariants` 简洁规范                                                            |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 4 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                            单测 7 项全通过（触发器渲染/open 渲染/自定义 class/聚焦 `update:open`/失焦 `update:open=false`/a11y 关闭 0 违规/a11y 打开 0 违规）；SSR 无顶层 `window`/`document` 访问                                            |

---

## 二、行业对标矩阵

> `hover-card` 是 **基于 popper 的 headless 聚合** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 用通用 popover 实现悬停预览。

| 能力              | SoybeanUI | shadcn/ui | Ant Design | Element Plus | Mantine | Naive UI |
| :---------------- | :-------: | :-------: | :--------: | :----------: | :-----: | :------: |
| Headless/样式分离 |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 打开/关闭延迟     |    ✅     |    ✅     |     —      |      —       |   ✅    |    —     |
| Popper 定位（12） |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |
| 箭头              |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 尺寸（6）         |    ✅     |     —     |     —      |      —       |    —    |    —     |
| 焦点触发          |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |

`—` = 不支持或采用不同交互模型（悬停预览并入通用 popover）。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [hover-card.md（en）](../../apps/docs/src/docs/en/components/hover-card.md) 与 [hover-card.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/hover-card.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dialog/alert/toast 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：7 条能力（headless 分离/打开关闭延迟/定位/箭头/焦点触发/尺寸/无障碍）。
- `Component family`：`SHoverCard` 及 6 个 headless 部件职责说明（含 popper 复用）。
- `Notes`：架构对标表（6 能力 × 6 库）+ 4 条 Cautions（延迟调节/portal 渲染/箭头配置/非模态不陷阱焦点）+ `Roadmap`。
- `FAQ`：4 组问答（延迟/定位/隐藏箭头/受控状态）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`HoverCardCompact` 持有 trigger/portal/positioner/popup/arrow 默认装配，UI 层 `SHoverCard` 无结构编排。
- **D1-16 键盘**：焦点进入触发 `open`，失焦/超时关闭；Escape 经 `useDismissableLayer` 关闭。
- **D7-04 SSR**：hover-card 无顶层 `window`/`document` 访问。
- **D7-05**：单测覆盖打开/关闭两个状态的 a11y，均为 0 违规（含 `aria-dialog-name`），优于 popconfirm 的环境限制场景。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/hover-card.spec.ts`：**7 项全部通过**（触发器渲染/open 渲染/自定义 class/聚焦 `update:open`/失焦 `update:open=false`/a11y 关闭 0 违规/a11y 打开 0 违规）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                                  |
| :-------------- | :---------- | :------------------------------------------------------------------------------------ |
| 浏览器 e2e spec | D7-19/D7-20 | 当前 hover-card 重点项未含 e2e；如需真实悬停/portal/焦点覆盖可仿 dialog/drawer 补 e2e |
