# C89 `virtualizer` 检查优化报告

> **组件编号：** C89（`virtualizer`）
> **组件名称：** `SVirtualizer`（headless 基座：`VirtualizerRoot`/`VirtualizerContent`/`VirtualizerItem`/`VirtualizerDynamicContent`，构建于 `@tanstack/vue-virtual`）
> **模式：** 多槽（独立导出的基础原语）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-04、D7-01、D7-02、D7-04

---

## 一、执行摘要

对 `virtualizer` 完成全维度审计。`VirtualizerRoot` 持有 `@tanstack/vue-virtual` 的 `useVirtualizer` 实例（`estimateSize`/`count`/`scrollPaddingStart`/`End`/`getScrollElement`），计算 `virtualItems`/`totalSize`/`contentStyle`，根为滚动容器（`height` + `overflow: auto`，`tabindex="-1"`）；`SVirtualizer` 仅将 `virtualItems` 迭代进 `item` 插槽。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                              多槽模式正确：`SVirtualizer` 仅迭代虚拟条目，无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；仅渲染视口条目、滚动容器、水平/动态模式、`item` 插槽完整（D1-09）                                               |
| D2 行业对标 |  ✅  |                 对标 tanstack-virtual（同源引擎）与 AntD/Element Plus/Mantine/Naive UI（`rc-virtual-list`/`el-table-v2`/`ListVirtualization`/`virtual-list`）：SoybeanUI 暴露引擎无关的薄封装，任意 `@tanstack/vue-virtual` 选项透传（D2-04）                 |
| D3 API 设计 |  ✅  |                                         `items`/`height`/`estimateSize`/`options`/`dynamic` 命名与主流库一致；`item` 插槽暴露 `{ virtualItem, index, item }` 语义清晰；`contentProps`/`dynamicContentProps` 通道完整                                          |
| D4 类型系统 |  ✅  |                                     `VirtualizerProps<T extends Record<string, any>>` 泛型化精确；`VirtualizerOptions`（`Omit<PartialKeys<…>>`）透传 `@tanstack/vue-virtual` 类型；JSDoc 覆盖 `height`/`items`/`dynamic`                                      |
| D5 代码规范 |  ✅  |                                   `eslint` 0 errors；`useOmitProps` 含 `class`；`getVirtualizerPadding` 纯函数独立；委托键与 `VirtualizerRootProps` 严格一致；`SSR` 安全（`rootElement` 为 `undefined` 时短路返回 `{0,0}`）                                   |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（5 能力 × 6 库）+ 5 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                                          单测 2 项通过（虚拟条目根渲染/自定义 item 插槽）；SSR 无顶层 `window`/`document` 访问（`getVirtualizerPadding` 在无根元素时短路）（D7-04）                                                           |

---

## 二、行业对标矩阵

> `virtualizer` 是 **基于 tanstack-virtual 的引擎无关薄封装** 模式。TanStack 为同源引擎；Ant Design/Element Plus/Mantine/Naive UI 提供各自虚拟引擎。

| 能力         | SoybeanUI | TanStack | Ant Design | Element Plus | Mantine | Naive UI |
| :----------- | :-------: | :------: | :--------: | :----------: | :-----: | :------: |
| 虚拟引擎     |    ✅     |    ✅    |     ✅     |      ✅      |   ✅    |    ✅    |
| 数据驱动条目 |    ✅     |    ✅    |     ✅     |      ✅      |   ✅    |    ✅    |
| 水平模式     |    ✅     |    ✅    |     ✅     |      ✅      |    —    |    —     |
| 动态测量     |    ✅     |    ✅    |     —      |      —       |    —    |    —     |
| 完整引擎选项 |    ✅     |    ✅    |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [virtualizer.md（en）](../../apps/docs/src/docs/en/components/virtualizer.md) 与 [virtualizer.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/virtualizer.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（color-picker/alert/toolbar 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：8 条能力（虚拟滚动/数据驱动/滚动容器/方向/TanStack 选项/动态模式/条目插槽/无障碍）。
- `Component family`：`SVirtualizer` + 3 个 headless 部件职责说明。
- `Notes`：架构对标表（5 能力 × 6 库）+ 5 条 Cautions（`height`/`estimateSize`/`items` 形状/`options` 透传/`dynamic`）+ `Roadmap`。
- `FAQ`：4 组问答（渲染长列表/水平滚动/overscan/可变高度）。

### 3.2 核查结论（非缺陷）

- **D1-09 性能**：仅渲染视口条目，基于 tanstack-virtual 引擎，性能可靠。
- **D7-04 SSR**：`getVirtualizerPadding` 在无根元素时短路返回 `{0,0}`，不触碰 `window`；SSR 安全。
- **D7-01/D7-02 说明**：虚拟化测量/定位依赖 `ResizeObserver`/滚动尺寸，happy-dom 难以断言真实可见条目窗口；故单测保持根渲染级断言（2 项），真实虚拟化窗口建议浏览器 e2e 覆盖（见遗留项）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/virtualizer.spec.ts`：**2 项全部通过**（虚拟条目根渲染/自定义 item 插槽）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                              |
| :-------------- | :---------- | :-------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实视口窗口/滚动/水平/动态测量建议浏览器覆盖（happy-dom 无法可靠断言），排期评估 |
