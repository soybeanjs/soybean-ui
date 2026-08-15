# 布局

## 概述

用于后台管理面板或复杂应用的布局组件结构。它负责管理侧边栏、头部、底部、标签栏以及主内容区域。

## 功能

- **统一布局** — `SLayout` 融合现代侧边栏外壳与管理后台经典能力：滚动容器、固定头部/底部、方向切换。
- **三种变体** — `sidebar`（带边框）、`floating`（圆角阴影）、`inset`（内容带外边距和圆角）。
- **可折叠侧边栏** — `collapsible="icon"` 折叠到 rail 宽度；`collapsible="offcanvas"` 滑出视口但保留布局占位。
- **侧边控制** — `side="left"` 或 `side="right"` 翻转侧边栏位置，全量使用 RTL 友好的逻辑属性。
- **移动端抽屉** — `isMobile` 将桌面侧边栏切换为基于 `Dialog` 的抽屉，自带遮罩与焦点陷阱。
- **槽位级覆盖** — 每个区域（sidebar、header、tab、content、footer）都接受对应的 `*Props`，用于精细化的属性透传。
- **CSS 变量驱动** — 尺寸（`sidebarWidth`、`headerHeight`、`tabHeight`、`footerHeight`）以 rem 形式输出 CSS 变量，便于运行时定制。
- **尺寸缩放** — `size`（xs…2xl）通过 `themeSizeRatio` 缩放布局间距与基础字号。
- **`fullContent` 模式** — 将内容区域固定铺满视口，同时保留标签栏置于其上。
- **方向** — `Layout` 支持 horizontal（侧边栏在内容旁）与 vertical（侧边栏在 header 下方）两种方向。
- **滚动行为** — `scrollBehavior="content"` 仅滚动内容区域；`scrollBehavior="wrapper"` 滚动整个 main 容器。
- **固定头部/底部** — `fixedTop` 与 `fixedFooter` 在内容滚动时保持头部/底部固定，并自动渲染占位元素防止重叠。
- **基础 z-index 控制** — `baseZIndex` 派生 sidebar、header、tab、footer 的堆叠顺序，多布局组合时表现一致。
- **Headless 组合** — 每个区域（`LayoutRoot`、`LayoutSidebar`、`LayoutRail`、`LayoutHeader`、`LayoutTab`、`LayoutContent`、`LayoutFooter`、`LayoutMobile`、`LayoutTrigger`）都从 `@soybeanjs/headless/layout` 导出，可用于自定义样式构建。
- **SSR 安全** — setup 中无 `window`/`document` 访问；`useId()` 为服务端渲染生成稳定的滚动 id。

## 用法

<UsageCode component="layout" />

## 演示

<PlaygroundGallery component="layout" />

## API

<ComponentApi component="layout" />

## 注意事项

### 架构与行业对标

| 关注点              | SoybeanUI                                                                          | Ant Design `Layout`/`Header`/`Sider`/`Content`/`Footer` | Element Plus `ElContainer`/`ElHeader`/`ElAside`/`ElMain`/`ElFooter` |
| :------------------ | :--------------------------------------------------------------------------------- | :------------------------------------------------------ | :------------------------------------------------------------------ |
| Headless / 样式分离 | ✅ `@soybeanjs/headless/layout` 提供逻辑 + 结构；`@soybeanjs/ui` 提供 `scv()` 配方 | ❌ 单一样式包                                           | ❌ 单一样式包                                                       |
| 侧边栏变体          | `sidebar` / `floating` / `inset`                                                   | 仅 `sider`                                              | 仅 `aside`                                                          |
| 折叠模式            | `icon`（rail）+ `offcanvas`（滑出）                                                | `collapsible` + `collapsedWidth`                        | —                                                                   |
| 移动端抽屉          | 内置基于 `Dialog` 的抽屉（`isMobile` prop）                                        | 需要组合 `Drawer`                                       | 需要组合 `Drawer`                                                   |
| 固定头部/底部       | `Layout` 的 `fixedTop` / `fixedFooter` + 自动占位元素                              | 需要手动 sticky CSS                                     | 需要手动 sticky CSS                                                 |
| 方向                | `Layout` `orientation="horizontal" \| "vertical"`                                  | —                                                       | —                                                                   |
| 滚动行为            | `Layout` 的 `wrapper` / `content`                                                  | —                                                       | —                                                                   |
| CSS 变量尺寸        | `--soybean-sidebar-width`、`--soybean-layout-header-height` 等                     | `Sider` 内联宽度                                        | `Aside` 内联宽度                                                    |
| RTL 支持            | 逻辑属性（`start-*`、`end-*`、`ps-*`、`pe-*`）+ rail 的 `rtl:` 变体                | —                                                       | —                                                                   |
| Z-index 协调        | `baseZIndex` 派生 sidebar/header/tab/footer 的 z-index                             | 手动                                                    | 手动                                                                |
| 区域可见性          | `sidebarVisible` / `headerVisible` / `tabVisible` / `footerVisible` props          | 移除组件                                                | 移除组件                                                            |

### 运行时注意事项

1. **CSS 变量以 rem 为单位** — `sidebarWidth`、`collapsedSidebarWidth`、`headerHeight`、`tabHeight`、`footerHeight`、`mobileSidebarWidth` 通过 `pxToRem` 转换（默认 `px / 16`）。如根字号非 16px，请传入自定义 `pxToRem`。
2. **`size` 缩放间距与字号** — UI 包装层将像素尺寸乘以 `themeSizeRatio[size] / themeSizeMap.md`，因此 `size="xs"` 会同时缩小文字与侧边栏宽度。
3. **移动端检测是声明式的** — `isMobile` 是 prop（非内部逻辑）。可搭配 `@vueuse/core` 的 `useMediaQuery` 或服务端检测来切换抽屉。
4. **`LayoutTrigger` 与 `LayoutRail` 的区别** — `LayoutTrigger` 是头部中可聚焦的按钮，面向键盘用户；`LayoutRail` 是边缘拖拽热区，`tabindex="-1"`（仅可点击）。两者都通过 `aria-expanded` 反映状态。
5. **`Layout` 占位元素** — 启用 `fixedTop` 或 `fixedFooter` 时，`LayoutPlaceholder` 渲染空的占位 div（`data-soybean-layout-{header|tab|footer}-placeholder`），防止内容滑入固定区域下方。
6. **`scrollId` 用于滚动恢复** — `Layout` 在滚动元素（wrapper 或 content，取决于 `scrollBehavior`）上生成稳定的 `soybean-layout-scroll-{id}`。传入 `scrollId` 可使其在 SSR/CSR 间确定一致。

## 常见问题

### 该使用哪种布局模式？

使用 `SLayout` 即可覆盖现代应用外壳与管理后台两类场景。它通过单一组件统一处理固定头部/底部、方向切换（`horizontal` / `vertical`）以及容器级滚动 + 占位间距。

### 如何控制侧边栏的展开状态？

使用 `v-model:open`（受控）或 `default-open`（非受控）。状态通过根元素的 `data-state="expanded|collapsed"` 以及 `LayoutTrigger`/`LayoutRail` 的 `aria-expanded` 反映。

### 如何让侧边栏折叠为图标而非滑出？

设置 `collapsible="icon"`（默认）并将 `collapsedSidebarWidth` 设为 rail 宽度。侧边栏会收缩到折叠宽度，`sidebarGapHandler` 相应调整主区域。使用 `collapsible="offcanvas"` 可改为滑出视口。

### 移动端模式如何工作？

传入 `isMobile` 即可将桌面侧边栏切换为基于 `Dialog` 的抽屉。抽屉继承 `mobileSidebarWidth` 并复用同一个 `sidebar` slot 内容。遮罩与焦点陷阱由底层 `Dialog` 组件提供。

### 可以把侧边栏放在右侧吗？

可以 — 设置 `side="right"`。布局使用 RTL 友好的逻辑属性（`start-*`、`end-*`、`border-s`、`border-e`），因此侧边栏、间距处理器、rail 光标以及固定头部/底部的 inset 都会正确翻转。

### z-index 如何协调？

`Layout` 接受 `baseZIndex`（默认 `50`）。sidebar、header、tab、footer 的 z-index 均由此基础值派生，确保堆叠可预测。派生值通过 `--soybean-layout-{sidebar|header|tab|footer}-z-index` CSS 变量暴露。

### 如何定制区域级属性？

每个区域在 compact 组件上接受一个 `*Props` prop（如 `sidebarProps`、`headerProps`、`tabProps`、`contentProps`、`footerProps`、`mainProps`、`railProps`、`mobileProps`），这些属性会透传到对应的 headless 区域组件。
