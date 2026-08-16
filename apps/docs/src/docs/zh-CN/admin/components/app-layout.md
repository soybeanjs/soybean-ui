# AppLayout

## 概览

`SAppLayout` 是 `@soybeanjs/admin` 的统一应用壳。它渲染完整的后台页面骨架——侧边栏、头部、多页签栏、内容区与页脚，并通过单一 `mode` 属性驱动导航形态，使布局骨架与 `SAppMenu` 始终保持同步。

其底层基于统一的 `SLayout` 组件——单一布局同时提供侧边栏变体（`sidebar` / `floating` / `inset`）、`orientation`、`scrollBehavior` 以及固定头部/页签/页脚行为。所有布局属性/插槽均透传，并由壳组件持有侧边栏开合状态（`v-model:open`）与针对 `mobileBreakpoint` 的响应式移动端检测。

## 用法

<UsageCode component="app-layout" />

## 特性

- 🏗️ 统一壳——单一 `SLayout` 底座，通过 `variant`（`sidebar` / `floating` / `inset`）、`orientation`、`scrollBehavior`、`fixedTop` / `fixedFooter` 控制外壳呈现
- 🧭 六种导航形态——`vertical`、`vertical-mix`、`vertical-hybrid`、`horizontal`、`top-sidebar`、`top-header` 同时驱动布局与 `SAppMenu`
- 🎛️ 受控侧边栏——`v-model:open` + `defaultOpen` 实现响应式折叠
- 📱 移动端抽屉——未显式指定时按视口宽度与 `mobileBreakpoint`（默认 `768`）判断
- 📍 挂载点——`headerMenuEl` / `siderMenuEl` 提供给 `SAppMenu` 的 teleport 目标 id（默认 `app-header-menu` / `app-sider-menu`）
- 📐 主题尺寸——`size` 接受任意 `ThemeSize`（xs–2xl）
- 🎨 插槽类覆盖——`ui` 向底层布局透传各插槽类

## 示例

<PlaygroundGallery component="app-layout" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'variant', type: `'sidebar' | 'floating' | 'inset'`, default: `'sidebar'`, description: '底层布局的侧边栏视觉变体。' },
  { name: 'mode', type: 'AppLayoutMode', default: `'vertical'`, description: '统一的布局/菜单模式。' },
  { name: 'open', type: 'boolean', default: '-', description: '受控侧边栏开合状态（`v-model:open`）。' },
  { name: 'defaultOpen', type: 'boolean', default: 'true', description: '非受控时的初始侧边栏开合状态。' },
  { name: 'sidebarVisible', type: 'boolean', default: 'true', description: '是否渲染侧边栏。' },
  { name: 'headerVisible', type: 'boolean', default: 'true', description: '是否渲染头部。' },
  { name: 'tabVisible', type: 'boolean', default: 'true', description: '是否渲染多页签栏。' },
  { name: 'footerVisible', type: 'boolean', default: 'true', description: '是否渲染页脚。' },
  { name: 'isMobile', type: 'boolean', default: '-', description: '强制移动端抽屉模式；未设置时按视口宽度判断。' },
  { name: 'mobileBreakpoint', type: 'number', default: '768', description: '进入移动端模式的视口宽度阈值（px）。' },
  { name: 'headerMenuEl', type: 'string', default: `'app-header-menu'`, description: '头部级菜单 teleport 目标的元素 id。' },
  { name: 'siderMenuEl', type: 'string', default: `'app-sider-menu'`, description: '侧边级菜单 teleport 目标的元素 id。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '应用壳的视觉尺寸。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根类名。' },
  { name: 'ui', type: 'Partial<LayoutUi>', default: '-', description: '各插槽类覆盖。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '[value: boolean]', description: '侧边栏开合状态变化时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'sidebar', parameters: '-', description: '侧边栏内容（可放置 `#app-sider-menu` 容器供 `SAppMenu` 挂载）。' },
  { name: 'header', parameters: '-', description: '头部内容（可放置 `#app-header-menu` 容器供头部级菜单挂载）。' },
  { name: 'tab', parameters: '-', description: '多页签栏内容。' },
  { name: 'footer', parameters: '-', description: '页脚内容。' },
  { name: 'default', parameters: '-', description: '主内容区。' },
]"/>

## 说明

### 组合一个应用壳

应用壳本身不渲染导航，只预留区域。在侧边栏组合 `SAppLogo`，通过 `#app-sider-menu` / `#app-header-menu` 容器挂载 `SAppMenu`，再用 `SAppPageHeader`、`SAppBreadcrumb`、`SAppFooter` 组织页面骨架。可参见 playground 的「Admin Shell」示例获取完整可运行组合。
