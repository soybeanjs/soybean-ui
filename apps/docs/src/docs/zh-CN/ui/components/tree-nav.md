# 树形导航

## 概述

TreeNav 是一个数据驱动的水平导航栏，携带持久选择态：顶层条目横向排列，分支项默认悬停展开弹层，选中任意叶子后整条祖先链持续高亮。

`STreeNav` 是 `STreeMenu` 的横向版本：两者消费同一份树形 `items` 数据（`TreeNavOptionData`）并基于选中值派生高亮，区别在于 TreeNav 的分支渲染为 DropdownMenu 弹层而非折叠分组。逻辑与无障碍语义由 headless `TreeNavCompact` 承载，样式通过 `scv()` 配方注入。

> 与 Menubar（瞬态"哪个菜单正打开"的命令菜单模型）不同，TreeNav 建模的是**选择**：打开弹层永远不会激活任何条目——只有叶子被选中才会。选中叶子的祖先链会持续携带高亮标记。

## 功能特性

- **持久选择态** — 绑定 `modelValue`（`v-model`）或用 `defaultValue` 设置初始值；弹层关闭后选择依然保留。
- **高亮派生** — 选中的叶子渲染 `data-active="true"`，其祖先链上的每一层渲染 `data-child-active`；派生复用共享树路径工具，任意深度均可正确传播。
- **悬停优先的弹层** — 分支弹层默认悬停展开（可用 `trigger="click"` 覆盖），通过 `delayDuration` / `skipDelayDuration` 微调时序。
- **对齐 TreeMenu 的数据形态** — 一份 `items` 数组（`TreeNavOptionData`：`value` / `label` / `icon` / `children` / `href` / `to` / `disabled` …）与 TreeMenu 的选项模型保持一致；徽标、标签、操作按钮等条目自定义能力通过插槽实现，不再依赖额外数据字段。
- **链接型顶层项** — 提供 `href` / `to` 的顶层项渲染为链接，点击同时更新选择。
- **溢出折叠** — 开启 `collapsible` 后，超宽的末尾顶层项自动合并进尾部"更多"弹层，始终贴合容器宽度；可通过 `moreLabel` / `moreIcon` / `moreProps` / `more-trigger` 插槽定制。
- **导航语义** — 根元素渲染 `<nav>`（可用 `as` 覆写）；触发器的 `aria-haspopup` / `aria-expanded`、Escape 关闭等语义继承自 DropdownMenu 层。
- **逐项与整体禁用** — `item.disabled` 使单个条目惰性；栏级 `disabled` 一次禁用全部。
- **六种尺寸与两种变体** — `size`（xs…2xl）加 `variant="default"`（浅色卡片底）或 `variant="nav"`（纯净无框）。
- **插槽透传** — `item` / `item-leading` / `item-trailing` / `item-trigger-icon` / `item-link-icon` 同时透传到顶层与弹层内部。
- **Headless 组合** — 无样式数据驱动用法可导入 `@soybeanjs/headless/tree-nav`；弹层选项复用 `MenuOptionsCompact`。

## 用法

<UsageCode component="tree-nav" />

## 演示

<PlaygroundGallery component="tree-nav" />

## API

<ComponentApi component="tree-nav" />

## 备注

### 各导航组件如何选型

| 组件              | 状态模型                   | 方向 | 适用场景                  |
| :---------------- | :------------------------- | :--- | :------------------------ |
| `SMenubar`        | 打开的菜单（`modelValue`） | 横向 | 应用命令菜单（File/Edit） |
| `SNavigationMenu` | 无选择态                   | 横向 | Radix 风格内容面板        |
| `STreeMenu`       | 持久选择态                 | 纵向 | 侧边栏导航                |
| `STreeNav`        | 持久选择态                 | 横向 | 顶部导航栏                |

### 运行时注意事项

1. **打开 ≠ 激活** — 弹层打开状态是 DropdownMenu 内部管理的瞬时 UI 态；只有叶子选中才更新 `data-active`。不要沿用 `SMenubar` 的 `modelValue` 语义。
2. **折叠后的高亮一致性** — 选中项被收进"更多"弹层后，其可见祖先仍显示 `data-child-active`，因为派生始终基于完整的 `items` 列表。
3. **折叠测量** — 与 Menubar 的溢出折叠一样，测量在挂载后基于真实布局进行；父容器请提供受限宽度（如 `max-w-*` / 固定宽度）。首帧可能先全量渲染再收缩。
4. **受控模式** — 提供 `modelValue` 时内部只触发 `update:modelValue`；非受控用法用 `defaultValue` 设定初始值。

## FAQ

### 如何让顶层条目直接跳转而不是展开下拉？

给该条目设置 `href` 或 `to`——链接型条目渲染为 `<a>` 元素，点击同时更新选择。

### 如何精确控制哪个条目保持高亮？

绑定 `v-model` 即可。选中的值会与整棵 `items` 树比对：命中的叶子获得 `data-active`，其祖先获得 `data-child-active`。

### 为什么悬停分支不会让它变为激活？

打开弹层是瞬时状态而非选择——请在弹层内选中某个叶子。这与 `STreeMenu` 中"容器节点不携带 active 态"的行为一致。

### 导航栏放不下怎么办？

传入 `collapsible`。超出容器宽度的末尾条目会自动合并进"更多"弹层（默认文本 `More`），并在容器尺寸变化时自动重算。
