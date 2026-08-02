# C16 `splitter` 检查优化报告

> **组件编号：** C16
> **组件名称：** `splitter` / `SSplitterGroup` / `SSplitterPanel` / `SSplitterResizeHandle`
> **模式：** 多槽（`scv()` 配方 `splitterVariants`，3 slots：root / panel / resizeHandle）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-13、D2-02、D7-02

---

## 一、执行摘要

对 `splitter` 三件套（`SSplitterGroup` + `SSplitterPanel` + `SSplitterResizeHandle`）完成全维度审计。组件架构清晰：headless 层拥有 4 个 SFC + `shared.ts`（布局算法）+ `context.ts`（`provideSplitterGroupContext` + `useDirection` + `useUiContext`），通过 `registerPanel` / `unregisterPanel` + `refreshLayout` 管理动态面板，`distributeDelta` 实现 20 次保护循环的增量分配，`normalizeCollapsedSize` 实现折叠阈值吸附。styled 层使用 `scv()` 多槽配方，6 种 size 缩放手柄握柄宽度。

发现并修复 3 项问题：

1. **Minor (D1-07)**：UI `splitter-resize-handle.vue` 冗余传递 `data-soybean-splitter-resize-handle`（headless 组件模板已设置）。
2. **Minor (D3-12)**：UI `splitter-panel.vue` 未通过 `defineExpose` 转发 headless 面板的命令式 API（`collapse` / `expand` / `resize` / `isCollapsed` / `isExpanded` / `getSize`），导致消费方无法通过 `ref` 编程控制面板。
3. **Major (D6)**：中英文文档仅有 Overview / Usage / Demo / API，缺少 Features / Notes / FAQ。

测试从 8 项扩展到 27 项（新增 aria-value* / defaultLayout / minSize-maxSize 约束 / 面板事件 / keyboardResizeBy / Home-End / 垂直方向键盘 / order 映射 / data-state / withHandle / 命令式 API / RTL 指针+键盘+dir 属性）。

|    维度     | 状态 | 说明                                                                                                                                                                                           |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽；`scv()` `// @unocss-include`；`useOmitProps` 含 `class`；`data-soybean-splitter-*` 全覆盖；已移除冗余 `data-soybean-splitter-resize-handle`；`dir?: Direction` + `useDirection` 完整 RTL |
| D2 行业对标 |  ✅  | headless/styled 分离 + 完整 ARIA separator 语义 + 键盘全支持 + RTL + 命令式 API + 动态面板注册，与 react-resizable-panels 对标                                                                 |
| D3 API 设计 |  ✅  | `direction`/`dir`/`defaultLayout`/`keyboardResizeBy` + `defaultSize`/`collapsible`/`collapsedSize`/`maxSize`/`minSize`/`order` + `disabled`/`tabindex`；已补 `defineExpose` 命令式 API         |
| D4 类型系统 |  ✅  | strict 通过；`SplitterGroupContext extends PropsToContext<...>`；`SplitterPanelRecord` 完整定义；JSDoc 齐全                                                                                    |
| D5 代码规范 |  ✅  | `useOmitProps` + `useForwardListeners` + `useForwardElement`；`shallowRef` + `computed`；`onBeforeUnmount` 清理指针监听；`distributeDelta` 20 次保护                                           |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（15 条）+ Notes（架构对标表 11 维度 + 运行时注意事项 7 条）+ FAQ（7 条）                                                                                             |
|   D7 其他   |  ✅  | 27 项单元测试通过；性能优化（`shallowRef` + `areLayoutsEqual` 早退 + 20 次保护循环 + `clamp` 约束）；SSR 安全（`useId` 稳定 ID，setup 无 window/document）                                     |

---

## 二、行业对标矩阵

| 能力                                      |   SoybeanUI   | react-resizable-panels | Ant Design `ResizeBox` / `Splitter` |
| :---------------------------------------- | :-----------: | :--------------------: | :---------------------------------: |
| headless/styled 分离                      |      ✅       |           —            |                  —                  |
| 面板尺寸约束（default/min/max/collapsed） |      ✅       |           ✅           |                部分                 |
| 可折叠面板 + Enter 切换                   |      ✅       |           ✅           |                  —                  |
| 面板 `order` 逻辑排序                     |      ✅       |           ✅           |                  —                  |
| 键盘调整（Arrow + Home/End + Enter）      |      ✅       |           ✅           |                  —                  |
| RTL（指针 + 键盘反转）                    |      ✅       |           ✅           |                  —                  |
| 命令式面板 API                            |      ✅       |           ✅           |                  —                  |
| ARIA separator 完整语义                   |      ✅       |           ✅           |                部分                 |
| 动态面板挂载/卸载                         |      ✅       |           ✅           |                  —                  |
| `dragging` 拖拽事件                       |      ✅       |           ✅           |                  —                  |
| 布局持久化                                | `layout` 事件 |   `autoSaveId` 内置    |                  —                  |

---

## 三、发现的问题与处理

### 3.1 Minor — UI `splitter-resize-handle.vue` 冗余 `data-soybean-splitter-resize-handle`（已修复，D1-07）

**问题：** UI 组件的 `h()` 调用中显式传递 `'data-soybean-splitter-resize-handle': ''`，但 headless `SplitterResizeHandle` 的 `Primitive` 模板已设置 `data-soybean-splitter-resize-handle`。该属性冗余，且违反 D1-07「单一 `data-soybean-{name}` 来源」原则。

**修复：** 移除 UI `splitter-resize-handle.vue` 中 `h()` 调用里的 `'data-soybean-splitter-resize-handle': ''`。

### 3.2 Minor — UI `splitter-panel.vue` 未转发命令式 API（已修复，D3-12）

**问题：** headless `SplitterPanel` 通过 `defineExpose` 暴露 `collapse` / `expand` / `resize` / `getSize` / `isCollapsed` / `isExpanded`，但 UI `SSplitterPanel` 未转发这些方法。消费方通过 `ref` 访问 UI 面板实例时，无法编程控制面板（折叠/展开/调整）。

**修复：** 在 UI `splitter-panel.vue` 中新增 `shallowRef<InstanceType<typeof SplitterPanel>>` 模板引用，通过 `defineExpose` 转发所有命令式方法与 getter（`isCollapsed` / `isExpanded`），并使用 getter 确保访问时实时读取 headless 组件状态。

### 3.3 Major — 文档缺少 Features / Notes / FAQ（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**问题：** 中英文文档仅有 Overview / Usage / Demo / API，缺少 Features、Notes（架构对标 + 运行时注意事项）、FAQ。未说明三部分组合、方向、尺寸约束、可折叠、order、defaultLayout、指针拖拽、键盘调整、RTL、命令式 API、ARIA 语义、size 缩放、自定义手柄、状态映射、Headless 导出等特性。

**修复：** 在中英文文档中新增：

- **Features**：15 条（三部分组合 / 水平垂直 / 尺寸约束 / 可折叠 / order / defaultLayout / 指针拖拽 / 键盘调整 / RTL / 命令式 API / ARIA 语义 / size 缩放 / 自定义手柄 / 状态映射 / Headless 组合）
- **Notes → 架构与对标**：11 维度对比表（含 react-resizable-panels、Ant Design）
- **Notes → 运行时注意事项**：7 条（百分比布局 / order 映射 / defaultLayout 映射 / 折叠阈值 / distributeDelta 保护 / 指针监听位置 / useDirection 回退）
- **FAQ**：7 条（可折叠面板 / order 工作方式 / 布局持久化 / 禁用手柄 / RTL / 自定义手柄 / 动态增删面板）

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                                                                                                     |
| :----------------- | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-13** RTL 支持 |  ✅  | `types.ts` 声明 `dir?: Direction`；`context.ts` 使用 `useDirection(() => params.dir.value)` 回退到 `ConfigProvider`；`splitter-resize-handle.vue` 在 `getPointerDelta` 中反转 RTL 水平增量，在 `onKeydown` 中反转 ArrowLeft/ArrowRight；根元素设置 `:dir="dir"`；样式使用逻辑属性 `after:start-1/2`                      |
| **D2-02** 行业对标 |  ✅  | 与 react-resizable-panels API 对标：`defaultSize`/`minSize`/`maxSize`/`collapsedSize`/`collapsible`/`order`/`keyboardResizeBy`；键盘 Arrow+Home+End+Enter；`role="separator"` + 完整 aria-value*；`dragging` 事件；`defineExpose` 命令式 API（对标 `ImperativePanelHandle`）；动态面板注册/注销                          |
| **D7-02** 性能     |  ✅  | `shallowRef` 用于 panels/layout/previousNotifiedSizes/previousCollapsedState/lastExpandedSizes；`computed` 缓存派生值；`areLayoutsEqual` 早退避免无效更新；`distributeDelta` 20 次迭代保护 + 回退分配；`clamp` 约束所有尺寸；指针监听 `onBeforeUnmount` 清理；无 `deep: true` watch；`roundLayoutValue` 3 位精度减少抖动 |

---

## 五、架构亮点

### 三部分组合

- **`SplitterGroup`**：管理面板注册（`registerPanel` / `unregisterPanel`）、布局计算（`refreshLayout` → `getDefaultLayout` / `normalizeLayout`）、增量分配（`resizePanelPair` → `resizeLayoutPair` / `distributeDelta`）、命令式操作（`collapsePanel` / `expandPanel` / `resizePanel`）。
- **`SplitterPanel`**：声明自身尺寸约束（`defaultSize` / `minSize` / `maxSize` / `collapsible` / `collapsedSize` / `order`），通过 `onMounted` 注册、`onUnmounted` 注销，`watch` 约束变化触发 `refreshLayout`，`defineExpose` 暴露命令式 API。
- **`SplitterResizeHandle`**：基于 `pointerId` 的拖拽（`pointerdown` → `pointermove` → `pointerup` / `pointercancel`），键盘调整（Arrow / Home / End / Enter），`handleIndex` 通过 `querySelectorAll` 解析，`aria-controls` / `aria-valuenow` / `aria-valuemin` / `aria-valuemax` 完整 ARIA。

### 布局算法（`shared.ts`）

- `sortPanels`：按 `order`（然后注册索引）排序面板。
- `getDefaultLayout`：按 `defaultSize` 分配，未定义的均分剩余空间，归一化到 100%。
- `normalizeLayout`：`clamp` 到 `[minSize, maxSize]`，`distributeDelta` 补偿到 100%，`finalizeLayout` 修正余数。
- `resizeLayoutPair`：成对调整，`normalizeCollapsedSize` 实现折叠阈值吸附（`collapsedSize` 与 `minSize` 中点）。
- `distributeDelta`：20 次迭代保护，按比例分配增量到可用面板，回退分配剩余。

### RTL 支持

- `useDirection` 回退到 `ConfigProvider`。
- 指针：`if (direction.value === 'horizontal' && dir.value === 'rtl') { percentDelta *= -1; }`
- 键盘：RTL 下 ArrowLeft → `delta = step`（增大），ArrowRight → `delta = -step`（减小），与 LTR 相反。
- 根元素：`:dir="dir"` 输出解析后的方向。

---

## 六、变更文件清单

| 文件                                                             | 变更类型                                                                                                                                                                                         |
| :--------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/src/components/splitter/splitter-resize-handle.vue` | 移除冗余 `data-soybean-splitter-resize-handle`                                                                                                                                                   |
| `packages/ui/src/components/splitter/splitter-panel.vue`         | 新增 `shallowRef` 模板引用 + `defineExpose` 转发命令式 API（collapse/expand/resize/getSize/isCollapsed/isExpanded）                                                                              |
| `packages/ui/test/specs/components/splitter.spec.ts`             | 从 8 项扩展到 27 项（aria-value* / defaultLayout / minSize-maxSize / 面板事件 / keyboardResizeBy / Home-End / 垂直键盘 / order 映射 / data-state / withHandle / 命令式 API / RTL 指针+键盘+dir） |
| `apps/docs/src/docs/en/components/splitter.md`                   | 新增 Features（15 条）+ Notes（架构对标表 11 维度 + 运行时注意事项 7 条）+ FAQ（7 条）                                                                                                           |
| `apps/docs/src/docs/zh-CN/components/splitter.md`                | 新增功能（15 条）+ 注意事项（架构对标表 11 维度 + 运行时注意事项 7 条）+ 常见问题（7 条）                                                                                                        |
| `docs/check.md`                                                  | 标记 C16 各维度为 ✅                                                                                                                                                                             |

---

## 七、验证命令

```bash
# 单元测试（27 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/splitter.spec.ts
# → Test Files 1 passed (1) | Tests 27 passed (27)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C16，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
