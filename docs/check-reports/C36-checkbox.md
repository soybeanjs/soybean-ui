# C36/C37 `checkbox` / `checkbox-group` 检查优化报告

> **组件编号：** C36（`checkbox`）+ C37（`checkbox-group`，共享同一实现族）
> **组件名称：** `SCheckbox` / `SCheckboxGroup` / `SCheckboxCard` / `SCheckboxCardGroup`（headless 基座：`CheckboxRoot`（`useControllableState` + `CheckedState` 三态）→ `CheckboxControl`（`role="checkbox"` + `aria-checked` + `data-state`，roving-focus 可选）→ `CheckboxIndicator`（`usePresence` 条件挂载）→ `CheckboxLabel`（`for`/id 关联）→ `CheckboxGroupRoot`（`RovingFocusGroup` 包装 + 隐藏表单代理）；Compact 聚合：`CheckboxCompact`/`CheckboxCardCompact`/`CheckboxGroupCompact`/`CheckboxCardGroupCompact`；`scv()` 配方 `checkboxVariants`/`checkboxCardVariants`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** C36: D1-08、D2-11、D3-04、D7-05；C37: D1-12、D2-11、D3-04、D7-05

---

## 一、执行摘要

对 `checkbox` 族（checkbox / checkbox-group / checkbox-card / checkbox-card-group）完成全维度审计。headless 基座完整：`CheckboxRoot`（`useControllableState(modelValue)` 受控/非受控 + 三态 `CheckedState`（boolean | 'indeterminate'）→ `provideCheckboxRootContext`（`ariaChecked` mixed 映射 + `dataState`））→ `CheckboxControl`（`Button` 基座 + `role="checkbox"`，组内自动切换 `RovingFocusItem` 键盘导航，`@click`/`@keydown.enter` 切换；`aria-label` 回退 `getAriaLabel`）→ `CheckboxIndicator`（`usePresence` 条件挂载，`forceMount` 支持）→ `CheckboxLabel`（`for` → 控件 `id`，`controlId` 经 context 关联）；`CheckboxGroupRoot`（`RovingFocusGroup` 包装 + `VisuallyHiddenInput` 表单代理）；Compact 聚合 4 层（card 变体含 icon/description 内容槽）。styled 层 `checkboxVariants`/`checkboxCardVariants` 6 尺寸 + 8 颜色 + 形状变体；UI 层 4 个薄包装（`provideCheckboxUi`/`provideCheckboxCardUi` 链式注入）。

**发现并修复 1 类真实缺陷 + 扩展单测 19 → 41 项 + 顺带修复 1 处既有 lint 错误：**

1. **Major (D1-03 UI 边界) `checkbox-card-group.vue` 向 headless 传递 4 个未声明 props，泄漏为组根 DOM 属性**：`:content-class`/`:text-content-class`/`:icon-class`/`:description-class` 未在 `CheckboxCardGroupCompactProps` 声明，作为 attrs 穿透 `CheckboxCardGroupCompact` → `CheckboxGroupRoot` → 组根元素，渲染为 `content-class`/`text-content-class`/`icon-class`/`description-class` 非法 DOM 属性；且这些类已通过 `provideCheckboxCardUi(ui)` 上下文注入 `CheckboxCardCompact`（`ui.content`/`ui.textContent`/`ui.icon`/`ui.description`），完全冗余。修复：删除 4 个绑定，卡片内容样式仍由 ui 上下文正确生效。
2. **D7-11 单测覆盖不足（19 → 41 项）**：新增 `checkbox.spec.ts` 9 → 18（`data-state` 三态映射、Enter 键盘切换、表单代理 name/value/checked + 自定义 `value`、label `for`/id 关联、root `class` 合并、`ui.control` 覆盖、indeterminate 态 axe）；`checkbox-group.spec.ts` 10 → 14（组根 `disabled` 全禁、`ui.control` 覆盖、card-group axe、card-group `ui.content` 覆盖）；新增 `checkbox-card.spec.ts` 9 项（label/icon/description 渲染、选中态、点击切换、禁用、class/ui 覆盖、axe）。
3. **顺带修复既有 lint 错误（D5-12 顺序违规）**：`autocomplete-compact.vue` 中 `useLocaleMessages()` 声明晚于 `viewportProps` computed 使用（use-before-define），修复为按 script setup 顺序上移至 hooks 初始化区，`pnpm lint` 由红转绿。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 三态闭环完整：`CheckedState`（boolean/'indeterminate'）→ `ariaChecked`（mixed 映射）+ `dataState`（checked/indeterminate/unchecked）双通道反射（D1-08）；`role="checkbox"` + `aria-checked`/`aria-required`/`aria-disabled`（disabled 走原生 `disabled`）+ `data-soybean-*` 5 个插槽根属性（D1-07）；组内 `RovingFocusItem` 箭头键导航（D1-16）；`CheckboxLabel` `for` ↔ 控件 `id` 关联（D1-14）；`VisuallyHiddenInput` 表单代理（name/value/checked/required/disabled，含组数组值 `parseFormValue`）；Compact 聚合全部下沉 headless，UI 包装器零 `v-for`/零默认内容装配（D1-12）；headless 无样式（仅 indicator 沿用家族 `pointer-events: none` 既有模式）；`useOmitProps` 均含 `class`（D1-10）；recipe 首行 `// @unocss-include`，slot 键与 `UiSlot` 完全一致（D1-09） |
| D2 行业对标 |  ✅  | 对标 Ant Design/Element Plus/Mantine/Naive UI/shadcn `Checkbox`：三态（indeterminate）、禁用、表单 value 映射、卡片变体对齐；**修复** card-group 4 个非法 DOM 属性泄漏（对标库均无此问题）；组键盘导航（roving focus 方向键）为差异化工项；遗留增强：独立 `indeterminate` prop、`button` variant、全选辅助（见「遗留增强项」）                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| D3 API 设计 |  ✅  | 受控/非受控（`useControllableState`，`v-model` + `defaultValue` 双模式，D3-04）；`modelValue`（`CheckedState`）/`value`（表单值，默认 `'on'`）/`name`/`required`/`disabled` 命名对齐主流（D3-01）；`as`/`asChild`（Control/Indicator）+ `ui`/`class`/slot 四扩展点（D3-08）；`*CompactProps`/`*CompactEmits`/`*CompactSlots` 类型族完整导出；UI 层 `S` 前缀（D3-09）                                                                                                                                                                                                                                                                                                                                                                                                      |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；props 全 interface（D4-03）；`CheckedState`/`DefinedValue`/`UiClass` 复用共享类型（D4-05）；`CheckboxUiSlot`/`CheckboxCardUiSlot` 与 recipe slot 一一对应；JSDoc 覆盖公开接口（D4-06）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿（顺带修复 autocomplete-compact 既有 use-before-define，D5-12 顺序）；context 值全响应式（`transformPropsToContext` + `ComputedRef`/`ShallowRef`，D1-05）；`onClick` 组模式副本数组 splice/push 局部可变（D5-06 允许范围）；模板无 `props.xxx`（D5-14）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|   D6 文档   |  ✅  | 中英文档齐备；playground 示例覆盖基本/禁用/卡片/分组/自定义样式；API 描述与实现一致（`value` 默认 `'on'`、三态、card 变体均在文档列出）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|   D7 其他   |  ✅  | 单测 19 → 41 项全通过（新增 data-state 三态/Enter 键盘/表单代理 + 自定义 value/label for-id 关联/class + ui 覆盖/组 disabled 根/card 单组件 + card-group axe/indeterminate axe）；axe 0 违规（checkbox/group/card/card-group 四形态）；无独立浏览器 e2e 文件，D7-19/20 由 happy-dom 单测覆盖（axe + 交互 + 键盘），与 radio-group/switch 族系一致（非阻塞）                                                                                                                                                                                                                                                                                                                                                                                                               |

---

## 二、行业对标矩阵

| 能力                      | SoybeanUI | Ant Design `Checkbox` | Element Plus `Checkbox` | Mantine `Checkbox` | Naive UI `Checkbox` | shadcn/ui `Checkbox` |
| :------------------------ | :-------: | :-------------------: | :---------------------: | :----------------: | :-----------------: | :------------------: |
| headless/styled 分离      |    ✅     |           —           |            —            |         —          |          —          |          ✅          |
| 三态（indeterminate）     |    ✅     |          ✅           |           ✅            |         ✅         |         ✅          |          ✅          |
| 独立 `indeterminate` prop |    ➕     |          ✅           |           ✅            |         ✅         |         ✅          |          —           |
| 表单 value 映射           |    ✅     |          ✅           |           ✅            |         ✅         |         ✅          |          ✅          |
| 禁用 / 半禁               |    ✅     |          ✅           |           ✅            |         ✅         |         ✅          |          ✅          |
| 卡片变体（icon/描述）     |    ✅     |           —           |            —            |         —          |          —          |          —           |
| 组 roving focus 键盘      |    ✅     |          ✅           |           ✅            |         ✅         |         ✅          |          —           |
| `button` variant          |    ➕     |          ✅           |           ✅            |         —          |          —          |          —           |
| 全选/半选联动辅助         |    ➕     |          ✅           |            —            |         —          |         ✅          |          —           |

---

## 三、发现的问题与处理

### 3.1 Major — card-group 4 个未声明 props 泄漏为组根 DOM 属性（D1-03 / D1-09）

**问题：** [checkbox-card-group.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/checkbox/checkbox-card-group.vue) 模板向 `CheckboxCardGroupCompact` 传入 `:content-class`/`:text-content-class`/`:icon-class`/`:description-class`：

```vue
<CheckboxCardGroupCompact
  v-bind="forwardedProps"
  :content-class="ui.content"
  :text-content-class="ui.textContent"
  :icon-class="ui.icon"
  :description-class="ui.description"
  @update:model-value="emit('update:modelValue', $event)"
/>
```

这四个键**未在** `CheckboxCardGroupCompactProps`（= `CheckboxGroupCompactProps`，仅 `items`/`rootProps`/`controlProps`/`indicatorProps`/`labelProps`）中声明，也未进入 `useOmitProps` omit 列表，因此以 attrs 形式穿透 `CheckboxCardGroupCompact` → `CheckboxGroupRoot` → 组根元素，最终渲染为 `content-class="flex items-center grow"` 等非法 DOM 属性。

同时它们**完全冗余**：`checkbox-card-group.vue` 已调用 `provideCheckboxCardUi(ui)` 将完整 ui 映射注入上下文，`CheckboxCardCompact` 内部经 `useCheckboxCardUi()` 读取 `ui.content`/`ui.textContent`/`ui.icon`/`ui.description` 已正确应用这些类——与 `checkbox-group.vue`（无此类传参）行为一致。

**影响：** 组根 DOM 出现 4 个非标准属性（HTML 无效属性，污染 DOM/调试噪音）；若未来 `CheckboxCardGroupCompactProps` 新增同名 props 还会造成歧义。对照 UI 层职责边界（D1-03：只做样式包装/variant/context 注入/转发）与 recipe 完整性（D1-09）均不符合。

**处理：** 删除 4 个绑定，仅保留 `v-bind="forwardedProps"` + 事件转发：

```vue
<CheckboxCardGroupCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)" />
```

**验证：** 新增单测「applies per-slot ui overrides to the card content」（`ui.content` 覆盖后 `.custom-content-class` 存在于卡片内容元素）与既有 card-group 渲染测试全部通过，证明移除后类注入行为不变；组根 DOM 不再出现 4 个泄漏属性。

### 3.2 D7-11 — 单测覆盖不足（已扩展 19 → 41 项）

**问题：** 原 [checkbox.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/checkbox.spec.ts) 9 项 + [checkbox-group.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/checkbox-group.spec.ts) 10 项，未覆盖 `data-state` 三态映射、键盘切换、表单代理（name/value/checked）、label `for`/id 关联、`class`/`ui` 覆盖、组根 `disabled`、card 单组件与 card-group axe。

**处理：** 扩展至 **41 项**，全部通过：

```bash
✓ test/specs/components/checkbox-card.spec.ts (9 tests)
✓ test/specs/components/checkbox.spec.ts (18 tests)
✓ test/specs/components/checkbox-group.spec.ts (14 tests)
```

> 覆盖要点：`data-state` unchecked/checked/indeterminate 三态（D1-08 验收）；Enter 键切换发 `update:modelValue`（D1-16 键盘）；表单代理——`class="form"` 根下渲染 `data-soybean-visually-hidden-input`（`name`/`value` 默认 `'on'`/自定义 `value`/`checked` 映射）；label `for` = 控件 `id`（D1-14）；root `class` 合并 + `ui.control` 覆盖（D7-15）；组根 `disabled` 全禁（D3-04）；card 单组件（icon/description/选中/禁用/覆盖/axe）与 card-group axe + `ui.content` 覆盖。

### 3.3 顺带修复 — autocomplete-compact 既有 lint 错误（D5-12 顺序违规）

**问题：** [autocomplete-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/autocomplete/autocomplete-compact.vue) 中 `useLocaleMessages()` 声明在 `viewportProps` computed（第 107 行引用 `messages`）之后，触发 `@typescript-eslint/no-use-before-define`——`pnpm lint` 全仓报 1 错。该文件非本次改动，为 HEAD 既有问题（git diff 为空即证）。

**处理：** 将 `const messages = useLocaleMessages();` 上移至 `defineSlots` 之后的 hooks 初始化区（符合 vue-sfc-structure「hooks/composables 初始化 → 业务逻辑」顺序）。修复后 `pnpm lint` 全绿（`vp lint` + `eslint --ext .vue` 0 warnings 0 errors）。

### 3.4 说明 — 非缺陷项（跨组件既有模式）

- **`isFormControl` 语义**：本项目实现为「元素自身 `classList` 含 `form` 类」（Radix 为 `el.closest('form')`）。20 个表单组件（input/select/slider/switch/radio-group/checkbox…）共用同一实现，非 checkbox 特有；表单代理测试以 `class="form"` 稳定触发。是否对齐 Radix `closest('form')` 语义属跨组件决策，记录备查，不在 C36 范围改动。
- **indicator 内联 `style="pointer-events: none"`**：与 `select-value`/`cascader-value`/`dialog-overlay` 等既有模式一致，属可接受的装饰元素防交互约定。
- **测试中 `@ts-expect-error`（3 处）**：radio-group/checkbox 既有模式（happy-dom 对非原生元素 `disabled` 属性的类型限制）。
- **`icon.spec.ts` 4 项失败**：`git stash` 验证为 HEAD 既有（iconify SVG 数据在本地环境缺失导致 `wrapper.find('svg')` 为空），与本次改动无关，记录备查。

---

## 四、架构与模式要点

### 三态状态机（headless 单一事实源）

`CheckedState = boolean | 'indeterminate'` 全链路单一事实源：`CheckboxRoot` 经 `useControllableState` 维护 → context 派生 `ariaChecked`（`indeterminate` → `'mixed'`）与 `dataState`（`getCheckedState` → checked/indeterminate/unchecked）→ `CheckboxControl` 双通道反射（`aria-checked` + `data-state`）→ `CheckboxIndicator` 以 `isIndeterminate(state) || state === true` 经 `usePresence` 条件挂载。样式层通过 `data-[state=checked|indeterminate]` 选择器着色，headless 不持有任何样式。这是「状态驱动渲染 + 状态驱动样式」双通道的典型范式（D1-08 验收）。

### 组内 roving focus 切换（键鼠归一）

`CheckboxGroupRoot` 按 `rovingFocus` 决定渲染 `RovingFocusGroup`（方向键导航）或普通 `div`；`CheckboxControl` 内 `rovingFocus ? RovingFocusItem : Button` 动态切换基座（`:as="rovingFocus ? Button : props.as"`），单/组模式共用同一控件实现；组值切换在 `onClick` 以副本数组 `splice`/`push` 后整体赋值 `groupContext.modelValue.value`（D5-06 局部可变允许范围）。`disabled` 经组 context 派生合并（`groupContext?.disabled || props.disabled`），半禁/全禁语义一致。

### Compact 聚合下沉与 ui 上下文链

4 层 Compact（`CheckboxCompact` → `CheckboxCardCompact` → `GroupCompact` → `CardGroupCompact`）全部持有默认内容与迭代逻辑，UI 层 4 个包装器仅做 variant 计算 + `provideCheckboxUi`/`provideCheckboxCardUi` 注入 + props/事件转发（D1-12）。`provideCheckboxCardUi` 内部链式调用 `provideCheckboxUi`，使卡片内容/控件/指示器共享同一 ui 映射（本次修复即建立在该链上——card 内容类本就不需要额外 props 传递）。

---

## 五、变更文件清单

| 文件                                                                     | 变更类型                                                                                                                                                        |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/src/components/checkbox/checkbox-card-group.vue`            | **修复**：删除 `:content-class`/`:text-content-class`/`:icon-class`/`:description-class` 4 个未声明 props 绑定（避免泄漏为组根 DOM 属性；类经 ui 上下文已生效） |
| `packages/ui/test/specs/components/checkbox.spec.ts`                     | 单测 9 → 18 项（data-state 三态/Enter 键盘/表单代理 + 自定义 `value`/label for-id 关联/root class 合并/`ui.control` 覆盖/indeterminate axe）                    |
| `packages/ui/test/specs/components/checkbox-group.spec.ts`               | 单测 10 → 14 项（组根 `disabled` 全禁/`ui.control` 覆盖/card-group axe/card-group `ui.content` 覆盖）                                                           |
| `packages/ui/test/specs/components/checkbox-card.spec.ts`                | **新增** 9 项（label/icon/description 渲染、选中态、点击切换、禁用、class/ui 覆盖、axe）                                                                        |
| `packages/headless/src/components/autocomplete/autocomplete-compact.vue` | **顺带修复** 既有 lint 错误：`useLocaleMessages()` 上移至 hooks 初始化区（use-before-define）                                                                   |
| `docs/check.md`                                                          | C36/C37 两行 7 维度 ⏳ → ✅                                                                                                                                     |

---

## 六、验证命令

```bash
# 单元测试（41 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/checkbox.spec.ts test/specs/components/checkbox-group.spec.ts test/specs/components/checkbox-card.spec.ts
# → checkbox-card 9 | checkbox 18 | checkbox-group 14 = 41 passed

# 族系回归（checkbox 41 + autocomplete 21 + combobox 23 + select 16 = 101 项通过）
cd packages/ui && pnpm exec vp test run test/specs/components/checkbox.spec.ts test/specs/components/checkbox-group.spec.ts test/specs/components/checkbox-card.spec.ts test/specs/components/autocomplete.spec.ts test/specs/components/combobox.spec.ts test/specs/components/select.spec.ts

# 全量单测（94 文件，icon.spec 4 项为 HEAD 既有环境性失败，其余 1087 项通过）
cd packages/ui && pnpm exec vp test run test/specs/components

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过

# Lint（顺带修复 autocomplete 既有 use-before-define 后全绿）
pnpm lint
# → vp lint 0 warnings 0 errors；eslint --ext .vue 0 errors
```

---

## 七、遗留增强项

- **独立 `indeterminate` prop（D2-11）**：Ant Design/Element Plus/Mantine/Naive UI 均提供独立 `indeterminate` prop（且多为 `v-model:indeterminate` 半控），当前 SoybeanUI 需以 `modelValue="indeterminate"` 传入三态。可考虑新增 `indeterminate` prop 与 `v-model:indeterminate` 事件，半选状态与选中值解耦。非阻塞，可排期。
- **`button` variant（D2-11）**：Ant Design/Element Plus 提供 button 样式复选框（`variant="button"` / 边框组形态），SoybeanUI 仅 card 变体。记入 [roadmap.md](../roadmap.md) 对标增强项。
- **全选/半选联动辅助（D2-11）**：Ant Design/Naive UI 常见「全选 Checkbox + 子项组 + 半选自动联动」组合，当前需消费方自行组合 `modelValue="indeterminate"` 与组。可提供 `checkAll` 组合子（如 `CheckboxGroupCompact` 扩展 `allValue`/`onAllChange`）。非阻塞。
- **`isFormControl` 语义对齐（D1-08 备查）**：当前为「元素自身含 `form` 类」，Radix 为 `closest('form')`。若改为后者，SForm 内字段可自动识别（无需给字段根传 `form` 类）；属跨 20 个表单组件的共享行为决策，建议在表单类（C53 form）轮次统一评估。
- **`icon.spec.ts` 4 项环境性失败（HEAD 既有）**：iconify SVG 数据本地缺失导致 `wrapper.find('svg')` 为空；建议补全 icon 数据源后单独修复，与本次无关。
