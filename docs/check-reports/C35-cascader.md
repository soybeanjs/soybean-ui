# C35 `cascader` 检查优化报告

> **组件编号：** C35（`cascader`）
> **组件名称：** `SCascader`（headless 基座：`CascaderCompact` 聚合 `CascaderRoot`/`Trigger`/`Content`/`Menu`/`Option`/`Value`/`Tag`/`Search`，自研 `useCascaderData` 引擎）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-01、D7-19、D7-20

---

## 一、执行摘要

对 `cascader` 完成全维度审计。组件为「多槽 + Compact」模式：headless 自研数据引擎 `useCascaderData` 承担全部业务（树构建、多列菜单、级联勾选、懒加载、远程搜索、搜索模式、键盘导航），纯函数抽到 `shared.ts`；`CascaderCompact` 在 headless 内完成 items 迭代与结构编排。UI 层 `SCascader` 仅做配方与插槽转发。

**发现 Major ×1（已修复）**——单选模式下 `aria-selected`/`data-state` 不反映选择态：

|    维度     | 状态 |                                                                                                                                                                                   说明                                                                                                                                                                                   |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                       多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控、多级数据（`fieldKeys`）、单选/多选（`checkStrictly`/`showCheckedStrategy`）、搜索（`filterable`/`remote`+`onSearch` 防抖）、仅末级可选、`pathMode`、键盘（Arrow 跨列/Enter）、tree ARIA 完整                                                        |
| D2 行业对标 |  ✅  |                                                                                           对标 AntD/Element Plus `Cascader`：多列面板、级联复选 + 半选、懒加载/远程搜索、`showCheckedStrategy`、`pathMode`、虚拟滚动、headless 分离、locale、打开态 axe 零违规均覆盖（D2-11）                                                                                            |
| D3 API 设计 |  ✅  |                                                                          `modelValue`/`multiple`/`clearable`/`filterable`/`checkStrictly`/`pathMode`/`separator`/`expandTrigger`/`virtualScroll`/`dir` 命名与主流库一致；事件 `update:modelValue`/`update:open`/`change`/`clear`/`loaded` 完整                                                                           |
| D4 类型系统 |  ✅  |                                                                      泛型 `T/M/P` 精确推导 `CascaderValue<T,M,P>`（`M=false,P=false→T`、`P=true→T[]`、`M=true,P=true→T[][]`）；`expandTrigger`/`showCheckedStrategy` 字面量联合；泛型 Boolean 用 `getVueBooleanCasting` 规避裸属性陷阱；JSDoc 完整                                                                       |
| D5 代码规范 |  ✅  |                                                                  `eslint` 0 errors；`useOmitProps` 含 `class`；树构建/扁平/路径纯函数（`shared.ts`：`buildCascaderNodes`/`flattenCascaderNodes`/`findCascaderNodeByPath`）；`shallowReactive` 节点；异步路径 try/finally + `onWatcherCleanup` 清定时器                                                                   |
|   D6 文档   |  ✅  |                                                                                                              en/zh 文档结构对齐（8 节，组件族 N/A）；Notes 含架构对标表 + 运行时注意 + FAQ 4 组；playground 9 示例（含懒加载/远程/虚拟滚动/自定义 option）                                                                                                               |
|   D7 其他   |  ✅  | **Major 修复**：单选模式下选中 `treeitem` 的 `aria-selected`/`data-state` 由 `isChecked`（多选 checkbox）改为同时反映 `isSelected`（单选），屏幕阅读器可获知单选项已选中（WCAG 4.1.2）；data 属性遵循 D1-07（`data-soybean-cascader-*`）；SSR 安全（`useId`）；ARIA（`role="combobox"`/`tree`/`treeitem`）axe 零违规；**22 项单测通过**（含新增单选 aria-selected 测试） |

---

## 二、行业对标矩阵

> `cascader` 是**级联选择**模式（树形/多列/路径模型）。AntD/Element Plus `Cascader` 为对标对象。

| 能力                  | SoybeanUI | AntD `Cascader` | Element Plus `Cascader` |
| :-------------------- | :-------: | :-------------: | :---------------------: |
| 多列面板              |    ✅     |       ✅        |           ✅            |
| 级联复选 + 半选       |    ✅     |       ✅        |           ✅            |
| 懒加载 / 远程搜索     |    ✅     |       ✅        |           ✅            |
| `showCheckedStrategy` |    ✅     |       ✅        |           ✅            |
| `pathMode`            |    ✅     |       ✅        |            —            |
| 虚拟滚动              |    ✅     |       ✅        |            —            |
| `changeOnSelect`      |     —     |       ✅        |            —            |
| `showAllLevels`       |     —     |       ✅        |            —            |
| `maxTagCount`         |     —     |       ✅        |            —            |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — 单选 `aria-selected`/`data-state` 不反映选择态（D7）

**现象：** [cascader-option.vue](../../packages/headless/src/components/cascader/cascader-option.vue) 的 `aria-selected` 与 `data-state` 使用 `isChecked`（仅多选 checkbox 标志）。单选模式选择节点只设置 `singleSelectedNode`、从不置 `node.checked`，故单选选中的 `treeitem` 的 `aria-selected` 恒为 false、`data-state="unchecked"`——屏幕阅读器无法获知单选项已选中（WCAG 4.1.2）。而 `data-selected` 已正确使用 `isSelected`，说明属绑定遗漏。

**修复：** `data-state` 增加 `isSelected` 分支（选中 → `'selected'`）；`aria-selected` 改为 `(isSelected(node) || isChecked(node)) || undefined`，使单选与多选均反映选择态。新增单测断言单选叶子 `aria-selected="true"`/`data-state="selected"`/`data-selected`。重跑 22 项全部通过。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 下沉**：`CascaderCompact` 在 headless 内完成 items 迭代与结构编排；UI 层仅转发配方与插槽（wrapper 无 `v-for`）。
- **D2-11 对标**：`changeOnSelect`/`showAllLevels`/`maxTagCount` 未实现（搜索模式点击非叶子仅高亮不切多列路径为记录在案的设计取舍），列为遗留增强项。
- **D7-19**：无 browser e2e spec（浮层 + 键盘契约组件），列为遗留增强项。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/cascader.spec.ts`：**22 项全部通过**（新增单选 aria-selected 测试）。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 改动：`cascader-option.vue`（data-state/aria-selected 修复）、`cascader.spec.ts`（+1 测试）。

## 五、遗留增强项（非阻塞，排期）

| 增强项           | 对标依据 | 说明                                         |
| :--------------- | :------- | :------------------------------------------- |
| `changeOnSelect` | D2-11    | 对标 AntD 允许选中中间节点，排期评估         |
| `showAllLevels`  | D2-11    | 对标 AntD trigger 内显示完整路径，排期评估   |
| `maxTagCount`    | D2-11    | 对标 AntD 多选 tag 溢出折叠，排期评估        |
| 浏览器 e2e spec  | D7-19    | 浮层 + 键盘契约 + 多列导航应补 e2e，排期评估 |
