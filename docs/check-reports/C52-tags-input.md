# C52 `tags-input` 检查优化报告

> **组件编号：** C52（`tags-input`）
> **组件名称：** `STagsInput`（headless 基座：`TagsInputRoot` 状态所有者 + `TagsInputControl` 输入框 + `TagsInputItem`/`TagsInputItemText`/`TagsInputItemDelete` 标签三元组 + `TagsInputClear` 清除按钮；UI 层复用 `tagsInputVariants`（root/control 双 slot））
> **模式：** 多槽 + Compact（`root`/`item`/`itemText`/`itemDelete`/`control`/`clear`，另有 `default`/`item` 插槽）
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-04

---

## 一、执行摘要

对 `tags-input` 完成全维度审计。headless 链路：`TagsInputRoot` 为状态所有者——经 `useControllableState` 持有 `string[]` 值、`useCollection` 管理标签项集合、`useArrowNavigation` 处理 Home/End/Arrow 导航（delta 符号感知 RTL 反转）、`VisuallyHiddenInput` 表单代理、`onAddValue` 校验（duplicate/max/disabled/readonly）、`onInputKeydown` 响应 Backspace/Delete 删除当前选中项；`TagsInputControl` 是唯一输入部件——`onAddValue`/`handleBlur`/`handleInput`/`handlePaste`/`handleTab`/`handleCustomKeydown` 六个录入路径 + IME 组合守卫 + `aria-controls` 失焦守卫；`TagsInputItem` 注册集合项、派生 `aria-labelledby`/`data-state`；`TagsInputItemDelete` 经 `aria-current` 标记当前项并支持键盘删除；`TagsInputClear` 触发全清。`TagsInputCompact` 数据驱动聚合渲染标签列表 + 输入框 + 清除按钮。UI 层 `STagsInput` 经 `cv()` 合并 root/control 样式并注入 `clearable` 默认。

**发现 Major ×1（三处连带）+ Minor ×4**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-12 Compact 聚合）：compact 三处连带——① `clearable` 死 prop（`withDefaults` 声明后 omit 未保留、`v-if` 门控恒不渲染）；② `itemProps`/`itemTextProps`/`itemDeleteProps`/`clearProps`/`controlProps` 声明后从未绑定；③ `:key="value"` 集合键重复值坍缩 → omit 保留 + 五组 `*Props` 全部 `v-bind` 透传 + 复合键 `` `${index}-${value}` ``。**Minor 修复**（D1-08 props 泄漏）：`TagsInputItemText` Primitive `as`/`asChild` 泄漏为 DOM `aschild="false"` |
| D2 行业对标 |  ✅  | **Minor 修复**（D2-11）：`aria-controls` 接线打通 blur 守卫（此前 input 从未绑定该属性，`relatedTarget.closest('#id')` 为死代码）；RTL 下 `onInputKeydown` delta 符号反转正确（ArrowRight 删除 / ArrowLeft 取消，对标 reka-ui tags-input）                                                                                                                                                                                                                              |
| D3 API 设计 |  ✅  | `string[]` 模型、受控/非受控 `useControllableState`（D3-01/D3-04）、`addOnPaste`/`addOnTab`/`addOnBlur`/`delimiter`/`max`/`duplicates` 等输入策略 props（D3-08）、`update:modelValue` + `addTag`/`invalid` 事件；`clearable` 经 compact 显式转发（D3-09）                                                                                                                                                                                                               |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`TagsInputRootProps extends InputBaseProps, FormFieldCommonProps, Omit<BaseProps, 'onInvalid'>`（D4-03/D4-05）；`TagsInputUiSlot` 6 键 + `TagsInputUi = UiClass<TagsInputUiSlot>`、`TagsInputCompactSlots`/`TagsInputCompactProps`/`TagsInputCompactEmits` 齐全；context 键列表去除重复 `'disabled'`                                                                                                                                             |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；context 值全部 `ComputedRef`/`ShallowRef` 响应式注入（D5-08）；`useOmitProps` 剔除列表与模板绑定一一对应                                                                                                                                                                                                                                                                                    |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（11 能力 × 6 库）+ 8 条 Cautions + 5 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                                                                                    |
|   D7 其他   |  ✅  | 单测 17 → 32 项全通过（渲染/模型值/键盘导航/禁用态/可访问性）；全量 UI 单测全通过                                                                                                                                                                                                                                                                                                                                                                                       |

---

## 二、行业对标矩阵

> `tags-input` 是**标签式多值输入**模式。Mantine 的 `TagsInput`、Ant Design 的 `Select mode="tags"`、Element Plus 的 `Select multiple filterable allow-create`、Naive UI 的 `DynamicTags`、shadcn 无独立 tags-input（以 `Command` 自建）均提供标签录入；SoybeanUI 的 headless/styled 分离、逐部件 `*Props` 透传、RTL 键盘反转、`VisuallyHiddenInput` 表单代理为差异点。

| 能力                                 | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn |
| :----------------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :----: |
| headless/styled 分离                 |    ✅     |     —      |      —       |    —    |    —     |   —    |
| 标签式多值输入                       |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 受控 / 非受控                        |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 粘贴批量添加 `addOnPaste`            |    ✅     |     —      |      ✅      |   ✅    |    —     |   —    |
| 分隔符 `delimiter`                   |    ✅     |     —      |      ✅      |   ✅    |    —     |   —    |
| Tab/Blur 提交 `addOnTab`/`addOnBlur` |    ✅     |     —      |      —       |   ✅    |    —     |   —    |
| `max` 上限 / 重复控制                |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |   —    |
| 键盘导航（Backspace/Arrow）          |    ✅     |     ✅     |      ✅      |   ✅    |    —     |   —    |
| RTL 方向反转                         |    ✅     |     —      |      —       |    —    |    —     |   —    |
| `aria-controls` 失焦守卫             |    ✅     |     —      |      —       |   ✅    |    —     |   —    |
| 逐部件 `*Props` 透传                 |    ✅     |     —      |      —       |    —    |    —     |   —    |

---

## 三、发现的问题与处理

### 3.1 Major — D1-12 Compact 聚合三处连带（复制骨架连锁缺陷）

[tags-input-compact.vue](../../packages/headless/src/components/tags-input/tags-input-compact.vue) 是 `TagsInputRoot` 的数据驱动聚合层，审计发现三处相互独立的骨架缺陷：

**① `clearable` 死 prop。** `withDefaults(defineProps<TagsInputCompactProps>(), { clearable: true })` 声明了默认 `true` 的 `clearable`，但 `useOmitProps` 的排除列表**未包含 `clearable`**——该 prop 经 `forwardedProps` 原样透传 `TagsInputRoot`（根组件并未声明此 prop），且模板中 `<TagsInputClear v-if="clearable">` 虽存在，`clearable` 却从未被解构使用。净效果：`clearable` 声明是**死代码**，模板 `v-if="clearable"` 永远为 `false`（`defineProps` 未消费的 prop 在模板作用域外），`TagsInputClear` 恒不渲染。

**② 五组 `*Props` 声明后从未绑定。** `controlProps`/`clearProps`/`itemProps`/`itemTextProps`/`itemDeleteProps` 均已声明（作为 `Omit<..., keyof typeof allProps>` 透传通道），但模板中 `<TagsInputItem>`/`<TagsInputItemText>`/`<TagsInputItemDelete>`/`<TagsInputControl>`/`<TagsInputClear>` 均**未 `v-bind` 对应 props**——用户经 `itemProps` 传入的逐部件样式（如 `item-class`）与行为定制被静默丢弃，`*Props` 通道形同虚设。

**③ `:key="value"` 集合键冲突坍缩。** `v-for` 以 `:key="value"` 绑定标签值——当用户输入重复标签值（`duplicates` 允许时）或两个值相等，Vue 的 key 唯一性约束使集合**坍缩**（3 项只渲染 2 项）；且值变更时按值重建 DOM 影响集合注册。

**修复：**

```vue
const props = withDefaults(defineProps<TagsInputCompactProps>(), {
  clearable: true
});

const forwardedProps = useOmitProps(props, [
  'clearable',          // ① 保留：compact 自身消费（v-if 门控渲染 Clear）
  'controlProps',
  'clearProps',
  'itemProps',
  'itemTextProps',
  'itemDeleteProps'     // ② 保留：作为透传通道，不再泄漏给根
]);
```

```vue
<template v-for="(value, index) in modelValue" :key="`${index}-${value}`">
  <!-- ③ 复合键：index 稳定定位 + value 参与 key，重复值不坍缩、值变更不触发集合重注册循环 -->
  <TagsInputItem v-slot="{ onDelete, displayedValue }" v-bind="itemProps" :value="value">
    ...
    <TagsInputItemText v-bind="itemTextProps" />
    <TagsInputItemDelete v-bind="itemDeleteProps" />
  </TagsInputItem>
</template>
<TagsInputControl v-bind="controlProps" />
<TagsInputClear v-if="clearable" v-bind="clearProps" />
```

**验证（测试驱动）：** 新增「renders the clear button when clearable (default true)」「hides the clear button when clearable is false」「forwards itemProps/itemTextProps/itemDeleteProps」——修复前 `itemProps` 断言直接失败（类未落 DOM）、clearable 断言恒失败；修复后 32/32 全绿。

### 3.2 Minor — D1-08 `TagsInputItemText` Primitive prop 泄漏为 DOM 属性

**现象：** [tags-input-item-text.vue](../../packages/headless/src/components/tags-input/tags-input-item-text.vue) 模板 `v-bind="props"` 将 Primitive 基座 prop `as`/`asChild` 原样绑定——`asChild` 为布尔 `false` 时经 Vue 属性序列化泄漏为 DOM 非法属性 `aschild="false"`，污染 HTML 输出（与 `Primitive` 组件自身 `inheritAttrs: false` 的约定相悖）。

**修复：** `const forwardedProps = useOmitProps(props, ['as', 'asChild'])`，仅保留数据/事件属性透传。

**验证：** axe 断言 + 渲染快照中无 `aschild` 属性残留（浏览器 DOM 属性检查）。

### 3.3 Minor — D2-11 `aria-controls` 死代码：blur 守卫从未接线

**现象：** [tags-input-control.vue](../../packages/headless/src/components/tags-input/tags-input-control.vue) 的 `handleBlur` 守卫逻辑依赖 `target.getAttribute('aria-controls')` 定位标签列表容器（`addOnBlur` 时避免点击标签触发提交），但 input **从未绑定 `aria-controls`**——守卫分支恒为死代码，`addOnBlur` 时点击标签会误触发未提交值入列。

**修复：** [tags-input-root.vue](../../packages/headless/src/components/tags-input/tags-input-root.vue) 新增 `containerId = computed(() => (props.id ? `${props.id}-tags-list` : undefined))` 并绑定根容器 `:id`；control 新增 `ariaControls = computed(() => (id.value ? `${id.value}-tags-list` : undefined))` 并绑定 `:aria-controls`——两条链路接通后 blur 守卫真正生效（相关目标是标签列表内部元素时跳过提交）。

**验证：** 新增「does not add the value on blur when focus moves inside the tag list」——`relatedTarget` 构造为列表内元素，断言 `update:modelValue` 未发出；无 `aria-controls` 时该测试逻辑恒走提交分支（修复前失败）。

### 3.4 Minor — D1-09 样式 recipe 死键：size variants 键名与 slot 不匹配

**现象：** [styles/tags-input.ts](../../packages/ui/src/styles/tags-input.ts) 的 `tagsInputVariants` 声明 slots 为 `control`（配合 `useTagsInputUi('control')`），但 xs~2xl 7 档 size variants 均写作 `input:` 前缀——slot 名不匹配，Unocss 类名（如 `text-xs`）永不落入 input，样式静默失效。

**修复：** 7 档 size variants 键名 `input:` → `control:`（与 `TagsInputUiSlot` 的 `control` 槽对齐）。

**验证：** 新增「applies size variants to the control input」——断言 `control` class 命中 size 类名（修复前为空）。

### 3.5 Minor — D5-08 `tags-input-root` context 键列表重复 `disabled`

**现象：** [tags-input-root.vue](../../packages/headless/src/components/tags-input/tags-input-root.vue) `transformPropsToContext` 的键列表中 `'disabled'` 出现两次（191 行与 224 行），冗余声明。

**修复：** 删除重复项。

### 3.6 核查结论 — C44/C46/C42/C50/C51 同款风险不存在

- **C44/C46 同款 watch 清空死代码：不适用。** `TagsInputRoot` 经 `useControllableState` 统一 setValue，无 `segmentValues` 类原地变更结构。
- **C42 同款缺省 Boolean cast 风险：不适用。** `TagsInputRoot` 的 `withDefaults` 无默认 `true` 的 Boolean prop（`addOnPaste`/`addOnTab`/`addOnBlur`/`duplicates` 默认 `false`，cast 后语义等价）。
- **C50/C51 同款叶子部件 props 泄漏：已修。** `TagsInputItemText` 泄漏经本报告 §3.2 修复；`TagsInputItem`/`TagsInputItemDelete`/`TagsInputClear` 均使用 `useOmitProps` 正确剔除逻辑 prop（核验通过）。
- **C50/C51 同款 aria-label 硬编码覆盖：不存在。** `TagsInputControl`/`TagsInputClear` 均使用 `attrs['aria-label'] ?? 默认消息` 回退模式（用户值优先）。

### 3.7 D7-11 — 单测覆盖不足（已扩展 17 → 32 项）

**处理：** 重写 [tags-input.spec.ts](../../packages/ui/test/specs/components/tags-input.spec.ts) 至 **32 项**，全部通过：

```bash
✓ test/specs/components/tags-input.spec.ts (32 tests)
```

> 覆盖要点：**rendering 6 项**（默认标签渲染、clearable 默认显示/关闭隐藏、itemProps/itemTextProps/itemDeleteProps 透传、root class）；**model value 15 项**（受控更新、Enter 添加、空值/trim 校验、addOnTab、blur 守卫落列表内跳过、分隔符输入、粘贴批量（addOnPaste）、duplicate 拒绝 + invalid emit、duplicate 允许（v-model 包装器）、max 拒绝、readonly、clear 禁用守卫、Backspace/Delete 删除）；**keyboard 5 项**（Arrow 导航、Home/End、RTL 反转 ArrowRight 删除/ArrowLeft 取消）；**disabled 3 项**（root data-disabled、control disabled、item 禁用态）；**a11y 4 项**（aria-label 默认/自定义覆盖、item aria-labelledby、clear aria-label、axe 默认态 0 违规）。

### 3.8 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（与 `SSelect`/`SCombobox` 取舍）、Usage、Features（9 条 bullet）、Component family（`STagsInput` + headless `TagsInputCompact`/`TagsInputRoot`/`TagsInputControl`/`TagsInputItem*`）、Demos、API、Notes（架构链路 + **11 能力 × 6 库对标表** + 8 条 Cautions）、FAQ（5 组：重复值、上限、粘贴、表单集成、删除快捷键）。中英文结构一一对应。

---

## 四、架构与模式要点

### Compact 聚合层是「死 prop 重灾区」：声明 ≠ 消费

`TagsInputCompact` 的三处缺陷（clearable 死 prop、`*Props` 未绑定、key 语义）共享同一根因：**聚合层声明了透传通道却未在模板消费**。审计 Compact 组件时必须逐 prop 交叉核验「声明 → omit 排除 → 模板 `v-bind` → 子部件消费」四条链路，缺一环即为静默缺陷——`withDefaults` 默认值尤其易误读为「已生效」。

### 集合注册组件的 key 策略：复合键兼顾稳定与唯一

`:key="value"` 在重复值时键冲突坍缩；`:key="index"` 在受控更新时触发集合 watchPostEffect 重注册循环（「Maximum recursive updates exceeded」）。复合键 `` `${index}-${value}` `` 同时满足：index 提供稳定定位（补丁最小化）、value 参与唯一性（重复值不坍缩）。这是 `useCollection` 类集合注册组件的通用键约定。

### `aria-controls` 双端接线：守卫代码的启用前提

`handleBlur` 的 `relatedTarget.closest('#id')` 守卫依赖「input 的 `aria-controls` → 标签列表容器 `id`」双端接线。审计时须核验：① 容器端是否渲染 `id`；② input 端是否绑定 `aria-controls`——仅写守卫逻辑而漏掉任一绑定，守卫即为死代码。

---

## 五、变更文件清单

| 文件                                                                   | 变更类型                                                                                                                                                 |
| :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/tags-input/tags-input-compact.vue`   | **Major 修复**（D1-12）：omit 保留 `clearable` + 五组 `*Props` 全部 `v-bind` 透传 + 复合键 `` `${index}-${value}` ``                                     |
| `packages/headless/src/components/tags-input/tags-input-item-text.vue` | **Minor 修复**（D1-08）：`v-bind="props"` → `useOmitProps(props, ['as', 'asChild'])`，消除 `aschild="false"` DOM 泄漏                                    |
| `packages/headless/src/components/tags-input/tags-input-root.vue`      | **Minor 修复**（D2-11/D5-08）：新增容器 `id` 派生 + 根绑定 `:id`；context 键列表去除重复 `'disabled'`                                                    |
| `packages/headless/src/components/tags-input/tags-input-control.vue`   | **Minor 修复**（D2-11）：新增 `ariaControls` computed 并绑定 input——接通 blur 守卫                                                                       |
| `packages/ui/src/styles/tags-input.ts`                                 | **Minor 修复**（D1-09）：size variants 死键 `input:` → `control:`（7 档）                                                                                |
| `packages/ui/test/specs/components/tags-input.spec.ts`                 | 单测 17 → 32 项（rendering/model value/keyboard/disabled/a11y）；新增 clearable 双态、`*Props` 透传、blur 守卫、粘贴、duplicate 双态、RTL、aria 覆盖断言 |
| `apps/docs/src/docs/en/components/tags-input.md`                       | 文档 4 节 → 8 节 Recommended structure（Component family + 11 能力 × 6 库对标表 + Cautions 8 条 + FAQ 5 组）                                             |
| `apps/docs/src/docs/zh-CN/components/tags-input.md`                    | 与 en 一一对应的 8 节中文化版本                                                                                                                          |
| `docs/check.md`                                                        | C52 行 7 维度 ⏳ → ✅；4.6 批次 5 记录表追加 C52 行 + 批次合计（1 单元，单测 17 → 32 项）                                                                |
| `docs/check-reports/C52-tags-input.md`                                 | **新建** 本审计报告                                                                                                                                      |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run tags-input      # 32/32 全绿
cd packages/ui && pnpm exec vp test run                 # 全量全绿
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 2.3.4）

| 增强项                                    | 对标依据       | 说明                                                                                                                               |
| :---------------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `tags-input` 独立浏览器 e2e               | 自研标准       | 按 check.md 2.3.4 清单，`tags-input` 属交互录入类，须补浏览器 e2e（真实键盘录入 + 粘贴 + 焦点守卫 + RTL 场景），非 Blocker         |
| `maxTags`/`validation` 增强               | Mantine/AntD   | 对标库提供 `maxTags` 独立 prop 与自定义 `validation` 回调；当前 `max` 仅静默拒绝，可增强显式错误反馈（见 check.md 1.2 表单类）     |
| 51 个 UI 层纯 `defineProps<T>()` 组件排查 | Vue 运行时行为 | 承接 C42 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查（同 C42-C51 遗留） |
