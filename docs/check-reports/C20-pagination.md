# C20 `pagination` 检查优化报告

> **组件编号：** C20（`pagination`）
> **组件名称：** `SPagination`（headless 基座：`PaginationCompact` 聚合 `PaginationRoot`/`PaginationList`/`PaginationListItem`/`PaginationEllipsis`/`PaginationFirst`/`PaginationPrev`/`PaginationNext`/`PaginationLast`）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `pagination` 完成全维度审计。组件为「多槽 + Compact」模式：headless `PaginationCompact` 负责页码窗口计算（`getRange` 纯函数）、默认内容与内部组合（root → list → 页码项/操作按钮 → 省略号）；`PaginationRoot` 基于 `useControllableState` 管理 `page`/`pageSize`。UI 层 `SPagination` 仅做 `scv()` 配方（variant/shape/size）、区域级 props 与 8 个插槽转发。

**发现：无缺陷**（本次审计未发现需修复的功能/规范问题，全部维度通过）：

|    维度     | 状态 |                                                                                                                                                       说明                                                                                                                                                       |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                       多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useControllableState`）、智能窗口（`siblingCount`/`showEdges` 单双省略号）、边界自动禁用、整体禁用、`actionAsSelected` 完整（D1-12）                                                       |
| D2 行业对标 |  ✅  | 对标 shadcn-vue `Pagination`、Ant Design `Pagination`、Element Plus `Pagination`：SoybeanUI 覆盖受控/非受控、省略号与固定首尾页（`showEdges`）、边界自动禁用、整体禁用、选中页样式（`data-[selected]`+`actionAsSelected`）、本地化 aria-label（13 语言）、4 变体 × 2 shape × 6 size、区域透传、RTL 镜像（D2-11） |
| D3 API 设计 |  ✅  |                               `page`/`defaultPage`、`pageSize`/`defaultPageSize`、`total`、`siblingCount`、`disabled`、`showEdges`、`showFirstOrLast` 命名与主流库一致；`update:page`/`update:pageSize` 事件语义清晰；`PageItem`/`PageEllipsis`/`Pages` 判别联合类型精确（D3-01）                                |
| D4 类型系统 |  ✅  |                        `PaginationRootProps`/`PaginationCompactProps`/`Slots` 层级清晰；`PaginationRootContextParams` 用 `PropsToContext<Required<…>>` 精确刻画；`PaginationListItemProps extends ButtonProps`；`Pages = Array<PageEllipsis \| PageItem>` 判别联合；JSDoc 覆盖全部 props                         |
| D5 代码规范 |  ✅  |                                                     `eslint` 0 errors；`useOmitProps` 含 `class`；`getRange`/`transform` 纯函数独立（`shared.ts`）；headless 用 `useControllableState` + `shallowRef` 保持响应式；模板 `v-for`/`v-if` 声明式、无内联箭头函数                                                     |
|   D6 文档   |  ✅  |                             en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（12 关注点 × 4 库）+ 7 条运行时注意 + FAQ 7 组；`Features` 覆盖数据驱动/受控/智能窗口/边界禁用/4 变体/actionAsSelected/8 槽/分区透传/ARIA/本地化/RTL/headless                              |
|   D7 其他   |  ✅  |               22 项单测通过（rendering/page navigation/ellipsis state/sibling count/localization/custom slots/a11y）；data 属性遵循 D1-07（`data-soybean-pagination-*`）；ARIA 完整（`nav` 地标/`aria-current="page"`/本地化 aria-label/`{value}` 插值）；axe 无违规（含 showEdges 场景）（D7-05）               |

---

## 二、行业对标矩阵

> `pagination` 是**分页导航**模式。shadcn-vue、Ant Design、Element Plus 为直接对标对象。

| 能力                 | SoybeanUI | shadcn-vue | Ant Design | Element Plus |
| :------------------- | :-------: | :--------: | :--------: | :----------: |
| Headless/样式分离    |    ✅     |     ❌     |     ❌     |      ❌      |
| 数据驱动 Compact API |    ✅     |     ✅     |     ✅     |      ✅      |
| 受控/非受控          |    ✅     |     ✅     |     ✅     |      ✅      |
| 省略号与固定首尾页   |    ✅     |     ✅     |     ✅     |      ✅      |
| 边界自动禁用         |    ✅     |     ✅     |     ✅     |      ✅      |
| 整体禁用             |    ✅     |     ✅     |     ✅     |      ✅      |
| 本地化 aria-label    |    ✅     |    部分    |    部分    |      —       |
| 变体系统             |   4×2×6   |   仅尺寸   |     ✅     |     部分     |
| 分区属性转发         |    ✅     |     ✅     |     ✅     |      ✅      |
| RTL 图标镜像         |    ✅     |     —      |     ✅     |      ✅      |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无缺陷）

本次审计对 `pagination` 未发现需修复的功能、规范或类型问题，全部 D1–D7 维度通过。核查要点：

- **D1-12 Compact 下沉**：`PaginationCompact` 在 headless 内完成窗口计算（`getRange` 纯函数）、默认内容（页码项/操作按钮/省略号图标）；UI 层 `SPagination` 仅转发插槽与配方。
- **D3-01 判别联合类型**：`Pages = Array<PageEllipsis | PageItem>` 精确表达窗口中的页面/省略号项，避免字符串魔法值。
- **D5 纯函数**：`getRange`（showEdges 单/双省略号逻辑）与 `transform` 独立于 `shared.ts`，边界数学清晰可测。
- **D7-05 ARIA/本地化**：根 `nav` 地标；当前页 `aria-current="page"` + `data-selected`；操作按钮/页码 aria-label 来自 locale 注册表（13 语言，`pageLabel` 支持 `{value}` 插值）；axe 无违规（含 showEdges 场景）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/pagination.spec.ts`：**22 项全部通过**（rendering/page navigation/ellipsis state/sibling count/localization/custom slots/a11y）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                           |
| :-------------- | :---------- | :------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实键盘导航/受控状态回写/多页窗口交互建议浏览器覆盖，排期评估 |
