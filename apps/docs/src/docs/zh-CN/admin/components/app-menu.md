# AppMenu

## 概览

`SAppMenu` 基于 `@soybeanjs/ui` 的菜单原语，按 `mode` 渲染对应导航形态。它会消费 `SAppLayout` 提供的 `AppLayoutContext`（`mode` / `siderCollapse` / 挂载点）；独立使用时则回退到自身属性并就地渲染。

支持六种形态分支：`vertical`（`STreeMenu`）、`horizontal`（`SMenubar`）、`vertical-mix`、`vertical-hybrid`、`top-sidebar`、`top-header`（头部轨道 + 树形 / 图标轨道组合）。

## 用法

<UsageCode component="app-menu" />

## 特性

- 🧭 六种导航形态——由 `mode` 驱动（嵌套在 `SAppLayout` 中时自动同步）
- 🗂️ 数据驱动——传入类型化 `AppMenuData[]` 树（key / label / icon / badge / children / hideInMenu / disabled）
- 🎛️ 受控或非受控选中——`selectedKey` / `defaultSelectedKey`、`expanded` / `defaultExpanded`
- 📐 折叠——`siderCollapse` 折叠为图标并支持 `collapsedWidth`
- 🌗 反色样式——`inverted` 用于深色侧边栏表面
- 📌 Mix 模式——`mixSiderFixed` 固定子抽屉；`autoSelectFirstMenu` 跳转最深叶子
- 📍 Teleport——`headerMenuEl` / `siderMenuEl` 将头部/侧边分支挂载到 `SAppLayout` 区域
- 🧩 `top` / `bottom` 插槽用于在选项周围放置自定义内容

## 示例

<PlaygroundGallery component="app-menu" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'data', type: 'AppMenuData[]', default: '-', description: '菜单数据模型。' },
  { name: 'mode', type: 'AppMenuMode', default: `'vertical'`, description: '菜单形态；未设置时从 `AppLayoutContext` 解析。' },
  { name: 'selectedKey', type: 'string', default: '-', description: '当前选中菜单 key（受控，`v-model:selected-key`）。' },
  { name: 'defaultSelectedKey', type: 'string', default: '-', description: '初始渲染时的选中 key（非受控）。' },
  { name: 'expanded', type: 'string[]', default: '-', description: '展开的菜单 key 集合（受控，`v-model:expanded`）。' },
  { name: 'defaultExpanded', type: 'string[]', default: '-', description: '初始渲染时的展开 key 集合（非受控）。' },
  { name: 'siderCollapse', type: 'boolean', default: '-', description: '菜单是否折叠为图标；未设置时从 `AppLayoutContext` 解析。' },
  { name: 'inverted', type: 'boolean', default: 'false', description: '是否使用反色（深色）样式。' },
  { name: 'collapsedWidth', type: 'number', default: '50', description: '折叠态菜单宽度。' },
  { name: 'mixSiderFixed', type: 'boolean', default: '-', description: 'mix 模式子抽屉是否固定。' },
  { name: 'mixMenuWidth', type: 'number', default: '220', description: 'mix 模式子抽屉宽度（px）。' },
  { name: 'autoSelectFirstMenu', type: 'boolean', default: 'true', description: 'mix 模式下选中父级时是否自动选中最深叶子。' },
  { name: 'headerMenuEl', type: 'string', default: '-', description: '头部级菜单挂载的元素 id。' },
  { name: 'siderMenuEl', type: 'string', default: '-', description: '侧边级菜单挂载的元素 id。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根类名。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:selectedKey', parameters: '[value: string | undefined]', description: '选中菜单 key 变化时触发。' },
  { name: 'update:expanded', parameters: '[value: string[]]', description: '展开 key 集合变化时触发。' },
  { name: 'update:siderCollapse', parameters: '[value: boolean]', description: '切换侧边栏折叠状态时触发。' },
  { name: 'update:mixSiderFixed', parameters: '[value: boolean]', description: '切换 mix 模式子抽屉固定状态时触发。' },
  { name: 'select', parameters: '[key: string]', description: '选中叶子菜单项时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'top', parameters: '-', description: '菜单选项之前渲染的自定义内容。' },
  { name: 'bottom', parameters: '-', description: '菜单选项之后渲染的自定义内容。' },
]"/>

## 说明

### 数据模型

`AppMenuData` 节点包含 `key`（路由名）、可选 `routeKey`、`label`、`icon`（iconify 名）、`children`、`hideInMenu`、`badge` 与 `disabled`。隐藏节点与无可视后代的条目会被自动剪除。
