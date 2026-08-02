# C39 `switch` 检查优化报告

> **组件编号：** C39（`switch`）
> **组件名称：** `SSwitch`（headless 基座：`SwitchRoot`（`useControllableState` + `VisuallyHiddenInput` 表单代理）→ `SwitchControl`（`Button` 基座 + `role="switch"` + `aria-checked`/`data-state`）→ `SwitchThumb`（`Primitive` + `data-state`/`data-disabled`）；Compact 聚合：`SwitchCompact`（root + control + thumb 装配 + `leading`/`trailing` 插槽 + 控件 id 生成）；`scv()` 配方 `switchVariants`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `switch` 族完成全维度审计。headless 基座完整：`SwitchRoot`（`useControllableState(modelValue)` 受控/非受控 + `checkSwitchValue` 运行时守卫 + `VisuallyHiddenInput` 表单代理）→ `SwitchControl`（`Button` 基座 + `role="switch"` + `aria-checked`/`data-state` 双通道反射 + `aria-required`，禁用守卫 + Enter/Space 双键切换）→ `SwitchThumb`（`Primitive` + `data-state`/`data-disabled`）。`SwitchCompact` 聚合 root + control + thumb，持有 `leading`/`trailing` 插槽并生成控件 id；styled 层 `switchVariants` 6 尺寸 + 8 颜色 + rounded/square 形态（含 RTL 逻辑类）；UI 层单薄包装器 `SSwitch`（`useOmitProps` 含 `class`，`provideSwitchUi` 注入，`{ root: props.class }` 直接入配方）。

**发现并修复 1 项 Major 缺陷 + 1 项 Minor 类型卫生问题 + 扩展单测 9 → 20 项 + 文档按 7 节 Recommended structure 重构：**

1. **Major (D1-08 表单代理) 自定义 `trueValue`/`falseValue` 下表单代理误判选中**：[switch-root.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/switch/switch-root.vue) 隐藏 input 绑定 `:checked="!!modelValue"`——布尔语义下正确，但当消费方使用文档化的字符串值（如 `trueValue="'on'"` / `falseValue="'off'"`）时，`!!'off'` 恒为 `true`，false 态也会被标记为选中并参与表单提交。修复：`:checked="modelValue === trueValue"`，与 `aria-checked`/`data-state` 的判定口径统一。
2. **Minor (D5 类型卫生) `as any` / `@ts-expect-error` 反模式**：3 个文件（switch-root/switch-compact/SSwitch）共 6 处 `trueValue: true as any`，switch-root 另有 2 处 `@ts-expect-error` 抑制类型错误。修复：`trueValue`/`falseValue` 默认值改 `true as unknown as NonNullable<T>`（泛型默认值无法直接断言，双断言为仓库既有模式，见 `use-controllable-state.ts`）；`emit('update:modelValue', value)` 改显式 `value as NonNullable<T>`（下行断言），`props.defaultValue ?? null` 改 `null as unknown as T`，删除全部抑制注释。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 受控/非受控闭环（`useControllableState`，D3-04）；`role="switch"` + `aria-checked`/`data-state` 双通道反射（D1-08，**修复表单代理 checked 判定**）；`data-disabled` 经 `Button` 基座自动注入；Enter/Space 双键切换（D1-16，Enter 显式 `@keydown.enter.prevent` 对齐 checkbox 族系，Space 依赖原生 button）；`VisuallyHiddenInput` 表单代理（name/value/required/disabled）；`checkSwitchValue` nullish 运行时守卫；Compact 聚合全部下沉 headless，UI 包装器零 `v-for`/零默认内容装配（D1-12）；headless 无样式；`useOmitProps` 均含 `class`（D1-10）；recipe 首行 `// @unocss-include`，slot 键与 `SwitchUiSlot` 完全一致（D1-09） |
| D2 行业对标 |  ✅  | 对标 Ant Design/Element Plus/Mantine/Naive UI/shadcn `Switch`：受控/非受控、自定义开/关值、leading/trailing 内容槽、表单代理对齐；遗留增强：`loading` 态、`onLabel`/`offLabel` 内联标签、`beforeChange` 钩子、`change` 事件（与 checkbox 族系保持一致的事件面）（见「遗留增强项」）                                                                                                                                                                                                                                                                                                                                                |
| D3 API 设计 |  ✅  | 受控/非受控（`useControllableState`，`v-model` + `defaultValue` 双模式，D3-04）；`modelValue`/`value`/`name`/`required`/`disabled`/`dir`/`trueValue`/`falseValue` 命名对齐 reka-ui/shadcn（D3-01）；`*CompactProps`/`*CompactEmits`/`*CompactSlots` 类型族完整导出；`controlProps`/`thumbProps` 透传 + `leading`/`trailing`/default 三插槽（D3-06）；UI 层 `S` 前缀（D3-09）                                                                                                                                                                                                                                                       |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；props 全 interface（D4-03）；`AcceptableBooleanValue`/`UiClass` 复用共享类型（D4-05）；`SwitchUiSlot` 与 recipe slot 一一对应；**移除 2 处 `@ts-expect-error` 与 6 处 `as any`**，泛型默认值/事件负载改显式类型断言（D5-XX）                                                                                                                                                                                                                                                                                                                                                                                |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；context 值全响应式（`transformPropsToContext` + `ShallowRef`，D1-05）；模板无 `props.xxx`（D5-14）；脚本结构符合 vue-sfc-structure 分层（D5-12）                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 7 节 Recommended structure（Overview/Usage/Features/Demos/API/Notes/FAQ；单 `S` 前缀导出，按标准省略 Component family 章节），含架构对标表 + 运行约束 + 4 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                                                                                                                                                                                                                                       |
|   D7 其他   |  ✅  | 单测 9 → 20 项全通过（新增 data-state 三部件反射/受控更新/非受控 defaultValue/自定义 trueValue-falseValue 切换/Enter 键切换/表单代理 checked 与 trueValue 判定/`aria-required`/root class 合并/`ui.control` 覆盖）；axe 0 违规（off + on 双态）；无独立浏览器 e2e 文件，D7-19/20 由 happy-dom 单测覆盖，与 checkbox/radio-group 族系一致（非阻塞）                                                                                                                                                                                                                                                                                 |

---

## 二、行业对标矩阵

| 能力                             | SoybeanUI | Ant Design `Switch` | Element Plus `Switch` | Mantine `Switch` | Naive UI `Switch` | shadcn `Switch` |
| :------------------------------- | :-------: | :-----------------: | :-------------------: | :--------------: | :---------------: | :-------------: |
| headless/styled 分离             |    ✅     |          —          |           —           |        —         |         —         |       ✅        |
| 受控/非受控                      |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |       ✅        |
| 自定义开/关值                    |    ✅     |         ✅          |          ✅           |        —         |        ✅         |       ✅        |
| leading/trailing 插槽            |    ✅     |          —          |          ✅           |        ✅        |         —         |        —        |
| `loading` 状态                   |    ➕     |         ✅          |          ✅           |        ✅        |        ✅         |        —        |
| 内联标签（`onLabel`/`offLabel`） |    ➕     |          —          |          ✅           |        ✅        |         —         |        —        |
| `beforeChange` 钩子              |    ➕     |          —          |          ✅           |        —         |         —         |        —        |
| 表单代理 / `name` 提交           |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |       ✅        |
| axe 零违规（off + on）           |    ✅     |          —          |           —           |        —         |         —         |        —        |

---

## 三、发现的问题与处理

### 3.1 Major — 自定义 `trueValue`/`falseValue` 下表单代理误判选中（D1-08 表单代理）

**问题：** [switch-root.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/switch/switch-root.vue#L64) 隐藏 input：

```vue
:checked="!!modelValue"
```

布尔语义（`true`/`false`）下正确；但 `trueValue`/`falseValue` 是文档化的自定义值能力（types.ts 明确支持任意 `NonNullable<T>`，如 `'on'`/`'off'`），此时 `!!'off'` 恒为 `true`——开关处于 false 态也会被标记为 checked，表单提交时错误携带该字段。与 `aria-checked`/`data-state` 的判定口径（`modelValue === trueValue`）不一致。

**处理：** 统一判定口径：

```vue
:checked="modelValue === trueValue"
```

**验证：** 新增单测「checks the hidden input only when modelValue equals trueValue」——`modelValue='off'` 时隐藏 input `checked === false`；「checks the hidden input when modelValue equals trueValue」——`modelValue='on'` 时 `checked === true`。

### 3.2 Minor — `as any` / `@ts-expect-error` 类型反模式（D5 类型卫生）

**问题：** 项目硬性规范「Never use `as any` / `@ts-ignore` / `@ts-expect-error`」。switch 族 3 个文件共 6 处 `trueValue: true as any`（switch-root.vue / switch-compact.vue / ui switch.vue），switch-root.vue 另有 2 处 `@ts-expect-error` 抑制 `useControllableState` 调用的类型错误：

```ts
trueValue: true as any,
falseValue: false as any,
// ...
emit('update:modelValue', value);  // @ts-expect-error ignore type
props.defaultValue ?? null         // @ts-expect-error defaultValue can be null
```

泛型 `T extends AcceptableBooleanValue` 下，默认值 `true`/`false` 无法直接断言为 `NonNullable<T>`（TS 无法证明字面量 `true` 与泛型目标可比），因此原实现以 `any` 逃避；`emit` 负载与 `null` 默认值同理。

**处理：** 以显式类型断言替换，遵循仓库既有双断言模式（`use-controllable-state.ts`/`shared/object.ts`）：

```ts
trueValue: true as unknown as NonNullable<T>,
falseValue: false as unknown as NonNullable<T>,
// ...
emit('update:modelValue', value as NonNullable<T>);   // value: T，NonNullable<T> 为其子类型，下行断言
props.defaultValue ?? (null as unknown as T)          // null 非泛型 T 可证子类型，双断言
```

运行时语义不变（默认值仍为 `true`/`false`，`update:modelValue` 负载仍为非 nullish），编译期类型不再逃逸。

### 3.3 D7-11 — 单测覆盖不足（已扩展 9 → 20 项）

**问题：** 原 [switch.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/switch.spec.ts) 仅 9 项，未覆盖 `data-state` 三部件反射、受控/非受控 `defaultValue`、自定义 `trueValue`/`falseValue`、Enter 键切换、表单代理 checked 判定（本批次修复点）、`aria-required`、root class 合并、`ui.control` 覆盖。

**处理：** 扩展至 **20 项**，全部通过：

```bash
✓ test/specs/components/switch.spec.ts (20 tests)
```

> 覆盖要点：data-state control/thumb/root 三部件反射（D1-08）；`defaultValue` 非受控 + 受控 `modelValue` 更新（D3-04）；自定义字符串 `trueValue='on'`/`falseValue='off'` 点击切换发 `'off'`（D3-01，验证修复）；Enter 键切换（D1-16）；表单代理——`class="form"` 根下 `name` 渲染隐藏 input 且 `value` 独立、`checked` 与 `trueValue` 判定（D1-08，验证修复）；`aria-required`（D1-08）；root class 合并 + `ui.control` 覆盖（D7-15）；axe off + on 双态 0 违规（D7-05）。

### 3.4 说明 — 非缺陷项（跨组件既有模式）

- **`change` 事件缺失**：switch root 仅发出 `update:modelValue`，与 checkbox/checkbox-group 族系一致（同一事件面）。Ant Design/Element Plus 额外提供 `change`/`onChange`，记入遗留增强项统一排期，避免破坏族系事件一致性。
- **`isFormControl` 语义**：表单代理以根元素自身 `classList` 含 `form` 类为渲染前提（`isFormControl` 既有语义），与 checkbox/radio-group 族系共享同一实现；对齐 Radix `closest('form')` 属 C53 form 轮次的跨组件决策，不在 C39 改动。

---

## 四、架构与模式要点

### 表单代理与值判定口径统一

`SwitchRoot` 的隐藏 checkbox input（`VisuallyHiddenInput`）以 `modelValue === trueValue` 判定 checked，与 `SwitchControl` 的 `aria-checked`、`data-state`（context 中 `dataState = modelValue === trueValue ? 'checked' : 'unchecked'`）完全同源——值判定只有一处事实来源，本次修复消除了表单代理与状态反射之间的口径分裂。

### Compact 聚合与 ui 上下文链

`SwitchCompact` 持有 root + control + thumb 的装配、`leading`/`trailing` 默认插槽结构与控件 id 生成（`controlProps?.id || 'switch-{useId()}'`），UI 包装器 `SSwitch` 仅做 variant 计算 + `provideSwitchUi` 注入 + props/事件转发（D1-12）。泛型值类型（`trueValue`/`falseValue`/`modelValue`）贯穿 root → compact → UI 三层透传，本次将各层默认值的 `as any` 统一替换为受约束的双断言。

---

## 五、变更文件清单

| 文件                                                         | 变更类型                                                                                                                                                                                                  |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/switch/switch-root.vue`    | **修复 ×2**：① 隐藏 input `:checked="!!modelValue"` → `:checked="modelValue === trueValue"`（自定义值表单代理误判）；② 移除 2 处 `@ts-expect-error` + `trueValue`/`falseValue` 默认值 `as any` → 显式断言 |
| `packages/headless/src/components/switch/switch-compact.vue` | `trueValue`/`falseValue` 默认值 `as any` → `as unknown as NonNullable<T>`（类型卫生）                                                                                                                     |
| `packages/ui/src/components/switch/switch.vue`               | `trueValue`/`falseValue` 默认值 `as any` → `as unknown as NonNullable<T>`（类型卫生）                                                                                                                     |
| `packages/ui/test/specs/components/switch.spec.ts`           | 单测 9 → 20 项（data-state 三部件反射/受控非受控/自定义 trueValue-falseValue/Enter 键/表单代理 checked 判定/aria-required/root class/ui 覆盖/axe 双态）                                                   |
| `apps/docs/src/docs/en/components/switch.md`                 | **重构** 4 节 → 7 节 Recommended structure（含架构对标表、运行约束、FAQ）                                                                                                                                 |
| `apps/docs/src/docs/zh-CN/components/switch.md`              | **重构** 4 节 → 7 节 Recommended structure（与 en 完全对齐）                                                                                                                                              |
| `docs/check.md`                                              | C39 行 7 维度 ⏳ → ✅；批次 1 记录表追加 C39 行；第 1 轮进度 7/8 → 8/8；批次合计 11 → 12 单元、缺陷 19 → 21、单测 266 → 277                                                                               |

---

## 六、验证命令

```bash
# 单元测试（20 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/switch.spec.ts
# → 20 passed

# 族系回归（switch 20 + radio-group 25 + checkbox 41 + select 16 + combobox 23 + autocomplete 21 = 146 项通过）
cd packages/ui && pnpm exec vp test run test/specs/components/switch.spec.ts test/specs/components/radio-group.spec.ts test/specs/components/radio-group-card.spec.ts test/specs/components/checkbox.spec.ts test/specs/components/checkbox-group.spec.ts test/specs/components/checkbox-card.spec.ts test/specs/components/select.spec.ts test/specs/components/combobox.spec.ts test/specs/components/autocomplete.spec.ts

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

- **`loading` 状态（D2-11）**：Ant Design/Element Plus/Mantine/Naive UI 提供 `loading` prop（切换期间禁用并显示加载态），SoybeanUI 需 `controlProps` 组合或新增 prop。记入 [roadmap.md](../roadmap.md) 对标增强项。
- **内联标签 `onLabel`/`offLabel`（D2-11）**：Mantine `onLabel`/`offLabel`、Element Plus `active-text`/`inactive-text` 在开关内部显示选中/未选中文案，当前可经 thumb 插槽组合。
- **`beforeChange` 钩子（D2-11）**：Element Plus `before-change` 支持切换前拦截（异步校验），当前可用受控 `modelValue` + 守卫实现，无需内置。
- **`change` 事件（D3-01 备查）**：与 checkbox 族系保持一致事件面（仅 `update:modelValue`）；若后续族系统一补充 `change` 事件，switch 应同步。
- **`isFormControl` 语义对齐（D1-08 备查）**：当前为「元素自身含 `form` 类」，Radix 为 `closest('form')`；属跨 20 个表单组件的共享行为决策，建议在 C53 form 轮次统一评估。
