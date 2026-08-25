# NavigationMenu 改造方案 — 基于 Popper 的悬浮能力迁移

> 定位：将 NavigationMenu（Radix 移植版）的自建悬浮机制迁移到 Popper 统一基础设施，并补齐多层浮窗能力的详细设计与分阶段实施计划。
> 状态：🟡 方案已评审，待实施（阶段 1 → 阶段 2 → 阶段 3 可选）
> 基线：2026-08-25 · 分支 `popper` · 对照源码 `packages/headless/src/components/navigation-menu/` 与 `packages/headless/src/components/popper/`

## 背景与动机

NavigationMenu 是最后一处仍完整保留 Radix 移植版自建悬浮机制的浮层组件。Popper（原 PopperV2，2026-08-25 更名）已通过 Menubar / Tooltip / Popover / Select / Combobox / Cascader / Autocomplete 的连续迁移验证了以下统一能力：

- **`PopperDelayGroup`**（floating-ui `FloatingDelayGroup` 模式）：兄弟根级共享一个 skip-delay 窗口，组内切换即时打开。
- **hover 触发状态机**（`usePopperTrigger`）：打开/关闭延迟、`hasPointerMoveOpened` 去抖、click/hover 混合触发。
- **grace area + `graceTriggerElement` 覆盖**：共享 hover 表面（如 menubar 容器）可作为 grace 锚点，几何走廊保护指针在 trigger ↔ popup 之间移动。
- **`PopperSub` / `PopperSubTrigger` 嵌套浮窗**：子浮窗 teleport 到 body、标记 `data-popper-sub-popup`，grace area 与 dismiss（Escape 先关最深层）自动纳入嵌套管理。

迁移收益：

1. 删除 NavigationMenu 内 ~150 行自建延迟/触发状态机，与 Menubar 迁移同构（净删约 150 行，行为有回归测试保障）。
2. 从「150ms debounce 兜底」升级为真实几何走廊（grace area），trigger ↔ viewport 移动更稳。
3. 补齐多层浮窗：当前 viewport 内内容**无法再弹浮窗**（见现状盘点）。

## 现状盘点（自建悬浮机制，约 240 行）

| 位置                                                           | 自建内容                                                                                                                                                      | 行数 | 迁移去向                                             |
| :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--- | :--------------------------------------------------- |
| `context.ts` L39-L95                                           | 延迟状态机：`isDelaySkipped`（refAutoReset）、`computedDelay`（打开时 150ms）、`debouncedFn`、`skipNextClose`、`onTriggerEnter/Leave`、`onContentEnter/Leave` | ~90  | `PopperDelayGroup` + 各 Item 的 hover 机器           |
| `navigation-menu-trigger.vue` L59-L109                         | 触发状态机：`hasPointerMoveOpenedRef`（300ms 自复位）、`wasClickCloseRef`、`wasEscapeCloseRef` + 4 个 pointer/click 处理器                                    | ~50  | `usePopperTrigger`（与 MenubarTrigger 迁移完全同构） |
| `navigation-menu-content.vue` / `navigation-menu-viewport.vue` | `onContentEnter/Leave` 手动保活；**无 grace area**，trigger ↔ viewport 之间仅靠 150ms debounce 兜底                                                           | ~20  | grace area + `graceTriggerElement` 覆盖              |
| `shared.ts` L94-L155                                           | 手写 viewport 定位（align 映射、clamp、RTL 逻辑坐标转换）                                                                                                     | ~100 | （阶段 3 可选）`usePopperPositioning`                |

### 必须保留的 NavigationMenu 特有部分

Popper 没有「共享 positioner」概念，以下签名交互不属于迁移范围：

- **共享 viewport**：所有 Content teleport 进同一个 viewport 元素，尺寸/位置随 active trigger 动画过渡。
- **Indicator**：active trigger 下的指示条动画。
- **motion attribute**（`from-start/from-end/to-start/to-end`）：内容切换方向动画。
- **focus proxy** 双向 Tab 导航（trigger ↔ content 首尾候选）。
- **`previousValue`**：viewport 退出动画期间保持上一个内容挂载（`isLastActiveValue`）。

### 多层浮窗现状：完全没有

- `navigation-menu-sub-list.vue` 只是 inline `<ul>`（`isRoot: false` 的 context 覆盖）。
- `navigation-menu-sub-option-compact.vue` 的 children 走 `item-children` 插槽 inline 渲染。
- 浮窗（viewport）内的内容无法再弹浮窗 —— 与 Menubar 已有的子菜单能力形成差距。

## 能力映射（自建 → Popper）

| 自建部分                                 | Popper 对应                                                            | 结论                                                                                                           |
| :--------------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| context.ts 延迟状态机                    | `PopperDelayGroup` + 各 item 的 hover 机器                             | ✅ 完全等价（与 Menubar 迁移同构：兄弟打开时即时切换、共享 skip-delay 窗口）                                   |
| trigger.vue 触发状态机                   | `usePopperTrigger`（`trigger: 'hover'` + click 混合）                  | ✅ 与 MenubarTrigger 迁移完全同构，已有成熟模板（`menubar-trigger.vue`、`menubar-menu.vue`）                   |
| content/viewport pointerenter/leave 保活 | grace area + `graceTriggerElement` 覆盖（注册 root `nav` 或 viewport） | ✅ **升级**：从 debounce 兜底变为真实几何走廊保护                                                              |
| ContentImpl 的 `useDismissableLayer`     | `usePopperDismiss` 嵌套层管理                                          | ⚠️ 可换，但 focus proxy / Tab 导航是特有逻辑需保留                                                             |
| 手写 viewport 定位                       | `usePopperPositioning`（activeTrigger 作 reference）                   | ⚠️ 阶段 3 可选：获得 flip/shift 碰撞避免，需验证 RTL 与 CSS 变量契约（`--soybean-navigation-menu-viewport-*`） |

## 分阶段实施

### 阶段 1：hover 能力迁移（风险：中低）

与刚完成的 Menubar 迁移同构，模板即 `menubar-root.vue` / `menubar-trigger.vue` / `menubar-menu.vue` / `menubar-content.vue`。

1. **Root 提供 delay group**：`navigation-menu-root.vue` 调用 `providePopperDelayGroup({ skipDelayDuration })`。
2. **Item 接 hover 机器**：`navigation-menu-item.vue`（或 trigger 内）挂 `usePopperTrigger`（`trigger: 'hover'`，click 混合逻辑保留），hover 机器的 open 事件路由到共享 `modelValue`（模板：`menubar-menu.vue`）。删除 context 延迟状态机与 trigger 的 pointer 事件处理。
3. **grace 覆盖**：`navigation-menu-content.vue`（或 viewport）将 root `nav` 元素注册为 `graceTriggerElement`，走 Popper 内置 grace area；移除 `onContentEnter/Leave` 手动保活。注意 `disableHoverableContent` 场景不注册覆盖（沿用 Menubar 修复的边界）。
4. **回归验证**：
   - 首次 hover 延迟打开、已打开时兄弟 trigger 即时切换（delay group）。
   - trigger → viewport 移动不闪关（grace 走廊，当前是 debounce 兜底，迁移后应有几何保护）。
   - `disableClickTrigger` / `disableHoverTrigger` / `disablePointerLeaveClose` 三个开关行为不变。
   - 现有 `navigation-menu.spec.ts` 全过 + 新增上述场景回归。

净效果：删除 context 延迟机 + trigger pointer 状态机约 150 行。

### 阶段 2：多层浮窗（风险：中，新能力）

目标：viewport 内容内支持嵌套浮窗（flyout 风格，与 Menubar 子菜单一致）。

设计决策：**嵌套浮窗逃逸 viewport（flyout，推荐）** vs 维持 inline 展开（现状）。推荐 flyout：viewport 尺寸不受子内容撑开，长列表不需要把父级 viewport 拉高。

实现路径：

1. 新增 `NavigationMenuSubContent`（基于 `PopperSub` + `PopperPositioner` + `PopperPopup` 组合，模板：`popper-sub.vue` + menubar 的 `menu-content.vue` 嵌套结构）。
2. `navigation-menu-sub-trigger.vue`（或新增）基于 `PopperSubTrigger`，hover/click 展开子浮窗。
3. Compact 数据驱动：`navigation-menu-option-compact.vue` / `navigation-menu-sub-option-compact.vue` 的 children 支持 `expand: 'inline' | 'popup'`（默认 `inline` 保持现状兼容），`popup` 模式渲染 SubContent。
4. 嵌套自动获得：grace area 把 sub-popup 视为合法 hover 目标（指针移入不关闭父层）、Escape 先关最深层（`usePopperNesting`）、与根级共享同一 delay group。
5. 交付面：playground 新示例（嵌套 flyout）、docs（en/zh-CN）特性与示例、`navigation-menu.spec.ts` 嵌套场景、`pnpm sui api`（新增公共 API）。

### 阶段 3（可选）：viewport 定位换 Floating UI（风险：中低，独立可后置）

`navigation-menu-viewport.vue` 的手写定位（`getNavigationMenuViewportPosition`）替换为 `usePopperPositioning`，reference 绑定 active trigger。

- 收益：flip/shift 碰撞避免替代手写 clamp；RTL 交给 Floating UI。
- 风险点：viewport 的尺寸动画依赖 content ResizeObserver 测量，与 positioning 更新节奏需对齐；CSS 变量契约（`--soybean-navigation-menu-viewport-*`）被 UI 层样式引用，替换后需保持或同步更新 `packages/ui/src/styles/navigation-menu.ts`。
- 若无碰撞痛点可长期搁置。

## 验收标准

- [ ] 阶段 1：`pnpm vitest packages/ui/test/specs/components/navigation-menu.spec.ts` 全过 + 新增 hover 回归（延迟首开 / 即时切换 / grace 走廊 / 三开关）。
- [ ] 阶段 1：`pnpm typecheck` / `pnpm lint` / `pnpm fmt` 零错误。
- [ ] 阶段 2：嵌套 flyout 示例进 playground + docs；`pnpm sui api` 后 API 表覆盖新组件。
- [ ] 全程：Menubar / Tooltip / Popover 等已迁移组件回归不受影响（`pnpm vitest packages/ui` 全量）。

## 参考

- Menubar 迁移模板：`packages/headless/src/components/menubar/`（root 提供 delay group、trigger 接 hover 机器、content 注册 grace 覆盖）。
- delay group 实现：`packages/headless/src/components/popper/context.ts`。
- grace 覆盖与共享表面语义：`packages/headless/src/components/popper/use-popper-trigger.ts`（存在 `graceTriggerElement` 覆盖时机器不在按钮 leave 关闭，由共享表面 grace exit 驱动）。
- 嵌套浮窗：`packages/headless/src/components/popper/popper-sub.vue` / `use-popper-nesting.ts`。
