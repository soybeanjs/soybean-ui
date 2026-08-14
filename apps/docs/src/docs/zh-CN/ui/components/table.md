# 表格

## 概述

用于展示行列数据的数据表格组件。`STable` 将 headless 层 `TableCompact` 聚合组件（`TableRoot` 一族的 9 个基础原语，零样式）与 `tableVariants` 样式配方（29 个槽位，7 种尺寸 × 2 种视觉变体）组合。支持**配置式 `columns`**（分组表头、`index`/`selection`/`expand` 类型列）、排序、筛选、多选/单选、展开行与树形行、固定列/表头、列宽拖拽调整与键盘调整、虚拟滚动与空状态展示；`default`/`simple` 两种变体配合 `bordered`/`rounded`/`striped` 开关。所有交互文案与 `aria-label`（排序、筛选、选择、展开、列宽调整）均经 `useLocaleMessages` 本地化。

## 用法

<UsageCode component="table" />

## 特性

- 📋 配置式列模型 — `columns: TableColumn<T>[]` 支持分组表头（`children`）、`index`/`selection`/`expand` 类型列、`fixed`/`width`/`align`/`hidden`；`rowKey` 保证行身份稳定
- 🔀 排序 — `sorter: true` 或自定义比较函数；受控 `sortState` / `v-model:sortState` 或非受控 `defaultSortState`；`aria-sort` + 排序按钮 `aria-label` 本地化
- 🔍 筛选 — `filter: true` 或 `TableColumnFilter`（选项 + 关键字匹配 + 自定义 `match`）；弹层内关键字搜索、选项多选、汇总计数与清除操作全部本地化
- ✅ 选择 — 默认多选（`multiple` 默认 `true`，复选框 + 表头全选），`multiple={false}` 切换为单选（行内 radio）；受控 `selected` / `v-model:selected`
- 🧩 展开与树形 — `expand` 类型列或 `expanded-row` 插槽渲染展开行；`children`/`getChildren` 驱动树形行，行内 `tree-toggle` 切换展开态
- 📐 固定与调整 — `fixed: 'start' | 'end'` 固定列 + 阴影渐变指示；`resizable` 列支持指针拖拽与方向键键盘调整（`aria-label` 本地化）
- ⚡ 性能 — `virtual` + `height` 启用虚拟滚动（自定义 `estimateSize`/`virtualizerOptions`），仅渲染可视行
- 🌐 默认本地化 — 空状态、排序/筛选/选择/展开/列宽调整的 `aria-label` 与筛选弹层文案全部经 `useLocaleMessages`（21 条 `table.*` 消息，14 语言包）

## 组件家族

- `STable`（styled）— 入口包装；`tableVariants` 配方（29 槽位 = 16 个 headless 槽 + 11 个筛选/选择扩展槽 + 2 个内部 radio 槽）；`useOmitProps` 转发 + `useForwardListeners` 事件合并 + 全插槽透传；注入默认 `header-selection`/`selection`/`header-sort`/`header-filter`/`header-resize`/`tree-toggle`/`expand`/`empty` 插槽内容
- `TableCompact`（headless）— 聚合状态所有者：`useTableCompactState`（`expanded`/`sortState`/`filterState`/`columnWidths` 经 `useControllableState`，`selected`/`multiple` 经 `useSelection`）、`useTableCompactData`（树构建/排序/筛选/扁平化）、`useTableCompactResize`（指针 + 键盘列宽）、`useTableCompactVirtual`；`provideTableCompactContext` 桥接 9 个原语
- `TableRoot`（headless）— 根元素，`dir` 方向，渲染 `data-soybean-table-root` 与表语义容器
- `TableScroll` / `TableContent` / `TableHeader` / `TableBody` / `TableFooter` / `TableRow` / `TableHead` / `TableCell`（headless）— 9 个基础原语，全部零样式，渲染 `data-soybean-table-*` 数据属性
- `TableCompactHead` / `TableCompactRow` / `TableCompactCell` / `TableCompactExpandedRow` / `TableVirtualSpacerRow`（headless 内部）— Compact 聚合内部的组合与渲染组件（不对外导出）
- `STableFilterPopover`（styled 内部）— 筛选弹层（SPopover + SInput + SCheckbox + SButton），本地化搜索/选项/汇总/清除
- `STableRadio`（styled 内部）— 单选模式的行内 radio 按钮（`aria-pressed` 语义），直接消费 `tableVariants` 的 `radioRoot`/`radioIndicator` 槽
- `useTable` / `usePaginatedTable`（UI hooks）— 基于 `@soybeanjs/hooks` 的客户端排序/筛选/分页组合钩子

## 演示

<PlaygroundGallery component="table" />

- 01 Basic — 基础 `columns` + `data` 渲染
- 02 Variant — `default` / `simple` 视觉变体
- 03 Bordered — `bordered` 边框开关
- 04 Rounded — `rounded` 圆角开关
- 05 Striped — `striped` 斑马纹
- 06 Empty — 空状态（默认 SEmpty 与自定义 `empty` 插槽）
- 07 Grouped — 分组表头（`children`）
- 08 Sorting — `sorter` + 受控/非受控排序
- 09 Filtering — `filter` 选项与关键字筛选弹层
- 10 Fixed — `fixed: 'start' | 'end'` 固定列
- 11 Resizable — `resizable` 列宽拖拽/键盘调整
- 12 Tree — 树形行（`children` + `tree-toggle`）
- 13 Virtualized — `virtual` + `height` 虚拟滚动
- 14 Expandable — `expand` 列与 `expanded-row` 插槽
- 15 Footer — `footer` 汇总插槽
- 16 Bottom — `bottom` 底部插槽
- 17 Multiple Selection — 多选（复选框 + 全选）
- 18 Single Selection — `multiple={false}` 单选（radio）
- 19 Row Events — `rowClick`/`rowDblclick`/`rowContextmenu` 等行事件
- 20 Sizes — 7 种尺寸（xs–2xl）

## API

<ComponentApi component="table" />

## 说明

### 架构与对标差异

`TableCompact` 拥有全部状态与数据管线（`useControllableState` 受控/非受控双通道 + `useSelection` 多选/单选 + 树构建/排序/筛选/虚拟化），所有基础原语保持零样式，仅 UI 包装注入 `tableVariants` 类名。筛选弹层与单选 radio 作为 UI 内部组件被默认插槽消费，但消费者可用同名插槽（`header-filter`/`selection` 等）整体替换。排序按钮与筛选触发器为绝对定位图标按钮，配合本地化 `aria-label` 保持可访问；列宽调整同时支持指针（`PointerEvent`）与键盘（方向键）两种通道。虚拟滚动基于 `@soybeanjs/headless` 内置 virtualizer，仅渲染可视行并同步测量列宽。而 Ant Design / Element Plus 的表格为声明式组件实例（`el-table-column`），固定列依赖配置类名；SoybeanUI 的受控状态与 `aria-sort` 语义、以及全链路本地化（含筛选弹层）超出多数主流库。

| 能力                            | SoybeanUI | Ant Design | Element Plus | Naive UI | Mantine Table |
| :------------------------------ | :-------: | :--------: | :----------: | :------: | :-----------: |
| headless/样式分离               |    ✅     |     —      |      —       |    —     |       —       |
| 配置式 columns + 分组表头       |    ✅     |     ✅     |      ✅      |    ✅    |      ✅       |
| 排序（aria-sort + 受控/非受控） |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 筛选（关键字 + 选项多选）       |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 选择（多选/单选 + 全选）        |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 展开行 + 树形行                 |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 固定列 / 固定表头               |    ✅     |     ✅     |      ✅      |    ✅    |      ⚠️       |
| 列宽拖拽 + 键盘调整             |    ✅     |     ✅     |      ⚠️      |    ✅    |       —       |
| 虚拟滚动                        |    ✅     |     ✅     |      ⚠️      |    ✅    |      ⚠️       |

`⚠️` = 部分支持（Mantine Table 的排序/筛选/选择为手动实现；Element Plus 虚拟滚动仅存在于独立的 `el-table-v2`；Element Plus 列宽拖拽仅限 `border` 模式）。

### 注意事项

- `columns` 中 `dataIndex` 使用类型安全路径（`Path<TableRowValue<T>>`），与 `T` 的行数据形状严格绑定；分组列（`children`）不能同时声明 `dataIndex`/`sorter`/`filter`。
- `multiple` 默认 `true`（多选）；设置为 `false` 后行内渲染 radio，此时 `selected` 为单值（`R | undefined`），表头全选复选框不渲染。
- 排序/筛选/列宽/展开/选中均为**受控/非受控双通道**：传入 `sortState` 等值时必须同时监听对应的 `update:sortState`（或使用 `v-model:sortState`）完成回写，否则状态不会更新。
- `expanded` 受控状态以行 `rowKey` 为键；`defaultExpandAll` 仅在非受控展开（无 `expanded`）时生效。
- 虚拟滚动需要设置 `height`；未设置高度时 `virtual` 不生效（回退为普通渲染）。
- 固定列在 `data-fixed` 单元格上注入背景色，`fixed` 列阴影通过 `data-fixed-last-start`/`data-fixed-first-end` 数据属性绘制渐变；自定义 `cell`/`row` 插槽时请保留这些数据属性以维持视觉一致性。
- 筛选弹层文案（汇总、关键字、选项、清除）与空状态跟随 ConfigProvider 语言环境；列名取自 `title`/`key`/`dataIndex` 回退链。

## 常见问题

### 如何实现行选择并获取选中行数据？

使用 `multiple`（默认多选）配合 `v-model:selected` 与 `rowKey`：

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id" v-model:selected="selected" />
```

`selected` 为选中行的 `rowKey` 数组；需要完整行数据时用 `rowKey` 反查 `data`。

### 如何做单选表格？

设置 `multiple={false}`——行内渲染 radio 按钮，`selected` 变为单值：

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id" :multiple="false" v-model:selected="selected" />
```

### 如何自定义筛选弹层？

使用 `header-filter` 插槽整体替换默认的 `STableFilterPopover`，或在列上配置 `filter` 选项与关键字匹配：

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id">
  <template #header-filter="{ column, filtered, filterValues, setFilterValues, clearFilter }">
    <!-- 自定义筛选控件 -->
  </template>
</STable>
```

### 如何控制排序/筛选的初始值？

用非受控 `defaultSortState`/`defaultFilterState` 初始化，之后由组件内部维护；需要外部同步时改用受控通道并监听 `update:sortState`/`update:filterState`：

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id" :default-sort-state="{ key: 'age', order: 'asc' }" />
```

### 大数据量如何优化？

启用虚拟滚动（`virtual` + `height`）并按需自定义 `estimateSize`；排序/筛选管线为纯函数实现且状态使用 `shallowRef`，1000 行规模下无需额外处理。

### 如何实现表格汇总行？

使用 `footer` 插槽——它接收 `columnSize`，配合 `columns` 逐列渲染汇总单元格：

```vue
<STable :columns="columns" :data="data" :row-key="row => row.id">
  <template #footer="{ columnSize }">
    <STableRow>
      <STableCell>合计</STableCell>
      <!-- 按需渲染汇总值 -->
    </STableRow>
  </template>
</STable>
```

### 如何本地化表格文案？

空状态与所有交互 `aria-label`（排序/筛选/选择/展开/列宽）跟随 ConfigProvider 的 `locale`（`table.*` 消息，14 语言包）；需要按实例覆盖时通过 `ConfigProvider` 的 `messages` 覆盖对应键，或使用同名插槽自定义内容。
