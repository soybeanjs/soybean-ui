# C46 `date-range-field` 检查优化报告

> **组件编号：** C46（`date-range-field`）
> **组件名称：** `SDateRangeField`（headless 基座：`DateRangeFieldCompact` = `DateRangeFieldRoot` + 双组 `DateRangeFieldInput` 数据驱动组合，start/end 双 `DateRangeFieldInput` 绑定共享 `useDateField` 组合式；`scv()` 配方 `dateRangeFieldVariants` extends `dateFieldVariants`）
> **模式：** 多槽 + Compact（`root`/`input`/`startRoot`/`endRoot`/`separator`，另有 `leading`/`trailing`/`separator` 插槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-09

---

## 一、执行摘要

对 `date-range-field` 完成全维度审计。headless 链路：`DateRangeFieldRoot` 为状态所有者——经 `useControllableState` 持有 `{ start, end }`，为两组维护独立 `startSegmentValues`/`endSegmentValues` shallowRef，经 `isInvalid` 完成校验（含 start 晚于 end 检查），渲染两个视觉隐藏原生输入；`DateRangeFieldCompact` 以 start/end 两组循环渲染 `DateRangeFieldInput`（绑定 `time-field` 族共享的 `useDateField`），并承载 `separator`/`leading`/`trailing` 插槽。UI 层 `SDateRangeField` 用动态插槽转发（`v-for="slotName in slotNames"`）透传所有具名插槽，并注入 `dateRangeFieldVariants` 类。

**发现 Major ×2**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                               |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-08/D2-11 响应式）：start/end 两个 watch 的清空分支与 C44 同款死代码——仅在「全部为 null」时整体替换，原地变更 shallowRef 不失效 `segmentContents` computed → 无条件替换新对象。受控/非受控、范围校验、禁用/只读、双隐藏输入提交均正确            |
| D2 行业对标 |  ✅  | 双组分段 + 跨组焦点移动 + RTL 反转的模式对标库多为「两个独立文本框」。**Major 修复**（D2-11 RTL 跨组焦点）：`moveFocus` 跨界分支仅按 `direction` 判断，RTL 下物理方向反转后分支不匹配，跨组焦点在 RTL 下完全失效 → 跨界条件改为基于 delta 符号                     |
| D3 API 设计 |  ✅  | `startName`/`endName` 独立表单字段命名、`separator` prop 默认 `–` + `separator` 插槽、`inputProps` 逐段透传、`DateRange` 类型值对齐 `@internationalized/date`（D3-01/D3-04）；UI 层 `S` 前缀（D3-09）                                                              |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`DateRangeFieldRootProps extends Omit<DateFieldRootProps, 'modelValue'\|'defaultValue'>` + `DateRange` 双值（D4-03/D4-05）；`DateRangeFieldCompactSlots`（`leading`/`trailing`/`separator`）与 UI 层 `DateRangeFieldSlots` 具名插槽类型齐全 |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；UI 层使用**动态插槽转发**（`slotNames` computed）——与 C44 需手工补 `leading`/`trailing` 转发相比为正确模式                                                                             |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（12 能力 × 6 库）+ 6 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                                               |
|   D7 其他   |  ✅  | 单测 8 → 26 项全通过（含正向/反向跨组焦点、RTL 方向反转、清空后 `data-placeholder` 刷新、双隐藏输入、axe 默认态 + datetime 态 0 违规）；axe 0 违规；日期族系回归 56/56 全通过                                                                                      |

---

## 二、行业对标矩阵

> `date-range-field` 是**双组分段输入 + 跨组焦点移动**模式。AntD/Element Plus/Naive UI 用「两个独立文本框」（或带 `separator` 的单框）；Mantine 用双输入；shadcn 无日期范围字段。SoybeanUI 的双分段组 + 组边界方向键跨界（RTL 反转）+ 双原生表单值为差异点。

| 能力                    | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :---------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离    |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 双组分段可编辑组        |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 跨组焦点移动            |    ✅     |     —      |      —       |    —    |    —     |   —    |
| RTL 方向反转            |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 受控 / 非受控           |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 键盘增减 / 键入         |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 范围校验（start ≤ end） |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| `isDateUnavailable`     |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 粒度（分/秒）           |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 双原生表单值            |    ✅     |     ✅     |      ✅      |   ✅    |    —     |   —    |
| 禁用 / 只读             |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 分隔符 prop / 插槽      |    ✅     |     —      |      —       |    —    |    —     |   —    |

---

## 三、发现的问题与处理

### 3.1 Major — D1-08/D2-11 start/end 两个 watch 清空分支死代码（与 C44 同款 shallowRef 陷阱）

**现象：** 清空（Backspace 删除）某个分段的数字后，该组其他分段残留旧值、`data-placeholder` 不刷新；再次提交新值时旧值混入。

**根因：** `date-range-field-root.vue`（[date-range-field-root.vue](../../packages/headless/src/components/date-range-field/date-range-field-root.vue)）的 `startSegmentValues`/`endSegmentValues` 均为 `shallowRef`，编辑逻辑（`useDateField`）原地变更其内部字段。两个 watch 的清空分支原写法：

```ts
if (Object.values(startSegmentValues.value).every(item => item !== null)) {
  startSegmentValues.value = { ...initializeSegmentValues(inferredGranularity.value) };
}
```

「全部非 null」条件在**清空场景恒为 false**（清空就是把某段置 null）——死代码。原地 mutation 不触发 shallowRef 的引用变更，`startSegmentContents`/`endSegmentContents` computed 永不失效，UI 停留在旧值。

**修复：** 两个 watch 的清空分支改为**无条件替换**以强制引用变更（与 C44 同一模式）：

```ts
watch([() => modelValue.value.start, locale, inferredGranularity], ([value]) => {
  if (!isNullish(value)) {
    startSegmentValues.value = { ...syncSegmentValues({ value, formatter }) };
    return;
  }

  // Replace the object even when there is no value: editing mutates the
  // `startSegmentValues` shallowRef in place, which never invalidates the
  // `startSegmentContents` computed. A fresh object forces a re-render so
  // cleared segments fall back to their placeholders.
  startSegmentValues.value = { ...startSegmentValues.value };
});
```

（end watch 同步处理。）

**验证：** 新增测试「deletes digits with Backspace and clears the start value」（清空后 `data-placeholder` 刷新）+「re-commits a new value after a segment was cleared」（清空后重提交正确值）。

### 3.2 Major — D2-11 RTL 下跨组焦点移动完全失效（`moveFocus` 按 `direction` 判断跨界）

**现象：** LTR 下从 start 组末段按 `ArrowRight` 可进入 end 组；RTL 下从 start 组末段按 `ArrowLeft`（物理前进）**无法**跨界到 end 组；RTL 下从 end 组首段按 `ArrowRight`（物理后退）也无法返回 start 组。

**根因：** `moveFocus` 的跨界分支按 `direction`（语义方向）判断：

```ts
} else if (direction === 'next' && type === 'start' && ...) {
  // 出 start 组末 → end 组
} else if (direction === 'prev' && type === 'end' && ...) {
  // 出 end 组头 → start 组
}
```

`direction` 直接来自按键（`ArrowRight → 'next'`），未考虑 `dir === 'rtl'` 时物理方向反转：RTL 中 `ArrowLeft` 的 `direction` 是 `'prev'`，但 `delta = -sign = +1` **物理前进**——从 start 组末越界时应进入 end 组，`direction === 'next'` 分支不匹配 → 跨界逻辑整体跳过。

**修复：** 跨界条件改为基于 **delta 符号**（物理方向）而非 `direction`：

```ts
const moveFocus = (type: 'start' | 'end', direction: 'next' | 'prev') => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const delta = direction === 'next' ? sign : -sign;
  const elements = type === 'start' ? startSegmentElements.value : endSegmentElements.value;
  const nextIndex = currentSegmentIndex.value + delta;

  if (nextIndex >= 0 && nextIndex < elements.length) {
    elements[nextIndex]?.focus();
  } else if (delta > 0 && type === 'start' && endSegmentElements.value.length > 0) {
    // Exited the end of the start group: ArrowRight in LTR, ArrowLeft in RTL.
    focusedType.value = 'end';
    endSegmentElements.value[0]?.focus();
  } else if (delta < 0 && type === 'end' && startSegmentElements.value.length > 0) {
    // Exited the beginning of the end group: ArrowLeft in LTR, ArrowRight in RTL.
    focusedType.value = 'start';
    startSegmentElements.value[startSegmentElements.value.length - 1]?.focus();
  }
};
```

**验证：** 新增测试「moves focus from the end group back to the start group on ArrowLeft」+「reverses arrow direction in RTL」（RTL 下 start 组末段 `ArrowLeft` 跨界到 end 组）。组内移动本身 RTL 已正确（`delta` 含 sign）。

> **排查过程（测试驱动）**：26 项单测中 2 项跨界失败。初判为测试选段错误（en-US 段序 month/day/year，需从组首/组末段跨界）——修正测试后反向跨界通过，但 RTL 仍失败；定位到 `moveFocus` 的 `direction` 分支未映射 RTL 物理方向，为真实缺陷。修复后 26/26 全绿。`date-field`（C44）的 `moveFocus` 为纯组内移动（`segmentElements[idx + delta]`，delta 含 sign），无跨界分支，不受影响。

### 3.3 D7-11 — 单测覆盖不足（已扩展 8 → 26 项）

**处理：** 重写 [date-range-field.spec.ts](../../packages/ui/test/specs/components/date-range-field.spec.ts) 至 **26 项**，全部通过：

```bash
✓ test/specs/components/date-range-field.spec.ts (26 tests)
```

> 覆盖要点：**rendering 6 项**（class + 双组、datetime 时段段、`separator` prop、`separator` 插槽、`leading`/`trailing` 插槽、无值 `data-placeholder`）；**state 7 项**（编辑 emit、ArrowUp 递增、end<start 无效、maxValue 无效、`isDateUnavailable` 无效、受控外部同步、非受控 `defaultValue`）；**keyboard 5 项**（正向右跨界、反向左跨界、RTL 反转、Backspace 清空 + `data-placeholder`、清空后重提交）；**disabled/readonly 3 项**（禁用 + tabindex、只读阻止编辑、双隐藏输入 `name`/`startName`/`endName`/`min`/`max`）；**ui overrides 3 项**（`ui.root`/`ui.input`/`ui.separator`）；**a11y 2 项**（默认态 + datetime 态 axe 0 违规）。

### 3.4 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（与 `SDateRangePicker`/`SDateField` 取舍）、Usage、Features（8 条 bullet）、Component family（`SDateRangeField` + headless `DateRangeFieldCompact`/`DateRangeFieldRoot`/`DateRangeFieldInput`）、Demos、API、Notes（架构链路 + **12 能力 × 6 库对标表** + 6 条 Cautions）、FAQ（5 组：跨组焦点移动、双表单提交、范围约束、与 `SDateRangePicker` 区别、自定义分隔符）。中英文结构一一对应。

---

## 四、架构与模式要点

### shallowRef 原地变更陷阱在双组分段中的放大

`DateRangeFieldRoot` 维护**两个** `segmentValues` shallowRef，各配一个 watch。C44 单组的清空分支死代码在此以 start/end 双份出现——审查时必须对每个 watch 逐一核验「条件分支在目标场景下是否可达」。无条件替换新对象（`{ ...value }`）是标准修法。

### 跨界焦点判断应基于物理方向（delta），而非语义方向（direction）

`direction`（'next'/'prev'）是**按键语义**，`delta` 是经 `dir` 修正后的**物理移动方向**。凡涉及「组/面板边界越界」的跳转（跨组、跨页），判断条件必须落在 `delta` 符号上，否则 RTL 下逻辑与物理错位。组内循环移动（`currentSegmentIndex + delta` 取模）则天然兼容 RTL。

### UI 层动态插槽转发（正确模式）

`SDateRangeField` 用 `slotNames = computed(() => keysOf(slots))` + `<template v-for="slotName in slotNames" #[slotName]><slot :name="slotName" /></template>` 自动转发全部具名插槽——相比 C44/C45 需逐个手工补 `leading`/`trailing` 转发，这是多槽 Compact 的推荐模式，后续组件可复用。

---

## 五、变更文件清单

| 文件                                                                          | 变更类型                                                                                                                                                             |
| :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/date-range-field/date-range-field-root.vue` | **Major 修复 ×2**：start/end 两个 watch 清空分支无条件替换新对象（C44 同款 shallowRef 陷阱）；`moveFocus` 跨界条件由 `direction` 改为 delta 符号（RTL 跨组焦点修复） |
| `packages/ui/test/specs/components/date-range-field.spec.ts`                  | 单测 8 → 26 项（rendering/state/keyboard/disabled/ui/a11y）；新增跨界焦点、RTL 反转、清空占位符、双隐藏输入断言                                                      |
| `apps/docs/src/docs/en/components/date-range-field.md`                        | 文档 4 节 → 8 节 Recommended structure（Component family + 12 能力 × 6 库对标表 + Cautions + FAQ）                                                                   |
| `apps/docs/src/docs/zh-CN/components/date-range-field.md`                     | 与 en 一一对应的 8 节中文化版本                                                                                                                                      |
| `docs/check.md`                                                               | C46 行 7 维度 ⏳ → ✅；4.4 批次 3 记录表追加 C46 行 + 批次合计更新（3 单元）                                                                                         |
| `docs/check-reports/C46-date-range-field.md`                                  | **新建** 本审计报告                                                                                                                                                  |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run date-range-field   # 26/26 全绿
cd packages/ui && pnpm exec vp test run               # 1367 项中 1363 通过；icon.spec.ts 4 项为 HEAD 既有环境性失败（见 check.md 4.2）
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                                          | 对标依据       | 说明                                                                                                                               |
| :---------------------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `date-range-field` 独立浏览器 e2e               | 自研标准       | 按 check.md 2.3.4 清单，`date-range-field` 属表单输入类，须补浏览器 e2e（真实键盘跨组焦点移动 + RTL 场景 + 表单提交），非 Blocker  |
| 跨组焦点逻辑回归                                | 共享组件       | `moveFocus` 跨界修复为 headless 共享逻辑，`date-range-picker`（C47）复用 `DateRangeFieldRoot`，检查时须回归 RTL 跨界场景           |
| 51 个 UI 层纯 `defineProps<T>()` 组件系统性排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C42-C45 遗留） |
