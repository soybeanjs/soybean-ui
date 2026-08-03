# @soybeanjs/ui — 组件优化与检查项目快照 (Check Snapshot)

> 本文档是当前已实现 **88 个** `@soybeanjs/ui` 组件的**项目级快照**：组件清单、C01–C90 任务表、当前 P0–P3 优先级分配、13 轮执行顺序、具体行业对标发现。
>
> **评估方法论的单一权威源**是 [soybean-ui-component-development/audit.md](../.agents/skills/soybean-ui-component-development/audit.md)。该文件拥有：评估方法论（8 步流程）、7 大检查维度（D1–D7）、105 个检查项（含检查标准与验收条件）、严重度定义（Blocker / Major / Minor / Enhancement）、验收状态标记（✅/⚠️/❌/➕/—/⏳）、单组件验收清单、跨组件一致性回归、全量回归、行业对标方法论（对标库选型 + 维度）、WAI-ARIA APG 参考与对标库链接。
>
> 执行检查时：先加载 [audit.md](../.agents/skills/soybean-ui-component-development/audit.md) 获取通用方法，再回到本文档查阅当前快照（任务编号、优先级、重点检查项、具体对标发现）。
>
> - **范围：** `packages/ui/src/index.ts` 已发布的 88 个组件目录（110 个 S 前缀导出）及其对应 headless 实现、样式 recipe、文档、示例与测试。
> - **基线 skill：** `soybean-ui-component-development`（功能合规）、`typescript-functional-style`（TS 代码规范）、`vue-sfc-structure`（SFC 结构规范）。
> - **对标库：** Ant Design（React/Vue）、Element Plus、Material UI、Mantine、Naive UI、shadcn/ui。
> - **关联文档：** [roadmap.md](./roadmap.md)（未实现组件路线图）、[components.md](./components.md)（路线图源文档）、[audit.md](../.agents/skills/soybean-ui-component-development/audit.md)（评估方法论单一源）。

---

## 一、行业对标分析报告

> 对标方法论（对标库选型、通用对标维度 D2-01～D2-12）见 [audit.md -> D2. Industry benchmarking](../.agents/skills/soybean-ui-component-development/audit.md#d2-industry-benchmarking)。本节记录 88 个已实现组件的**具体对标发现**。

### 1.1 通用差异点分析

针对 88 个已实现组件，对照 6 大对标库的**通用差异点**：

| 差异维度 | SoybeanUI 现状                | Ant Design                 | Element Plus        | Material UI                 | Mantine                        | Naive UI               | shadcn/ui            | 改进方向                     |
| :------- | :---------------------------- | :------------------------- | :------------------ | :-------------------------- | :----------------------------- | :--------------------- | :------------------- | :--------------------------- |
| 架构     | headless/styled 分离          | 单包                       | 单包                | 单包 + `@mui/base`          | 单包                           | 单包                   | headless/styled 分离 | ✅ 已对齐 shadcn/ui 最佳实践 |
| 主题     | `ThemeColor`(8) + `ThemeSize` | ConfigProvider + token     | CSS var + namespace | ThemeProvider + createTheme | MantineProvider + theme object | ConfigProvider + theme | CSS var + theme      | 考虑 token 命名空间对齐      |
| 暗色模式 | `ConfigProvider` 切换         | `theme.dark`               | `dark-mode` class   | `theme.palette.mode`        | `colorScheme`                  | `darkTheme`            | `dark` class         | ✅ 已支持                    |
| RTL      | `useDirection` + 逻辑属性     | `ConfigProvider.direction` | `dir` attribute     | `direction` theme           | 不完整                         | 不完整                 | 不完整               | ✅ 已领先                    |
| TS 类型  | strict + JSDoc                | 完善                       | 完善                | 完善                        | 完善                           | 完善                   | 完善                 | D4 补全 JSDoc                |
| 按需引入 | ESM + sub-path                | `babel-plugin-import`      | unplugin            | `@mui/material` tree-shake  | 按需                           | tree-shake             | copy 源码            | ✅ 已支持                    |
| 表单校验 | `form` + `form-field`         | `Form` + `Form.Item`       | `Form` + `FormItem` | `FormControl` + `useForm`   | `use-form`                     | `Form` + `FormItem`    | `react-hook-form`    | 增强 `form` 集成             |
| 虚拟滚动 | `virtualizer` 单独 + 集成     | `rc-virtual-list`          | `el-table-v2`       | `ListVirtualization`        | `Select` 内置                  | `virtual-list`         | `tanstack-virtual`   | ✅ 已支持                    |
| 国际化   | `ConfigProvider.locale`       | `locale`                   | `locale`            | `LocalizationProvider`      | `MantineProvider.locale`       | `date-fns` locale      | 不提供               | 增强 locale 完整度           |
| 复制源码 | 不支持                        | 不支持                     | 不支持              | 不支持                      | 不支持                         | 不支持                 | ✅ 核心模式          | 路线图延后至组件市场         |

### 1.2 重点组件对标要点

按组件类别列出关键对标要点（仅列出有差异或需增强的项）：

#### 表单类（input / textarea / input-number / select / combobox / checkbox / radio-group / switch / slider / date-picker / cascader / tags-input / form / editable / password / input-otp）

| 组件                              | 对标要点                                                                                                                                                                | 建议                                                                |
| :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `input`/`textarea`                | Mantine/Element Plus 提供 `showCount`、`maxlength`、`clearable`、`resize`、`status`（error/warning）                                                                    | 增加 `count`/`showCount`、`clearable`、`status` props               |
| `input-number`                    | Ant Design/Element Plus 提供 `controls`、`precision`、`formatter`/`parser`、`keyboard`、`step`、`min`/`max`、`stringMode`                                               | 确认 `formatter`/`parser` 已支持；增加 `controls` 显隐              |
| `select`/`combobox`               | Ant Design/Naive UI 提供 `filterable`、`remote`、`loading`、`virtual`、`tag`/`multiple`/`maxTagCount`、`showArrow`/`showSearch`、`allowCreate`                          | 确认 `remote`/`loading`/`maxTagCount`；增强 `filter` 自定义         |
| `checkbox`/`radio-group`          | Ant Design/Element Plus 提供 `indeterminate`、`button` variant、`card` variant                                                                                          | 确认 `checkbox-card`、`radio-group-card` 已有；增强 `indeterminate` |
| `date-picker`/`date-range-picker` | Ant Design/Element Plus 提供 `showTime`、`shortcuts`、`disabledDate`、`cellRenderer`、`range`、`presets`                                                                | 增强 `presets`/`shortcuts`、`disabledDate`                          |
| `cascader`                        | Ant Design/Element Plus 提供 `multiple`、`checkStrictly`、`showAllLevels`、`filterable`、`changeOnSelect`                                                               | 确认 `multiple`、`filterable`                                       |
| `tags-input`                      | Mantine/Ant Design 提供 `maxTags`、`allowDuplicates`、`validation`、`readOnly`、`addOnBlur`、`splitChars`                                                               | 增强 `maxTags`、`validation`                                        |
| `form`                            | Ant Design/Element Plus 提供 `rules`、`validateTrigger`、`validateStatus`、`help`、`labelAlign`/`labelWidth`、`required`、`colon`、`layout`(horizontal/vertical/inline) | 增强 `rules` 集成、`layout` 模式                                    |
| `editable`                        | Ant Design 不直接提供；Mantine `Editable`、shadcn/ui `Editable`                                                                                                         | ✅ 已对齐 shadcn/ui                                                 |

#### 数据展示类（table / tree / tree-menu / accordion / list / card / carousel / badge / tag / avatar / progress / skeleton / empty）

| 组件                      | 对标要点                                                                                                                                                                                                                   | 建议                                                                              |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `table`                   | Ant Design/Element Plus/Naive UI 提供 `columns` 配置式、`sorting`/`filtering`/`pagination`、`selection`、`expandable`、`fixedHeader`/`fixedColumns`、`virtualScroll`、`resizeColumn`、`summary`、`customCell`/`cellRender` | 确认 `columns`/`sorting`/`filtering`/`pagination`；增强 `resizeColumn`、`summary` |
| `tree`/`tree-menu`        | Ant Design/Element Plus 提供 `virtual`、`draggable`、`checkable`、`defaultExpandAll`、`loadData`(async)、`searchValue`、`blockNode`、`showLine`                                                                            | 增强 `draggable`、`searchValue`                                                   |
| `accordion`/`collapsible` | 所有库提供 `multiple`、`disabled`、`arrowPosition`、`accordion` 模式                                                                                                                                                       | 确认 `multiple` 模式                                                              |
| `carousel`                | Ant Design/Element Plus 提供 `autoplay`、`dots`、`arrow`、`effect`(slide/fade)、`loop`、`pauseOnHover`                                                                                                                     | 确认 `effect`/`loop`                                                              |
| `progress`                | Ant Design/Element Plus/MUI 提供 `status`(active/exception/success)、`strokeWidth`、`showInfo`、`steps`、`gradient`                                                                                                        | 增强 `gradient`、`steps`                                                          |
| `skeleton`                | Ant Design/Element Plus/Mantine 提供 `active`(动画)、`round`、`paragraph`/`avatar`/`title` 组合                                                                                                                            | 确认 `active` 动画                                                                |

#### 反馈与浮层类（dialog / drawer / popover / tooltip / toast / alert / popconfirm / hover-card / dropdown-menu / context-menu / command / bottom-sheet）

| 组件                           | 对标要点                                                                                                                                                 | 建议                                                               |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `dialog`/`drawer`              | Ant Design/Element Plus 提供 `draggable`、`fullscreen`、`destroyOnClose`、`width`/`height`、`closable`、`mask`/`maskClosable`、`keyboard`(Esc)、`zIndex` | 确认 `draggable`/`fullscreen`/`destroyOnClose`                     |
| `popover`/`tooltip`            | 所有库提供 `trigger`(hover/click/focus/manual)、`placement`、`arrow`、`showArrow`、`duration`/`delay`、`disabled`                                        | 确认 `delay`/`disabled`                                            |
| `toast`                        | Ant Design `message`/`notification`、Element Plus `ElMessage`/`ElNotification`、Naive UI、Mantine `notifications`                                        | 确认 `position`/`duration`/`stack`；增强 `closable`/`pauseOnHover` |
| `alert`                        | 所有库提供 `closable`、`showIcon`、`banner`、`description`                                                                                               | 增强 `banner` 模式（关联 roadmap P2 `Banner`）                     |
| `dropdown-menu`/`context-menu` | 所有库提供 `items` 配置式、`checkbox`/`radio` 子项、`divider`、`disabled`、`shortcut`、`loading`、`danger`                                               | 确认 `checkbox`/`radio`/`danger`                                   |

#### 导航类（menu / menubar / navigation-menu / tabs / breadcrumb / pagination / anchor / page-tabs）

| 组件         | 对标要点                                                                                                                           | 建议                               |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| `menu`       | Ant Design/Element Plus 提供 `inline`/`horizontal`/`vertical` 模式、`collapsed`、`openKeys`/`selectedKeys`、`SubMenu`、`ItemGroup` | 确认 `collapsed`/`openKeys`        |
| `tabs`       | 所有库提供 `closable`/`addable`/`draggable`、`position`(top/right/bottom/left)、`type`(line/card/card-grid)、`lazy`                | 增强 `draggable`、`lazy`           |
| `pagination` | 所有库提供 `total`/`pageSize`/`current`、`showSizeChanger`/`showQuickJumper`/`showTotal`、`simple`、`disabled`                     | 确认 `showTotal`/`showSizeChanger` |
| `breadcrumb` | 所有库提供 `separator`、`itemRender`、`routes` 配置式                                                                              | 确认 `routes` 配置式               |

#### 布局与工具类（layout / splitter / scroll-area / affix / config-provider / virtualizer / backtop / watermark / clipboard / kbd / label / link / separator / spinner / icon / arrow / aspect-ratio）

| 组件          | 对标要点                                                                             | 建议                  |
| :------------ | :----------------------------------------------------------------------------------- | :-------------------- |
| `layout`      | Ant Design `Layout`/`Header`/`Sider`/`Content`/`Footer`、Element Plus `ElContainer`  | 确认 `Sider` 折叠模式 |
| `splitter`    | Mantine `Divider`、Ant Design 不直接提供、shadcn/ui `ResizablePanelGroup`            | ✅ 已对齐 shadcn/ui   |
| `scroll-area` | Mantine/Radix UI 提供 `scrollbar`/`thumb`/`corner`、`type`(auto/always/scroll/hover) | 确认 `type` 模式      |
| `watermark`   | Ant Design/Element Plus 提供 `content`/`gap`/`offset`/`rotate`/`zIndex`/`font`       | 确认 `font`/`rotate`  |

#### 颜色类（color-area / color-field / color-picker / color-slider / color-swatch / color-swatch-picker）

| 组件           | 对标要点                                                                                                   | 建议                                                            |
| :------------- | :--------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `color-picker` | Mantine `ColorInput`/`ColorPicker`、Naive UI `ColorPicker`、Ant Design 不直接提供、shadcn/ui `ColorPicker` | 确认 `format`(HEX/RGB/HSL)、`alpha`、`presetColors`、`disabled` |

---

## 二、组件检查任务列表（按组件维度独立）

### 2.1 使用说明

- 每个组件为一个独立检查维度，编号 `C{编号}`。
- 每个组件按 7 大维度（D1-D7）执行检查，每个维度的具体检查项（共 105 项）见 [audit.md -> Dimension details](../.agents/skills/soybean-ui-component-development/audit.md#dimension-details)。
- 状态列：`⏳` 待检查 / `✅` 通过 / `⚠️` 待优化 / `❌` 不通过 / `➕` 增强项 / `—` 不适用（详见 [audit.md -> Acceptance status markers](../.agents/skills/soybean-ui-component-development/audit.md#acceptance-status-markers)）。
- 「优先级」列基于组件使用频率、对标差距、Blocker 风险综合评定：`P0`(立即) / `P1`(高) / `P2`(中) / `P3`(低)。
- 「重点检查项」列列出该组件需重点关注的检查项编号（如 `D1-13, D2-04, D3-05`）。
- 检查时按「严重度」分级记录问题；Blocker 修复后才可进入下一组件（详见 [audit.md -> Severity definitions](../.agents/skills/soybean-ui-component-development/audit.md#severity-definitions)）。
- **D7-19/D7-20 浏览器 e2e 检查范围：** 以下组件因依赖平台 API（ResizeObserver / 指针捕获 / scrollIntoView）、使用 Teleport 门户、有真实键盘导航契约、或需要颜色对比验证，须纳入 e2e 检查（标准见 [e2e.md -> When to add an e2e spec](../.agents/skills/soybean-ui-component-development/e2e.md#when-to-add-an-e2e-spec)）：
  - **已有 e2e spec：** `button`(C01)、`select`(C32)、`dialog`(C72) — 重点检查 D7-19 + D7-20。
  - **浮层/门户类（须补 e2e）：** `combobox`(C33)、`autocomplete`(C34)、`cascader`(C35)、`date-field`~`time-range-field`(C44-C49)、`drawer`(C73)、`popover`(C74)、`popconfirm`(C75)、`hover-card`(C76)、`bottom-sheet`(C77)、`dropdown-menu`(C78)、`context-menu`(C79)、`command`(C80)、`tooltip`(C81) — 重点检查 D7-19。
  - **键盘导航类（须补 e2e）：** `tabs`(C22)、`menu`(C26)、`menubar`(C25)、`tree`(C62)、`tree-menu`(C63)、`pagination`(C20)、`stepper`(C55)、`rating`(C90) — 重点检查 D7-19。
  - **颜色对比类（须补 e2e）：** `link`(C04)、`badge`(C57)、`tag`(C58)、`alert`(C70) — 重点检查 D7-19。
  - 缺失 e2e spec 非Blocker，除非组件契约依赖 happy-dom 必须模拟的平台 API（如 select 类浮层）。

### 2.2 组件分类与优先级

| 类别                            | 组件数 | 检查优先级 | 说明                                   |
| :------------------------------ | :----: | :--------: | :------------------------------------- |
| 通用基础 (General/Utilities)    |   14   |     P1     | 高频复用，API 一致性影响全局           |
| 布局 (Layout)                   |   4    |     P2     | 数量少但影响页面骨架                   |
| 导航 (Navigation)               |   8    |     P1     | 用户路径关键，键盘/A11Y 重要           |
| 表单输入 (Forms)                |   30   |     P0     | 数量最多、对标差距最大、用户交互最复杂 |
| 数据展示 (Data Display)         |   14   |     P1     | 表格/树性能与功能关键                  |
| 反馈与浮层 (Feedback & Overlay) |   13   |     P0     | 焦点 trap、A11Y、z-index 风险高        |
| 颜色 (Color)                    |   6    |     P3     | 小众但功能独立，复用 headless 模式     |

### 2.3 任务列表

#### 2.3.1 通用基础 (General/Utilities) — 14 个

| 编号 | 组件              | 模式           | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                                      |
| :--: | :---------------- | :------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :---------------------------------------------- |
| C01  | `button`          | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-09, D2-05, D3-01, D5-16, D7-14, D7-19, D7-20 |
| C02  | `button-group`    | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-09, D3-05, D7-15                             |
| C03  | `icon`            | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-15, D2-02, D3-08                             |
| C04  | `link`            | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-09, D3-08, D7-14                             |
| C05  | `separator`       | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P3   | D1-09, D3-01                                    |
| C06  | `kbd`             | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P3   | D1-09, D3-01                                    |
| C07  | `label`           | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-14, D3-01, D7-05                             |
| C08  | `spinner`         | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-15, D2-07, D7-04                             |
| C09  | `clipboard`       | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-15, D3-08, D7-10                             |
| C10  | `arrow`           | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P3   | D1-09, D3-01                                    |
| C11  | `aspect-ratio`    | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P3   | D1-09, D7-09                                    |
| C12  | `backtop`         | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-16, D2-02, D7-04                             |
| C13  | `watermark`       | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P3   | D1-09, D2-11, D3-01                             |
| C14  | `config-provider` | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-05, D2-07, D2-08, D7-18                      |

#### 2.3.2 布局 (Layout) — 4 个

| 编号 | 组件          | 模式 | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                 |
| :--: | :------------ | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :------------------------- |
| C15  | `layout`      | 多槽 | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-12, D2-11, D3-12, D7-09 |
| C16  | `splitter`    | 多槽 | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-13, D2-02, D7-02        |
| C17  | `scroll-area` | 多槽 | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-13, D2-11, D7-02        |
| C18  | `affix`       | 多槽 | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P3   | D1-09, D7-04               |

#### 2.3.3 导航 (Navigation) — 8 个

| 编号 | 组件              | 模式           | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                 |
| :--: | :---------------- | :------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :------------------------- |
| C19  | `breadcrumb`      | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-12, D2-11, D3-12        |
| C20  | `pagination`      | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-12, D2-11, D3-01, D7-05 |
| C21  | `page-tabs`       | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-08, D2-11, D3-12        |
| C22  | `tabs`            | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-08, D1-16, D2-11, D7-05 |
| C23  | `anchor`          | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P2   | D1-12, D2-02, D7-04        |
| C24  | `navigation-menu` | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-12, D1-16, D2-11, D7-05 |
| C25  | `menubar`         | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-16, D2-03, D7-05        |
| C26  | `menu`            | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-08, D1-16, D2-11, D7-05 |

#### 2.3.4 表单输入 (Forms) — 30 个

| 编号 | 组件                | 模式           | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                                      |
| :--: | :------------------ | :------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :---------------------------------------------- |
| C27  | `input`             | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-09, D2-11, D3-01, D7-05                      |
| C28  | `textarea`          | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-09, D2-11, D3-01, D7-05                      |
| C29  | `input-number`      | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-09, D2-11, D3-01, D3-08                      |
| C30  | `input-otp`         | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-16, D2-11, D7-05                             |
| C31  | `password`          | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-09, D2-11, D3-01, D7-05                      |
| C32  | `select`            | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-04, D2-11, D3-04, D7-01, D7-19, D7-20 |
| C33  | `combobox`          | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-04, D2-11, D3-04, D7-01               |
| C34  | `autocomplete`      | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-04, D2-11, D3-04, D7-01               |
| C35  | `cascader`          | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04, D7-01                      |
| C36  | `checkbox`          | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-08, D2-11, D3-04, D7-05                      |
| C37  | `checkbox-group`    | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04, D7-05                      |
| C38  | `radio-group`       | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04, D7-05                      |
| C39  | `switch`            | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-08, D2-11, D3-01, D7-05                      |
| C40  | `slider`            | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-16, D2-11, D7-05                             |
| C41  | `toggle`            | 单类           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-08, D2-11, D3-01                             |
| C42  | `toggle-group`      | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-08, D2-11, D3-04                             |
| C43  | `segment`           | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-08, D2-11, D3-04                             |
| C44  | `date-field`        | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04, D7-09                      |
| C45  | `date-picker`       | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04, D7-09                      |
| C46  | `date-range-field`  | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04, D7-09                      |
| C47  | `date-range-picker` | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04, D7-09                      |
| C48  | `time-field`        | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04                             |
| C49  | `time-range-field`  | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04                             |
| C50  | `calendar`          | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-12, D1-16, D2-11, D7-09                      |
| C51  | `calendar-range`    | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-12, D1-16, D2-11, D7-09                      |
| C52  | `tags-input`        | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-09, D2-11, D3-04                             |
| C53  | `form`              | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-11, D3-04, D7-10                      |
| C54  | `editable`          | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-12, D2-11, D3-04                             |
| C55  | `stepper`           | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-12, D2-11, D3-04                             |
| C90  | `rating`            | 单类           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-08, D2-11, D3-01, D7-05                      |

#### 2.3.5 数据展示 (Data Display) — 14 个

| 编号 | 组件          | 模式           | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                               |
| :--: | :------------ | :------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :--------------------------------------- |
| C56  | `avatar`      | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D2-02, D3-01                      |
| C57  | `badge`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-12, D2-11, D3-01                      |
| C58  | `tag`         | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-09, D2-11, D3-01                      |
| C59  | `card`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-12, D2-11, D3-12                      |
| C60  | `list`        | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-09, D2-04, D7-01                      |
| C61  | `table`       | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-12, D2-04, D2-11, D3-04, D7-01, D7-02 |
| C62  | `tree`        | 多槽           | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P0   | D1-16, D2-04, D2-11, D3-04, D7-01        |
| C63  | `tree-menu`   | 多槽 + Compact | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-12, D1-16, D2-11, D7-01               |
| C64  | `accordion`   | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-16, D2-11, D7-05               |
| C65  | `collapsible` | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-08, D1-16, D2-11                      |
| C66  | `carousel`    | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D2-11, D7-02                      |
| C67  | `empty`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P3   | D1-12, D2-11, D3-01                      |
| C68  | `skeleton`    | 单类           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-09, D2-11, D7-04                      |
| C69  | `progress`    | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-09, D2-11, D3-01                      |

#### 2.3.6 反馈与浮层 (Feedback & Overlay) — 13 个

| 编号 | 组件            | 模式           | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                                      |
| :--: | :-------------- | :------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :---------------------------------------------- |
| C70  | `alert`         | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-15, D2-11, D7-05                      |
| C71  | `toast`         | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-08, D7-04                      |
| C72  | `dialog`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D1-16, D2-11, D7-04, D7-05, D7-19, D7-20 |
| C73  | `drawer`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D1-16, D2-11, D7-04, D7-05               |
| C74  | `popover`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D1-16, D2-11, D7-05                      |
| C75  | `popconfirm`    | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D1-16, D2-11, D7-05                      |
| C76  | `hover-card`    | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-16, D2-11, D7-05                      |
| C77  | `bottom-sheet`  | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-16, D2-11, D7-05                      |
| C78  | `dropdown-menu` | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D1-16, D2-11, D7-05                      |
| C79  | `context-menu`  | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-16, D2-11, D7-05                      |
| C80  | `command`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-16, D2-11, D7-05                      |
| C81  | `tooltip`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D1-15, D1-16, D2-11, D7-05               |
| C82  | `toolbar`       | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-16, D2-11, D3-12, D7-05                      |

#### 2.3.7 颜色 (Color) — 6 个

| 编号 | 组件                  | 模式           | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                 |
| :--: | :-------------------- | :------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :------------------------- |
| C83  | `color-area`          | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P3   | D1-12, D1-16, D3-01        |
| C84  | `color-field`         | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P3   | D1-12, D2-11, D3-01        |
| C85  | `color-picker`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-12, D2-11, D3-01, D3-08 |
| C86  | `color-slider`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P3   | D1-12, D1-16, D3-01        |
| C87  | `color-swatch`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P3   | D1-12, D3-01               |
| C88  | `color-swatch-picker` | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P3   | D1-12, D3-04               |

> **注：** `virtualizer`（C89 见下）作为独立导出的基础原语，单独列项。

#### 2.3.8 基础原语 (Primitives) — 1 个

| 编号 | 组件          | 模式 | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                        |
| :--: | :------------ | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :-------------------------------- |
| C89  | `virtualizer` | 多槽 | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-09, D2-04, D7-01, D7-02, D7-04 |

> **统计校验：** 14 + 4 + 8 + 30 + 14 + 13 + 6 + 1 = 90 项；其中 `button` 与 `button-group`、`checkbox` 与 `checkbox-group` 共享同一组件目录（同一 barrel 导出），故 90 个检查单元对应 **88 个发布组件**（与 `packages/ui/src/index.ts` 的 88 行组件导出一致，共 110 个 S 前缀导出）。`rating`（C90）为新近发布、纳入待检查队列。本表按「组件家族」粒度拆分以反映实际检查单元。

### 2.4 重点组件详细检查清单（P0 优先级）

以下 P0 组件因对标差距大、用户交互复杂、Blocker 风险高，需在第一轮完成全维度详查。维度检查标准与验收条件见 [audit.md -> Dimension details](../.agents/skills/soybean-ui-component-development/audit.md#dimension-details)；下表只列具体检查内容。

#### C27 `input` — P0

| 维度 | 具体检查内容                                                                                                                                             | 标准                       | 验收条件             |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :------------------- |
| D1   | 多槽 recipe 完整、`useOmitProps` 含 `class`、`data-soybean-input` 属性存在                                                                               | D1-09, D1-10, D1-07        | grep + DOM 检查      |
| D2   | 对标 Ant Design/Element Plus/Mantine：`showCount`、`maxlength`、`clearable`、`status`(error/warning)、`prefix`/`suffix` slot、`disabled`/`readonly` 区分 | D2-01, D2-11               | 矩阵产出             |
| D3   | 命名 `modelValue`/`v-model`、`placeholder`、`disabled`/`readonly`、`size`/`variant`/`color`、`status` 与主流库一致                                       | D3-01, D3-07               | 命名审查             |
| D4   | props interface 继承 `HTMLAttributes`；`InputProps` 导出；JSDoc 覆盖 `placeholder`/`status`/`clearable`                                                  | D4-03, D4-06               | typecheck + 文档生成 |
| D5   | script setup 顺序；`shallowRef` 用于 input ref；模板无 `props.xxx`；无内联箭头函数                                                                       | D5-12, D5-14, D5-15, D5-16 | grep + 评审          |
| D6   | 中英文 docs 同步；playground 含 `01-basic`/`02-size`/`03-disabled`/`04-status`/`05-clearable`/`06-count`                                                 | D6-01, D6-05               | 文件清单             |
| D7   | SSR 不访问 `window`；`clearable` button 有 `aria-label`；测试覆盖 rendering/disabled/status/accessibility                                                | D7-05, D7-09, D7-11        | 测试通过             |

#### C32 `select` / C33 `combobox` / C34 `autocomplete` — P0

| 维度 | 具体检查内容                                                                                                                                                                                       | 标准                       | 验收条件                          |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :-------------------------------- |
| D1   | Compact 聚合已下沉；wrapper 不迭代 `items`；`data-soybean-select-*` 属性完整                                                                                                                       | D1-07, D1-12               | DOM 检查                          |
| D2   | 对标 Ant Design/Naive UI/Mantine：`filterable`、`remote`/`loading`、`multiple`/`maxTagCount`、`virtual`、`allowCreate`、`clearable`、`showArrow`                                                   | D2-01, D2-04, D2-11        | 矩阵产出 + 1k+ 项性能测试         |
| D3   | `modelValue` 支持单选/多选；`SelectionProps<M>`/`SelectionEmits<M>` 泛型；`filter` 自定义函数；`remote` 异步载荷                                                                                   | D3-04, D3-08, D3-12        | 类型审查                          |
| D4   | 泛型 `M` 模型；`OptionItem<M>` JSDoc；`filter`/`remote` callback 类型清晰                                                                                                                          | D4-06, D4-08               | IDE 推导                          |
| D5   | 大数据列表用 `shallowRef`；滚动逻辑提取 `useSelectScroll` 等纯函数                                                                                                                                 | D5-09, D5-10               | 评审                              |
| D6   | playground 含 `01-basic`/`02-multiple`/`03-filterable`/`04-remote`/`05-virtual`/`06-clearable`                                                                                                     | D6-05                      | 文件清单                          |
| D7   | 1k+ 选项虚拟滚动；ARIA `listbox`/`option`/`combobox` 模式；焦点管理；`aria-activedescendant`；e2e 覆盖真实指针/键盘/portal/焦点返回/颜色对比（`select` 已有 spec，`combobox`/`autocomplete` 须补） | D7-01, D7-05, D7-19, D7-20 | 性能 + axe-core + `pnpm test:e2e` |

#### C53 `form` — P0

| 维度 | 具体检查内容                                                                                                                                                                                            | 标准                | 验收条件 |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------ | :------- |
| D1   | Compact 聚合；`form-field`/`form-field-array`/`form-control`/`form-label`/`form-error`/`form-description` 多槽                                                                                          | D1-12               | DOM 检查 |
| D2   | 对标 Ant Design/Element Plus/Mantine：`rules`、`validateTrigger`、`validateStatus`、`help`、`labelAlign`/`labelWidth`、`required`、`colon`、`layout`(horizontal/vertical/inline)、`disabled`(propagate) | D2-01, D2-11        | 矩阵产出 |
| D3   | `FormProps`/`FormFieldProps`/`FormEmits`；`validate`/`validateField`/`resetFields`/`scrollToField` 方法暴露；`rules` 类型与 `async-validator` 对齐                                                      | D3-08, D3-12, D7-17 | 类型审查 |
| D4   | 泛型 `FormProps<T>`；`FormFieldProps<T>`；JSDoc 完整                                                                                                                                                    | D4-06, D4-08        | IDE 推导 |
| D5   | 校验逻辑提取纯函数 `validateRule(value, rule)`；不引入 class                                                                                                                                            | D5-01, D5-02        | 评审     |
| D6   | playground 含 `01-basic`/`02-layout`/`03-rules`/`04-async`/`05-array`/`06-disabled`                                                                                                                     | D6-05               | 文件清单 |
| D7   | 异步校验异常 fallback；错误状态 ARIA `aria-invalid`/`aria-describedby`；测试覆盖                                                                                                                        | D7-05, D7-10, D7-11 | 测试通过 |

#### C61 `table` — P0

| 维度 | 具体检查内容                                                                                                                                                                                    | 标准                       | 验收条件         |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- | :--------------- |
| D1   | Compact 聚合；`columns` 配置式与 `slot` 自定义并存；`data-soybean-table-*` 完整                                                                                                                 | D1-07, D1-12               | DOM 检查         |
| D2   | 对标 Ant Design/Element Plus/Naive UI：`columns`/`sorting`/`filtering`/`pagination`/`selection`/`expandable`/`fixedHeader`/`fixedColumns`/`virtualScroll`/`resizeColumn`/`summary`/`customCell` | D2-01, D2-04, D2-11        | 矩阵 + 1k 行性能 |
| D3   | `columns` 类型 `TableColumn<T>[]`；`rowKey`；`sorting`/`filtering` 受控/非受控；`pagination` 与 `pagination` 组件集成                                                                           | D3-04, D3-08, D3-12        | 类型审查         |
| D4   | 泛型 `TableProps<T>`；`TableColumn<T>`/`TableSelection`/`TableSorting` JSDoc                                                                                                                    | D4-06, D4-08               | IDE 推导         |
| D5   | 排序/过滤纯函数；大数据用 `shallowRef`                                                                                                                                                          | D5-01, D5-09               | 评审             |
| D6   | playground 含 `01-basic`/`02-sorting`/`03-filtering`/`04-pagination`/`05-selection`/`06-fixed`/`07-virtual`/`08-customCell`                                                                     | D6-05                      | 文件清单         |
| D7   | 1k 行虚拟滚动 60fps；`role="table"`/`grid`；`aria-sort`/`aria-selected`；列宽 resize 性能；e2e 覆盖真实键盘导航（须补 spec）                                                                    | D7-01, D7-02, D7-05, D7-19 | 性能 + axe-core  |

#### C62 `tree` — P0

| 维度 | 具体检查内容                                                                                                                                     | 标准                | 验收条件           |
| :--- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ | :----------------- |
| D1   | 多槽；`data-soybean-tree-*` 完整；展开/折叠状态 `aria-expanded`                                                                                  | D1-07, D1-08        | DOM 检查           |
| D2   | 对标 Ant Design/Element Plus：`virtual`、`draggable`、`checkable`、`defaultExpandAll`、`loadData`(async)、`searchValue`、`blockNode`、`showLine` | D2-01, D2-04, D2-11 | 矩阵 + 1k 节点性能 |
| D3   | `data` 类型 `TreeNode<T>[]`；`checkable`/`multiple`；`onSelect`/`onCheck`/`onExpand` 载荷一致                                                    | D3-04, D3-05        | 类型审查           |
| D4   | 泛型 `TreeProps<T>`；`TreeNode<T>` JSDoc                                                                                                         | D4-06, D4-08        | IDE 推导           |
| D5   | 树操作纯函数（`flattenTree`/`filterTree`/`toggleNode`）；递归用 `shallowRef`                                                                     | D5-01, D5-09        | 评审               |
| D6   | playground 含 `01-basic`/`02-checkable`/`03-async`/`04-virtual`/`05-search`/`06-draggable`                                                       | D6-05               | 文件清单           |
| D7   | 1k 节点虚拟滚动；`role="tree"`/`treeitem`；`aria-expanded`/`aria-selected`/`aria-checked`；键盘箭头导航；e2e 覆盖真实键盘导航（须补 spec）       | D7-01, D7-05, D7-19 | 性能 + axe-core    |

#### C71 `toast` — P0

| 维度 | 具体检查内容                                                                                                                                                                              | 标准                | 验收条件        |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ | :-------------- |
| D1   | Compact 聚合；imperative API `useToast()`；`provideToast()`                                                                                                                               | D1-12, D7-17        | 评审            |
| D2   | 对标 Ant Design `message`/`notification`、Element Plus `ElMessage`/`ElNotification`、Mantine `notifications`：`position`、`duration`、`stack`、`closable`、`pauseOnHover`、`rich content` | D2-01, D2-11        | 矩阵产出        |
| D3   | `useToast().info/success/warning/error/loading`；`ToastOptions` 类型；`onClose`/`onOpen` callback                                                                                         | D3-05, D3-08, D7-17 | 类型审查        |
| D4   | `ToastOptions`/`ToastPosition`/`ToastVariant` JSDoc                                                                                                                                       | D4-06               | 文档生成        |
| D5   | 队列管理纯函数；timer 用 `useTimeoutFn`（@vueuse）                                                                                                                                        | D5-01, D5-10        | 评审            |
| D6   | playground 含 `01-basic`/`02-variant`/`03-position`/`04-duration`/`05-pause`/`06-stack`                                                                                                   | D6-05               | 文件清单        |
| D7   | unmount 清理 timer；`role="alert"`/`status`；`aria-live`；堆叠 z-index                                                                                                                    | D7-04, D7-05        | 测试 + axe-core |

#### C72 `dialog` / C73 `drawer` — P0

| 维度 | 具体检查内容                                                                                                                                                                   | 标准                              | 验收条件                          |
| :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- | :-------------------------------- |
| D1   | Compact 聚合；焦点 trap 与焦点返回；`aria-modal`/`aria-labelledby`/`aria-describedby`；Esc 关闭                                                                                | D1-12, D1-16                      | DOM + 键盘测试                    |
| D2   | 对标 Ant Design/Element Plus：`draggable`、`fullscreen`、`destroyOnClose`、`width`/`height`、`closable`、`mask`/`maskClosable`、`keyboard`(Esc)、`zIndex`、`lockScroll`        | D2-01, D2-11                      | 矩阵产出                          |
| D3   | `open`/`v-model:open`；`onOpenChange`；`DialogProvider` imperative API；嵌套 dialog 焦点链                                                                                     | D3-04, D3-08, D7-17               | 类型审查                          |
| D4   | `DialogProps`/`DialogEmits`/`DialogSlots` JSDoc                                                                                                                                | D4-06                             | 文档生成                          |
| D5   | 焦点 trap 逻辑提取 `useFocusTrap`；overlay z-index 管理                                                                                                                        | D5-01, D5-10                      | 评审                              |
| D6   | playground 含 `01-basic`/`02-size`/`03-fullscreen`/`04-nested`/`05-draggable`/`06-destroyOnClose`                                                                              | D6-05                             | 文件清单                          |
| D7   | unmount 焦点返回；`role="dialog"`；`aria-modal`；body scroll lock；z-index 不溢出；e2e 覆盖真实 portal 开关/Escape 关闭/焦点返回/颜色对比（`dialog` 已有 spec，`drawer` 须补） | D7-04, D7-05, D7-10, D7-19, D7-20 | 测试 + axe-core + `pnpm test:e2e` |

> 其余 P0 组件（`textarea`/`input-number`/`password`/`checkbox`/`checkbox-group`/`radio-group`/`switch`/`date-field`/`date-picker`/`date-range-field`/`date-range-picker`/`time-field`/`time-range-field`/`popconfirm`/`popover`/`dropdown-menu`/`tooltip`）按相同模板执行，每项产出独立检查记录。

---

## 三、执行顺序建议

按优先级 + 类别推进，每轮集中处理同一类组件以降低上下文切换成本。单组件验收清单见 [audit.md -> Single-component acceptance checklist](../.agents/skills/soybean-ui-component-development/audit.md#single-component-acceptance-checklist)，每轮完成后执行 [audit.md -> Cross-component consistency regression](../.agents/skills/soybean-ui-component-development/audit.md#cross-component-consistency-regression)，全部完成后执行 [audit.md -> Full regression](../.agents/skills/soybean-ui-component-development/audit.md#full-regression)。

1. **第 1 轮（P0 表单核心）：** C27 `input`、C28 `textarea`、C29 `input-number`、C31 `password`、C36/C37 `checkbox`、C38 `radio-group`、C39 `switch` — 共 8 项 — **✅ 已完成**（C27/C28/C29/C31/C36/C37/C38/C39 见 [四、组件检查执行记录](#四组件检查执行记录)）
2. **第 2 轮（P0 选择器）：** C32 `select`、C33 `combobox`、C34 `autocomplete`、C35 `cascader` — 共 4 项 — **✅ 已完成**（见 [四、组件检查执行记录](#四组件检查执行记录)）
3. **第 3 轮（P0 日期时间）：** C44-C49（6 项 `*-field`/`*-picker`）— **✅ 已完成**（见 [四、组件检查执行记录](#四组件检查执行记录)）
4. **第 4 轮（P0 表单聚合）：** C53 `form`
5. **第 5 轮（P0 数据展示）：** C61 `table`、C62 `tree`
6. **第 6 轮（P0 浮层）：** C71 `toast`、C72 `dialog`、C73 `drawer`、C74 `popover`、C75 `popconfirm`、C78 `dropdown-menu`、C81 `tooltip`
7. **第 7 轮（P1 通用基础）：** C01-C04、C14（5 项）
8. **第 8 轮（P1 导航）：** C20、C22、C24-C26（4 项）
9. **第 9 轮（P1 表单补充）：** C30、C40-C43、C52、C54、C55（8 项） — **🟡 C30 `input-otp` 已提前完成**（见 [四、组件检查执行记录](#四组件检查执行记录)）
10. **第 10 轮（P1 数据展示）：** C56、C58、C61（已 6 轮）→ C64、C66、C69（4 项）
11. **第 11 轮（P1 浮层补充）：** C76、C77、C79-C82、C89（7 项）
12. **第 12 轮（P2 剩余）：** 其余 P2 组件
13. **第 13 轮（P3 剩余）：** 其余 P3 组件

> **批次 1 执行偏差说明：** 批次 1（2026-08-02 ~ 08-03）按「表单输入 → 选择器」连续推进，将属于第 9 轮的 `input-otp`（C30）提前至批次内完成，以便与 input/textarea/input-number/password 形成完整的 P0 表单核心族系审计闭环。各组件检查记录见 [四、组件检查执行记录](#四组件检查执行记录)。

---

## 四、组件检查执行记录

> 按 [audit.md -> Single-component acceptance checklist](../.agents/skills/soybean-ui-component-development/audit.md#single-component-acceptance-checklist) 执行，每个组件产出独立检查记录报告（`docs/check-reports/C{编号}-{组件}.md`），完成后回写 [二、组件检查任务列表](#二组件检查任务列表按组件维度独立) 状态列。
>
> **批次约定：** 每个批次以一段连续提交为单位（`check({Component}): optimize {Component}`），聚焦同一组件类别。批次内所有组件通过 [audit.md -> Cross-component consistency regression](../.agents/skills/soybean-ui-component-development/audit.md#cross-component-consistency-regression) 后进入下一批次。

### 4.1 批次 1（P0 表单输入与选择器）— 2026-08-02 ~ 08-03

覆盖 C27–C39 共 **12 个检查单元**（第 1 轮 8/8 + 第 2 轮 4/4，`input-otp` 提前完成）。批次共修复 **21 项真实缺陷**（Major 14 / Minor 7），单测由 **94 → 277 项**（+183），并为 textarea 新增浏览器 e2e 5 项。

|  编号   | 组件                          | 检查报告                                                   | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                    | 单测（前 → 后） |
| :-----: | :---------------------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------- |
|   C27   | `input`                       | [C27-input.md](./check-reports/C27-input.md)               | **Major ×1**（D1-08/D7-05）：`InputClear` 无 i18n `aria-label`（补 13 语言 `input.clear`）+ 默认图标缺 `aria-hidden`，axe `button-name`/`svg-img-alt` 违规                                                                                                                                                                                                                                              | 10 → 23         |
|   C28   | `textarea`                    | [C28-textarea.md](./check-reports/C28-textarea.md)         | 无 Blocker/Major（clear a11y 已于族系建设期完成）；补单测 8 → 26 + **浏览器 e2e 5 项**（autosize 生长/`maxRows` 封顶/counter/清除/axe——happy-dom 无布局引擎，`adjustHeight` 须浏览器级验证）                                                                                                                                                                                                            | 8 → 26 + e2e 5  |
|   C29   | `input-number`                | [C29-input-number.md](./check-reports/C29-input-number.md) | **Major ×2**：① D1-10 键盘增减 NaN 污染（`@keydown.up.prevent="onIncrease"` 未加括号，`KeyboardEvent` 被当 `multiplier`）；② D6-01 中文文档路由 404（`number-input.md` → `git mv` `input-number.md`）。**Minor ×3**：`onClear` 无禁用守卫、`usePressedHold` 定时器泄漏（补 `onScopeDispose`）、clear 图标缺 `aria-hidden`                                                                               | 6 → 21          |
|   C30   | `input-otp`                   | [C30-input-otp.md](./check-reports/C30-input-otp.md)       | **Major ×1**（D3-01/D7-05）：自定义 `aria-label` 三种传法全失效（prop 以 kebab 键声明，Vue 3.5 camelize 后读取命中不到）→ 改 `ariaLabel` 声明 + 双键读取，playground 4 个示例的 aria-label 同步恢复                                                                                                                                                                                                     | 6 → 24          |
|   C31   | `password`                    | [C31-password.md](./check-reports/C31-password.md)         | **Minor ×1**（D3-01/D7-07）：`clear` 事件被 `SPassword` 包装器吞掉（未绑定 `@clear` 转发）；**SInput 存在同一模式问题，已记录留待其检查轮次处理**                                                                                                                                                                                                                                                       | 6 → 25          |
|   C32   | `select`                      | [C32-select.md](./check-reports/C32-select.md)             | **Major ×1**（D1-04/D7-07）：`defaultValue`/受控 `modelValue` 未打开时 trigger 文本为空（collection 挂载才注册）→ `SelectCompact` 新增 `fallbackLabel` 数据驱动回退。**Minor ×1**：`select-root.vue` 的 `@ts-expect-error` 反模式 → 显式类型断言                                                                                                                                                        | 5 → 16          |
|   C33   | `combobox`                    | [C33-combobox.md](./check-reports/C33-combobox.md)         | **Major ×1**（D1-04）：disabled item 仍可被选中——`withDefaults` 将未显式默认值的 Boolean prop 隐式默认化为 `false`，`rootDisabled ?? props.disabled` 短路失效 → 改 `computed(rootDisabled \|\| props.disabled)`                                                                                                                                                                                         | 13 → 23         |
|   C34   | `autocomplete`                | [C34-autocomplete.md](./check-reports/C34-autocomplete.md) | **Major ×1**（D7-05）：打开态 `role="listbox"` 缺可访问名称（axe `aria-input-field-name` serious）→ compact `viewportProps` 注入 `aria-label` + 13 语言 `LocaleAutocompleteMessages.options`。**Minor ×1**：点击清空按钮误关弹出层（blur 圈闭不含 anchor）→ `parentElement` 判定对齐 combobox                                                                                                           | 11 → 21         |
|   C35   | `cascader`                    | [C35-cascader.md](./check-reports/C35-cascader.md)         | **Major ×2**：① D2-11/D7-05 4 处硬编码中文文案未走 locale（clear 按钮/空态/tag 移除按钮/filterable 搜索框）→ 新增 `LocaleCascaderMessages` + 13 语言包 + `emptyLabel`/`clearLabel` prop；② D7-05 打开态 axe `aria-allowed-attr` critical（`textbox` 绑定 `aria-expanded`）→ 移除冗余属性                                                                                                                | 10 → 21         |
| C36/C37 | `checkbox` / `checkbox-group` | [C36-checkbox.md](./check-reports/C36-checkbox.md)         | **Major ×1**（D1-03）：`checkbox-card-group.vue` 向 headless 传 4 个未声明 props（`:content-class` 等）→ 泄漏为组根 DOM 非法属性（且经 `provideCheckboxCardUi` 冗余）→ 删除绑定。**顺带修复** autocomplete-compact 既有 `use-before-define` lint 错误                                                                                                                                                   | 19 → 41         |
|   C38   | `radio-group`                 | [C38-radio-group.md](./check-reports/C38-radio-group.md)   | **Major ×3**：① D1-16 Enter 键无法选中（`@keydown.enter.prevent` 无处理函数，`originalEvent` 类型同步放宽）；② D7-04 `onBeforeMount` 移除 document 键盘监听器（挂载前空操作，卸载时泄漏）→ `onBeforeUnmount`；③ D1-16 `controlElement.value?.click()` 命中 Button 组件实例（无 `click` 方法，真实浏览器箭头键选中崩溃）→ `$el?.click()`。**文档** en/zh 4 节 → 9 节 Recommended structure               | 7 → 25          |
|   C39   | `switch`                      | [C39-switch.md](./check-reports/C39-switch.md)             | **Major ×1**（D1-08 表单代理）：隐藏 input `:checked="!!modelValue"` 在自定义字符串 `trueValue`/`falseValue` 下恒为 true（`!!'off'`），false 态被误判为选中提交 → `:checked="modelValue === trueValue"`。**Minor ×1**（D5 类型卫生）：3 文件 6 处 `trueValue: true as any` + root 2 处 `@ts-expect-error` → `as unknown as NonNullable<T>` + 显式断言。**文档** en/zh 4 节 → 7 节 Recommended structure | 9 → 20          |

> **批次合计：** 12 个检查单元全部通过 D1–D7 全维度；单测 94 → 277 项（+183），textarea 浏览器 e2e 5 项；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（select/combobox/autocomplete/cascader/tags-input/password/input-number/checkbox/radio-group/switch 等）全通过。

### 4.2 批次遗留增强项（统一排期，非阻塞）

| 组件                                          | 增强项                                                                                                                                                                                                         | 对标依据          | 出处                                                                          |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- | :---------------------------------------------------------------------------- |
| `input`/`textarea`                            | `showCount` 计数器、`error`/`loading` 态、`change` 事件、IME 组合事件                                                                                                                                          | AntD/Element Plus | [C27](./check-reports/C27-input.md)、[C28](./check-reports/C28-textarea.md)   |
| `input-number`                                | `formatter`/`parser` 钩子、`controls` 显隐、`compact` 模式                                                                                                                                                     | AntD/Element Plus | [C29](./check-reports/C29-input-number.md)                                    |
| `input-otp`                                   | locale 化默认 aria-label、`contextmenu` 处理                                                                                                                                                                   | reka-ui/shadcn    | [C30](./check-reports/C30-input-otp.md)                                       |
| `checkbox`/`radio-group`                      | 独立 `indeterminate` prop、`button` variant、全选/半选联动辅助                                                                                                                                                 | AntD/Element Plus | [C36](./check-reports/C36-checkbox.md)                                        |
| `select`/`combobox`/`autocomplete`/`cascader` | `remote`/`loading` 态、`maxTagCount`、虚拟滚动 e2e、`showArrow` 对齐                                                                                                                                           | AntD/Naive UI     | [C32](./check-reports/C32-select.md) ~ [C35](./check-reports/C35-cascader.md) |
| `switch`                                      | `loading` 态、`onLabel`/`offLabel` 内联标签、`beforeChange` 钩子、`change` 事件                                                                                                                                | AntD/Element Plus | [C39](./check-reports/C39-switch.md)                                          |
| `slider`                                      | `marks` 刻度标记、拖拽时数值 tooltip、数字输入框联动                                                                                                                                                           | AntD/Element Plus | [C40](./check-reports/C40-slider.md)                                          |
| `toggle`                                      | 按下态图标动画                                                                                                                                                                                                 | AntD              | [C41](./check-reports/C41-toggle.md)                                          |
| `toggle-group`                                | UI 透传层缺 `withDefaults`：纯 `defineProps<T>()` 时缺省 Boolean prop 被 Vue 运行时 cast 为 `false` 并作为显式值透传，覆盖 headless 子组件 `withDefaults` 中的 `true` 默认（`rovingFocus`/`loop`/`clearable`） | Vue 运行时行为    | [C42](./check-reports/C42-toggle-group.md)                                    |
| 表单族系（系统性排查）                        | 全仓 51 个 UI 层组件使用纯 `const props = defineProps<T>()`（无 `withDefaults`），凡透传 Boolean 且子组件有非 `false` 默认者存在与 toggle-group 同款 cast 覆盖风险，需统一排查                                 | Vue 运行时行为    | [C43](./check-reports/C43-segment.md)                                         |
| 表单族系（共享）                              | `isFormControl` 语义对齐 Radix `closest('form')`（当前为「元素自身含 `form` 类」）                                                                                                                             | Radix             | [C36](./check-reports/C36-checkbox.md)                                        |
| 测试基础设施                                  | `icon.spec.ts` 4 项环境性失败（iconify SVG 数据缺失，HEAD 既有）                                                                                                                                               | —                 | [C36](./check-reports/C36-checkbox.md)                                        |

### 4.3 批次 2（P1 表单补充）— 2026-08-03

覆盖第 9 轮（P1 表单补充）自 C40 起的组件（`input-otp` 已提前在批次 1 完成）。

| 编号 | 组件           | 检查报告                                                   | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 单测（前 → 后） |
| :--: | :------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| C40  | `slider`       | [C40-slider.md](./check-reports/C40-slider.md)             | **Minor ×1**（D1-16 焦点稳定性）：`SliderCompact` thumb `v-for` key 用 `` `${index}-${value}` ``，值变化触发 thumb DOM 重建，拖拽/键盘步进时焦点与 hover/focus-visible 状态丢失 → 改 `:key="index"` 索引稳定，值更新仅走 props 响应式。**文档** en/zh 4 节 → 7 节 Recommended structure（架构对标表 12 能力 × 6 库）                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 12 → 28         |
| C41  | `toggle`       | [C41-toggle.md](./check-reports/C41-toggle.md)             | 无 Blocker/Major（`aria-pressed`/`data-state` 双通道反射、受控/非受控、禁用守卫、Button 基座键盘均正确）；补单测 7 → 17（非受控/受控更新/点击切换/变体颜色尺寸形状/slot props/click 转发/disabled+aria-disabled/on 态 axe）。**文档** en/zh 4 节 → 7 节 Recommended structure（对标表以 shadcn `Toggle` 为主，其余库以「按钮+状态」表达同一交互）                                                                                                                                                                                                                                                                                                                                                                                                                    | 7 → 17          |
| C42  | `toggle-group` | [C42-toggle-group.md](./check-reports/C42-toggle-group.md) | **Major ×1**（D1-08/D7-11 运行时行为）：UI 透传层 `SToggleGroup` 用纯 `defineProps<T>()`（无 `withDefaults`），缺省挂载时 Vue 运行时将缺失 Boolean prop cast 为字面量 `false`，经 `useOmitProps` 作为**显式值**透传，覆盖 headless `ToggleGroupRoot` `withDefaults` 中的 `true` 默认（`rovingFocus`/`loop`/`clearable`）→ headless 改**函数式默认值**（`rovingFocus: () => true`）+ 运行时 `??` 回退，UI 透传层同步声明函数式默认值。**注：** C42 报告初版误判为「编译器丢弃字面量 Boolean 默认」，经编译产物反编译 + 运行环境探针 + revert 对照三重验证修正（详见报告 4.3 节）；`accordion`/`select` UI 层**已有** `withDefaults`（字面量默认保留），原波及项为误报。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 12 能力 × 6 库对标表） | 8 → 24          |
| C43  | `segment`      | [C43-segment.md](./check-reports/C43-segment.md)           | 无 Blocker/Major（`segment-compact` 默认值运行时全部保留；指示器经 resize observer 异步测量、挂载后一帧出现为正常时序；禁用/键盘/loop/RTL 行为均正确）；补单测 8 → 24（渲染/选中态/指示器/禁用/键盘/RTL/样式/ui 覆盖/slot props/axe）。**文档** en/zh 4 节 → 8 节 Recommended structure（12 能力 × 6 库对标表，shadcn 通常以 Tabs 表达分段控件）。**遗留**：全仓 51 个 UI 层纯 `defineProps<T>()` 组件存在同款 cast 覆盖风险，统一排期排查                                                                                                                                                                                                                                                                                                                           | 8 → 24          |

> **批次 2 合计：** 4 个检查单元通过 D1–D7 全维度；单测 19 → 93 项（+74）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（toggle-group/segment/slider/switch/checkbox/radio-group/toolbar 等）全通过。

### 4.4 批次 3（P0 日期时间）— 2026-08-03

覆盖第 3 轮（P0 日期时间）的 `*-field`/`*-picker` 组件（C44-C49）。

| 编号 | 组件                | 检查报告                                                             | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 单测（前 → 后） |
| :--: | :------------------ | :------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| C44  | `date-field`        | [C44-date-field.md](./check-reports/C44-date-field.md)               | **Major ×1**（D1-08/D2-11 响应式）：`date-field-root.vue` 的 `segmentValues` 为 `shallowRef`，编辑逻辑（`useDateField`）原地变更其内部字段；watch 清空分支原仅在「全部为 null」时整体替换（死代码——Backspace 单段置 null 时不可能全部为 null），导致 `segmentContents` computed 不失效——清空值后分段残留旧值、`data-placeholder` 不刷新 → 清空分支无条件替换新对象（`{ ...segmentValues.value }`）触发引用变更。**Minor ×1**（D1-12 Compact 聚合）：`date-field.vue` 未显式转发 `leading`/`trailing` 插槽，插槽内容被静默丢弃 → 对照 SSegment 显式转发模式补上。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 12 能力 × 6 库对标表 + FAQ 5 组）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 6 → 24          |
| C45  | `date-picker`       | [C45-date-picker.md](./check-reports/C45-date-picker.md)             | **Major ×1**（D1-08 props 泄漏）：`date-picker-compact.vue` 的 `calendarProps` 排除列表漏 `dateFieldProps`（`DatePickerCompactProps extends CalendarCompactProps` 继承链使该 prop 泄漏为日历根 DOM 非法属性）→ 补入排除列表。**Major ×1**（D2-11 props 透传）：`PopoverPopup`/`PopperPopup` 声明 `BaseProps`（含 `aria-label`）后模板未绑定剩余 props，声明过的 props 被 Vue 运行时消费而**静默吞掉**——`popupProps` 传入的 `aria-label`/`data-*` 等从未渲染到 dialog 元素（联动导致 popup 打开态 axe `aria-dialog-name` 偶发违规）→ 两层 `useOmitProps` 排除显式绑定键后 `v-bind` 透传。**Minor ×1**（D1-12 Compact 聚合）：日历开关图标触发器无可访问名称 → `triggerProps` 注入 locale `toggle` 消息。**Minor ×1**（D7-09 a11y）：popup `role="dialog"` 默认可访问名称缺失 → 新增 `LocaleDatePickerMessages { toggle, popupLabel }` 并同步 13 语言包，`popoverProps` 注入 `popupProps['aria-label']`。**Minor ×1**（D1-12 Compact 聚合）：`leading` 插槽未显式转发 → 补转发。**Minor ×1**（UI 层 D2-11）：`SDatePicker` 的 `calendarUi` 未从 `forwardedProps` 排除 → 泄漏至 headless → 补排除。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 12 能力 × 6 库对标表 + FAQ 5 组） | 11 → 23         |
| C46  | `date-range-field`  | [C46-date-range-field.md](./check-reports/C46-date-range-field.md)   | **Major ×1**（D1-08/D2-11 响应式）：与 C44 同款的 shallowRef 原地变更陷阱——`date-range-field-root.vue` 的 start/end 两个 watch 清空分支原仅在「全部为 null」时整体替换（清空单段置 null 时恒为死代码），原地变更 `segmentValues` 不失效 `segmentContents` computed → 清空后分段残留旧值、`data-placeholder` 不刷新 → 两个清空分支无条件替换新对象（`{ ...segmentValues.value }`）。**Major ×1**（D2-11 RTL 跨组焦点）：`moveFocus` 跨界分支仅按 `direction` 判断（`direction === 'next' && type === 'start'`），未考虑 RTL 下物理方向反转——RTL 中 `ArrowLeft`（'prev'）物理前进，从 start 组末越界应进入 end 组但分支不匹配，跨组焦点移动在 RTL 下完全失效 → 跨界条件改为基于 delta 符号（`delta > 0` 出 start 组末 / `delta < 0` 出 end 组头）。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 12 能力 × 6 库对标表 + FAQ 5 组）                                                                                                                                                                                                                                                                                                                                                | 8 → 26          |
| C47  | `date-range-picker` | [C47-date-range-picker.md](./check-reports/C47-date-range-picker.md) | **Major ×1**（D1-08 props 泄漏）：同 C45——`date-range-picker-compact.vue` 的 `calendarProps` 排除列表漏 `dateFieldProps`（`DateRangePickerCompactProps extends CalendarRangeCompactProps` 继承链使该 prop 泄漏为日历根 DOM 非法属性）→ 补入排除列表。**Minor ×1**（D7-09 a11y）：弹层 `role="dialog"` 默认可访问名称缺失——`popoverProps` 原用 `usePickProps` 无法注入 locale → 新增 `LocaleDateRangePickerMessages { toggle, popupLabel }` 并同步 13 语言包，改显式 computed 注入 `popupProps['aria-label']`。**Minor ×1**（D1-12 Compact 聚合）：日历开关图标触发器无可访问名称 → `triggerProps` 注入 locale `toggle` 消息。**Minor ×2**（D1-12 Compact 聚合）：`leading`/`separator` 插槽未显式转发 → 补显式转发（UI 层同步补 `DateRangePickerSlots`）。**Minor ×1**（UI 层 D2-11）：`SDateRangePicker` 的 `calendarRangeUi` 未从 `forwardedProps` 排除 → 泄漏至 headless → 补排除。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 13 能力 × 6 库对标表 + FAQ 5 组）                                                                                                                                                                                                           | 13 → 26         |
| C48  | `time-field`        | [C48-time-field.md](./check-reports/C48-time-field.md)               | **Minor ×1**（D1-12 Compact 聚合一致性）：`TimeFieldCompact` 缺 `leading`/`trailing` 插槽——`DateFieldCompact`（C44 已修复）有而 TimeField 无，`STimeField` 无法放置前后缀内容 → 补 headless 插槽 + `TimeFieldCompactSlots` 类型 + UI 层显式转发 + `TimeFieldSlots` 类型。**核查结论**：C44 同款 watch 清空死代码**不存在**（watch null 分支无条件替换新对象）；C42 同款缺省 Boolean cast 风险**不存在**（headless 无默认 `true` 的 Boolean prop）；`required` 无默认、`disabled`/`readonly` 默认 `false` 被 cast 后语义等价。**设计确认**：清空值后段回显占位时间（reka-ui TimeField 行为，与初始化一致）而非 `data-placeholder` 样式——与 date-field 的差异为有意的占位时间显示。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 13 能力 × 6 库对标表 + FAQ 5 组）                                                                                                                                                                                                                                                                                                                                                                                                                | 5 → 24          |
| C49  | `time-range-field`  | [C49-time-range-field.md](./check-reports/C49-time-range-field.md)   | **Major ×1**（D2-11 RTL 跨组焦点）：`moveFocus` 跨界分支仅按 `direction` 判断（`direction === 'next' && type === 'start'`），与 C46 修复前同款——RTL 下 `ArrowLeft`（'prev'）物理前进，从 start 组末越界应进入 end 组但分支不匹配，跨组焦点移动在 RTL 下完全失效 → 跨界条件改为基于 delta 符号（`delta > 0` 出 start 组末 / `delta < 0` 出 end 组头，与 C46 同模式）。**Minor ×1**（D1-09 样式配方）：`styles/time-range-field.ts` 仅 re-export `dateRangeFieldVariants`，首行缺 `// @unocss-include` → 补注释。**核查结论**：C44/C46 同款 watch 清空死代码**不存在**（start/end 两个 watch null 分支均无条件替换新对象）；C48 遗留插槽清单核验通过（`leading`/`separator`/`trailing` 模板渲染 + 类型声明 + UI 层动态转发三步齐全）。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 12 能力 × 6 库对标表 + Cautions 7 条 + FAQ 5 组）                                                                                                                                                                                                                                                                                                                                             | 8 → 27          |

> **批次 3 合计：** 6 个检查单元通过 D1–D7 全维度；单测 51 → 150 项（+99）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（date-field/date-picker/date-range-field/date-range-picker/time-field/time-range-field 等 1432/1432）全通过。

### 4.5 批次 4（P1 日期时间补充）— 2026-08-03

覆盖 P1 日期时间族系中承接批次 3（P0 `*-field`/`*-picker`）的 `calendar`/`calendar-range`（C50、C51），其亦为 C45/C47 日历弹层组件复用的 Compact 基座。

| 编号 | 组件             | 检查报告                                                       | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 单测（前 → 后） |
| :--: | :--------------- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| C50  | `calendar`       | [C50-calendar.md](./check-reports/C50-calendar.md)             | **Minor ×2**（D1-08 props 泄漏）：`calendar-prev.vue`/`calendar-next.vue` 模板 `v-bind="props"` 将函数 prop `prevPage`/`nextPage` 连同其他声明 props 透传 `Button`，经 fallthrough 泄漏为 DOM 非法属性 → 改用 `useOmitProps(props, ['prevPage'/'nextPage'])` 剔除。**Minor ×2**（D2-11 aria-label 覆盖）：prev/next 按钮硬编码 `:aria-label="messages.calendar.prevPage"` 覆盖用户经 `prevProps`/`nextProps` 传入的 `aria-label`（可访问名称不可覆写）→ 改为 `props['aria-label'] ?? 默认消息` 回退模式。**核查结论**：C44/C46 同款 watch 清空死代码**不存在**（`modelValue`/`placeholder` 经 `useControllableState` 统一 setValue、`grid` watch 整体重建新数组）；C42 同款缺省 Boolean cast 风险**不适用**（无默认 `true` 的 Boolean prop）；C49 同款跨组焦点**不适用**（单网格，`shiftFocus` 按 `sign * keyCode` 物理 delta，RTL 天然反转）。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 12 能力 × 6 库对标表 + Cautions 7 条 + FAQ 5 组）                                                                                                                                                 | 9 → 35          |
| C51  | `calendar-range` | [C51-calendar-range.md](./check-reports/C51-calendar-range.md) | **Major ×1**（D1-08 运行时行为）：`onDateChange` 的「非连续范围拒绝」读取 `isInvalid.value`（基于**当前已提交状态**——start-only 时恒 `false`），而非候选 range 的无效性——`allowNonContiguousRanges=false` 时跨越禁用/不可用日期的范围**不会被拒绝**，缺口范围被静默接受 → 在 `useCalendarRangeState` 提取 `isRangeInvalid(start, end)` 候选范围校验器（computed `isInvalid` 与 `onDateChange` 共用），提交时基于候选 range 求值。**Minor ×3**（D1-08/D2-11 props 泄漏 + aria-label 覆盖，与 C50 同款）：`calendar-range-prev.vue`/`calendar-range-next.vue` `v-bind="props"` 泄漏 `prevPage`/`nextPage` → `useOmitProps` 剔除 + `props['aria-label'] ?? 默认消息` 回退；`calendar-range-cell-trigger.vue` `:aria-label="labelText"` 硬编码覆盖用户经 `cellTriggerProps` 传入的 `aria-label` → `props['aria-label'] ?? labelText`。**核查结论**：C44/C46 同款 watch 清空死代码**不存在**；C42 同款缺省 Boolean cast 风险**不适用**；C50 同款 shiftFocus delta 约定**已含**（`sign * keyCode`）。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 13 能力 × 6 库对标表 + Cautions 7 条 + FAQ 5 组） | 5 → 39          |

> **批次 4 合计：** 2 个检查单元通过 D1–D7 全维度；单测 14 → 74 项（+60）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（calendar-range/date-range-picker/date-range-field 91/91 + 全量）全通过。批次 4 完结，后续按执行顺序进入下一检查项。

### 4.6 批次 5（P1 表单补充）— 2026-08-03

覆盖第 9 轮（P1 表单补充）的 `tags-input`（C52），延续批次 1-4 的 D1–D7 全维度审计。

| 编号 | 组件         | 检查报告                                               | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 单测（前 → 后） |
| :--: | :----------- | :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| C52  | `tags-input` | [C52-tags-input.md](./check-reports/C52-tags-input.md) | **Major ×1**（D1-12 Compact 聚合三处连带，复制骨架连锁缺陷）：`tags-input-compact.vue` ① `withDefaults` 声明 `clearable: true` 但 omit 列表未保留 → `<TagsInputClear v-if="clearable">` 恒不渲染，Clear 功能死 prop；② `itemProps`/`itemTextProps`/`itemDeleteProps`/`clearProps`/`controlProps` 声明后从未绑定，子部件样式/行为定制全部静默丢弃；③ `:key="value"` 集合键——重复标签值键冲突坍缩（3 项只渲染 2 项）→ 修复：omit 保留 `clearable` + 五组 `*Props` 全部 `v-bind` 透传 + 复合键 `` `${index}-${value}` ``。**Minor ×4**：`TagsInputItemText` `v-bind="props"` 将 Primitive `as`/`asChild` 泄漏为 DOM `aschild="false"` → `useOmitProps(props, ['as', 'asChild'])`；`styles/tags-input.ts` size variants 死键 `input:` → `control:`（slot 名不匹配 Unocss 类永不生效）；`tags-input-control` 从未绑定 `aria-controls` 使 blur 守卫的 `relatedTarget.closest('#id')` 为死代码 → 根派生 `{id}-tags-list` 容器 id + input 绑定 `aria-controls` 接通；`tags-input-root` transform 键列表 `'disabled'` 重复声明。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 11 能力 × 6 库对标表 + Cautions 8 条 + FAQ 5 组） | 17 → 32         |

> **批次 5 合计：** 1 个检查单元通过 D1–D7 全维度；单测 17 → 32 项（+15）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（tags-input/input-otp/editable 等表单族）全通过。批次 5 完结，后续按执行顺序进入下一检查项。

### 4.7 批次 6（P0 表单）— 2026-08-03

覆盖第 10 轮（P0 表单）的 `form`（C53），延续 D1–D7 全维度审计；本轮同时补齐 playground 示例 03-schema/04-rules/05-async/06-array/07-disabled（替换旧占位 03-zod）并重建表单单测全套件。

| 编号 | 组件   | 检查报告                                   | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 单测（前 → 后） |
| :--: | :----- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| C53  | `form` | [C53-form.md](./check-reports/C53-form.md) | **Major ×1**（D1-08 props 泄漏）：`form-field-compact.vue`/`form-field-array-compact.vue` 模板 `v-bind="props"` 将函数/布尔 prop `name`/`validate`/`reset` 连同声明 props 透传，经 fallthrough 泄漏为 DOM 非法属性 → `useOmitProps(props, ['name', 'validate', 'reset'])` 剔除后 `v-bind="forwardedProps"`。**Major ×1**（D1-08/D7-11 a11y）：`form-field-base-compact.vue` 未把 `:error` 传给 `FormField`——`error` 被 `useOmitProps` 剔除后 `provideFormFieldContext({ error })` 中 `ariaInvalid` 恒为 false，提交报错后屏幕阅读器无法感知校验错误（`data-error` 已接线但 aria 通道未接线）→ 模板补 `:error="error"`。**Minor ×2**（UI 层）：`form-field-array.vue` `{ field: props.class }` slot 键错误 → `{ fieldArray: props.class }`（`SFormFieldArray` class 丢失）；`form-field-base.vue` 动态插槽未转发 props → `#[slotName]="slotProps"` + `<slot v-bind="slotProps" />`（`SFormFieldBase` 插槽收不到 `formFieldId`/`ariaDescribedBy`/`ariaInvalid`）。**Minor ×1**（类型）：`use-form.ts` `@ts-expect-error` → `as unknown as FormFieldComponent` 显式收窄（消除隐性类型断言）。**Minor ×1**（示例）：playground `06-array.vue` 未使用变量 `fields`/`field` → 解构收窄。**测试基建**：`test/setup.ts` 补 `Element.prototype.animate` stub（happy-dom 缺失，auto-animate 退出动画触发 `finish` 清理错误元素 DOM）。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 9 能力 × 6 库对标表 + Cautions 8 条 + FAQ 6 组）。**遗留**：D3-04 `validateTrigger`/async-validator 类实现不在 Standard Schema 接口内（依赖用户侧 schema）；`FormField`/`FormLabel`/`FormControl` 等底层 UI 层无对应 S 前缀封装（headless-only，符合 headless 暴露约定） | 1 → 26          |

> **批次 6 合计：** 1 个检查单元通过 D1–D7 全维度；单测 1 → 26 项（+25）；`pnpm typecheck` 全绿；族系回归（form/input/select/checkbox/switch/radio-group 等表单族 1538/1538）全通过。批次 6 完结，后续按执行顺序进入下一检查项。

### 4.8 批次 7（P1 表单）— 2026-08-03

覆盖第 12 轮（P1 表单）的 `editable`（C54），延续 D1–D7 全维度审计；本轮通过探针验证定位并修复编辑态受控覆盖缺陷，并将单测从 10 项重写扩展到 30 项。

| 编号 | 组件       | 检查报告                                           | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 单测（前 → 后） |
| :--: | :--------- | :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| C54  | `editable` | [C54-editable.md](./check-reports/C54-editable.md) | **Major ×1**（D1-12/D2-11 受控状态被覆盖）：`editable-root.vue` 中 `watch(modelValue)` 无条件把外部值写入 `inputValue`——受控父组件在编辑中更新 `modelValue` 会覆盖用户正在输入的内容（对标 reka-ui：edit 态不写入外部值）→ 仅 `!isEditing` 时同步（提交/取消时统一回写，非编辑态保持同步）。**Minor ×1**（D1-08 props 泄漏）：`editable-input.vue` `v-bind="props"` 将 Primitive `as`/`asChild` 泄漏为 DOM `aschild="false"`（同 C52 修复模式）→ `useOmitProps(props, ['as', 'asChild', 'id'])`。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 10 能力 × 6 库对标表 + Cautions 8 条 + FAQ 7 组）。**遗留**：D3-04 浏览器 e2e（Tier 2 smoke 由 CI 覆盖，本轮以 happy-dom 单测 + axe 静态检查替代）；`SEditable` 纯 `defineProps` 封装未发现 UI 层样式死键（`styles/editable.ts` 8 槽全对齐）；`EditableCompact` 6 个 `*Props` 通道全部 v-bind 透传（无 C52 类连锁缺陷） | 10 → 30         |

> **批次 7 合计：** 1 个检查单元通过 D1–D7 全维度；单测 10 → 30 项（+20）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（editable/input-otp/tags-input 等表单族）全通过。批次 7 完结，后续按执行顺序进入下一检查项。

### 4.9 批次 8（P1 表单）— 2026-08-03

覆盖第 12 轮（P1 表单）的 `stepper`（C55），延续 D1–D7 全维度审计；本轮通过探针验证定位并修复 UI 包装层布尔默认值穿透缺陷，并将单测从 11 项重写扩展到 32 项。

| 编号 | 组件      | 检查报告                                         | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 单测（前 → 后） |
| :--: | :-------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------- |
| C55  | `stepper` | [C55-stepper.md](./check-reports/C55-stepper.md) | **Major ×1**（D1-12/D2-11 默认行为被覆盖）：`stepper.vue` UI 包装层 `linear` 为布尔 prop，Vue 将缺失的布尔 prop 转成 `false` 并向下透传，覆盖 `StepperRoot` 的 `linear: true` 默认值——经 SStepper → StepperCompact → StepperRoot 链路后根节点不渲染 `data-linear`，且未来步骤全部可聚焦（非线性行为）→ 包装层 `withDefaults(defineProps<StepperProps>(), { linear: true })` 镜像 headless 默认值（同 cascader/segment/layout 既有模式）。**Minor ×1**（D1-08 硬编码英文 + 未本地化）：`stepper-root.vue` 实时区域 `Step {current} of {total}` 与 `aria-label` 回退 `'Step-by-step progress'` 硬编码英文 → `LocaleStepperMessages` 新增 `ariaLabel`/`stepOf`（14 语言包同步）并经 `useLocaleMessages` 本地化。**Minor ×1**（类型）：`StepperCompactProps.itemProps` 声明为 `StepperItemProps`（`step` 必填），但 Compact 以 `:step="item.step"` 覆盖推导 → `Omit<StepperItemProps, 'step'>`（消除类型/运行时不一致，同步 `sui api` 生成数据 en/zh）。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 8 能力 × 5 库对标表 + Cautions 6 条 + FAQ 6 组）。**遗留**：D3-04 浏览器 e2e（Tier 2 smoke 由 CI 覆盖，本轮以 happy-dom 单测 + axe 静态检查替代）；`stepperVariants` 8 槽全对齐无死键；`StepperCompact` 6 个 `*Props` 通道全部 v-bind 透传（无 C52 类连锁缺陷） | 11 → 32         |

> **批次 8 合计：** 1 个检查单元通过 D1–D7 全维度；单测 11 → 32 项（+21）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（stepper/separator 等导航族）全通过。批次 8 完结，后续按执行顺序进入下一检查项。

### 4.10 批次 9（P0 数据展示）— 2026-08-03

覆盖第 5 轮（P0 数据展示）的 `table`（C61），延续 D1–D7 全维度审计；本轮修复泛型布尔默认值类型卫生、筛选浮层硬编码英文本地化、样式 recipe 死键三处缺陷，并将单测从 29 项扩展到 36 项。

| 编号 | 组件    | 检查报告                                     | 缺陷修复（按严重度）                                                                                                                                                                                                                                               | 单测（前 → 后）                     |
| :--: | :------ | :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| C61  | `table` | [C61-table.md](./check-reports/C61-table.md) | **Minor ×3**（D1-08/D4-01/D5-01）：① **D4-01 类型卫生**——`table-compact.vue`/`table.vue` `withDefaults` 中 `multiple: true as unknown as M` 泛型布尔默认值双重断言违反「无 `as unknown as`」约束，且 vue-tsc 报 `Type 'M' is not assignable to InferDefault<..., M | undefined>`（`InferDefault`对泛型`M | undefined`仅接受函数形式）→ 改`multiple: () => true as M`（函数式默认，运行时语义不变）；② **D1-08/D2-11 本地化**——`table-filter-popover.vue` 筛选浮层 8 处硬编码英文文案（`filterSelected`/`filterKeywordActive`/`filterOptionsCount`/`filterNoOptions`/`filterEdit`/`filter`/`filterSearch`/`filterNoMatching`/`filterClear`/`filterSelect`/`filterSearchPlaceholder`）→ 新增 `LocaleTableMessages`11 键 + 13 语言包 +`interpolate` 插值；③ **D5-01 死键**——`styles/table.ts`6 个 size 变体`caption: 'py-_'` 槽位在组件模板中无对应渲染（死键永不生效）→ 删除。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 9 能力 × 5 库对标表 + Cautions 7 条 + FAQ 7 组）。**核查结论**：C42 同款缺省 Boolean cast 风险**不适用**（`multiple`经`useSelection`的`getVueBooleanCasting`归一化，且函数式默认已保留`true` 默认）；筛选浮层关闭/清除/无匹配空态均接 axe 检查通过；`data-soybean-table-_` 8 属性无冗余 | 29 → 36 |

> **批次 9 合计：** 1 个检查单元通过 D1–D7 全维度；单测 29 → 36 项（+7）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（table/stepper/date 等 1586/1586）全通过。批次 9 完结，后续按执行顺序进入下一检查项（C62 `tree`）。

### 4.11 批次 10（P0 数据展示）— 2026-08-03

覆盖第 5 轮（P0 数据展示）的 `tree`（C62），延续 D1–D7 全维度审计；本轮修复 propagateSelect 行为反转与对象混入、`aria-setsize`/`aria-posinset` 死数据、布尔默认值 cast、泛型 emit 类型卫生四处缺陷，并将单测从 2 项扩展到 32 项。

| 编号 | 组件   | 检查报告                                   | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 单测（前 → 后） |
| :--: | :----- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| C62  | `tree` | [C62-tree.md](./check-reports/C62-tree.md) | **Major ×2**：① **D1-08 行为反转 + 类型混入**——`tree-root.vue` `onSelect` 中 propagateSelect 分支：`exist` 在 `onSelectItem` 切换**之后**求值（点击未选中项→已选中→走删除分支；点击已选中项→未选中→走添加分支，propagate 行为完全反转），且 `flattenChildren` 返回节点对象被直接展开进字符串数组（`['1', {…}, {…}]`）→ 点击前捕获 `wasSelected` + `children.map(child => child.value)`；② **D1-08/D1-07 a11y 死数据**——`FlattenedItem.bind` 中静态计算的 `aria-setsize`/`aria-posinset` 从未绑定到 DOM（`tree-item.vue` 缺绑定，axe 列表项不可感知在树上下文中的位置/数量）→ 模板绑定 `currentItem?.bind['aria-setsize']`/`['aria-posinset']`。**Major ×1**（D1-12/D2-11 默认行为被覆盖，C55 同款）：`STreeVirtualizer`/`TreeVirtualizerRoot` 纯 `defineProps<T>()` 缺 `loop: true` 镜像，缺失 Boolean prop 被 cast 为 `false` 覆盖 headless `TreeRoot` 默认 → `withDefaults` 镜像 `loop: true`（含回归测试断言 `data-loop`）。**Minor ×2**（D4-01 类型卫生）：`tree-root.vue` 泛型 emit `@ts-expect-error` → `value as TreeRootEmits<TreeRootProps<T, U, M>['multiple']>['update:modelValue'][0]` 显式收窄（与 color-swatch-picker 同款但源类型更宽，需精确对齐 emit 参数类型）；`FlattenedItem.bind` `[key: string]: any` → 具名键类型。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 10 能力 × 4 库对标表 + Cautions 7 条 + FAQ 7 组）。**核查结论**：C42 同款缺省 Boolean cast 风险**已修复**（`STreeVirtualizer`/`TreeVirtualizerRoot` 补 `loop` 镜像，`tree.vue` 既有 `withDefaults({ loop: true })` 无风险）；`findValuesBetween` 基于 min/max 排序对称（prev/next 一致，非缺陷）；`data-soybean-tree-*` 属性无冗余 | 2 → 32          |

> **批次 10 合计：** 1 个检查单元通过 D1–D7 全维度；单测 2 → 32 项（+30）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（tree/tree-virtualizer/roving-focus/select/combobox 等 1616/1616）全通过。批次 10 完结，后续按执行顺序进入下一检查项（C63 `tree-menu`）。

### 4.12 批次 11（P1 数据展示）— 2026-08-03

覆盖第 5 轮（P1 数据展示）的 `tree-menu`（C63），延续 D1–D7 全维度审计；本轮修复共享组件 dropdown-menu 的 `popupId` 泄漏、操作菜单嵌套交互违规、禁用态未透传、折叠触发器 a11y 属性四类缺陷，本地化操作按钮 aria-label（13 语言包），清理样式死槽，并将单测从 6 项重写扩展到 25 项。

| 编号 | 组件        | 检查报告                                             | 缺陷修复（按严重度）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 单测（前 → 后） |
| :--: | :---------- | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| C63  | `tree-menu` | [C63-tree-menu.md](./check-reports/C63-tree-menu.md) | **Major ×1**（D7-01，共享组件缺陷）：`dropdown-menu-trigger.vue` `ariaControls` 计算属性返回 `popupId`（shallowRef 对象）而非 `popupId.value` → 展开时 DOM 渲染 `aria-controls="[object Object]"`（axe `aria-allowed-attr` 违规，影响全部 dropdown-menu 系）→ 补 `.value`。**Major ×1**（D1-08/D7-01 DOM 结构违规）：操作菜单 `DropdownMenuCompact` 由 `TreeMenuSlotCompact` 渲染在 `TreeMenuButton` **内部**（`itemAction` 绝对定位样式表明设计意图为按钮兄弟节点）→ 按钮套按钮触发 axe `nested-interactive` → 操作菜单移出按钮：叶子分支渲染为按钮兄弟节点、父项分支置于 `#extra` 插槽；同时移除 `slot-compact` 中操作菜单死代码与相关 import。**Major ×1**（D1-08 禁用态缺失）：`tree-menu-option-compact.vue` 三处 `TreeMenuButton`（叶子链接/叶子按钮/父项触发器）均未透传 `item.disabled` → 禁用叶节点无 `disabled`/`data-disabled`/`aria-disabled` 语义 → 补 `:disabled="item.disabled"`。**Minor ×1**（D7-01 a11y 属性）：折叠模式弹出菜单触发器为无 role 的 `<div>`（携带 `aria-expanded`/`aria-haspopup`）→ 补 `role="button"` + `aria-label`（axe `aria-allowed-attr` 违规）。**Minor ×1**（D1-12 测试时序）：`aria-controls` 由 content 组件 setup 中 `initContentId` 初始化，trigger 首帧渲染时 ID 未就绪 → spec 断言前补 `nextTick`。**本地化**（D2-11/D1-16）：操作按钮 aria-label 由硬编码 `Open ${label} actions` → `useLocaleMessages` 走 13 语言包 `treeMenu.openActions` 模板（`{label}` 占位符）。**样式死槽**（D1-09）：`styles/tree-menu.ts` 6 档 size 变体中的 `subButton`（自文件创建即存在、从未被消费）+ `types.ts` `TreeMenuUiSlot` 中 `subButton`/`subItem` 死槽 → 全部移除。**文档** en/zh 4 节 → 8 节 Recommended structure（含 Component family + 8 能力 × 4 库对标表 + Cautions 8 条 + FAQ 9 组） | 6 → 25          |

> **批次 11 合计：** 1 个检查单元通过 D1–D7 全维度；单测 6 → 25 项（+19）；`pnpm typecheck` / `pnpm lint` 全绿；族系回归（dropdown-menu/context-menu/menu/table/stepper 等 1636/1636）全通过。批次 11 完结，后续按执行顺序进入下一检查项（C64 `accordion`）。

---

## 五、组件文档质量检查标准

> 本节是单组件文档质量检查的**项目级标准**，整合了「参照主流组件库规范对单组件文档进行系统性优化与完善」这一任务的具体要求、执行标准与验收要点。规则权威源是 [surfaces.md -> Docs](../.agents/skills/soybean-ui-component-development/surfaces.md#docs)；评估方法论与检查项（D6-01～D6-15）见 [audit.md -> D6. Documentation](../.agents/skills/soybean-ui-component-development/audit.md#d6-documentation)。已落地的参考样本：[button.md](../apps/docs/src/docs/zh-CN/components/button.md)（含特性、组件系列、架构对标表、FAQ）。
>
> 对标库：Ant Design（`何时使用` + 代码演示 + API）、Element Plus（概述 + 代码演示 + API + 注意事项）、Material UI（intro + Demos + API）、Mantine（Overview + Features + Usage + API）、shadcn/ui（Usage + Examples + API Reference）。

### 5.1 任务要求

对单个组件的消费者文档（`apps/docs/src/docs/{en|zh-CN}/components/{component}.md`）进行系统性优化与完善，参照行业内主流组件库的组件描述规范与最佳实践，进行全面审查与改写，确保文档专业、完整、可读，并作为该组件消费者唯一的文档入口。

### 5.2 适用范围

- 所有已发布组件（88 个目录 / 110 个 S 前缀导出）的 zh-CN 与 en 文档。
- 新组件发布时按本标准一次性落地；已发布组件按 [docs/check.md -> 二、组件检查任务列表](#二组件检查任务列表按组件维度独立) 的优先级（P0 → P3）逐步对齐。
- 单组件文档优化纳入 D6 维度检查，与功能合规、API 设计、类型系统等维度并行验收。

### 5.3 文档结构标准

zh-CN 与 en 两份文档**必须共享同一章节顺序**，仅语言不同。完整结构（带 _(可选)_ 标记的章节仅在不适时可省略）：

| 顺序 | 章节                           | 渲染方式                                        |   必填   |
| :--: | :----------------------------- | :---------------------------------------------- | :------: |
|  1   | 顶级标题 `#`                   | 本地化组件名                                    |    ✅    |
|  2   | `## Overview` 概述             | 手写                                            |    ✅    |
|  3   | `## Usage` 用法                | `<UsageCode component="{component}" />`         |    ✅    |
|  4   | `## Features` 特性             | 手写                                            |    ✅    |
|  5   | `## Component family` 组件系列 | 手写                                            | _(可选)_ |
|  6   | `## Demos` 演示                | `<PlaygroundGallery component="{component}" />` |    ✅    |
|  7   | `## API`                       | `<ComponentApi component="{component}" />`      |    ✅    |
|  8   | `## Notes` 注意事项            | 手写                                            |    ✅    |
|  9   | `## FAQ` 常见问题              | 手写                                            |    ✅    |

### 5.4 各模块内容要求

| 模块              | 内容要求                                                                                                                                                                                                                                                                                                                        | 对标参考                                 |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| 功能说明（概述）  | ≤ 3 段/条，回答三个问题：① 一句话定位（是什么）；② 使用场景（何时用 / 何时不用 / 该优先哪个同级组件）；③ 与同类组件的关系（如「与 `form` 搭配」「路由导航优先 `SButtonLink`」）                                                                                                                                                 | Ant Design `何时使用`、Element Plus 概述 |
| 核心特性          | 4–8 条 bullet，每条一个能力，emoji 前缀；覆盖 variant/color/size/shape 数量、加载/链接/图标支持、a11y、TS 类型安全，以及标志性能力（`as`/`asChild` 多态、`ui` 覆盖、`Compact` 聚合）；**不**逐条复述 API 表                                                                                                                     | Mantine Features、shadcn/ui              |
| 基础用法          | `<UsageCode>` 渲染；背后示例须 ≤ 10 行最小可运行片段，展示最常用 API；**不**手写 fenced code                                                                                                                                                                                                                                    | 所有主流库的 quick start                 |
| 高级用法          | 由 `## Demos` 的 `<PlaygroundGallery>` 承载；playground 示例须 basic → advanced 递进：`basic` → `size`/`color`/`disabled` → 进阶（异步加载、虚拟滚动、自定义插槽、键盘导航等）；**不**在文档内手写示例代码                                                                                                                      | Ant Design/Mantine Examples              |
| API 参数说明      | `<ComponentApi>` 渲染**生成数据**，权威覆盖 props/events/slots 的**类型定义、默认值、必填项标识**；**不**手写 prop/event/slot 表；仅在生成数据无法覆盖特殊页面时才手写 `DataTable`/`TypeTable`；公开 API 或类型描述变更后须 `pnpm sui api`，非英文 locale 须 `pnpm sui api-translate -- --locale <locale>`                      | Material UI API、Mantine API             |
| 组件系列 _(可选)_ | 仅当组件导出多个 `S` 前缀成员时提供；每条 bullet 列出一个导出 + 一行角色说明（如 `SButton` - 基础按钮；`SButtonLink` - 路由感知链接按钮）                                                                                                                                                                                       | Ant Design 组件家族                      |
| 注意事项          | 至少包含：① **架构与对标差异**——表格或短文对比 SoybeanUI 与 Ant Design/Element Plus/MUI/Mantine/Naive UI/shadcn/ui，点明 headless/styled 分离、`ui` 覆盖、`as`/`asChild`、`Compact` 聚合或任何刻意偏离及理由（如「无 `block` 属性——UnoCSS `w-full` 已覆盖」）；② **运行约束**——SSR、portal/z-index、受控/非受控陷阱等用户易错点 | Element Plus 注意事项                    |
| 常见问题          | 3–6 个问答对，覆盖用户最常问的问题（如「如何占满宽度？」「为何保留 `aria-disabled`？」「如何渲染为链接？」）；答案尽量回链相关 prop/slot/demo                                                                                                                                                                                   | Ant Design/Element Plus FAQ              |

### 5.5 执行流程

1. **审查现状**：读取目标组件的 zh-CN 与 en 文档、playground 示例清单、生成 API 数据，对照 5.3/5.4 列出差距清单。
2. **改写文档**：按结构标准与内容要求重写两份文档；`Usage`/`Demos`/`API` 一律用渲染组件，**不**手写示例代码或 API 表。
3. **同步 playground**：若基础/高级用法缺失，先补 `apps/playground/src/examples/{component}/` 示例（遵循 [surfaces.md -> Playground](../.agents/skills/soybean-ui-component-development/surfaces.md#playground) 命名与质量要求），再回链到文档。
4. **同步生成数据**：公开 API 或类型描述变更后运行 `pnpm sui api`，非英文 locale 运行 `pnpm sui api-translate -- --locale <locale>`；changelog 映射变更运行 `pnpm sui changelog` 及 `pnpm sui changelog-translate -- --locale <locale>`。
5. **同步菜单**：更新 `apps/docs/src/constants/menus.ts`，按字母序插入对应分组。
6. **自检**：对照 5.6 验收要点逐项核对。

### 5.6 验收要点

文档质量检查纳入 D6 维度，验收映射如下（检查项标准与验收条件见 [audit.md -> D6](../.agents/skills/soybean-ui-component-development/audit.md#d6-documentation)）：

| 验收要点                     | 检查项 | 验收条件                                           |
| :--------------------------- | :----- | :------------------------------------------------- |
| zh/en 结构一致               | D6-01  | 文档结构 diff 为空                                 |
| 完整章节结构                 | D6-02  | 非可选章节全部存在且顺序正确                       |
| 概述含定位/使用场景/同级关系 | D6-03  | 评审通过                                           |
| 基础用法为最小可运行示例     | D6-04  | ≤ 10 行，展示最常用 API                            |
| playground 覆盖主要公开能力  | D6-05  | 文件清单审查                                       |
| playground 命名规范          | D6-06  | `NN-name.vue`，`name` 准确描述能力                 |
| API 生成数据                 | D6-07  | `generated/api/` 无手编辑                          |
| changelog 生成数据           | D6-08  | `generated/changelog/` 无手编辑                    |
| 菜单注册                     | D6-09  | `menus.ts` camelCase key 按字母序入正确分组        |
| 注意事项章节                 | D6-10  | 含架构/对标差异 + ≥ 1 条运行约束                   |
| 对标差异表                   | D6-11  | 与 6 大对标库的对比表/短文 + 偏离理由              |
| 链接完整                     | D6-12  | 链接检查通过                                       |
| 核心特性章节                 | D6-13  | 4–8 条 emoji bullet，覆盖标志性能力，不复述 API 表 |
| 基础→高级用法递进            | D6-14  | demos 按 basic → 进阶递进                          |
| FAQ 内容                     | D6-15  | 3–6 个问答对，回链相关 prop/slot/demo              |

**最低验收门槛**：D6-01/D6-02/D6-07/D6-08 必须通过（Blocker）；D6-03/D6-10/D6-11/D6-13/D6-14/D6-15 须达到「评审通过」（Major，未通过不得标记该组件 D6 为 ✅）；D6-04/D6-05/D6-06/D6-09/D6-12 为 Minor，需在下一轮内修复。

---

## 六、关联文档

- [audit.md](../.agents/skills/soybean-ui-component-development/audit.md) — **评估方法论单一源**（7 维度 105 检查项、严重度、验收状态、单组件验收、跨组件一致性回归、全量回归、对标库选型、WAI-ARIA APG 参考、对标库链接）
- [SKILL.md](../.agents/skills/soybean-ui-component-development/SKILL.md) — 功能合规基线、模式分类、阶段顺序、工作流、guardrails
- [layers.md](../.agents/skills/soybean-ui-component-development/layers.md) — headless/UI 层规则 + A11y/RTL
- [surfaces.md](../.agents/skills/soybean-ui-component-development/surfaces.md) — playground/docs/tests 交付面规则
- [e2e.md](../.agents/skills/soybean-ui-component-development/e2e.md) — 浏览器 e2e 测试规则（D7-19/D7-20 的标准来源）
- [process.md](../.agents/skills/soybean-ui-component-development/process.md) — finish 检查清单 + commit 规范
- [EXAMPLES.md](../.agents/skills/soybean-ui-component-development/EXAMPLES.md) — 触发技能的请求模式（含 audit 请求模式）
- [roadmap.md](./roadmap.md) — 未实现组件路线图（46 个活跃 + 12 个延后至市场 + 60+ 范围外）
- [components.md](./components.md) — 路线图源文档
- `typescript-functional-style`（全局 skill，位于 `~/.agents/skills/`） — TS 函数式风格
- `vue-sfc-structure`（全局 skill，位于 `~/.agents/skills/`） — Vue SFC 结构规范

---

_本项目快照覆盖 88 个已发布组件 × 7 大维度 × 105 个检查项（方法论见 audit.md）。最后更新：2026-08-03。执行时按「执行顺序建议」推进（批次进度与记录见 [四、组件检查执行记录](#四组件检查执行记录)），每轮完成后执行跨组件一致性回归，全部完成后执行全量回归。_
