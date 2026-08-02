# C31 `password` 检查优化报告

> **组件编号：** C31
> **组件名称：** `password` / `SPassword`（headless `PasswordCompact` 聚合，复用 `InputRoot`/`InputControl`/`InputClear` 基座；`scv()` 配方 `passwordVariants` = `extend: [inputVariants]` + 追加 `visible` slot）
> **模式：** 多槽（Compact 聚合，`leading`/`trailing`/`clear`/`visible` 四槽）
> **优先级：** P0
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `password` 完成全维度审计。架构为「input Compact 聚合 + 可见性切换」：`PasswordCompact` 复用 `InputRoot`（受控/非受控 `modelValue`、clear、表单代理）→ `InputControl`（`:type="visible ? 'text' : 'password'"`）→ `InputClear`（clearable 联动）→ 默认 `visible` 槽（`Button` + `lucide:eye/eye-off`，i18n label、`aria-pressed`、disabled/readonly 守卫）；`visible` 用 `useControllableState`（受控/非受控双通道）。styled 层 `passwordVariants` 通过 `extend: [inputVariants]` 继承 input 全部尺寸变体，`extendBase` 将 `visible` slot 覆写为 `miniButtonIconVariants({ size })`（迷你图标按钮）。UI 层 `SPassword` 薄包装（`size`/`ui`/`class` + 动态槽转发），context 经 `providePasswordUi` → `provideInputUi` 复用 input 注入链路。

**发现并修复 1 项 Minor 真实缺陷 + 扩展单测 6 → 25 项：**

1. **Minor (D3-01 / D7-07) `clear` 事件被 UI 层吞掉**：`PasswordCompactEmits` 经 `InputCompactEmits` 声明了 `clear` 事件，但 `SPassword` 包装器只转发了 `update:modelValue`/`update:visible`，未绑定 `@clear` —— 消费者监听 `SPassword @clear` 永远收不到（点击 clear 后值已清空、`update:modelValue` 正常发出，仅 `clear` 事件丢失）。修复为在 `SPassword` 补 `@clear="emit('clear', $event)"` 转发。**SInput（C27）存在同一模式问题，已记录留待其检查轮次处理。**

**测试覆盖从 6 项扩展至 25 项**（渲染/模型值/可见性切换/clear 触发器/disabled/readonly/表单代理/axe ×2），全部通过；`pnpm typecheck` 全绿。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 默认 `type="password"`、切换后 `type="text"` 且值保留；`visible` 受控/非受控双通道（`useControllableState`，受控下 emit `update:visible` 由父级驱动，非受控下内部 `shallowRef` 自持）；clearable 联动（清空值 + `clear` 事件）；disabled/readonly 对 input/visible/clear 三元素全守卫；`name` 表单代理（`VisuallyHiddenInput`）与 input 族系一致；`inputRef` 回调、placeholder/maxlength/pattern 等原生属性透传；visible 按钮 `type="button"` 防表单误提交 |
| D2 行业对标 |  ✅  | 对标 reka-ui `PasswordInput` / shadcn：显示/隐藏切换（eye/eye-off）、i18n 化 `showPassword`/`hidePassword`/`clearInput`（13 语言全齐）、`aria-pressed` 切换语义、disabled/readonly 联动全对齐；`clearable` 可开关、`visibleProps`/`clearProps` 透传为差异化增强；cursor 保留与密码管理器兼容由原生 input 契约保证                                                                                                                                          |
| D3 API 设计 |  ✅  | **修复** `clear` 事件转发；`visible`/`visibleProps`/`clearProps`/`controlProps`/`inputRef` 命名与 input 族系一致；`PasswordCompactSlotProps`（modelValue/clear/visible/toggle）四槽 props 类型完整；`PasswordUiSlot = InputUiSlot \| 'visible'` 扩展点清晰；`type` prop 由 visible 状态接管（用户传入会被覆盖，属密码组件设计意图，已记录）                                                                                                                |
| D4 类型系统 |  ✅  | strict 通过；`PasswordCompactProps`/`Emits`/`Slots`/`PasswordVisibleProps`/`PasswordUi` 类型完整；`InputClearProps extends ButtonProps` 复用；JSDoc 齐全                                                                                                                                                                                                                                                                                                   |
| D5 代码规范 |  ✅  | `useOmitProps` 从 forwarded 中剔除 `inputRef/controlProps/clearable/clearProps/visible/visibleProps`（转内部槽）；context 值全响应式（`ComputedRef`）；`useControllableState` 受控/非受控分支语义正确；无样式注入 headless（`data-soybean-password` 为结构标记）；无泄漏监听/定时器                                                                                                                                                                        |
|   D6 文档   |  ✅  | 中英文档齐备（Overview / Usage / Demos / API）；playground 4 个示例（basic/disabled/clearable/icon）；`clear` 事件已在文档 API 列出，本次修复后与实现一致                                                                                                                                                                                                                                                                                                  |
|   D7 其他   |  ✅  | 单测 6 → 25 项全通过（渲染 / 模型值 / 可见性切换含 aria-label+aria-pressed / 受控 visible / 自定义 visible 槽 / clear 事件与 aria-label / disabled/readonly / 表单代理 / axe ×2）；依赖原生 input 键盘/表单契约且无真实布局依赖，未新增浏览器 e2e（与 input C27/C29 一致）                                                                                                                                                                                 |

---

## 二、行业对标矩阵

| 能力                     | SoybeanUI | reka-ui `PasswordInput` | shadcn | Element Plus `el-input` |
| :----------------------- | :-------: | :---------------------: | :----: | :---------------------: |
| headless/styled 分离     |    ✅     |            —            |   —    |            —            |
| 受控/非受控 `visible`    |    ✅     |           ✅            |   —    |            —            |
| 显示/隐藏切换（icon）    |    ✅     |           ✅            |   ✅   |           ✅            |
| i18n 切换 label          |    ✅     |            —            |   —    |           ✅            |
| `aria-pressed` 语义      |    ✅     |            —            |   —    |            —            |
| clearable 联动           |    ✅     |            —            |   ✅   |           ✅            |
| disabled/readonly 联动   |    ✅     |           ✅            |   ✅   |           ✅            |
| 尺寸变体（xs…2xl）       |    ✅     |            —            |   —    |            —            |
| 自定义 visible 槽        |    ✅     |            —            |   —    |            —            |
| 表单代理（hidden input） |    ✅     |            —            |   —    |            —            |

---

## 三、发现的问题与处理

### 3.1 Minor — `clear` 事件被 `SPassword` 包装器吞掉（D3-01 / D7-07）

**问题：** [password.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/password/password.vue) 的 `PasswordEmits = PasswordCompactEmits`（含经 `InputCompactEmits` 继承的 `clear` 事件），模板仅绑定 `@update:model-value` 与 `@update:visible`，未转发 `@clear`。点击清除按钮时值被清空、`update:modelValue: ['']` 正常发出，但声明为公开 API 的 `clear` 事件在 UI 层丢失。

**影响：** 消费方监听 `<SPassword @clear>` 永远不触发；文档已列出 `clear` 事件与实现不符。

**处理：** [password.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/password/password.vue#L31-L35) 补 `@clear="emit('clear', $event)"`。

**验证：** 新增单测「emits clear when the clear trigger is clicked」断言 `emitted('clear')` 非空；同时断言 disabled 态下点击 clear 不触发 `clear`/`update:modelValue`。

> 附注：`SInput`（C27）的 [input.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/components/input/input.vue) 存在同一转发缺失，属族系预存问题，留待其检查轮次统一处理，本轮不改动以避免越界。

### 3.2 D7-11 — 单测覆盖不足（已扩展 6 → 25 项）

**问题：** 原 [password.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/password.spec.ts) 仅 6 项，未覆盖 data 标记、placeholder、尺寸变体、visible 按钮 `type="button"`、输入/反射、可见性 aria-label 与 aria-pressed、受控 visible、`clear` 事件、clear aria-label i18n 与覆盖、readonly、表单代理、axe 场景。

**处理：** 扩展至 **25 项**，结构对齐 input spec（rendering / model value / visible state / clear trigger / disabled / readonly / form proxy / accessibility 八组），全部通过：

```bash
✓ test/specs/components/password.spec.ts (25 tests) 68ms
```

### 3.3 验证通过 — 受控/非受控 `visible` 双通道

`useControllableState`（[use-controllable-state.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/composables/use-controllable-state.ts)）：受控态（父级传 `:visible`）返回 `computed{ get: prop, set: emit }`，`toggleVisible` 置反 → emit `update:visible` → 父级更新 prop → `get()` 回读新值；父级不更新则保持原状（标准受控契约，非缺陷）。非受控态（`visible: undefined`）走 `shallowRef(false)` 自持，proxy 变化经 watcher emit。两种路径均有单测覆盖。

### 3.4 验证通过 — `clearProps` aria-label 无 camelize 陷阱

`clearAriaLabel = props.clearProps?.['aria-label'] ?? i18n`（[password-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/password/password-compact.vue#L47)）。`clearProps` 是**用户传入的普通对象**而非 Vue 声明 prop，Vue 不会 camelize 其内部键——kebab 键 `{ 'aria-label': 'x' }` 读取链路完整（clearAriaLabel → `:aria-label` 显式绑定 → InputClear `attrs['aria-label']`）。与 C30 的声明 prop camelize 陷阱不同类，无需修复。新增「override via clearProps」单测验证。

### 3.5 说明 — `inputVariants` 的 `visible` slot 与 `InputUiSlot` 关系

[input.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/src/styles/input.ts) 配方声明了 4 个 slots（含 `visible`），而 `InputUiSlot` 仅 3 个（root/control/clear）。核查确认这是**有意的共享基座设计**：`passwordVariants = scv({ extend: [inputVariants], extendBase: props => ({ visible: miniButtonIconVariants({ size }) }) })`——password 继承 input 配方并通过 `extendBase` 覆写 `visible` 为迷你图标按钮变体；`PasswordUiSlot` 显式含 `visible`，`usePasswordUi().visible` 供默认 visible 槽消费。Input 自身不渲染 visible 元素，其 `ui` 类型不含该键，无运行时冲突。通过。

### 3.6 说明 — `type` prop 由 visible 状态接管

`PasswordCompactProps` 经 `InputCompactProps` 继承 `type`，但 `InputControl` 显式绑定 `:type="visible ? 'text' : 'password'"`（晚于 `v-bind="inputAttrs"` 覆写）。用户传入 `type` 会被覆盖——密码组件自身管理 type 属设计意图（对齐 reka-ui），文档中 `type` 未列入 password API。已记录，不改动。

---

## 四、架构与模式要点

### Compact 聚合复用 input 基座

`PasswordCompact` 不重复实现输入逻辑，直接组合 `InputRoot`（值状态/clear/表单代理）+ `InputControl`（原生 input 透传）+ `InputClear`（clearable），仅新增 `visible` 状态（`useControllableState`）与默认 visible 槽。context 经 `providePasswordUi` → `provideInputUi` 链式注入，password 的 `ui` map（含 visible）覆盖 input 的 clear/root/control 类，样式继承零重复。

### 可见性切换的可访问性

默认 visible 槽 = `Button` + `Icon`（`aria-hidden`），`aria-label` 随状态切换（Show/Hide password，13 语言 i18n），`aria-pressed` 表达开关语义；disabled/readonly 下按钮 disabled 防误触。切换仅改 `type`，输入值/光标由原生 input 保持。

### 表单提交

复用 input 的 `VisuallyHiddenInput` 代理（`type="text"` 隐藏 input 携带 `name`/`value`/`required`/`disabled` 参与表单提交），password 自身仅承担展示与交互——与 input/input-number 族系一致。

---

## 五、变更文件清单

| 文件                                                 | 变更类型                                                                                                                                                      |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui/src/components/password/password.vue`   | 补 `@clear="emit('clear', $event)"` 转发，修复 `clear` 事件被吞掉的 Minor 缺陷                                                                                |
| `packages/ui/test/specs/components/password.spec.ts` | 单测 6 → 25 项（渲染 / 模型值 / 可见性切换含 aria 断言 / 受控 visible / 自定义 visible 槽 / clear 事件与 aria-label / disabled/readonly / 表单代理 / axe ×2） |
| `docs/check.md`                                      | 标记 C31 各维度为 ✅                                                                                                                                          |

---

## 六、验证命令

```bash
# 单元测试（25 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/password.spec.ts
# → Test Files 1 passed (1) | Tests 25 passed (25)

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **SInput `clear` 事件转发缺失**：`packages/ui/src/components/input/input.vue` 与 password 修复前同模式（`InputEmits` 声明 `clear` 但未转发）。留待 C27 或 input 族系检查轮次统一处理，本轮不越界。
- **`visibleProps` 中 `aria-label` 被 i18n label 覆写**：默认 visible 槽 `:aria-label="visibleLabel"` 晚于 `v-bind="visibleProps"`，用户经 `visibleProps` 传入的 aria-label 会被忽略——切换语义 label 为设计意图，如需自定义应使用 `visible` 槽。非阻塞。
- **`type` prop 语义**：password 接管 `type`（password/text），`InputCompactProps` 继承的 `type` 形同虚设，已在文档层面排除，不改类型定义避免破坏输入法/浏览器契约。非阻塞。
