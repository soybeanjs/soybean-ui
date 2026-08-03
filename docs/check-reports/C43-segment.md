# C43 `segment` 检查优化报告

> **组件编号：** C43（`segment`）
> **组件名称：** `SSegment`（headless 基座：`SegmentCompact` = `TabsRoot` + `TabsList` + `TabsTrigger` + `TabsIndicator` 数据驱动组合；`scv()` 配方 `segmentVariants`（`tabsVariants` 别名））
> **模式：** 多槽（`root` / `list` / `trigger` / `indicator` / `indicatorContent`）
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-04

---

## 一、执行摘要

对 `segment` 完成全维度审计。headless `SegmentCompact` 是数据驱动的 Compact 聚合：迭代 `items`、转发 `listProps`/`triggerProps`/`indicatorProps`，由 `TabsRoot`（`useControllableState` + 受控/非受控）+ `TabsTrigger`（`RovingFocusGroup` 方向键导航/`loop` 循环/RTL 反转）+ `TabsIndicator`（resize observer + post-flush watch 异步布局测量）组合；UI 层 `SSegment` 为薄透传包装（`segmentVariants` 6 尺寸 × 2 方向 × 2 形状 × 2 填充）并调用 `provideTabsUi`。

**未发现 Blocker / Major 缺陷**：`segment-compact` 默认值运行时全部保留；指示器异步渲染为正常时序（挂载后一帧出现）；禁用/键盘/loop/RTL 行为均正确。补强单测 8 → 24 项 + 文档按 Recommended structure 重构；并承接 C42 结论修正，识别 51 个 UI 层纯 `defineProps<T>()` 组件的系统性风险：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                               |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 互斥单选 + 受控/非受控（`useControllableState`，D1-03）；roving-focus 方向键导航/`loop` 循环/RTL 反转（D1-08）；`aria-selected` + `data-state`（active/inactive）双通道反射；条目级 `disabled` 且 roving focus 自动跳过；指示器 `enableIndicator` 开关 + 异步布局测量（正常时序）；`useOmitProps` 均含 `class`（D1-10）；recipe 首行 `// @unocss-include`（D1-09） |
| D2 行业对标 |  ✅  | `segment` 为分段控件（segmented control）模式；AntD `Segmented`、Element Plus `ElSegmented`、Mantine `SegmentedControl`、Naive UI `NTabs type=segment` 均原生提供；shadcn 通常以 Tabs 表达。遗留增强：无                                                                                                                                                           |
| D3 API 设计 |  ✅  | `items` 数据驱动 + 泛型 `T extends SegmentOptionData`（D3-04）；`v-model`/`defaultValue`、`enableIndicator`/`unmountOnHide`/`loop`/`orientation`/`dir`/`fill` 命名对齐主流（D3-01）；`item`/`indicator` 插槽 + `ui` 5 槽类覆盖；UI 层 `S` 前缀（D3-09）                                                                                                            |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；props 全 interface + JSDoc（D4-03）；`SegmentCompactProps<T>` 泛型复用 `TabsRoot`/`TabsTrigger` props 组合；`SegmentOptionData` 单泛型约束（D4-05）                                                                                                                                                                                         |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；模板无 `props.xxx`（D5-14）；Compact 内 headless 无样式（`data-soybean-segment` 仅作测试钩子）                                                                                                                                                                                                                   |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（12 能力 × 6 库）+ 使用注意 + 5 组 FAQ；中英文结构完全对齐                                                                                                                                                                    |
|   D7 其他   |  ✅  | 单测 8 → 24 项全通过（渲染/选中态/指示器/禁用/键盘/RTL/样式/ui 覆盖/slot props/axe 双形态）；axe 0 违规；族系回归 segment/tabs/page-tabs/toggle-group 全通过；无独立浏览器 e2e，D7-19/20 由 happy-dom 单测覆盖（与 toggle/button 族系一致，非阻塞）                                                                                                                |

---

## 二、行业对标矩阵

> `segment` 是分段控件（segmented control）模式；唯一例外是 shadcn，其通常以 Tabs 表达同一交互，故 `—`。

| 能力                    | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :---------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离    |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 单选（互斥）            |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 受控 / 非受控           |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 数据驱动 items          |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 滑动指示器              |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| Roving focus 方向键     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |   —    |
| Loop 循环导航           |    ✅     |     —      |      —       |    —    |    —     |   —    |
| RTL 方向感知            |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 方向（竖排）            |    ✅     |     —      |      —       |   ✅    |    —     |   —    |
| 尺寸 × 形状 × 填充      |    ✅     |     —      |      —       |   ✅    |    —     |   —    |
| 条目级禁用              |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 自定义条目 / 指示器插槽 |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |

---

## 三、发现的问题与处理

### 3.1 D1-08 — 无功能缺陷（默认值 / 指示器 / 键盘均验证通过）

对三类疑似风险点逐一验证，结论均为**非缺陷**：

1. **`segment-compact` 默认值保留验证**：运行时探针 `wrapper.vm.$.props` 显示 `unmountOnHide`/`loop`/`enableIndicator` 均为 `true`。原因：`SegmentCompact` 与 UI 层 `SSegment` **均声明了 `withDefaults`**（字面量默认），无 C42 式「UI 纯 `defineProps` 透传 cast `false` 覆盖」问题——C43 无默认值缺陷。
2. **TabsIndicator 异步渲染时序**：`v-if="typeof indicatorStyle.size === 'number'"`，指示器经 resize observer + post-flush watch **异步测量**，同步挂载查询时 `find` 返回 `false` 是正常时序；`await nextTick()` 数次后 `exists: true` 即正常。测试 `renders the indicator by default after layout measurement` 用 `flushIndicator`（3 次 `nextTick`）覆盖此正常时序。
3. **禁用 / 键盘 / loop / RTL**：`tryFocusFirst` 自动跳过 disabled；`getDirectionAwareKey` RTL 反转方向；`wrapArray` 实现 loop 回绕——行为全部正确，单测 3.3/3.4 覆盖。

### 3.2 D7-11 — 单测覆盖不足（已扩展 8 → 24 项）

**问题：** 原 [segment.spec.ts](../../packages/ui/test/specs/components/segment.spec.ts) 仅 8 项，未覆盖选中态反射、受控同步、非受控 `defaultValue`、指示器开关/自定义、禁用、键盘导航、loop、RTL、样式变体、slot props、axe。

**处理：** 扩展至 **24 项**，全部通过：

```bash
✓ test/specs/components/segment.spec.ts (24 tests)
```

> 覆盖要点：渲染 4 项（triggers 数量、自定义 item slot `{label, active}`、class 合并、vertical 反射）；选中态 5 项（`aria-selected`、`data-state`、mousedown 后 emit、受控 `setProps` 同步、非受控 `defaultValue`）；指示器 3 项（默认渲染、`enableIndicator: false` 隐藏、自定义 indicator slot）；禁用 3 项（`data-disabled`、disabled 不 emit、**roving focus 跳过 disabled 并回绕**）；键盘 3 项（ArrowRight 移动、loop 回绕、RTL ArrowLeft 前进）；样式 4 项（`fill="full"` → `items-stretch`、`size="lg"` → `text-base`、`ui.trigger` 覆盖、slot 暴露 `value`/`disabled`）；axe 2 形态（横排 + 竖排）。

### 3.3 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**问题：** en/zh 文档仅 `# / 概述 / 用法 / 演示 / API` 4 节，缺 Features、Component family、Notes（架构与行业对标）、FAQ。

**处理：** 重构为 8 节：Overview（含与 `SToggleGroup`/`STabs` 的取舍）、Usage、Features（8 条 bullet）、Component family（`SSegment` + headless `SegmentCompact`）、Demos、API、Notes（架构链路 + **12 能力 × 6 库对标表** + 6 条 Cautions）、FAQ（5 组：与 `SToggleGroup` 区别、禁用指示器、loop 回绕、外部控制、自定义样式）。中英文结构一一对应。

---

## 四、架构与模式要点

### Compact 聚合：数据驱动 + 样式薄透传

`SegmentCompact`（headless）拥有遍历（`items` v-for）、默认内容（`item`/`indicator` 插槽）、内部组合（`TabsRoot`/`TabsList`/`TabsTrigger`/`TabsIndicator`）；`SSegment` 仅计算 `segmentVariants` 并注入 `provideTabsUi`，符合 Compact 聚合「headless 拥有迭代与默认内容、UI 保持薄透传」的既定模式。`segment` 因此与 `tabs` 共享同一 `RovingFocusGroup` 导航内核，`loop`/`dir` 行为天然一致。

### 继承 C42 结论：透传层 cast 覆盖风险（系统性）

C42 已锁定「UI 透传层纯 `defineProps<T>()` → 缺省 Boolean prop 被 Vue 运行时 cast 为 `false` 并作为显式值覆盖子组件默认」的真实机制（见 [C42-toggle-group.md](./C42-toggle-group.md) 3.1）。本窗口核实：全仓 UI 层共 **51 个**组件使用纯 `const props = defineProps<T>()`（无 `withDefaults`），凡透传 Boolean 且子组件有非 `false` 默认者存在同款风险。`segment` 不受影响（两层均有 `withDefaults`），该风险已列入 check.md 4.2 统一排期。

---

## 五、变更文件清单

| 文件                                                | 变更类型                                                                                                                                                                             |
| :-------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/test/specs/components/segment.spec.ts` | 单测 8 → 24 项（渲染/选中态/指示器/禁用/键盘/RTL/样式/ui/slot/axe）；`flushIndicator` 辅助 + `plainItems`（loop 测试）；键盘测试 `findAll<HTMLButtonElement>` 显式泛型修复 typecheck |
| `apps/docs/src/docs/en/components/segment.md`       | 文档 4 节 → 8 节 Recommended structure（Component family + 12 能力 × 6 库对标表 + Cautions + FAQ）                                                                                   |
| `apps/docs/src/docs/zh-CN/components/segment.md`    | 与 en 一一对应的 8 节中文化版本                                                                                                                                                      |
| `docs/check.md`                                     | C43 行 7 维度 ⏳ → ✅；4.2 遗留表 `toggle-group` 行修正为真实机制 + 追加 51 组件系统性排查行；批次 2 记录表 C42 行修正 + 追加 C43 行 + 批次合计更新（4 单元/单测 19 → 93）           |
| `docs/check-reports/C42-toggle-group.md`            | **修正** 初版错误结论（3.1 问题定位/影响范围/遗留项），补充三重证据链与 revert 实验说明                                                                                              |
| `docs/check-reports/C43-segment.md`                 | **新建** 本审计报告                                                                                                                                                                  |

> `packages/headless/src/components/segment/segment-compact.vue` 排查期间曾插入运行时探针，验证后已移除，与 HEAD 一致（无净改动）。

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run segment   # 24 项全通过
cd packages/ui && pnpm exec vp test run toggle-group tabs page-tabs segment   # 族系回归 106/106 通过
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                                          | 对标依据       | 说明                                                                                                                                                                                              |
| :---------------------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 51 个 UI 层纯 `defineProps<T>()` 组件系统性排查 | Vue 运行时行为 | 全仓 UI 层共 51 个组件用纯 `const props = defineProps<T>()`（无 `withDefaults`），凡透传 Boolean 且子组件有非 `false` 默认者存在与 toggle-group 同款 cast 覆盖风险，需按 C42 3.1 双层方案统一排查 |
