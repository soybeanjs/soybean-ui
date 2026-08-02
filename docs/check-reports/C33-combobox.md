# C33 `combobox` 检查优化报告

> **组件编号：** C33
> **组件名称：** `combobox` / `SCombobox`（headless `ComboboxCompact` 聚合 + 完整基座：`ComboboxRoot` → `ListboxRoot` 复用 + `PopperRoot` 定位 + `ComboboxInput` → `ComboboxContentImpl` → `ComboboxItem` → `ListboxItem`；`scv()` 配方 `comboboxVariants` 15 slots）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-04、D2-11、D3-04、D7-01

---

## 一、执行摘要

对 `combobox` 完成全维度审计。架构为「listbox 复用 + Popper 定位 + 过滤搜索」的复杂聚合：`ComboboxRoot`（`useSelection` 状态 + `useControllableState(open)` + `filterState` 三态过滤 computed + `resetSearchTerm` 事件钩子）→ `ComboboxInput`（`role="combobox"` + `aria-autocomplete` + `aria-controls` + 输入过滤/键盘打开）→ `ComboboxTrigger`（`tabindex="-1"` + `aria-haspopup="listbox"` + pointer/keyboard 打开）→ `ComboboxContentImpl`（DismissableLayer + FocusScope + PopperPositioner/PopperPopup + bodyLock + `useHideOthers`）→ `ComboboxItem`（过滤可见性 + group 注册 + select 事件）→ `ListboxItem` 基座（collection 注册 + 高亮/键盘导航/typeahead + disabled 守卫）；`ComboboxVirtualizer` 挂载时设 `isVirtual` 启用虚拟列表。styled 层 `comboboxVariants` 声明 15 slots + 7 尺寸变体 + position 变体；UI 层 `SCombobox` 薄包装（dynamic slot forwarding + `useForwardListeners` + `provideComboboxUi` 链式注入 ListboxUi/PopperUi/InputUi）。

**发现并修复 1 项 Major 真实缺陷 + 扩展单测 13 → 23 项：**

1. **Major (D1-04) disabled item 仍可被选中**：`ComboboxRoot` 对 `defineProps` 使用 `withDefaults` 时，Vue 将未显式默认值的 Boolean prop（`disabled`）隐式默认化为 `false`，context 中 `rootDisabled` 恒为 `false`；`ComboboxItem` 原用 `??` 合并 `rootDisabled.value ?? props.disabled`，`false ?? true` 短路为 `false`，导致「根级 disabled 或项级 disabled」全部失效——disabled item 点击/键盘仍会选中。修复为 `computed(() => rootDisabled.value || props.disabled)`，与 `select-item.vue` 的既有写法对齐。

**测试覆盖从 13 项扩展至 23 项**（placeholder/class/空态/模型值渲染/过滤输入/过滤空态/过滤 Enter 与点击选择/分组过滤/multiple 累积/受控 open/disabled item/disabled 根/clearable 语义/axe/hide-others），全部通过；`pnpm typecheck` 全绿。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 过滤-选择闭环完整：输入 `onInput` 设 `isUserInputted` + 写 `filterSearch` + 打开；`filterState` 三态（matched>0 / 0 / undefined 未参与）驱动 `ComboboxItem` 可见性与空态；`ComboboxCancel` 清空输入 + 可选 `resetModelValueOnClear` 重置模型值；键盘导航（ArrowDown/Up 打开与高亮、Enter/Space 选择、typeahead）复用 listbox 层；**修复** disabled item 不可选；受控 `open` 双向驱动；`resetSearchTermOnBlur`/`ignoreFilter`/`multiple` 语义完整 |
| D2 行业对标 |  ✅  | 对标 reka-ui `Combobox` / shadcn `Combobox`：输入即过滤 + `aria-autocomplete`、trigger+input 双元素组合、listbox 角色与键盘映射逐项对齐；`ComboboxVirtualizer` 虚拟滚动为差异化增强（对齐 TanStack Virtual）；`ComboboxCompact` 数据驱动聚合与分组渲染为 SoybeanUI 增强；无额外 a11y 实现差异（D2-04 通过）                                                                                                                                      |
| D3 API 设计 |  ✅  | 层级 API 完整：Root/Trigger/Input/Content/Item/Group/Separator/Empty/Arrow/Cancel/Viewport/Virtualizer 全量暴露 + `ComboboxCompact` 数据驱动（`items`/`labelField`/`valueField` + `placeholder`/`searchPlaceholder`/`clearLabel`/`emptyLabel` 语义化）；`update:modelValue`/`update:open`/`select`/`inputValueChange` 事件完整；`ComboboxCompactSlots<T, M>` 槽 props 类型完整（trigger-* / input-* / empty / group-label / item-*）             |
| D4 类型系统 |  ✅  | strict 通过；`ComboboxRootProps<M>`/`ComboboxCompactProps<M>` 泛型（多选开关 M）推导 `modelValue`/`defaultValue` 为 `MaybeArray<string>`；`ComboboxItemProps`/`ComboboxCompactSlots<T, M>` 完整；UI 层 slot props 类型经 `@vue-expect-error` 注释收敛（与 select.vue 同模式，非缺陷）                                                                                                                                                            |
| D5 代码规范 |  ✅  | context 值全响应式（`ComputedRef`，`transformPropsToContext` 包裹）；无样式注入 headless；`useOmitProps` 透传收敛；事件钩子 `onResetSearchTerm`/`virtualFocusHook` 等均 `onScopeDispose` 清理；无泄漏监听/定时器；修复后无调试残留（临时 console 已清理）                                                                                                                                                                                        |
|   D6 文档   |  ✅  | 中英文档齐备（Overview / Usage / Demos / API）；playground 多示例；API 描述与实现一致（`clearable`、`resetModelValueOnClear`、`ignoreFilter` 均已在文档列出）                                                                                                                                                                                                                                                                                    |
|   D7 其他   |  ✅  | 单测 13 → 23 项全通过（渲染 / 空态 / 占位符 / defaultValue 与受控 modelValue 输入框回显 / 过滤输入与空态 / 过滤 Enter 与点击选择 / 分组过滤 / multiple 累积 / 受控 open / disabled item 与 disabled 根 / cancel 保持与清空 / axe / hide-others）；无独立浏览器 e2e 文件，D7-19/20 以 happy-dom 单测覆盖（打开态 axe + 交互断言），浏览器原生 select e2e 覆盖其 listbox 复用基座                                                                  |

---

## 二、行业对标矩阵

| 能力                     | SoybeanUI | reka-ui `Combobox` | shadcn `Combobox` | Ant Design `Select` (showSearch) |
| :----------------------- | :-------: | :----------------: | :---------------: | :------------------------------: |
| headless/styled 分离     |    ✅     |         ✅         |         —         |                —                 |
| 输入即过滤 + 三态 filter |    ✅     |         ✅         |        ✅         |                ✅                |
| combobox/listbox 角色    |    ✅     |         ✅         |        ✅         |                ✅                |
| 键盘导航 + typeahead     |    ✅     |         ✅         |         —         |                ✅                |
| 虚拟滚动                 |    ✅     |         ✅         |         —         |                ✅                |
| 分组 + 组标签            |    ✅     |         ✅         |        ✅         |                ✅                |
| 取消按钮（clear）        |    ✅     |         ✅         |        ✅         |                ✅                |
| 空态                     |    ✅     |         ✅         |         —         |                —                 |
| 数据驱动 Compact API     |    ✅     |         —          |         —         |                —                 |
| axe 无违规（打开态）     |    ✅     |         —          |        ✅         |                —                 |

---

## 三、发现的问题与处理

### 3.1 Major — disabled item 仍可被选中（D1-04）

**问题：** 新增单测「does not select a disabled item」断言 `expect(wrapper.emitted('update:modelValue')).toBeFalsy()` 失败，实际收到 `[["banana"]]`。多层诊断定位根因：

1. DOM 检查 `options[1].getAttribute('data-disabled')` 首轮用 `toBeDefined()` 断言误报通过（vitest 中 `null` ≠ `undefined`，`expect(null).toBeDefined()` 通过），快照显示 Banana 项**没有** `data-disabled` 属性；
2. `wrapper.findAllComponents({ name: 'ListboxItem' })` 显示 Banana 收到 `disabled: false`——props 层面已丢失；
3. 临时插桩 `console.error(rootDisabled.value, props.disabled)` 确认：`rootDisabled.value: false`（**应为 true**）、`props.disabled: true`。

根因是 [combobox-root.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/combobox/combobox-root.vue) 对 `defineProps<ComboboxRootProps>()` 使用 `withDefaults` 时，**Vue 会为未显式给出默认值的 Boolean 类型 prop 隐式默认化为 `false`**——`disabled` 未出现在默认值对象中，运行时仍被归一化为 `false` 存入 context 的 `rootDisabled`，因此根级 `disabled` 恒为 `false`。而 [combobox-item.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/combobox/combobox-item.vue) 原合并逻辑 `rootDisabled.value ?? props.disabled` 使用 `??`：`false ?? true` 短路返回 `false`，导致「根 disabled OR 项 disabled」两路全部失效。

**影响：** disabled item 可被点击/Enter 选中并触发 `update:modelValue`，disabled 语义完全失效；`aria-disabled`/`data-disabled` 也随之下发为 false，屏幕阅读器与样式均无法感知禁用状态。用户可见、交互级缺陷。

**处理：** 改为 `const disabled = computed(() => rootDisabled.value || props.disabled);`（[combobox-item.vue#L45](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/combobox/combobox-item.vue#L45)）——`||` 正确处理「根级 disabled OR 项级 disabled」，与族系内 [select-item.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/select/select-item.vue) 的既有写法对齐（select 无此缺陷，combobox 为族系内独有）。

**验证：** 新增单测「does not select a disabled item」（`disabledItems` 数据源 + 打开 + 点击 disabled 项 → 断言无 `update:modelValue` 发出）+ 既有「prevents interaction when disabled」（根 disabled）覆盖双路径；23 项全通过。

### 3.2 D7-11 — 单测覆盖不足（已扩展 13 → 23 项）

**问题：** 原 [combobox.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/combobox.spec.ts) 仅 13 项，未覆盖过滤选择闭环（输入过滤/空态/Enter 与点击选择）、分组过滤、multiple 累积、受控 open、disabled item、cancel 语义（默认保持 / `resetModelValueOnClear` 清空 + placeholder 回退）。

**处理：** 扩展至 **23 项**，新增 `openCombobox`/`getComboboxInput`/`setSearchTerm` 辅助函数，全部通过：

```bash
✓ test/specs/components/combobox.spec.ts (23 tests) 186ms
```

> 附注：测试设计修正一处——cancel 清空场景改用**非受控** `defaultValue: 'banana'` + placeholder「Pick a fruit」验证（受控 `modelValue` 下 trigger 文本由父级 prop 驱动，点击 cancel 后已选值仍回显，无法断言清空；非受控下 `resetModelValue` 触发后回落 placeholder，语义正确）。

### 3.3 验证通过 — cancel 语义与 select 的差异

combobox 的 `clearable` 控制 `ComboboxCancel`（清空 `filterSearch` + 聚焦输入框 + 可选 `resetModelValueOnClear` 重置模型值），与 select 的 `selectionBehavior='toggle'` 取消选择语义**不同**——combobox 的 clear 是「清空搜索/清空选择」操作（对齐 reka-ui Combobox），非缺陷。新增「keeps the selection when resetModelValueOnClear is disabled」/「clears the selection when resetModelValueOnClear is enabled」用例验证两种模式。

### 3.4 说明 — 无独立浏览器 e2e

combobox 无 `combobox.e2e.spec.ts`（仅 select e2e 以 combobox 角色测试）。D7-19/20 由 happy-dom 单测覆盖（打开态 axe + hide-others + 交互断言），listbox 复用基座的浏览器行为由 select e2e 间接覆盖。非阻塞，可在后续补 e2e 文件。

---

## 四、架构与模式要点

### Listbox 复用 + 过滤状态的叠加

`ComboboxRoot` 不重复实现选择/导航：复用 `ListboxRoot`（selection/collection/高亮/键盘导航/typeahead）+ `PopperRoot`（定位），自身只叠加「过滤搜索」状态机：`filterSearch`（受控字符串）+ `filterState`（Map<itemId, matchedCount> 三态）+ `ignoreFilter` 逃生阀 + `resetSearchTermOnBlur`/`resetSearchTermOnSelect` 生命周期。`ComboboxItem` 按 `filterState` 驱动 `visible`，命中 0 项时 `ComboboxEmpty` 接管，职责边界清晰。

### Virtualizer 的 isVirtual 开关

`ComboboxVirtualizer` 挂载时设 `isVirtual = true` 并触发 `virtualFocusHook`，卸载时复位——listbox 层据此在「真实 DOM 集合」与「虚拟滚动回调」两种模式间切换（`highlightItem`/`onKeydownNavigation`/`highlightSelected` 均分支处理），与 select 的全量渲染形成对照。

### 双元素 trigger 组合

combobox 是「trigger（按钮，`tabindex="-1"`、`aria-haspopup="listbox"`、toggle 打开）+ input（`role="combobox"`、`aria-autocomplete`、`aria-controls`、输入过滤）」双元素组合；select 是「trigger + 只读 value」组合。`ComboboxCancel` 在打开态注入输入框尾部的清空操作，`aria-label` 取 `clearLabel ?? messages.combobox.clearInput`（locale 可定制）。

### a11y 语义

Input `role="combobox"` + `aria-expanded` + `aria-controls`（listbox id）+ `aria-autocomplete="list"`；Content `role="listbox"`；Item `role="option"` + `aria-selected` + `aria-disabled`；打开态 axe 无违规（color-contrast 开）。

---

## 五、变更文件清单

| 文件                                                          | 变更类型                                                                                                                                                  |
| :------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/combobox/combobox-item.vue` | `??` → `                                                                                                                                                  |     | ` 合并根级/项级 disabled，修复 disabled item 仍可被选中的 Major 缺陷；清理临时调试代码 |
| `packages/ui/test/specs/components/combobox.spec.ts`          | 单测 13 → 23 项（过滤输入/空态/Enter 与点击选择/分组过滤/multiple 累积/受控 open/disabled item/cancel 保持与清空）+ 修正 cancel 场景为受控/非受控正确断言 |
| `docs/check.md`                                               | 标记 C33 各维度为 ✅                                                                                                                                      |

---

## 六、验证命令

```bash
# 单元测试（23 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/combobox.spec.ts
# → Test Files 1 passed (1) | Tests 23 passed (23)

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **无独立浏览器 e2e 文件**：combobox 交互（过滤/选择/空态）仅在 happy-dom 单测覆盖；可补 `combobox.e2e.spec.ts` 做真实浏览器验证（打开/输入过滤/Enter 选择/axe）。非阻塞。
- **`??` 陷阱为族系内独有**：已核对 `select-item.vue` 等族系组件使用 `||`，无同类问题；后续新增复用 `ListboxItem`/`useSelection` 的组件（如 `autocomplete`）时应统一 `||` 合并 Boolean 上下文字段。
- **虚拟滚动路径的键盘/高亮**：`isVirtual` 分支依赖 Virtualizer 回调，滚动容器内高亮跟随未做专测；数据量极大场景可补充虚拟滚动专项测试。非阻塞。
