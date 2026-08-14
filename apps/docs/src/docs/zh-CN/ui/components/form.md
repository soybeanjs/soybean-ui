# 表单

## 概述

面向表单构建与校验交互的组合式组件层，采用 headless 核心 + 样式封装的结构。`useForm` 组合式函数统一管理表单值、touched/meta 状态与校验流水线（基于 Standard Schema v1 —— 支持 Zod、Valibot、ArkType、Yup 等），并返回 `[formState, SFormField, SFormFieldArray]` 元组用于渲染表单。字段通过插槽注册，因此任何 SoybeanUI 输入组件（`SInput`、`SSelect`、`SCheckbox`、`SSwitch`、`SRadioGroup` 等）或自定义控件都能直接接入，无需逐控件适配。

## 用法

<UsageCode component="form" />

## 特性

- 📜 Schema 校验 —— 基于 Standard Schema v1（`@standard-schema/spec`）：接入 Zod、Valibot、ArkType 或 Yup 即可获得类型化值 + 字段级错误
- ✅ 字段级规则 —— 每个字段可配同步或异步 `validate`，与 schema 错误合并（`fieldErrors` 优先于 `schemaErrors`，经 `defu` 合并）
- 🔁 校验时机 —— `validateMode` 控制首次提交的校验时机，`reValidateMode` 控制后续提交（`blur` | `input` | `change` | `submit`）；可选 `validateOnMounted`
- 📦 字段数组 —— `append` / `remove` / `insert` / `swap` / `move` / `update` 及嵌套路径注册（`social.0.name`）与逐项 meta
- 🧩 headless/styled 分离 —— `@soybeanjs/headless` 中的 `useForm`/`FormCompact`（零样式）；`SForm*` 封装注入 `formVariants` 样式（6 个插槽：field/fieldArray/label/control/description/error）
- ♿ 开箱即用的无障碍 —— label `<label :for>` 关联、错误时 `aria-invalid`、`aria-describedby` 将描述与错误链接到控件
- 🎨 可组合布局 —— `label` / `control` / `description` / `error` 插槽 + `*Props` 透传；`SFormFieldBase` 支持自定义行
- 🚦 提交体验 —— `isSubmitting` / `submitCount` 状态支撑异步提交，`handleSubmit` / `handleReset` / `onInvalid` 钩子
- 🧰 控件无关 —— 字段通过插槽转发 `model-value` 与无障碍属性，任何具备值的控件均可集成

## 组件家族

- `useForm`（styled）—— 入口组合式函数；返回 `[form, SFormField, SFormFieldArray]`，`form` 携带 `handleSubmit`/`handleReset`/`errors`/`isSubmitting`/`submitCount`
- `SForm` / `FormCompact`（headless）—— `<form>` 元素属主；经 context 向下传递 `orientation`/`fieldProps`/`fieldArrayProps`/`labelProps`/`controlProps`/`descriptionProps`/`errorProps`
- `SFormField` / `FormFieldCompact`（headless）—— 按 `name` 注册单个字段；持有字段错误/meta 并渲染 label + description + control + error
- `SFormFieldArray` / `FormFieldArrayCompact`（headless）—— 注册字段数组；默认插槽接收 `fields`/`append`/`remove`/`insert`/`swap`/`move`/`update`
- `SFormFieldBase` / `FormFieldBaseCompact`（headless）—— 自定义行的布局包装器；向插槽提供 `formFieldId` / `ariaDescribedBy` / `ariaInvalid`
- `FormField` / `FormLabel` / `FormControl` / `FormDescription` / `FormError`（headless）—— 底层原语，compact 内部使用（也供自定义组合导出）
- 核心机制 —— `useHeadlessForm`（提交/重置）、`useFormState`（注册 + 校验流水线）、`useFieldArray`（数组变更）

## 演示

<PlaygroundGallery component="form" />

- 01 基础 —— Valibot schema 驱动，含单选/复选/开关/选择器与嵌套字段数组
- 02 水平 —— 水平 `orientation` 布局
- 03 Schema —— Zod schema 校验，含必填/最小长度规则
- 04 规则 —— 字段级 `validate` 规则与 schema 并用
- 05 异步 —— 字段级异步校验（如唯一性检查）
- 06 数组 —— append/remove/move 动态列表
- 07 禁用 —— 字段级 `disabled`（输入框/选择器/复选）

## API

<ComponentApi component="form" />

## 备注

### 架构与竞品差异

`useFormState` 维护以注册字段名为键的扁平 `values`/`errors`/`touched` 映射，并按需执行校验流水线：schema（Standard Schema v1）+ 字段级 `validate` 回调，经 `defu(fieldErrors, schemaErrors)` 合并，使显式字段规则可细化 schema 消息。`useFieldArray` 将数组条目作为单一注册路径存储，变更助手回写同一流水线，因此嵌套字段（`social.0.name`）自然注册。`FormFieldBaseCompact` 合并表单 context 中的 `fieldProps`/`labelProps`/`controlProps`/`descriptionProps`/`errorProps`，并向控件插槽注入无障碍状态（`aria-invalid`、`aria-describedby`）。多数竞品把校验器绑定在框架专属的规则对象上；Standard Schema 接口 + 元组式 headless/styled 分离是本库的差异点。

| 能力                                | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | React Hook Form |
| :---------------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :-------------: |
| headless/styled 分离                |    ✅     |     —      |      —       |    —    |    —     |        —        |
| Standard Schema（Zod/Valibot…）     |    ✅     |     ⚠️     |      —       |   ✅    |    —     |       ✅        |
| 字段级同步/异步规则                 |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |       ✅        |
| `validateMode` / `reValidateMode`   |    ✅     |     ⚠️     |      ✅      |    —    |    ✅    |        —        |
| 字段数组（append/remove/move）      |    ✅     |     ✅     |      —       |   ✅    |    —     |       ✅        |
| 嵌套路径注册                        |    ✅     |     ✅     |      —       |    —    |    —     |       ✅        |
| 提交状态（`isSubmitting`）          |    ✅     |     —      |      —       |   ✅    |    —     |       ✅        |
| `aria-invalid` + `aria-describedby` |    ✅     |     —      |      —       |   ✅    |    —     |        —        |
| 逐部分插槽 + `*Props`               |    ✅     |     ⚠️     |      —       |    —    |    —     |        —        |

`⚠️` = 部分支持（Ant Design 经 `rules`/`validateTrigger` 覆盖大部分规则但没有 Standard Schema；其 `required`/`colon`/`labelAlign`/`labelWidth`/`layout` 属于样式层便捷项，SoybeanUI 不将其引入核心）。

### 注意事项

- `useForm` 返回元组——按位置解构：`const [form, SFormField, SFormFieldArray] = useForm({...})`，或 `const { handleSubmit, SFormField } = useForm({...})`。
- 校验时机依赖 `submitCount`：首次提交用 `validateMode`，后续提交用 `reValidateMode`；默认 `submit` 模式下错误在首次提交尝试后出现。
- 数组单项错误按点路径键（`emails.0`）存储，不上浮到数组根——在数组层校验整体（如 `min(1)`），或用嵌套 `SFormField` 渲染逐项错误。
- Zod v4 中 `z.number()` 不做字符串 coercion——文本输入会报 `"Invalid input: expected number"`。当控件是 `<input type="text">` 时请用 `z.coerce.number()`（或先解析再校验）。
- 控件插槽与值无关：字段转发 `model-value`（及 `aria-invalid`/`aria-describedby`）。自定义控件必须接收并 emit `modelValue`。
- `<form>` 元素本身只渲染 `data-soybean-form`/`data-orientation`——校验样式在 field/control/error 部分，通过 `SForm` 的 `ui`/`class` 设置。
- 字段级 `validate` 不会替换 schema——它与之合并（`fieldErrors` 优先）。返回 `undefined` 表示通过。
- 禁用是控件层的：输入框 `disabled` 阻断交互，但字段在提交时仍会校验，除非同时拦截值。

## 常见问题

### 如何在 Zod 与 Valibot 之间切换？

无需切换——直接传 schema 即可。Standard Schema v1 同时接受两者：`useForm({ schema: zodSchema })` 与 `useForm({ schema: valibotSchema })` 行为一致，推断值来自 `InferStandardSchemaInput`。

### 如何在输入时即时校验而不是提交时？

设置 `validateMode: 'input'`（可同时设置 `reValidateMode: 'input'`）。首次提交仍按 `validateMode` 执行；首次提交后由 `reValidateMode` 接管——即「首次提交校验、随后实时校验」的标准模式。

### 如何构建动态字段列表？

使用 `SFormFieldArray`：

```vue
<SFormFieldArray name="social" label="Social">
  <template #default="{ fields, append, remove, move }">
    <div v-for="(field, index) in fields" :key="index">
      <SFormField :name="`${field.name}.${index}.name`" label="Name">
        <SInput />
      </SFormField>
      <SButtonIcon icon="lucide:minus" @click="remove(index)" />
    </div>
    <SButtonIcon icon="lucide:plus" @click="append({ name: '', url: '' })" />
  </template>
</SFormFieldArray>
```

### 提交时如何展示加载状态？

`form.isSubmitting` 在异步 `onSubmit` 期间为 `true`，resolve 后复位——可禁用提交按钮或显示 loading：

```vue
<SFormFieldBase>
  <SButton type="submit" :loading="isSubmitting">Submit</SButton>
</SFormFieldBase>
```

### 为什么数字输入报 "Invalid input: expected number"？

输入值为字符串。Zod v4 下请用 `z.coerce.number()`（再 `.min(...)`），或写一个先解析再校验的字段级 `validate`。

### 如何重置表单为初始值？

在 `SForm` 上把 `on-reset` 绑定到 `useForm` 返回的 `handleReset`。重置会恢复 `initialValues`、清空 errors/touched，并保持字段值与控件同步。
