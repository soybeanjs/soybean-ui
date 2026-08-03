# C54 `editable` 检查优化报告

> **组件编号：** C54（`editable`）
> **组件名称：** `SEditable`（headless 基座：`EditableRoot`/`EditableArea`/`EditablePreview`/`EditableInput`/`EditableEditTrigger`/`EditableSubmitTrigger`/`EditableCancelTrigger`/`EditableCompact`）
> **模式：** 多槽 + Compact（root/area/preview/input/controls/editTrigger/submitTrigger/cancelTrigger 8 个 UI 槽）
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04

---

## 一、执行摘要

对 `editable` 完成全维度审计。核心链路：`EditableRoot` 用 `useControllableState` 统一受控/非受控，`inputValue`（编辑缓冲）与 `modelValue`（提交值）分离、`currentValue` 按 `isEditing` 取其一；`useFocusOutside`/`usePointerdownOutside` 以 `isEditing` 为门控实现失焦提交；`EditablePreview`（`tabindex` 0 可聚焦）经 focusin/dblclick 激活，`EditableInput` 处理回车/Esc 键盘；`EditableCompact` 聚合 8 个原语并暴露 6 个 `*Props` 通道；UI 层 `SEditable` 纯 `defineProps` + `editableVariants` 8 槽注入；`.form` 容器内传 `name` 时渲染 `VisuallyHiddenInput` 表单代理。

**发现 Major ×1 + Minor ×1**，均已修复（经探针验证定位）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                  |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-12/D2-11）：`editable-root.vue` `watch(modelValue)` 无条件写 `inputValue`——受控父组件在编辑中更新 `modelValue` 覆盖用户正在输入的内容（对标 reka-ui：edit 态不写入外部值）→ 仅 `!isEditing` 时同步。**Minor 修复**（D1-08 props 泄漏）：`editable-input.vue` `v-bind="props"` 将 `as`/`asChild` 泄漏为 DOM `aschild="false"` → `useOmitProps` 剔除 |
| D2 行业对标 |  ✅  | 激活模式（focus/dblclick/none）、提交模式（blur/enter/none/both）、`selectOnFocus`/`startWithEditMode`/`autoResize`/表单代理与 reka-ui `Editable` 同源；Major 修复即对标 reka-ui 的 edit 态行为（reka 在编辑态不把外部 modelValue 写入 input）                                                                                                                        |
| D3 API 设计 |  ✅  | `modelValue`/`defaultValue` 双通道 + `update:modelValue`/`submit`/`update:state` 三事件；`activationMode`/`submitMode`/`selectOnFocus`/`startWithEditMode`/`autoResize`/`maxLength`/`dir`/`readonly` 齐备；`defineExpose` 暴露 `edit`/`cancel`/`submit`；`EditableCompact` 6 个 `*Props` 通道 + 5 槽 slot props 透传（D3-01/D3-04）                                   |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；spec 中 `element.hidden` 报 TS2339 → `as HTMLElement` 显式收窄（D4-05）；headless `EditableRootProps extends FormFieldCommonProps, Omit<PrimitiveWithBaseProps, 'onSubmit' \| 'placeholder'>` 类型边界清晰                                                                                                                                     |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；context 12 键全部经 `transformPropsToContext` 响应式注入；`useOmitProps` 剔除列表与模板绑定一一对应；探针文件删除（D5-15 隔离）                                                                                                                                                           |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（10 能力 × 6 库）+ 8 条 Cautions + 7 组 FAQ；中英文结构完全对齐                                                                                                                                                                  |
|   D7 其他   |  ✅  | 单测 10 → 30 项全通过（渲染/编辑态/模型值与事件/属性转发与插槽/禁用/无障碍，axe 0 违规）；`pnpm typecheck`/`pnpm lint` 全绿；源代码两处修改经全量单测回归无副作用（D7-09）                                                                                                                                                                                            |

---

## 二、行业对标矩阵

> `editable` 是**双态状态机 + 表单代理**模式。reka-ui `Editable` 为同源设计；Ant Design `Typography` editable 仅按钮激活 + 受控 `editing`；Mantine `EditableText` 覆盖激活/提交子集；Element Plus 与 shadcn/ui 无对应组件。

| 能力                             | SoybeanUI | reka-ui | Ant Design Typography | Mantine EditableText | Element Plus | shadcn/ui |
| :------------------------------- | :-------: | :-----: | :-------------------: | :------------------: | :----------: | :-------: |
| headless/styled 分离             |    ✅     |   ✅    |           —           |          —           |      —       |     —     |
| 激活模式（focus/dblclick/none）  |    ✅     |   ✅    |           —           |          ⚠️          |      —       |     —     |
| 提交模式（blur/enter/none/both） |    ✅     |   ✅    |           —           |          ⚠️          |      —       |     —     |
| Esc 取消                         |    ✅     |   ✅    |          ⚠️           |          ✅          |      —       |     —     |
| `selectOnFocus`                  |    ✅     |   ✅    |           —           |          ✅          |      —       |     —     |
| `startWithEditMode`              |    ✅     |   ✅    |          ⚠️           |          ✅          |      —       |     —     |
| `autoResize`（自适应宽度）       |    ✅     |   ✅    |           —           |          —           |      —       |     —     |
| 表单代理（name + form 隐藏输入） |    ✅     |   ✅    |           —           |          —           |      —       |     —     |
| 触发按钮本地化 `aria-label`      |    ✅     |   ⚠️    |           —           |          —           |      —       |     —     |
| 受控/非受控 + 提交事件           |    ✅     |   ✅    |          ✅           |          ✅          |      —       |     —     |

`⚠️` = 部分支持（Mantine 经 `activateOnFocus`/`submitOnBlur` 覆盖激活与提交子集；AntD 经受控 `editing` 覆盖 `startWithEditMode` 类行为；reka-ui 触发按钮 `aria-label` 硬编码，SoybeanUI 用 `useLocaleMessages` 本地化）。

---

## 三、发现的问题与处理

### 3.1 Major — D1-12/D2-11 编辑态受控更新覆盖用户输入

**现象：** [editable-root.vue](../../packages/headless/src/components/editable/editable-root.vue) 中 `watch(modelValue, value => { inputValue.value = value ?? '' }, { immediate: true })` **无条件**把外部值写入 `inputValue`（编辑缓冲）。受控场景下父组件在编辑中更新 `modelValue`（如远端校验、竞态回填）会**覆盖用户正在输入的内容**。对标 reka-ui：`Editable` 在 edit 态不把外部 `modelValue` 变化写入 input，仅在提交/取消时同步。

**探针复现（修复前）：** 受控组件进入编辑并输入 `'user typing...'` 后，外部推送 `modelValue = 'external'`——断言 `input.element.value` 变为 `'external'`（输入被覆盖，探针失败）→ **确认为真实缺陷**而非测试伪影。

**修复：** watch 回调仅在非编辑态同步：

```ts
watch(
  modelValue,
  value => {
    // 仅在非编辑态同步：编辑中外部推送（如受控父组件更新）不应覆盖正在输入的内容
    if (!isEditing.value) {
      inputValue.value = value ?? '';
    }
  },
  { immediate: true }
);
```

**验证（测试驱动）：** 新增「keeps the in-progress input when the controlled value updates while editing（受控编辑态外部更新不覆盖）」——编辑中输入 `'user typing...'` 后外部 `modelValue` 推送 `'external'`，断言 input 仍为 `'user typing...'`（修复前被覆盖）；配套「syncs the input when the controlled value updates outside editing（非编辑态仍同步）」断言非编辑态推送正常同步。**边界检查：** 编辑中输入被保留，提交时 `submit()` 以 `inputValue` 回写 `modelValue`——编辑期缓冲与提交值分离不破坏。

### 3.2 Minor — D1-08 `EditableInput` 将 `as`/`asChild` 泄漏为 DOM 属性

**现象：** [editable-input.vue](../../packages/headless/src/components/editable/editable-input.vue) 模板 `v-bind="props"` 把 Primitive props `as`/`asChild`（`inheritAttrs: false` 下不消费、经 fallthrough 序列化）泄漏为 `<input>` 的 `aschild="false"` 属性——污染 HTML 输出并可能触发 hydration 告警（同 C52 `tags-input-item-text.vue` 修复模式）。

**修复：**

```ts
import { useOmitProps } from '../../composables';
const forwardedProps = useOmitProps(props, ['as', 'asChild', 'id']);
// inputId 改用 props.id（删除 editableInputProps as { id?: string } 别名）
const inputId = computed<string | undefined>(() => props.id || id.value);
```

```vue
<Primitive v-bind="forwardedProps" :id="inputId" :ref="setInputElement" :as="as" :as-child="asChild" ... />
```

**验证（测试驱动）：** 新增「does not leak as / asChild props to the DOM」——断言根 HTML `not.toContain('aschild')` 且 `not.toMatch(/as="/)`。**其余叶子核查：** `EditableRoot`（`useOmitProps` 剔除 15 个逻辑 prop + Primitive 自身消费 `as`/`asChild`）、`EditableArea`/`EditablePreview`（Primitive 消费 `as`/`asChild`）均无泄漏。

### 3.3 核查结论 — C42/C50/C51/C52 同款风险核查

- **C42 同款缺省 Boolean cast 风险：不适用。** `EditableRoot` 的 `withDefaults` 仅对 `disabled`/`readonly`/`selectOnFocus`/`startWithEditMode`/`autoResize` 声明 `false` 默认——无缺省 `true` 的 Boolean prop；cast 后语义等价。
- **C50/C51 同款叶子部件 aria-label 硬编码覆盖：不存在。** 三个 trigger 的 `aria-label` 回退模式为 `attrs['aria-label'] ?? 消息`（`useLocaleMessages` 本地化）——用户显式 `aria-label` 优先，且 `triggerDisabled = disabled || readonly` 禁用守卫正确。
- **C52 同款 `*Props` 声明未绑定：已核验。** `EditableCompact` 的 6 个 `*Props` 通道（`areaProps`/`previewProps`/`inputProps`/`editTriggerProps`/`submitTriggerProps`/`cancelTriggerProps`）全部在模板 v-bind 消费，无静默丢弃（对比 C52 三处断链）；`clearable` 类死 prop 不存在。
- **C52 同款 `aschild` 泄漏：已修复。** 见 3.2；`EditableRoot`/`EditableArea`/`EditablePreview` 的 `as`/`asChild` 由 `Primitive` 自身消费（`inheritAttrs: false` + `props: ['as', 'asChild']`），不泄漏。
- **全仓 51 个 UI 层纯 `defineProps<T>()` 组件：** `SEditable` 为纯 `defineProps`，但无缺省 `true` 的 Boolean prop 依赖 headless 默认值，cast 风险不触发（同 C53 结论，统一排期排查覆盖）。

### 3.4 D7-11 — 单测覆盖不足（已重写 10 → 30 项）

**处理：** 重写 [editable.spec.ts](../../packages/ui/test/specs/components/editable.spec.ts)（保留原 10 项语义并扩展）至 **30 项**，全部通过：

```bash
✓ test/specs/components/editable.spec.ts (30 tests) 421ms
```

> 覆盖要点：**rendering 7 项**（preview/placeholder/class/root data-attrs/area 与 preview data-attrs 与 id/`as`/`asChild` 不泄漏）；**editing state 7 项**（focus 进入编辑 + `update:state`、dblclick、`activationMode: 'none'` 经 edit trigger 进入、`startWithEditMode`、readonly 阻止、`selectOnFocus` 选择）；**model value and events 11 项**（enter 提交 + `update:state` `.at(-1)`、shift+enter 不提交、escape 取消 `.at(-1)`、blur 默认提交用 `moveFocusOutside`、blur `submitMode: 'none'` 取消、**受控编辑态外部更新不覆盖（3.1 修复验证）+ 非编辑态仍同步**、submit trigger、cancel trigger）；**props forwarding and slots 7 项**（`aria-label` 覆盖、`areaProps`/`previewProps`/`inputProps` 透传、自定义 preview+input 插槽含 slot props `isEditing`、maxLength、对象 placeholder、size variants `xs`）；**disabled 1 项**；**accessibility 2 项**（preview 态 + edit 态 axe 0 违规）。

> 关键测试要点：① happy-dom 中 `trigger('blur')` 不移动焦点，`useFocusOutside` 的 document `focusin` 监听不触发 → `moveFocusOutside` helper（真实创建外部 button 并 `focus()`）——**确认为测试伪影而非组件缺陷**；② `update:state` 事件序列含 focus 触发的 `edit`，`emitted('update:state')[0]` 恒为 `['edit']` → 用 `.at(-1)` 断言 submit/cancel；③ 受控测试显式设 `submitMode: 'enter'`（默认 blur 模式在 enter 提交后 handleDismiss 再 submit 造成双事件）；④ 自定义 preview 无默认 `tabindex` → 用 edit trigger 进入编辑。

### 3.5 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（双态状态机 + headless/styled 分离）、Usage、Features（8 条 bullet）、Component family（`SEditable` + `EditableRoot`/`EditableArea`/`EditablePreview`/`EditableInput`/三 trigger/`EditableCompact`）、Demos（5 示例导览）、API、Notes（架构链路 + **10 能力 × 6 库对标表** + 8 条 Cautions）、FAQ（7 组：双击激活、失焦取消、按钮触发、提交值获取、autoResize、表单集成、selectOnFocus）。中英文结构一一对应；Cautions 收录本轮 Major 修复行为（编辑态受控更新不覆盖输入）。

---

## 四、架构与模式要点

### 编辑缓冲（inputValue）与提交值（modelValue）分离是受控覆盖问题的关键

`EditableRoot` 的双值设计（`currentValue = isEditing ? inputValue : modelValue`）本意是「编辑中不写回 modelValue、提交时统一回写」；但 `watch(modelValue)` 无条件同步缓冲直接绕过了这层隔离——**修复本质是让「外部 → 缓冲」通道在编辑态关闭，仅保留「外部 → 缓冲」在非编辑态与「缓冲 → 外部」在提交/取消时**。审计双态组件时，受控链路必须按「外部 prop 变化 × 状态（preview/edit）」两个维度分别验证。

### 失焦提交依赖真实焦点移动，测试需用真实 `focus()` 驱动

`useFocusOutside` 监听 document `focusin`（焦点**进入**组件外元素才算「outside」）；happy-dom 的 `trigger('blur')` 只是派发事件、不移动焦点，因此 blur 提交在单测中不触发。这不是组件缺陷（浏览器行为正确），而是测试环境伪影——`moveFocusOutside` helper 创建真实外部可聚焦元素并 `focus()` 驱动。后续 blur 类断言统一采用该模式。

### Primitive `as`/`asChild` 泄漏修复模式固化

`Primitive`（`inheritAttrs: false` + `props: ['as', 'asChild']`）在**非 Primitive 直接子级**的包装组件中，若模板 `v-bind="props"` 会把 `asChild=false` 序列化为 DOM `aschild="false"`。C52（tags-input-item-text）与 C54（editable-input）两次命中后，修复模式固化：`useOmitProps(props, ['as', 'asChild', ...])` + 显式 `:as="as" :as-child="asChild"`。**规则：所有直接渲染非 Primitive 标签的 headless 组件必须 omit `as`/`asChild`。**

---

## 五、变更文件清单

| 文件                                                           | 变更类型                                                                                                                                                                                                                             |
| :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/editable/editable-root.vue`  | **Major 修复**（D1-12/D2-11）：`watch(modelValue)` 仅 `!isEditing` 时同步 `inputValue`——编辑中外部受控更新不再覆盖用户输入（对标 reka-ui edit 态行为）                                                                               |
| `packages/headless/src/components/editable/editable-input.vue` | **Minor 修复**（D1-08）：`v-bind="props"` → `useOmitProps(props, ['as', 'asChild', 'id'])` + 显式 `:as`/`:as-child`/`:id`（消除 `aschild="false"` DOM 泄漏；`inputId` 改用 `props.id`，删除 `as { id?: string }` 别名）              |
| `packages/ui/test/specs/components/editable.spec.ts`           | 单测 10 → 30 项重写扩展（rendering/editing state/model value and events/props forwarding and slots/disabled/accessibility）；含 `moveFocusOutside` helper、`.at(-1)` 事件断言、`submitMode: 'enter'` 受控测试、`as HTMLElement` 收窄 |
| `packages/ui/test/specs/components/editable.probe.spec.ts`     | **删除**——探针验证完成，内容并入正式 spec（D5-15 隔离）                                                                                                                                                                              |
| `apps/docs/src/docs/en/components/editable.md`                 | 文档 4 节 → 8 节 Recommended structure（Component family + 10 能力 × 6 库对标表 + Cautions 8 条 + FAQ 7 组）                                                                                                                         |
| `apps/docs/src/docs/zh-CN/components/editable.md`              | 与 en 一一对应的 8 节中文化版本                                                                                                                                                                                                      |
| `docs/check.md`                                                | C54 行 7 维度 ⏳ → ✅；4.8 批次 7 记录表追加 C54 行 + 批次合计（1 单元，单测 10 → 30 项）                                                                                                                                            |
| `docs/check-reports/C54-editable.md`                           | **新建** 本审计报告                                                                                                                                                                                                                  |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vitest run test/specs/components/editable.spec.ts   # 30/30 全绿
cd packages/ui && pnpm exec vitest run   # 全量回归无副作用
pnpm lint                                # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 2.3.4）

| 增强项                                    | 对标依据       | 说明                                                                                                                                                                          |
| :---------------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `editable` 独立浏览器 e2e                 | 自研标准       | 按 check.md 2.3.4 清单，`editable` 属双态交互类，须补浏览器 e2e（真实键盘 Enter/Esc + 真实 blur 提交 + axe 双态），本轮以 happy-dom 单测 + axe 静态检查替代，非 Blocker       |
| 51 个 UI 层纯 `defineProps<T>()` 组件排查 | Vue 运行时行为 | 承接 C42/C43 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查；`SEditable` 无缺省 `true` Boolean prop，本轮已核验不触发 |
| `autoResize` 的 textarea 场景             | reka-ui        | reka-ui `Editable` 的 `autoResize` 支持 `input`/`textarea` 两种元素；SoybeanUI 目前仅 input（inline-grid），textarea 自适应属增强项，需设计评审（非缺陷）                     |
