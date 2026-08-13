# 列表

## 概述

用于展示垂直列表项列表的语义化容器。`SList` 包裹 headless 层 `ListRoot`（`<ul>`），并注入 `listVariants` 样式配方（5 个槽：root/item/content/title/description；6 种尺寸）。`SListItem` 组合 headless 层 `ListItem`/`ListContent`/`ListTitle`/`ListDescription` 基础组件，形成现成的「标题 + 描述」行。

适用于用户列表、设置/菜单分组、通知流，或任何简单的垂直集合。表格化、带列与排序的数据请优先使用 `table`；层级数据请优先使用 `tree`；可选的选项列表请优先使用 `select`/`combobox`。

## 用法

<UsageCode component="list" />

## 特性

- 🧩 Headless/样式分离 — `SList`/`SListItem` 包裹 headless 层 `ListRoot` 系列基础组件，仅注入 `listVariants` 类
- 📋 语义化标记 — 渲染真实的 `<ul>`/`<li>`，带 `data-soybean-list-*` 钩子
- 🏷️ 条目组合 — `SListItem` 通过 `title`/`description` prop 或插槽渲染可选的标题 + 描述区块
- ↔️ 前导 / 尾随 — `SListItem` 上的 `leading`/`trailing` 插槽，用于图标、徽标、头像或操作
- 🎨 6 种尺寸 — 匹配 `ThemeSize` 的 xs–2xl `size`
- 🎛️ 逐槽控制 — `contentProps`/`titleProps`/`descriptionProps` 转发到各条目部件
- ♿ 无障碍友好 — 语义化列表结构，`axe-core` 零违规

## 组件家族

- `SList`（样式层）— 列表容器；`listVariants` 的 root 槽
- `SListItem`（样式层）— 条目行；组合 headless 层的 item/content/title/description 部件，暴露 `leading`/`trailing`/`title`/`description`/默认插槽
- `ListRoot`（headless）— `<ul>` 根
- `ListItem`（headless）— `<li>` 条目
- `ListContent` / `ListTitle` / `ListDescription`（headless）— 条目的内容、标题与描述部件

## 演示

<PlaygroundGallery component="list" />

## API

<ComponentApi component="list" />

## 注意事项

### 架构与对标差异

`SList`/`SListItem` 是包裹 headless 列表基础组件的薄样式包装，全部样式收敛于 `listVariants`。这与 shadcn/ui 的 headless 分离一致；而 Ant Design、Element Plus、Mantine、Naive UI 则提供配置驱动的列表（`dataSource`/`renderItem`）。SoybeanUI 刻意将 `SList` 保持为展示型容器——数据迭代由使用者负责——因此超大数据的虚拟滚动由独立的 `virtualizer` 组件承担，而非内置虚拟滚动。

| 能力              | SoybeanUI | shadcn/ui | Ant Design List | Element Plus | Mantine List | Naive UI |
| :---------------- | :-------: | :-------: | :-------------: | :----------: | :----------: | :------: |
| Headless/样式分离 |    ✅     |    ✅     |        —        |      —       |      —       |    —     |
| 语义化 `ul`/`li`  |    ✅     |    ✅     |       ✅        |      ✅      |      ✅      |    ✅    |
| 标题 + 描述条目   |    ✅     |     —     |       ✅        |      ✅      |      ✅      |    ✅    |
| 前导 / 尾随插槽   |    ✅     |     —     |       ✅        |      ✅      |      ✅      |    ✅    |
| 尺寸变体（6）     |    ✅     |     —     |       ✅        |      ✅      |      ✅      |    ✅    |
| 内置虚拟滚动      |    ➕     |     —     |       ✅        |      —       |      ✅      |    ✅    |

`—` = 不支持或采用不同交互模型；`➕` = 有价值增强项（交由 `virtualizer` 承担）。

### 运行时注意

- `SList` 是展示型容器：不持有数据迭代或虚拟滚动。1k+ 条目请直接渲染条目，或与独立的 `virtualizer` 组件组合。
- 条目渲染为 `<ul>` 内的 `<li>`。请保持直接子节点为列表项，避免嵌套会破坏列表语义的完整交互块。
- 需要「标题 + 描述」行时使用 `SListItem`；简单列表也可直接在 `SList` 中放置原生 `<li>` 元素。
- `title` 以纯文本渲染在 `ListTitle` 中（带样式的块，非标题元素）；若内容属于文档大纲，请配合语义化标题使用。

### Roadmap

内置虚拟化列表或 `dataSource`/`renderItem` 配置模式为已评估增强项，当前交由独立的 `virtualizer` 承担（见 `docs/roadmap.md`）。

## FAQ

### 如何构建带标题与描述的列表？

使用带 `title`/`description` 的 `SListItem`：

```vue
<SList>
  <SListItem title="更新日志" description="查看 v0.29 的新内容" />
  <SListItem title="指南" description="一步步教程" />
</SList>
```

### 如何在条目中添加图标或头像？

使用 `leading` 插槽（操作用 `trailing`）：

```vue
<SListItem title="Jenny" description="产品设计师">
  <template #leading><SAvatar src="/jenny.png" fallback-label="J" /></template>
  <template #trailing><SIcon icon="lucide:chevron-right" /></template>
</SListItem>
```

### 如何改变列表尺寸？

传入 `size`（xs–2xl）：

```vue
<SList size="lg">
  <SListItem title="大号列表" />
</SList>
```

### 如何高效渲染超大列表？

`SList` 是展示型容器——1k+ 行请直接渲染条目，或使用独立的 `virtualizer` 仅保留可见行在 DOM 中。

### 如何让条目可点击？

列表项默认不可交互，请自行包裹可点击表面（链接或 `SButton`）：

```vue
<SList>
  <SListItem title="打开资料">
    <template #trailing><a href="/profile" class="text-primary">查看</a></template>
  </SListItem>
</SList>
```
