# C19 `breadcrumb` 检查优化报告

> **组件编号：** C19（`breadcrumb`）
> **组件名称：** `SBreadcrumb`（headless 基座：`BreadcrumbCompact` 聚合 `BreadcrumbRoot`/`BreadcrumbList`/`BreadcrumbItem`/`BreadcrumbLink`/`BreadcrumbPage`/`BreadcrumbSeparator`/`BreadcrumbEllipsis`）
> **模式：** 多槽 + Compact
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-12

---

## 一、执行摘要

对 `breadcrumb` 完成全维度审计。组件为「多槽 + Compact」模式：headless `BreadcrumbCompact` 负责迭代 `items`、省略号折叠、默认内容与内部组合（root → list → items → separators），将 `to`/`href` 条目渲染为 `BreadcrumbLink`（复用 Link 原语）、末尾无目标条目渲染为 `BreadcrumbPage`；UI 层 `SBreadcrumb` 仅做 `scv()` 配方（size）、区域级 props 与 8 个类型化插槽转发。

**发现：无缺陷**（本次审计未发现需修复的功能/规范问题，全部维度通过）：

|    维度     | 状态 |                                                                                                                                                       说明                                                                                                                                                        |
| :---------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                     多槽 + Compact 正确：Compact 聚合下沉至 headless（迭代/省略号/默认内容）；链接 vs 当前页（`BreadcrumbLink`/`BreadcrumbPage`）、省略号折叠（`true`/`[start,end]` 归一化）、带数据的 `click` 事件、disabled 抑制、8 个类型化槽完整（D1-12）                                     |
| D2 行业对标 |  ✅  |                     对标 shadcn-vue `Breadcrumb`、Ant Design `Breadcrumb`、Element Plus `Breadcrumb`：SoybeanUI 覆盖数据驱动 compact API、省略号折叠（`true`/自定义范围，AntD 仅 ≥4 条）、链接 vs 当前页、携带数据的 click、disabled、本地化 aria-label、区域级透传、8 槽、尺寸缩放（D2-11）                      |
| D3 API 设计 |  ✅  | `items`（`BreadcrumbOptionData<T>` 泛型）、`ellipsis`（`true \| [number,number] \| null`）、`listProps`/`itemProps`/`linkProps`/`pageProps`/`separatorProps`/`ellipsisProps` 区域透传命名与主流库一致；`click: [item: T]` 事件语义清晰；8 槽 scoped props（`{ item, index }`/`{ ellipsisItems }`）类型化（D3-12） |
| D4 类型系统 |  ✅  |                                                        `BreadcrumbCompactProps<T>`/`Emits<T>`/`Slots<T>` 全泛型化精确；`BreadcrumbOptionData extends LinkBaseProps` 语义清晰；`BreadcrumbUiSlot`（7 槽）用 `UiClass<T>`；JSDoc 覆盖全部 props/emits/slots                                                         |
| D5 代码规范 |  ✅  |                                              `eslint` 0 errors；`useOmitProps` 含 `class`；`getEllipsisRange` 纯函数独立（`shared.ts`）；模板用 `v-for`/`v-if` 声明式、无 `props.xxx`、无内联箭头函数；紧凑泛型组件 `generic="T extends BreadcrumbOptionData"` 正确                                               |
|   D6 文档   |  ✅  |                                        en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（10 关注点 × 4 库）+ 6 条运行时注意 + FAQ 7 组；`Features` 覆盖数据驱动/链接 vs 当前页/省略号/点击/ARIA/透传/8 槽/图标/禁用/尺寸/headless                                        |
|   D7 其他   |  ✅  |                         21 项单测通过（rendering/ellipsis state/custom slots/size variants/aria attributes/a11y）；data 属性遵循 D1-07（`data-soybean-breadcrumb-*`）；ARIA 完整（`nav` aria-label/`aria-current="page"`/分隔符与省略号 `role="presentation"`+`aria-hidden`）；axe 无违规                         |

---

## 二、行业对标矩阵

> `breadcrumb` 是**页面层级导航**模式。shadcn-vue、Ant Design、Element Plus 为直接对标对象。

| 能力                 | SoybeanUI | shadcn-vue |  Ant Design  | Element Plus |
| :------------------- | :-------: | :--------: | :----------: | :----------: |
| Headless/样式分离    |    ✅     |     ❌     |      ❌      |      ❌      |
| 数据驱动 compact API |    ✅     |     ❌     |      ✅      |      ✅      |
| 省略号折叠           |    ✅     |     ❌     |      ✅      |      ❌      |
| 链接 vs 当前页       |    ✅     |     ✅     |      ✅      |      ✅      |
| 携带数据的点击事件   |    ✅     |     ❌     |      ✅      |      ✅      |
| 禁用条目             |    ✅     |     —      |      ✅      |      —       |
| 本地化 aria-label    |    ✅     |   硬编码   |     部分     |      —       |
| 区域级属性透传       |    ✅     |     ✅     |     部分     |     部分     |
| 自定义槽             |   8 个    |   5 部件   | `itemRender` |     2 个     |
| 尺寸缩放             |    ✅     |     —      |      ✅      |      —       |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无缺陷）

本次审计对 `breadcrumb` 未发现需修复的功能、规范或类型问题，全部 D1–D7 维度通过。核查要点：

- **D1-12 Compact 下沉**：`BreadcrumbCompact` 在 headless 内完成迭代、省略号折叠（`getEllipsisRange` 纯函数）、默认内容（链接/当前页/分隔符/省略号图标）；UI 层 `SBreadcrumb` 仅转发插槽与配方。
- **D3-12 命名一致性**：`items`/`ellipsis`/`click` 与主流库语义对齐；省略号范围归一化（`start 0 → 1`、`end length → length - 1`）保证首尾可见。
- **D5 纯函数**：`getEllipsisRange` 独立于 `shared.ts`，逻辑清晰可测。
- **D7 ARIA**：根 `nav` 携带本地化 `aria-label`；当前页 `aria-current="page"` + `aria-disabled`；分隔符/省略号 `role="presentation"` + `aria-hidden`。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/breadcrumb.spec.ts`：**21 项全部通过**（rendering/ellipsis state/custom slots/size variants/aria attributes/a11y）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                     |
| :-------------- | :---------- | :------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实路由跳转/省略号交互/键盘导航建议浏览器覆盖，排期评估 |
