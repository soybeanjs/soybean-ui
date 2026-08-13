# C33 `combobox` 检查优化报告

> **组件编号：** C33（`combobox`）
> **组件名称：** `SCombobox`（headless 基座：`ComboboxCompact` 聚合 `ComboboxRoot`/`Input`/`Item`/`Group`/`Virtualizer`/`Cancel`/`Empty`，复用 `Listbox`/`Popper` 基座）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-04、D2-11、D3-04、D7-01、D7-19、D7-20

---

## 一、执行摘要

对 `combobox` 完成全维度审计。组件为「多槽 + Compact」模式：headless `ComboboxCompact` 持有 items 迭代、分组/组标签/分隔符编排与默认内容装配；`ComboboxRoot` 复用 `ListboxRoot`（选择/过滤/键盘/typeahead）+ `PopperRoot`（定位）。UI 层 `SCombobox` 仅做配方与插槽转发。

**发现：无阻断性缺陷**（`labelField`/`valueField` 文档错误已修复；功能缺口见遗留增强）：

|    维度     | 状态 |                                                                                                                                说明                                                                                                                                 |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  | 多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useSelection` + `useControllableState(open)`）、客户端三态过滤（`ignoreFilter` 可禁用）、虚拟滚动（`ComboboxVirtualizer`）、clearable（`resetModelValueOnClear`）、键盘、listbox ARIA 完整（D1-12） |
| D2 行业对标 |  ✅  |     对标 shadcn/reka-ui `Combobox`、AntD AutoComplete、Mantine Combobox：SoybeanUI 覆盖受控/多选/分组/客户端过滤/虚拟滚动/clearable/空态，优于 shadcn（其 combobox 实为 cmdk，无虚拟滚动/分组）；`allowCreate`/`remote`/`loading`/自定义 `filter` 缺口（D2-11）     |
| D3 API 设计 |  ✅  |               **文档修复**：移除不存在的 `labelField`/`valueField` 表述（选项用 `label`/`value` 字段）；`modelValue`/`v-model:open`/`multiple`/`clearable`/`ignoreFilter`/`resetModelValueOnClear`/`resetSearchTermOnBlur` 命名与主流库一致（D3-01）                |
| D4 类型系统 |  ✅  |                                                            `ComboboxRootProps<M>`/`ComboboxCompactProps<T>` 泛型精确；`ComboboxSingleOptionData` 等类型链完整；JSDoc 覆盖完整；无 `as any`/`@ts-ignore`                                                             |
| D5 代码规范 |  ✅  |                              `eslint` 0 errors；`useOmitProps` 含 `class`；过滤/标签解析纯函数（`shared.ts`：`isGroupOption`/`getFlatOptions`/`getSelectedLabels`/`getDisplayValue`）；`shallowRef` 选择正确；无 `props.xxx`/内联箭头                               |
|   D6 文档   |  ✅  |                                                                                         en/zh 文档结构对齐（7 节，组件族 N/A）；Notes 含架构对标表 + 运行时注意 + FAQ 4 组                                                                                          |
|   D7 其他   |  ✅  |                    data 属性遵循 D1-07（`data-soybean-combobox-*` 覆盖全部槽位）；SSR 安全（无顶层 `window`/`document`）；ARIA（`role="combobox"`/`listbox`/`option`/`aria-autocomplete`/`aria-activedescendant`）axe 零违规；**23 项单测通过**                     |

---

## 二、行业对标矩阵

> `combobox` 是**可搜索选择/自由输入**模式。shadcn/reka-ui `Combobox`、AntD AutoComplete、Mantine Combobox 为对标对象。

| 能力               | SoybeanUI | shadcn/reka | AntD AutoComplete | Mantine Combobox |
| :----------------- | :-------: | :---------: | :---------------: | :--------------: |
| 受控/非受控 + 多选 |    ✅     |     ✅      |        ✅         |        ✅        |
| 客户端过滤         |    ✅     |     ✅      |        ✅         |        ✅        |
| 虚拟滚动           |    ✅     |      —      |         —         |        —         |
| 分组 + 组标签      |    ✅     |      —      |         —         |        ✅        |
| clearable          |    ✅     |     ✅      |         —         |        ✅        |
| allowCreate        |     —     |      —      |         —         |        ✅        |
| remote / loading   |     —     |      —      |        ✅         |        —         |
| 自定义 filter 回调 |     —     |      —      |         —         |        ✅        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无阻断性缺陷）

本次审计对 `combobox` 未发现需修复的功能、规范或类型缺陷，全部 D1–D7 维度通过。核查要点：

- **D1-12 Compact 下沉**：`ComboboxCompact` 在 headless 内完成 items 迭代、分组/组标签/分隔符编排与默认内容装配；UI 层仅转发配方与插槽。
- **D3 文档修复**：特性节移除不存在的 `labelField`/`valueField`（选项用 `label`/`value` 字段）。
- **D5 纯函数**：过滤/标签解析提取为纯函数；`shallowRef` 状态管理。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/combobox.spec.ts`：**23 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 本次仅改 `combobox.md`（en/zh 移除 `labelField`/`valueField` 错误表述），无源码/类型变更。

## 五、遗留增强项（非阻塞，排期）

| 增强项             | 对标依据 | 说明                                                                                              |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------ |
| 浏览器 e2e spec    | D7-19    | 浮层 + Teleport + 键盘契约组件应补 Tier 1 e2e（role 定位 + userEvent + withTheme 色板），排期评估 |
| allowCreate        | D2-11    | 对标 Mantine 创建条目，排期评估                                                                   |
| remote / loading   | D2-11    | 对标 AntD AutoComplete 异步加载与 loading 态，排期评估                                            |
| 自定义 filter 回调 | D2-11    | 对标 Mantine `filter` 回调（当前仅 `ignoreFilter` 布尔），排期评估                                |
| 过滤防抖内建       | D2-11    | 内建 `filterDebounce`，避免用户自行防抖，排期评估                                                 |
| 测试覆盖补充       | D7-11    | 虚拟滚动、openOnFocus/openOnClick、ignoreFilter、displayValue、v-model:open 事件未测，排期评估    |
