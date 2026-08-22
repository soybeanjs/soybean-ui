# 分割导航

## 概述

用于后台布局的分割导航组件。`SSplitNav` 将一份菜单树拆到独立的一级菜单与子级面板中，而不是把所有层级嵌进同一个侧边栏。内置四种布局模式：`dual-vertical`、`vertical-horizontal`、`horizontal-vertical` 和 `horizontal-dual-vertical`。一级菜单是独立的 RovingFocus 列表（与 Menubar 类似的方向键、Enter/Space 选中，但不会弹出菜单）。竖向子级复用 `TreeMenuCompact`，横向子级复用 `MenubarCompact`。

当布局需要「一级切换 + 子级树/横条」（双竖栏、竖轨 + 横条、顶栏 + 侧栏、或顶栏 + 双竖栏）时使用。单一嵌套侧边栏请优先使用 `STreeMenu`；独立横条请使用 `SMenubar` / `SNavigationMenu`。

## 用法

<UsageCode component="split-nav" />

## 特性

- 🧭 四种模式 — `mode` 选择面板组合，根组件切换对应模式组件
- 🎹 一级键盘 — 竖/横 `RovingFocusGroup`，支持方向键、Home/End、Enter/Space；面板之间用 Tab 切换
- 🪟 Teleport 挂载 — `verticalMountedId` / `horizontalMountedId` 将面板挂到 `#id` 元素（`dual-vertical` 整块挂载）
- 🪜 路径切分 — 由当前 `modelValue` 推导一级高亮与子级面板数据
- 🔄 受控/非受控 — `modelValue` / `defaultValue`；点击父级只激活，点击叶子还会触发 `select`
- 🧩 复用 `TreeMenuCompact`（竖向子级）与 `MenubarCompact`（横向子级）
- 🎨 6 档尺寸 + 样式注入 — `size` 从 xs 到 2xl；`class` / `ui` 覆盖各命名插槽
- ✏️ 高度可定制 — `first-level-item` / `item` / `item-leading` / `item-trailing` / `trigger` 插槽
- ♿ 无障碍 — `role="menubar"` / `menuitem`、`data-soybean-split-nav-*` 数据属性、RTL `dir`

## 组件家族

- `SSplitNav`（带样式）— 入口包装；组合 `SplitNavRoot` + `splitNavVariants` 模式/尺寸配方 + `provideSplitNavUi` 插槽类注入
- `SplitNavRoot`（无样式）— 数据驱动聚合根；`useControllableState` 管理激活值、按 mode 切换、转发插槽
- 内部模式组件（无样式）— `DualVerticalMenu`、`VerticalHorizontalMenu`、`HorizontalVerticalMenu`、`HorizontalDualVerticalMenu`
- 内部一级菜单（无样式）— `VerticalFirstLevelMenu` / `HorizontalFirstLevelMenu`，共享 RovingFocus 条目

## 示例

<PlaygroundGallery component="split-nav" />

- 01 基础 — `dual-vertical` 双竖栏
- 02 竖横 — 一级竖轨 + 子级 Menubar
- 03 横竖 — 一级横条 + 子级 TreeMenu
- 04 横双竖 — 顶部横条 + 嵌套 dual-vertical
- 05 挂载 — 将面板挂载到外部 `#id` 元素
- 06 定制 — 通过插槽自定义一级与子级内容

## API

<ComponentApi component="split-nav" />

## 备注

### 架构

`SSplitNav` 是薄样式包装。无样式的 `SplitNavRoot` 负责 mode 切换、激活路径（`findActivePath`）以及叶子/父级选择语义。一级菜单是独立的 RovingFocus 列表，而不是 TreeMenu，因此父级用于切换子面板而不是就地展开。竖向子级交给 `TreeMenuCompact`；横向子级交给 `MenubarCompact` 的 `activeValue`（Menubar 的打开态不会绑到导航 `modelValue`）。`provideSplitNavUi` 把插槽类转发进嵌套的 TreeMenu / Menubar / Menu UiContext。

| 能力              | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :---------------- | :-------: | :--------: | :----------: | :------: |
| 多种布局模式      |    ✅     |     ⚠️     |      ⚠️      |    —     |
| 挂载到外部元素    |    ✅     |     —      |      —       |    —     |
| headless/样式分离 |    ✅     |     —      |      —       |    —     |
| 一级方向键导航    |    ✅     |     ⚠️     |      ⚠️      |    —     |

### 注意事项

- 面板默认原地渲染；仅在需要挂到外部元素时才设置 `horizontalMountedId` / `verticalMountedId`（传不带 `#` 的 id）。
- `dual-vertical` 以及 `horizontal-dual-vertical` 里嵌套的 dual-vertical，两列竖栏会通过 `verticalMountedId` **整块**挂载。混合模式则一级与子级独立挂载。
- 点击父级只会激活并驱动子面板，不会触发 `select`；点击叶子才会触发 `select`。
- 各 `mode` 的 flex 布局定义在 UI 样式配方中；无样式层不携带任何布局类。

## 常见问题

### 如何在四种模式间切换？

设置 `mode` 属性：`dual-vertical`（双竖栏）、`vertical-horizontal`（竖轨 + 横条）、`horizontal-vertical`（横条 + 竖栏）或 `horizontal-dual-vertical`（顶部横条 + 双竖栏）。

### 如何把面板挂载到指定元素？

给目标元素一个 `id` 并传给 `horizontalMountedId` / `verticalMountedId`：

```vue
<SSplitNav
  mode="horizontal-vertical"
  :items="items"
  horizontal-mounted-id="app-header"
  vertical-mounted-id="app-sider"
/>
```

面板会通过 `Teleport` 渲染到 `#app-header` / `#app-sider`（`defer` 保证晚出现的挂载点也安全）。

### 如何知道叶子被选中？

`select` 事件会带上叶子值；`v-model` 反映当前激活值。点击父级只会激活（驱动子面板），不会触发 `select`。

### 能否自定义每项内容？

可以 — 用 `first-level-item` 自定义一级，用 `item` / `item-leading` / `item-trailing` 自定义嵌套 TreeMenu，用 `trigger` 自定义嵌套 Menubar 触发器。

### 是否支持路由链接？

每个节点都可以带 `to` / `href`（继承自 `LinkBaseProps`）。一级项以及嵌套的 TreeMenu / Menubar 会负责链接渲染。

### 一级菜单的键盘如何工作？

一级列表是 `menubar`：方向键移动焦点（竖向用 ↑↓，横向用 ←→，并感知 RTL），Home/End 跳到两端，Enter/Space 选中当前焦点项。嵌套的 TreeMenu 与 Menubar 保留各自的键盘约定；面板之间用 Tab 切换。
