# C47 `date-range-picker` 检查优化报告

> **组件编号：** C47（`date-range-picker`）
> **组件名称：** `SDateRangePicker`（headless 基座：`DateRangePickerCompact` = `DateRangeFieldCompact`（双组日期段字段）+ `PopoverCompact`（日历图标触发器）+ default 插槽承载 `CalendarRange`；`scv()` 配方 `dateRangePickerVariants` extends `dateFieldVariants`）
> **模式：** 多槽 + Compact（`root`/`trigger`/`positioner`/`popup`/`arrow`/`close`，另有 `leading`/`separator` 插槽 + 带 props 的 default 插槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-09

---

## 一、执行摘要

对 `date-range-picker` 完成全维度审计。组合链路：`SDateRangePicker`（UI）→ `DateRangePickerCompact`（headless）→ `DateRangeFieldCompact`（双组日期段字段）嵌 `PopoverCompact`（日历图标触发器，`aria-haspopup="dialog"`），default 插槽承载 `CalendarRange`；选中开始与结束两天后触发 `update:modelValue`，两端齐备即关闭弹层。弹层为 `role="dialog"`。

**发现 Major ×1 + Minor ×4**，均已修复。`DateRangePickerCompact` 在 C45 修复前的 `DatePickerCompact` 上存在**全部同款缺陷集**（`calendarProps` 排除列表漏 `dateFieldProps`、`popoverProps` 无 locale popupLabel 注入、`triggerProps` 无 locale toggle、`leading` 插槽未转发、UI 层 `calendarRangeUi` 未排除），另发现 `separator` 插槽也未转发（C45 无此插槽）。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                             |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-08 props 泄漏）：`calendarProps` 排除列表补 `dateFieldProps`（同 C45 继承链泄漏）。**Minor ×2**（D1-12 Compact 聚合）：`leading`/`separator` 插槽显式转发；触发器注入 locale `toggle` aria-label。受控/非受控、范围校验、禁用、range 选择后 emit + 关闭均正确 |
| D2 行业对标 |  ✅  | 双段字段 + 日历范围弹层 + 跨组焦点 + RTL 的组合对标库多为「两个文本框 + 范围面板」。**Minor**（UI 层 D2-11）：`calendarRangeUi` 补入 `forwardedProps` 排除列表（同 C45 `calendarUi` 泄漏修复）                                                                                   |
| D3 API 设计 |  ✅  | `dateFieldProps` 配置内嵌字段、`popupProps`/`triggerProps` 覆盖弹层与触发器、`calendarRangeUi` 独立作用于日历、default 插槽 props 暴露 `open`/`close`/`calendarRangeProps`（D3-01/D3-04）；UI 层 `S` 前缀（D3-09）                                                               |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；新增 `LocaleDateRangePickerMessages { toggle, popupLabel }` 并同步 13 语言包（D4-06）；`DateRangePickerCompactSlots`（`leading`/`separator`/带 props 的 default）与 UI 层 `DateRangePickerSlots` 具名插槽类型齐全                                         |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；`popoverProps` 由 `usePickProps` 改为显式 `computed` 注入 locale 消息（类型安全 + 可读性）                                                                                                           |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（13 能力 × 6 库）+ 7 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                                                             |
|   D7 其他   |  ✅  | 单测 13 → 26 项全通过（locale 驱动的 trigger/popup aria-label、`calendarRangeUi` 不泄漏、`popupProps` 覆盖、axe 0 违规）；日期族系回归 82/82 全通过                                                                                                                              |

---

## 二、行业对标矩阵

> `date-range-picker` 是**双段字段 + 日历范围弹层 + 跨组焦点移动**模式。AntD/Element Plus/Naive UI 用「两个纯文本框 + 范围面板」；Mantine 用双输入；shadcn 无日期范围选择器。SoybeanUI 的双分段字段 + Popover 组合、跨组键盘焦点、locale 驱动的可访问名称与 headless/styled 分离为差异点。

| 能力                         | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :--------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离         |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 双段字段 + 范围弹层          |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 值受控 / 非受控              |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 弹层受控 / 非受控            |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 键盘分段编辑                 |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 跨组焦点移动                 |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 日历键盘导航                 |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   ✅   |
| 范围校验                     |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| `isDateUnavailable`          |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 禁用状态                     |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| locale 驱动的可访问名称      |    ✅     |     —      |      —       |    —    |    —     |   —    |
| `leading` / `separator` 插槽 |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 独立的 `calendarRangeUi`     |    ✅     |     —      |      —       |    —    |    —     |   —    |

---

## 三、发现的问题与处理

### 3.1 Major — D1-08 `calendarProps` 排除列表漏 `dateFieldProps`（与 C45 同款继承链泄漏）

**现象：** 传入 `dateFieldProps`（如 `{ placeholder, locale }`）后，其内容（含用户自定义 `data-*`）被渲染到日历范围根元素上，成为非法 DOM 属性。

**根因：** `DateRangePickerCompactProps extends CalendarRangeCompactProps`（继承 `PopoverCompactProps`），`calendarProps = useOmitProps(props, [...])` 的排除列表漏 `dateFieldProps` ——该 prop 沿继承链泄漏为日历根 DOM 非法属性。

**修复：** 排除列表补 `'dateFieldProps'`（与 C45 同一模式）：

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

**验证：** 新增测试「does not leak dateFieldProps onto the calendar root」（断言日历根无 `dateFieldProps`/`data-test-extra` 属性）。

### 3.2 Minor ×1 — D7-09 弹层 `role="dialog"` 默认可访问名称缺失

**现象：** 弹层打开后 `role="dialog"` 无默认 `aria-label`，屏幕阅读器无法识别用途。

**根因：** `popoverProps` 原用 `usePickProps` 从 props 挑选字段传给 `PopoverCompact`，无法注入 locale 消息。

**修复：** 新增 `LocaleDateRangePickerMessages { toggle, popupLabel }`（[types.ts](../../packages/headless/src/locale/types.ts)）并同步 13 个语言包；`popoverProps` 改为显式 `computed`，注入 `popupProps['aria-label']`（用户可经 `popupProps` 覆盖）：

```ts
const popoverProps = computed(() => ({
  ...,
  popupProps: {
    ...props.popupProps,
    'aria-label': props.popupProps?.['aria-label'] ?? messages.value.dateRangePicker.popupLabel
  }
}));
```

**验证：** 新增测试「gives the popup dialog an accessible name from the locale」（断言 `aria-label` = `Choose date range`）+「allows overriding the popup accessible name via popupProps」（断言覆盖生效）。

### 3.3 Minor ×1 — D1-12 日历开关图标触发器无可访问名称

**现象：** 日历图标触发器为纯图标按钮，无默认 `aria-label`。

**修复：** `triggerProps` computed 注入 locale `toggle` 消息（保留 `asChild` 覆盖与用户 `aria-label` 覆盖）：

```ts
const triggerProps = computed(() => ({
  ...props.triggerProps,
  asChild: props.triggerProps?.asChild ?? false,
  'aria-label': props.triggerProps?.['aria-label'] ?? messages.value.dateRangePicker.toggle
}));
```

**验证：** 新增测试「gives the calendar toggle trigger an accessible name from the locale」（断言 `aria-label` = `Open calendar`）。

### 3.4 Minor ×2 — D1-12 `leading`/`separator` 插槽未显式转发

**现象：** 使用方传入 `leading`/`separator` 插槽内容被静默丢弃。

**根因：** Compact 聚合层声明 `DateRangeFieldCompact` 的 `leading`/`trailing`/`separator` 插槽，但 `DateRangePickerCompact` 仅隐式透传 default，`leading`/`separator` 未声明转发（`trailing` 插槽承载 Popover，组件本身无该插槽）。

**修复：** headless 新增 `DateRangePickerCompactSlots = { leading?, separator?, default: (props) => any }` 并显式转发；UI 层新增 `DateRangePickerSlots = { leading?, separator? }` 并用具名模板转发：

```vue
<template #leading>
  <slot name="leading" />
</template>
<template #separator>
  <slot name="separator" />
</template>
```

**验证：** 新增测试「renders the leading slot before the range segments」+「renders the separator slot between the segment groups」。

### 3.5 Minor ×1 — UI 层 `calendarRangeUi` 未从 `forwardedProps` 排除（与 C45 同款泄漏）

**现象：** `calendarRangeUi` 对象（含自定义 class）经 `forwardedProps` 透传到 headless compact 后泄漏为 DOM 属性。

**修复：** `SDateRangePicker` 的 `forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'calendarRangeUi'])` 补 `calendarRangeUi`（与 C45 `calendarUi` 同款）。

**验证：** 新增测试「applies calendarRangeUi overrides without leaking onto the calendar root」（断言 class 生效且属性不泄漏）。

### 3.6 D7-11 — 单测覆盖不足（已扩展 13 → 26 项）

**处理：** 重写 [date-range-picker.spec.ts](../../packages/ui/test/specs/components/date-range-picker.spec.ts) 至 **26 项**，全部通过：

```bash
✓ test/specs/components/date-range-picker.spec.ts (26 tests)
```

> 覆盖要点：**rendering 6 项**（range field + 日历触发器、自定义 class、默认不弹、`leading` 插槽、`separator` 插槽、触发器 locale aria-label）；**open state 6 项**（`open` 显示、点击切换、emit `update:open`、外部点击关闭、Escape 关闭、受控 `open` 同步）；**calendar integration 4 项**（`dateFieldProps` 不泄漏、`calendarRangeUi` 不泄漏且生效、`minValue` 转发、`isDateUnavailable` 转发）；**disabled 2 项**（root+trigger 禁用属性、禁用不弹）；**modelValue 2 项**（范围选择后 emit + 关闭、格式化显示）；**ui overrides 2 项**（`ui.root`/`ui.trigger`）；**accessibility 5 项**（a11y closed、a11y open、popup locale aria-label、popup `role="dialog"`、`popupProps` 覆盖 aria-label）。

> **排查过程**：首跑编译失败——UI 层 `v-slot` 简写（组件标签上）与 `<template #leading>` 具名插槽共存触发 Vue 编译器 bug（`Codegen node is missing for element/if/for node`）→ 改为显式 `<template #default="{...}">` 形式（与 C45 基线一致）后 26/26 全绿。

### 3.7 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（与 `SDateRangePicker`/`SDateField` 取舍）、Usage、Features（8 条 bullet）、Component family（`SDateRangePicker` + headless `DateRangePickerCompact`/`DateRangeFieldCompact`/`PopoverCompact`/`CalendarRangeCompact`）、Demos、API、Notes（架构链路 + **13 能力 × 6 库对标表** + 7 条 Cautions）、FAQ（5 组：键盘选择范围、范围约束、内嵌字段配置、日历外观定制、与 `SDateRangeField` 区别）。中英文结构一一对应。

---

## 四、架构与模式要点

### Compact 聚合缺陷集与 C45 完全同源——审查时应横向扫描同族组件

`DateRangePickerCompact` 继承 `PopoverCompactProps + CalendarRangeCompactProps`，其缺陷集（`calendarProps` 漏 `dateFieldProps` 排除、`popoverProps`/`triggerProps` 无 locale 注入、具名插槽未转发、UI 层 `calendarRangeUi` 未排除）与 C45 修复前的 `DatePickerCompact` **逐项同款**。结论：**`*-picker` 族（date-picker/date-range-picker/后续 time-picker 等）共享同一组合骨架，缺陷以模板形式复制**——审查任一 compact 后，应对同族其余组件做同项核验（C45 起已形成基线模式）。

### `v-slot` 简写与具名插槽不可共存于同一组件标签

在组件标签上用 `v-slot="{...}"` 定义 default 的同时声明 `<template #leading>` 等具名插槽，会触发 Vue 编译器 `Codegen node is missing` 错误。正确模式：`<template #default="{...}">` 显式形式 + 具名 `<template>` 兄弟节点（C45 基线）。UI 层因 default 已被 `v-slot` 占用，具名插槽转发必须用具名模板形式。

### locale 消息注入的三个落点

`toggle`（触发器 `aria-label`）与 `popupLabel`（弹层 `role="dialog"` `aria-label`）必须同时注入，且都保留用户覆盖优先：`props.xxx?.['aria-label'] ?? messages.value.xxx.yyy`。语言包与 `LocaleMessages` 类型的强同步（13 语言包）由 `pnpm typecheck` 强制校验。

---

## 五、变更文件清单

| 文件                                                                               | 变更类型                                                                                                                                                                           |
| :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/date-range-picker/date-range-picker-compact.vue` | **Major 修复 ×1**（`calendarProps` 排除补 `dateFieldProps`）；**Minor ×3**（`popoverProps` 显式 computed 注入 locale、`triggerProps` 注入 toggle、`leading`/`separator` 显式转发） |
| `packages/headless/src/components/date-range-picker/types.ts`                      | 新增 `DateRangePickerCompactSlots`；修正 `DateRangePickerUiSlot` 上方错误注释                                                                                                      |
| `packages/ui/src/components/date-range-picker/date-range-picker.vue`               | `forwardedProps` 补 `calendarRangeUi` 排除；`v-slot` 简写改显式 `#default`；`leading`/`separator` 具名模板转发                                                                     |
| `packages/ui/src/components/date-range-picker/types.ts`                            | 新增 `DateRangePickerSlots`                                                                                                                                                        |
| `packages/headless/src/locale/types.ts`                                            | 新增 `LocaleDateRangePickerMessages` 并挂载至 `LocaleMessages`                                                                                                                     |
| `packages/headless/src/locale/langs/*.ts`（13 个语言包）                           | 各包新增 `dateRangePicker { toggle, popupLabel }` 消息                                                                                                                             |
| `packages/ui/test/specs/components/date-range-picker.spec.ts`                      | 单测 13 → 26 项（rendering/open state/calendar integration/disabled/modelValue/ui/a11y）                                                                                           |
| `apps/docs/src/docs/en/components/date-range-picker.md`                            | 文档 4 节 → 8 节 Recommended structure（Component family + 13 能力 × 6 库对标表 + Cautions + FAQ）                                                                                 |
| `apps/docs/src/docs/zh-CN/components/date-range-picker.md`                         | 与 en 一一对应的 8 节中文化版本                                                                                                                                                    |
| `docs/check.md`                                                                    | C47 行 7 维度 ⏳ → ✅；4.4 批次 3 记录表追加 C47 行 + 批次合计更新（4 单元，单测 6 → 99 项）                                                                                       |
| `docs/check-reports/C47-date-range-picker.md`                                      | **新建** 本审计报告                                                                                                                                                                |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run date-range-picker   # 26/26 全绿
cd packages/ui && pnpm exec vp test run               # 1380 项中 1376 通过；icon.spec.ts 4 项为 HEAD 既有环境性失败（见 check.md 4.2）
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                                          | 对标依据       | 说明                                                                                                                                     |
| :---------------------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `date-range-picker` 独立浏览器 e2e              | 自研标准       | 按 check.md 2.3.4 清单，属表单输入类，须补浏览器 e2e（真实键盘选段 + 日历范围选择 + 弹层交互），非 Blocker                               |
| `*-picker` 族缺陷模板横向排查                   | 共享组件       | C45/C47 确认 date-picker 与 date-range-picker 共享同一 Compact 骨架缺陷集；后续 `time-picker`/`time-range-picker` 等检查时按模板逐项核验 |
| 51 个 UI 层纯 `defineProps<T>()` 组件系统性排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C42-C45 遗留）       |
