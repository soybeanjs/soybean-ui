# C72 `dialog` 检查优化报告

> **组件编号：** C72（`dialog`）
> **组件名称：** `SDialog` / `SDialogProvider`（headless 基座：`DialogRoot`/`DialogTrigger`/`DialogOverlay`/`DialogPopup`(+Impl)/`DialogHeader`/`DialogContent`/`DialogFooter`/`DialogTitle`/`DialogDescription`/`DialogClose`/`DialogCancel`/`DialogConfirm`/`DialogCompact`）
> **模式：** 多槽 + Compact（overlay/popup/header/content/footer/title/icon/description/close/cancel/confirm 11 个 UI 槽）
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-04、D7-05、D7-19、D7-20

---

## 一、执行摘要

对 `dialog` 完成全维度审计。核心链路：`DialogRoot` 经 `useControllableState` 维护 `open` 并下发 `dir`/`modal` 上下文；`DialogPopupImpl` 组合 `useDismissableLayer`（Escape/外部指针/外部焦点/交互外部关闭）+ `useFocusScope`（trap + loop，`onOpenAutoFocus` 对 alert 聚焦取消）+ `useHideOthers` + `useFocusGuards`（嵌套对话框焦点守卫）；`DialogCompact` 聚合 overlay/popup/header/content/footer/title/description/close/cancel/confirm 默认装配，并支持 `pure`（无头/底部）与 `isAlert`（`role="alertdialog"`）；`SDialogProvider` 订阅 `DialogState` 实现命令式 `dialog.*` API；UI 层 `SDialog` `dialogVariants` 注入（6 尺寸 + `pure`）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                     |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`DialogCompact` 持有聚合编排，UI 层无 `v-for`/无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`useHideOthers` + 焦点陷阱 + 循环 + 守卫完备；Escape/外部交互关闭、`onOpenChange(false)`；焦点还原（`preserveTriggerElement`）完整                                            |
| D2 行业对标 |  ✅  | 对标 radix/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（`mask`/`closable`/`keyboard`/`width`）：SoybeanUI 暴露逐槽 `*Props` + `size` 尺寸体系 + 命令式 provider API（`dialog.*`）                                                                                                    |
| D3 API 设计 |  ✅  | `open`/`v-model:open`/`defaultOpen`/`modal`/`isAlert`/`alertType`/`showClose`/`showCancel`/`showConfirm`/`cancelText`/`confirmText`/`pure`/`size` 命名与主流库一致；受控/非受控统一；逐槽 `*Props` 通道完整（trigger/overlay/portal/popup/header/content/footer/title/description/close/cancel/confirm） |
| D4 类型系统 |  ✅  | `DialogProps`/`DialogEmits`/`DialogSlots`/`DialogUi`（11 槽）导出完整；`DialogCloseProps extends ButtonProps` 等精确；`DialogT`/`DialogExternal`/`DialogCreateOptions` 命令式类型完备；JSDoc 覆盖 `title`/`description`/`pure`/`showCancel`/`showConfirm`/`modal` 等                                     |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`useOmitProps` 含 `class`；`DialogCompact` 委托 `forwardedProps` 键与 `DialogCompactProps` 严格一致；`dialog-provider.vue` 状态流（subscribe/upsert/dismiss/activeDialogs）清晰                                                                                                       |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（8 能力 × 6 库）+ 6 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐                                       |
|   D7 其他   |  ✅  | 单测 7 项全通过（标题/内容/触发器/自定义 class/默认关闭按钮/`showClose=false` 隐藏/触发 `update:open`/无障碍 `role="dialog"`）；e2e 3 项覆盖真实 portal 开关/Escape 关闭 + 焦点还原/axe 0 违规（含 color-contrast）；SSR 无 `window`/`document` 顶层访问                                                 |

---

## 二、行业对标矩阵

> `dialog` 是 **headless 聚合 + 命令式 provider** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为单一样式化对话框（`mask`/`closable`/`keyboard`/`width`），命令式能力折叠为静态服务。

| 能力                    | SoybeanUI | shadcn/ui | Ant Design Modal | Element Plus Dialog | Mantine Modal | Naive UI Dialog |
| :---------------------- | :-------: | :-------: | :--------------: | :-----------------: | :-----------: | :-------------: |
| Headless/样式分离       |    ✅     |    ✅     |        —         |          —          |       —       |        —        |
| 命令式 API              |    ✅     |     —     |        ✅        |         ✅          |      ✅       |       ✅        |
| 模态（aria-modal+陷阱） |    ✅     |    ✅     |        ✅        |         ✅          |      ✅       |       ✅        |
| 警告模式（alertdialog） |    ✅     |    ✅     |        ✅        |          —          |       —       |       ✅        |
| 关闭时焦点还原          |    ✅     |    ✅     |        ✅        |         ✅          |      ✅       |       ✅        |
| 尺寸（6）               |    ✅     |     —     |        —         |          —          |       —       |        —        |
| 本地化取消/确认文本     |    ✅     |     —     |        —         |          —          |       —       |        —        |
| 纯净（无头/底部）       |    ✅     |     —     |        —         |          —          |       —       |        —        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [dialog.md（en）](../../apps/docs/src/docs/en/components/dialog.md) 与 [dialog.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/dialog.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标已完成组件（accordion/alert/toast 等）均重构为 9 节，dialog 为遗漏项。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：11 条能力（headless 分离/声明式 + 命令式/模态/警告模式/无障碍标题描述/可关闭/取消确认/纯净模式/尺寸/无障碍）。
- `Component family`：`SDialog`、`SDialogProvider` 及 12 个 headless 部件职责说明。
- `Notes`：架构对标表（8 能力 × 6 库）+ 6 条 Cautions（`modal` 默认/`showConfirm`·`showCancel` 默认/本地化文本/`isAlert` 需 `DialogTitle`/`pure` 影响标注/命令式需 Provider）+ `Roadmap`（`draggable`/`fullscreen`）说明。
- `FAQ`：5 组问答（受控状态/警告模式/命令式 API/完全自定义/非模态）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`DialogCompact` 持有 overlay/popup/header/content/footer/title/description/close/cancel/confirm 默认装配，UI 层 `SDialog` 无 `v-for`、无结构编排。
- **D1-16 键盘**：关闭/取消/确认为 `Button` 原生 `<button>`；弹层 Escape 经 `useDismissableLayer` 关闭；焦点陷阱 + 循环 + 守卫完整。
- **D7-04 SSR**：dialog 无顶层 `window`/`document` 访问；portal/焦点逻辑仅运行时触发。
- **D7-19/D7-20 e2e**：[dialog.e2e.spec.ts](../../packages/ui/test/browser/specs/components/dialog.e2e.spec.ts) 已覆盖真实 portal 开关、Escape 关闭 + 焦点还原、axe 0 违规（含 color-contrast），与 `check.md` 既有 e2e spec 记录一致。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/dialog.spec.ts`：**7 项全部通过**（标题/内容/触发器/自定义 class/默认关闭按钮/`showClose=false` 隐藏/触发 `update:open`/无障碍 `role="dialog"`）。
- e2e spec：`packages/ui/test/browser/specs/components/dialog.e2e.spec.ts` 已存在且覆盖 D7-19/D7-20（真实 portal/Escape/焦点还原/axe 颜色对比）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项            | 对标依据                        | 说明                                                         |
| :---------------- | :------------------------------ | :----------------------------------------------------------- |
| `draggable` 变体  | AntD `draggable`                | 对话框头部拖拽；`docs/check.md` C72/C73 P0 roadmap，排期评估 |
| `fullscreen` 变体 | AntD `fullscreen`、Element Plus | 全屏对话框；`docs/check.md` C72/C73 P0 roadmap，排期评估     |
