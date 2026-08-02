# C28 `textarea` 检查优化报告

> **组件编号：** C28
> **组件名称：** `textarea` / `STextarea`（headless `TextareaRoot` + `TextareaControl` + `TextareaClear` + `TextareaCounter` + `TextareaCompact` 聚合；`scv()` 配方 `textareaVariants`，4 UI slots）
> **模式：** 多槽（Compact 聚合，`clear` / `counter` / `footer` 槽）
> **优先级：** P0
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `textarea` 完成全维度审计。组件架构清晰：headless 层由 `TextareaRoot`（受控/非受控 `modelValue`、`count`/`autosizeOptions` 计算、`onClear` 禁用守卫、表单代理 hidden input、`role="group"` 容器）→ `TextareaControl`（原生 `<textarea>`，autosize watch + `adjustHeight` 布局测量）→ `TextareaClear`（清除按钮，i18n aria-label + 禁用联动）/ `TextareaCounter`（`count / maxlength` 计数）构成，`TextareaCompact` 组合三者并暴露 `clear` / `counter` / `footer` 槽与 `textareaRef` / `clearable` / `showCounter` / `controlProps` / `clearProps` / `counterProps` 转发面。styled 层 `textareaVariants` 提供 6 尺寸变体与 `resize`（none/vertical/horizontal）控制；UI 层 `STextarea` 薄包装（`size` / `resize` / `ui` / `class`），`provideTextareaUi` 注入。

**源码未发现 Blocker/Major 缺陷**——`clear` 按钮 a11y（i18n `aria-label` + 图标 `aria-hidden`）已于早期族系建设中完成，autosize（minRows/maxRows + overflow 切换）与表单提交代理均已就位。本次主要工作为补齐测试覆盖与浏览器级行为验证，记录 4 项族系级增强评估：

1. **D7-11 测试覆盖不足（已处理）**：单测仅 8 项，未覆盖属性透传 / 表单代理 / 尺寸变体 / 计数器 / autosize 内联样式 / textareaRef / 禁用只读联动 / clear aria。扩展至 **26 项**全通过。
2. **D7-10 autosize 依赖真实布局（已处理）**：`adjustHeight` 读取 `scrollHeight`/`getComputedStyle`，happy-dom 无布局引擎无法验证。新增**浏览器 e2e 5 项**验证：随内容生长、maxRows 封顶 + `overflow-y: auto`、counter 实时更新、清除交互、axe 零违规。
3. **Minor (D2-11 记录)**：IME 组合事件、`change` 事件、counter `aria-live`、容器宽度变化响应均未实现——为 input/textarea 族系共性问题，列入遗留增强统一评估。
4. **说明 (D1-09)**：`textareaVariants` slots keys（root/control/counter/clear）与 headless `TextareaUiSlot` 完全一致，`// @unocss-include` 首行存在，通过。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                   |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 受控/非受控双通道、disabled / readonly / maxlength / minlength / placeholder / autofocus 全透传；clearable + 禁用态联动；autosize（boolean/对象、minRows/maxRows、overflow 切换）；`name` 时表单代理 hidden input；counter 计数（有/无 maxlength 两种形态）                            |
| D2 行业对标 |  ✅  | 尺寸变体（xs…2xl）、`resize` 三态、autosize 与 AntD `autoSize` / Element Plus `autosize` 对齐；清除按钮 hover 显示（`group-hover`/`group-focus-within`）；6 尺寸与 `footer` 槽为差异化增强；`showCount`/`error`/`loading` 列入遗留增强                                                 |
| D3 API 设计 |  ✅  | `modelValue` / `defaultValue` / `update:modelValue` 符合 Vue 3 约定；`textareaRef` 回调、`controlProps` / `clearProps` / `counterProps` 按元素转发；`clear` / `counter` / `footer` 槽 props（`modelValue`/`clear`/`count`/`maxlength`）类型完整；`clear` 事件载荷 `PointerEvent`       |
| D4 类型系统 |  ✅  | strict 通过（含新增 e2e 文件 vue-tsc）；`TextareaBaseProps` 提炼公共字段、`FormFieldCommonProps` 复用；`TextareaAutosizeOptions` 独立类型；`TextareaUiSlot` / `UiClass<TextareaUiSlot>` 完整；JSDoc 齐全                                                                               |
| D5 代码规范 |  ✅  | `useOmitProps` / `useForwardElement` / `transformPropsToContext` 规范；context 值全响应式（`ShallowRef` / `ComputedRef`）；无样式注入 headless；`adjustHeight` 纯函数守卫（null/undefined 早退）；`aria-roledescription="Textarea"` 与 `spellcheck="false"` 为有意的组件级设定（记录） |
|   D6 文档   |  ✅  | 既有中英文档齐备（Overview / Usage / Demos / API）；playground 6 个示例覆盖基础 / autosize / clearable / disabled / counter / footer 场景                                                                                                                                              |
|   D7 其他   |  ✅  | 单测 8 → 26 项全通过（渲染属性透传 / 尺寸变体 / 表单代理 / 计数器两形态 / autosize 内联样式 / 受控非受控 / textareaRef / 清除交互 / 禁用只读联动 / clear aria 默认与覆盖 / axe ×2）；浏览器 e2e 5 项全通过（autosize 生长与封顶、counter、清除、axe 零违规）                           |

---

## 二、行业对标矩阵

| 能力                     | SoybeanUI | Ant Design `Input.TextArea` | Element Plus `Input` | Mantine `Textarea` |
| :----------------------- | :-------: | :-------------------------: | :------------------: | :----------------: |
| headless/styled 分离     |    ✅     |              —              |          —           |         —          |
| 受控/非受控双通道        |    ✅     |             ✅              |          ✅          |         ✅         |
| autosize（min/max 行数） |    ✅     |             ✅              |          ✅          |         ✅         |
| 清除按钮（悬停显示）     |    ✅     |              —              |          ✅          |         —          |
| 清除按钮 i18n aria-label |    ✅     |              —              |          —           |         —          |
| 字符计数器 `count/max`   |    ✅     |             ✅              |          ✅          |         —          |
| 禁用/只读联动            |    ✅     |             ✅              |          ✅          |         ✅         |
| 尺寸变体                 |    ✅     |              —              |          —           |         —          |
| `resize` 三态            |    ✅     |              —              |          ✅          |         ✅         |
| 表单代理 hidden input    |    ✅     |              —              |          —           |         —          |
| 底部 `footer` 槽         |    ✅     |              —              |          —           |         —          |
| error 态                 |     —     |              —              |          ✅          |         ✅         |

---

## 三、发现的问题与处理

### 3.1 D7-11 — 单测覆盖不足（已扩展 8 → 26 项）

**问题：** [textarea.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/textarea.spec.ts) 原仅 8 项，缺少数值类组件的核心断言：属性透传（placeholder/readonly/maxlength/minlength）、`size` 变体类、表单代理 hidden input（有/无 `name`）、计数器两种形态（有/无 maxlength）、autosize 内联样式、非受控 `defaultValue`、`textareaRef` 回调、禁用/只读时清除按钮不触发、clear aria-label 默认值与覆盖、axe 标签 + 完整场景。

**处理：** 扩展至 **26 项**，结构对齐 input.spec（rendering / autosize / model value / disabled state / clear accessibility / accessibility 六组），全部通过。

```bash
✓ test/specs/components/textarea.spec.ts (26 tests) 65ms
```

### 3.2 D7-10 — autosize 依赖真实布局测量（新增浏览器 e2e）

**说明：** `adjustHeight`（[shared.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/textarea/shared.ts)）读取 `scrollHeight` / `getComputedStyle`（padding、line-height）并回写 `height` / `overflow-y`——happy-dom 无布局引擎，单测只能断言响应式内联样式（`resize: none` + `overflow-y: hidden`）。真实行为须浏览器级验证。

**处理：** 新增 [textarea.e2e.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/browser/specs/components/textarea.e2e.spec.ts) 5 项，全通过：

1. **随内容生长**：初始 `offsetHeight` 即按内容设定，输入 4 行后高度增长（验证 `immediate` post-flush watch 在挂载时已生效）。
2. **maxRows 封顶**：输入 1000 字符触发换行溢出后 `style.overflowY === 'auto'`，继续输入高度不再增长（验证 `Math.min(scrollHeight, maxHeight)` 封顶 + overflow 切换）。
3. **counter 实时更新**：输入 5 字符后 `5 / 20` 可见。
4. **清除交互**：`getByRole('button', { name: 'Clear textarea' })` 点击后值为空（验证 i18n aria-label 作为可访问名称）。
5. **axe 零违规**（withTheme 真实样式）：标签 + clearable + showCounter 场景 `region` 豁免后零违规。

### 3.3 记录 — 族系级增强评估（D2-11，跨组件统一，非阻塞）

- **IME 组合事件**：`onInput` 未处理 `compositionstart/end`，中文输入法候选态会触发中间值更新。input（C27）同样缺失，属族系共性问题，建议 C27–C31 统一评估（Element Plus 的 `handleComposition` 方案）。
- **`change` 事件**：textarea 仅暴露 `update:modelValue`，无原生 `change`（失焦时值）。与 input 一致，族系统一设计；如需 blur 语义可监听 attrs 透传的 `@change`。
- **counter `aria-live`**：字符计数器为静态 `div`，SR 不播报计数变化。多数主流库同样不播报；`aria-live="polite"` 可作为后续增强。
- **autosize 容器宽度响应**：宽度变化（如窗口缩放）不会触发 `adjustHeight`（watch 仅监听 modelValue），需 ResizeObserver 方案。AntD 同样存在，属已知边界。

### 3.4 说明 — 组件级硬编码行为（D1-09 复核）

- `TextareaControl` 硬编码 `aria-roledescription="Textarea"`、`spellcheck="false"`、`autocorrect="off"`、`tabindex="0"`：为有意的组件级设定（与 input 族一致），非缺陷，保留。
- `textareaVariants` 的 `resize: false` 变体在 `autosize` 开启时由 UI 层强制（`resize: !props.autosize ? props.resize : false`），内联 `overflow-y` 由 adjustHeight 接管——双保险无冲突。
- `VisuallyHiddenInput` 固定 `type="text"`：多行值随表单以字符串提交，符合预期。

---

## 四、架构与模式要点

### Compact 聚合的四元组

`TextareaRoot`（值状态 + count/autosizeOptions context + 容器）→ `TextareaControl`（原生元素 + autosize watch）→ `TextareaClear`（清除交互）+ `TextareaCounter`（计数展示），`TextareaCompact` 负责组合与 `clear` / `counter` / `footer` 槽位转发。`autosizeOptions` 统一归一化（`true` → `{}`、对象 → 原文），消费方只面向单一类型。

### autosize 的测量-回写模式

`adjustHeight` 以 `height = 'auto'` 先复位再读 `scrollHeight`，min/max 行高按 `lineHeight × rows + paddingTop/Bottom` 计算，最后按 `scrollHeight > height` 判定 overflow——经典自增高文本域实现，纯函数化便于单测与复用。

### 表单提交代理

`name` 存在且 `formControl` 时渲染 `VisuallyHiddenInput`（`formControl` 默认 true 以支持 SSR 无 JS 冒泡），值随表单提交而不破坏视觉布局。

---

## 五、变更文件清单

| 文件                                                             | 变更类型                                                                                                                        |
| :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui/test/specs/components/textarea.spec.ts`             | 单测 8 → 26 项（渲染属性透传 / 尺寸变体 / 表单代理 / 计数器 / autosize 内联样式 / 受控非受控 / 禁用联动 / clear aria / axe ×2） |
| `packages/ui/test/browser/specs/components/textarea.e2e.spec.ts` | 新增浏览器 e2e 5 项（autosize 生长 / maxRows 封顶+overflow / counter / 清除 / axe）                                             |
| `docs/check.md`                                                  | 标记 C28 各维度为 ✅                                                                                                            |

---

## 六、验证命令

```bash
# 单元测试（26 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/textarea.spec.ts
# → Test Files 1 passed (1) | Tests 26 passed (26)

# 浏览器 e2e（5 项全通过）
cd packages/ui && pnpm exec vitest run --config vitest.browser.config.ts textarea.e2e
# → Test Files 1 passed (1) | Tests 5 passed (5)

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **IME 组合事件 / `change` 事件 / counter `aria-live` / autosize 容器宽度响应**：input/textarea 族系共性问题，建议跨 C27–C31 统一评估（Element Plus `handleComposition`、`aria-live="polite"`、ResizeObserver 均为成熟方案）。非阻塞。
- **`error` 态 / `status` 提示**：AntD / Element Plus 已实现（`error` 边框 + 提示文案），本项目经 `footer` 槽可手动搭建，列统一评估。非阻塞。
