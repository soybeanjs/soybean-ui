# 树选择

## 概述

从层级树中选择节点的 select 风格控件。`STreeSelect` 组合 headless `TreeSelectRoot`/`TreeSelectTrigger`/`TreeSelectContent`（基于 `PopperRoot` 的浮动触发器）与现有 `TreeRoot`/`TreeItem` 树原语，并应用 `treeSelectVariants` 配方（6 种尺寸、8 种颜色）。适用于扁平 `select` 无法表达层级关系的场景——例如选择分类、组织单元或文件路径。扁平选项列表请优先使用 `select`；层级本身是主要内容时使用 `tree`；多级路径选择使用列布局的 `cascader`。

## 用法

<UsageCode component="tree-select" />

## 特性

- 🧩 headless/styled 分离 — `TreeSelectRoot` 负责值/打开状态与选中标签解析；树复用现有 `TreeRoot`/`TreeItem` 原语
- 🏗 `items` 接受递归的 `{ value, label, disabled, children }` 结构
- ☑️ `multiple` 切换为复选框选择，支持 `propagate-select`（父选子随）与 `bubble-select`（子选更新父）
- 🔍 触发器显示选中值的解析标签（逗号连接），或 `placeholder`
- 🧩 `#node` 插槽接收扁平化条目 + 树插槽参数，用于自定义节点渲染（图标、徽标）
- ⌨️ 完整树键盘导航——方向键遍历、Enter/Space 选择、输入聚焦——来自 headless `TreeRoot`
- 🧭 `v-model` 绑定值，`v-model:open` 绑定弹窗；`dir` 从 `SConfigProvider` 解析
- 🎨 `treeSelectVariants` — 触发器 6 尺寸 × 8 颜色；`scv()` 插槽覆盖 trigger/value/placeholder/popup/panel/node

## 演示

<PlaygroundGallery component="tree-select" />

## API

<ComponentApi component="tree-select" />

## 注意事项

### 架构与行业对标

SoybeanUI 通过在 `PopperRoot` 触发器/内容对内部组合现有 headless `TreeRoot`/`TreeItem`（选择、展开、键盘导航、RTL）构建树选择，因此不重复树逻辑。与 Ant Design `TreeSelect`、Element Plus `el-tree-select`、Naive UI `n-tree-select` 相比，SoybeanUI 是唯一同时具备 headless/styled 分离、逐插槽 `ui` 类覆盖以及完整复用独立树组件的对标库；搜索/过滤与异步懒加载尚未内置——需要时可直接使用树原语。

| 能力                 | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :------------------- | :-------: | :--------: | :----------: | :------: |
| headless/styled 分离 |    ✅     |     —      |      —       |    —     |
| 单选/多选            |    ✅     |     ✅     |      ✅      |    ✅    |
| 复选级联             |    ✅     |     ✅     |      ✅      |    ✅    |
| 键盘导航             |    ✅     |     ✅     |      —       |    ✅    |
| 自定义节点渲染       |    ✅     |     ✅     |      ✅      |    ✅    |
| 搜索/过滤            |     —     |     ✅     |      ✅      |    ✅    |
| 异步懒加载           |     —     |     ✅     |      ✅      |    ✅    |
| RTL 支持             |    ✅     |     —      |      —       |    —     |
| 逐插槽 `ui` 覆盖     |    ✅     |     —      |      —       |    —     |

### 使用注意

- 弹窗通过 Teleport 渲染并使用 dismissable-layer 栈；点击外部或按 Escape 关闭。
- 父节点仅在设置 `allow-parent-select` 时可选择；默认带子节点的父节点仅作展开器。
- `multiple` 的值为数组；开启 `propagate-select` 后勾选父节点会同时选中其全部后代。

## 常见问题

### 如何启用多选？

设置 `multiple`。值变为 `string[]`；配合 `propagate-select`/`bubble-select` 实现父子级联。

### 如何自定义节点渲染？

使用 `#node` 插槽。接收扁平化 `item`（`{ data, level, hasChildren, ... }`）以及树条目的插槽参数（`isSelected`、`isExpanded` 等）。

### 如何默认展开层级？

传入 `default-expanded`，值为需要初始展开的节点值数组。

### 如何控制弹窗？

绑定 `v-model:open` 使用受控弹窗，或不绑定保持非受控。触发器支持点击与键盘激活切换。
