# C53 `form` 检查优化报告

> **组件编号：** C53（`form`）
> **组件名称：** `SForm`/`SFormField`/`SFormFieldArray`/`SFormFieldBase` + `useForm`（headless 基座：`FormCompact`/`FormFieldCompact`/`FormFieldArrayCompact`/`FormFieldBaseCompact` + `FormField`/`FormLabel`/`FormControl`/`FormDescription`/`FormError` 原语 + `useHeadlessForm`/`useFormState`/`useFieldArray` 核心）
> **模式：** 多槽 + Compact（`form`/`field`/`fieldArray`/`label`/`control`/`description`/`error` 7 个 UI 槽）
> **优先级：** P0
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-10

---

## 一、执行摘要

对 `form` 完成全维度审计。核心链路：`useHeadlessForm`（handleSubmit/handleReset）→ `useFormState`（registerField、`validateTiming = submitCount === 0 ? validateMode : reValidateMode`、Standard Schema v1 校验 + 字段级 `validate` 回调、`defu(fieldErrors, schemaErrors)` 合并错误）→ `useFieldArray`（append/remove/swap/move）。`FormFieldCompact` 经 `useFormSub` 注册字段并按 `name` 派生状态；`FormFieldBaseCompact` 从 contexts 合并 `fieldProps`/`labelProps`/`controlProps`/`descriptionProps`/`errorProps`，经 `FormField` 提供 `formFieldId`/`ariaDescribedBy`/`ariaInvalid` context，再经 headless `Slot`（`cloneVNode(firstNonCommentChild, attrs, true)`）把 `aria-describedby`/`aria-invalid`/`model-value` 转发给输入控件。UI 层 `SForm*` 注入 `formVariants`（7 槽）并透传 headless 类型。

**发现 Major ×2 + Minor ×4 + 测试基建 1 项**，均已修复：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-08 props 泄漏）：`form-field-compact.vue`/`form-field-array-compact.vue` 模板 `v-bind="props"` 将 `name`/`validate`/`reset` 泄漏为 DOM 非法属性 → `useOmitProps` 剔除后 `v-bind="forwardedProps"`。**Minor 修复**（UI 层）：`form-field-array.vue` `{ field: props.class }` slot 键错误 → `{ fieldArray: props.class }`；`form-field-base.vue` 动态插槽补 `v-bind="slotProps"` 转发 |
| D2 行业对标 |  ✅  | **Minor 修复**（D2-11）：`SFormFieldBase` 插槽收不到 `formFieldId`/`ariaDescribedBy`/`ariaInvalid` 的根因——UI 层动态插槽未转发 props，已修复；`SFormFieldArray` class 丢失（slot 键 `field` → `fieldArray`）影响 `ui` 覆盖链路                                                                                                                                                                         |
| D3 API 设计 |  ✅  | `useForm` 元组返回 `[form, SFormField, SFormFieldArray]`（D3-01/D3-04）；`validateMode`/`reValidateMode`/`validateOnMounted`/`isSubmitting`/`submitCount`/`onInvalid` 齐备；Standard Schema v1 接口（D3-06）允许 zod/valibot/arktype/yup 任意接入。遗留（非阻塞）：async-validator 类 `validateTrigger`/`rules` 对象不在 Standard Schema 接口内，依赖用户侧 schema 表达                                |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；`use-form.ts` 消除 `@ts-expect-error` → `FormField as unknown as FormFieldComponent<Values, FormFieldExtraProps>` 显式收窄（双断言 + 类型别名 `Values`）；`FormFieldComponent`/`FormFieldArrayComponent` 泛型构造器签名与 SFC 组件类型结构性差异经注释说明（D4-05）                                                                                                             |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无新增 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；context 值全部响应式注入；`useOmitProps` 剔除列表与模板绑定一一对应；测试 setup 新增 `Element.prototype.animate` stub 仅作用于 happy-dom 测试环境（D5-15 隔离）                                                                                                                                                        |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（9 能力 × 6 库）+ 8 条 Cautions + 6 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                    |
|   D7 其他   |  ✅  | 单测 1 → 26 项全通过（渲染/属性转发/模型值与校验/字段数组/无障碍，axe 0 违规）；全量 UI 单测 1538/1538 全通过（含测试基建 stub 无回归）；playground 示例补齐 03-schema/04-rules/05-async/06-array/07-disabled（替换旧占位 03-zod）                                                                                                                                                                     |

---

## 二、行业对标矩阵

> `form` 是**表单单例 + 字段聚合 + 校验流水线**模式。Ant Design `Form`、Element Plus `el-form`、Mantine `useForm`、Naive UI `n-form`、React Hook Form 均提供表单状态与校验；SoybeanUI 的 headless/styled 分离、Standard Schema 接口、`validateMode`/`reValidateMode` 双模式、`aria-invalid`/`aria-describedby` 自动接线、元组式返回为差异点。

| 能力                                | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | React Hook Form |
| :---------------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :-------------: |
| headless/styled 分离                |    ✅     |     —      |      —       |    —    |    —     |        —        |
| Standard Schema（Zod/Valibot…）     |    ✅     |     ⚠️     |      —       |   ✅    |    —     |       ✅        |
| 字段级同步/异步规则                 |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |       ✅        |
| `validateMode`/`reValidateMode`     |    ✅     |     ⚠️     |      ✅      |    —    |    ✅    |        —        |
| 字段数组（append/remove/move）      |    ✅     |     ✅     |      —       |   ✅    |    —     |       ✅        |
| 嵌套路径注册                        |    ✅     |     ✅     |      —       |    —    |    —     |       ✅        |
| 提交状态（`isSubmitting`）          |    ✅     |     —      |      —       |   ✅    |    —     |       ✅        |
| `aria-invalid` + `aria-describedby` |    ✅     |     —      |      —       |   ✅    |    —     |        —        |
| 逐部分插槽 + `*Props`               |    ✅     |     ⚠️     |      —       |    —    |    —     |        —        |

`⚠️` = 部分支持（Ant Design 经 `rules`/`validateTrigger` 覆盖大部分规则但没有 Standard Schema；其 `required`/`colon`/`labelAlign`/`labelWidth`/`layout` 属于样式层便捷项，SoybeanUI 不将其引入核心）。

---

## 三、发现的问题与处理

### 3.1 Major — D1-08 Compact 聚合 props 泄漏：`name`/`validate`/`reset` 落为 DOM 属性

**现象：** [form-field-compact.vue](../../packages/headless/src/components/form/form-field-compact.vue) 与 [form-field-array-compact.vue](../../packages/headless/src/components/form/form-field-array-compact.vue) 模板 `v-bind="props"` 将**全部声明 props** 原样透传 `FormFieldBaseCompact`——其中 `name`（注册路径）、`validate`（校验函数）、`reset`（重置行为）为纯逻辑 prop，经 Vue fallthrough 序列化后泄漏为 `<div>` 上的非法 DOM 属性（`validate="[object Function]"`、`reset="true"` 等），污染 HTML 输出并可能导致 hydration 告警。

**修复：** 两文件均引入 `useOmitProps(props, ['name', 'validate', 'reset'])` 剔除逻辑 prop 后 `v-bind="forwardedProps"`：

```vue
const forwardedProps = useOmitProps(props, ['name', 'validate', 'reset']); const state = useField(props.name, {
validate: props.validate, reset: props.reset });
```

```vue
<FormFieldBaseCompact data-soybean-form-field v-bind="forwardedProps" :error="error">
```

**验证（测试驱动）：** 新增「does not leak name / validate / reset to the field wrapper DOM」——断言 field wrapper 的 `attrs.name`/`attrs.validate`/`attrs.reset` 均为 `undefined`（修复前 `reset` 恒泄漏）。

### 3.2 Major — D1-08/D7-11 a11y 缺陷：`FormFieldBaseCompact` 未透传 `error`，`aria-invalid` 恒为 false

**现象：** [form-field-base-compact.vue](../../packages/headless/src/components/form/form-field-base-compact.vue) 模板中 `<FormField v-bind="fieldProps" :data-error="error ? '' : undefined">` **缺 `:error="error"`**——`FormField` 的 props 经 `useOmitProps` 剔除（`error` 被消费后不再 fallthrough），而 `FormFieldBaseCompact` 传入的 `error` 又从未在 `v-bind="fieldProps"` 上显式覆盖。`provideFormFieldContext({ error })` 中 `ariaInvalid = computed(() => Boolean(error.value))` 恒为 `false`：提交校验失败后 `data-error` 已接线（样式可红）、**但 `aria-invalid` 从未置 true**——屏幕阅读器无法感知字段校验错误，构成 a11y 缺陷（D7-11 探针：slot-render 日志确认 error 状态已到达 `FormFieldBaseCompact`，却在 `FormField` 层丢失）。

**修复：** 模板补 `:error="error"`：

```vue
<FormField
  v-slot="slotProps"
  v-bind="fieldProps"
  :data-orientation="orientation"
  :data-error="error ? '' : undefined"
  :error="error"
>
```

**验证（测试驱动）：** 新增「sets aria-invalid on the control after validation errors」「clears aria-invalid when the value becomes valid」——提交空值后断言 input `aria-invalid="true"`（修复前恒 `false`），重填有效值提交后断言 `aria-invalid="false"`；axe 默认态 0 违规。

### 3.3 Minor — D2-11 UI 层 `SFormFieldArray` class 丢失（slot 键错误）

**现象：** [form-field-array.vue](../../packages/ui/src/components/form/form-field-array.vue) 的 recipe 合并写为 `formVariants({ size }, props.ui, { field: props.class })`——`SFormFieldArray` 的 class 落到 `field` 槽（普通字段样式），而数组包装器实际消费 `fieldArray` 槽（`formVariants` slots 键：form/field/**fieldArray**/label/control/description/error）——用户为数组根传入的 class 被静默丢弃，且误污染 field 槽样式。

**修复：** `{ field: props.class }` → `{ fieldArray: props.class }`。

**验证：** 新增「applies the class prop of SFormFieldArray to the array wrapper」——断言 `[data-soybean-form-field-array]` class 命中用户传入的 `emails-array`（修复前断言失败）。

### 3.4 Minor — D2-11 UI 层 `SFormFieldBase` 动态插槽未转发 props

**现象：** [form-field-base.vue](../../packages/ui/src/components/form/form-field-base.vue) 的插槽转发模板写为 `<template #[slotName]><slot :name="slotName" /></template>`——`FormFieldBaseCompact` 向插槽注入的 `formFieldId`/`ariaDescribedBy`/`ariaInvalid`（headless `FormField` 经 `v-slot="slotProps"` 提供）**未再转交用户插槽**，`SFormFieldBase` 的自定义内容无法拿到字段 ID 与 aria 接线（如自建 label 关联 `<label :for>` 或 aria 组合）。

**修复：**

```vue
<template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
  <slot :name="slotName" v-bind="slotProps" />
</template>
```

**验证：** 新增「forwards slot props through SFormFieldBase」——断言插槽收到 `formFieldId`（`/^form-field-/`）、`ariaDescribedBy`（`/^form-field-description-/`）、`ariaInvalid`（`false`）。

### 3.5 Minor — D4 类型：`use-form.ts` 隐式 `@ts-expect-error` 消除

**现象：** [use-form.ts](../../packages/ui/src/components/form/use-form.ts) 以 `// @ts-expect-error - ignore` 跳过 SFC 组件类型与 headless `FormFieldComponent` 泛型构造器签名的结构性差异——类型断言被静默吞掉，且返回类型推导沿用 `InferStandardSchemaInput<S>` 散点引用。

**修复：** 导入 `FormFieldComponent`/`FormFieldArrayComponent`，提取类型别名 `Values = InferStandardSchemaInput<S>`，以 `as unknown as` 双重断言显式收窄并注释差异原因；返回类型统一引用 `Values`。

**验证：** `pnpm typecheck` 全绿（该文件零告警）。

### 3.6 Minor — D7-10 playground 示例未使用变量

**现象：** 本轮新增示例 [06-array.vue](../../apps/playground/src/examples/form/06-array.vue) 中 `#label="{ fields, append }"` 的 `fields` 与 `v-for="(field, index) in fields"` 的 `field` 均未使用——`vue-tsc` 报 TS6133。

**修复：** 解构收窄为 `#label="{ append }"` 与 `v-for="(_, index) in fields"`。

**验证：** `pnpm typecheck` 全绿。

### 3.7 测试基建 — happy-dom 缺 `Element.prototype.animate`（auto-animate 退出动画悬挂）

**现象：** [form-control.vue](../../packages/headless/src/components/form/form-control.vue) 经 `vAutoAnimate` 为错误元素做进入/离开动画；`@formkit/auto-animate` 在 DOM 变更时调用 `el.animate()`，happy-dom 未实现该 API → 运行时抛 `el.animate is not a function`（第一版 stub 为纯 no-op，退出动画的 `finish` 永不触发、`cleanUp(el, styleReset)` 不执行，错误 `<p>` 残留 DOM 导致「clears the field error」测试失败）。

**修复：** [setup.ts](../../packages/ui/test/setup.ts) 新增 stub——`addEventListener('finish', cb)` 用 `queueMicrotask(callback)` 异步触发 finish（auto-animate 在拿到 `animate()` 返回值后才注册监听），让退出动画正常完成清理。

**验证：** form.spec.ts 26/26 全绿；全量 UI 单测 1538/1538 全绿（无回归）。

### 3.8 核查结论 — C42/C44/C46/C50/C51 同款风险核查

- **C42 同款缺省 Boolean cast 风险：不适用。** `FormFieldCompact`/`FormFieldArrayCompact` 无 `withDefaults` 默认 `true` 的 Boolean prop；`error`/`isFieldArray` 默认 `false` 被 cast 后语义等价。
- **C44/C46 同款 watch 清空死代码：不适用。** form 值由 `useFormState`/`useFieldArray` 统一经 setValue 回写，无 `segmentValues` 类原地变更结构。
- **C50/C51 同款叶子部件 aria-label 硬编码覆盖：不存在。** `FormLabel`/`FormError`/`FormDescription` 均经 `labelProps`/`errorProps`/`descriptionProps` 通道 + `mergeProps` 合并（`attrs` 优先）。
- **C52 同款 `*Props` 声明未绑定：已核验。** `FormFieldBaseCompact` 的 `labelProps`/`controlProps`/`descriptionProps`/`errorProps` 均在模板 `v-bind` 消费（`mergeProps` 合并 context 默认 + 用户值），`fieldProps`/`fieldArrayProps` 经 context 下发后在 base 层 `v-bind="fieldProps"` 消费——链路完整。
- **全仓 51 个 UI 层纯 `defineProps<T>()` 组件：** form 的 UI 层（`form.vue`/`form-field.vue`/`form-field-base.vue`/`form-field-array.vue`）均为纯 `defineProps`，但无缺省 `true` 的 Boolean prop 依赖 headless 默认值，cast 风险不触发（同 C43 结论，统一排期排查覆盖）。

### 3.9 D7-11 — 单测覆盖不足（已重建 1 → 26 项）

**处理：** 重写 [form.spec.ts](../../packages/ui/test/specs/components/form.spec.ts)（原占位 1 项「mounts without errors」删除）至 **26 项**，全部通过：

```bash
✓ test/specs/components/form.spec.ts (26 tests) 318ms
```

> 覆盖要点：**rendering 6 项**（form 元素 + `data-soybean-form`/`data-orientation`、字段结构 label/description/control、自定义 class、`name`/`validate`/`reset` 不泄漏、数组包装器 `data-field-type="array"`、SFormFieldArray class）；**props forwarding 3 项**（`controlProps`/`labelProps` 透传、SFormFieldBase 插槽 props）；**model value and validation 9 项**（有效值提交、无效拒绝 + onInvalid、data-error 标记、错误清除、字段级 validate、schema+validate 叠加、异步 validate、重置恢复 initialValues、isSubmitting 异步提交双态）；**field array 4 项**（初始条目渲染、append、remove、数组级 `min(1)` 校验）；**accessibility 4 项**（label `for` 关联、`aria-invalid` 提交后置位/清除、aria-describedby 接线、axe 0 违规）。

> 关键测试要点：SInput 未受控行为（`useControllableState` 在 prop 为 `undefined` 时取 `defaultValue ?? ''`，`setValue('')` 对未变化值为 no-op）→ `clearInput` helper 先写 'x' 再清空；zod v4 不隐式 coercion → `z.coerce.number()`；数组单项错误按点路径键（`emails.0`）存储不上浮 → 数组级 `min(1)` 断言；异步校验/提交等待真实定时器完成。

### 3.10 D7-10 — playground 示例补齐

**处理：** 新增 5 个示例覆盖表单全场景（替换旧占位 03-zod）：`03-schema.vue`（Zod schema + required/min）、`04-rules.vue`（字段级 validate）、`05-async.vue`（异步唯一性校验）、`06-array.vue`（append/remove/move 动态数组）、`07-disabled.vue`（字段级 disabled）。既有 01-basic（Valibot 全控件 + 嵌套数组）/02-horizontal 保留。

### 3.11 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（组合式入口 + 控件无关）、Usage、Features（9 条 bullet）、Component family（`useForm`/`SForm`/`SFormField`/`SFormFieldArray`/`SFormFieldBase` + headless compact/原语 + 核心机制）、Demos（7 示例导览）、API、Notes（架构链路 + **9 能力 × 6 库对标表** + 8 条 Cautions）、FAQ（6 组：校验库切换、输入时校验、动态列表、提交 loading、zod coercion、重置）。中英文结构一一对应。

---

## 四、架构与模式要点

### 聚合层「声明 → omit → v-bind → 消费」四链路核验是 a11y 缺陷高发区

`FormFieldBaseCompact` 的 `error` 缺失是「props 被 `useOmitProps` 剔除后不再 fallthrough」与「`v-bind="fieldProps"` 未显式覆盖」叠加的静默丢失——`data-error` 接线成功造成「已实现」假象，aria 通道却在 `provideFormFieldContext` 层断链。审计带 a11y 注入的聚合组件时，必须沿「错误值 → context provide → 控件 slot 转发 → DOM 属性」逐环验证，而非只看任一环的 DOM 输出。

### Standard Schema 接口把校验器选择权交给用户，代价是放弃 `validateTrigger` 级 API

`validateMode`/`reValidateMode` 双模式（`submitCount === 0` 判定）覆盖了时序需求；但 async-validator 类按字段声明 `rules`/`trigger` 的写法不在 Standard Schema 接口内——字段级 `validate` 回调是补位通道（`defu(fieldErrors, schemaErrors)` 合并、字段错误优先）。这是 API 边界的有意取舍，文档 Cautions 已说明。

### 元组返回 + 泛型构造器的类型收窄模式

`useForm` 返回 `[context, SFormField, SFormFieldArray]` 元组并命名解构——headless `FormFieldComponent` 是**泛型构造器签名**（`new <Name extends Path<Values>>(props) => ComponentPublicInstance`），与 SFC 组件类型存在结构性差异，UI 层经 `as unknown as FormFieldComponent<Values, ExtraProps>` 双断言收窄；SFC 组件本身无法表达泛型构造参数，因此类型错误必须在聚合入口（useForm）集中处理而非散布于模板。

---

## 五、变更文件清单

| 文件                                                                 | 变更类型                                                                                                                                                                                                            |
| :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/headless/src/components/form/form-field-compact.vue`       | **Major 修复**（D1-08）：`v-bind="props"` → `useOmitProps(props, ['name', 'validate', 'reset'])` + `v-bind="forwardedProps"`，消除逻辑 prop DOM 泄漏                                                                |
| `packages/headless/src/components/form/form-field-array-compact.vue` | **Major 修复**（D1-08）：同款 `useOmitProps` 剔除 `name`/`validate`/`reset`                                                                                                                                         |
| `packages/headless/src/components/form/form-field-base-compact.vue`  | **Major 修复**（D1-08/D7-11）：`FormField` 补 `:error="error"`——接通 `aria-invalid` 通道（此前恒 false）                                                                                                            |
| `packages/ui/src/components/form/form-field-array.vue`               | **Minor 修复**（D2-11）：recipe 合并 slot 键 `{ field: props.class }` → `{ fieldArray: props.class }`，`SFormFieldArray` class 不再丢失                                                                             |
| `packages/ui/src/components/form/form-field-base.vue`                | **Minor 修复**（D2-11）：动态插槽 `#[slotName]="slotProps"` + `<slot v-bind="slotProps" />`——`SFormFieldBase` 插槽收到 `formFieldId`/`ariaDescribedBy`/`ariaInvalid`                                                |
| `packages/ui/src/components/form/use-form.ts`                        | **Minor 修复**（D4）：消除 `@ts-expect-error` → `as unknown as FormFieldComponent<Values, FormFieldExtraProps>` 显式收窄 + 类型别名 `Values`                                                                        |
| `packages/ui/test/setup.ts`                                          | **测试基建**：`Element.prototype.animate` stub（happy-dom 缺失，`queueMicrotask` 立即触发 `finish` 让 auto-animate 正常清理退出元素）                                                                               |
| `packages/ui/test/specs/components/form.spec.ts`                     | 单测 1 → 26 项重建（rendering/props forwarding/model value and validation/field array/accessibility）；含 `clearInput` helper、`z.coerce.number()`、数组级校验、异步等待、aria-invalid 双态、reset/onReset 接线断言 |
| `apps/playground/src/examples/form/03-schema.vue`                    | **新增** 示例：Zod schema 校验（替换旧占位 03-zod）                                                                                                                                                                 |
| `apps/playground/src/examples/form/04-rules.vue`                     | **新增** 示例：字段级 `validate` 规则                                                                                                                                                                               |
| `apps/playground/src/examples/form/05-async.vue`                     | **新增** 示例：异步字段级校验（唯一性检查）                                                                                                                                                                         |
| `apps/playground/src/examples/form/06-array.vue`                     | **新增** 示例：动态数组 append/remove/move；**Minor 修复**（D7-10）未使用变量 `fields`/`field` 解构收窄                                                                                                             |
| `apps/playground/src/examples/form/07-disabled.vue`                  | **新增** 示例：字段级 `disabled`（input/select/checkbox）                                                                                                                                                           |
| `apps/docs/src/docs/en/components/form.md`                           | 文档 4 节 → 8 节 Recommended structure（Component family + 9 能力 × 6 库对标表 + Cautions 8 条 + FAQ 6 组）                                                                                                         |
| `apps/docs/src/docs/zh-CN/components/form.md`                        | 与 en 一一对应的 8 节中文化版本                                                                                                                                                                                     |
| `docs/check.md`                                                      | C53 行 7 维度 ⏳ → ✅；4.7 批次 6 记录表追加 C53 行 + 批次合计（1 单元，单测 1 → 26 项）                                                                                                                            |
| `docs/check-reports/C53-form.md`                                     | **新建** 本审计报告                                                                                                                                                                                                 |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vitest run test/specs/components/form.spec.ts   # 26/26 全绿
cd packages/ui && pnpm exec vitest run   # 全量 1538/1538 全绿
pnpm lint && pnpm fmt                    # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 2.3.4）

| 增强项                                     | 对标依据       | 说明                                                                                                                                                                                                       |
| :----------------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `form` 独立浏览器 e2e                      | 自研标准       | 按 check.md 2.3.4 清单，`form` 属复杂交互录入类，须补浏览器 e2e（真实键盘提交/重置/数组增删 + axe 校验态），非 Blocker                                                                                     |
| async-validator 类 `rules`/`trigger`       | AntD/Element   | 字段级规则目前仅 `validate` 回调 + schema；AntD `rules` 对象数组与 Element `rules`/`validateTrigger` 属接口层扩展，需设计评审（Standard Schema 边界之外）                                                  |
| 51 个 UI 层纯 `defineProps<T>()` 组件排查  | Vue 运行时行为 | 承接 C42/C43 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查；form UI 层无缺省 `true` Boolean prop，本轮已核验不触发                                |
| `FormField`/`FormLabel` 等底层原语 UI 封装 | 自研标准       | 目前 headless-only（`FormField`/`FormLabel`/`FormControl`/`FormDescription`/`FormError` 无 S 前缀封装）；符合 headless 暴露约定，用户自定义布局经 `SFormFieldBase` + `*Props` 达成，暂不单独封装（非缺陷） |
