# C34 `autocomplete` 检查优化报告

> **组件编号：** C34（`autocomplete`）
> **组件名称：** `SAutocomplete`（headless 基座：`AutocompleteCompact` 聚合 `AutocompleteRoot`/`Input`，复用 `Listbox`/`Popper`/`Combobox` 基座 + Fuse 模糊过滤）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-04、D2-11、D3-04、D7-01、D7-19、D7-20

---

## 一、执行摘要

对 `autocomplete` 完成全维度审计。组件为「多槽 + Compact」模式：headless `AutocompleteCompact` 持有 items 迭代、`useFuse` 模糊过滤、分组展开/还原、空态与清空；`AutocompleteRoot` 复用 `ListboxRoot`（选择/高亮/键盘/typeahead）+ `PopperRoot`，通过 `provideComboboxRootContext` 注入 combobox 状态。UI 层 `SAutocomplete` 仅做配方与插槽转发。

**发现 P1 ×1（已修复）**——`resetModelValueOnClear` 契约缺失：

|    维度     | 状态 |                                                                                                                                 说明                                                                                                                                  |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                多槽 + Compact 正确：Compact 聚合下沉至 headless（items 迭代 + Fuse 过滤 + 分组 + 空态）；受控/非受控（`useControllableState`）、`openOnFocus`/`openOnClick`、过滤、键盘（Arrow/Home/End/Enter/Space/typeahead/Esc）、listbox ARIA 完整                |
| D2 行业对标 |  ✅  | 对标 reka-ui `Combobox`/Algolia Autocomplete/AntD AutoComplete/Element Plus：SoybeanUI 覆盖输入即过滤 + Fuse 模糊、combobox/listbox 角色、键盘 + typeahead、分组、`openOnFocus`/`openOnClick`、清空 + 空态；`remote`/`loading`/自定义 `filter`/虚拟滚动缺口（D2-11）  |
| D3 API 设计 |  ✅  | **P1 修复**：`resetModelValueOnClear` 由硬编码 `true` 暴露为受控 prop（与 combobox 对齐），文档契约与实现一致；`modelValue`/`v-model:open`/`clearable`/`openOnFocus`/`openOnClick` 命名与主流库一致；事件 `update:modelValue`/`update:open`/`select`/`highlight` 清晰 |
| D4 类型系统 |  ✅  |                                        `AutocompleteRootProps`/`CompactProps<T>`/`Emits<T>`/`Slots<T>` 泛型化精确；`AutocompleteSingleOptionData`/`GroupOptionData`/`SearchOptionData` 类型链完整；JSDoc 覆盖完整；无类型逃逸                                         |
| D5 代码规范 |  ✅  |                          `eslint` 0 errors；`useOmitProps` 含 `class`；过滤/分组纯函数（`shared.ts`：`isGroupOption`/`getAutocompleteSearchOptions`/`getAutocompleteItemOptions`）；`resetSearchTermTimer` 卸载清理；无 `props.xxx`/内联箭头                          |
|   D6 文档   |  ✅  |                                                                en/zh 文档结构对齐（7 节，组件族 N/A）；Notes 含架构对标表 + 运行时注意 + FAQ 4 组；`resetModelValueOnClear` 表述与实现一致（P1 修复）                                                                 |
|   D7 其他   |  ✅  |                      data 属性遵循 D1-07（`data-soybean-autocomplete-*`）；SSR 安全（无顶层 `window`/`document`）；ARIA（`role="combobox"`/`listbox`/`option`/`aria-activedescendant`/`aria-autocomplete="list"`）axe 零违规；**21 项单测通过**                       |

---

## 二、行业对标矩阵

> `autocomplete` 是**输入即搜索建议**模式。reka-ui Combobox、Algolia Autocomplete、AntD AutoComplete、Element Plus 为对标对象。

| 能力                   | SoybeanUI | reka-ui | AntD AutoComplete | Element Plus |
| :--------------------- | :-------: | :-----: | :---------------: | :----------: |
| 输入即过滤 + Fuse 模糊 |    ✅     |   ✅    |        ✅         |      ✅      |
| combobox/listbox 角色  |    ✅     |   ✅    |        ✅         |      ✅      |
| 键盘 + typeahead       |    ✅     |   ✅    |        ✅         |      ✅      |
| 分组                   |    ✅     |   ✅    |         —         |      —       |
| `openOnFocus`/`Click`  |    ✅     |   ✅    |        ✅         |      ✅      |
| 清空 + 空态            |    ✅     |   ✅    |         —         |      —       |
| remote / loading       |     —     |    —    |        ✅         |      ✅      |
| 自定义 filter 回调     |     —     |    —    |         —         |      —       |
| 虚拟滚动               |     —     |    —    |        ✅         |      —       |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 P1 — `resetModelValueOnClear` 契约缺失（D3/D6）

**现象：** 文档声称 `resetModelValueOnClear` 是用户可配置行为（决定清除时是否发空 `modelValue` 还是仅重置搜索词），但该 prop 并未暴露——`autocomplete-root.vue` 硬编码 `computed(() => true)`，清空永远发 `['']`。

**修复：** 在 `AutocompleteRootProps` 新增 `resetModelValueOnClear?: boolean`（`@defaultValue true`），`withDefaults` 默认 `true`，`resetModelValueOnClear` computed 改为 `() => props.resetModelValueOnClear ?? true`，并从 `useOmitProps` 排除（不作为 attr 透传）。与 combobox 的对应 prop 语义对齐。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 下沉**：`AutocompleteCompact` 在 headless 内完成 items 迭代 + Fuse 过滤 + 分组 + 空态；UI 层仅转发配方与插槽（wrapper 无 `v-for`）。
- **D2-11 对标**：`remote`/`loading`/自定义 `filter`/虚拟滚动未实现，列为遗留增强项。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/autocomplete.spec.ts`：**21 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 改动：`autocomplete/types.ts`（+`resetModelValueOnClear`）、`autocomplete-root.vue`（暴露 prop + omit）、`autocomplete.md`（en/zh 移除 `labelField` 错误表述）。

## 五、遗留增强项（非阻塞，排期）

| 增强项               | 对标依据 | 说明                                                                     |
| :------------------- | :------- | :----------------------------------------------------------------------- |
| 浏览器 e2e spec      | D7-19    | 依赖 Teleport/真实 focus-blur 圈闭/键盘契约/颜色对比，应补 e2e，排期评估 |
| remote / loading     | D2-11    | 对标 AntD/Element Plus 异步加载与 loading 态，排期评估                   |
| 自定义 filter 回调   | D2-11    | 对标 Mantine `filter` 回调，排期评估                                     |
| 虚拟滚动             | D7-01    | 大列表复用 `ComboboxVirtualizer`（`isVirtual` 分支已就位），排期评估     |
| 文档补「组件家族」节 | D6-02    | 说明与 `SCombobox`/`SSelect`/`SAutocomplete` 的关系，排期评估            |
