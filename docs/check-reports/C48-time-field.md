# C48 `time-field` 检查优化报告

> **组件编号：** C48（`time-field`）
> **组件名称：** `STimeField`（headless 基座：`TimeFieldCompact` = `TimeFieldRoot` + 每段一个 `TimeFieldInput` 数据驱动组合，绑定 `date-field` 族共享的 `useDateField` 组合式；UI 层复用 `dateFieldVariants`（与 `SDateField` 共享，styles 目录无独立 time-field 配方））
> **模式：** 多槽 + Compact（`root`/`input`，另有 `leading`/`trailing` 插槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04

---

## 一、执行摘要

对 `time-field` 完成全维度审计。headless 链路：`TimeFieldRoot` 为状态所有者——经 `useControllableState` 持有 `TimeValue`，以 shallowRef 维护 `segmentValues`，经 `isInvalid` 完成校验（含 `isTimeUnavailable`/`minValue`/`maxValue`），渲染一个视觉隐藏 `input[type="time"]`；`TimeFieldCompact` 遍历 `createContent` 生成的分段并渲染 `TimeFieldInput`（绑定 `useDateField`）。焦点移动由 Root 的 `moveFocus` 处理（delta 含 `dir` 符号，RTL 天然兼容）。

**发现 Minor ×1**，已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                            |
| :---------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Minor 修复**（D1-12 Compact 聚合一致性）：`TimeFieldCompact` 缺 `leading`/`trailing` 插槽 → 补齐并转发。**核查**：C44 同款 watch 清空死代码**不存在**（watch null 分支无条件替换新对象）；受控/非受控、校验、禁用/只读、隐藏输入均正确        |
| D2 行业对标 |  ✅  | 分段 spinbutton + 键盘增减/键入的模式对标库多为「纯文本框 + 选择面板」。**核查**：UI 层 `forwardedProps` 排除列表（`class`/`size`/`ui`）完整，无 props 泄漏；`dateFieldVariants` 复用与 `TimeFieldUiSlot`（root/input）匹配                     |
| D3 API 设计 |  ✅  | `granularity`（hour/minute/second）、`hourCycle`（12/24）、`step`、`minValue`/`maxValue`/`isTimeUnavailable`、`name`/`required` 表单语义、`TimeValue` 类型对齐 `@internationalized/date`（D3-01/D3-04）；UI 层 `S` 前缀（D3-09）                |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`TimeFieldRootProps extends Omit<DateFieldRootProps, ...>` + `TimeValue` 值类型（D4-03/D4-05）；新增 `TimeFieldCompactSlots`（`leading`/`trailing`）与 UI 层 `TimeFieldSlots` 具名插槽类型齐全；`export type *` 自动导出 |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；UI 层 `STimeField` 显式具名模板转发插槽（与 C44 后 `SDateField` 一致）                                                                                              |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（13 能力 × 6 库）+ 6 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                            |
|   D7 其他   |  ✅  | 单测 5 → 24 项全通过（含 RTL 方向反转、ArrowUp 递增、Backspace 清空 emit undefined、hidden input、axe 默认态 + 12 小时制态 0 违规）；日期族系回归 106/106 全通过                                                                                |

---

## 二、行业对标矩阵

> `time-field` 是**分段 spinbutton + 键盘编辑**模式。AntD/Element Plus/Naive UI 用「文本框 + 选择面板」（或 select 列表）；Mantine 用掩码文本框；shadcn 无时间字段。SoybeanUI 的分段键盘编辑、段导航 + RTL 反转、`isTimeUnavailable` 与 headless/styled 分离为差异点。

| 能力                        | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :-------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离        |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 分段可编辑                  |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 受控 / 非受控               |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 12/24 小时制                |    ✅     |     ✅     |      ✅      |    —    |    ✅    |   —    |
| 键盘增减 / 键入             |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 段导航 + RTL                |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 范围校验                    |    ✅     |     ✅     |      —       |    —    |    —     |   —    |
| `isTimeUnavailable`         |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 粒度（秒）                  |    ✅     |     ✅     |      ✅      |    —    |    ✅    |   —    |
| 可配置步长                  |    ✅     |     ✅     |      ✅      |    —    |    —     |   —    |
| 原生表单值                  |    ✅     |     —      |      —       |   ✅    |    —     |   —    |
| `leading` / `trailing` 插槽 |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 禁用 / 只读                 |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |

---

## 三、发现的问题与处理

### 3.1 Minor — D1-12 `TimeFieldCompact` 缺 `leading`/`trailing` 插槽（与 `DateFieldCompact` 不一致）

**现象：** `STimeField` 使用方传入 `leading`/`trailing` 插槽内容被静默丢弃；无法在时间分段两侧放置前后缀（如时钟图标、清除按钮）。

**根因：** `DateFieldCompact`（C44 修复后）模板显式承载 `<slot name="leading" />`/`<slot name="trailing" />`，而 `TimeFieldCompact` 的模板只有 `TimeFieldInput` v-for——两组件共享同一骨架但 TimeField 复制时漏掉了插槽（`TimeFieldCompactProps extends TimeFieldRootProps`，独立于 `DateFieldCompactProps`）。

**修复：** 三层补齐：

1. headless `time-field-compact.vue` 模板：v-for 前后补 `<slot name="leading" />`/`<slot name="trailing" />`（与 `DateFieldCompact` 完全一致）
2. headless `types.ts`：新增 `TimeFieldCompactSlots = { leading?; trailing? }` 并 `defineSlots`，从组件 index 导出
3. UI `time-field.vue`：显式具名模板转发 + `TimeFieldSlots` 类型（`export type *` 自动导出）

**验证：** 新增测试「renders the leading slot before the time segments」+「renders the trailing slot after the time segments」（断言内容渲染在 `[data-soybean-time-field-root]` 内）。

### 3.2 核查结论 — C44/C42 同款风险不存在（D1-08/D2-11）

- **C44 同款 watch 清空死代码：不存在。** `time-field-root.vue` 的 `watch([modelValue, locale, inferredGranularity])` null 分支为 `segmentValues.value = { ...syncTimeSegmentValues({ value: placeholder.value, formatter }) }`——**每次生成新对象**，shallowRef 引用变更必然触发 `segmentContents` computed 失效，无死代码。
- **C42 同款缺省 Boolean cast 风险：不存在。** `TimeFieldRoot` 的 `withDefaults` 中 `disabled: false`/`readonly: false`/`hideTimeZone: false`，无默认 `true` 的 Boolean prop；`required`（`FormFieldCommonProps`）无默认，被 cast 为 `false` 后透传语义等价。UI 层纯 `defineProps<TimeFieldProps>()` 在此组件上无实际影响。

### 3.3 设计确认 — 清空值后段回显占位时间（非缺陷）

**现象：** Backspace 清空某段后，段显示占位时间数值（如 `9:30`）而非 `data-placeholder` 占位符样式——与 `date-field` 清空后显示 `data-placeholder` 的行为不同。

**分析：** `deleteValue` 对一位段置 `modelValue.value = undefined` 并返回 `null` → watch 触发 → null 分支回填 `syncTimeSegmentValues({ value: placeholder })`，placeholder 为 `defaultValue` 的副本（`9:30`）→ 段显示占位时间。这与 `date-field` 的初始全 null 占位不同，但**与 time-field 自身初始化行为一致**（`segmentValues` 初始即由 placeholder 同步，空值显示占位时间）。这是 reka-ui `TimeField` 的标准行为——placeholder 即显示值，提交时表单值仍为空。

**结论：** 非缺陷。单测断言「清空后 emit `undefined` + 段回显占位值」而非 `data-placeholder`。

### 3.4 D7-11 — 单测覆盖不足（已扩展 5 → 24 项）

**处理：** 重写 [time-field.spec.ts](../../packages/ui/test/specs/components/time-field.spec.ts) 至 **24 项**，全部通过：

```bash
✓ test/specs/components/time-field.spec.ts (24 tests)
```

> 覆盖要点：**rendering 6 项**（默认 hour/minute + class、`granularity: 'second'` 的 second/dayPeriod 段、12 小时制 dayPeriod 文本、`leading` 插槽、`trailing` 插槽、隐藏 `input[type="time"]` 值 + name + tabindex）；**state 5 项**（键盘编辑 emit、受控外部同步、非受控 `defaultValue`、`minValue` 无效、`isTimeUnavailable` 无效）；**keyboard 4 项**（ArrowUp 递增、ArrowRight 段间移动、RTL 方向反转、Backspace 清空 emit undefined）；**disabled/readonly 3 项**（禁用 + tabindex、只读阻止编辑、隐藏 input disabled + required）；**ui overrides 3 项**（`ui.root`/`ui.input`/size 变体）；**a11y 3 项**（默认态 + 12 小时制态 axe 0 违规、分段 locale aria-label）。

### 3.5 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（与 `SDateField`/`STimeRangeField` 取舍）、Usage、Features（9 条 bullet）、Component family（`STimeField` + headless `TimeFieldCompact`/`TimeFieldRoot`/`TimeFieldInput`）、Demos、API、Notes（架构链路 + **13 能力 × 6 库对标表** + 6 条 Cautions）、FAQ（5 组：键盘编辑、秒/分钟分段控制、12/24 小时制切换、时间范围约束、与 `SDateField` 区别）。中英文结构一一对应。

---

## 四、架构与模式要点

### Compact 聚合插槽是模板级复制缺陷的高发点

`DateFieldCompact`/`TimeFieldCompact`/`DateRangeFieldCompact` 共享「Root + Input v-for」骨架，但插槽承载（`leading`/`trailing`/`separator`）在复制时**逐个遗漏**：C44 修 `date-field` 的 UI 层转发、C46 修 `date-range-field`（本身完整）、C48 修 `time-field` compact 本体缺失。审查任一字段类 Compact 时必须核对：①模板是否渲染插槽；②类型是否声明；③UI 层是否转发。`time-range-field`（C49）与 `date-range-field` 结构更近，按此清单逐项核验。

### 清空语义按组件族有差异——审查时区分「死代码」与「设计行为」

C44/C46 的 watch 清空死代码（条件分支不可达）是真实缺陷；time-field 的「清空后回填占位时间」是**可达且有意**的设计（与自身初始化一致，reka-ui 标准）。判定标准：watch 分支是否**必然执行**且**替换新对象**（引用变更），而非分支内容是否产生 `data-placeholder`。

### 12/24 小时制与 `aria-valuemin/max` 联动

`hourCycle` 不传时按 `formatter.getLocale()` 推断；12 小时制下 `aria-valuemin=1`/`max=12` 且 dayPeriod 段可编辑（`a`/`p` 切换）。测试须覆盖 12 小时制态（显示 `PM`、dayPeriod 段存在、axe 无违规）。

---

## 五、变更文件清单

| 文件                                                                 | 变更类型                                                                                                                   |
| :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/time-field/time-field-compact.vue` | **Minor 修复**：模板补 `<slot name="leading" />`/`<slot name="trailing" />` + `defineSlots<TimeFieldCompactSlots>()`       |
| `packages/headless/src/components/time-field/types.ts`               | 新增 `TimeFieldCompactSlots` 类型                                                                                          |
| `packages/headless/src/components/time-field/index.ts`               | 导出 `TimeFieldCompactSlots`                                                                                               |
| `packages/ui/src/components/time-field/time-field.vue`               | `leading`/`trailing` 具名模板显式转发 + `defineSlots<TimeFieldSlots>()`                                                    |
| `packages/ui/src/components/time-field/types.ts`                     | 新增 `TimeFieldSlots` 类型                                                                                                 |
| `packages/ui/test/specs/components/time-field.spec.ts`               | 单测 5 → 24 项（rendering/state/keyboard/disabled/ui/a11y）；新增 leading/trailing 插槽、RTL、清空 emit、hidden input 断言 |
| `apps/docs/src/docs/en/components/time-field.md`                     | 文档 4 节 → 8 节 Recommended structure（Component family + 13 能力 × 6 库对标表 + Cautions + FAQ）                         |
| `apps/docs/src/docs/zh-CN/components/time-field.md`                  | 与 en 一一对应的 8 节中文化版本                                                                                            |
| `docs/check.md`                                                      | C48 行 7 维度 ⏳ → ✅；4.4 批次 3 记录表追加 C48 行 + 批次合计更新（5 单元，单测 6 → 123 项）                              |
| `docs/check-reports/C48-time-field.md`                               | **新建** 本审计报告                                                                                                        |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run time-field       # 24/24 全绿
cd packages/ui && pnpm exec vp test run                  # 1399 项中 1395 通过；icon.spec.ts 4 项为 HEAD 既有环境性失败（见 check.md 4.2）
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                                          | 对标依据       | 说明                                                                                                                               |
| :---------------------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `time-field` 独立浏览器 e2e                     | 自研标准       | 按 check.md 2.3.4 清单，属表单输入类，须补浏览器 e2e（真实键盘编辑 + 12/24 小时制 + 表单提交），非 Blocker                         |
| `time-range-field`（C49）Compact 插槽清单核验   | 共享组件       | 按「模板渲染插槽 → 类型声明 → UI 层转发」三步清单核验 `TimeRangeFieldCompact` 的 `leading`/`separator`/`trailing` 插槽完整性       |
| 51 个 UI 层纯 `defineProps<T>()` 组件系统性排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C42-C45 遗留） |
