# C73 `drawer` 检查优化报告

> **组件编号：** C73（`drawer`）
> **组件名称：** `SDrawer`（headless 基座复用 dialog 家族：`DialogRoot`/`DialogTrigger`/`DialogOverlay`/`DialogPopup`/`DialogHeader`/`DialogContent`/`DialogFooter`/`DialogTitle`/`DialogDescription`/`DialogClose`/`DialogCancel`/`DialogConfirm`/`DialogCompact`）
> **模式：** 多槽 + Compact（复用 `DialogCompact`；`drawerVariants` 扩展 `dialogVariants`，6 尺寸 × 4 方向）
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-04、D7-05、D7-19、D7-20

---

## 一、执行摘要

对 `drawer` 完成全维度审计。`SDrawer` 是构建在 headless `DialogCompact` 之上的薄样式包装组件：它转发全部 prop/插槽/事件，仅以 `drawerVariants`（`extend: [dialogVariants]`，`extendIgnore: ['popup']`）按 `size` + `side`（`top`/`bottom`/`left`/`right`，默认 `right`）定制 `popup` 类，并复用 `provideDialogUi` 上下文。因此抽屉与对话框行为完全一致（模态/焦点陷阱/Escape/外部交互关闭），仅表现不同。

**发现 Major ×1**（已修复）+ **Minor ×1**（已补 e2e）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                           |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 复用 `DialogCompact` 聚合，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`side` 方向类（含 RTL 镜像 `[&[dir=rtl]]`）正确；`useOmitProps` 含 `class`；`provideDialogUi` 复用 dialog 上下文（D1-16）                                                  |
| D2 行业对标 |  ✅  | 对标 AntD/Element Plus/Mantine/Naive UI `drawer`（`placement`/`width`/`closable`/`mask`）：SoybeanUI 复用 dialog 基座 + 4 方向 + `size` 体系 + `pure`；行为与 dialog 一致，仅表现不同（D2-11）                                                                 |
| D3 API 设计 |  ✅  | `DrawerProps extends DialogProps` 仅新增 `side?: Side`（4 值）；事件/插槽完全继承 `Dialog`；`v-model:open` 受控/非受控统一；API 最小且语义清晰                                                                                                                 |
| D4 类型系统 |  ✅  | `DrawerProps`/`DrawerEmits`/`DrawerSlots` 导出完整；`side` 类型为 headless `Side`；复用 `DialogUi`（11 槽）；JSDoc 覆盖 `side`；`pnpm typecheck` 无新增错误（见验证）                                                                                          |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`drawerVariants` `extend`/`extendIgnore` 用法规范（仅覆盖 `popup`，其余槽继承 dialog）；转发键与 `DialogCompactProps` 严格一致                                                                                                              |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（7 能力 × 6 库）+ 4 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐  |
|   D7 其他   |  ✅  | 单测 5 项全通过；**Minor 补 e2e**（D7-19/D7-20）：新增 [drawer.e2e.spec.ts](../../packages/ui/test/browser/specs/components/drawer.e2e.spec.ts)（真实 portal 开关/Escape 关闭 + 焦点还原/axe 0 违规含颜色对比）3 项全通过；SSR 无顶层 `window`/`document` 访问 |

---

## 二、行业对标矩阵

> `drawer` 是 **复用 dialog 基座的薄样式包装** 模式。shadcn-ui/vaul 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为带 `placement`/`width`/`closable`/`mask` prop 的单一样式化抽屉。

| 能力                    | SoybeanUI | shadcn/ui | Ant Design Drawer | Element Plus Drawer | Mantine Drawer | Naive UI Drawer |
| :---------------------- | :-------: | :-------: | :---------------: | :-----------------: | :------------: | :-------------: |
| 复用 dialog 基座        |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| Headless/样式分离       |    ✅     |    ✅     |         —         |          —          |       —        |        —        |
| 4 个方向（side）        |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| 模态（aria-modal+陷阱） |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| 关闭时焦点还原          |    ✅     |    ✅     |        ✅         |         ✅          |       ✅       |       ✅        |
| 尺寸（6）               |    ✅     |     —     |         —         |          —          |       —        |        —        |
| 纯净（无头/底部）       |    ✅     |     —     |         —         |          —          |       —        |        —        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [drawer.md（en）](../../apps/docs/src/docs/en/components/drawer.md) 与 [drawer.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/drawer.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dialog/alert/toast 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：8 条能力（复用 dialog 基座/4 方向/模态/可关闭/动画/尺寸/取消确认/无障碍）。
- `Component family`：`SDrawer` 职责 + 指向 dialog 家族的复用说明。
- `Notes`：架构对标表（7 能力 × 6 库）+ 4 条 Cautions（继承 dialog 契约/`side` 仅表现层/`role` 仍为 dialog/RTL 镜像/命令式 API 复用）+ `Roadmap`（`draggable`/`fullscreen`）。
- `FAQ`：4 组问答（方向/受控状态/取消确认/自定义）。

### 3.2 Minor — D7-19/D7-20 缺浏览器 e2e spec

**现象：** `check.md` 明确记录「`dialog` 已有 spec，`drawer` 须补」——drawer 无浏览器 e2e，真实 portal 开关/Escape 关闭/焦点还原/颜色对比未覆盖。

**修复：** 新增 [drawer.e2e.spec.ts](../../packages/ui/test/browser/specs/components/drawer.e2e.spec.ts)，对齐 dialog e2e 结构，3 项全部通过：

- 触发器点击后弹层内容真实进入 portal 且可见。
- Escape 关闭 + 焦点还原到触发器。
- axe 0 违规（`withTheme: true` 开启 color-contrast，`region` 规则禁用因裸测试页无 landmark）。

### 3.3 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`SDrawer` 无 `v-for`、无结构编排，全部委托 `DialogCompact`。
- **D1-16 键盘**：Escape 经 `useDismissableLayer` 关闭；关闭/取消/确认为 `Button` 原生 `<button>`。
- **D7-04 SSR**：drawer 无顶层 `window`/`document` 访问（样式层纯类注入）。
- **D2-11**：`side` 对应 AntD `placement`，RTL 逻辑方向镜像优于多数单包库。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/drawer.spec.ts`：**5 项全部通过**（标题/内容/触发器/自定义 class/触发 `update:open`/无障碍 `role="dialog"`）。
- `pnpm --filter @soybeanjs/ui exec vitest run --config vitest.browser.config.ts test/browser/specs/components/drawer.e2e.spec.ts`：**3 项全部通过**（真实 portal/Escape + 焦点还原/axe 颜色对比 0 违规）。
- 文档/测试重构未改源码类型，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档与测试，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项            | 对标依据                        | 说明                                                       |
| :---------------- | :------------------------------ | :--------------------------------------------------------- |
| `draggable` 变体  | AntD `draggable`                | 抽屉头部拖拽；`docs/check.md` C72/C73 P0 roadmap，排期评估 |
| `fullscreen` 变体 | AntD `fullscreen`、Element Plus | 全屏抽屉；`docs/check.md` C72/C73 P0 roadmap，排期评估     |
