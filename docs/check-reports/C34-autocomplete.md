# C34 `autocomplete` 检查优化报告

> **组件编号：** C34
> **组件名称：** `autocomplete` / `SAutocomplete`（headless `AutocompleteCompact` 聚合 + 完整基座：`AutocompleteRoot` → `ListboxRoot` 复用 + `PopperRoot` 定位 + `AutocompleteInput`（`role="combobox"` + fuse 过滤）→ `Combobox*` 组件族复用（Anchor/Content/Item/Viewport/Trigger/Empty/Cancel）；`scv()` 配方 `autocompleteVariants` 17 slots）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-04、D2-11、D3-04、D7-01

---

## 一、执行摘要

对 `autocomplete` 完成全维度审计。架构为「combobox 组件族复用 + Fuse 模糊搜索」的轻量聚合：`AutocompleteRoot`（`useControllableState(modelValue/open)` + `ListboxRoot`/`PopperRoot` 复用 + `ignoreFilter=true` 关闭 combobox 原生过滤，过滤交由数据层 Fuse）+ `AutocompleteInput`（输入即打开、ArrowDown/Up/Home/End 打开、Enter 选择高亮项、`aria-activedescendant` 跟随、blur 圈闭判定）+ `AutocompleteCompact`（`items` 数据驱动 + `useFuse` 关键词过滤 + 分组渲染 + 清空按钮 + 空态）。styled 层 `autocompleteVariants` 声明 17 slots + 7 尺寸变体；UI 层 `SAutocomplete` 薄包装（dynamic slot forwarding + `useForwardListeners` + `provideAutocompleteUi` 链式注入 ComboboxUi/ListboxUi/PopperUi/InputUi）。

**发现并修复 2 项真实缺陷 + 扩展单测 11 → 21 项：**

1. **Minor (D1-04) 点击清空按钮误关弹出层**：`AutocompleteInput.onBlur` 的外圈闭判定只检测 `triggerElement`（trigger 按钮）与 popup，不含 input/清空按钮所在 anchor 区域——焦点从 input 移到清空按钮时被判定为「外部点击」，弹出层被误关（combobox 用 `parentElement` 包裹整个 anchor，无此问题）。修复为与 combobox 对齐的 `parentElement` 判定。
2. **Major (D7-05) 打开态弹出层缺可访问名称**：viewport（`role="listbox"`）未注入 `aria-label`，axe `aria-input-field-name` serious 违规；combobox 的 compact 已注入 `options` 名称而 autocomplete 遗漏。修复为 compact 的 `viewportProps` computed 注入 `aria-label`（`viewportProps['aria-label'] ?? messages.autocomplete.options`），并补齐 `LocaleAutocompleteMessages.options` 类型 + 13 个语言包的翻译。

**测试覆盖从 11 项扩展至 21 项**（渲染/分组/modelValue/打开方式/选择/disabled/过滤输入/无匹配空态/空数据空态/键盘 ArrowDown+Enter 选择/disabled item/受控 open/清空按钮/blur 圈闭（含清空按钮保持打开 + 外部关闭）/axe ×2），全部通过；`pnpm typecheck` 全绿；combobox/select 回归 39 项通过。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 输入-过滤-选择闭环完整：输入即打开（`onInput` → `onOpenChange(true)` + `filterSearch` 同步）、Fuse 模糊过滤（`ignoreLocation`/`threshold 0.3`/`matchAllWhenSearchEmpty`）、ArrowDown/Up/Home/End 打开 + 键盘导航复用 listbox、Enter/Space 选择高亮项、typeahead、Escape/外部点击关闭、空态/分组/清空（`clearable` → `clearLabel`/`resetModelValueOnClear`）语义完整；**修复** 清空按钮焦点转移误关弹出层、viewport 缺可访问名称；disabled item 不可选（`rootDisabled \|\| props.disabled`，复用 C33 修复模式） |
| D2 行业对标 |  ✅  | 对标 reka-ui `Autocomplete`/Algolia Autocomplete：Fuse 模糊搜索为差异化增强（对齐 Algolia 关键词匹配）；`openOnFocus`/`openOnClick` 双打开策略、`aria-autocomplete="list"` + `aria-activedescendant` 对齐 WAI-ARIA combobox 模式；数据驱动 Compact API（`items`/`labelField` 语义化 + 分组）为 SoybeanUI 增强；无额外 a11y 实现差异（D2-04 通过）                                                                                                                                                              |
| D3 API 设计 |  ✅  | 层级 API 完整：Root/Input/Compact 全量暴露 + `Combobox*` 子组件族复用（Anchor/Content/Item/Viewport/Trigger/Empty/Cancel）；`update:modelValue`/`update:open`/`select`/`highlight` 事件完整；`AutocompleteCompactSlots<T>` 槽 props 类型完整（input-leading/trailing、trigger-icon、empty、group-label、item-*）；`AutocompleteSingleOptionData` 支持 `label`/`value`/`icon`/`keywords`/`separator`/`disabled`                                                                                                 |
| D4 类型系统 |  ✅  | strict 通过；`AutocompleteRootProps`/`AutocompleteCompactProps<T>` 泛型推导 `modelValue` 为 `string`；`AutocompleteSearchOptionData`（groupLabel/groupValue 扁平化）与 `getAutocompleteItemOptions` 还原分组类型完备；**修复** `LocaleAutocompleteMessages` 新增 `options` 键，13 个语言包类型同步                                                                                                                                                                                                             |
| D5 代码规范 |  ✅  | context 值全响应式（`ComputedRef`）；无样式注入 headless；`useOmitProps` 透传收敛；`resetSearchTermTimer` onUnmounted 清理；`focusable` 挂载/卸载对称切换；无泄漏监听/定时器；修复后无调试残留                                                                                                                                                                                                                                                                                                                 |
|   D6 文档   |  ✅  | 中英文档齐备（Overview / Usage / Demos / API）；playground 多示例（basic/grouped/open-on-focus/disabled/custom-styling）；API 描述与实现一致（`clearable`/`openOnFocus`/`openOnClick`/`fuseOptions` 均在文档列出）                                                                                                                                                                                                                                                                                             |
|   D7 其他   |  ✅  | 单测 11 → 21 项全通过（渲染/分组/模型值/打开方式/选择/disabled/过滤/空态 ×3/键盘选择/disabled item/受控 open/清空/blur 圈闭/axe ×2）；**修复** 打开态 axe `aria-input-field-name` serious 违规（viewport 注入 aria-label）；无独立浏览器 e2e 文件，D7-19/20 以 happy-dom 单测覆盖（打开态 axe + 交互断言 + blur 圈闭），listbox/combobox 复用基座的浏览器行为由 combobox/select 覆盖                                                                                                                           |

---

## 二、行业对标矩阵

| 能力                    | SoybeanUI | reka-ui `Combobox` | Algolia Autocomplete | Ant Design `AutoComplete` |
| :---------------------- | :-------: | :----------------: | :------------------: | :-----------------------: |
| headless/styled 分离    |    ✅     |         ✅         |          —           |             —             |
| 输入即过滤 + 模糊匹配   |    ✅     |         —          |          ✅          |            ✅             |
| combobox/listbox 角色   |    ✅     |         ✅         |          ✅          |            ✅             |
| 键盘导航 + typeahead    |    ✅     |         ✅         |          ✅          |            ✅             |
| 分组 + 组标签           |    ✅     |         ✅         |          —           |             —             |
| openOnFocus/openOnClick |    ✅     |         —          |          ✅          |            ✅             |
| 清空按钮 + 空态         |    ✅     |         ✅         |          —           |            ✅             |
| 数据驱动 Compact API    |    ✅     |         —          |          —           |             —             |
| axe 无违规（打开态）    |    ✅     |         —          |          —           |             —             |

---

## 三、发现的问题与处理

### 3.1 Minor — 点击清空按钮误关弹出层（D1-04）

**问题：** [autocomplete-input.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/autocomplete/autocomplete-input.vue#L114-L131) 的 `onBlur` 外圈闭判定为：

```ts
const isInsideTrigger = triggerElement.value?.contains(nextFocus);
const isInsideContent = document.getElementById(contentId.value)?.contains(nextFocus);
if (!isInsideTrigger && !isInsideContent) onOpenChange(false);
```

`triggerElement` 只是 trigger 按钮（chevrons 图标），**不含** input 与清空按钮（二者位于 anchor 内、trigger 之外）。焦点从 input 移到清空按钮时 `relatedTarget` = 清空按钮 → 两路都不命中 → 弹出层被误关。同族 combobox 用 `parentElement`（ListboxRoot 根元素，包裹整个 anchor）判定，无此问题；autocomplete 是独有回归。

**影响：** 用户输入后点击清空按钮，建议列表同时被关闭（清空后应保持列表展示全部选项、继续输入），与 combobox 及主流 autocomplete（Algolia/Ant）行为不一致。交互级缺陷。

**处理：** 改为与 combobox 对齐的 `parentElement` 判定（[autocomplete-input.vue#L125](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/autocomplete/autocomplete-input.vue#L125-L130)）——`parentElement` 已由 `AutocompleteRoot` 经 combobox context 提供（`listboxElement.$el` 包裹 anchor），`parentElement.contains(nextFocus)` 对 input/清空按钮/trigger 均命中；popup 仍在 `contentId` 判定中。

**验证：** 新增单测「keeps the popup open when focus moves from the input to the clear button」（修复前失败：`expected null not to be null`）+「closes the popup when focus moves outside the component」双路径覆盖。

### 3.2 Major — 打开态弹出层缺可访问名称（D7-05）

**问题：** 打开态 axe 扫描报 1 项 serious 违规 `aria-input-field-name`（target `.overflow-y-auto` = viewport）：viewport 渲染 `ListboxContent`（`role="listbox"`），缺少可访问名称。combobox 的 compact 已注入 `viewportProps['aria-label'] = placeholder ?? messages.combobox.options`，autocomplete 遗漏——同名 `viewportProps` prop 直接透传，无默认名称注入。

**影响：** 屏幕阅读器无法获知建议列表的用途，WCAG 1.3.1 合规失败；axe 自动扫描不通过（D7-05 验收项）。

**处理：** 两处修复：

1. [autocomplete-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/autocomplete/autocomplete-compact.vue#L105-L108) 新增 `viewportProps` computed：`{ ...props.viewportProps, 'aria-label': props.viewportProps?.['aria-label'] ?? messages.autocomplete.options }`——用户显式传入 `viewportProps['aria-label']` 时优先，否则回落 locale 消息（与 combobox 同模式，computed 遮蔽同名 prop）。
2. [locale/types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/locale/types.ts#L13-L22) `LocaleAutocompleteMessages` 新增 `options` 键，并同步补齐 13 个语言包（en/zh-CN/zh-TW/ja/ko/id/ru/fr/tr/es/ar/pt-BR/de）翻译。

**验证：** 新增单测「has no a11y violations when open」（打开态 + `region` 禁用，修复前失败：`expected 2 violations to have length 0`）→ 0 违规通过；既有「when paired with a label」回归通过。

### 3.3 D7-11 — 单测覆盖不足（已扩展 11 → 21 项）

**问题：** 原 [autocomplete.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/autocomplete.spec.ts) 仅 11 项，未覆盖过滤输入、无匹配/空数据空态、键盘选择、disabled item、受控 open、清空按钮、blur 圈闭、打开态 axe。

**处理：** 扩展至 **21 项**，全部通过：

```bash
✓ test/specs/components/autocomplete.spec.ts (21 tests) 163ms
```

> 覆盖要点：过滤输入后仅渲染匹配项（`querySelectorAll('[role="option"]')` 长度 1）；无匹配/空 items 显示空态；ArrowDown 打开 + Enter 选择首项（`update:modelValue` 与输入框值同步）；disabled item 点击不触发 `update:modelValue`；受控 `open` 双向驱动；清空按钮点击后 `update:modelValue` 发 `['']` 且输入框清空；blur 圈闭两路径（清空按钮保持打开 / 外部关闭）。

### 3.4 验证通过 — 过滤职责边界

autocomplete 的过滤不在 combobox 过滤状态机内（`ignoreFilter=true`），而由 compact 数据层 `useFuse` 完成（`keys: ['label', 'value', 'keywords', 'groupLabel']`），`filteredItems` computed 直接驱动渲染；combobox 的 `filterState`/`filterSearch` 仅保留用于打开时回显与空态联动。职责边界清晰：Headless Root 只做状态与交互，数据过滤在 Compact 聚合层，与 select 的 collection 查找互补模式一致。非缺陷。

### 3.5 说明 — 无独立浏览器 e2e

autocomplete 无 `autocomplete.e2e.spec.ts`。D7-19/20 由 happy-dom 单测覆盖（打开态 axe、交互断言、blur 圈闭），复用基座（listbox/combobox/portal）的浏览器行为由 combobox/select e2e 间接覆盖。非阻塞，可在后续补 e2e 文件。

---

## 四、架构与模式要点

### Combobox 组件族复用 + Fuse 数据过滤

`AutocompleteRoot` 不重复实现选择/导航/定位：复用 `ListboxRoot`（selection/collection/高亮/键盘导航/typeahead）+ `PopperRoot`（定位），并通过 `provideComboboxRootContext` 将状态注入 combobox 组件族（Anchor/Content/Item/Viewport/Trigger/Empty/Cancel 全部按别名复用）。自身只叠加「输入即打开 + 焦点圈闭 + `ignoreFilter` 逃生阀」；过滤完全交给 `AutocompleteCompact` 的 `useFuse`。这是「Headless 基座 + Compact 聚合」模式的高复用示范——autocomplete 与 combobox 共享同一套交互内核，仅过滤与展示策略不同。

### 双数据源渲染

数据展示走「Fuse 结果 → 扁平化（`getAutocompleteSearchOptions` 展开分组）→ 还原分组（`getAutocompleteItemOptions`）」闭环：分组项经 `groupValue` 标记扁平搜索、再按组聚合渲染，分组标签/分隔符在两种形态间无损迁移。`getItemKey` 以 `group-`/`item-` 前缀避免 key 冲突。

### 焦点管理

input `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-autocomplete="list"` + `aria-activedescendant`（`watchSyncEffect` 跟随高亮项 id）；blur 圈闭以 `parentElement`（anchor 区域）∪ `contentId`（popup）判定外部焦点迁移，清空按钮/trigger 均在 anchor 内不误关。

### a11y 语义（本次修复）

viewport（`role="listbox"`）注入 `aria-label`（`viewportProps['aria-label'] ?? messages.autocomplete.options`，支持用户覆盖）；trigger 按钮 `aria-label = messages.autocomplete.toggleSuggestions`；清空按钮 `aria-label = clearLabel ?? messages.autocomplete.clearInput`；打开态 axe 0 违规（color-contrast 开）。

---

## 五、变更文件清单

| 文件                                                                                      | 变更类型                                                                                                                                                       |
| :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/autocomplete/autocomplete-input.vue`                    | `onBlur` 外圈闭判定 `triggerElement` → `parentElement`（与 combobox 对齐），修复点击清空按钮误关弹出层                                                         |
| `packages/headless/src/components/autocomplete/autocomplete-compact.vue`                  | 新增 `viewportProps` computed 注入 `aria-label`（`viewportProps['aria-label'] ?? messages.autocomplete.options`），修复打开态 axe `aria-input-field-name` 违规 |
| `packages/headless/src/locale/types.ts`                                                   | `LocaleAutocompleteMessages` 新增 `options` 键（viewport 可访问名称）                                                                                          |
| `packages/headless/src/locale/langs/{en,zh-CN,zh-TW,ja,ko,id,ru,fr,tr,es,ar,pt-BR,de}.ts` | 13 个语言包同步补充 `autocomplete.options` 翻译                                                                                                                |
| `packages/ui/test/specs/components/autocomplete.spec.ts`                                  | 单测 11 → 21 项（过滤/空态 ×3/键盘选择/disabled item/受控 open/清空/blur 圈闭 ×2/打开态 axe）                                                                  |

---

## 六、验证命令

```bash
# 单元测试（21 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/autocomplete.spec.ts
# → Test Files 1 passed (1) | Tests 21 passed (21)

# 族系回归（combobox 23 + select 16 = 39 项通过）
cd packages/ui && pnpm exec vp test run test/specs/components/combobox.spec.ts test/specs/components/select.spec.ts

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **无独立浏览器 e2e 文件**：autocomplete 交互（输入过滤/选择/空态/blur 圈闭）仅在 happy-dom 单测覆盖；可补 `autocomplete.e2e.spec.ts` 做真实浏览器验证（真实 focus/blur 迁移、键盘、axe）。非阻塞。
- **无虚拟滚动**：autocomplete 全量渲染 `filteredItems`（对齐 Algolia 数据量），超大列表可复用 combobox 的 `ComboboxVirtualizer` 模式（`isVirtual` 分支已在 listbox 层就位）。非阻塞。
- **`select` 事件对 disabled item 仍会触发**：`ListboxItem.handleSelect` 先 emit 后守卫（对齐 reka-ui 上游语义），disabled item 点击会发出 `select` 但不会改 `modelValue`；族系共享行为，消费方可自行判断。非阻塞，报告记录备查。
