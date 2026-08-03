# C45 `date-picker` 检查优化报告

> **组件编号：** C45（`date-picker`）
> **组件名称：** `SDatePicker`（headless 基座：`DatePickerCompact` = `DateFieldCompact` + `PopoverCompact` 数据驱动组合，default 插槽承载 `SCalendar`；`scv()` 配方 `datePickerVariants` extends `dateFieldVariants`）
> **模式：** 多槽 + Compact（`root`/`input`/`trigger`/`positioner`/`popup`，另有 `leading` / `default` 插槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-09

---

## 一、执行摘要

对 `date-picker` 完成全维度审计。headless 链路：`DatePickerCompact` 组合 `DateFieldCompact`（分段 + 校验）与 `PopoverCompact`（`lucide:calendar` 图标触发器、`aria-haspopup="dialog"`），default 插槽透出 `{ open, close, calendarProps, onUpdateModelValue, onUpdatePlaceholder }`；UI 层 `SDatePicker` 注入 `datePickerVariants`（extends `dateFieldVariants`，新增 `trigger`/`positioner`/`popup` 槽），并用 `calendarProps` + 独立 `calendarUi` 渲染内嵌 `SCalendar`。选择日期时经 `handleSelect` 触发 `update:modelValue` 并关闭弹层。

**发现 Major ×2 + Minor ×4**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                              |
| :---------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-08 props 泄漏）：`calendarProps` 排除列表漏 `dateFieldProps`，该 prop 泄漏为日历根 DOM 非法属性（与 C36 checkbox-card-group 同类模式）。**Minor 修复**（D1-12 Compact 聚合）：`leading` 插槽未显式转发；日历开关图标触发器缺可访问名称。受控/非受控 value+open、范围校验、禁用、日期选择后关闭均正确                                                                                           |
| D2 行业对标 |  ✅  | 「分段字段 + 日历 Popover」组合模式与多数对标库「纯文本框 + 选择面板」形态不同；headless/styled 分离为差异点。**Major 修复**（D2-11 props 透传）：`PopoverPopup`/`PopperPopup` 声明 `BaseProps` 后模板未绑定剩余 props，`popupProps` 的 `aria-label`/`data-*` 被 Vue 运行时静默吞掉（联动 D7-09 偶发 axe 违规）→ 两层 `v-bind` 透传修复。**Minor 修复**：`calendarUi` 未从 `forwardedProps` 排除而泄漏至 headless |
| D3 API 设计 |  ✅  | `dateFieldProps`/`calendarProps`/`triggerProps`/`popupProps` 分槽透传命名对齐 reka-ui（D3-01/D3-04）；`v-model`/`defaultValue`/`open`/`defaultOpen` 双通道；`leading` 插槽 + `ui`/`calendarUi` 覆盖；UI 层 `S` 前缀（D3-09）                                                                                                                                                                                      |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`DatePickerCompactProps extends PopoverCompactProps + CalendarCompactProps<false>`（D4-03/D4-05）；新增 `DatePickerCompactSlots`/`DatePickerSlots` 具名插槽类型；`LocaleDatePickerMessages` 与 13 语言包严格同步                                                                                                                                                                           |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；popoverProps 由 `usePickProps` 改为显式 `computed`（语义：注入可访问名称时合并 `popupProps` 默认值）                                                                                                                                                                                                                                  |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（12 能力 × 6 库）+ 6 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                              |
|   D7 其他   |  ✅  | 单测 11 → 23 项全通过（含打开态 axe 0 违规，修复后连续 5 次运行稳定）；axe 0 违规；日期族系回归 56/56 全通过                                                                                                                                                                                                                                                                                                      |

---

## 二、行业对标矩阵

> `date-picker` 是**分段字段 + 日历 Popover**组合模式。AntD/Element Plus/Mantine/Naive UI 用「纯文本框 + 选择面板」；shadcn 官方以 Popover + Calendar 组合实现（无分段字段）；SoybeanUI 的 `DateField` 分段编辑与受控 `open` 为差异点。

| 能力                    | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :---------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离    |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 分段字段 + 日历弹层     |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 受控 / 非受控 value     |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 受控 / 非受控 open      |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 键盘分段编辑            |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 日历键盘导航            |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   ✅   |
| 范围校验                |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| `isDateUnavailable`     |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 禁用状态                |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| locale 驱动的可访问名称 |    ✅     |     —      |      —       |    —    |    —     |   —    |
| `leading` 插槽          |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 独立的 `calendarUi`     |    ✅     |     —      |      —       |    —    |    —     |   —    |

---

## 三、发现的问题与处理

### 3.1 Major — D1-08 `calendarProps` 排除列表漏 `dateFieldProps`，prop 泄漏为日历根 DOM 非法属性

**现象：** 给 `SDatePicker` 传 `dateFieldProps` 后，日历根元素被附加 `date-field-props` 等非法属性。

**根因：** `DatePickerCompactProps extends PopoverCompactProps, CalendarCompactProps<false>`（[types.ts](../../packages/headless/src/components/date-picker/types.ts)），同时显式声明 `dateFieldProps?: BaseProps`。`calendarProps = useOmitProps(props, [...])` 的排除列表遗漏 `dateFieldProps`——由于 `dateFieldProps` 在 `DatePickerCompact` 层是**声明过的 prop**，本应被消费，但日历子树透传路径（`calendarProps` → `CalendarCompact` → 根元素）把它当作普通属性落到了 DOM。与 C36 `checkbox-card-group` 同类缺陷模式。

**修复：** 排除列表补入 `'dateFieldProps'`：

```ts
const calendarProps = useOmitProps(props, [
  'open',
  'defaultOpen',
  'modal',
  'placement',
  'showArrow',
  'dateFieldProps',
  'triggerProps',
  'portalProps',
  'positionerProps',
  'popupProps',
  'arrowProps',
  'closeProps'
]);
```

**验证：** 新增测试「should not leak dateFieldProps onto the calendar root」断言日历根无 `dateFieldProps`/`date-field-props`/`data-test-extra` 属性。

### 3.2 Major — D2-11 `PopoverPopup`/`PopperPopup` 吞掉 `popupProps` 透传属性（联动 D7-09 偶发 axe 违规）

**现象：** 打开态 axe 检查偶发报 `aria-dialog-name`（popup `role="dialog"` 无可访问名称）。

**三层根因分析：**

1. **声明过的 props 不 fallthrough**：`PopoverPopupProps extends PopperPopupProps extends BaseProps`（[vue.ts](../../packages/headless/src/types/vue.ts) `DataAttributes & HTMLAttributes`，含 `aria-label`）。Vue 运行时把 `aria-label` 识别为**声明过的 prop** 并消费，不再进入 `$attrs`；而 [popover-popup.vue](../../packages/headless/src/components/popover/popover-popup.vue) 模板只显式绑定了 `id`/`aria-labelledby`/`role`/`tabindex`/`style` 等，**未绑定剩余 props**——`popupProps` 传入的 `aria-label`、`data-*`、`class` 等被**静默吞掉**。
2. **下层同样吞属性**：[popper-popup.vue](../../packages/headless/src/components/popper/popper-popup.vue) 根 `<div>` 也未绑定剩余 props，即使上层传下来也会再丢一层。
3. **axe 偶发性的来源**：dialog 的可访问名称实际依赖 `aria-labelledby="triggerId"` 引用触发器（触发器带 locale `aria-label`）。happy-dom 下 axe 对该引用的解析**偶发失败**——修复前的 `aria-label` 注入从未落到 DOM，axe 时好时坏。

**修复（两层透传）：** 两层组件均用 `useOmitProps` 排除模板中已显式绑定的键后 `v-bind` 剩余 props：

```ts
// popover-popup.vue
const popupAttrs = useOmitProps(props, [
  'class',
  'id',
  'style',
  'aria-labelledby',
  'data-state',
  'data-dismissable-layer',
  'data-soybean-popover-popup',
  'role',
  'tabindex'
]);
// template: <PopperPopup v-bind="popupAttrs" :id="popupId" ... role="dialog" ...>
```

```ts
// popper-popup.vue
const popupAttrs = useOmitProps(props, [
  'class',
  'style',
  'dir',
  'data-side',
  'data-align',
  'data-soybean-popper-popup'
]);
// template: <div v-bind="popupAttrs" :ref="setPopupElement" :class="cls" ...>
```

> 该修复使**所有**基于 popover/popper 的组件（select、combobox、tooltip、dropdown-menu、dialog、drawer、popconfirm、hover-card 等 90+）的 `popupProps` 透传属性首次真正渲染到弹层 DOM，属于共享底层行为修复；完整测试套件 1345/1349（余 4 项为 icon 既有环境性失败）确认无回归。

### 3.3 Minor — D7-09 popup `role="dialog"` 缺默认可访问名称（locale 消息机制）

**问题：** 修复 3.2 后需为 dialog 提供稳定可访问名称，否则依赖 `aria-labelledby` 解析仍不稳定。

**处理：** 新增 `LocaleDatePickerMessages { toggle, popupLabel }`（[types.ts](../../packages/headless/src/locale/types.ts)）并同步 13 个语言包（en `Open calendar`/`Choose date`、zh-CN `打开日历`/`选择日期`、zh-TW/ja/ko/ru/fr/de/es/pt-BR/id/tr/ar）；`popoverProps` 由 `usePickProps` 改为显式 `computed`，向 `popupProps` 注入默认 `aria-label`：

```ts
const popoverProps = computed(() => ({
  ...,
  popupProps: {
    ...props.popupProps,
    'aria-label': props.popupProps?.['aria-label'] ?? messages.value.datePicker.popupLabel
  }
}));
```

**经验：** 新增 locale 消息须同时更新类型定义 + 13 语言包，且消息键必须挂在正确的顶层命名空间（`datePicker` 而非 `calendar`）——运行时 `messages.value.datePicker` 才能命中。

### 3.4 Minor — D1-12 Compact 聚合：日历开关触发器无可访问名称

**问题：** `PopoverCompact` 触发器渲染 `Icon lucide:calendar`，无可访问名称。

**处理：** `triggerProps` computed 注入默认 `aria-label`（locale `toggle`），保留 `asChild: false` 覆盖：

```ts
const triggerProps = computed(() => ({
  ...props.triggerProps,
  asChild: props.triggerProps?.asChild ?? false,
  'aria-label': props.triggerProps?.['aria-label'] ?? messages.value.datePicker.toggle
}));
```

**验证：** 测试「should give the calendar toggle trigger an accessible name」断言 `aria-label="Open calendar"`。

### 3.5 Minor — D1-12 Compact 聚合：`leading` 插槽未透传

**问题：** headless `DatePickerCompact` 与 UI `SDatePicker` 均未显式转发 `leading` 插槽（对照 C44 date-field 同类缺陷）。

**处理：** 两端补齐——headless 侧 `defineSlots<DatePickerCompactSlots>()` + `<template #leading><slot name="leading" /></template>`；UI 侧 `DatePickerSlots` + 显式命名插槽（模板须用 `<template #default>` 具名形式，避免 `v-slot` 简写与具名插槽并存的 Vue 编译器冲突）。

### 3.6 Minor — UI 层 D2-11 `calendarUi` 未从 `forwardedProps` 排除，泄漏至 headless

**问题：** `SDatePicker` 的 `forwardedProps = useOmitProps(props, ['class', 'size', 'ui'])` 未排除 `calendarUi`（UI 层独有 prop，headless 无此声明）→ fallthrough 至日历根 DOM。

**处理：** 排除列表补 `'calendarUi'`；模板中 `:ui="calendarUi"` 单独绑定到内嵌 `SCalendar`。新增测试「should apply calendarUi overrides without leaking onto the calendar root」断言类覆盖生效且无 `calendarUi` 属性泄漏。

### 3.7 D7-11 — 单测覆盖不足（已扩展 11 → 23 项）

**处理：** 重写 [date-picker.spec.ts](../../packages/ui/test/specs/components/date-picker.spec.ts) 至 **23 项**，全部通过：

```bash
✓ test/specs/components/date-picker.spec.ts (23 tests)
```

> 覆盖要点：**rendering 5 项**（默认渲染、class、默认不弹、`leading` 插槽、触发器 aria-label）；**open state 6 项**（`defaultOpen`、点击切换、emit `update:open`、外部点击关闭、Escape 关闭、受控 `open` 同步）；**calendar integration 4 项**（`dateFieldProps` 不泄漏、`calendarUi` 不泄漏且生效、`minValue`/`maxValue` 转发、`isDateUnavailable` 转发）；**disabled 3 项**（`data-disabled`、触发器 `aria-disabled`、禁用不弹）；**modelValue 1 项**（选择后 emit + 关闭）；**ui overrides 2 项**（`ui.root`、`ui.trigger`）；**a11y 2 项**（关闭态 + 打开态 axe 0 违规，打开态修复后连续 5 次运行稳定）。

### 3.8 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（与 `SDateField`/`SCalendar` 取舍）、Usage、Features（8 条 bullet）、Component family（`SDatePicker` + headless `DatePickerCompact`/`DateFieldCompact`/`PopoverCompact`/`CalendarCompact`）、Demos、API、Notes（架构链路 + **12 能力 × 6 库对标表** + 6 条 Cautions）、FAQ（5 组：键盘选择、范围约束、配置内嵌字段、自定义日历、与 `SDateField` 区别）。中英文结构一一对应。

---

## 四、架构与模式要点

### Compact 聚合的「分槽 props」与「插槽透传」双通道

`DatePickerCompact` 同时暴露 `dateFieldProps`（字段）、`triggerProps`/`popupProps`（Popover）、`calendarProps`（日历）三类透传口，UI 层再叠加 `calendarUi`。本检查暴露了两个边界坑：**排除列表必须覆盖继承链上所有「应在别处消费」的 props**（`dateFieldProps`/`calendarUi`）；**具名插槽在 Compact 聚合层必须显式声明并转发**（`v-bind` 不携带插槽）。

### Vue 运行时「声明过的 props 不 fallthrough」与 a11y 的联动

`BaseProps`（`DataAttributes & HTMLAttributes`）被大量 headless 组件用作 props 类型，但**类型声明 ≠ 渲染**——模板必须显式绑定声明过的 props，否则被消费后既不进 `$attrs` 也不渲染。`PopoverPopup`/`PopperPopup` 的静默吞属性是共享底层缺陷：它让 `popupProps` 的一切属性从未生效，并让 dialog 可访问名称长期依赖 `aria-labelledby` 的外部引用（axe 解析偶发失败）。修复后 `popupProps` 属性首次真正到达弹层 DOM，是本次检查最重要的结构性收获。

---

## 五、变更文件清单

| 文件                                                                   | 变更类型                                                                                                                                                                                  |
| :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/date-picker/date-picker-compact.vue` | **Major 修复**：`calendarProps` 排除列表补 `dateFieldProps`；`popoverProps` 改显式 computed 注入 `popupProps['aria-label']`；`triggerProps` 注入 locale `toggle`；显式转发 `leading` 插槽 |
| `packages/headless/src/components/popover/popover-popup.vue`           | **Major 修复（共享底层）**：`useOmitProps` 排除显式绑定键后 `v-bind="popupAttrs"`，`popupProps` 属性不再被吞                                                                              |
| `packages/headless/src/components/popper/popper-popup.vue`             | **Major 修复（共享底层）**：同上，根 `<div>` 绑定剩余 props                                                                                                                               |
| `packages/headless/src/components/date-picker/types.ts`                | 新增 `DatePickerCompactSlots`（`leading`/`default`）                                                                                                                                      |
| `packages/headless/src/locale/types.ts`                                | 新增 `LocaleDatePickerMessages { toggle, popupLabel }`，`LocaleMessages` 挂载 `datePicker` 命名空间                                                                                       |
| `packages/headless/src/locale/langs/*.ts`（13 个）                     | 各语言包新增 `datePicker` 块（toggle/popupLabel 消息）                                                                                                                                    |
| `packages/ui/src/components/date-picker/date-picker.vue`               | **Minor 修复**：`forwardedProps` 排除 `calendarUi`；提取 `handleSelect`（`DateValue \| undefined` 防御）；显式 `#leading`/`#default` 命名插槽转发                                         |
| `packages/ui/src/components/date-picker/types.ts`                      | 新增 `DatePickerSlots`（`leading`）                                                                                                                                                       |
| `packages/ui/test/specs/components/date-picker.spec.ts`                | 单测 11 → 23 项（rendering/open/calendar-integration/disabled/modelValue/ui/a11y）；新增 `calendarUi` 不泄漏断言                                                                          |
| `apps/docs/src/docs/en/components/date-picker.md`                      | 文档 4 节 → 8 节 Recommended structure（Component family + 12 能力 × 6 库对标表 + Cautions + FAQ）                                                                                        |
| `apps/docs/src/docs/zh-CN/components/date-picker.md`                   | 与 en 一一对应的 8 节中文化版本                                                                                                                                                           |
| `docs/check.md`                                                        | C45 行 7 维度 ⏳ → ✅；4.4 批次 3 记录表追加 C45 行 + 批次合计更新（2 单元）                                                                                                              |
| `docs/check-reports/C45-date-picker.md`                                | **新建** 本审计报告                                                                                                                                                                       |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run date-picker    # 23 项全绿（打开态 axe 连续 5 次稳定）
cd packages/ui && pnpm exec vp test run               # 1349 项中 1345 通过；icon.spec.ts 4 项为 HEAD 既有环境性失败（见 check.md 4.2）
pnpm test                               # 工作区递归单测（含 sbean）全绿
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                                          | 对标依据       | 说明                                                                                                                                                      |
| :---------------------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `date-picker` 独立浏览器 e2e                    | 自研标准       | 按 check.md 2.3.4 清单，`date-picker` 属浮层/门户类，须补浏览器 e2e（真实键盘导航 + 弹层焦点圈定 + 外部点击关闭），非 Blocker                             |
| popover/popper 族 `popupProps` 行为统一回归     | 共享底层修复   | 3.2 修复使全部 popover/popper 基组件的 `popupProps` 属性首次渲染，建议后续 C74 popover 等检查项回归确认各组件 popup 样式/属性透传（本轮全量测试已无回归） |
| 51 个 UI 层纯 `defineProps<T>()` 组件系统性排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C43/C44 遗留）                        |
