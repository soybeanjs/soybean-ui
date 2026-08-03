# C44 `date-field` 检查优化报告

> **组件编号：** C44（`date-field`）
> **组件名称：** `SDateField`（headless 基座：`DateFieldCompact` = `DateFieldRoot` + 逐分段 `DateFieldInput` 数据驱动组合；`scv()` 配方 `dateFieldVariants`）
> **模式：** 多槽 + Compact（`root` / `input`，另有 `leading` / `trailing` 插槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-09

---

## 一、执行摘要

对 `date-field` 完成全维度审计。headless 链路：`DateFieldRoot` 经 `useControllableState` 持有 `modelValue`/`placeholder`（受控/非受控），用 `@internationalized/date` formatter 推导分段布局，经 `isInvalid`（`minValue`/`maxValue`/`isDateUnavailable`）完成校验，并渲染 VisuallyHidden 原生 input（`type=date|datetime-local`、`name`/`required`/`min`/`max`）；每个 `DateFieldInput` 绑定 `useDateField` 组合式（per-part 键盘增减/输入/自动前进/删除，与 `time-field` 族共享）；编辑时原地变更 `segmentValues` shallowRef，root 在全部段填满后提交组装 `DateValue`。UI 层 `SDateField` 为薄透传包装（`dateFieldVariants` root/input 槽 + 6 尺寸 size 变体）并转发 `leading`/`trailing` 插槽。

**发现 Major ×1 + Minor ×1**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                          |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | **Major 修复**（D1-08 响应式）：`segmentValues` shallowRef 原地变更 + watch 清空分支死代码 → 清空值后分段残留旧值、`data-placeholder` 不刷新；改无条件替换新对象触发响应式。**Minor 修复**（D1-12 Compact 聚合）：UI 层 `leading`/`trailing` 插槽未显式转发被静默丢弃；对照 SSegment 显式转发模式补上。受控/非受控/范围校验/禁用只读/原生表单/12 小时制均正确 |
| D2 行业对标 |  ✅  | 分段式日期输入模式源自 reka-ui（Radix）；对标库以「纯文本框 + 选择弹层」表达日期输入。遗留增强：独立浏览器 e2e（D7-19，见 check.md 2.3.4 浮层/门户类清单）                                                                                                                                                                                                    |
| D3 API 设计 |  ✅  | `granularity`/`hourCycle`/`minValue`/`maxValue`/`isDateUnavailable`/`defaultPlaceholder` 命名对齐 reka-ui（D3-01/D3-04）；`v-model`/`defaultValue`/`update:placeholder` 双通道；`leading`/`trailing` 插槽 + `ui.root`/`ui.input` 覆盖；UI 层 `S` 前缀（D3-09）                                                                                                |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`DateFieldRootProps` extends `FormFieldCommonProps` + Pick `CalendarRootProps<false>` + Omit `PrimitiveWithBaseProps`（D4-03/D4-05）；`DateFieldCompactProps` 含 `inputProps?` 透传                                                                                                                                                    |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；watch 清空分支修复采用「整体替换」而非原地 mutation，符合 shallowRef 使用规范                                                                                                                                                                                                     |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（12 能力 × 6 库）+ 6 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                                                                                                                                          |
|   D7 其他   |  ✅  | 单测 6 → 24 项全通过（渲染/状态/键盘/RTL/无效态/禁用只读/原生表单/UI 覆盖/axe 双形态）；axe 0 违规；日期族系回归 date-field/date-picker/date-range-field/date-range-picker 56/56 全通过                                                                                                                                                                       |

---

## 二、行业对标矩阵

> `date-field` 是**分段式日期输入**（segmented date input）模式，源自 reka-ui（Radix）；AntD/Element Plus/Mantine/Naive UI/shadcn 均以「纯文本框 + 日期选择弹层」表达，故分段相关能力为 `—`。

| 能力                      | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :------------------------ | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离      |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 可编辑分段                |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 受控 / 非受控             |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 键盘增减 / 键入           |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 分段间自动前进            |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 范围校验                  |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| `isDateUnavailable`       |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 粒度（分/秒）             |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 12/24 小时制 `dayPeriod`  |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 禁用 / 只读               |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 原生表单提交              |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| `leading`/`trailing` 插槽 |    ✅     |     —      |      —       |    —    |    —     |   —    |

---

## 三、发现的问题与处理

### 3.1 Major — D1-08/D2-11 清空值后分段残留旧值（shallowRef 原地变更不触发响应式）

**现象：** Backspace 清空 day 段后，`data-placeholder` 不刷新，分段仍显示残留旧值。

**三层根因分析：**

1. **shallowRef 依赖追踪特性**：`segmentValues` 是 `shallowRef`（[date-field-root.vue](../../packages/headless/src/components/date-field/date-field-root.vue)），只有 `.value` **引用整体替换**才触发依赖失效；对其对象内部字段做 mutation 不会通知订阅方。
2. **`useDateField` 编辑逻辑原地 mutation**：[use-date-field.ts](../../packages/headless/src/date/use-date-field.ts) 在 per-part keydown 处理中直接改写 `segmentValues.value[part] = ...`，这种「原地写」正是 shallowRef 选型的意图——**正常的编辑路径依赖逐段置位后由 root 提交**，但不依赖 shallowRef 自动失效。
3. **watch 清空分支死代码**：root 的 `watch([modelValue, locale, inferredGranularity])` 清空分支原写法为「仅当 `segmentValues` 全部为 null 时整体 `initializeSegmentValues(...)` 替换」。但 Backspace 只清空**单个**分段（其余段保持数字），「全部为 null」的条件永远不会成立——该分支是不可达死代码，清空路径上对象从未被替换，`segmentContents` computed 自然不失效。

**修复：** 清空分支无条件替换新对象，强制触发引用变更：

```ts
watch([modelValue, locale, inferredGranularity], ([value]) => {
  if (!isNullish(value)) {
    segmentValues.value = { ...syncSegmentValues({ value, formatter }) };
    return;
  }

  // Replace the object even when there is no value: editing mutates the
  // `segmentValues` shallowRef in place, which never invalidates the
  // `segmentContents` computed. A fresh object forces a re-render so cleared
  // segments fall back to their placeholders.
  segmentValues.value = { ...segmentValues.value };
});
```

**验证：** Backspace 清空测试改用非受控模式（`defaultValue`）以确保 `update:modelValue: undefined` 确定性触发响应式 watch，`data-placeholder` 断言通过；日期族系回归 56/56 全绿确认 `date-picker` 内嵌 `DateFieldCompact` 不受影响。

### 3.2 Minor — D1-12 Compact 聚合：`leading`/`trailing` 插槽未透传

**问题：** UI 层 [date-field.vue](../../packages/ui/src/components/date-field/date-field.vue) 模板仅 `<DateFieldCompact v-bind="forwardedProps" v-on="listeners" />`，未显式转发 `leading`/`trailing` 插槽——调用方传入的头部/尾部插槽内容被 Vue **静默丢弃**（不报错、无插槽名声明）。

**处理：** 对照 `SSegment` 显式转发模式（`#item`/`#indicator`）补上两个命名插槽的透传：

```vue
<template>
  <DateFieldCompact v-bind="forwardedProps" v-on="listeners">
    <template #leading>
      <slot name="leading" />
    </template>
    <template #trailing>
      <slot name="trailing" />
    </template>
  </DateFieldCompact>
</template>
```

### 3.3 D7-11 — 单测覆盖不足（已扩展 6 → 24 项）

**问题：** 原 [date-field.spec.ts](../../packages/ui/test/specs/components/date-field.spec.ts) 仅 6 项，未覆盖分段渲染结构、键盘编辑、分段自动前进、清空、RTL、无效态、原生表单、axe。

**处理：** 扩展至 **24 项**，全部通过：

```bash
✓ test/specs/components/date-field.spec.ts (24 tests)
```

> 覆盖要点：**rendering 5 项**（默认分段 + class、datetime 时间分段、root slot props `{modelValue, segments, isInvalid}`、`leading`/`trailing` 插槽、无值 `data-placeholder`）；**state 5 项**（键盘输入 emit、ArrowUp 增、ArrowDown 减、受控 `setProps` 同步、非受控 `defaultValue`）；**keyboard 6 项**（左右方向键移动、RTL 反转、输入完整值自动前进、Backspace 清空、清空后重新提交）；**invalid 2 项**（`maxValue`、`isDateUnavailable` → `data-invalid`/`aria-invalid`）；**disabled/readonly 3 项**（disabled 无 tabindex、readonly 阻挡编辑、隐藏原生 input `type`/`name`/`required`/`min`/`max`）；**ui overrides 2 项**（`ui.root`、`ui.input`）；**a11y 2 项**（默认态 + datetime 态 axe 0 违规）。

### 3.4 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**问题：** en/zh 文档仅 `# / 概述 / 用法 / 演示 / API` 4 节，缺 Features、Component family、Notes（架构与行业对标）、FAQ。

**处理：** 重构为 8 节：Overview（含与 `SDatePicker`/`SCalendar` 的取舍）、Usage、Features（8 条 bullet）、Component family（`SDateField` + headless `DateFieldCompact`/`DateFieldRoot`/`DateFieldInput`）、Demos、API、Notes（架构链路 + **12 能力 × 6 库对标表** + 6 条 Cautions）、FAQ（5 组：清空、范围约束、12 小时制、与 `SDatePicker` 区别、自定义样式）。中英文结构一一对应。

---

## 四、架构与模式要点

### Compact 聚合：headless 拥有状态与组合，UI 保持薄透传

`DateFieldCompact`（headless）拥有 `DateFieldRoot` + 逐分段 `DateFieldInput` 的组合、默认内容与插槽出口；`SDateField` 仅计算 `dateFieldVariants` 并转发 props/插槽。本检查暴露并修复了 UI 薄透传层的两个典型坑：**插槽透传必须显式声明**（隐式 `v-bind` 不携带具名插槽）；**透传层不得改变子组件的响应式契约**（UI 层无状态，全部状态在 headless 侧）。

### shallowRef 语义与「编辑 + 清空」双路径

`segmentValues` 的 shallowRef 选型是对的（编辑逐段 mutation、不依赖深层追踪），但 watch 清空分支写成了依赖「全部为 null」整体替换的**死代码**，与「单段置 null」的实际清空路径脱节。修复后两条路径语义一致：**编辑 = 原地 mutation（随后提交）**，**清空 = 整体替换（触发渲染回退占位符）**。这也是「shallowRef 只关心 `.value` 整体替换」规范（vue-sfc-structure）在真实缺陷中的一次实战验证。

---

## 五、变更文件清单

| 文件                                                              | 变更类型                                                                                                                                                         |
| :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/date-field/date-field-root.vue` | **Major 修复**：watch 清空分支由「全部为 null 才整体替换」死代码 → 无条件替换 `{ ...segmentValues.value }` 触发 shallowRef 响应式                                |
| `packages/ui/src/components/date-field/date-field.vue`            | **Minor 修复**：显式转发 `leading`/`trailing` 命名插槽（对照 SSegment 模式），插槽不再被静默丢弃                                                                 |
| `packages/ui/test/specs/components/date-field.spec.ts`            | 单测 6 → 24 项（rendering/state/keyboard/RTL/invalid/disabled-readonly/native-form/ui-override/a11y）；`mountDateField` helper + `DateFieldRoot` slot props 断言 |
| `apps/docs/src/docs/en/components/date-field.md`                  | 文档 4 节 → 8 节 Recommended structure（Component family + 12 能力 × 6 库对标表 + Cautions + FAQ）                                                               |
| `apps/docs/src/docs/zh-CN/components/date-field.md`               | 与 en 一一对应的 8 节中文化版本                                                                                                                                  |
| `docs/check.md`                                                   | C44 行 7 维度 ⏳ → ✅；新增 4.4 批次 3（P0 日期时间）记录表 + 批次合计                                                                                           |
| `docs/check-reports/C44-date-field.md`                            | **新建** 本审计报告                                                                                                                                              |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
pnpm test                               # date-field 24 项全绿；108/109 测试文件通过（icon.spec.ts 4 项为 HEAD 既有环境性失败，见 check.md 4.2）
cd packages/ui && pnpm exec vp test run date-field date-picker date-range-field date-range-picker   # 日期族系回归 56/56
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                                          | 对标依据       | 说明                                                                                                                                      |
| :---------------------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `date-field` 独立浏览器 e2e                     | 自研标准       | 按 check.md 2.3.4 清单，`date-field`（C44-C49 族）属浮层/门户类，须补浏览器 e2e（真实键盘导航 + `type=date` 原生 input 提交），非 Blocker |
| 51 个 UI 层纯 `defineProps<T>()` 组件系统性排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C43 遗留）            |
