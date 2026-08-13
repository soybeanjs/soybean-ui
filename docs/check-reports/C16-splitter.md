# C16 `splitter` 检查优化报告

> **组件编号：** C16（`splitter`）
> **组件名称：** `SSplitterGroup` / `SSplitterPanel` / `SSplitterResizeHandle`（headless 基座：`SplitterGroup`/`SplitterPanel`/`SplitterResizeHandle`）
> **模式：** 多槽
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-13、D2-02、D7-02

---

## 一、执行摘要

对 `splitter` 完成全维度审计。组件为「多槽」模式：headless `SplitterGroup` 持有布局状态（`layout`/`panels` 用 `shallowRef`）、面板注册（`registerPanel`/`unregisterPanel`/`refreshLayout`）与尺寸约束算法（全部收敛到 `shared.ts` 纯函数）；`SplitterResizeHandle` 处理指针拖拽（owner document 监听）、键盘调整（方向键/Home/End/Enter）与 RTL 反转；`SplitterPanel` 通过 `defineExpose` 暴露命令式 API。UI 层三个包装组件仅做配方与插槽/事件转发。

**发现：无缺陷**（本次审计未发现需修复的功能/规范问题，全部维度通过）：

|    维度     | 状态 |                                                                                                                                                                                               说明                                                                                                                                                                                                |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                 多槽模式正确：headless 持有布局状态与尺寸算法（`shared.ts` 纯函数库：`sortPanels`/`normalizeLayout`/`resizeLayoutPair`/`distributeDelta`/`finalizeLayout`/`getDefaultLayout`/`getPanelState`/`getPanelBounds`/`areLayoutsEqual`）；UI 层无装配逻辑；指针/键盘/RTL/折叠/动态增删面板完整（D1-13）                                                  |
| D2 行业对标 |  ✅  |                               对标 react-resizable-panels 与 Ant Design `Splitter`/`ResizeBox`：SoybeanUI 覆盖 `defaultSize`/`minSize`/`maxSize`/`collapsedSize`、`collapsible` + Enter、`order` 逻辑排序、`defaultLayout`、键盘/Home/End、RTL、命令式面板 API、`layout` 事件、动态注册、`dragging` 事件；`autoSaveId` 内置持久化留给消费方（灵活性权衡）（D2-02）                                |
| D3 API 设计 |  ✅  |                           `direction`/`dir`/`defaultLayout`/`keyboardResizeBy`、面板 `defaultSize`/`collapsible`/`collapsedSize`/`maxSize`/`minSize`/`order`、手柄 `disabled`/`tabindex` 命名与主流库一致；`layout`/`collapse`/`expand`/`resize`/`dragging` 事件语义清晰；`SplitterPanelExposed` 暴露 `collapse`/`expand`/`resize`/`getSize`/`isCollapsed`/`isExpanded`                           |
| D4 类型系统 |  ✅  |                                              `SplitterGroupProps`/`SplitterPanelProps`/`SplitterResizeHandleProps` 均 `extends PrimitiveWithBaseProps`；`SplitterPanelRecord`（id/order/defaultSize/minSize/maxSize/collapsible/collapsedSize + 回调）精确刻画注册数据；`SplitterGroupContext` 用 `PropsToContext` 描述；JSDoc 覆盖全部 props/emits                                               |
| D5 代码规范 |  ✅  |                             `eslint` 0 errors；`useOmitProps` 含 `class`；headless 用 `shallowRef`（`panels`/`layout`/`previousNotifiedSizes`/`previousCollapsedState`/`lastExpandedSizes`/`state`/`isFocused`/`dragPointerId`）+ `computed` 保持响应式；布局算法提取为纯函数（`shared.ts`）；指针监听 owner document 并卸载清理；`distributeDelta` 有 20 次迭代保护                              |
|   D6 文档   |  ✅  |                                                              en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（10 关注点 × 3 库）+ 7 条运行时注意 + FAQ 7 组；`Features` 覆盖三部分组合/方向/约束/折叠/order/defaultLayout/指针/键盘/RTL/命令式 API/ARIA/缩放/自定义手柄/状态映射/headless                                                               |
|   D7 其他   |  ✅  | 27 项单测通过（rendering/layout state/drag/keyboard/collapse/expand/disabled/a11y/defaultLayout/size 约束/panel 事件/keyboard resize/order/state 反射/withHandle/imperative API/RTL）；data 属性遵循 D1-07（`data-soybean-splitter-group`/`-panel`/`-resize-handle` + `data-panel`/`data-splitter-resize-handle`/`data-panel-group-id` 交互钩子）；完整 ARIA separator 语义 + axe 无违规（D7-02） |

---

## 二、行业对标矩阵

> `splitter` 是**可拖拽分栏布局**模式。react-resizable-panels（React）为最接近的行业实现；Ant Design 提供 `Splitter` 组件。

| 能力              | SoybeanUI  | react-resizable-panels | Ant Design `Splitter` |
| :---------------- | :--------: | :--------------------: | :-------------------: |
| Headless/样式分离 |     ✅     |           ❌           |          ❌           |
| 尺寸约束          |     ✅     |           ✅           |          ✅           |
| 可折叠面板        |     ✅     |           ✅           |           —           |
| 面板 `order`      |     ✅     |           ✅           |           —           |
| 键盘调整          |     ✅     |           ✅           |           —           |
| RTL 支持          |     ✅     |           ✅           |           —           |
| 命令式面板 API    |     ✅     |           ✅           |           —           |
| ARIA separator    |     ✅     |           ✅           |         部分          |
| 布局持久化        | 消费方实现 |      `autoSaveId`      |           —           |
| 动态增删面板      |     ✅     |           ✅           |           —           |
| 拖拽事件          |     ✅     |           ✅           |           —           |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无缺陷）

本次审计对 `splitter` 未发现需修复的功能、规范或类型问题，全部 D1–D7 维度通过。核查要点：

- **D1-13 算法完整性**：`shared.ts` 纯函数覆盖排序、归一化、成对调整、增量分配、收尾修正与折叠吸附；`resizeLayoutPair` 对最小/最大/折叠阈值多重夹取。
- **D2-02 对标覆盖**：相对 react-resizable-panels，唯一有意差异是 `autoSaveId` 内置持久化——SoybeanUI 将持久化留给消费方（监听 `layout` 事件），保持灵活性。
- **D5 性能/健壮性**：布局全部以 `shallowRef` + 纯函数更新，无深层响应式追踪；`distributeDelta` 有循环上限，防止约束过紧死循环；指针监听正确挂载到 owner document 并在卸载/结束时清理。
- **D7-02 ARIA**：手柄 `role="separator"` + `aria-controls`/`aria-orientation`/`aria-valuenow`/`aria-valuemin`/`aria-valuemax`/`aria-disabled` 完整；axe 检查（过滤 `aria-required-attr` 误报后）无违规。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/splitter.spec.ts`：**27 项全部通过**（rendering/layout state/drag/keyboard/collapse/expand/disabled/a11y/defaultLayout/size 约束/panel 事件/keyboard resize/order/state 反射/withHandle/imperative API/RTL）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                                                       |
| :-------------- | :---------- | :--------------------------------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实指针拖拽的像素→百分比换算、真实布局尺寸与跨面板约束建议浏览器覆盖（happy-dom 依赖 mockRect），排期评估 |
