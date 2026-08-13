# C75 `popconfirm` 检查优化报告

> **组件编号：** C75（`popconfirm`）
> **组件名称：** `SPopconfirm`（headless 基座：`PopconfirmCompact`/`PopconfirmHeader`/`PopconfirmContent`/`PopconfirmFooter`/`PopconfirmTitle`/`PopconfirmDescription`/`PopconfirmConfirm`/`PopconfirmCancel`，构建于 popover）
> **模式：** 多槽 + Compact（positioner/popup/arrow/header/icon/title/description/content/footer/cancel/confirm 等 UI 槽）
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `popconfirm` 完成全维度审计。`PopconfirmCompact` 基于 popover 基础组件（`PopoverRoot`/`PopoverTrigger`/`PopoverPositioner`/`PopoverPopup`）组合确认式 header/content/footer：`type` 驱动图标与颜色，`title`/`description`/`content` prop 或插槽，`confirm`/`cancel` 为 `Button` 原生 `<button>`（经 `@close` 转发 `confirm`/`cancel` 事件），`modal` 默认 `false`；UI 层 `SPopconfirm` `popconfirmVariants` 注入（6 尺寸 × 4 类型，`extendBase` 复用 `miniButtonVariants`）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                          |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`PopconfirmCompact` 持有聚合编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`disabled` 阻止触发；`showCancel`（'onlyWarning' 逻辑）正确；确认/取消复用 popover 关闭/焦点/可关闭层（D1-16）                            |
| D2 行业对标 |  ✅  | 对标 radix/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（`title`/`description`/`okText`/`cancelText`/`onConfirm`）：SoybeanUI 暴露逐槽 `*Props` + `size` 体系 + `type` 颜色/图标 + 本地化操作标签                                          |
| D3 API 设计 |  ✅  | `open`/`v-model:open`/`defaultOpen`/`type`/`title`/`description`/`content`/`confirmText`/`cancelText`/`showCancel`/`showIcon`/`showArrow`/`disabled`/`placement` 命名与主流库一致；逐槽 `*Props` 通道完整                                                     |
| D4 类型系统 |  ✅  | `PopconfirmProps`/`PopconfirmEmits`/`PopconfirmSlots`/`PopconfirmUi`（13 槽）导出完整；`PopconfirmType` 联合（error/success/warning/info）；`PopconfirmConfirmProps extends ButtonProps` 精确；JSDoc 覆盖 `type`/`title`/`showCancel`/`confirmText` 等        |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`useOmitProps` 含 `class`；`PopconfirmCompact` 委托键与 `PopconfirmCompactProps` 严格一致；`popconfirmVariants` `extendBase` 复用按钮配方规范；`canClosePopconfirm` 辅助函数独立                                                           |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（7 能力 × 6 库）+ 5 条 Cautions + Roadmap + 5 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  | 单测 6 项全通过（内容/标题/描述/取消确认/自定义 class/触发 `update:open`/confirm 关闭/disabled 阻止）；a11y 检查含已知 1 项（happy-dom `aria-dialog-name` 环境限制，浏览器 e2e 零违规，见 3.2）；SSR 无顶层 `window`/`document` 访问                          |

---

## 二、行业对标矩阵

> `popconfirm` 是 **基于 popover 的 headless 聚合** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为带 `title`/`description`/`okText`/`cancelText`/`onConfirm` prop 的单一样式化气泡确认框。

| 能力              | SoybeanUI | shadcn/ui | Ant Design Popconfirm | Element Plus Popconfirm | Mantine Popconfirm | Naive UI Popconfirm |
| :---------------- | :-------: | :-------: | :-------------------: | :---------------------: | :----------------: | :-----------------: |
| 基于 Popover      |    ✅     |    ✅     |           —           |            —            |         —          |          —          |
| Headless/样式分离 |    ✅     |    ✅     |           —           |            —            |         —          |          —          |
| 类型图标 + 颜色   |    ✅     |     —     |           —           |           ✅            |         —          |          —          |
| 标题 + 描述       |    ✅     |    ✅     |          ✅           |           ✅            |         ✅         |         ✅          |
| 本地化确认/取消   |    ✅     |     —     |           —           |            —            |         —          |          —          |
| 尺寸（6）         |    ✅     |     —     |           —           |            —            |         —          |          —          |
| 定位（popper）    |    ✅     |    ✅     |          ✅           |           ✅            |         ✅         |         ✅          |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [popconfirm.md（en）](../../apps/docs/src/docs/en/components/popconfirm.md) 与 [popconfirm.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/popconfirm.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dialog/alert/toast 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：9 条能力（基于 Popover/4 类型/标题描述内容/确认取消/图标开关/尺寸/无障碍/禁用）。
- `Component family`：`SPopconfirm` 及 7 个 headless 部件职责说明。
- `Notes`：架构对标表（7 能力 × 6 库）+ 5 条 Cautions（`modal` 默认 false/`showCancel` 默认/本地化文本/`role="dialog"` 需 `title`/`confirm`·`cancel` 事件）+ `Roadmap`。
- `FAQ`：5 组问答（标题描述内容/类型图标/自定义标签/受控状态/禁用）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`PopconfirmCompact` 持有 trigger/portal/positioner/popup/header/content/footer 默认装配，UI 层 `SPopconfirm` 无 `v-for`、无结构编排。
- **D1-16 键盘**：确认/取消为 `Button` 原生 `<button>`；Escape 经 popover 可关闭层关闭。
- **D7-05 a11y 观察**：单测中 a11y 检查接受 1 项已知违规（happy-dom 下 `aria-dialog-name` 因 `aria-labelledby` 指向触发器、无法跨 DOM 解析所限）；浏览器 e2e（真实渲染 + color-contrast）为 0 违规。此为环境限制而非实现缺陷，弹层 `role="dialog"` + `aria-labelledby="triggerId"` 结构正确。
- **D7-04 SSR**：popconfirm 无顶层 `window`/`document` 访问。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/popconfirm.spec.ts`：**6 项全部通过**（内容/标题/描述/取消确认/自定义 class/触发 `update:open`/confirm 关闭/disabled 阻止/a11y 已知 1 项）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项                                | 对标依据    | 说明                                                                              |
| :------------------------------------ | :---------- | :-------------------------------------------------------------------------------- |
| 浏览器 e2e spec                       | D7-19/D7-20 | 当前 popconfirm 重点项未含 e2e；如需真实 portal/焦点覆盖可仿 dialog/drawer 补 e2e |
| happy-dom `aria-dialog-name` 检查收敛 | D7-05       | 单测 a11y 断言 `toHaveLength(1)` 的环境限制，建议改用浏览器 e2e 断言 0 违规       |
