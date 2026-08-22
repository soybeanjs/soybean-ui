# 分割菜单

## 概述

用于后台管理系统的分割导航菜单组件。`SSplitMenu` 将一份菜单树按层级拆分到多个面板（panel）中，让每一级菜单分别呈现在独立的竖栏或横条里，而不是把所有层级嵌套进一个展开的侧边栏。内置四种布局模式：`dual-vertical`、`vertical-horizontal`、`horizontal-vertical` 和 `horizontal-dual-vertical`，并复用无样式的 `TreeMenuCompact`（竖级面板）与 `MenubarCompact`（横级面板）作为面板内渲染器——分割形态通过按层级切分菜单树实现，无需重复实现菜单行为。

当需要多面板导航（双栏菜单、顶部横条 + 左侧竖栏、或「顶部横条 + 双竖栏」的三面板布局）时使用。单一嵌套侧边栏请优先使用 `STreeMenu`；独立横条菜单请使用 `SMenubar`/`SNavigationMenu`；`SSplitMenu` 将上述形态组合成分割布局。

## 用法

<UsageCode component="split-menu" />

## 特性

- 🧭 分割布局 — `mode` 选择四种面板形态之一，每个面板渲染一级菜单
- 🪟 Teleport 挂载 — `horizontalMenuEl` / `verticalMenuEl` 通过 `Teleport` 将面板挂载到 `#id` 元素
- 🪜 自动切分 — 每个面板展示当前激活父级的子级（一级 → 二级 → 三级）
- 🔄 受控/非受控 — `modelValue`/`defaultValue`（激活值）与 `collapsed`/`defaultCollapsed`（一级竖栏折叠）
- 🧩 复用 `TreeMenuCompact`（竖级）与 `MenubarCompact`（横级）作为面板渲染器
- 🎨 6 档尺寸 + 样式注入 — `size` 从 xs 到 2xl；`class`/`ui` 覆盖各命名插槽
- ✏️ 高度可定制 — `item`/`item-leading`/`item-trailing`/`trigger` 插槽
- ♿ 无障碍 — 原生按钮语义、`data-soybean-split-menu-*` 数据属性、RTL 布局支持

## 组件家族

- `SSplitMenu`（带样式）— 入口包装；组合 `SplitMenuCompact` + `splitMenuVariants` 模式/尺寸配方 + `provideSplitMenuUi` 插槽类注入
- `SplitMenuCompact`（无样式）— 复合根；将 `mode` 映射为布局行、按层级切分菜单树、转发 `select` 事件
- `SplitMenuRoot`（无样式）— 状态根；`useControllableState` 管理激活值与折叠状态
- `SplitMenuPanel`（无样式）— 单个面板；用切分后的数据渲染 `TreeMenuCompact`（竖级）或 `MenubarCompact`（横级）
- `SplitMenuItem` / `SplitMenuTrigger` / `SplitMenuContent`（无样式）— 高级组合用的基础原语

## 示例

<PlaygroundGallery component="split-menu" />

- 01 基础 — `dual-vertical` 双竖栏
- 02 竖横 — 一级竖栏 + 二级横条
- 03 横竖 — 一级横条 + 二级竖栏
- 04 横双竖 — 顶部横条 + 双竖栏
- 05 折叠 — 将一级竖栏折叠为窄轨
- 06 挂载 — 将面板挂载到外部 `#id` 元素
- 07 定制 — 通过插槽自定义条目内容

## API

<ComponentApi component="split-menu" />

## 备注

### 架构与基准对比

`SSplitMenu` 是薄样式包装：无样式的 `SplitMenuCompact` 负责 mode→布局行映射（`getSplitMenuRows`）、按层级切分（`sliceSplitMenuItems`）与激活路径推导（`getSplitMenuActiveValues`），每个 `SplitMenuPanel` 将面板内渲染委托给已有的 `TreeMenuCompact` 或 `MenubarCompact`。UI 层只注入模式/尺寸配方与插槽类，并将 `SplitMenu` 的插槽类转发进嵌套的 `TreeMenu`/`Menubar`/`Menu` UiContext（`provideTreeMenuUi`/`provideMenubarUi`/`provideMenuUi` 模式），让面板共享同一套样式而无需重复实现菜单行为。相比主流分割菜单实现（Ant Design Layout.Sider、Element Plus el-menu 分割、Naive UI），SoybeanUI 保持了 headless/样式分离，并复用经过验证的菜单原语而非内置一个巨型菜单。

| 能力              | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :---------------- | :-------: | :--------: | :----------: | :------: |
| 多种面板模式      |    ✅     |     ⚠️     |      ⚠️      |    —     |
| 挂载到外部元素    |    ✅     |     —      |      —       |    —     |
| headless/样式分离 |    ✅     |     —      |      —       |    —     |
| 复用菜单原语      |    ✅     |     —      |      —       |    —     |

### 注意事项

- 面板默认原地渲染；仅在需要把面板挂载到外部元素时才设置 `horizontalMenuEl` / `verticalMenuEl`。
- 点击父级只会激活它并驱动下一面板，不会触发 `select`；点击叶子项才会触发 `select`。
- 每个面板上的 `data-orientation` / `data-depth` 是 UI 层做样式的钩子；不要依赖类名判断行为。
- 各 `mode` 的 flex 布局定义在 UI 样式配方中；无样式层不携带任何布局类。

## 常见问题

### 如何在四种模式间切换？

设置 `mode` 属性：`dual-vertical`（双竖栏）、`vertical-horizontal`（竖栏 + 横条）、`horizontal-vertical`（横条 + 竖栏）或 `horizontal-dual-vertical`（顶部横条 + 双竖栏）。

### 如何把面板挂载到指定元素？

给目标元素一个 `id` 并传给 `horizontalMenuEl` / `verticalMenuEl`：

```vue
<SSplitMenu mode="horizontal-vertical" :items="items" horizontal-menu-el="app-header" vertical-menu-el="app-sider" />
```

面板会通过 `Teleport` 渲染进 `#app-header` / `#app-sider`（`defer` + `onMounted` 模式保证 SSR 安全）。

### 如何知道叶子项被选中？

`select` 事件携带叶子值；`v-model:modelValue` 反映激活值。点击父级只会激活它（驱动下一面板），不会触发 `select`。

### 可以自定义每个条目的内容吗？

可以 — 使用 `item`、`item-leading`、`item-trailing` 和 `trigger` 插槽。`item` 插槽接收 `{ item }`，`item-leading`/`item-trailing` 环绕在标签两侧。

### 支持路由链接吗？

每个节点可携带 `to`/`href`（继承自 `LinkBaseProps` 数据模型）；面板内的 `TreeMenuCompact`/`MenubarCompact` 渲染器会处理链接渲染。

### 为什么 headless 包里没有布局类？

遵循 headless/样式分离规范：headless 层只暴露 `data-orientation` / `data-depth`，flex 布局由 UI 样式配方负责，保证 headless 零样式且完全可主题化。
