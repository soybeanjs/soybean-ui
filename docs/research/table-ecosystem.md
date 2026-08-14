# 高级表格 / 数据网格生态调研报告

> 目的：为 SoybeanJS 规划中的外围包 `@soybeanjs/table`（基于核心 `STable` 原语的「高级数据网格 / ProTable」级别包）提供竞品与生态参考。
> 调研方式：基于官方文档、GitHub README/LICENSE、官方 API 页面等一手来源的 Web 检索与抓取；每条事实尽量附来源 URL。无法核实的点标注为「未核实」。
> 调研日期：2026-08-14

---

## 1. 调研范围与结论摘要

### 1.1 调研范围

| 类别               | 库                                                                                                                                                                         | 技术栈                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| 企业级全能网格     | AG Grid（社区版/企业版）                                                                                                                                                   | JS 核心 + React/Angular/Vue 适配  |
| 高级 ProTable 封装 | @ant-design/pro-components ProTable                                                                                                                                        | React                             |
| 通用组件库表格     | Ant Design Table（React）、Ant Design Vue a-table、Element Plus el-table/el-table-v2、Naive UI DataTable、PrimeVue DataTable、Vuetify v-data-table、TDesign Vue Next Table | React / Vue 2/3                   |
| Headless 引擎      | TanStack Table（v8 稳定版 / v9 新版）                                                                                                                                      | 框架无关 + 各框架适配器           |
| 电子表格风格网格   | Handsontable                                                                                                                                                               | JS 核心 + React/Angular/Vue3 封装 |

### 1.2 核心结论（要点）

1. **数据源抽象（服务端/客户端处理切换）是「ProTable 级」表格与普通表格的核心分界线**。ProTable 的 `request` API、Vuetify 的 `v-data-table-server`、AG Grid 的 Row Model 体系、Vuetify v0 的 `createDataTable` 适配器都证明了这一点——成熟的高级表格都内置「客户端处理 vs 服务端处理」的开关与请求适配层（[ProTable request](https://procomponents.ant.design/components/table/)；[AG Grid Community vs Enterprise](https://www.ag-grid.com/javascript-data-grid/community-vs-enterprise/)；[Vuetify createDataTable](https://0.vuetifyjs.com/composables/data/create-data-table)）。
2. **配置驱动列模型（含列分组、固定/钉住列、列显隐、列宽、列排序）是标配**，但「列可拖拽排序 + 列偏好持久化 + 自动列宽」等能力在多数 Vue 库中要么缺失、要么需要三方插件（如 AntD 的 `antd-table-enhanced`、Naive 的扩展包 [x.naive-ui](https://github.com/fudiwei/x.naive-ui/blob/main/docs/zh-CN/Component_DataTable.md)）。
3. **大数据量靠「虚拟滚动」解决**：AG Grid、TanStack+Virtual、el-table-v2、PrimeVue VirtualScroller、TDesign、Vuetify virtual、Naive UI 均支持行虚拟化，AG Grid / TanStack / PrimeVue 更进一步支持「列虚拟化」。100k+ 行是高级网格的常见基准（AG Grid README 宣称百万级、TanStack 官方示例为十万级+）。
4. **高级/企业级能力被商业授权锁定**：AG Grid 把分组/透视/主从/服务端行模型/Excel 导出/图表等放在企业版（$999/开发者）；Handsontable 把生产环境商用放进付费授权（$999+/开发者）。**「MIT 核心 + 商业高级层」是被市场验证的变现模型**，对 `@soybeanjs/table` 商业化文档有直接参考意义。
5. **Vue 生态存在明显的「Headless 高级数据网格」空白**：TanStack Table 是框架无关 Headless，但它不提供渲染层（虚拟化、固定列视觉、编辑 UI 均需自建）；而 Vue 的组件库表格（Element/Naive/PrimeVue/Vuetify/TDesign）全部是「逻辑与样式耦合」的 Styled 实现，没有一套「Headless 逻辑 + 可选 Styled UI」双层的 pro 级网格。这正是 Soybean 的 `headless/ui` 分层架构可切入的机会点。
6. **可访问性（ARIA + 键盘导航）是付费产品的重度投入点**，也是 Vue 开源表格普遍薄弱处（AG Grid [Accessibility](https://www.ag-grid.com/javascript-data-grid/community-vs-enterprise/) 列为社区核心能力，Handsontable 同样列为核心能力）。

---

## 2. 逐库分析

### 2.1 Ant Design Table（React）+ Ant Design Vue + ProTable

#### 2.1.1 Ant Design Table（React）

**数据模型**

- 配置驱动列模型：`columns: [{title, dataIndex, key, width, fixed, align, ellipsis, sorter, filters, onFilter, filterMultiple}]` + `dataSource`，另有 JSX 语法糖 `Column`/`ColumnGroup`（2.5.0 起）（[官方 Table 文档](https://ant-design.antgroup.com/components/table/)、[Table-cn](https://ant-design.antgroup.com/components/table-cn/)）。
- 列分组：通过 `columns[].children` 实现多级表头；表头/表尾分组（[rc-component/table](https://github.com/react-component/table)）。
- 列固定（pinning）：`fixed: 'left' | 'right'`，配合 `scroll.x/scroll.y`；rc-table 的 `fixed` 还支持布尔值，`minWidth` 仅当 `tableLayout='auto'` 生效（[rc-component/table README](https://github.com/react-component/table)）。
- 列显隐/列配置：核心 Table 不内置「列设置面板」，需配合 ProTable 或三方封装（如 [antd-table-enhanced](https://www.npmjs.com/package/antd-table-enhanced)：列钉住/显隐/拖拽排序/自动列宽/导出/偏好持久化）。

**交互**

- 行选择：`rowSelection`（`type: 'checkbox'|'radio'`、`selectedRowKeys`、自定义 `selections`、`getCheckboxProps` 禁用项）（[官方 Table 文档](https://ant-design.antgroup.com/components/table/)）。
- 可展开行：`expandable.expandedRowRender`、`rowExpandable`、`expandRowByClick`（[官方 Table 文档](https://ant-design.antgroup.com/components/table/)）。
- 树形数据：数据带 `children` 字段即渲染为树；`defaultExpandAllRows`、`expandedRowKeys` 受控。
- 排序/筛选：列级 `sorter`（函数或布尔）、`filters`+`onFilter`；受控 `sortOrder`/`filteredValue`。
- 编辑：核心 Table 无内建编辑，通过 `customRender` 自定义（[Ant Design Vue 文章](https://blog.csdn.net/csdn_HPL/article/details/148875608) 提到同思路）；ProTable 提供 `editable`。

**性能**

- 虚拟滚动：`virtual` 属性（5.9.0 引入），要求 `scroll.x` 与 `scroll.y` 必须为 `number` 类型（[Table-cn 虚拟列表示例](https://ant-design.antgroup.com/components/table-cn/)）。
- 底层 rc-table 支持横向滚动 + 固定列，但不原生做列虚拟化。

**扩展性**

- 单元格/表头自定义渲染：`columns[].render` / `customRender`、插槽；组件体系成熟。
- 事件面：`onChange(pagination, filters, sorter)` 统一承载排序/筛选/分页变化，便于服务端数据。

**授权**：MIT（Ant Design 为 MIT 授权，社区共识）。

**亮点/局限**

- 亮点：生态最大、文档最全；`rowSelection`/`expandable`/树形/固定列开箱即用。
- 局限：无内建列设置面板、列拖拽排序、列宽记忆；虚拟滚动要求手写 `scroll.x/y` 数字；编辑需自行拼装。

#### 2.1.2 Ant Design Vue（a-table）

- 与 React 版 API 同构：`columns`/`dataSource`/`rowKey`/`pagination`/`rowSelection`/`expandable`；列级 `sorter`、`filters`+`onFilter`、`fixed: 'left'|'right'`、`customRender`、`v-slot` 插槽（[Ant Design Vue 中文文档](https://www.antdv.com/components/table-cn)、[CSDN 解析](https://blog.csdn.net/csdn_HPL/article/details/148875608)）。
- 树形数据：`childrenColumnName` 指定子节点字段（默认 `children`），支持 `@expand` 动态加载子节点、`expandedRowKeys` 受控（[CSDN 树形表格](https://wenku.csdn.net/answer/4njtcr5v30hw)）。
- 列宽拖拽：`columns[].resizable: true` + `@resizeColumn`（需自行管理宽度变化，非内置记忆）（[CSDN 列拖拽](https://blog.csdn.net/defined_/article/details/130992315)）。
- 大数据：推荐后端分页 + `scroll.y` 虚拟滚动（[CSDN](https://wenku.csdn.net/answer/41ejd706bmwo)）。
- 授权：MIT。

#### 2.1.3 ProTable（@ant-design/pro-components）

**数据源抽象（本报告最重要的对标对象）**

- `request`：`async (params, sort, filter) => { data, success, total }`；接管 `loading`，查询表单变化/`params` 变化自动重新请求；`params` 优先级高于查询表单；`postData` 做后处理（[ProTable API](https://procomponents.ant.design/components/table/)、[pro-table api.md](https://github.com/ant-design/pro-table/blob/master/docs/api.md)）。
- `manualRequest`：是否手动触发首次请求。

**列模型增强（valueType 体系）**

- `valueType: 'money'|'date'|'dateTime'|'time'|'text'|'index'|'option'|'select'…` 驱动单元格渲染 + 自动生成查询表单控件；`valueEnum` 枚举映射；`renderFormItem`/`fieldProps` 定制表单项（[pro-table api.md](https://github.com/ant-design/pro-table/blob/master/docs/api.md)、[CSDN 汇总](https://blog.csdn.net/H5CaiNiao/article/details/126718519)）。
- `columnsState`/`columnsStateMap` + `onColumnsStateChange`：**列显隐/固定状态受控**，与 `options.setting`（列设置面板）联动；`hideInSearch` 控制是否出现在查询表单（[pro-table api.md](https://github.com/ant-design/pro-table/blob/master/docs/api.md)）。

**行为封装**

- 内置搜索表单 `search`、工具栏 `options`（密度/全屏/刷新/列设置/搜索）、`toolBarRender` 渲染自定义操作按钮、`actionRef` 命令式触发（[ProTable API](https://procomponents.ant.design/components/table/)）。
- `editable`：可编辑行配置（`type='multiple'` 等），`EditableProTable`（[CSDN EditableProTable](https://blog.csdn.net/m0_56542349/article/details/128704089)）。
- `debounceTime`（默认 10ms）、内置 ErrorBoundary（[ProTable API](https://procomponents.ant.design/components/table/)）。

**授权**：MIT（@ant-design/pro-components）。

**亮点/局限**

- 亮点：`request` 数据源抽象 + `valueType` 列模型 + 列设置/工具栏一体化，是「ProTable 级」封装的黄金标准，把「一个状态 + 一系列行为」「一个组件≈一个页面」落地。
- 局限：React-only；与 antd 强耦合；个性化强时「杀鸡用牛刀」且增加理解成本（[博客分析](https://www.cnblogs.com/shellon/p/16452395.html)）；无原生虚拟滚动（继承 antd Table 需手动配置）。

---

### 2.2 Element Plus：el-table 与 el-table-v2

**数据模型**

- `el-table`：`data` + `<el-table-column prop label width fixed type>`；`type` 支持 `selection`（多选）/`expand`（展开行）/`index`（序号）/`tree`（树形）；`children` 嵌套列 = 多级表头（[Element Plus Table 文档](https://cn.element-plus.org/zh-CN/component/table)）。
- `el-table-v2`（虚拟化表格，beta）：配置驱动 `columns` 数组（`{key, title, dataKey, width, cellRenderer}`），`fixed` 列（`true`=LEFT 或 `FixedDir.LEFT/RIGHT`），`AutoResizer` 自适应宽高，`fixed-data` 吸顶行（[table-v2.md](https://github.com/element-plus/element-plus/blob/dev/docs/en-US/component/table-v2.md)）。

**交互**

- 排序：列级 `sortable`（`default-sort`）；筛选：`filters`+`filter-method`（多选/单选）；展开行：`type="expand"` + 模板；树形：`row-key` + 懒加载 `load`；单元格合并：`span-method`；单选：`highlight-current-row` + `current-change`（[Element Plus Table 文档](https://cn.element-plus.org/zh-CN/component/table)）。
- v2：通过自定义 `cellRenderer` 实现选择、内联编辑、表头分组、筛选、排序（[table-v2.md](https://github.com/element-plus/element-plus/blob/dev/docs/en-US/component/table-v2.md)）。

**性能**

- 官方明确承认：v1 在 1000 行数据时就可能「annoying」（性能差），v2 虚拟化后「blink of an eye」渲染海量数据；v2 仍标注「still under testing, use at your own risk」，且提示网络/内存是大数据瓶颈（[table-v2.md](https://github.com/element-plus/element-plus/blob/dev/docs/en-US/component/table-v2.md)）。
- 大量社区插件解决 v1 大数据问题，例如 [el-table-virtual-scroll-next](https://www.jsdelivr.com/package/npm/el-table-virtual-scroll-next)（第三方虚拟滚动，支持动态行高）。

**授权**：MIT（[npm element-plus](https://www.npmjs.com/package/element-plus) 标注「open source software licensed as MIT」）。

**亮点/局限**

- 亮点：国内生态最大、文档中文完善；`span-method` 合并单元格、树形懒加载等开箱即用。
- 局限：v1 性能差需第三方虚拟滚动；v2 为 beta 且功能不完整（官方明示部分 API 未开发完）；无列拖拽排序/列显隐持久化；无服务端数据源抽象（需自行在事件里发请求）。

---

### 2.3 AG Grid（社区版 vs 企业版）

**版本/授权（商业化对标的核心样本）**

- 双版本：`ag-grid-community`（MIT，免费，含生产使用，无需授权）；`ag-grid-enterprise`（商业授权，生产使用必须付费；本地测试免费，或申请 30 天企业版试用）（[Community vs Enterprise 文档](https://www.ag-grid.com/javascript-data-grid/community-vs-enterprise/)）。
- 定价（2026）：企业版 **从 $999/开发者** 起；Enterprise Bundle（AG Grid 企业版 + AG Charts 企业版）**从 $1,498/开发者** 起；永久授权 + 首年更新，按开发者计费、覆盖所有项目（[License & Pricing](https://www.ag-grid.com/license-pricing/)；[第三方 2026 定价解读](https://www.simple-table.com/blog/ag-grid-pricing-license-breakdown-2026)）。
- 规模数据：1M+ 周下载、13K+ GitHub stars、90% 的 Fortune 500 使用（[License & Pricing](https://www.ag-grid.com/license-pricing/)）。

**社区版能力（免费层）**

- 排序、筛选、分页、单元格编辑、自定义单元格渲染组件、主题、可访问性（ARIA + 键盘导航）、**行列虚拟化默认开启**；支持 React/Angular/Vue/vanilla JS（[Community vs Enterprise 文档](https://www.ag-grid.com/javascript-data-grid/community-vs-enterprise/)）。

**企业版能力（付费层）**

- Server-Side Row Model（服务端按需加载大数据）、Excel 导出（样式+公式）、透视表与聚合（Pivot/Aggregation）、区域选择（Range Selection）、内嵌图表（Integrated Charts，需 AG Charts 授权）、主从视图（Master/Detail）、行分组与多列排序、剪贴板操作（Excel 式）、工具面板（Tool Panels：列/筛选面板）、自定义右键菜单与侧边栏、Set Filter、Viewport Row Model、状态栏（Status Bar）、多筛选（Multi-Filter）（[Community vs Enterprise 文档](https://www.ag-grid.com/javascript-data-grid/community-vs-enterprise/)、[README 功能表](https://github.com/ag-grid/ag-grid/blob/latest/README.md)）。
- 最新还引入 AI Toolkit / MCP Server（README 提及，[ag-grid README](https://github.com/ag-grid/ag-grid/blob/latest/README.md)）。

**性能**

- 「零第三方依赖」、虚拟化默认开启、宣称百万级数据量（[ag-grid README](https://github.com/ag-grid/ag-grid/blob/latest/README.md)）；行缓冲（row buffering）+ 块加载降低内存（[npm-compare 对比](https://npm-compare.com/ag-grid,handsontable,react-data-grid)）。

**扩展性**

- 自定义组件体系（cell renderer/editor/filter）、主题/自定义主题、多框架封装；`ag-grid-vue3` 支持 Vue 3（[ag-grid README](https://github.com/ag-grid/ag-grid/blob/latest/README.md)）。

**亮点/局限**

- 亮点：功能面最全的「数据网格」；社区版已是免费层天花板；虚拟化/无障碍/服务端模型是行业标杆。
- 局限：企业版按开发者收费、续费才能持续更新（第三方解读指出隐藏成本：团队增长=授权增长）（[simple-table 解读](https://www.simple-table.com/blog/ag-grid-pricing-license-breakdown-2026)）；学习成本高、样式需贴近设计系统（1-2 周上手）。

---

### 2.4 TanStack Table（Headless，v8 / v9）

**架构与集成模型**

- Headless：不渲染任何 DOM，不规定样式；核心为框架无关的 vanilla 引擎，官方适配 React/Vue/Solid/Svelte/Angular 等（外加 Ember/Lit/Alpine 等社区适配）；框架无关 + 组件库无关（自带 UI 或用任意组件库/设计系统，如 shadcn/ui、Radix、MUI、Mantine 官方示例）（[tanstack.com/table/v8](https://tanstack.com/table/v8)、[overview.md](https://tanstack.com/table/alpha/docs/overview.md)、[GitHub](https://github.com/tanstack/table)）。

**数据模型与内建能力**

- 内建 feature：排序、分页、过滤（列+全局）、faceting（列/全局唯一值）、分组与聚合、行展开、行/单元格选择、单元格跨行跨列（cell spanning）、行/列钉住（pinning）、列排序/显隐/调整大小（resizing）、行钉住（row pinning）（[v8 首页](https://tanstack.com/table/v8)、[overview.md](https://tanstack.com/table/alpha/docs/overview.md)）。
- Row Model 流水线：`data → filter → group → sort → expand → paginate`，每阶段可插拔/手动接管（`manualPagination/manualFiltering/manualSorting` 实现服务端处理）（[v8 首页](https://tanstack.com/table/v8)、[LobeHub 示例](https://lobehub.com/skills/ataschz-tanstack-start-mastra-example-tanstack-table)）。
- 树形/展开数据通过 `getSubRows`/子行数组支持。

**性能**

- 虚拟化不是内建功能而是渲染策略：与 TanStack Virtual 配合实现行虚拟化、列虚拟化、无限滚动、动态行高（`estimateSize` + `measureElement`、overscan）；官方示例覆盖「数十万行」数据集（[v9 Angular 虚拟化指南](https://tanstack.com/table/beta/docs/framework/angular/guide/virtualization.md)）。
- v8 体积 ~15kb 或更少（tree-shaking 后）；状态基于记忆化的 row model 流水线（[CSDN 中文介绍](https://blog.csdn.net/kekobinxinzhanghu/article/details/142957804)）。

**v9 变化（2026 年 8 月已发布稳定版）**

- 状态管理基于 **TanStack Store**（fine-grained、alien-signals），`table.state`/`table.Subscribe` 订阅式细粒度重渲染；修复 v8 与 React Compiler 的兼容问题（[v9 blog](https://tanstack.com/blog/tanstack-table-v9-taking-form)、[InfoQ 中文报道](https://www.infoq.cn/article/sw9Wgh5VPpzpuUmQvFo1)、[curated 报道](https://curated.noww.in/we-released-tanstack-table-v9-last-week-finally-compatible-with-the-react-compiler-850913.html)）。
- **Tree-shakable feature 体系**：`tableFeatures()` 按需注册（小表 ~5kb，全功能网格按需引入排序/过滤/分页等）；API 按 feature 门控（未注册时类型层面不存在）。
- 新能力：`cellSelectionFeature`（类电子表格矩形区域选择）、`cellSpanningFeature`（跨行跨列合并）、`rowAggregationFeature`、逻辑 start/end 钉住（RTL 友好）、`createTableHook`/`tableOptions` 可复用表格工厂、per-table meta、`useLegacyTable` 平滑迁移（[v9 Angular 迁移指南](https://tanstack.com/table/beta/docs/framework/angular/guide/migrating)）。
- 性能：部分大表场景内存降低最高 90%，客户端 row model 提升 40–70%（[v9 迁移指南](https://tanstack.com/table/beta/docs/framework/angular/guide/migrating)）。

**授权**：MIT（GitHub [tanstack/table](https://github.com/tanstack/table)，免费，无企业付费层）。

**亮点/局限**

- 亮点：类型安全极致、headless 自由度高、v9 的 feature/插件架构非常适合作为「可扩展引擎」参照。
- 局限：**不是开箱即用的数据网格**——虚拟化、固定列视觉、编辑 UI、列设置面板等全部需自建；无数据请求适配器（需自行用 TanStack Query 或手写）；官方明确虚拟化不能替代服务端分页/过滤（[虚拟化指南](https://tanstack.com/table/beta/docs/framework/angular/guide/virtualization.md)）。

---

### 2.5 Naive UI DataTable（NDataTable）

**数据模型**

- `data` + 配置驱动 `columns`；`row-key`（函数）；`pagination`；`loading`（[官方 DataTable](https://www.naiveui.com/zh-CN/os-theme/components/data-table)、[DeepWiki 源码解析](https://deepwiki.com/tusen-ai/naive-ui/3.1.1-datatable-props-and-methods)）。
- 列类型：`TableBaseColumn`（普通列，含 `render`/`sorter`/`filter`）、`TableSelectionColumn`（`type:'selection'`，多选/单选、`multiple`/`disabled`）、`TableExpandColumn`（`type:'expand'`，`renderExpand`/`expandable`）、`TableColumnGroup`（分组表头，`children`）；另有 `index`/`radio` 类型（[DeepWiki](https://deepwiki.com/tusen-ai/naive-ui/3.1.1-datatable-props-and-methods)）。
- 数据处理流水线：`filteredDataRef → sortedDataRef → paginatedDataRef`（`useTableData`）；分组表头由 `useGroupHeader` 处理；树形数据基于 **treemate** 库（[DeepWiki](https://deepwiki.com/tusen-ai/naive-ui/3.1.1-datatable-props-and-methods)）。

**交互**

- 行选择（checkbox/radio）、行展开、排序/筛选（列级函数式）、固定列 `fixed:'left'|'right'`、可展开/收起（`expanded-row-keys`）、`render`/`renderExpand`/`renderFilter`/`renderSorter` 全套渲染函数（[DeepWiki](https://deepwiki.com/tusen-ai/naive-ui/3.1.1-datatable-props-and-methods)）。
- 扩展包 `x.naive-ui` 提供模板式 `XNDataTable` 与更多插槽（render-column/cell/expand 等）（[x.naive-ui](https://github.com/fudiwei/x.naive-ui/blob/main/docs/zh-CN/Component_DataTable.md)）。

**性能**

- 官方 README：`select、tree、transfer、table、cascader 都可以用虚拟列表`（[Naive UI README](https://github.com/weiguanglai/naive-ui/blob/main/README.zh-CN.md)）。
- DataTable 虚拟滚动实现位于 `src/data-table/src/TableVirtualList.vue`；最新 changelog 增加 `virtual-scroll-x`、`virtual-scroll-header`、`height-for-row`、`header-height`、`min-row-height` 等虚拟滚动属性（[Naive UI CHANGELOG](https://github.com/Gahotx/naive-ui/blob/main/CHANGELOG.en-US.md)）。

**授权**：MIT（[Naive UI README](https://github.com/weiguanglai/naive-ui/blob/main/README.zh-CN.md)、[npm](https://www.npmjs.com/search?q=keywords:naive-ui)）。

**亮点/局限**

- 亮点：全 TypeScript、主题系统类型安全；虚拟滚动开箱即用；函数式 `render` 列模型灵活。
- 局限：无服务端数据源抽象；动态列显隐需配合 key/loading 强制重渲染（[CSDN](https://blog.csdn.net/weixin_38181517/article/details/135768614)）；无列拖拽排序/列偏好持久化；树形+虚拟滚动组合需谨慎。

---

### 2.6 PrimeVue DataTable

**数据模型**

- `value`（数据）+ `<Column field header>` 子组件（模板式）+ 动态列（`v-for` 生成 Column）；`ColumnGroup`/`Row` 支持表头/表尾分组（[PrimeVue DataTable 文档](https://v3.primevue.org/datatable/)）。
- `dataKey` 提供行唯一标识以优化性能（[v3.primevue.org/datatable](https://v3.primevue.org/datatable/)）。

**交互**

- 行选择：`selectionMode='single'|'multiple'` + `selection` v-model；`metaKeySelection` 控制是否需要 ⌘/Ctrl 取消选择；radio 单选用 `selectionMode='single'` + 列模板（[DataTable 文档](https://v3.primevue.org/datatable/)）。
- 排序：列 `sortable`（`sortField`/`sortOrder`/多列排序 `multiSort`）；筛选：`filterDisplay`（menu/row）、全局 `globalFilter`、列筛选、`FilterService`；分页：`paginator` + `rows`/`rowsPerPageOptions`/`paginatorTemplate` 高度可定制（[DataTable 文档](https://v3.primevue.org/datatable/)）。
- 展开/树形：`expandedRows` + `rowGroupMode='subheader'` 分组 + 聚合；内联编辑：`Editor` 模板（editor 模式）+ `editingRows`（[simple-table 对比表](https://www.simple-table.com/comparisons/simple-table-vs-primevue-datatable)）。
- 冻结列/行：`frozenColumns`（左/右）、`frozenRows`（[PrimeVue 源码 showcase 目录](https://deepwiki.com/primefaces/primevue/4.3-data-display-components)）。

**性能**

- 虚拟滚动：`virtualScrollerOptions`（行/列虚拟化 + 预加载或懒加载）；底层 `DTVirtualScroller` 包裹表格体；`lazy` + `onLazyLoad` 服务端懒加载（[DeepWiki](https://deepwiki.com/primefaces/primevue/4.3-data-display-components)、[VirtualScroller 文档](https://v3.primevue.org/virtualscroller/)）。

**授权**：MIT（社区版，免费；[simple-table 对比表](https://www.simple-table.com/comparisons/simple-table-vs-primevue-datatable) 标注 PrimeVue DataTable 为 MIT）。

**亮点/局限**

- 亮点：模板式列 + 大量插槽；行/列虚拟化、冻结行列、分组聚合、编辑开箱即用；有 Aura/Lara/Material 主题体系。
- 局限：**不内置服务端数据源抽象**（`lazy` 需自行处理参数回传，如社区 Laravel 封装通过 `dt_params` 透传事件对象）（[primevue-datatables README](https://github.com/savannabits/primevue-datatables/blob/main/README.md)）；与 PrimeVue 主题/图标强绑定，仅用表格也要引入整套运行时（第三方评估称约 200–400 kB gzipped）（[simple-table 对比](https://www.simple-table.com/comparisons/simple-table-vs-primevue-datatable)）。

---

### 2.7 Vuetify DataTable（v-data-table 家族）

**数据模型与家族划分**

- 三个变体（Vuetify 3+）：
  - `v-data-table`：客户端数据（本地全量可用），内建排序/分页/过滤/分组/行选择（[Vuetify Data tables 文档](https://vuetifyjs.com/ja/components/data-tables/basics/)）。
  - `v-data-table-server`：服务端数据，排序/过滤/分页/选择逻辑由后端处理，通过 `items-length`、`@update:options` 回传并加载（[VDataTableServer 文档](https://v3.vuetifyjs.com/en/api/v-data-table-server/)、[服务端示例源码](https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-data-table/misc-server-side-paginate-and-sort.vue)）。
  - `v-data-table-virtual`：虚拟化渲染，仅渲染部分行；支持客户端排序/过滤但**不支持分页**（[Vuetify Data tables 文档](https://vuetifyjs.com/ja/components/data-tables/basics/)）。
- 列模型：`headers` 数组（`{title, key, align, sortable}`），支持 slot（`item.${key}`、`header.${key}`）；`group-by` 分组、`expanded` 展开、`fixed-header`/`fixed-footer`（[VDataTableServer API](https://v3.vuetifyjs.com/en/api/v-data-table-server/)）。

**数据管道抽象（值得对标的设计）**

- Vuetify v0 的 `createDataTable` composable 提供 **adapter 机制**：`ClientDataTableAdapter`（filter→sort→paginate，默认）、`ServerDataTableAdapter`（直通，API 驱动，暴露 `loading`/`error`）、`VirtualDataTableAdapter`（filter→sort→无分页，配合 `createVirtual`）；统一了排序/过滤/分页/选择/展开的管线（[createDataTable 文档](https://0.vuetifyjs.com/composables/data/create-data-table)）。

**授权**：MIT（官方 [Licensing 页](https://vuetifyjs.com/zh-Hans/about/licensing/) 明确标注 MIT）。

**亮点/局限**

- 亮点：**同库内提供了 client/server/virtual 三档变体**，服务端与虚拟化均有官方一级支持；`createDataTable` 的 adapter 分层思想对 headless 引擎设计有直接借鉴意义。
- 局限：无列拖拽排序、无列显隐持久化、无单元格编辑（需自己拼装输入组件）；与 Vuetify 主题强绑定；虚拟变体不支持分页。

---

### 2.8 TDesign Vue Next Table

**分层设计（按需引入的工程化范例）**

- 官方刻意把表格拆成三档以控制体积：`BaseTable`（基础）、`PrimaryTable`（主表格，默认导出）、`EnhancedTable`（增强）（[TDesign Table 文档](https://tdesign.tencent.com/vue-next/components/table)）。
- `BaseTable`：固定表头/固定列/冻结行、加载态、分页、多级表头、合并单元格、自定义单元格/表头/表尾、文本省略、对齐、表格事件、尺寸、行类名、边框。
- `PrimaryTable`：增加排序（`sort`/`sorter`/`multipleSort` 多列排序）、筛选（`filter.type: input/single/multiple`、`filterValue`、`@filter-change`）、行选择（单选/多选）、行展开（`expandedRow`、`expandedRowKeys`）、单元格编辑（`edit`、`editableRowKeys`）、拖拽排序（`dragSort='row'|'col'`）、列配置（column-controller，可显隐/固定）、懒加载、树形结构（[TDesign Table 文档](https://tdesign.tencent.com/vue-next/components/table)、[CSDN 指南](https://blog.csdn.net/gitblog_01172/article/details/148464127)）。

**性能**

- 虚拟滚动：`scroll: { type:'virtual', rowHeight, bufferSize, threshold, isFixedRowHeight }`；`threshold`（默认 100）——数据量小于阈值自动回退普通渲染；`isFixedRowHeight:false` 支持动态行高（[CSDN 虚拟滚动优化](https://blog.csdn.net/gitblog_00279/article/details/160179217)）。

**活跃度**

- 最新版本 1.20.6（2026-08-13），持续修复：虚拟滚动+合并单元格、虚拟滚动+可编辑单元格、树形表格列拖拽排序、键盘操作行选中等（[TDesign changelog](https://tdesign.tencent.com/vue-next/changelog)）。

**授权**：MIT（[Tencent/tdesign-vue-next](https://github.com/Tencent/tdesign-vue-next) LICENSE 标注 MIT）。

**亮点/局限**

- 亮点：三档拆分是「基础 vs 增强」体积控制的典范；虚拟滚动带阈值自适应；拖拽排序/列配置/编辑齐全。
- 局限：无服务端数据源抽象（服务端需自行在 `@change`/`@sort-change` 里发请求）；与 TDesign 主题绑定；国际化/无障碍文档弱于 AG Grid。

---

### 2.9 Handsontable

**定位**

- 「电子表格风格」的 JS 数据网格：React/Angular/Vue3 wrapper + 原生 JS/TS；SSR 示例（Next.js/Astro/Remix/Nuxt）（[Handsontable 文档](https://handsontable.com/docs/javascript-data-grid/)）。

**能力清单（READMME 核心）**

- 虚拟化、IME 输入法支持、国际化、RTL、无障碍（Accessibility）、键盘快捷键（Excel/Google Sheets 习惯）、排序、过滤、**400+ 内建公式（HyperFormula）**、可配置选择（Selection）、数据校验（Data validation）、条件格式、合并单元格、冻结行列、隐藏行列、右键菜单、行分页、服务端数据、导出 Excel、内置主题（[Handsontable README](https://github.com/handsontable/handsontable/blob/develop/README.md)）。
- 属「extensible framework」，面向 ERP/库存/报表/数据建模类应用（[Handsontable 文档](https://handsontable.com/docs/javascript-data-grid/)）。

**授权（双授权 + 商业层）**

- 免费仅限**非商业/教育/评估**（`licenseKey: 'non-commercial-and-evaluation'`）；商用生产环境需付费授权（[npm-compare 授权说明](https://npm-compare.com/ag-grid,handsontable,react-data-grid)、[README 代码示例](https://github.com/handsontable/handsontable/blob/develop/README.md)）。
- 2026 定价（第三方解读）：Standard 从 $999/开发者/年、Priority 从 $1,299、Enterprise 定制（通常 $20K+/年）；按年续费、按开发者计费（[simple-table 定价解读](https://www.simple-table.com/blog/handsontable-pricing-breakdown-2026)）。

**性能与代价**

- 行虚拟化支持大数据；但包体积大（npm 包 29.5MB 未压缩，官方 README 承认 feature-rich 重量级）（[npm-compare](https://npm-compare.com/ag-grid,handsontable,react-data-grid)、[open-awesome 评估](https://open-awesome.com/projects/handsontable-handsontable)）。

**亮点/局限**

- 亮点：公式引擎 + 数据校验 + 复制粘贴 Excel 兼容是差异化护城河；无障碍/键盘/IME/RTL 完整。
- 局限：商用收费；体积大、配置复杂；更像「表格化电子表格」而非「数据网格」，对纯展示型列表过重。

---

## 3. 能力对比总表

图例：✅ 原生支持 · 🟡 部分/需配置或需扩展 · ❌ 无/需自建 · `(e)` 需付费企业版

| 维度                 | AntD Table        | ProTable              | el-table / v2  | AG Grid 社区          | AG Grid 企业             | TanStack Table       | Naive DataTable     | PrimeVue DataTable | Vuetify v-data-table   | TDesign Table        | Handsontable          |
| -------------------- | ----------------- | --------------------- | -------------- | --------------------- | ------------------------ | -------------------- | ------------------- | ------------------ | ---------------------- | -------------------- | --------------------- |
| 技术栈               | React             | React                 | Vue3           | JS+React/Vue3/Angular | 同左                     | 框架无关(Vue 等)     | Vue3                | Vue3               | Vue3                   | Vue3                 | JS+React/Vue3/Angular |
| 授权模型             | MIT               | MIT                   | MIT            | MIT                   | 商业$999/dev             | MIT                  | MIT                 | MIT                | MIT                    | MIT                  | 非商业免费/商业付费   |
| 客户端排序           | ✅                | ✅                    | ✅             | ✅                    | ✅                       | ✅                   | ✅                  | ✅                 | ✅                     | ✅                   | ✅                    |
| 服务端数据(请求适配) | 🟡 onChange 手写  | ✅ request API        | 🟡 手写        | ✅ Row Model          | ✅ Server-Side Row Model | 🟡 manual* 手写      | ❌                  | 🟡 lazy 手写       | ✅ v-data-table-server | 🟡 手写              | 🟡 服务端数据         |
| 列分组(多级表头)     | ✅                | ✅                    | ✅             | ✅                    | ✅                       | ✅                   | ✅                  | ✅                 | ✅                     | ✅                   | ✅                    |
| 列固定/pinning       | ✅ fixed          | ✅ fixed+columnsState | ✅ fixed(含v2) | ✅ pin                | ✅                       | ✅ pin               | ✅ fixed            | ✅ frozenColumns   | 🟡                     | ✅ fixed             | ✅ freeze             |
| 列显隐               | 🟡 需 ProTable    | ✅ 设置面板+受控      | ❌             | ✅                    | ✅ Tool Panel            | ✅                   | 🟡 需刷新           | ✅                 | 🟡                     | ✅ column-controller | ✅ hide               |
| 列宽调整/拖拽        | 🟡 resizable 手动 | 🟡                    | 🟡 手动        | ✅                    | ✅                       | ✅                   | ✅ 拖拽             | 🟡                 | 🟡                     | ✅                   | ✅                    |
| 列顺序拖拽           | ❌(需三方)        | ❌(需三方)            | ❌             | ✅                    | ✅                       | ✅ ordering          | ❌                  | 🟡                 | ❌                     | ✅ dragSort='col'    | ✅                    |
| 列偏好持久化         | ❌                | 🟡                    | ❌             | ✅                    | ✅                       | 🟡                   | ❌                  | 🟡                 | ❌                     | ❌                   | ✅                    |
| 行选择(单/多)        | ✅                | ✅                    | ✅             | ✅                    | ✅                       | ✅                   | ✅                  | ✅                 | ✅                     | ✅                   | ✅                    |
| 跨页保留选择         | 🟡                | 🟡                    | 🟡             | ✅                    | ✅                       | 🟡                   | 🟡                  | 🟡                 | 🟡                     | 🟡                   | 🟡                    |
| 展开行               | ✅                | ✅                    | ✅             | 🟡                    | ✅ Master/Detail         | ✅ expanding         | ✅                  | ✅                 | ✅                     | ✅                   | ❌(行列合并替代)      |
| 树形数据             | ✅                | ✅                    | ✅ lazy        | ✅                    | ✅                       | ✅ getSubRows        | ✅ treemate         | ✅                 | ✅                     | ✅ lazy              | 🟡                    |
| 内联单元格编辑       | 🟡                | ✅ editable           | 🟡/v2✅        | ✅                    | ✅                       | ❌ 需自建            | 🟡                  | ✅ Editor          | ❌                     | ✅                   | ✅(核心能力)          |
| 行拖拽排序           | ❌                | ❌                    | ❌             | ✅                    | ✅                       | 🟡                   | 🟡(三方 sortable)   | ✅                 | ❌                     | ✅ dragSort='row'    | ✅                    |
| 虚拟滚动(行)         | ✅ virtual        | ✅(继承)              | ✅ v2          | ✅ 默认               | ✅ 默认                  | 🟡 +TanStack Virtual | ✅                  | ✅                 | ✅ virtual 变体        | ✅ 阈值自适应        | ✅                    |
| 虚拟滚动(列)         | ❌                | ❌                    | ❌             | ✅                    | ✅                       | 🟡 +Virtual          | 🟡 virtual-scroll-x | ✅                 | ❌                     | ❌                   | 🟡                    |
| 100k+ 行处理         | 🟡                | 🟡                    | 🟡(v2)         | ✅                    | ✅                       | ✅(配合虚拟化)       | 🟡                  | ✅                 | 🟡                     | ✅                   | ✅                    |
| 分组/聚合            | ❌                | ❌                    | ❌             | ❌                    | ✅ (e)                   | ✅ grouping          | ❌                  | ✅ rowGroupMode    | ✅ group-by            | 🟡                   | 🟡                    |
| 透视 Pivot           | ❌                | ❌                    | ❌             | ❌                    | ✅ (e)                   | ❌                   | ❌                  | ❌                 | ❌                     | ❌                   | ❌                    |
| 导出 CSV/Excel       | ❌                | 🟡                    | ❌             | 🟡 CSV                | ✅ Excel (e)             | ❌                   | ❌                  | 🟡 CSV             | ❌                     | ❌                   | ✅ Excel              |
| 图表集成             | ❌                | ❌                    | ❌             | ❌                    | ✅ (e)                   | ❌                   | ❌                  | ❌                 | 🟡 sparkline           | ❌                   | ❌                    |
| 键盘导航/ARIA        | 🟡                | 🟡                    | 🟡             | ✅                    | ✅                       | 🟡(自行实现)         | 🟡                  | 🟡                 | 🟡                     | 🟡                   | ✅                    |
| 区域选择/剪贴板      | ❌                | ❌                    | ❌             | ❌                    | ✅ (e)                   | ✅ v9 cellSelection  | ❌                  | ❌                 | ❌                     | ❌                   | ✅                    |
| 单元格合并           | ✅ span-method    | ✅                    | ✅             | ✅                    | ✅                       | ✅ v9 cellSpanning   | ❌                  | ✅                 | 🟡                     | ✅                   | ✅                    |
| 公式引擎             | ❌                | ❌                    | ❌             | ❌                    | 🟡                       | ❌                   | ❌                  | ❌                 | ❌                     | ❌                   | ✅ 400+               |
| 数据校验             | ❌                | ✅                    | 🟡             | ✅                    | ✅                       | ❌                   | ❌                  | ✅                 | ❌                     | ✅ 编辑校验          | ✅                    |
| Headless/无样式      | ❌                | ❌                    | ❌             | 🟡 主题化             | 🟡 主题化                | ✅ 完全 Headless     | ❌                  | ❌                 | ❌                     | ❌                   | 🟡 主题化             |
| SSR 支持             | ✅                | ✅                    | ✅             | ✅                    | ✅                       | ✅                   | ✅                  | ✅                 | ✅                     | ✅                   | ✅ Nuxt/Next          |

> 注：表中「列偏好持久化」AG Grid 通过 Tool Panel/列状态、Handsontable 通过隐藏列+配置持久化；TanStack 无内建持久化但状态可序列化。

---

## 4. 共性与差距（对 @soybeanjs/table 的启示）

### 4.1 成熟高级表格的共同点（「标配基线」）

1. **配置驱动列模型**：`columns` 数组化（title/dataIndex/key/width/fixed/filter/sorter/render）是所有库的绝对基线；列分组（多级表头）也是标配。
2. **客户端/服务端双模式**：所有「Pro 级」方案都提供「数据由谁处理」的开关——ProTable `request`、AG Grid Row Model、Vuetify 三变体、TanStack `manual*`。**数据源/请求适配层是高级表格区别于普通表格的第一特征**。
3. **行选择（单/多）+ 展开行 + 树形 + 固定列** 是交互标配；「跨页保留选择」多数库支持但需数据 key 稳定。
4. **虚拟滚动是性能标配**：行虚拟化几乎全有，列虚拟化只有 AG Grid / TanStack / PrimeVue 具备；大数据（100k+）都要靠虚拟化兜底。
5. **渲染层可注入**：单元格/表头自定义（render 函数 / slot / 组件注入）全部支持，是扩展性的基础。
6. **授权分化**：要么全 MIT（生态型组件库/Headless 引擎），要么「免费核心 + 商业高级层」（AG Grid、Handsontable），后者用「分组/透视/导出/图表/服务端模型/主从/剪贴板/区域选择」等作为付费卖点。

### 4.2 差距与机会（Vue 3 Headless-first 高级数据网格的切入空间）

1. **「Headless 引擎 + 可选 Styled UI」的高级网格在 Vue 生态是空白**：
   - TanStack Table 是 Headless 但只提供「逻辑层」，虚拟化/固定列/编辑等渲染能力要自建；
   - Element/Naive/PrimeVue/Vuetify/TDesign 的表格全部是「逻辑+样式耦合」的 Styled 实现；
   - 没有任何库像 Soybean 的 `headless/ui` 分层那样，把「表格逻辑（headless：列模型、row model 管线、选择/排序/筛选/分页状态、可访问性）与样式（ui：UnoCSS/cv() 变体）」彻底分离后，再在之上提供一套 ProTable 级封装。
2. **服务端数据源抽象（request 适配器）在 Vue 开源库里是公认缺口**：ProTable 的 `request`+`valueType` 已被市场验证，但它是 React + antd 强绑定；Vue 生态没有等价的「服务端 ProTable」。`@soybeanjs/table` 可把 `request`/`params`/`postData` 抽象进 headless 层（与具体 UI 解耦），这是最能对标 ProTable 的切入点。
3. **列管理的「Pro 化」能力多依赖三方**：列显隐面板、列拖拽排序、列宽记忆/偏好持久化在 Vue 组件库中普遍缺失（AntD 需 `antd-table-enhanced`，Naive 需 `x.naive-ui`，列偏好持久化几乎无人原生提供）。做成 headless feature（列状态可序列化 + 持久化）有差异化价值。
4. **无障碍（ARIA + 键盘导航）是 Vue 开源表格的系统性短板**，而 AG Grid/Handsontable 把其列为社区/核心能力。headless 层承载 ARIA 角色、键盘导航、焦点管理是天然的分层职责，可作为「面向企业/ToB」的卖点。
5. **企业级高级能力（分组/聚合/透视/导出/主从/服务端行模型）可作为商业分层**：AG Grid 以 $999/dev、Handsontable 以 $999+/dev 验证了「MIT 核心 + 付费高级层」的定价；`@soybeanjs/table` 若走「MIT 引擎 + 高级 feature 独立包/授权」路线，分组/聚合/Excel 导出/主从/图表联动是合理的付费候选（参考 AG Grid [企业版功能清单](https://www.ag-grid.com/javascript-data-grid/community-vs-enterprise/)与 [定价页](https://www.ag-grid.com/license-pricing/)）。
6. **技术对照：Row Model 管线与 feature 插件化**：TanStack v9 的 `tableFeatures()` 按需注册（tree-shakable、API 类型门控）与 AG Grid 的模块化是对 headless 引擎设计的最佳参照；Vuetify v0 `createDataTable` 的 Client/Server/Virtual adapter 则是「数据管道抽象」的简洁范本（[TanStack v9 迁移指南](https://tanstack.com/table/beta/docs/framework/angular/guide/migrating)、[Vuetify createDataTable](https://0.vuetifyjs.com/composables/data/create-data-table)）。
7. **注意警示点**：Element Plus 官方明示虚拟表格 v2 仍为 beta、网络/内存是大数据瓶颈（[table-v2.md](https://github.com/element-plus/element-plus/blob/dev/docs/en-US/component/table-v2.md)）；TDesign 通过 `threshold` 在数据量小时自动回退普通渲染（[CSDN](https://blog.csdn.net/gitblog_00279/article/details/160179217)）——这些工程取舍可纳入设计：**虚拟化不等于万能，需与分页/过滤协同并做阈值自适应**。

---

## 5. 参考来源

### Ant Design Table / Ant Design Vue / ProTable

- [Ant Design Table（React）官方文档](https://ant-design.antgroup.com/components/table/)
- [Ant Design Table 中文文档（虚拟列表 5.9.0）](https://ant-design.antgroup.com/components/table-cn/)
- [rc-component/table（底层实现，fixed/minWidth）](https://github.com/react-component/table)
- [ProTable 官方 API（request/valueType/columnsState/editable）](https://procomponents.ant.design/components/table/)
- [pro-table 仓库 API 文档（columnsStateMap/options/search）](https://github.com/ant-design/pro-table/blob/master/docs/api.md)
- [Ant Design Vue 中文文档](https://www.antdv.com/components/table-cn)
- [Ant Design Vue Table 解析（CSDN）](https://blog.csdn.net/csdn_HPL/article/details/148875608)
- [Ant Design Vue a-table 功能汇总（CSDN）](https://wenku.csdn.net/answer/41ejd706bmwo)
- [Ant Design Vue 树形表格动态加载（CSDN）](https://wenku.csdn.net/answer/4njtcr5v30hw)
- [Ant Design Vue 列拖拽实现（CSDN）](https://blog.csdn.net/defined_/article/details/130992315)
- [ProTable/EditableProTable 配置详解（CSDN）](https://blog.csdn.net/m0_56542349/article/details/128704089)
- [antd-table-enhanced（第三方列能力扩展）](https://www.npmjs.com/package/antd-table-enhanced)
- [ProTable 使用分析（博客）](https://www.cnblogs.com/shellon/p/16452395.html)

### Element Plus

- [Element Plus Table 文档（中文）](https://cn.element-plus.org/zh-CN/component/table)
- [el-table-v2（Virtualized Table）文档](https://github.com/element-plus/element-plus/blob/dev/docs/en-US/component/table-v2.md)
- [Element Plus npm（MIT 授权）](https://www.npmjs.com/package/element-plus)
- [el-table-virtual-scroll-next（第三方虚拟滚动）](https://www.jsdelivr.com/package/npm/el-table-virtual-scroll-next)

### AG Grid

- [Community vs Enterprise 文档](https://www.ag-grid.com/javascript-data-grid/community-vs-enterprise/)
- [AG Grid 授权与定价页（$999/$1,498）](https://www.ag-grid.com/license-pricing/)
- [ag-grid GitHub README（功能表、MIT/商业授权）](https://github.com/ag-grid/ag-grid/blob/latest/README.md)
- [AG Grid 2026 授权成本解读（第三方）](https://www.simple-table.com/blog/ag-grid-pricing-license-breakdown-2026)
- [AG Grid 社区版 vs 企业版功能（第三方博客）](https://www.singhteekam.in/blogs/aggridreactseries5aggridcommunityvsenterprisefeatures)

### TanStack Table

- [TanStack Table 首页（v8，特性清单）](https://tanstack.com/table/v8)
- [TanStack Table Overview（Headless/特性）](https://tanstack.com/table/alpha/docs/overview.md)
- [tanstack/table GitHub（v9 发布 2026-08）](https://github.com/tanstack/table)
- [TanStack Table V9: Taking Form（官方博客）](https://tanstack.com/blog/tanstack-table-v9-taking-form)
- [TanStack Table v9 迁移指南（feature/Store/cellSelection/cellSpanning）](https://tanstack.com/table/beta/docs/framework/angular/guide/migrating)
- [TanStack Table v9 虚拟化指南（行/列/无限滚动/动态行高）](https://tanstack.com/table/beta/docs/framework/angular/guide/virtualization.md)
- [TanStack Table V9 beta 中文报道（InfoQ）](https://www.infoq.cn/article/sw9Wgh5VPpzpuUmQvFo1)
- [TanStack Table 中文介绍（CSDN）](https://blog.csdn.net/kekobinxinzhanghu/article/details/142957804)
- [TanStack Table + TanStack Virtual 服务端示例（LobeHub）](https://lobehub.com/skills/ataschz-tanstack-start-mastra-example-tanstack-table)

### Naive UI

- [Naive UI DataTable 官方文档](https://www.naiveui.com/zh-CN/os-theme/components/data-table)
- [Naive UI DataTable 源码架构解析（DeepWiki）](https://deepwiki.com/tusen-ai/naive-ui/3.1.1-datatable-props-and-methods)
- [Naive UI README（MIT、虚拟列表）](https://github.com/weiguanglai/naive-ui/blob/main/README.zh-CN.md)
- [Naive UI CHANGELOG（virtual-scroll-x 等属性）](https://github.com/Gahotx/naive-ui/blob/main/CHANGELOG.en-US.md)
- [x.naive-ui 扩展（模板式 DataTable）](https://github.com/fudiwei/x.naive-ui/blob/main/docs/zh-CN/Component_DataTable.md)
- [Naive UI 列显隐实现（CSDN）](https://blog.csdn.net/weixin_38181517/article/details/135768614)

### PrimeVue

- [PrimeVue DataTable 文档（v3）](https://v3.primevue.org/datatable/)
- [PrimeVue VirtualScroller 文档](https://v3.primevue.org/virtualscroller/)
- [PrimeVue DataTable 实现解析（DeepWiki）](https://deepwiki.com/primefaces/primevue/4.3-data-display-components)
- [PrimeVue DataTable 服务端封装（Laravel，MIT）](https://github.com/savannabits/primevue-datatables/blob/main/README.md)
- [PrimeVue DataTable vs 竞品对比（功能与体积）](https://www.simple-table.com/comparisons/simple-table-vs-primevue-datatable)

### Vuetify

- [Vuetify Data tables 文档（client/server/virtual）](https://vuetifyjs.com/ja/components/data-tables/basics/)
- [VDataTableServer API（v3）](https://v3.vuetifyjs.com/en/api/v-data-table-server/)
- [Vuetify 服务端表格示例源码](https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/v-data-table/misc-server-side-paginate-and-sort.vue)
- [Vuetify createDataTable（adapter 机制，v0）](https://0.vuetifyjs.com/composables/data/create-data-table)
- [Vuetify 授权协议（MIT）](https://vuetifyjs.com/zh-Hans/about/licensing/)

### TDesign

- [TDesign Vue Next Table 官方文档（BaseTable/PrimaryTable/EnhancedTable）](https://tdesign.tencent.com/vue-next/components/table)
- [TDesign Vue Next changelog（1.20.x）](https://tdesign.tencent.com/vue-next/changelog)
- [TDesign 虚拟滚动配置（CSDN）](https://blog.csdn.net/gitblog_00279/article/details/160179217)
- [TDesign Table 高级功能指南（CSDN）](https://blog.csdn.net/gitblog_01172/article/details/148464127)
- [Tencent/tdesign-vue-next GitHub（MIT）](https://github.com/Tencent/tdesign-vue-next)

### Handsontable

- [Handsontable 官方文档（Introduction）](https://handsontable.com/docs/javascript-data-grid/)
- [Handsontable GitHub README（功能清单、授权）](https://github.com/handsontable/handsontable/blob/develop/README.md)
- [Handsontable 定价解读 2026（第三方）](https://www.simple-table.com/blog/handsontable-pricing-breakdown-2026)
- [AG Grid / Handsontable / react-data-grid 对比（npm-compare）](https://npm-compare.com/ag-grid,handsontable,react-data-grid)
- [Handsontable 评估（open-awesome）](https://open-awesome.com/projects/handsontable-handsontable)
