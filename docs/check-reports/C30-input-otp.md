# C30 `input-otp` 检查优化报告

> **组件编号：** C30
> **组件名称：** `input-otp` / `SInputOtp`（headless `InputOtpRoot` + `InputOtpPositioner` + `InputOtpInput` + `InputOtpCompact` 聚合；`scv()` 配方 `inputOtpVariants`，8 UI slots）
> **模式：** 多槽（Compact 聚合，`default` 视觉槽自定义）
> **优先级：** P1
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `input-otp` 完成全维度审计。组件架构为「真实原生 input 透明叠加 + 视觉 slots 镜像」：`InputOtpRoot`（受控/非受控 `modelValue`、selection 镜像、`beforeinput`/`input`/`paste` 校验、pattern 校验、`complete` 事件、密码管理器 badge 检测）→ `InputOtpPositioner`（`absolute inset-0` 定位）→ `InputOtpInput`（透明 `<input>`，`aria-label`/`inputmode`/`name` 全透传，透明覆盖容器承接点击与键盘）→ `InputOtpCompact` 组合三者。styled 层 `inputOtpVariants` 提供 6 尺寸变体与 `align` 三态（start/center/end）；UI 层 `SInputOtp` 薄包装（`size` / `align` / `ui` / `class`），`provideInputOtpUi` 注入。

**发现并修复 1 项 Major 真实缺陷 + 扩展单测 6 → 24 项：**

1. **Major (D3-01 / D7-05) 自定义 `aria-label` 在所有传法下全部失效**：`InputOtpRootProps` 以 kebab 键 `'aria-label'` 声明 prop，而 Vue 3.5 将声明键 **camelize 后存储**（props 对象键为 `ariaLabel`）。Root 用 `props['aria-label']` 读取、Compact 用 `'aria-label'` 做 `usePickProps`——全部命中不到 camelCase 键 → 用户无论用 `aria-label` 属性、camelCase prop 还是模板属性传入，可访问名称都被丢弃，组件始终回退硬编码默认 `'One-time password'`。实测三种传法逐一失败后定位根因；修复为 prop 声明改 `ariaLabel` + 读取同时兼容 camelCase prop 与 attrs 双键，三种传法全部生效。**playground 4 个示例的 `aria-label` 此前均被丢弃（回退默认值），修复后正确生效。**

**测试覆盖从 6 项扩展至 24 项**（渲染/char 渲染/尺寸与对齐变体/焦点态/ARIA 三传法/表单属性透传/受控非受控/clamp/pattern/beforeinput 拦截/pasteTransformer/disabled/readonly/axe ×3），全部通过；`pnpm typecheck` 全绿。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                         |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 受控/非受控双通道；maxlength clamp；pattern 校验（`beforeinput` 拦截 + `input` 回滚双层）；pasteTransformer；`complete`/`input`/`change`/`select`/`paste`/`focus`/`blur` 事件；selection 镜像（focus 选中末尾、删除派发 selectionchange、0/10/50ms 同步）；密码管理器 badge 检测（`pushPasswordManagerStrategy` 可关）                       |
| D2 行业对标 |  ✅  | 对标 reka-ui / shadcn input-otp（vue-input-otp 移植）：`maxlength`/`pattern`/`disabled`/`readonly`/`pasteTransformer`/`pushPasswordManagerStrategy`/`inputmode` 全对齐；6 尺寸变体与 `align` 三态、placeholder 字符、fake caret 为差异化增强；locale 化默认 aria-label、`contextmenu` 处理列入遗留增强评估                                   |
| D3 API 设计 |  ✅  | **修复** `ariaLabel` prop（kebab → camelCase 声明，兼容 kebab 属性传法）；`modelValue`/`defaultValue`/`update:modelValue` 符合 Vue 3 约定；`maxlength` 必填；事件载荷类型完整；`ui` / `class` / 默认槽三个扩展点齐备（多槽组件不适用 `asChild`，与族系一致）                                                                                 |
| D4 类型系统 |  ✅  | strict 通过；`InputOtpSlotProps`（char/placeholderChar/isActive/hasFakeCaret）、`InputOtpRootSlotProps`（slots/isFocused/isHovering）槽 props 类型完整；`InputOtpUiSlot` / `UiClass<InputOtpUiSlot>` 完整；JSDoc 齐全                                                                                                                        |
| D5 代码规范 |  ✅  | `useOmitProps` / `useForwardListeners` / `transformPropsToContext` 规范；context 值全响应式（`ShallowRef` / `ComputedRef`）；无样式注入 headless；定时器（syncTimeouts/watch cleanup、password-manager interval/onUnmounted、selectionchange listener/onBeforeUnmount）全链路清理；SSR 安全（`globalThis` + `typeof window` 守卫）           |
|   D6 文档   |  ✅  | 中英文档齐备（Overview / Usage / Demos / API）；playground 5 个示例（basic/placeholder/custom-slot/disabled）；4 个示例的 `aria-label` 随本次修复正确生效                                                                                                                                                                                    |
|   D7 其他   |  ✅  | 单测 6 → 24 项全通过（char 渲染 / 尺寸对齐变体 / 焦点态 / ARIA 三传法 / 表单属性透传 / 受控非受控 / clamp+input+complete / pattern 双层拦截 / beforeinput / pasteTransformer / disabled/readonly / axe ×3）；自定义 aria-label 修复前后对比验证；键盘/selection 为原生 input 契约且无真实布局依赖，未新增浏览器 e2e（与 input C27/C29 一致） |

---

## 二、行业对标矩阵

| 能力                       | SoybeanUI | reka-ui `InputOtp` | shadcn `InputOTP` | Element Plus |
| :------------------------- | :-------: | :----------------: | :---------------: | :----------: |
| headless/styled 分离       |    ✅     |         —          |         —         |      —       |
| 受控/非受控双通道          |    ✅     |         ✅         |        ✅         |      —       |
| maxlength / pattern        |    ✅     |         ✅         |        ✅         |      —       |
| 真实 input 透明叠加        |    ✅     |         ✅         |        ✅         |      —       |
| selection 镜像             |    ✅     |         ✅         |        ✅         |      —       |
| 粘贴 transformer           |    ✅     |         ✅         |        ✅         |      —       |
| 密码管理器 badge 适配      |    ✅     |         ✅         |        ✅         |      —       |
| iOS 自动填充               |    ✅     |         ✅         |        ✅         |      —       |
| `complete` 事件            |    ✅     |         ✅         |        ✅         |      —       |
| 尺寸变体（xs…2xl）         |    ✅     |         —          |         —         |      —       |
| `align` 三态               |    ✅     |         ✅         |        ✅         |      —       |
| placeholder 字符           |    ✅     |         ✅         |        ✅         |      —       |
| 自定义视觉槽（fake caret） |    ✅     |         ✅         |        ✅         |      —       |

---

## 三、发现的问题与处理

### 3.1 Major — 自定义 `aria-label` 全部传法失效（D3-01 / D7-05）

**问题：** [input-otp-root.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-otp/input-otp-root.vue) 的 `resolvedAccessibleLabel` 用 `props['aria-label']` 读取，[input-otp-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-otp/input-otp-compact.vue) 的 `usePickProps` 列表用 `'aria-label'`，而 [types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-otp/types.ts) 以 kebab 键 `'aria-label'?: string` 声明 prop。**Vue 3.5 将声明键 camelize 后存入 props 对象（键为 `ariaLabel`）**，因此所有 kebab 键读取都命中不到——实测 `mount({ props: { 'aria-label': 'x' } })`、模板属性 `aria-label="x"`、camelCase prop `ariaLabel: 'x'` **三种传法全部回退默认值 `'One-time password'`**。

**影响：** 用户无法自定义 OTP 输入框的可访问名称；playground 4 个示例（[01-basic.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/apps/playground/src/examples/input-otp/01-basic.vue) 等）传入的 `aria-label` 全部被丢弃。axe 因默认 label 兜底仍零违规，缺陷被掩盖。

**处理：**

1. [types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-otp/types.ts#L32-L33)：prop 声明 `'aria-label'?: string` → `ariaLabel?: string`（Vue 自动将 kebab 属性 `aria-label` 映射到 camelCase prop，对外 API 传法不变）。
2. [input-otp-root.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-otp/input-otp-root.vue#L69-L75)：读取兼容 camelCase prop 与 attrs 双键：

```ts
const candidate = props.ariaLabel ?? attrs.ariaLabel ?? attrs['aria-label'];
```

3. [input-otp-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-otp/input-otp-compact.vue#L32)：`usePickProps` 列表 `'aria-label'` → `'ariaLabel'`。

**验证：** 新增 3 个传法用例（kebab prop / 模板属性 / camelCase prop）全部断言 `input.attributes('aria-label') === 'Verification code'`。

> 附注：input/textarea 族系不受影响——其 clear 组件未声明 `aria-label` prop，属性留存在 `attrs` 中以 kebab 键读取，链路正确。

### 3.2 D7-11 — 单测覆盖不足（已扩展 6 → 24 项）

**问题：** 原 [input-otp.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/input-otp.spec.ts) 仅 6 项，未覆盖 char 渲染、尺寸/对齐变体、焦点态、aria-label 透传、表单属性、受控反射、clamp、beforeinput 拦截、pasteTransformer、readonly、axe 场景。

**处理：** 扩展至 **24 项**，结构对齐 input-number spec（rendering / attributes / model value / disabled state / accessibility 五组），全部通过：

```bash
✓ test/specs/components/input-otp.spec.ts (24 tests) 79ms
```

### 3.3 记录 — 族系级增强评估（D2-11，非阻塞）

- **locale 化默认 aria-label**：默认 `'One-time password'` 硬编码英文（input-number 的 increment/decrement 已走 `useLocaleMessages`）。因默认值可被用户覆盖、axe 不违规，且需跨 13 语言新增 `LocaleInputOtpMessages`，列为增强项统一评估。
- **`contextmenu` 处理**：OTP 输入框右键/长按弹出浏览器菜单（粘贴/输入法切换）可能干扰输入流，reka-ui 未强制禁用；本项目未处理，列为可选增强。
- **密码管理器检测依赖真实布局**：`elementFromPoint`/`getBoundingClientRect` 在 happy-dom 无布局引擎下行为不真（伪阳性），真实浏览器正确（无 badge 时 `maybeBadgeElement === container` 早退）；不影响核心契约，happy-dom 单测不断言该 data 属性。

### 3.4 说明 — D1-09 复核通过

`inputOtpVariants` slots keys（root/positioner/group/input/slot/char/placeholder/caret）与 headless `InputOtpUiSlot` 完全一致；配方首行 `// @unocss-include` 存在。通过。

### 3.5 说明 — 表单提交

OTP 的原生 input 直接承担表单提交（`name` 透传 + 值即字符串），无需 input-number 式的 `VisuallyHiddenInput` 代理——与 input（C27）一致。

---

## 四、架构与模式要点

### 真实 input 透明叠加

`InputOtpInput` 以 `absolute inset-0 opacity-0` 覆盖整个容器（`positioner: absolute inset-0` + `input: absolute inset-0 h-full w-full`），点击/键盘/移动端自动填充全部落在真实 `<input>` 上——可访问性、IME、系统键盘、密码管理器天然生效，视觉 slots 仅作镜像展示（`aria-hidden`），无需逐格焦点管理。

### 双层校验（beforeinput + input）

`beforeinput` 拦截 `insertText`（键盘/粘贴热路径，preventDefault 阻止非法字符插入）；`input` 事件兜底回滚（钳制 + pattern 重验 + `target.value = currentValue`），IME 组合态（`insertCompositionText`）与平台自动填充自然放行。删除时派发 `selectionchange` 驱动镜像刷新。

### 密码管理器 badge 适配

`usePasswordManagerBadge`：聚焦后 0/2/5s 三次探测容器右缘（`elementFromPoint`）+ 每 1s 检查可用宽度，命中后通过 `data-password-manager-badge` 扩展 input 宽度避免 badge 遮挡；`pushPasswordManagerStrategy='none'` 可整体关闭。interval/timers 均随组件卸载清理（D7-04 通过）。

### 表单提交

`name` 透传原生 input，值随表单直接提交；无格式化差异，故不需要 hidden input 代理（区别于 input-number）。

---

## 五、变更文件清单

| 文件                                                               | 变更类型                                                                                                                                                                             |
| :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/input-otp/types.ts`              | prop 声明 `'aria-label'` → `ariaLabel`（camelCase，修复 Vue camelize 存储导致的 kebab 读取失效）                                                                                     |
| `packages/headless/src/components/input-otp/input-otp-root.vue`    | `resolvedAccessibleLabel` 改为兼容 camelCase prop 与 attrs 双键读取，修复自定义可访问名称全部失效的 Major 缺陷                                                                       |
| `packages/headless/src/components/input-otp/input-otp-compact.vue` | `usePickProps` 列表 `'aria-label'` → `'ariaLabel'`                                                                                                                                   |
| `packages/ui/test/specs/components/input-otp.spec.ts`              | 单测 6 → 24 项（char 渲染 / 尺寸对齐变体 / 焦点态 / aria-label 三传法 / 表单属性 / 受控非受控 / clamp / pattern 双层 / beforeinput / pasteTransformer / disabled/readonly / axe ×3） |
| `docs/check.md`                                                    | 标记 C30 各维度为 ✅                                                                                                                                                                 |

---

## 六、验证命令

```bash
# 单元测试（24 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/input-otp.spec.ts
# → Test Files 1 passed (1) | Tests 24 passed (24)

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **locale 化默认 aria-label**：跨 13 语言新增 `LocaleInputOtpMessages`，与 input-number 族系对齐。非阻塞。
- **`contextmenu` 处理**：右键菜单策略（禁用或自定义）评估。非阻塞。
- **API 数据再生成**：prop 名变更后，`pnpm sui api` 生成的 API 文档数据将在下次再生成时同步为 `ariaLabel`。非阻塞。
