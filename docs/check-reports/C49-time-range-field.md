# C49 `time-range-field` 检查优化报告

> **组件编号：** C49（`time-range-field`）
> **组件名称：** `STimeRangeField`（headless 基座：`TimeRangeFieldCompact` = `TimeRangeFieldRoot` + 双组 `TimeRangeFieldInput` 数据驱动组合，start/end 各一组段绑定共享 `useDateField` 组合式；UI 层复用 `dateRangeFieldVariants`（与 `SDateRangeField` 共享，styles 目录 `time-range-field.ts` 为 re-export））
> **模式：** 多槽 + Compact（`root`/`input`/`startRoot`/`endRoot`/`separator`，另有 `leading`/`separator`/`trailing` 插槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04

---

## 一、执行摘要

对 `time-range-field` 完成全维度审计。headless 链路：`TimeRangeFieldRoot` 为状态所有者——经 `useControllableState` 持有 `TimeRange`，以两个 shallowRef 维护 `startSegmentValues`/`endSegmentValues`，经 `isInvalid` 完成范围校验（含 end 早于 start、`minValue`/`maxValue`/`isTimeUnavailable`），渲染两个视觉隐藏 `input[type="time"]`（`startName`/`endName`）；`TimeRangeFieldCompact` 以 start/end 两组循环渲染 `TimeRangeFieldInput`（绑定 `useDateField`），并承载 `leading`/`separator`/`trailing` 插槽。跨组焦点移动由 Root 的 `moveFocus` 处理（delta 含 `dir` 符号，RTL 天然兼容组内；跨界按物理方向判断）。

**发现 Major ×1 + Minor ×1**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | **Minor 修复**（D1-09 样式配方）：`styles/time-range-field.ts` 首行缺 `// @unocss-include` → 补注释。**核查**：C44/C46 同款 watch 清空死代码**不存在**（start/end 两个 watch null 分支均无条件替换新对象）；headless 无硬编码样式（`:class` 均为 UiContext 注入）   |
| D2 行业对标 |  ✅  | 双组分段 + 跨组焦点移动 + RTL 反转的模式对标库多为「两个独立文本框」。**Major 修复**（D2-11 RTL 跨组焦点）：`moveFocus` 跨界分支原按 `direction` 判断（与 C46 修复前同款），RTL 下物理方向反转后分支不匹配，跨组焦点在 RTL 下完全失效 → 跨界条件改为基于 delta 符号 |
| D3 API 设计 |  ✅  | `startName`/`endName` 独立表单字段命名、`separator` prop 默认 `–` + `separator` 插槽、`inputProps` 逐段透传、`TimeRange` 双值类型对齐 `@internationalized/date`、受控/非受控 `useControllableState`（D3-01/D3-04）；UI 层 `S` 前缀（D3-09）                         |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`TimeRangeFieldRootProps extends Omit<TimeFieldRootProps, 'defaultValue'\|'modelValue'>` + `TimeRange` 双值（D4-03/D4-05）；`TimeRangeFieldCompactSlots`（`leading`/`separator`/`trailing`）与 UI 层 `TimeRangeFieldSlots` 具名插槽类型齐全  |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；UI 层使用**动态插槽转发**（`slotNames` computed）——与 C46 同款正确模式                                                                                                                  |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（12 能力 × 6 库）+ 7 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                                                |
|   D7 其他   |  ✅  | 单测 8 → 27 项全通过（含正向/反向跨界焦点、RTL 方向反转、Backspace 清空 emit undefined、双隐藏输入、只读、axe 默认态 + 12 小时制态 0 违规）；日期族系回归 101/101 + 全量 UI 单测 1432/1432 全通过                                                                   |

---

## 二、行业对标矩阵

> `time-range-field` 是**双组分段输入 + 跨组焦点移动**模式。AntD/Element Plus/Naive UI 用「两个独立文本框」（或带 `separator` 的单框）；Mantine 用双输入；shadcn 无时间范围字段。SoybeanUI 的双分段组 + 组边界方向键跨界（RTL 反转）+ 双原生表单值为差异点。

| 能力                    | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :---------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离    |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 双组分段可编辑组        |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 跨组焦点移动            |    ✅     |     —      |      —       |    —    |    —     |   —    |
| RTL 方向反转            |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 受控 / 非受控           |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 键盘增减 / 键入         |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 范围校验（start ≤ end） |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| `isTimeUnavailable`     |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 粒度（秒）              |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 双原生表单值            |    ✅     |     ✅     |      ✅      |   ✅    |    —     |   —    |
| 分隔符 prop / 插槽      |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 禁用 / 只读             |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |

---

## 三、发现的问题与处理

### 3.1 Major — D2-11 RTL 下跨组焦点移动完全失效（`moveFocus` 按 `direction` 判断跨界，与 C46 修复前同款）

**现象：** LTR 下从 start 组末段按 `ArrowRight` 可进入 end 组；RTL 下从 start 组末段按 `ArrowLeft`（物理前进）**无法**跨界到 end 组；RTL 下从 end 组首段按 `ArrowRight`（物理后退）也无法返回 start 组。

**根因：** `time-range-field-root.vue` 的 `moveFocus` 跨界分支按 `direction`（语义方向）判断：

```ts
} else if (direction === 'next' && type === 'start' && endSegmentElements.value.length > 0) {
  focusedType.value = 'end';
  endSegmentElements.value[0]?.focus();
} else if (direction === 'prev' && type === 'end' && startSegmentElements.value.length > 0) {
  focusedType.value = 'start';
  startSegmentElements.value[startSegmentElements.value.length - 1]?.focus();
}
```

`direction` 直接来自按键（`ArrowRight → 'next'`），未考虑 `dir === 'rtl'` 时物理方向反转：RTL 中 `ArrowLeft` 的 `direction` 是 `'prev'`，但 `delta = -sign = +1` **物理前进**——从 start 组末越界时应进入 end 组，`direction === 'next'` 分支不匹配 → 跨界逻辑整体跳过。这是 C46 在 `date-range-field` 中修复的同一缺陷在 `time-range-field` 复制骨架时遗留（C46 修复后未同步回本组件）。

**修复：** 跨界条件改为基于 **delta 符号**（物理方向）而非 `direction`（与 C46 同模式）：

```ts
} else if (delta > 0 && type === 'start' && endSegmentElements.value.length > 0) {
  // Exited the end of the start group: ArrowRight in LTR, ArrowLeft in RTL.
  focusedType.value = 'end';
  endSegmentElements.value[0]?.focus();
} else if (delta < 0 && type === 'end' && startSegmentElements.value.length > 0) {
  // Exited the beginning of the end group: ArrowLeft in LTR, ArrowRight in RTL.
  focusedType.value = 'start';
  startSegmentElements.value[startSegmentElements.value.length - 1]?.focus();
}
```

**验证（测试驱动）：** 重写 spec 后新增 3 项跨界焦点测试——「crosses from the start group into the end group on ArrowRight」（LTR 正向）、「moves focus from the end group back to the start group on ArrowLeft」（LTR 反向）、「reverses arrow direction in RTL」（RTL 下 start 组末段 `ArrowLeft` 跨界到 end 组）。修复前 RTL 项失败（`expected null not to be null`），修复后 27/27 全绿。

### 3.2 Minor — D1-09 `styles/time-range-field.ts` 首行缺 `// @unocss-include`

**现象：** [time-range-field.ts](../../packages/ui/src/styles/time-range-field.ts) 仅 `export { dateRangeFieldVariants as timeRangeFieldVariants } from './date-range-field'`，首行无 `// @unocss-include` 注释（recipe 本体在 `date-range-field.ts` 中已有该注释，无实际编译影响，但与 D1-09 字面标准不符，且同目录其他配方文件均以此注释开头）。

**修复：** 首行补 `// @unocss-include`。

### 3.3 核查结论 — C44/C46 同款风险不存在（D1-08/D2-11）

- **C44/C46 同款 watch 清空死代码：不存在。** `time-range-field-root.vue` 的 start/end 两个 watch null 分支均为 `{ ...syncTimeSegmentValues({ value: placeholder.value, formatter }) }`——**每次生成新对象**，shallowRef 引用变更必然触发 `startSegmentContents`/`endSegmentContents` computed 失效，无死代码。
- **C48 遗留插槽清单核验：通过。** 按「模板渲染插槽 → 类型声明 → UI 层转发」三步核验 `TimeRangeFieldCompact`：①模板渲染 `<slot name="leading" />`/`<slot name="separator">`（含默认内容 `{{ separator }}`）/`<slot name="trailing" />` ✓；②`TimeRangeFieldCompactSlots` 声明 `leading`/`trailing`/`separator` 并从 index 导出 ✓；③UI 层 `SDateRangeField` 同款动态插槽转发（`slotNames` computed + `v-for` 具名模板）✓。
- **C42 同款缺省 Boolean cast 风险：不适用。** `TimeRangeFieldRoot` 的 `withDefaults` 中 `disabled: false`/`readonly: false`/`hideTimeZone: false`，无默认 `true` 的 Boolean prop；UI 层纯 `defineProps<TimeRangeFieldProps>()` 与该族其他组件（C46/C47/C48）同款，已列入「51 个 UI 层纯 `defineProps<T>()` 组件系统性排查」统一遗留项。

### 3.4 设计确认 — 清空值后段回显占位时间（非缺陷）

**现象：** Backspace 清空 start 侧某段后，emit `update:modelValue` 的 `start` 为 `undefined`，段显示占位时间数值（而非 `data-placeholder` 样式）。

**分析：** 与 `time-field`（C48 §3.3 设计确认）一致——`deleteValue` 置 `modelValue.value = { ...modelValue.value, start: undefined }` → watch 触发 → null 分支回填 `syncTimeSegmentValues({ value: placeholder })`，placeholder 为默认时间副本 → 段显示占位时间。这是 reka-ui `TimeField` 的标准行为——placeholder 即显示值，提交时表单值仍为空。

**结论：** 非缺陷。单测断言「清空后 emit `start: undefined`」。

### 3.5 D7-11 — 单测覆盖不足（已扩展 8 → 27 项）

**处理：** 重写 [time-range-field.spec.ts](../../packages/ui/test/specs/components/time-range-field.spec.ts) 至 **27 项**，全部通过：

```bash
✓ test/specs/components/time-range-field.spec.ts (27 tests)
```

> 覆盖要点：**rendering 6 项**（class + 双组、second 粒度、`separator` prop、`separator` 插槽、`leading`/`trailing` 插槽、双隐藏输入 `startName`/`endName`/`required`/`tabindex`）；**state 6 项**（编辑 emit、end<start 无效、受控外部同步、非受控 `defaultValue`、`isTimeUnavailable` 无效、`maxValue` 无效）；**keyboard 6 项**（ArrowUp 递增、组内 ArrowRight 移动、正向右跨界、反向左跨界、RTL 反转跨界、Backspace 清空 emit undefined）；**disabled/readonly 3 项**（禁用 + tabindex、只读阻止编辑 + `aria-readonly`、隐藏 input disabled/required）；**ui overrides 3 项**（`ui.root`/`ui.input`/`ui.separator`/size 变体）；**a11y 3 项**（默认态 + 12 小时制态 axe 0 违规、`role="group"`）。

### 3.6 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（与 `STimeField`/`SDateRangeField`/`SDateRangePicker` 取舍）、Usage、Features（9 条 bullet）、Component family（`STimeRangeField` + headless `TimeRangeFieldCompact`/`TimeRangeFieldRoot`/`TimeRangeFieldInput`）、Demos、API、Notes（架构链路 + **12 能力 × 6 库对标表** + 7 条 Cautions）、FAQ（5 组：键盘编辑、秒分段、分隔符自定义、范围约束、与 `SDateRangeField` 区别）。中英文结构一一对应。

---

## 四、架构与模式要点

### 跨界焦点判断应基于物理方向（delta），而非语义方向（direction）—— 复制骨架时的系统性风险

C46 修复 `date-range-field` 的 `moveFocus` 后，`time-range-field`（复制同骨架）仍保留旧的 `direction` 判断。这证明：**双组/多组共享骨架的组件族中，单点修复不会自动传播**——凡涉及「组/面板边界越界」的跳转，审查时必须逐一核验 `delta` 符号判断是否落地。`direction`（'next'/'prev'）是按键语义，`delta` 是经 `dir` 修正后的物理移动方向；组内移动（`currentSegmentIndex + delta`）天然兼容 RTL，但跨界分支必须落在 `delta` 符号上。`time-range-picker`（C47）复用 `DateRangeFieldRoot`（已修复），`time-range-picker` 的 Compact 若自行实现跨界需回归核验。

### shallowRef 原地变更陷阱的双组核验

`TimeRangeFieldRoot` 维护**两个** `segmentValues` shallowRef，各配一个 watch。本组件两个 watch 的清空分支均为无条件替换新对象（`{ ...syncTimeSegmentValues(...) }`），无 C44/C46 同款死代码——但审查时必须对**每个** watch 逐一核验「条件分支在目标场景下是否可达且替换新对象」。

### Compact 插槽三步清单（C48 遗留项落地）

`TimeRangeFieldCompact` 按「模板渲染插槽 → 类型声明 → UI 层转发」三步核验通过——`leading`/`separator`/`trailing` 齐全，且 UI 层使用动态插槽转发（`slotNames` computed），无需手工补转发。

---

## 五、变更文件清单

| 文件                                                                          | 变更类型                                                                                                                                                                          |
| :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/time-range-field/time-range-field-root.vue` | **Major 修复**（D2-11 RTL 跨组焦点）：`moveFocus` 跨界条件由 `direction` 改为 delta 符号（与 C46 同模式）                                                                         |
| `packages/ui/src/styles/time-range-field.ts`                                  | **Minor 修复**（D1-09）：首行补 `// @unocss-include` 注释                                                                                                                         |
| `packages/ui/test/specs/components/time-range-field.spec.ts`                  | 单测 8 → 27 项（rendering/state/keyboard/disabled/ui/a11y）；新增跨界焦点、RTL 反转、清空 emit undefined、双隐藏输入、只读、12 小时制态 axe 断言；修复 `Time.toString()` 断言格式 |
| `apps/docs/src/docs/en/components/time-range-field.md`                        | 文档 4 节 → 8 节 Recommended structure（Component family + 12 能力 × 6 库对标表 + Cautions 7 条 + FAQ 5 组）                                                                      |
| `apps/docs/src/docs/zh-CN/components/time-range-field.md`                     | 与 en 一一对应的 8 节中文化版本                                                                                                                                                   |
| `docs/check.md`                                                               | C49 行 7 维度 ⏳ → ✅；第 3 轮标记 ✅ 已完成；4.4 批次 3 记录表追加 C49 行 + 批次合计更新（6 单元，单测 51 → 150 项）                                                             |
| `docs/check-reports/C49-time-range-field.md`                                  | **新建** 本审计报告                                                                                                                                                               |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run time-range-field      # 27/27 全绿
cd packages/ui && pnpm exec vp test run time-range-field date-field date-range-field time-field  # 日期族系 101/101 全绿
cd packages/ui && pnpm exec vp test run                       # 全量 1432/1432 全绿
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 2.3.4）

| 增强项                                    | 对标依据       | 说明                                                                                                                                   |
| :---------------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `time-range-field` 独立浏览器 e2e         | 自研标准       | 按 check.md 2.3.4 清单，`time-range-field` 属浮层/表单输入类，须补浏览器 e2e（真实键盘跨组焦点移动 + RTL 场景 + 表单提交），非 Blocker |
| 双组共享骨架组件族跨界焦点回归            | 共享组件       | `moveFocus` 跨界修复与 C46 为同模式，`time-range-picker` 在检查时须回归 RTL 跨界场景（其内部若复用 `DateRangeFieldRoot` 则已含修复）   |
| 51 个 UI 层纯 `defineProps<T>()` 组件排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C42-C48 遗留）     |
