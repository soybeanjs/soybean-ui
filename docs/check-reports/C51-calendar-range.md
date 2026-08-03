# C51 `calendar-range` 检查优化报告

> **组件编号：** C51（`calendar-range`）
> **组件名称：** `SCalendarRange`（headless 基座：`CalendarRangeRoot` 状态所有者 + `useCalendar`（与 `calendar` 共享）/`useCalendarRangeState` 组合式 + 12 个语义化子部件（`header`/`heading`/`prev`/`next`/`grid`/`grid-head`/`grid-body`/`grid-row`/`head-cell`/`cell`/`cell-trigger`）+ `CalendarRangeCompact` 数据驱动聚合；UI 层复用 `calendarRangeVariants`（12 slots，heading 默认渲染月/年 Select））
> **模式：** 多槽 + Compact（`root`/`header`/`heading`/`prev`/`next`/`grid`/`gridHead`/`gridBody`/`gridRow`/`headCell`/`cell`/`cellTrigger`，另有 `default`/`prev`/`heading`/`next`/`head-cell`/`day` 插槽）
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-09

---

## 一、执行摘要

对 `calendar-range` 完成全维度审计。headless 链路：`CalendarRangeRoot` 为状态所有者——经 `useControllableState` 持有 `DateRange`（`{ start, end }`）/placeholder，`useCalendar` 生成 `DateGrid` 网格（`numberOfMonths` 多月份、`fixedWeeks`、`weekStartsOn`、`minValue`/`maxValue` 边界、`nextPage`/`prevPage` 自定义翻页），`useCalendarRangeState` 维护选中/高亮/无效状态（`sortRange` 自动排序、`getInclusiveRangeDays` 跨度计算、`areAllDaysBetweenValid` 连续性校验）；`CalendarRangeCellTrigger` 是唯一交互部件——`shiftFocus` 按 delta 符号（含 RTL 反转）+ 跨月翻页 + 跳过 disabled，`handleKeydown` 响应 Enter/Space，hover 经 `setHoveredDate` 驱动高亮预览；`CalendarRangeCompact` 迭代月份/周/日渲染 `prev`/`heading`/`next`/`head-cell`/`day` 插槽。UI 层 `SCalendarRange` 经 `scv()` 合并 12 slot 样式，heading 默认渲染月/年 Select 控件。

**发现 Major ×1 + Minor ×3**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | **Major 修复**（D1-08 运行时行为）：`onDateChange` 的「非连续范围拒绝」读取 `isInvalid.value`（基于**当前已提交状态**——start-only 时恒 `false`），缺口范围被静默接受 → 提取 `isRangeInvalid(start, end)` 候选范围校验器，提交时基于候选 range 求值。**Minor 修复**（D1-08 props 泄漏）：prev/next `v-bind="props"` 泄漏 `prevPage`/`nextPage` → `useOmitProps` 剔除 |
| D2 行业对标 |  ✅  | **Minor ×2 修复**（D2-11 aria-label 覆盖）：prev/next 硬编码 `messages.calendar.prevPage` 覆盖用户自定义 + cell-trigger 硬编码 `labelText` 覆盖用户经 `cellTriggerProps` 传入的 `aria-label` → 均改为 `props['aria-label'] ?? 默认值` 回退。RTL 下 `shiftFocus` 按 delta 符号反转（与 C50 同款）                                                                    |
| D3 API 设计 |  ✅  | `DateRange` 双值模型、受控/非受控 `useControllableState`（D3-01/D3-04）、`allowNonContiguousRanges`/`maximumDays`/`fixedDate`/`isDateHighlightable` 范围专属 props（D3-08）、`update:startValue` 独立事件；UI 层 `S` 前缀（D3-09）                                                                                                                                  |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`CalendarRangeRootProps extends Omit<PrimitiveWithBaseProps, 'placeholder'>`（D4-03/D4-05）；`CalendarRangeUiSlot` 12 键 + `CalendarRangeUi = UiClass<CalendarRangeUiSlot>`、`CalendarRangeCompactSlots` 6 具名插槽类型齐全；`isRangeInvalid` 选项类型 `Pick<...> & { allowNonContiguousRanges; maximumDays }`                               |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；context 值全部 `ComputedRef`/`ShallowRef` 响应式注入（D5-08）；UI 层动态插槽转发（`slotNames` computed 排除 heading）                                                                                                                                                                   |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（13 能力 × 6 库）+ 7 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                                                                                                                                                |
|   D7 其他   |  ✅  | 单测 5 → 39 项全通过（渲染/选中态/键盘导航含 RTL 反转与跨月翻页/翻页按钮/禁用态/axe）；全量 UI 单测全通过                                                                                                                                                                                                                                                           |

---

## 二、行业对标矩阵

> `calendar-range` 是**范围选择月网格**模式。AntD 的 `DatePicker.RangePicker`、Element Plus 的 `DatePicker type="daterange"`、Mantine 的 `DatePicker`（type=range）、Naive UI `DatePicker`（type=daterange）均提供双网格 + 范围选择；shadcn 无独立日历（需自建）。SoybeanUI 的 hover 范围预览 + `fixedDate` 固定端点 + 候选范围校验（`isRangeInvalid`）为差异点。

| 能力                       | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离       |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 范围选择（起 + 止）        |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 悬停范围预览               |    ✅     |     —      |      —       |   ✅    |    —     |   —    |
| 键盘网格导航               |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   ✅   |
| RTL 方向反转               |    ✅     |     —      |      —       |    —    |    —     |   —    |
| `numberOfMonths` 多网格    |    ✅     |     —      |      —       |   ✅    |    —     |   —    |
| `allowNonContiguousRanges` |    ✅     |     —      |      ✅      |   ✅    |    —     |   —    |
| `maximumDays` 跨度上限     |    ✅     |     —      |      —       |   ✅    |    —     |   —    |
| `fixedDate` 固定端点       |    ✅     |     —      |      —       |    —    |    —     |   —    |
| `minValue`/`maxValue` 边界 |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| `isDateDisabled` / 不可用  |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 月/年 Select 控件          |    ✅     |     ✅     |      ✅      |    —    |    —     |   —    |
| 候选范围校验               |    ✅     |     —      |      —       |    —    |    —     |   —    |

---

## 三、发现的问题与处理

### 3.1 Major — D1-08 「非连续范围拒绝」基于已提交状态而非候选 range，缺口范围被静默接受

**现象：** `allowNonContiguousRanges=false`（默认）时，跨越禁用/不可用日期的范围仍可被选中。如 `isDateUnavailable: date.day === 19` 时点击 4-18 → 4-21，`update:modelValue` 仍提交 `{ start: 2026-04-18, end: 2026-04-21 }`，而按 reka-ui 语义应在第二次点击时**拒绝该候选并重置为新 start**。

**根因：** [calendar-range-root.vue](../../packages/headless/src/components/calendar-range/calendar-range-root.vue) 的 `onDateChange` 检查 `!props.allowNonContiguousRanges && ... && isInvalid.value`。`isInvalid` 是 `useCalendarRangeState` 基于**当前已提交 `modelValue`** 派生的 computed：在「仅 start 已选、end 未选」时其求值体走 `if (!props.end.value) return false` 恒为 `false`——第二次点击时读取的正是这一状态，导致非连续拒绝分支**永远不触发**。`isRangeInvalid` 本应针对**候选** `{ start, end }` 求值（对标 reka-ui 的 `isInvalid(range)` 函数式校验）。

**修复：** 在 [use-calendar-range.ts](../../packages/headless/src/components/calendar-range/use-calendar-range.ts) 提取 `isRangeInvalid(start, end, options)` 候选范围校验器（纯函数，封装原 computed 求值体：start/end 禁用与不可用、end < start、`maximumDays` 超限、`allowNonContiguousRanges` 豁免、`areAllDaysBetweenValid` 连续性）；computed `isInvalid` 改为调用它（保持 `data-invalid` 派生不变），`onDateChange` 改对候选 range 调用：

```ts
if (
  !props.allowNonContiguousRanges &&
  nextRange.start &&
  nextRange.end &&
  isRangeInvalid(nextRange.start, nextRange.end, {
    isDateDisabled,
    isDateUnavailable,
    isDateHighlightable: props.isDateHighlightable,
    allowNonContiguousRanges: props.allowNonContiguousRanges,
    maximumDays: props.maximumDays
  })
) {
  modelValue.value = { start: value.copy(), end: undefined };
  return;
}
```

**验证（测试驱动）：** 新增测试「rejects a non-contiguous range by default」——`isDateUnavailable(19)` 下点击 18 → 21，断言最后 emit 为 `{ start: 2026-04-21, end: undefined }`（拒绝并重置）。修复前该断言失败（收到 `{ start: 18, end: 21 }`），修复后 39/39 全绿。回归：`allowNonContiguousRanges=true` 同场景仍完成范围（既有测试通过）；`date-range-picker`/`date-range-field` 族系 91/91 通过。

### 3.2 Minor — D1-08 `calendar-range-prev`/`calendar-range-next` 函数 prop 泄漏为 DOM 属性（与 C50 同款）

**现象：** 两文件模板 `v-bind="props"` 将函数 prop `prevPage`/`nextPage` 连同其他声明 props 透传 `Button`，经 fallthrough 泄漏为 `<button>` DOM 非法属性（与 C50 §3.1 完全同款，`CalendarRangeCompact` 从 `calendar` 复制骨架时遗留）。

**修复：** 引入 `useOmitProps(props, ['prevPage'])` / `['nextPage']`，仅剔除逻辑函数 prop。

**验证：** 测试「uses a custom page function and does not leak it to the DOM」——自定义 `prevPage` + 点击翻页 + 断言 `prev-page` 属性 `undefined` 且翻页到 February 正常。

### 3.3 Minor — D2-11 prev/next 按钮 `aria-label` 硬编码覆盖用户自定义（与 C50 同款）

**现象：** `:aria-label="messages.calendar.prevPage"` 显式绑定优先级高于用户经 `prevProps`/`nextProps` 传入的 `aria-label`，可访问名称不可覆写。

**修复：** 改为回退式 `props['aria-label'] ?? messages.calendar.prevPage`。

### 3.4 Minor — D2-11 cell-trigger `aria-label` 硬编码覆盖用户经 `cellTriggerProps` 传入的值

**现象：** [calendar-range-cell-trigger.vue](../../packages/headless/src/components/calendar-range/calendar-range-cell-trigger.vue) 模板 `:aria-label="labelText"`（完整本地化日期）显式绑定覆盖用户通过 `cellTriggerProps` 自定义的逐格可访问名称——`forwardedProps` 已透传 `aria-label` 但被硬编码覆盖。

**修复：** 改为 `props['aria-label'] ?? labelText`（用户值优先、完整日期兜底）。

**验证：** 新增测试「uses the custom aria-label when provided」（prev/next）与「provides default localized aria-labels」（默认 "Previous page"/"Next page"）；cell-trigger 自定义 `aria-label` 覆盖由 axe 默认态 + 完整日期可访问名称断言间接覆盖。

### 3.5 核查结论 — C44/C46/C42/C50 同款风险不存在

- **C44/C46 同款 watch 清空死代码：不适用。** `calendar-range-root.vue` 无 `segmentValues` 类原地变更结构——`modelValue`/`placeholder` 经 `useControllableState` 统一 setValue，`grid` watch 整体重建。
- **C42 同款缺省 Boolean cast 风险：不适用。** `CalendarRangeRoot` 的 `withDefaults` 无默认 `true` 的 Boolean prop（`allowNonContiguousRanges: false`/`fixedWeeks: false` 等）；UI 层纯 `defineProps<CalendarRangeProps>()` 与同族一致，已列入「51 个 UI 层纯 `defineProps<T>()` 组件系统性排查」统一遗留项。
- **C50 同款 shiftFocus delta 约定：已含。** `shiftFocus` 以 `sign * keyCode` 计算物理 delta（`sign = dir === 'rtl' ? -1 : 1`），RTL 下 ArrowLeft 物理前进正确（测试通过）。

### 3.6 D7-11 — 单测覆盖不足（已扩展 5 → 39 项）

**处理：** 重写 [calendar-range.spec.ts](../../packages/ui/test/specs/components/calendar-range.spec.ts) 至 **39 项**，全部通过：

```bash
✓ test/specs/components/calendar-range.spec.ts (39 tests)
```

> 覆盖要点：**rendering 5 项**（heading Select + weekdays、root class、numberOfMonths、fixedWeeks、today）；**selected state 14 项**（受控 range 标记、start→end 完整 emit、反向排序、重复点击清空、preventDeselect 保持单值、外部同步、hover 高亮预览、maximumDays 重置、allowNonContiguousRanges 开关两态、fixedDate start/end 两态、readonly、unavailable）；**keyboard 8 项**（四方向、RTL 反转、跨月翻页、Enter/Space 选择 start+end、跳过 disabled、first focusable）；**navigation buttons 6 项**（prev/next 翻页、min/max 禁用、自定义 prevPage 不泄漏 DOM、自定义/默认 aria-label）；**disabled state 3 项**（isDateDisabled 阻止范围完成、min/max 边界、root data-disabled）；**a11y 3 项**（默认态/选择态/禁用态 axe 0 违规）。

### 3.7 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（与 `SDateRangePicker`/双 `SCalendar` 取舍）、Usage、Features（11 条 bullet）、Component family（`SCalendarRange` + headless `CalendarRangeCompact`/`CalendarRangeRoot`/`CalendarRangeCellTrigger`）、Demos、API、Notes（架构链路 + **13 能力 × 6 库对标表** + 7 条 Cautions）、FAQ（5 组：范围选择、缺口拒绝、跨度限制、固定端点、弹出式构建）。中英文结构一一对应。

---

## 四、架构与模式要点

### 派生无效状态 ≠ 候选校验：状态判定必须对「目标值」求值

`isInvalid` computed 基于当前已提交值派生，用于 `data-invalid` 展示；而「是否允许提交新值」的判定必须针对**候选值**。将两者混用（对已提交状态求值来拒绝候选）导致校验分支恒不触发。正确形态是提取 `isRangeInvalid(start, end, options)` 纯校验器，computed 与提交路径共用同一逻辑、各自传入对应输入。这与 reka-ui 的 `isInvalid(range)` 函数式校验一致。

### 复制骨架的连锁缺陷：`calendar-range` 从 `calendar` 复制时遗留 prev/next 泄漏

C50 修复 `calendar` 的 prev/next `v-bind="props"` 泄漏后，`calendar-range`（同骨架复制）仍保留旧写法；`date-range-picker`（C47 已修同类 `calendarProps` 排除泄漏）复用 `CalendarRangeCompact` 时同样受影响。凡共享骨架的组件族，单点修复不会自动传播——逐组件核验「叶子部件剔除列表 ↔ 功能 props 一一对应」是必经步骤。

### `aria-label` 回退模式的第三处落地

C50 记录的回退约定（`props['aria-label'] ?? 默认值`）本次扩展到 cell-trigger——「带默认可访问名称的交互部件」一律回退式绑定，注意 prop 键用 kebab-case 字符串键。

---

## 五、变更文件清单

| 文件                                                                              | 变更类型                                                                                                                                                                               |
| :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/calendar-range/use-calendar-range.ts`           | **Major 修复**（D1-08）：提取 `isRangeInvalid(start, end, options)` 候选范围校验器；computed `isInvalid` 改为调用共享函数并导出                                                        |
| `packages/headless/src/components/calendar-range/calendar-range-root.vue`         | **Major 修复**（D1-08）：`onDateChange` 非连续拒绝改对候选 range 调用 `isRangeInvalid`（替换 `isInvalid.value`）                                                                       |
| `packages/headless/src/components/calendar-range/calendar-range-prev.vue`         | **Minor 修复**（D1-08/D2-11）：`v-bind="props"` → `useOmitProps(props, ['prevPage'])` + `props['aria-label'] ?? 默认消息`                                                              |
| `packages/headless/src/components/calendar-range/calendar-range-next.vue`         | 与 prev 对称：`useOmitProps(props, ['nextPage'])` + aria-label 回退                                                                                                                    |
| `packages/headless/src/components/calendar-range/calendar-range-cell-trigger.vue` | **Minor 修复**（D2-11）：`:aria-label="labelText"` → `props['aria-label'] ?? labelText`                                                                                                |
| `packages/ui/test/specs/components/calendar-range.spec.ts`                        | 单测 5 → 39 项（rendering/selected/keyboard/navigation buttons/disabled/a11y）；新增非连续拒绝、hover 高亮、maximumDays、fixedDate、preventDeselect、props 泄漏、aria-label 自定义断言 |
| `apps/docs/src/docs/en/components/calendar-range.md`                              | 文档 4 节 → 8 节 Recommended structure（Component family + 13 能力 × 6 库对标表 + Cautions 7 条 + FAQ 5 组）                                                                           |
| `apps/docs/src/docs/zh-CN/components/calendar-range.md`                           | 与 en 一一对应的 8 节中文化版本                                                                                                                                                        |
| `docs/check.md`                                                                   | C51 行 7 维度 ⏳ → ✅；4.5 批次 4 记录表追加 C51 行 + 批次合计更新（2 单元，单测 14 → 74 项）                                                                                          |
| `docs/check-reports/C51-calendar-range.md`                                        | **新建** 本审计报告                                                                                                                                                                    |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run calendar-range      # 39/39 全绿
cd packages/ui && pnpm exec vp test run calendar-range date-range-picker date-range-field  # 族系 91/91 全绿
cd packages/ui && pnpm exec vp test run                       # 全量全绿
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 2.3.4）

| 增强项                                    | 对标依据       | 说明                                                                                                                               |
| :---------------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `calendar-range` 独立浏览器 e2e           | 自研标准       | 按 check.md 2.3.4 清单，`calendar-range` 属交互网格类，须补浏览器 e2e（真实键盘范围选择 + hover 预览 + RTL 场景），非 Blocker      |
| `date-range-picker` 候选校验回归          | 共享组件       | 复用 `CalendarRangeCompact`（已含 `isRangeInvalid` 修复），后续检查时核验弹层内范围选择与缺口拒绝行为一致                          |
| 51 个 UI 层纯 `defineProps<T>()` 组件排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C42-C51 遗留） |
