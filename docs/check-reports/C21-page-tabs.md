# C21 `page-tabs` 检查优化报告

> **组件编号：** C21（`page-tabs`）
> **组件名称：** `SPageTabs`（headless 基座：`PageTabsCompact<T>` 聚合 `PageTabsRoot`/`PageTabsItem`/`PageTabsClose`/`PageTabsPin`）
> **模式：** 多槽 + Compact
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-12

---

## 一、执行摘要

对 `page-tabs` 完成全维度审计。组件为「多槽 + Compact」模式：headless 泛型 `PageTabsCompact<T>` 负责标签迭代、固定排序、关闭语义（含异步守卫）、上下文菜单接线与默认标签体（图标 + 标签 + 固定 + 关闭 + 指示器）；`PageTabsRoot` 基于 `RovingFocusGroup` 提供键盘导航。UI 层 `SPageTabs` 仅做 `scv()` 配方（variant/size）、区域级 props 与 6 个插槽转发。

**发现：无缺陷**（本次审计未发现需修复的功能/规范问题，全部维度通过）：

|    维度     | 状态 |                                                                                                                                                         说明                                                                                                                                                          |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |            多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useControllableState`）、可关闭 + `beforeClose` 异步守卫、固定/取消固定与自动排序、上下文菜单工厂（`PageTabsState`）、中键/`Backspace` 关闭、`RovingFocusGroup` 键盘导航、活动标签自动滚动（`usePageTabsScroll`）完整（D1-08）             |
| D2 行业对标 |  ✅  | 对标 Ant Design `Tabs`、Element Plus `Tabs`、tags-view（vue-element-admin 风格）：SoybeanUI 覆盖固定/取消固定 + 自动排序、上下文菜单（左/右/其他/全部关闭）、中键点击关闭、键盘（roving focus + Enter/Backspace）、活动标签自动滚动、`beforeClose` 异步守卫、3 变体（chrome/card/slider）、本地化 aria-label（D2-11） |
| D3 API 设计 |  ✅  |  `modelValue`/`items`（`v-model`/`v-model:items`）、`middleClickClose`、`beforeClose`、`menuFactory(tab, state)` 命名与主流库一致；`PageTabsState`（close/closeLeft/closeRight/closeOther/closeAll/pin/unpin + `*Closable`）语义丰富；事件 `click`/`close`/`pin`/`contextmenu`/`selectContextMenu` 载荷清晰（D3-12）  |
| D4 类型系统 |  ✅  |               `PageTabsCompactProps<T>`/`Emits<T>`/`Slots<T>` 全泛型化精确；`PageTabsOptionData extends PageTabsItemProps`；`PageTabsContextMenuOptionData extends MenuOptionData<string>`（复用 menu 类型）；`PageTabsItemContext`/`RootContext` 用 `PropsToContext` 刻画；JSDoc 覆盖全部 props/emits                |
| D5 代码规范 |  ✅  |                                                                 `eslint` 0 errors；`useOmitProps` 含 `class`；`sortTabs`/`hooks.ts`（`usePageTabsScroll`）纯逻辑提取；headless 用 `shallowRef` + `computed` 保持响应式；`MaybePromise` 类型化异步守卫                                                                 |
|   D6 文档   |  ✅  |                                     en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（12 关注点 × 4 库）+ 7 条运行时注意 + FAQ 6 组；`Features` 覆盖数据驱动/受控/异步守卫/固定排序/上下文菜单/键盘/自动滚动/3 变体/6 槽/本地化/headless                                     |
|   D7 其他   |  ✅  |                                      28 项单测通过（rendering/active state/keyboard/close behavior/pin behavior/context menu/localization/a11y）；data 属性遵循 D1-07（`data-soybean-page-tabs-*`）；ARIA 完整（`data-active`/本地化 aria-label）；axe 无违规（含 pinned 场景）                                       |

---

## 二、行业对标矩阵

> `page-tabs` 是**多页面标签导航**模式（后台管理应用常见）。Ant Design/Element Plus `Tabs` 与 tags-view 风格实现为对标对象。

| 能力                             | SoybeanUI | Ant Design `Tabs` | Element Plus `Tabs` | tags-view 风格 |
| :------------------------------- | :-------: | :---------------: | :-----------------: | :------------: |
| Headless/样式分离                |    ✅     |        ❌         |         ❌          |       ❌       |
| 数据驱动 Compact API             |    ✅     |        ✅         |         ✅          |       ✅       |
| 受控/非受控                      |    ✅     |        ✅         |         ✅          |       —        |
| 可关闭 + 异步守卫                |    ✅     |        ✅         |         ✅          |       ✅       |
| 固定/取消固定 + 自动排序         |    ✅     |        ❌         |         ❌          |       ✅       |
| 上下文菜单（左/右/其他/全部）    |    ✅     |        ❌         |         ❌          |       ✅       |
| 中键点击关闭                     |    ✅     |        ❌         |         ❌          |       ✅       |
| 键盘（roving + Enter/Backspace） |    ✅     |        ✅         |         ✅          |       ❌       |
| 活动标签自动滚动                 |    ✅     |        ✅         |         ❌          |       ✅       |
| 变体系统                         |    3×6    |       3 种        |        2 种         |       —        |
| 本地化 aria-label                |    ✅     |       部分        |          —          |       —        |
| 插槽                             |   6 个    |       部分        |        部分         |       —        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无缺陷）

本次审计对 `page-tabs` 未发现需修复的功能、规范或类型问题，全部 D1–D7 维度通过。核查要点：

- **D1-08 键盘/交互完整性**：`RovingFocusGroup` 提供方向键移动；`Enter` 激活、`Backspace` 关闭；`middleClickClose` 中键关闭；活动标签 `usePageTabsScroll` 居中滚动 + 滚轮转横向。
- **D3-12 语义一致性**：`PageTabsState` 将 pin/unpin/close（含左/右/其他/全部）聚合为面向 `menuFactory` 的状态对象，语义清晰且复用 menu 类型。
- **D5 纯逻辑**：`sortTabs`（隐藏固定图标 → 固定 → 普通）与 `usePageTabsScroll` 独立提取；`MaybePromise<boolean | void>` 类型化异步关闭守卫。
- **D7 ARIA/本地化**：`data-active` 反射选中态；关闭/固定按钮本地化 `aria-label`（13 语言）；axe 无违规。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/page-tabs.spec.ts`：**28 项全部通过**（rendering/active state/keyboard/close behavior/pin behavior/context menu/localization/a11y）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                               |
| :-------------- | :---------- | :--------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实 roving focus 键盘导航/活动标签居中滚动/上下文菜单交互建议浏览器覆盖，排期评估 |
