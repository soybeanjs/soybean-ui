# C50 `calendar` 检查优化报告

> **组件编号：** C50（`calendar`）
> **组件名称：** `SCalendar`（headless 基座：`CalendarRoot` 状态所有者 + `useCalendar`/`useCalendarState` 组合式 + 12 个语义化子部件（`header`/`heading`/`prev`/`next`/`grid`/`grid-head`/`grid-body`/`grid-row`/`head-cell`/`cell`/`cell-trigger`）+ `CalendarCompact` 数据驱动聚合；UI 层复用 `calendarVariants`（12 slots））
> **模式：** 多槽 + Compact（`root`/`header`/`heading`/`prev`/`next`/`grid`/`gridHead`/`gridBody`/`gridRow`/`headCell`/`cell`/`cellTrigger`，另有 `default`/`prev`/`heading`/`next`/`head-cell`/`day` 插槽）
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-09

---

## 一、执行摘要

对 `calendar` 完成全维度审计。headless 链路：`CalendarRoot` 为状态所有者——经 `useControllableState` 持有 `modelValue`/`placeholder`，`useCalendar` 生成 `DateGrid` 网格（`numberOfMonths` 多月份、`fixedWeeks` 固定 6 行、`weekStartsOn`/`weekdayFormat` 周首日与格式、`minValue`/`maxValue` 边界翻页禁用、`nextPage`/`prevPage` 自定义翻页函数），`useCalendarState` 维护选中/禁用/不可用判定；`CalendarCellTrigger` 是唯一交互部件——`shiftFocus` 按 delta 符号（含 RTL 反转）+ 跨月翻页 + 跳过 disabled 处理方向键，`handleKeydown` 响应 Enter/Space；`CalendarCompact` 迭代月份/周/日渲染 `prev`/`heading`/`next`/`head-cell`/`day` 插槽。UI 层 `SCalendar` 经 `scv()` 合并 12 slot 样式。

**发现 Minor ×2**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                     |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Minor 修复**（D1-08 props 泄漏）：`calendar-prev.vue`/`calendar-next.vue` 模板 `v-bind="props"` 把函数 prop `prevPage`/`nextPage` 连同其他声明 props 一并透传给 `Button`，经 fallthrough 泄漏为 DOM 非法属性 → 改用 `useOmitProps(props, ['prevPage'                   | 'nextPage'])`。**核查**：headless 无硬编码样式（`:class` 均为 UiContext 注入）                                                           |
| D2 行业对标 |  ✅  | **Minor 修复**（D2-11 aria-label 覆盖）：prev/next 按钮硬编码 `:aria-label="messages.calendar.prevPage"` 覆盖用户经 props 传入的 `aria-label`（无法自定义可访问名称）→ 改为 `props['aria-label'] ?? 默认消息`。RTL 下 `shiftFocus` 按 delta 符号反转，键盘网格方向键兼容 |
| D3 API 设计 |  ✅  | `multiple` 泛型约束 `CalendarModelValue<M>`、受控/非受控 `useControllableState`（D3-01/D3-04）、`defaultPlaceholder` 初始化、`calendarLabel`/`fullCalendarLabel` 全日历可访问名称、`isDateDisabled`/`isDateUnavailable` 双 matcher（D3-08）；UI 层 `S` 前缀（D3-09）     |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`CalendarRootProps extends Omit<PrimitiveWithBaseProps, 'dir'                                                                                                                                                                                     | 'placeholder'>`（D4-03/D4-05）；`CalendarUiSlot`12 键 +`CalendarUi = UiClass<CalendarUiSlot>`、`CalendarCompactSlots` 6 具名插槽类型齐全 |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；context 值全部 `ComputedRef`/`ShallowRef` 响应式注入（D5-08）                                                                                                                                |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（12 能力 × 6 库）+ 7 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                                                     |
|   D7 其他   |  ✅  | 单测 9 → 35 项全通过（渲染/选中态/键盘导航含 RTL 反转与跨月翻页/翻页按钮/禁用态/axe）；全量 UI 单测 1458/1458 全通过                                                                                                                                                     |

---

## 二、行业对标矩阵

> `calendar` 是**月视图网格日历**模式。AntD 的 `DatePicker`/`Calendar`、Element Plus 的 `DatePicker`、Mantine 的 `Calendar` 均提供月网格 + 周首日 + 范围边界；Naive UI `DatePicker` 内嵌日历；shadcn 无独立日历（需自建）。SoybeanUI 的 `numberOfMonths` 多月份 + `fixedWeeks` 固定 6 行 + RTL 方向反转键盘导航为差异点。

| 能力                                 | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :----------------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离                 |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 月视图网格                           |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   ✅   |
| 多月份 `numberOfMonths`              |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 固定 6 行 `fixedWeeks`               |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 受控 / 非受控                        |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   ✅   |
| 键盘网格导航                         |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   ✅   |
| RTL 方向反转                         |    ✅     |     —      |      —       |    —    |    —     |   —    |
| multiple 多选                        |    ✅     |     —      |      —       |    —    |    —     |   —    |
| `minValue`/`maxValue` 边界           |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   ✅   |
| `isDateDisabled`/`isDateUnavailable` |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   ✅   |
| 今日高亮 `today`                     |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 周首日/格式本地化                    |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 全日历可访问名称                     |    ✅     |     —      |      —       |    —    |    —     |   —    |

---

## 三、发现的问题与处理

### 3.1 Minor — D1-08 `calendar-prev`/`calendar-next` 函数 prop 泄漏为 DOM 属性

**现象：** [calendar-prev.vue](../../packages/headless/src/components/calendar/calendar-prev.vue) 与 [calendar-next.vue](../../packages/headless/src/components/calendar/calendar-next.vue) 模板 `v-bind="props"` 将全部声明 props（含函数 prop `prevPage`/`nextPage`）透传给 `Button`。`CalendarPrevProps extends ButtonProps` 继承链使 `prevPage` 成为 Button 的 **fallthrough attr**，最终渲染到 `<button>` DOM 上产生非法属性（浏览器会忽略函数值，但 DOM 上残留 `prevpage` 属性、污染 `$attrs`/样式匹配等）。

**根因：** 翻页函数被声明为 props（供 `CalendarCompact` 的 `prevProps`/`nextProps` 转发），但子部件模板未像库内其他组件（button/link 等）那样用 `useOmitProps` 剔除纯逻辑 props——`v-bind="props"` 原样透传。

**修复：** 引入 `useOmitProps(props, ['prevPage'])` / `useOmitProps(props, ['nextPage'])`，仅剔除逻辑函数 prop，其余（含 class/ui 透传）保留：

```ts
const buttonProps = useOmitProps(props, ['prevPage']);
```

**验证（测试驱动）：** 新增测试「does not leak the custom prevPage prop to the DOM」——自定义 `prevPage` 函数 + 点击翻页 + 断言 `button.getAttribute('prev-page')` 为 `null` 且翻页行为正常。修复前 `prev-page` 属性残留（`expect(...).toBeNull()` 失败），修复后 35/35 全绿。

### 3.2 Minor — D2-11 prev/next 按钮 `aria-label` 硬编码覆盖用户自定义

**现象：** 模板 `:aria-label="messages.calendar.prevPage"` 将可访问名称**硬编码为 locale 消息**。显式 `:aria-label` 绑定在模板编译后优先级高于用户在 `prevProps`/`nextProps` 中经 `v-bind` 传入的 `aria-label`——用户无法自定义翻页按钮的可访问名称，违反「可访问名称可覆写」通用约定（对标 reka-ui：`aria-label` 缺失时才回退默认消息）。

**修复：** 改为「用户值优先、locale 消息兜底」：

```vue
:aria-label="props['aria-label'] ?? messages.calendar.prevPage"
```

**验证：** 新增 2 项测试——「uses the provided aria-label on the prev button」（自定义 `aria-label` 渲染生效）、「provides a default aria-label from locale messages」（缺省时默认 "Previous page"）。

### 3.3 核查结论 — C44/C46/C49 同款风险不存在（D1-08/D2-11/D1-16）

- **C44/C46 同款 watch 清空死代码：不适用。** `calendar-root.vue` 无 `segmentValues` 类原地变更结构——`modelValue`/`placeholder` 经 `useControllableState` 统一 `setValue`，`grid` 由 `watch(placeholder/locale)` 整体重建 `createMonths(...)` 返回新数组。
- **C42 同款缺省 Boolean cast 风险：不适用。** `CalendarRoot` 的 `withDefaults` 无默认 `true` 的 Boolean prop（`multiple: false`/`fixedWeeks: false` 等默认 `false` 被 cast 后语义等价）；UI 层纯 `defineProps<CalendarProps>()` 与该族其他组件同款，已列入「51 个 UI 层纯 `defineProps<T>()` 组件系统性排查」统一遗留项。
- **C49 同款跨组焦点：不适用。** 单网格日历无跨组边界；`shiftFocus` 的 delta 计算 `sign * keyCode`（`ArrowLeft = -1`/`ArrowRight = +1`，`sign = dir === 'rtl' ? -1 : 1`）已按物理方向反转，RTL 下 `ArrowLeft` 物理前进正确。

### 3.4 D1-16 — 键盘导航核验（跨月翻页 + 跳过 disabled）

`CalendarCellTrigger.handleKeydown` 方向键处理经测试核验：ArrowRight/Left/Up/Down 在网格内移动（`shiftFocus`），从 4/30 末格按 ArrowRight 跨月翻页到 5/1（`placeholder` 变更 + grid 重建后焦点跟随），跳过 `isDateDisabled` 的格子，`initialFocus` 首次聚焦 `firstFocusableDate`；Enter/Space 触发 `onDateChange`（`preventDeselect` 下点击已选中日期仍 emit 同值、不移除）。RTL 下 `ArrowLeft` 物理前进断言通过。

### 3.5 D7-11 — 单测覆盖不足（已扩展 9 → 35 项）

**处理：** 重写 [calendar.spec.ts](../../packages/ui/test/specs/components/calendar.spec.ts) 至 **35 项**，全部通过：

```bash
✓ test/specs/components/calendar.spec.ts (35 tests)
```

> 覆盖要点：**rendering 5 项**（heading/weekdays、root class、numberOfMonths、fixedWeeks、today 高亮）；**selected state 11 项**（prev/next 翻页、受控 selected、defaultValue、click emit、multiple、Boolean 简写 multiple、外部同步、preventDeselect、readonly、unavailable）；**keyboard 9 项**（四方向移动、RTL 反转、跨月翻页、Enter/Space、跳过 disabled、first focusable）；**navigation buttons 6 项**（prev/next/paged、min/max 禁用、自定义 prevPage 不泄漏 DOM、自定义/默认 aria-label）；**disabled state 3 项**（isDateDisabled、min/max、root data-disabled）；**a11y 3 项**（默认态/multiple 态/禁用态 axe 0 违规）。

### 3.6 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（与 `SDatePicker`/`SDateRangePicker` 取舍）、Usage、Features（9 条 bullet）、Component family（`SCalendar` + headless `CalendarCompact`/`CalendarRoot`/`CalendarCellTrigger`）、Demos、API、Notes（架构链路 + **12 能力 × 6 库对标表** + 7 条 Cautions）、FAQ（5 组：键盘导航、多选、禁用/不可用区别、本地化、与 `SDatePicker` 区别）。中英文结构一一对应。

---

## 四、架构与模式要点

### 函数 prop 透传的三层链路——声明、传递、剔除

`prevPage`/`nextPage` 这类「组件功能函数」沿 `CalendarCompactProps` → `prevProps`/`nextProps` → `CalendarPrev` 声明 props 的链路传递，是 Compact 聚合的标准模式（D1-12）。但**在最终渲染部件**（prev/next）处必须用 `useOmitProps` 剔除——否则函数 prop 会经 `v-bind` fallthrough 泄漏为 DOM 非法属性。审查 Compact 组件族时，对每个「包装 Button/Primitive 的叶子部件」都要核验剔除列表与「功能 props」是否一一对应。同日历同族的 `calendar-range`（C51）、以及复用 `CalendarCompact` 的 `date-picker`/`date-range-picker`（C45/C47 已修同款泄漏）需回归确认。

### `aria-label` 回退模式：`props['aria-label'] ?? localeMessage`

显式 `:aria-label` 绑定优先级高于透传属性，任何「提供默认可访问名称」的实现都必须是**回退式**（用户值优先），而非硬编码覆盖。注意 prop 键要用 kebab-case 字符串键（`'aria-label'`，类型为 `DefineProps` 透传），`ariaLabel` camelCase 键在 typecheck 下不存在。

### 键盘网格导航的 delta 符号约定

`shiftFocus` 以 `sign * keyCode` 计算物理 delta（`sign` 含 `dir`），方向键移动天然兼容 RTL；跨月翻页与跳过 disabled 均以 delta 驱动。这与 C46/C49 修复后的跨组焦点模式（基于 delta 而非 direction）是同一原则的组内形态。

---

## 五、变更文件清单

| 文件                                                          | 变更类型                                                                                                                                                                       |
| :------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/calendar/calendar-prev.vue` | **Minor 修复**（D1-08 props 泄漏）：`v-bind="props"` → `useOmitProps(props, ['prevPage'])`；**Minor 修复**（D2-11）：`aria-label` 硬编码 → `props['aria-label'] ?? 默认消息`   |
| `packages/headless/src/components/calendar/calendar-next.vue` | 与 prev 对称：`useOmitProps(props, ['nextPage'])` + `aria-label` 回退模式                                                                                                      |
| `packages/ui/test/specs/components/calendar.spec.ts`          | 单测 9 → 35 项（rendering/selected/keyboard/navigation buttons/disabled/a11y）；新增 props 泄漏、aria-label 自定义、RTL 反转、跨月翻页、preventDeselect、today/fixedWeeks 断言 |
| `apps/docs/src/docs/en/components/calendar.md`                | 文档 4 节 → 8 节 Recommended structure（Component family + 12 能力 × 6 库对标表 + Cautions 7 条 + FAQ 5 组）                                                                   |
| `apps/docs/src/docs/zh-CN/components/calendar.md`             | 与 en 一一对应的 8 节中文化版本                                                                                                                                                |
| `docs/check.md`                                               | C50 行 7 维度 ⏳ → ✅；4.5 批次 4 记录表追加 C50 行 + 批次合计更新                                                                                                             |
| `docs/check-reports/C50-calendar.md`                          | **新建** 本审计报告                                                                                                                                                            |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run calendar      # 35/35 全绿
cd packages/ui && pnpm exec vp test run               # 全量 1458/1458 全绿
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 2.3.4）

| 增强项                                    | 对标依据       | 说明                                                                                                                                                               |
| :---------------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calendar` 独立浏览器 e2e                 | 自研标准       | 按 check.md 2.3.4 清单，`calendar` 属交互网格类，须补浏览器 e2e（真实键盘网格导航 + RTL 场景 + 跨月翻页），非 Blocker                                              |
| `calendar-range`（C51）检查时回归         | 共享组件       | `date-picker`/`date-range-picker` 复用 `CalendarCompact`（C45/C47 已修 prev/next 同款泄漏），C51 检查时核验 `prevPage`/`nextPage` 链路与 `aria-label` 回退是否一致 |
| 51 个 UI 层纯 `defineProps<T>()` 组件排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C42-C49 遗留）                                 |
