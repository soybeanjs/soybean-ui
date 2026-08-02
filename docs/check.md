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
| C03  | `icon`            | 单类           | ✅  | ✅  | ⚠️  | ✅  | ✅  | ✅  | ✅  |   P1   | D1-15, D2-02, D3-08                             |
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
| C27  | `input`             | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-09, D2-11, D3-01, D7-05                      |
| C28  | `textarea`          | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-09, D2-11, D3-01, D7-05                      |
| C29  | `input-number`      | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-09, D2-11, D3-01, D3-08                      |
| C30  | `input-otp`         | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-16, D2-11, D7-05                             |
| C31  | `password`          | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-09, D2-11, D3-01, D7-05                      |
| C32  | `select`            | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-04, D2-11, D3-04, D7-01, D7-19, D7-20 |
| C33  | `combobox`          | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-04, D2-11, D3-04, D7-01               |
| C34  | `autocomplete`      | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-04, D2-11, D3-04, D7-01               |
| C35  | `cascader`          | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04, D7-01                      |
| C36  | `checkbox`          | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-08, D2-11, D3-04, D7-05                      |
| C37  | `checkbox-group`    | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04, D7-05                      |
| C38  | `radio-group`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04, D7-05                      |
| C39  | `switch`            | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-08, D2-11, D3-01, D7-05                      |
| C40  | `slider`            | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-16, D2-11, D7-05                             |
| C41  | `toggle`            | 单类           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-08, D2-11, D3-01                             |
| C42  | `toggle-group`      | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-08, D2-11, D3-04                             |
| C43  | `segment`           | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-08, D2-11, D3-04                             |
| C44  | `date-field`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04, D7-09                      |
| C45  | `date-picker`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04, D7-09                      |
| C46  | `date-range-field`  | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04, D7-09                      |
| C47  | `date-range-picker` | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04, D7-09                      |
| C48  | `time-field`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04                             |
| C49  | `time-range-field`  | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04                             |
| C50  | `calendar`          | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-16, D2-11, D7-09                      |
| C51  | `calendar-range`    | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-16, D2-11, D7-09                      |
| C52  | `tags-input`        | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-09, D2-11, D3-04                             |
| C53  | `form`              | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-11, D3-04, D7-10                      |
| C54  | `editable`          | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D2-11, D3-04                             |
| C55  | `stepper`           | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D2-11, D3-04                             |
| C90  | `rating`            | 单类           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-08, D2-11, D3-01, D7-05                      |

#### 2.3.5 数据展示 (Data Display) — 14 个

| 编号 | 组件          | 模式           | D1  | D2  | D3  | D4  | D5  | D6  | D7  | 优先级 | 重点检查项                               |
| :--: | :------------ | :------------- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :----: | :--------------------------------------- |
| C56  | `avatar`      | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D2-02, D3-01                      |
| C57  | `badge`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-12, D2-11, D3-01                      |
| C58  | `tag`         | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-09, D2-11, D3-01                      |
| C59  | `card`        | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-12, D2-11, D3-12                      |
| C60  | `list`        | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P2   | D1-09, D2-04, D7-01                      |
| C61  | `table`       | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-12, D2-04, D2-11, D3-04, D7-01, D7-02 |
| C62  | `tree`        | 多槽           | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P0   | D1-16, D2-04, D2-11, D3-04, D7-01        |
| C63  | `tree-menu`   | 多槽 + Compact | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  | ⏳  |   P1   | D1-12, D1-16, D2-11, D7-01               |
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

1. **第 1 轮（P0 表单核心）：** C27 `input`、C28 `textarea`、C29 `input-number`、C31 `password`、C36/C37 `checkbox`、C38 `radio-group`、C39 `switch` — 共 8 项
2. **第 2 轮（P0 选择器）：** C32 `select`、C33 `combobox`、C34 `autocomplete`、C35 `cascader` — 共 4 项
3. **第 3 轮（P0 日期时间）：** C44-C49（6 项 `*-field`/`*-picker`）
4. **第 4 轮（P0 表单聚合）：** C53 `form`
5. **第 5 轮（P0 数据展示）：** C61 `table`、C62 `tree`
6. **第 6 轮（P0 浮层）：** C71 `toast`、C72 `dialog`、C73 `drawer`、C74 `popover`、C75 `popconfirm`、C78 `dropdown-menu`、C81 `tooltip`
7. **第 7 轮（P1 通用基础）：** C01-C04、C14（5 项）
8. **第 8 轮（P1 导航）：** C20、C22、C24-C26（4 项）
9. **第 9 轮（P1 表单补充）：** C30、C40-C43、C52、C54、C55（8 项）
10. **第 10 轮（P1 数据展示）：** C56、C58、C61（已 6 轮）→ C64、C66、C69（4 项）
11. **第 11 轮（P1 浮层补充）：** C76、C77、C79-C82、C89（7 项）
12. **第 12 轮（P2 剩余）：** 其余 P2 组件
13. **第 13 轮（P3 剩余）：** 其余 P3 组件

---

## 四、组件文档质量检查标准

> 本节是单组件文档质量检查的**项目级标准**，整合了「参照主流组件库规范对单组件文档进行系统性优化与完善」这一任务的具体要求、执行标准与验收要点。规则权威源是 [surfaces.md -> Docs](../.agents/skills/soybean-ui-component-development/surfaces.md#docs)；评估方法论与检查项（D6-01～D6-15）见 [audit.md -> D6. Documentation](../.agents/skills/soybean-ui-component-development/audit.md#d6-documentation)。已落地的参考样本：[button.md](../apps/docs/src/docs/zh-CN/components/button.md)（含特性、组件系列、架构对标表、FAQ）。
>
> 对标库：Ant Design（`何时使用` + 代码演示 + API）、Element Plus（概述 + 代码演示 + API + 注意事项）、Material UI（intro + Demos + API）、Mantine（Overview + Features + Usage + API）、shadcn/ui（Usage + Examples + API Reference）。

### 4.1 任务要求

对单个组件的消费者文档（`apps/docs/src/docs/{en|zh-CN}/components/{component}.md`）进行系统性优化与完善，参照行业内主流组件库的组件描述规范与最佳实践，进行全面审查与改写，确保文档专业、完整、可读，并作为该组件消费者唯一的文档入口。

### 4.2 适用范围

- 所有已发布组件（88 个目录 / 110 个 S 前缀导出）的 zh-CN 与 en 文档。
- 新组件发布时按本标准一次性落地；已发布组件按 [docs/check.md -> 二、组件检查任务列表](#二组件检查任务列表按组件维度独立) 的优先级（P0 → P3）逐步对齐。
- 单组件文档优化纳入 D6 维度检查，与功能合规、API 设计、类型系统等维度并行验收。

### 4.3 文档结构标准

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

### 4.4 各模块内容要求

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

### 4.5 执行流程

1. **审查现状**：读取目标组件的 zh-CN 与 en 文档、playground 示例清单、生成 API 数据，对照 4.3/4.4 列出差距清单。
2. **改写文档**：按结构标准与内容要求重写两份文档；`Usage`/`Demos`/`API` 一律用渲染组件，**不**手写示例代码或 API 表。
3. **同步 playground**：若基础/高级用法缺失，先补 `apps/playground/src/examples/{component}/` 示例（遵循 [surfaces.md -> Playground](../.agents/skills/soybean-ui-component-development/surfaces.md#playground) 命名与质量要求），再回链到文档。
4. **同步生成数据**：公开 API 或类型描述变更后运行 `pnpm sui api`，非英文 locale 运行 `pnpm sui api-translate -- --locale <locale>`；changelog 映射变更运行 `pnpm sui changelog` 及 `pnpm sui changelog-translate -- --locale <locale>`。
5. **同步菜单**：更新 `apps/docs/src/constants/menus.ts`，按字母序插入对应分组。
6. **自检**：对照 4.6 验收要点逐项核对。

### 4.6 验收要点

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

## 五、关联文档

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

_本项目快照覆盖 88 个已发布组件 × 7 大维度 × 105 个检查项（方法论见 audit.md）。最后更新：2026-08-02。执行时按「执行顺序建议」推进，每轮完成后执行跨组件一致性回归，全部完成后执行全量回归。_
