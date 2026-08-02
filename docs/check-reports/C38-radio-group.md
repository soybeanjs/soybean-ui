# C38 `radio-group` 检查优化报告

> **组件编号：** C38（`radio-group`）
> **组件名称：** `SRadioGroup` / `SRadioGroupCard`（headless 基座：`RadioGroupRoot`（`useControllableState` + `RovingFocusGroup`）→ `RadioGroupItem`（选中派生 + `VisuallyHiddenInput` 表单代理）→ `RadioGroupControl`（`Button` 基座 + `role="radio"` + `aria-checked`/`data-state`，聚焦派生选中）→ `RadioGroupIndicator`（`usePresence` 条件挂载）→ `RadioGroupLabel`（`for`/id 关联）；Compact 聚合：`RadioGroupCompact`/`RadioGroupCardCompact`；`scv()` 配方 `radioGroupVariants`/`radioGroupCardVariants`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-05

---

## 一、执行摘要

对 `radio-group` 族（radio-group / radio-group-card）完成全维度审计。headless 基座完整：`RadioGroupRoot`（`useControllableState(modelValue)` 受控/非受控 + `RovingFocusGroup` 方向键导航 + `VisuallyHiddenInput` 表单代理）→ `RadioGroupItem`（`checked` 派生 + 条目级隐藏代理）→ `RadioGroupControl`（`Button` 基座 + `role="radio"` + `aria-checked`/`data-state` 双通道反射，`onFocus` 箭头键派生 click 选中，`radio.select` 可取消自定义事件）→ `RadioGroupIndicator`（`usePresence` 条件挂载）→ `RadioGroupLabel`（`for` → 控件 `id`）。Compact 聚合 2 层（`RadioGroupCompact` → `RadioGroupCardCompact`，card 变体含 icon/description 内容槽）。styled 层 `radioGroupVariants`/`radioGroupCardVariants` 6 尺寸 + 8 颜色 + dot/outline 变体；UI 层 2 个薄包装（`provideRadioGroupUi`/`provideRadioGroupCardUi` 链式注入）。

**发现并修复 3 项真实缺陷 + 扩展单测 7 → 25 项 + 文档按 9 节 Recommended structure 重构：**

1. **Major (D1-16 键盘可操作性) Enter 键无法选中**：[radio-group-control.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/radio-group/radio-group-control.vue) 模板为 `@keydown.enter.prevent`（无处理函数）——既阻止了 button 原生 click，又没有替代逻辑，Enter 键永远无法选中 radio（WAI-ARIA radio 模式要求 Enter/Space 均可选择）。修复：改为 `@keydown.enter.prevent="onClick"`，与 checkbox 族系一致；`onClick` 参数泛化为 `MouseEvent | KeyboardEvent`，`RadioSelectEvent.originalEvent` 类型同步放宽。
2. **Major (D7-04 内存泄漏) 卸载时 document 监听器残留**：`onBeforeMount` 中执行 `document.removeEventListener`——挂载前移除是空操作，`onMounted` 添加的 keydown/keyup 全局监听器在组件卸载后永不移除。修复：改为 `onBeforeUnmount`。
3. **Major (D1-16 运行时崩溃) 箭头键选中时 `click` 不是函数**：`controlElement` ref 绑定在 `Button` 组件上（script setup 组件默认不暴露 DOM），`controlElement.value?.click()` 命中组件实例 proxy——无 `click` 方法，真实浏览器中方向键聚焦触发 `onFocus` 时抛 `TypeError: controlElement.value?.click is not a function`（happy-dom 测试暴露）。修复：改用 `controlElement.value?.$el?.click()` 命中原生 button 元素。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 受控/非受控闭环（`useControllableState`，D3-04）；`role="radiogroup"` + `role="radio"` + `aria-checked`/`data-state` 双通道反射（D1-08）；组内 `RovingFocusGroup` 方向键导航 + Enter/Space 选择（D1-16，**修复 Enter 键 + 聚焦派生 click 崩溃**）；`RadioGroupLabel` `for` ↔ 控件 `id`（D1-14）；`VisuallyHiddenInput` 表单代理（name/value/required/disabled）；Compact 聚合全部下沉 headless，UI 包装器零 `v-for`/零默认内容装配（D1-12）；headless 无样式；`useOmitProps` 均含 `class`（D1-10）；recipe 首行 `// @unocss-include`，slot 键与 `UiSlot` 完全一致（D1-09） |
| D2 行业对标 |  ✅  | 对标 Ant Design/Element Plus/Mantine/Naive UI/shadcn `Radio`/`RadioGroup`：单选互斥、roving-focus 键盘、受控/非受控、表单代理对齐；卡片变体为差异化工项；遗留增强：`button` variant、`Radio.Button` 组合子、校验错误关联（见「遗留增强项」）                                                                                                                                                                                                                                                                                                                               |
| D3 API 设计 |  ✅  | 受控/非受控（`useControllableState`，`v-model` + `defaultValue` 双模式，D3-04）；`modelValue`/`value`/`name`/`required`/`disabled`/`orientation`/`loop`/`dir` 命名对齐主流（D3-01）；`as`/`asChild`（Control/Indicator）+ `ui`/`class`/slot 四扩展点（D3-08）；`*CompactProps`/`*CompactEmits`/`*CompactSlots` 类型族完整导出；UI 层 `S` 前缀（D3-09）                                                                                                                                                                                                                     |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；props 全 interface（D4-03）；`DefinedWithBooleanValue`/`UiClass` 复用共享类型（D4-05）；`RadioGroupUiSlot`/`RadioGroupCardUiSlot` 与 recipe slot 一一对应；`RadioSelectEvent.originalEvent` 放宽为 `MouseEvent \| KeyboardEvent`（JSDoc 同步）                                                                                                                                                                                                                                                                                                      |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；context 值全响应式（`transformPropsToContext` + `ComputedRef`/`ShallowRef`，D1-05）；模板无 `props.xxx`（D5-14）；生命周期钩子位于 script 末段（D5-12，修复 `onBeforeMount` → `onBeforeUnmount`）                                                                                                                                                                                                                                                                                                                                                        |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/Component family/Demos/API/Notes/FAQ），含架构对标表 + 运行时注意事项 + 4 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                                                                                                                                                                                                           |
|   D7 其他   |  ✅  | 单测 7 → 25 项全通过（新增 Enter 键选中/ArrowDown roving-focus 移动+选中/受控非受控 defaultValue/受控更新/组根 disabled 全禁/form 代理 name 值/label for-id 关联/`ui.control` 覆盖/aria-orientation/data-state/axe，card 单组件 8 项）；axe 0 违规（group + card 双形态）；无独立浏览器 e2e 文件，D7-19/20 由 happy-dom 单测覆盖（axe + 交互 + 键盘），与 checkbox/switch 族系一致（非阻塞）                                                                                                                                                                               |

---

## 二、行业对标矩阵

| 能力                    | SoybeanUI | Ant Design `Radio` | Element Plus `Radio` | Mantine `Radio` | Naive UI `Radio` | shadcn `RadioGroup` |
| :---------------------- | :-------: | :----------------: | :------------------: | :-------------: | :--------------: | :-----------------: |
| headless/styled 分离    |    ✅     |         —          |          —           |        —        |        —         |         ✅          |
| 单选互斥                |    ✅     |         ✅         |          ✅          |       ✅        |        ✅        |         ✅          |
| Roving-focus 键盘导航   |    ✅     |         ✅         |          ✅          |       ✅        |        ✅        |         ✅          |
| 受控/非受控             |    ✅     |         ✅         |          ✅          |       ✅        |        ✅        |         ✅          |
| 卡片变体（icon/描述）   |    ✅     |         —          |          —           |        —        |        —         |          —          |
| `button` variant        |    ➕     |         ✅         |          ✅          |        —        |        —         |          —          |
| `Radio.Button` 组合子   |    ➕     |         ✅         |          —           |        —        |        —         |          —          |
| 表单代理 / `name` 提交  |    ✅     |         ✅         |          ✅          |       ✅        |        ✅        |         ✅          |
| axe 零违规（组 + 卡片） |    ✅     |         —          |          —           |        —        |        —         |          —          |

---

## 三、发现的问题与处理

### 3.1 Major — Enter 键无法选中 radio（D1-16 键盘可操作性）

**问题：** [radio-group-control.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/radio-group/radio-group-control.vue) 模板：

```vue
@keydown.enter.prevent
```

`prevent` 阻止了 button 元素 Enter 键的原生 click（选中入口），但**没有绑定任何处理函数**——Enter 键既不触发选择也没有替代逻辑。对比 checkbox 族系 `@keydown.enter.prevent="onClick"`。WAI-ARIA radio 模式（APG）要求 Enter 与 Space 均可选中聚焦项；Space 依赖 button 原生行为可用，Enter 被显式破坏。

**处理：** 对齐 checkbox 族系模式：

```vue
@keydown.enter.prevent="onClick"
```

`onClick` 参数由 `MouseEvent` 放宽为 `MouseEvent | KeyboardEvent`（`stopPropagation` 两类事件均具备）；[types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/radio-group/types.ts) 中 `RadioSelectEvent.originalEvent` 同步放宽为 `MouseEvent | KeyboardEvent`，键盘选择与鼠标选择共用同一 `radio.select` 事件契约。

**验证：** 新增单测「selects the focused radio on Enter key」——`trigger('keydown', { key: 'Enter' })` 后 `update:modelValue` 发出 `option-2`。

### 3.2 Major — `onBeforeMount` 移除监听器导致卸载泄漏（D7-04）

**问题：** 原代码：

```ts
onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
});

onBeforeMount(() => {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
});
```

`onBeforeMount` 在挂载**前**执行，此时监听器尚未添加，`removeEventListener` 是空操作；组件卸载时监听器从未移除 → 每个卸载后的 radio 控件仍持有 2 个全局 document 监听器，随组内条目数线性泄漏。

**处理：** `onBeforeMount` → `onBeforeUnmount`，与 Radix 模式的卸载清理语义一致。

### 3.3 Major — 箭头键选中时 `click` 不是函数（D1-16 运行时崩溃）

**问题：** `controlElement` 通过 `useTemplateRef` 绑定到 `Button` 组件（script setup 组件默认 close，不暴露 DOM 元素）。`onFocus` 的聚焦派生选中：

```ts
controlElement.value?.click();
```

`controlElement.value` 是 Button 的组件实例 proxy——没有 `click` 方法。真实浏览器中方向键聚焦触发 `onFocus` 时抛 `TypeError: controlElement.value?.click is not a function`，箭头键选中功能实际不可用（happy-dom 测试环境先行暴露，`$el` 未挂载时同样崩溃）。

**处理：** 经组件实例的 `$el` 命中原生 button：

```ts
const controlElement = useTemplateRef<{ $el?: HTMLButtonElement }>('controlElement');
// ...
controlElement.value?.$el?.click();
```

**验证：** 新增单测「moves focus with ArrowDown and checks the focused radio」——方向键移动焦点后经 `$el.click()` 发出 `update:modelValue`，同时消除 unhandled error。

### 3.4 D7-11 — 单测覆盖不足（已扩展 7 → 25 项）

**问题：** 原 [radio-group.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/radio-group.spec.ts) 仅 7 项，未覆盖键盘交互（Enter/方向键）、受控/非受控、组根 disabled、表单代理、label 关联、`ui` 覆盖、orientation、data-state；card 形态无独立测试。

**处理：** 扩展至 **25 项**，全部通过：

```bash
✓ test/specs/components/radio-group.spec.ts (17 tests)
✓ test/specs/components/radio-group-card.spec.ts (8 tests)
```

> 覆盖要点：Enter 键选中（D1-16，验证修复）；ArrowDown roving-focus 移动焦点 + 聚焦派生选中（D1-16，验证修复）；`defaultValue` 非受控 + 受控 `modelValue` 更新重渲染（D3-04）；组根 `disabled` 全禁（D3-04）；form 代理——`class="form"` 根下 `name` 渲染隐藏输入且 value = 当前值；label `for` = 控件 `id`（D1-14）；`ui.control` 覆盖（D7-15）；`aria-orientation`（D1-08）；`data-state` checked/unchecked（D1-08）；card 单组件（label/description 渲染、选中、点击切换、禁用、`ui.content` 覆盖、axe）。

### 3.5 说明 — 非缺陷项（跨组件既有模式）

- **item 级表单代理**：`RadioGroupItem` 的隐藏 radio input 以 item 元素自身 `classList` 含 `form` 类为渲染前提（`isFormControl` 既有语义）；组内 item 元素无该类，故表单提交由 root 级隐藏 input（value = 当前值）承载。与 checkbox/switch 族系共享同一 `isFormControl` 实现，语义对齐 Radix `closest('form')` 属 C53 form 轮次的跨组件决策，不在 C38 改动。
- **`@click.stop` + formControl `stopPropagation`**：既有双保险模式（防止原生 radio input 冒泡重复触发），保留。

---

## 四、架构与模式要点

### 聚焦派生选中（键鼠归一）

`RadioGroupControl` 通过 `document` 级 `keydown` 监听跟踪 `isArrowKeyPressed`（真实箭头键按下 → 置位，`keyup` 复位）；`RovingFocusGroup` 方向键移动焦点时，控件 `onFocus` 内 `setTimeout(0)` 检查该标志，命中则 `$el.click()` 提交——**方向键选中与鼠标/Enter 共用同一条 `radio.select` → `update:modelValue` 链路**，保证表单 change 事件与自定义事件语义一致（D1-16 验收）。修复后的 `$el.click()` 使该机制在真实浏览器可用。

### Compact 聚合下沉与 ui 上下文链

2 层 Compact（`RadioGroupCompact` → `RadioGroupCardCompact`）全部持有条目迭代、默认内容（label/indicator/control 装配）与 id 生成（`getItemId`），UI 层 2 个包装器仅做 variant 计算 + `provideRadioGroupUi`/`provideRadioGroupCardUi` 注入 + props/事件转发（D1-12）。`provideRadioGroupCardUi` 内部链式调用 `provideRadioGroupUi`，使卡片内容/控件/指示器共享同一 ui 映射。

---

## 五、变更文件清单

| 文件                                                                   | 变更类型                                                                                                                                                                                                                                         |
| :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/radio-group/radio-group-control.vue` | **修复 ×3**：① `@keydown.enter.prevent` → `@keydown.enter.prevent="onClick"`（Enter 键选中）；② `onBeforeMount` → `onBeforeUnmount`（卸载清理）；③ `controlElement.value?.click()` → `controlElement.value?.$el?.click()`（组件实例 → 原生元素） |
| `packages/headless/src/components/radio-group/types.ts`                | `RadioSelectEvent.originalEvent` 放宽为 `MouseEvent \| KeyboardEvent`（JSDoc 同步）                                                                                                                                                              |
| `packages/ui/test/specs/components/radio-group.spec.ts`                | 单测 7 → 17 项（Enter/ArrowDown 键盘、受控/非受控、组根 disabled、form 代理、label for-id、ui 覆盖、aria-orientation、data-state、axe）                                                                                                          |
| `packages/ui/test/specs/components/radio-group-card.spec.ts`           | **新增** 8 项（label/description 渲染、选中态、点击切换、禁用、ui 覆盖、axe）                                                                                                                                                                    |
| `apps/docs/src/docs/en/components/radio-group.md`                      | **重构** 4 节 → 9 节 Recommended structure（含 Component family、架构对标表、FAQ）                                                                                                                                                               |
| `apps/docs/src/docs/zh-CN/components/radio-group.md`                   | **重构** 4 节 → 9 节 Recommended structure（与 en 完全对齐）                                                                                                                                                                                     |
| `docs/check.md`                                                        | C38 行 7 维度 ⏳ → ✅；批次 1 记录表追加 C38 行；第 1 轮进度 6/8 → 7/8                                                                                                                                                                           |

---

## 六、验证命令

```bash
# 单元测试（25 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/radio-group.spec.ts test/specs/components/radio-group-card.spec.ts
# → radio-group 17 | radio-group-card 8 = 25 passed

# 族系回归（radio-group 25 + checkbox 41 + autocomplete 21 + combobox 23 + select 16 = 126 项通过）
cd packages/ui && pnpm exec vp test run test/specs/components/radio-group.spec.ts test/specs/components/radio-group-card.spec.ts test/specs/components/checkbox.spec.ts test/specs/components/checkbox-group.spec.ts test/specs/components/checkbox-card.spec.ts test/specs/components/autocomplete.spec.ts test/specs/components/combobox.spec.ts test/specs/components/select.spec.ts

# 全量单测
cd packages/ui && pnpm exec vp test run test/specs/components

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过

# Lint
pnpm lint
# → vp lint 0 warnings 0 errors；eslint --ext .vue 0 errors
```

---

## 七、遗留增强项

- **`button` variant（D2-11）**：Ant Design/Element Plus 提供 button 样式单选框（`variant="button"` / 边框组形态），SoybeanUI 仅 dot/outline。记入 [roadmap.md](../roadmap.md) 对标增强项。
- **`Radio.Button` 组合子（D2-11）**：Ant Design 提供 `Radio.Button` 分组形态（标签式单选），当前需消费方自行用 `SButton` + 选中态组合。
- **校验错误关联（D2-11）**：Ant Design/Element Plus 支持 `aria-describedby` 错误提示关联；待 SForm（C53）表单校验落地后统一评估 `aria-invalid`/`aria-describedby` 接入。
- **`isFormControl` 语义对齐（D1-08 备查）**：当前为「元素自身含 `form` 类」，Radix 为 `closest('form')`；属跨 20 个表单组件的共享行为决策，建议在 C53 form 轮次统一评估。
