# C17 `scroll-area` 检查优化报告

> **组件编号：** C17
> **组件名称：** `scroll-area` / `SScrollArea`
> **模式：** 多槽 + Compact（`scv()` 配方 `scrollAreaVariants`，5 slots：root / viewport / scrollbar / thumb / corner；headless `ScrollAreaCompact` 聚合 Root + Viewport + Scrollbar×2 + Thumb×2 + Corner）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-13、D2-11、D7-02

---

## 一、执行摘要

对 `SScrollArea` 完成全维度审计。组件架构清晰：headless 层拥有 7 个 SFC + `context.ts` + `shared.ts`（RTL `scrollLeft` 归一化算法：3 种浏览器模式探测 + `WeakMap` 缓存 + 归一化读写），通过 `provideScrollAreaRootContext` / `provideScrollAreaScrollbarContext` 管理状态，`useResizeObserver` + passive scroll 监听驱动指标更新，`useDirection` 回退到 `ConfigProvider`。styled 层使用 `scv()` 5 槽配方，6 种 size 缩放滚动条粗细，`rtl:` 变体适配垂直滚动条与角落位置。

发现并修复 2 项问题：

1. **Major (D5)**：`scroll-area-scrollbar.vue` 的 `onUnmounted` 存在**定时器泄漏**——`clearHideTimer()` 先执行，随后 `cleanupDragListeners()` 无条件调用 `triggerTransientVisibility()` → `scheduleHide()` 创建新 `hideTimer` 且不再被清除（`type="scroll"` / `"glimpse"` 时必现）。
2. **Major (D6)**：中英文文档仅有 Overview / Usage / Demos / API，缺少 Features / Notes / FAQ。

测试从 12 项扩展到 24 项（新增 direction / viewport tabindex / scroll & hover 可见性 / thumb 拖拽 / 轨道点击 / corner 可见性 / unmount 定时器安全）。

|    维度     | 状态 | 说明                                                                                                                                                                                           |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact；`scv()` `// @unocss-include`；`useOmitProps` 含 `class`；`data-soybean-scroll-area-*` 全覆盖；`dir?: Direction` + `useDirection`；滚动条/滑块/角落 `aria-hidden`               |
| D2 行业对标 |  ✅  | 5 种可见性模式（auto/always/hover/scroll/glimpse）+ `scrollHideDelay` + 完整 RTL `scrollLeft` 归一化 + 滑块拖拽/轨道点击 + 键盘可聚焦视口 + 角落自动渲染，与 Radix UI ScrollArea 对标          |
| D3 API 设计 |  ✅  | `type`/`scrollHideDelay`/`dir` + `viewportProps`/`verticalScrollbarProps`/`horizontalScrollbarProps`/`thumbProps`/`cornerProps` 区域级透传 + `nonce`（P3 已知项，与 C14 config-provider 一致） |
| D4 类型系统 |  ✅  | strict 通过；`ScrollAreaRootContext extends PropsToContext<...>`；`ScrollAreaUiSlot = 'root' \| 'viewport' \| 'scrollbar' \| 'thumb' \| 'corner'`；JSDoc 齐全                                  |
| D5 代码规范 |  ✅  | `useOmitProps` + `useForwardElement` + `useExposedElement`；`shallowRef` + `computed`；`onUnmounted` 清理监听与定时器；已修复定时器泄漏                                                        |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（14 条）+ Notes（架构对标表 10 维度 + 运行时注意事项 7 条）+ FAQ（7 条）                                                                                             |
|   D7 其他   |  ✅  | 24 项单元测试通过；性能（`shallowRef` + `computed` 缓存 + `WeakMap` 缓存 RTL 探测 + passive 监听 + 拖拽监听清理）；SSR 安全（setup 无 window/document）                                        |

---

## 二、行业对标矩阵

| 能力                                           | SoybeanUI | Radix UI ScrollArea | Ant Design `ScrollBar` |
| :--------------------------------------------- | :-------: | :-----------------: | :--------------------: |
| headless/styled 分离                           |    ✅     |          —          |           —            |
| 可见性模式（auto/always/hover/scroll/glimpse） |    ✅     |         ✅          |          部分          |
| `scrollHideDelay` 隐藏延迟                     |    ✅     |         ✅          |           —            |
| RTL `scrollLeft` 归一化（3 模式 + 缓存）       |    ✅     |         ✅          |           —            |
| 滑块拖拽 + 轨道点击                            |    ✅     |         ✅          |           ✅           |
| 键盘可聚焦视口                                 |    ✅     |         ✅          |           —            |
| 角落自动渲染                                   |    ✅     |         ✅          |           —            |
| `dir` 来自 ConfigProvider                      |    ✅     |         ✅          |           —            |
| 区域级属性透传                                 |    ✅     |         ✅          |           —            |
| SSR 安全                                       |    ✅     |         ✅          |           —            |

---

## 三、发现的问题与处理

### 3.1 Major — `onUnmounted` 定时器泄漏（已修复，D5）

**问题：** `scroll-area-scrollbar.vue` 的 `onUnmounted` 顺序为：

1. `clearHideTimer()` — 清除当前定时器
2. `cleanupDragListeners()` — 无条件调用 `triggerTransientVisibility()` → 当 `type="scroll"` / `"glimpse"` 时执行 `scheduleHide()` **创建新 `hideTimer`**
3. 组件卸载后定时器仍存在，600ms 后触发设置已卸载组件的 `shallowRef` 值——资源泄漏 + 测试中会报 timer 泄漏

**修复：**

- `cleanupDragListeners()` 增加 `if (!isDragging.value) return;` 保护，仅在真实拖拽时触发 transient visibility，避免 unmount 时无意义地创建定时器。
- `onUnmounted` 调整顺序为 `cleanupDragListeners()` → `clearHideTimer()`，即使拖拽中卸载也确保定时器被清除（双保险）。

### 3.2 Major — 文档缺少 Features / Notes / FAQ（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**问题：** 中英文文档仅有 Overview / Usage / Demos / API，缺少 Features、Notes（架构对标 + 运行时注意事项）、FAQ。未说明 5 种可见性模式、scrollHideDelay、RTL 归一化、滑块拖拽/轨道点击、键盘可聚焦视口、角落渲染、原生滚动条隐藏、区域级透传等特性。

**修复：** 在中英文文档中新增：

- **Features**：14 条（原生滚动引擎 / 五种可见性模式 / 隐藏延迟 / 双向滚动条 / 可拖拽滑块 / 键盘可访问 / RTL 归一化 / ARIA 语义 / 可组合结构 / 区域级透传 / 角落渲染 / size 缩放 / 性能 / SSR）
- **Notes → 架构与对标**：10 维度对比表（含 Radix UI ScrollArea、Ant Design ScrollBar）
- **Notes → 运行时注意事项**：7 条（比例滑块数学 / 指标更新触发 / 拖拽离开滑块 / RTL 一次性探测 / type 仅影响可见性 / 原生滚动条隐藏 / SSR 安全）
- **FAQ**：7 条（type 选择 / aria-hidden 原因 / RTL / 自定义外观 / 键盘聚焦 / 角落时机 / SSR）

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------- | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-13** RTL 支持 |  ✅  | `types.ts` 声明 `dir?: Direction`；root 使用 `useDirection(() => props.dir)` 回退到 `ConfigProvider` 并输出 `:dir`；`shared.ts` 实现 `detectRtlScrollType`（3 模式探测 + `WeakMap` 缓存）+ `getNormalizedScrollLeft` / `setNormalizedScrollLeft` / `getScrollPosition` / `setViewportScroll` / `getThumbOffset`（RTL 水平反转）；UI 样式 `rtl:data-[orientation=vertical]:end-auto rtl:data-[orientation=vertical]:start-0` + `rtl:end-auto rtl:start-0` |
| **D2-11** 防篡改   |  —   | scroll-area 为滚动容器，无遮罩层/水印等防篡改需求；滚动行为由 `ResizeObserver` + scroll 事件驱动，与 Radix UI ScrollArea 一致                                                                                                                                                                                                                                                                                                                            |
| **D7-02** 性能     |  ✅  | 全状态 `shallowRef`；派生值 `computed` 缓存（`isVisible` / `thumbSize` / `thumbOffset` / `dataState` 等）；RTL 探测结果 `WeakMap` 按 document 缓存（一次性）；scroll 监听 `{ passive: true }`；`useResizeObserver` 批量观察；拖拽监听 `onUnmounted` / `pointerup` / `pointercancel` 三处清理；无 deep watch                                                                                                                                              |

---

## 五、架构亮点

### RTL `scrollLeft` 归一化（`shared.ts`）

浏览器对水平 RTL 滚动有 3 种 `scrollLeft` 模式，`detectRtlScrollType` 通过临时滚动容器一次性探测并缓存：

- `default`：最左 = 0，最右 = max（`scrollLeft > 0`）
- `negative`：最左 = 0，最右 = -max（`scrollLeft` 为负）
- `reverse`：最左 = max，最右 = 0（`scrollLeft` 反向）

`getNormalizedScrollLeft` / `setNormalizedScrollLeft` 将三种模式归一化为一致的 0 → max 坐标系，`getThumbOffset` 在水平 RTL 时反转比例，`setViewportPosition` 反转滚动比例，确保 LTR / RTL 下滑块数学与拖拽行为一致。

### 五模式可见性（`scroll-area-scrollbar.vue`）

`isVisible` computed 根据 `type` 决定滚动条绘制：

- `auto` / `always` → 溢出时可见
- `hover` → `isHovering`（root `pointerenter` / `pointerleave`）
- `scroll` → `isScrolling`（scroll 事件触发 + `scheduleHide('scroll')`）
- `glimpse` → `isGlimpseActive`（hover 触发 + `scheduleHide('glimpse')`）

`data-state="visible|hidden"` 驱动 UI 层的 `opacity-0` + `pointer-events-none` 过渡。

### 指标驱动

`updateMetrics` 读取 viewport/content/scrollbar 的尺寸与滚动位置，`useResizeObserver` 观察三元素，scroll 事件被动监听，`onScrollbarSizeChange` 同步根组件 ref 供角落尺寸计算。

---

## 六、变更文件清单

| 文件                                                                     | 变更类型                                                                                                                                   |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/scroll-area/scroll-area-scrollbar.vue` | 修复定时器泄漏：`cleanupDragListeners` 增加 `isDragging` 保护；`onUnmounted` 调整清理顺序                                                  |
| `packages/ui/test/specs/components/scroll-area.spec.ts`                  | 从 12 项扩展到 24 项（direction / viewport tabindex / scroll & hover 可见性 / thumb 拖拽 / 轨道点击 / corner 可见性 / unmount 定时器安全） |
| `apps/docs/src/docs/en/components/scroll-area.md`                        | 新增 Features（14 条）+ Notes（架构对标表 10 维度 + 运行时注意事项 7 条）+ FAQ（7 条）                                                     |
| `apps/docs/src/docs/zh-CN/components/scroll-area.md`                     | 新增功能（14 条）+ 注意事项（架构对标表 10 维度 + 运行时注意事项 7 条）+ 常见问题（7 条）                                                  |
| `docs/check.md`                                                          | 标记 C17 各维度为 ✅                                                                                                                       |

---

## 七、验证命令

```bash
# 单元测试（24 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/scroll-area.spec.ts
# → Test Files 1 passed (1) | Tests 24 passed (24)

# 类型检查（全工作区通过）
pnpm typecheck
# → 全部 Done

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

## 八、遗留 P3 增强项

- `ScrollAreaViewportProps.nonce` 定义但未使用（被 `useOmitProps` 排除且无 `useStyleTag` 注入）。与 C14 `config-provider` 的 `nonce` 已知项一致，保留 API 表面，后续统一处理。
