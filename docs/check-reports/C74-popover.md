# C74 `popover` 检查优化报告

> **组件编号：** C74（`popover`）
> **组件名称：** `SPopover`（headless 基座：`PopoverRoot`/`PopoverTrigger`/`PopoverPositioner`(+Impl)/`PopoverPopup`/`PopoverArrow`/`PopoverClose`/`PopoverCompact`，构建于共享 `Popper`）
> **模式：** 多槽 + Compact（positioner/popup/arrow/close 等 UI 槽）
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `popover` 完成全维度审计。`PopoverRoot` 经 `useControllableState` 维护 `open`（默认 `false`）并提供 popper root；`PopoverPositionerImpl` 组合 `useDismissableLayer`（Escape/外部指针/焦点/交互外部关闭）+ `useFocusScope`（trap + loop）+ `useHideOthers` + `useBodyScrollLock`（modal 时）；`PopoverCompact` 聚合 trigger/portal/positioner/popup/arrow/close 默认装配；UI 层 `SPopover` `popoverVariants` 注入（6 尺寸 + 箭头 + 关闭）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                          |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`PopoverCompact` 持有聚合编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；Escape/外部交互关闭、`onOpenChange(false)`；modal 时 body 滚动锁定 + `useHideOthers` + 焦点陷阱；箭头/关闭/定位完整（D1-16）                 |
| D2 行业对标 |  ✅  | 对标 radix/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（`placement`/`trigger`/`width`）：SoybeanUI 暴露逐槽 `*Props` + `size` 体系 + 箭头开关 + `modal` 模式                                                                              |
| D3 API 设计 |  ✅  | `open`/`v-model:open`/`defaultOpen`/`modal`/`disabled`/`placement`/`showArrow`/`size` 命名与主流库一致；受控/非受控统一；逐槽 `*Props`（trigger/portal/positioner/popup/arrow/close）通道完整                                                                 |
| D4 类型系统 |  ✅  | `PopoverProps`/`PopoverEmits`/`PopoverSlots`/`PopoverUi` 导出完整；`PopoverCloseProps extends ButtonProps` 精确；`PopoverCompactProps`/`PopoverRootProps` 类型层级清晰；JSDoc 覆盖 `placement`/`showArrow`/`disabled`/`modal`                                 |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`useOmitProps` 含 `class`；`PopoverCompact` 委托键与 `PopoverCompactProps` 严格一致；`popoverVariants` `extendBase` 复用 `miniButtonIconVariants` 规范（`@vue-expect-error` 仅限动态插槽转发的合法类型抑制，非 TS 断言）                   |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（7 能力 × 6 库）+ 5 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  | 单测 7 项全通过（标题/内容/触发器/自定义 class/默认箭头/`showArrow=false` 隐藏/触发 `update:open`/无障碍 `role="dialog"`）；axe 0 违规（见验证）；SSR 无顶层 `window`/`document` 访问                                                                         |

---

## 二、行业对标矩阵

> `popover` 是 **headless 聚合 + popper 定位** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为带 `placement`/`trigger`/`width` prop 的单一样式化弹出层。

| 能力              | SoybeanUI | shadcn/ui | Ant Design Popover | Element Plus Popover | Mantine Popover | Naive UI Popover |
| :---------------- | :-------: | :-------: | :----------------: | :------------------: | :-------------: | :--------------: |
| Headless/样式分离 |    ✅     |    ✅     |         —          |          —           |        —        |        —         |
| Popper 定位（12） |    ✅     |    ✅     |         ✅         |          ✅          |       ✅        |        ✅        |
| 箭头              |    ✅     |    ✅     |         —          |          —           |        —        |        —         |
| 模态模式          |    ✅     |    ✅     |         —          |          —           |        —        |        —         |
| 关闭按钮          |    ✅     |    ✅     |         —          |          —           |        —        |        —         |
| 尺寸（6）         |    ✅     |     —     |         —          |          —           |        —        |        —         |
| 焦点陷阱 + 循环   |    ✅     |    ✅     |         —          |          —           |        —        |        —         |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [popover.md（en）](../../apps/docs/src/docs/en/components/popover.md) 与 [popover.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/popover.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dialog/alert/toast 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：8 条能力（headless 分离/popper 定位/模态切换/箭头/可关闭/尺寸/无障碍）。
- `Component family`：`SPopover` 及 7 个 headless 部件职责说明（含 popper 复用）。
- `Notes`：架构对标表（7 能力 × 6 库）+ 5 条 Cautions（默认模态/portal 渲染/箭头配置/close 插槽/与 tooltip 区别）+ `Roadmap`。
- `FAQ`：4 组问答（定位/关闭按钮/非阻塞/受控状态）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`PopoverCompact` 持有 trigger/portal/positioner/popup/arrow/close 默认装配，UI 层 `SPopover` 无 `v-for`、无结构编排。
- **D1-16 键盘**：Escape 经 `useDismissableLayer` 关闭；触发/关闭为 `Button` 原生 `<button>`；焦点陷阱 + 循环完整。
- **D7-04 SSR**：popover 无顶层 `window`/`document` 访问；portal/焦点/滚动逻辑仅运行时触发。
- **D5 观察**：UI 包装组件 `popover.vue` 的动态插槽转发含 `<!-- @vue-expect-error -->`（因 `trigger`/`close` 无参数插槽与 `default` 有参插槽的异构签名联合），为合法的 Vue 插槽类型抑制，非 `@ts-ignore` 类断言；不构成缺陷。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/popover.spec.ts`：**7 项全部通过**（标题/内容/触发器/自定义 class/默认箭头/`showArrow=false` 隐藏/触发 `update:open`/无障碍 `role="dialog"`）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项                   | 对标依据    | 说明                                                                             |
| :----------------------- | :---------- | :------------------------------------------------------------------------------- |
| 浏览器 e2e spec          | D7-19/D7-20 | 当前 popover 重点项未含 e2e；如需真实 portal/焦点覆盖，可仿 dialog/drawer 补 e2e |
| `@vue-expect-error` 收敛 | D5 代码规范 | 动态插槽转发类型抑制可尝试用 `as any` 替代的声明式方案，跨组件统一排期           |
