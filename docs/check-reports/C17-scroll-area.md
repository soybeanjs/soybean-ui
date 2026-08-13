# C17 `scroll-area` 检查优化报告

> **组件编号：** C17（`scroll-area`）
> **组件名称：** `SScrollArea`（headless 基座：`ScrollAreaRoot`/`ScrollAreaViewport`/`ScrollAreaScrollbar`/`ScrollAreaThumb`/`ScrollAreaCorner` + `ScrollAreaCompact` 聚合）
> **模式：** 多槽（Compact 聚合）
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-13、D2-11、D7-02

---

## 一、执行摘要

对 `scroll-area` 完成全维度审计。组件为「多槽 + Compact」模式：headless `ScrollAreaCompact` 聚合 `Viewport`（原生滚动容器，注入全局隐藏原生滚动条的样式类）、双向 `Scrollbar`（`ResizeObserver` + 滚动指标自动检测溢出）、`Thumb`（可拖拽、按比例计算滑块尺寸/偏移）、`Corner`（双滚动条可见时渲染）；`Root` 持有 `type`/`scrollHideDelay`/`dir` 状态与 RTL `scrollLeft` 归一化。UI 层 `SScrollArea` 仅做 `scv()` 配方（size）与区域级 props/插槽转发。

**发现：无缺陷**（本次审计未发现需修复的功能/规范问题，全部维度通过）：

|    维度     | 状态 |                                                                                                                                                                                         说明                                                                                                                                                                                         |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                                       多槽 + Compact 正确：Compact 聚合下沉至 headless；五种可见性模式（auto/always/hover/scroll/glimpse）、`scrollHideDelay`、双向滚动条、溢出检测（`ResizeObserver`）、滑块拖拽/轨道点击、可聚焦视口、角落自动渲染、RTL 归一化完整（D1-13）                                                                        |
| D2 行业对标 |  ✅  |                                  对标 Radix UI ScrollArea 与 Ant Design `ScrollBar`：SoybeanUI 覆盖 `auto`/`always`/`hover`/`scroll`/`glimpse`（比 Radix 多 `glimpse`）、`scrollHideDelay`、RTL `scrollLeft` 3 模式探测 + `WeakMap` 缓存（与 Radix 同方案）、滑块拖拽 + 轨道点击、键盘可聚焦视口、角落自动渲染、`dir` 来自 ConfigProvider（D2-11）                                   |
| D3 API 设计 |  ✅  |                                                                    `type`/`dir`/`scrollHideDelay`、`viewportProps`/`verticalScrollbarProps`/`horizontalScrollbarProps`/`thumbProps`/`cornerProps` 区域级透传命名与主流库一致；`ScrollAreaCompactSlots`（default）语义清晰；`SScrollArea` 提供 `ui`/`size`/`class`                                                                    |
| D4 类型系统 |  ✅  |                                `ScrollAreaRootProps`/`ViewportProps`/`ScrollbarProps`/`ThumbProps`/`CornerProps` 均 `extends PrimitiveWithBaseProps`；`ScrollAreaRootContext`（`dir`/`isHovering`/`rootElement`/`viewportElement`/`contentElement`/`scrollbarX/YEnabled`/`Visible`/`Size` + 回调）用 `PropsToContext` 精确刻画；JSDoc 覆盖全部 props                                 |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`useOmitProps` 含 `class`；headless 用 `shallowRef`（`viewportElement`/`contentElement`/`scrollbarX/YEnabled`/`Visible`/`Size`/`isHovering`）+ `computed` 保持响应式；RTL 探测/滑块数学提取为纯函数（`shared.ts`：`getScrollPosition`/`setViewportScroll`/`getThumbSize`/`getThumbOffset`/`detectRtlScrollType`）；滚动监听 `{ passive: true }`；拖拽监听卸载清理 |
|   D6 文档   |  ✅  |                                                                         en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（10 关注点 × 3 库）+ 7 条运行时注意 + FAQ 8 组；`Features` 覆盖原生滚动/五模式/隐藏延迟/双向/拖拽/键盘/RTL/ARIA/组合/属性透传/角/缩放/性能                                                                         |
|   D7 其他   |  ✅  |                    24 项单测通过（rendering/visibility/a11y/RTL scrolling/direction/viewport/transient/thumb dragging/track click/corner/unmount safety）；data 属性遵循 D1-07（`data-soybean-scroll-area-root`/`-viewport`/`-scrollbar`/`-thumb`/`-corner`）；SSR 无顶层 `window`/`document` 访问（RTL 探测与 `ResizeObserver` 客户端激活）；axe 无违规（D7-02）                    |

---

## 二、行业对标矩阵

> `scroll-area` 是**自定义滚动条容器**模式。Radix UI ScrollArea 为最接近的行业实现；Ant Design 提供 `ScrollBar` 作为 Sider/表格的滚动条辅助。

| 能力                      | SoybeanUI | Radix UI ScrollArea | Ant Design `ScrollBar` |
| :------------------------ | :-------: | :-----------------: | :--------------------: |
| Headless/样式分离         |    ✅     |         ✅          |           ❌           |
| 可见性模式                |   5 种    |        4 种         |          3 种          |
| 隐藏延迟控制              |    ✅     |         ✅          |           —            |
| RTL `scrollLeft` 归一化   |    ✅     |         ✅          |           —            |
| 滑块拖拽 + 轨道点击       |    ✅     |         ✅          |           ✅           |
| 键盘可聚焦视口            |    ✅     |         ✅          |           —            |
| 角落自动渲染              |    ✅     |         ✅          |           —            |
| `dir` 来自 ConfigProvider |    ✅     |         ✅          |           —            |
| 区域级属性透传            |    ✅     |         ✅          |           —            |
| SSR 安全                  |    ✅     |         ✅          |           —            |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无缺陷）

本次审计对 `scroll-area` 未发现需修复的功能、规范或类型问题，全部 D1–D7 维度通过。核查要点：

- **D1-13 功能完整性**：`ResizeObserver` 驱动溢出检测（`onScrollbarEnabledChange`/`onScrollbarVisibleChange`/`onScrollbarSizeChange` 回调链）；滑块数学（`getThumbSize` 钳制最小 18px、`getThumbOffset` 钳制 `[0,1]` 并 RTL 反转）与拖拽/轨道点击均正确。
- **D2-11 对标覆盖**：`glimpse` 模式为 SoybeanUI 相对 Radix 的增量；RTL `scrollLeft` 3 模式探测（`default`/`negative`/`reverse`）+ `WeakMap` 按 document 缓存与 Radix 同源方案。
- **D5 性能/健壮性**：滚动监听 `{ passive: true }`；拖拽监听挂 `window` 并 `pointerup`/`pointercancel`/卸载时清理；`detectRtlScrollType` 一次性探测并缓存，无重复 DOM 开销。
- **D7-02 ARIA**：自定义滚动条/滑块 `aria-hidden`（装饰性）；视口 `tabindex="0"` 保持原生滚动语义；axe 无违规。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/scroll-area.spec.ts`：**24 项全部通过**（rendering/visibility/a11y/RTL scrolling/direction/viewport/transient/thumb dragging/track click/corner/unmount safety）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                                                                 |
| :-------------- | :---------- | :------------------------------------------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实溢出/拖拽/轨道点击/角渲染/三种 RTL 模式建议浏览器覆盖（happy-dom 依赖 `mockOverflowMetrics` 模拟指标），排期评估 |
