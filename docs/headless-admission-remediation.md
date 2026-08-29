# Headless 准入整改清单

> 定位：记录**已发布** headless 家族对 [Headless admission](../.agents/skills/soybean-ui-component-development/layers.md#headless-admission) 的违反项，以及处置方式。给执行整改的 Agent / 维护者看。
> 状态：🔵 进行中（清单已建，代码整改未开工）
> 基线：2026-08-28 · 规则落点：`layers.md` Headless admission R1–R8
>
> 任务级状态只在 [task-tracking.md](./task-tracking.md) 的 **CMP-6** 维护。本文只维护**组件级**处置状态。规范本身不在此重复，一律指向 skill。

## 0. 约定

| 处置       | 含义                                               |
| :--------- | :------------------------------------------------- |
| **冻结**   | 保留现有公开 API；禁止当作新家族模板；不再扩张槽位 |
| **补语义** | 家族可留，但必须补上缺失的 ARIA / 角色             |
| **待决策** | 合并、下沉 UI、或改 ExtraUiSlot；先出方案再改代码  |
| **已合规** | 对照 R1–R8 通过；列入本文是为了防止误伤            |

新组件（含 CMP-1 及以后的路线图项）**不进本清单**。它们在 Phase 0 直接走 admission；通不过就做 UI-only 或组合已有原语。

## 1. 总览

| 桶                          | 数量 | 默认处置                                        | 子任务  |
| :-------------------------- | :--: | :---------------------------------------------- | :------ |
| A 解剖壳（过不了删除测试）  |  3   | 冻结                                            | CMP-6.1 |
| B 可关闭薄壳（只有 `open`） |  3   | 冻结；Alert 另补语义                            | CMP-6.2 |
| C 装饰槽挂在已准入家族上    | 3 族 | 待决策：内部节点 / ExtraUiSlot                  | CMP-6.3 |
| D 平行家族                  | 1 对 | 已决策：NavMenu 准入，NavigationMenu deprecated | CMP-6.4 |
| 明确合规、不要当违规        |  —   | 已合规                                          | —       |

## 2. 桶 A — 解剖壳

删除测试：去掉这些模块后，UI 只失去 `div`/`ul`/`li` + `provideXUi` + Compact 拼装，没有键盘、焦点、ARIA widget 或定位逻辑会散落到包装层。

| ID     | 组件       | 证据                                                                                             | 违反   | 处置                                            | 状态 |
| :----- | :--------- | :----------------------------------------------------------------------------------------------- | :----- | :---------------------------------------------- | :--: |
| HAD-A1 | `empty`    | `empty-root.vue` 仅为带 `data-soybean-empty-root` 的 `div`；Compact 拼 icon/title/description    | R1、R4 | 冻结。禁止作为新家族模板。长期可选：整族下沉 UI |  ⬜  |
| HAD-A2 | `list`     | `list-root.vue` = `<ul>`，`list-item.vue` = `<li>`，无选择/键盘。真正的 APG listbox 是 `listbox` | R1、R4 | 冻结。新列表交互走 `listbox` / `tree`           |  ⬜  |
| HAD-A3 | `skeleton` | `skeleton.vue` 只默认 `aria-hidden`。脉冲动画属于视觉                                            | R3     | 冻结。长期可选：改为与 `spinner` 一样的 UI-only |  ⬜  |

## 3. 桶 B — 可关闭薄壳

有受控 `open`，但没有 APG widget 行为。R4 允许「可关闭」作为解剖壳的一条语义，因此**不强制删除家族**，但禁止再复制、禁止再加装饰槽。

| ID     | 组件    | 证据                                                                                                    | 违反                  | 处置                                                                 | 状态 |
| :----- | :------ | :------------------------------------------------------------------------------------------------------ | :-------------------- | :------------------------------------------------------------------- | :--: |
| HAD-B1 | `badge` | `badge-root.vue`：`useControllableState(open)` + 一个 `div`                                             | R4 临界；当模板则违反 | 冻结槽位。不要用它开新家族                                           |  ⬜  |
| HAD-B2 | `alert` | Root 同样只有 `open`；`alert-root.vue` **没有** `role="alert"` / `status`。Close 有 locale `aria-label` | R4 临界 + 缺 landmark | 冻结槽位；**补** `role="alert"` 或 `status`（按 live 区域语义）      |  ⬜  |
| HAD-B3 | `tag`   | `tag.vue` 仅 `open` + `close`；`defineOptions({ name: 'STag' })` 还把 UI 前缀写进了 headless            | R4 临界               | 冻结。可关闭标签的交互以 `tags-input` 为准；顺手修正 headless 组件名 |  ⬜  |

## 4. 桶 C — 已准入家族上的装饰槽

家族本身通过 R2（Dialog / Popconfirm / BottomSheet 都有焦点、dismiss、Portal）。违规的是把 **Header/Footer/Content 装饰槽**做成了公开原语（R5）。`DialogTitle` / `DialogDescription` 是语义槽，**不要动**。

| ID     | 家族           | 装饰槽（公开原语）                                          | 语义槽（保留）                             | 备注                                                       | 处置                                                                           | 状态 |
| :----- | :------------- | :---------------------------------------------------------- | :----------------------------------------- | :--------------------------------------------------------- | :----------------------------------------------------------------------------- | :--: |
| HAD-C1 | `dialog`       | `DialogFooter`、`DialogContent`（纯 `div` + `useDialogUi`） | Title、Description、Overlay、Popup、Close  | `DialogHeader` 在 `draggable` 时承担拖拽句柄，不完全是装饰 | 待决策：Footer/Content 改为 Compact 内部或 UI ExtraUiSlot；Header 保留拖拽合同 |  ⬜  |
| HAD-C2 | `popconfirm`   | Header / Footer / Content 等同 Dialog 装饰解剖              | Title、Description、Popup                  | 确认/取消按钮是领域语义，保留                              | 与 HAD-C1 同一方案，避免两套 anatomies                                         |  ⬜  |
| HAD-C3 | `bottom-sheet` | Header / Footer / Content                                   | Handle、Popup、Overlay、Title、Description | Handle 是手势合同，保留                                    | 同 HAD-C1                                                                      |  ⬜  |

`card`：`CardRoot` 包装 `CollapsibleRoot`，属于 R6 领域包装，**家族留下**。`CardHeader` / `Title` / `Description` / `Content` / `Footer` 是装饰槽——**冻结扩张**，不单列删除任务（HAD-C4 并入冻结策略）。

## 5. 桶 D — 平行家族

| ID     | 组件                            | 证据                                                                                                                                 | 违反 | 处置                                                                                                                                                                                                               |             状态              |
| :----- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- | :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------: |
| HAD-D1 | `nav-menu` vs `navigation-menu` | 两者 Root props 同构（`modelValue`、`delayDuration`、`orientation`、hover/click 开关）。Radix / Base / Reka 只有一套 Navigation Menu | R6   | 已决策：`NavMenu` 为唯一准人家族；`NavigationMenu` 全链路 `@deprecated`（类型 / 组件导出 / 文档迁移指南），家族冻结不再扩张，v1.0 移除。迁移指南：`apps/docs/src/docs/{en,zh-CN}/ui/components/navigation-menu.md` | ✅（冻结已落地；移除待 v1.0） |

## 6. 已合规（对照用，不要当整改项）

这些经常被误判为「不该在 headless」；它们通过删除测试或 R8。

| 组件                                                        | 为什么留下                                                         |
| :---------------------------------------------------------- | :----------------------------------------------------------------- |
| `drawer`                                                    | **没有**独立 headless 家族。UI 包装 `DialogCompact`（R6 正确形状） |
| `spinner` / `icon` / `theme-mode-switch` / `palette-picker` | UI-only 或组合已有原语（R3）                                       |
| `password`                                                  | Compact 组合 Input + 可见性切换（R6）                              |
| `command`                                                   | Compact 组合 Listbox + 过滤（R6）                                  |
| `button` / `link` / `label` / `separator`                   | 薄叶节点：disabled/多态、router、label 双击、`role="separator"`    |
| `avatar` / `progress` / `breadcrumb`                        | 加载回退状态机、progressbar ARIA、`nav` landmark                   |
| `aspect-ratio` / `affix` / `watermark` / `layout`           | R8：几何即合同（padding、placeholder、canvas、测量 CSS 变量）      |
| `listbox`                                                   | 与 `list` 对照：这才是 APG 选择列表                                |
| `kbd`                                                       | 深度在 `useKbd`；组件是叶节点。冻结为模板，不必删除                |

## 7. 路线图闸门（CMP-1 起，不入库）

实现下列路线图组件前必须先过 admission。大概率 **UI-only 或组合**，不要先开 headless 目录：

`Statistic`、`Result`、`Space`、`Banner`、`GradientText`、`Blockquote`、`Descriptions`（若只是定义列表解剖）、`Typography`（若只是样式约定）。

`Upload`、`TreeSelect`、`Mention`、`Dropzone` 等有真实交互的，按 R2 正常准入。

## 8. 子任务（范围；状态见 task-tracking CMP-6）

| 子任务  | 范围                                                                                |         工时         | 依赖                |
| :------ | :---------------------------------------------------------------------------------- | :------------------: | :------------------ |
| CMP-6.1 | 桶 A 冻结写入本表 + 在 skill 反模式中点名 Empty/List/Skeleton（规范侧已完成）       |         0.5d         | —                   |
| CMP-6.2 | HAD-B2 Alert 补 `role`；HAD-B3 修正 headless 组件名 `STag` → `Tag`                  |         0.5d         | —                   |
| CMP-6.3 | HAD-C1–C3 出方案：装饰槽内部化 vs ExtraUiSlot；Card 装饰槽冻结                      |          1d          | 方案需 Soybean 验收 |
| CMP-6.4 | HAD-D1 Navigation Menu 合并或领域差 ADR（已决策：deprecated 路线，2026-08-29 落地） | 0.5d 决策 + 实施另估 | Soybean 决策        |

## 9. 最近更新

- **2026-08-28**：按 R1–R8 建本清单；规范落入 `layers.md` Headless admission；任务登记为 CMP-6。
- **2026-08-29**：HAD-D1 决策落地——`NavMenu` 为唯一准人家族；`NavigationMenu` 全链路 `@deprecated`（headless/ui 类型与组件导出、SFC、双语迁移指南），冻结至 v1.0 移除。
