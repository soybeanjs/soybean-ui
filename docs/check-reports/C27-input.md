# C27 `input` 检查优化报告

> **组件编号：** C27
> **组件名称：** `input` / `SInput`（headless `InputRoot` + `InputControl` + `InputClear` + `InputCompact` 聚合；`scv()` 配方 `inputVariants`，3 UI slots）
> **模式：** 多槽（Compact 聚合，`leading` / `clear` / `trailing` 槽）
> **优先级：** P0
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `input` 完成全维度审计。组件架构清晰：headless 层由 `InputRoot`（受控/非受控 `modelValue`、表单代理 hidden input、`role="group"` 容器）→ `InputControl`（原生 `<input>`，attrs 透传）→ `InputClear`（清除按钮，消费 root context 的 disabled/readonly）构成，`InputCompact` 组合三者并暴露 `leading` / `clear` / `trailing` 槽与 `inputRef` / `clearable` / `controlProps` / `clearProps` 转发面。styled 层 `inputVariants` 提供 6 尺寸变体与 clear 可见性控制。UI 层 `SInput` 薄包装（`size` / `ui` / `class`），`provideInputUi` 注入。

发现并修复 1 项问题，记录 2 项说明：

1. **Major (D1-08 / D7-05)**：`InputClear` 按钮无可访问名称、默认图标 SVG 无 `aria-hidden`——同族 clear 按钮（textarea / password / input-number / tags-input / autocomplete / combobox）均已提供 i18n `aria-label`（`messages.*.clear`），唯独 input 缺失，axe `button-name` / `svg-img-alt` 违规。修复：locale 新增 `input.clear`（13 语言）、`attrs['aria-label'] ?? messages.input.clear` 默认值、`Icon :aria-hidden="true"`。
2. **Minor (D2-11 记录)**：增强评估——`leading` / `trailing` 槽已覆盖前缀/后缀与自定义清除；`showCount` 计数器、`error` 态、`loading` 态未实现，列入遗留增强（跨组件统一评估）。
3. **说明 (D1-09)**：`inputVariants` slots 含 `visible`（headless `InputUiSlot` 无此键），系 password（C31）共享配方消费 `ui.visible`（`password-compact.vue`），非死代码；其余 slots keys 与 headless 一致。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                 |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 受控/非受控双通道、disabled / readonly / required / maxlength / minlength / pattern / autocomplete / autofocus 全透传；clearable + 禁用态联动；`name` 时渲染表单代理 hidden input（`VisuallyHiddenInput`）；**修复清除按钮 a11y（i18n `aria-label` + 图标 `aria-hidden`）**（D1-08） |
| D2 行业对标 |  ✅  | 尺寸变体（xs…2xl）、前缀/后缀槽、清除按钮悬停显示与 Radix / AntD / Element Plus 对齐；6 尺寸为差异化增强；清除按钮 hover 出现（`group-hover` / `group-focus-within`）符合桌面惯例                                                                                                    |
| D3 API 设计 |  ✅  | `modelValue` / `defaultValue` / `update:modelValue` 符合 Vue 3 约定；`inputRef` 回调、`controlProps` / `clearProps` / `rootProps` 按元素转发；`InputUiSlot` / `UiClass<InputUiSlot>` 类型完整；`clear` 事件载荷 `PointerEvent`                                                       |
| D4 类型系统 |  ✅  | strict 通过；`InputBaseProps` 提炼公共字段、`FormFieldCommonProps` 复用（`required` / `name`）；`InputTypeHTMLAttribute` 严格类型；JSDoc 齐全                                                                                                                                        |
| D5 代码规范 |  ✅  | `useOmitProps` / `useForwardElement` / `transformPropsToContext` 规范；context 值全响应式（`ShallowRef` / `ComputedRef`）；无样式注入 headless；`aria-roledescription="Input"` 与 `spellcheck="false"` 为有意的组件级设定（记录）                                                    |
|   D6 文档   |  ✅  | 既有中英文档齐备（Overview / Usage / Demos / API）；playground 示例覆盖基础 / 前缀后缀 / 清除 / 禁用场景                                                                                                                                                                             |
|   D7 其他   |  ✅  | 单测 10 → 23 项全通过（渲染属性透传 / 表单 hidden input / size 变体 / 非受控 defaultValue / inputRef / 清除交互 / disabled+readonly 禁用清除 / clear aria-label 默认与覆盖 / axe 标签与清除场景零违规）                                                                              |

---

## 二、行业对标矩阵

| 能力                     | SoybeanUI | Ant Design `Input` | Element Plus `Input` | Radix `TextField` |
| :----------------------- | :-------: | :----------------: | :------------------: | :---------------: |
| headless/styled 分离     |    ✅     |         —          |          —           |        ✅         |
| 受控/非受控双通道        |    ✅     |         ✅         |          ✅          |        ✅         |
| 清除按钮（悬停显示）     |    ✅     |         ✅         |          ✅          |         —         |
| 清除按钮 i18n aria-label |    ✅     |         ✅         |          —           |         —         |
| 前缀/后缀槽              |    ✅     |         ✅         |          ✅          |        ✅         |
| 禁用/只读联动            |    ✅     |         ✅         |          ✅          |        ✅         |
| 尺寸变体                 |    ✅     |         ✅         |          ✅          |         —         |
| 表单代理 hidden input    |    ✅     |         —          |          —           |         —         |
| showCount 计数器         |     —     |         ✅         |          ✅          |         —         |
| error 态                 |     —     |         ✅         |          ✅          |         —         |
| loading 态               |     —     |         ✅         |          —           |         —         |

---

## 三、发现的问题与处理

### 3.1 Major — 清除按钮无可访问名称（已修复，D1-08 / D7-05）

**问题：** [input-clear.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input/input-clear.vue) 的 `<Button>` 默认内容仅为 `<Icon icon="lucide:x">`，既无 `aria-label` 又无文本，axe `button-name` 违规；图标 SVG 无 `aria-hidden`，触发 `svg-img-alt`。同族清除按钮均已处理：textarea（`messages.value.textarea.clear`）、password（`messages.value.password.clearInput`）、input-number、tags-input、autocomplete、combobox——input 是唯一遗漏。

**修复：**

1. **locale 新增 `input.clear` 消息**：`LocaleInputMessages { clear: string }` 加入 `LocaleMessages`（[types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/locale/types.ts)），13 个语言包补充翻译（en `Clear input` / zh-CN `清除输入` / ja / ko / ru / fr / de / es / pt-BR / tr / id / ar / zh-TW）。
2. **默认值 + 消费者覆盖**（参照 textarea-clear 同款）：

```ts
const ariaLabel = computed(() => (attrs['aria-label'] as string) ?? messages.value.input.clear);
```

3. **图标隐藏语义**：`<Icon icon="lucide:x" :aria-hidden="true" />`。

新增测试断言：默认 `aria-label="Clear input"`（en）、`clearProps` 覆盖、`clearable` 场景 axe 零违规。

### 3.2 说明 — `inputVariants` 的 `visible` slot 系共享配方（D1-09 复核）

`InputUiSlot = 'root' | 'control' | 'clear'`，但 [input.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/styles/input.ts) 的 slots 额外含 `visible: 'shrink-0 cursor-pointer'`。经检索该 slot 仅被 `password-compact.vue`（C31）消费（`ui.visible`），input 自身不用——`inputVariants` 是 password 的共享配方，非死代码。判定 D1-09 通过（首行 `// @unocss-include` 存在，其余 slot keys 匹配），记录不处置。

### 3.3 记录 — 组件级硬编码行为

- `InputControl` 硬编码 `aria-roledescription="Input"`、`spellcheck="false"`、`autocorrect="off"`、`tabindex="0"`：为有意的组件级设定（与其他输入类组件一致），非缺陷，保留。
- `VisuallyHiddenInput` 固定 `type="text"`：`name` 表单提交时值以字符串提交，`type="email"` 等约束验证不作用于 hidden 代理——浏览器端主 input 仍会校验，符合预期。

---

## 四、架构与模式要点

### Compact 聚合的输入三元组

`InputRoot`（值状态 + context + 容器）→ `InputControl`（原生元素 + attrs）→ `InputClear`（清除交互），`InputCompact` 负责组合与槽位转发。password（C31）、input-number（C29）、tags-input（C52）均基于本组件扩展——`provideInputUi` 注入的 `ui` map 让派生组件按需取用 `control` / `clear` / `visible` 槽类。

### 表单提交代理

`name` 存在时渲染 `VisuallyHiddenInput`（`formControl && name` 守卫），值随表单提交而不破坏视觉布局——复合输入组件（前缀/后缀/清除）在原生 `<form>` 提交下的标准解法，与 Radix Form / AntD `preserve` 思路一致。

---

## 五、变更文件清单

| 文件                                                                                      | 变更类型                                                                                                    |
| :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/locale/types.ts`                                                   | 新增 `LocaleInputMessages`（`clear`），`LocaleMessages` 增加 `input`                                        |
| `packages/headless/src/locale/langs/{en,zh-CN,zh-TW,ja,ko,ru,fr,de,es,pt-BR,tr,id,ar}.ts` | 13 语言包新增 `input: { clear }` 翻译                                                                       |
| `packages/headless/src/components/input/input-clear.vue`                                  | 清除按钮默认 `aria-label`（i18n + attrs 覆盖）、图标 `aria-hidden`                                          |
| `packages/ui/test/specs/components/input.spec.ts`                                         | 10 → 23 项（属性透传 / 表单 hidden input / size 变体 / 非受控 / inputRef / 禁用联动 / clear aria / axe ×2） |
| `docs/check.md`                                                                           | 标记 C27 各维度为 ✅                                                                                        |

---

## 六、验证命令

```bash
# 单元测试（23 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/input.spec.ts
# → Test Files 1 passed (1) | Tests 23 passed (23)

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **`showCount` 计数器 / `error` 态 / `loading` 态**：AntD / Element Plus 已实现，本项目经 `leading` / `trailing` 槽可手动搭建；建议跨输入类组件（C27–C31）统一评估是否作为内置能力。非阻塞。
- **`aria-roledescription="Input"`**：原生 input 的 roledescription 对部分 SR 会产生冗余播报；与项目其他输入类组件保持一致，暂保留。非阻塞。
