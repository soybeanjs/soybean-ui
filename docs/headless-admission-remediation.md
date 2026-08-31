# Headless 准入整改清单

> 定位：记录**已发布** headless 家族对 [Headless admission](../.agents/skills/soybean-ui-component-development/layers.md#headless-admission) 的违反项，以及处置方式。给执行整改的 Agent / 维护者看。
> 状态：🔵 进行中（2026-08-31 规则改版并完成全量重审；代码整改部分未开工）
> 基线：2026-08-28 · 规则改版：2026-08-31（两段式规则）· 规则落点：`layers.md` Headless admission R1–R8
>
> 任务级状态只在 [task-tracking.md](./task-tracking.md) 的 **CMP-6** 维护。本文只维护**组件级**处置状态。规范本身不在此重复，一律指向 skill。

## 0. 约定

**现行准入规则（2026-08-31 改版，两段式，详见 `layers.md` R5）：**

1. **Gate 1 — 家族是否需要在 headless 实现。** 按删除测试对**家族整体**（含 Compact 装配逻辑）判定：逻辑（键盘、焦点、ARIA、定位、表单、状态不变量）删掉后会在 N 个 UI 包装里重现 → 准入；只剩 `div` + 类注入 → 拒绝，做 **UI-only**（UI 层组合已准入原语、自持结构与装配）。
2. **Gate 2 — 解剖导出跟随 Compact。** 已准入家族必须**导出 Compact 组合的每一个原语**，且 Compact 只组合已导出原语（单一 DOM 合同）；Compact 之外的额外手拼解剖原语（item、portal、provider、arrow 等）允许导出。

| 处置             | 含义                                                                          |
| :--------------- | :---------------------------------------------------------------------------- |
| **冻结**         | 保留现有公开 API；禁止当作新家族模板；不再扩张槽位                            |
| **补语义**       | 家族可留，但必须补上缺失的 ARIA / 角色                                        |
| **补导出**       | Compact 组合的内部节点补齐公开导出（单一 DOM 合同，Gate 2 违规的修复方式）    |
| **改判 UI-only** | 撤销 headless 家族；UI 层组合已准入原语并自持装配（drawer 形状，Card 为判例） |
| **保留公开**     | 原"装饰槽"经两段式规则判定为合规原语（Compact 组合 + 手拼复用），不再整改     |
| **待决策**       | 合并、下沉 UI、或改 ExtraUiSlot；先出方案再改代码                             |
| **已合规**       | 对照两段式规则通过；列入本文是为了防止误伤                                    |

新组件（含 CMP-1 及以后的路线图项）**不进本清单**。它们在 Phase 0 直接走 admission；通不过就做 UI-only 或组合已有原语。

## 1. 总览

| 桶                           | 数量 | 默认处置                                        | 子任务  |
| :--------------------------- | :--: | :---------------------------------------------- | :------ |
| A 解剖壳（过不了删除测试）   |  3   | 冻结；长期方向：下沉 UI 重建                    | CMP-6.1 |
| B 可关闭薄壳（只有 `open`）  |  3   | 冻结；Alert 另补语义                            | CMP-6.2 |
| C 已准入家族上的"装饰槽"     | 3 族 | ~~待决策~~ → **保留公开**（2026-08-31 决策）    | CMP-6.3 |
| C' Card 家族（原桶 C 附注）  |  1   | ~~冻结~~ → **改判 UI-only**（2026-08-31 决策）  | CMP-6.5 |
| D 平行家族                   | 1 对 | 已决策：NavMenu 准入，NavigationMenu deprecated | CMP-6.4 |
| E Compact 私有节点（Gate 2） | 6 族 | 补导出（单一 DOM 合同）                         | CMP-6.6 |
| 明确合规、不要当违规         |  —   | 已合规                                          | —       |

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

## 4. 桶 C — 已准入家族上的"装饰槽"（2026-08-31 决策：保留公开）

家族本身通过 R2（Dialog / Popconfirm / BottomSheet 都有焦点、dismiss、Portal）。两段式规则下重新判定：这些家族已准入，其 Compact 组合的原语必须全部公开（Gate 2）；其中 Header/Footer 虽无 widget 逻辑，但 Compact 组合 + UI 层手拼复用都需要它们作为原语存在。`DialogTitle` / `DialogDescription` 是语义槽，**不要动**。原 R5 的"装饰槽不得公开"条款已被两段式规则取代（`layers.md` R5）。

| ID     | 家族           | "装饰槽"（保留公开原语）                        | 语义槽（保留）                             | 备注                                                           | 处置                                                                    | 状态 |
| :----- | :------------- | :---------------------------------------------- | :----------------------------------------- | :------------------------------------------------------------- | :---------------------------------------------------------------------- | :--: |
| HAD-C1 | `dialog`       | `DialogFooter`、`DialogContent`、`DialogHeader` | Title、Description、Overlay、Popup、Close  | `DialogHeader` 在 `draggable` 时是拖拽句柄合同，本就不是纯装饰 | **保留公开**。Compact 只组合已导出原语；Footer/Content 供 UI 层手拼复用 |  ✅  |
| HAD-C2 | `popconfirm`   | Header / Footer / Content（同 Dialog 解剖）     | Title、Description、Popup                  | 确认/取消按钮是领域语义，保留                                  | **保留公开**，与 HAD-C1 同一政策                                        |  ✅  |
| HAD-C3 | `bottom-sheet` | Header / Footer / Content                       | Handle、Popup、Overlay、Title、Description | Handle 是手势合同，保留                                        | **保留公开**，同 HAD-C1                                                 |  ✅  |

### HAD-C4 · `card`（原"冻结装饰槽"附注，2026-08-31 改判）

**处置：改判 UI-only（drawer 形状）。** 重新过删除测试：Card 唯一的真实逻辑是内容折叠，由已准入的 `collapsible` 家族提供；`CardHeader` / `CardFooter` / `CardTitle` / `CardDescription` / `CardTitleRoot` 全部为展示节点，`showHeader` / `showFooter` 装配判定可在 UI 层完成（UI-only 组件拥有结构装配权，见 `layers.md` UI 责任边界）。因此 headless 的 `card` 家族不再满足 Gate 1：

- 删除 `packages/headless/src/components/card/`（含 `CardCompact` 与全部原语导出、`@soybeanjs/headless/card` 子路径）。
- `SCard` 重写为 UI-only 组合：`CollapsibleRoot`（`defaultOpen: true`）+ 自绘 header/titleRoot/title/description/footer 节点 + `CollapsibleContent` + `CollapsibleTrigger`；`provideCollapsibleUi` 提供 recipe 的 `root`/`content`/`trigger` 子集；自绘节点保留 `data-soybean-card-*` 供测试与选择器。
- `styles/card.ts` 配方、`CardUiSlot` 键集、`ui` 覆盖语义**完全不变**（chrome 类本来就在 UI 配方里）。
- 同 major 内执行（breaking）：`pnpm sui headless` / `sui ui` / `sui api` 重生成，docs / playground 示例改引用。

## 5. 桶 D — 平行家族

| ID     | 组件                            | 证据                                                                                                                                 | 违反 | 处置                                                                                                                                                                                                               |             状态              |
| :----- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- | :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------: |
| HAD-D1 | `nav-menu` vs `navigation-menu` | 两者 Root props 同构（`modelValue`、`delayDuration`、`orientation`、hover/click 开关）。Radix / Base / Reka 只有一套 Navigation Menu | R6   | 已决策：`NavMenu` 为唯一准人家族；`NavigationMenu` 全链路 `@deprecated`（类型 / 组件导出 / 文档迁移指南），家族冻结不再扩张，v1.0 移除。迁移指南：`apps/docs/src/docs/{en,zh-CN}/ui/components/navigation-menu.md` | ✅（冻结已落地；移除待 v1.0） |

## 6. 桶 E — Compact 私有节点（Gate 2 单一 DOM 合同违规，2026-08-31 全量重扫发现）

Compact 组合了**未导出**的内部节点：该节点承担家族解剖合同（`data-soybean-*`、槽位类、交互），却没有公开原语身份，导致 Compact 与手拼组合的 DOM 合同分叉。修复方式统一为**补导出**（`index.ts` + `packages/headless/src/index.ts` + `pnpm sui headless`）。反向情形（导出超出 Compact 组合，如 `FormField`、`SelectPortal`、`ComboboxArrow/Virtualizer`、`DialogProvider/Portal`、`TooltipProvider`、`ProgressProvider/ProgressCircle`、各 menu 的 item 集合）是手拼解剖与基础设施导出，**合规**。

| ID     | 家族              | Compact 组合的未导出节点                                       | 处置                                         | 状态 |
| :----- | :---------------- | :------------------------------------------------------------- | :------------------------------------------- | :--: |
| HAD-E1 | `input-number`    | `InputNumberClear`                                             | 补导出                                       |  ⬜  |
| HAD-E2 | `layout`          | `LayoutPlaceholder`                                            | 补导出                                       |  ⬜  |
| HAD-E3 | `menubar`         | `MenubarMenus`（内部装配组件）                                 | 补导出                                       |  ⬜  |
| HAD-E4 | `nav-menu`        | `NavMenuOptionCompact`                                         | 补导出                                       |  ⬜  |
| HAD-E5 | `table`           | `TableCompactHead`、`TableCompactRow`、`TableVirtualSpacerRow` | 补导出                                       |  ⬜  |
| HAD-E6 | `navigation-menu` | `NavigationMenuOptionCompact`                                  | 不修——家族已 deprecated（HAD-D1），v1.0 移除 |  ✅  |

命名一致性提醒（非违规）：`anchor-compact.vue` 以 `AnchorCompactItem` 本地名导入 `anchor-item-compact.vue`（导出名 `AnchorItemCompact`）；`context-menu-compact.vue` / `dropdown-menu-compact.vue` 分别以 `SContextMenuWrapper` / `DropdownMenuWrapper` 本地名导入已导出的 `ContextMenuWrapperCompact` / `DropdownMenuWrapperCompact`。统一本地名与导出名即可。

## 7. 已合规（对照用，不要当整改项）

这些经常被误判为「不该在 headless」；它们通过删除测试或 R8。

| 组件                                                        | 为什么留下                                                                  |
| :---------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `drawer`                                                    | **没有**独立 headless 家族。UI 包装 `DialogCompact`（R6 正确形状）          |
| `spinner` / `icon` / `theme-mode-switch` / `palette-picker` | UI-only 或组合已有原语（R3）                                                |
| `password`                                                  | Compact 组合 Input + 可见性切换（R6）                                       |
| `command`                                                   | Compact 组合 Listbox + 过滤（R6）                                           |
| `button` / `link` / `label` / `separator`                   | 薄叶节点：disabled/多态、router、label 双击、`role="separator"`             |
| `avatar` / `progress` / `breadcrumb`                        | 加载回退状态机、progressbar ARIA、`nav` landmark                            |
| `aspect-ratio` / `affix` / `watermark` / `layout`           | R8：几何即合同（padding、placeholder、canvas、测量 CSS 变量）               |
| `listbox`                                                   | 与 `list` 对照：这才是 APG 选择列表                                         |
| `kbd`                                                       | 深度在 `useKbd`；组件是叶节点。冻结为模板，不必删除                         |
| `clipboard` / `segment` / `backtop`                         | 剪贴板复制状态机、选择态 + Tabs 指示器、滚动阈值逻辑（2026-08-31 重审确认） |
| `tree-nav` / `split-nav`                                    | 溢出测量回流（ResizeObserver）、应用壳分栏导航组合（2026-08-31 重审确认）   |

## 8. 路线图闸门（CMP-1 起，不入库）

实现下列路线图组件前必须先过 admission。大概率 **UI-only 或组合**，不要先开 headless 目录：

`Statistic`、`Result`、`Space`、`Banner`、`GradientText`、`Blockquote`、`Descriptions`（若只是定义列表解剖）、`Typography`（若只是样式约定）。

`Upload`、`TreeSelect`、`Mention`、`Dropzone` 等有真实交互的，按 R2 正常准入。

## 9. 子任务（范围；状态见 task-tracking CMP-6）

| 子任务  | 范围                                                                                                  |         工时         | 依赖            |
| :------ | :---------------------------------------------------------------------------------------------------- | :------------------: | :-------------- |
| CMP-6.1 | 桶 A 冻结写入本表 + 在 skill 反模式中点名 Empty/List/Skeleton（规范侧已完成）                         |         0.5d         | —               |
| CMP-6.2 | HAD-B2 Alert 补 `role`；HAD-B3 修正 headless 组件名 `STag` → `Tag`                                    |         0.5d         | —               |
| CMP-6.3 | HAD-C1–C3 处置决策（~~装饰槽内部化 vs ExtraUiSlot~~）——**已决策：保留公开**，无代码改动               |        已完成        | Soybean 决策 ✅ |
| CMP-6.4 | HAD-D1 Navigation Menu 合并或领域差 ADR（已决策：deprecated 路线，2026-08-29 落地）                   | 0.5d 决策 + 实施另估 | Soybean 决策    |
| CMP-6.5 | HAD-C4 Card 家族退役：删 headless/card，SCard 改 UI-only 组合 Collapsible（breaking，进下一个 major） |         1–2d         | major 发布窗口  |
| CMP-6.6 | 桶 E 补导出：input-number / layout / menubar / nav-menu / table（navigation-menu 不修）               |         0.5d         | —               |

## 10. 最近更新

- **2026-08-28**：按 R1–R8 建本清单；规范落入 `layers.md` Headless admission；任务登记为 CMP-6。
- **2026-08-29**：HAD-D1 决策落地——`NavMenu` 为唯一准人家族；`NavigationMenu` 全链路 `@deprecated`（headless/ui 类型与组件导出、SFC、双语迁移指南），冻结至 v1.0 移除。
- **2026-08-31**：**准入规则改版为两段式**（Gate 1 家族删除测试 / Gate 2 解剖导出跟随 Compact），`layers.md` R5 重写、R3 增补 Card 判例、UI 层责任边界补 UI-only 装配权、反模式新增单一 DOM 合同条款，`audit.md` D1-19 同步。**全量重审 94 个 headless 家族**：HAD-C1–C3 翻转为保留公开；card 改判 UI-only（HAD-C4，CMP-6.5）；新增桶 E 六族 Compact 私有节点违规（CMP-6.6）；已合规表新增 clipboard / segment / backtop / tree-nav / split-nav。
