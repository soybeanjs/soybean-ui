# C29 `input-number` 检查优化报告

> **组件编号：** C29
> **组件名称：** `input-number` / `SInputNumber`（headless `InputNumberRoot` + `InputNumberControl` + `InputNumberIncrement` + `InputNumberDecrement` + `InputNumberClear` + `InputNumberCompact` 聚合；`scv()` 配方 `inputNumberVariants`，5 UI slots）
> **模式：** 多槽（Compact 聚合，`increment` / `decrement` / `clear` 槽）
> **优先级：** P0
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01、D3-08

---

## 一、执行摘要

对 `input-number` 完成全维度审计。组件架构清晰：headless 层由 `InputNumberRoot`（受控/非受控 `modelValue`、`NumberFormatter`/`NumberParser` 派生、min/max 边界 `isIncreaseDisabled`/`isDecreaseDisabled`、`onChangingValue` 钳制与 snap、`onClear` 禁用守卫、表单代理 hidden input）→ `InputNumberControl`（原生 `<input>`，键盘增减 / Page / Home / End / Enter / wheel / IME `beforeinput`）→ `InputNumberIncrement` / `InputNumberDecrement`（`usePressedHold` 按住加速，i18n aria-label）/ `InputNumberClear`（清除按钮）构成，`InputNumberCompact` 组合三者。styled 层 `inputNumberVariants` 提供 6 尺寸变体与 `center` 布局，`decrement`/`increment` 复用 `miniButtonIconVariants`；UI 层 `SInputNumber` 薄包装（`size` / `center` / `clearable` / `ui` / `class`），`provideInputNumberUi` 注入。

**本次发现并修复 4 项真实缺陷 + 1 项文档 404 缺陷，为表单输入族系（C27–C31）质量最薄弱一环：**

1. **Major (D1-10) 键盘增减失效（NaN 污染）**：`input-number-control.vue` 模板 `@keydown.up.prevent="onIncrease"` 未加括号，Vue 将 `KeyboardEvent` 作为第一个参数 `multiplier` 传入，`step * event` 得到 `NaN` —— 箭头键增减完全失效且值被污染为 `NaN`。修复为 `onIncrease()` / `onDecrease()`（Page/Home/End/Enter 原已正确）。
2. **Major (D6-01) 中文文档路由 404**：英文文档为 `en/components/input-number.md`，中文却为 `zh-CN/components/number-input.md`（页面路由 `/components/input-number` 在中文下找不到文件 → 404）；且内部 `<UsageCode>`/`<PlaygroundGallery>` 的 `component="number-input"` 与真实组件名 `input-number` 不符。`git mv` 重命名并修正引用。
3. **Minor (D1-09) `onClear` 无禁用守卫**：disabled/readonly 时仍可通过 clear 按钮把值置为 `null`，与 input/textarea 族系行为不一致。补守卫对齐。
4. **Minor (D7-11) `usePressedHold` 定时器泄漏**：按住触发时卸载组件，setTimeout 链仍会持续 tick 值变更到已卸载组件。补 `onScopeDispose(resetTimeout)`。
5. **Minor (D7-05) clear 默认图标缺 `aria-hidden`**：装饰性 `lucide:x` 图标被暴露给读屏器。补 `:aria-hidden="true"`。

**测试覆盖从 6 项扩展至 21 项**（渲染/ARIA/尺寸/表单代理/键盘全键位/边界禁用/disabled/readonly/清除/axe ×2），全部通过；`pnpm typecheck` 全绿。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                       |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 受控/非受控双通道；键盘 Arrow/Page/Home/End/Enter 增减；wheel 增量；`beforeinput` 校验 + IME 组合保护；min/max 边界（值钳制 + 按钮 disabled）；step 自定义；`onClear` 现在有 disabled/readonly 守卫；`name` 时表单代理 hidden input                                                                        |
| D2 行业对标 |  ✅  | 6 尺寸变体（xs…2xl）、`center` 布局与 AntD `InputNumber` / Element Plus `input-number` 对齐；按住加速（400ms → 60ms 循环）对标 AntD `longpress`；`Intl.NumberFormat` 本地化格式为差异化增强；`compact` / `controls` 显隐、`formatter`/`parser` 钩子列入遗留增强评估                                        |
| D3 API 设计 |  ✅  | `modelValue` / `defaultValue` / `update:modelValue` 符合 Vue 3 约定；`step` / `min` / `max` / `precision` 类型完整；`increment` / `decrement` / `clear` 槽 props（`disabled`/`onClick`）完整；`clear` 事件载荷 `PointerEvent`；`ui` / `class` / 槽位三个扩展点齐备（多槽组件不适用 `asChild`，与族系一致） |
| D4 类型系统 |  ✅  | strict 通过；`NumberFormatter`/`NumberParser` 工厂按 locale + formatOptions 派生、类型精确；`InputNumberUiSlot` / `UiClass<InputNumberUiSlot>` 完整；JSDoc 齐全                                                                                                                                            |
| D5 代码规范 |  ✅  | `useOmitProps` / `useForwardElement` / `transformPropsToContext` 规范；context 值全响应式（`ShallowRef` / `ComputedRef`）；无样式注入 headless；`usePressedHold` 防重复 `isPressed` 守卫、`event.button!==0` 过滤、`contextmenu.prevent`；卸载清理已补（见 3.3）                                           |
|   D6 文档   |  ✅  | 修复中文文档命名 404 与组件名引用（见 3.2）；中英文档齐备（Overview / Usage / Demos / API）；playground 示例覆盖基础 / 步进 / 边界 / 清除场景                                                                                                                                                              |
|   D7 其他   |  ✅  | 单测 6 → 21 项全通过（ARIA valuemin/max/now、尺寸变体、表单代理、i18n aria-label、step 增减、Arrow/Page/Home/End/Enter、min/max 边界 disabled、disabled/readonly 三件套、clear → null、clear aria 默认与覆盖、axe ×2）；键盘交互无真实布局依赖，未新增浏览器 e2e（与 input C27 一致）                      |

---

## 二、行业对标矩阵

| 能力                         | SoybeanUI | Ant Design `InputNumber` | Element Plus `input-number` | Mantine `NumberInput` |
| :--------------------------- | :-------: | :----------------------: | :-------------------------: | :-------------------: |
| headless/styled 分离         |    ✅     |            —             |              —              |           —           |
| 受控/非受控双通道            |    ✅     |            ✅            |             ✅              |          ✅           |
| step / min / max / precision |    ✅     |            ✅            |             ✅              |          ✅           |
| 键盘 Arrow/Page/Home/End     |    ✅     |            ✅            |             ✅              |          ✅           |
| 按住触发加速（longpress）    |    ✅     |            ✅            |              —              |           —           |
| min/max 边界按钮禁用         |    ✅     |            —             |             ✅              |           —           |
| 清除按钮（i18n aria-label）  |    ✅     |            —             |             ✅              |           —           |
| 本地化数字格式（Intl）       |    ✅     |            —             |              —              |           —           |
| 尺寸变体（xs…2xl）           |    ✅     |            —             |              —              |          ✅           |
| `center` 布局                |    ✅     |            ✅            |             ✅              |           —           |
| 表单代理 hidden input        |    ✅     |            —             |              —              |           —           |
| 输入中校验/钳制              |    ✅     |            ✅            |             ✅              |          ✅           |

---

## 三、发现的问题与处理

### 3.1 Major — 键盘增减失效（NaN 污染）已修复

**问题：** [input-number-control.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-number/input-number-control.vue) 中 `@keydown.up.prevent="onIncrease"` / `@keydown.down.prevent="onDecrease"` 未加调用括号。Vue 模板会把 `KeyboardEvent` 对象作为第一个实参传入，而 `onIncrease(multiplier)` 内部执行 `step * multiplier`，`step * KeyboardEvent` 得 `NaN`——**箭头键增减完全失效且当前值被污染为 `NaN`**。新增单测（`increments and decrements with the arrow keys`）首跑即捕获此缺陷。

**处理：** 修正为显式调用：

```vue
@keydown.down.prevent="onDecrease()" @keydown.page-up.prevent="onIncrease(10)"
@keydown.page-down.prevent="onDecrease(10)" @keydown.up.prevent="onIncrease()"
```

（`end`/`home`/`enter`/`wheel`/`beforeinput` 原已带括号或签名匹配，未动。）

### 3.2 Major — 中文文档命名 404 已修复（D6）

**问题：** 中文文档文件名为 `apps/docs/src/docs/zh-CN/components/number-input.md`，而英文为 `en/components/input-number.md`；页面路由 `/components/input-number`（[menus.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/apps/docs/src/constants/menus.ts) 中 `'inputNumber'` 经 `kebabCase` 生成）在中文 locale 下按 `input-number` 查找文件 → **404**。且文件内 `<UsageCode component="number-input" />` / `<PlaygroundGallery component="number-input" />` 组件名写错（应为 `input-number`），导致 usage/demo 无法加载。

**处理：** `git mv number-input.md → input-number.md`，并将内部两处 `component="number-input"` 修正为 `component="input-number"`。

### 3.3 Minor — `usePressedHold` 定时器泄漏已修复（D7-11）

**问题：** [shared.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-number/shared.ts) 的 `usePressedHold` 按 400ms → 60ms 循环加速触发值变更；若按住期间组件卸载，定时器链仍继续 tick，值变更会写入已卸载组件。

**处理：** 增加 `onScopeDispose(resetTimeout)`，组件作用域销毁时清除定时器链。

### 3.4 Minor — `onClear` 缺 disabled/readonly 守卫已修复（D1-09）

**问题：** [input-number-root.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-number/input-number-root.vue) 的 `onClear` 直接 `modelValue.value = null`，disabled/readonly 时仍可经 clear 按钮清空值，与 input/textarea 族系行为不一致。

**处理：** 补守卫对齐族系：

```ts
const onClear = () => {
  if (props.disabled || props.readonly) {
    return;
  }
  modelValue.value = null;
};
```

### 3.5 Minor — clear 默认图标缺 `aria-hidden` 已修复（D7-05）

**问题：** [input-number-clear.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/input-number/input-number-clear.vue) 默认插槽图标 `<Icon icon="lucide:x" />` 未标注装饰性，读屏器可能播报无意义图形。

**处理：** 补 `:aria-hidden="true"`，与 input/textarea 的 clear 图标对齐。

### 3.6 D7-11 — 单测覆盖不足（已扩展 6 → 21 项）

**问题：** 原 [input-number.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/input-number.spec.ts) 仅 6 项，未覆盖 ARIA 数值语义、尺寸变体、表单代理、键盘全键位、边界禁用、readonly 联动、axe 完整场景。

**处理：** 扩展至 **21 项**，结构对齐 input/textarea spec（rendering / model value / disabled state / accessibility 四组），全部通过：

```bash
✓ test/specs/components/input-number.spec.ts (21 tests) 78ms
```

受控模式注意（用例内已注释）：`useControllableState` 下 `modelValue` prop 不变，连续按键从 `inputElement.value` 读当前值——如 5 → ArrowUp → 6，再 ArrowDown 得 4（而非 5）。

### 3.7 说明 — 未新增浏览器 e2e（与 C27 input 一致）

键盘增减 / 边界 / 清除等交互均为纯逻辑，无真实布局依赖（不涉 autosize 类 `scrollHeight` 测量），happy-dom 单测已完整覆盖；组件无 portal/浮层场景（D7-19/D7-20 不适用）。故不新增浏览器 e2e，与 C27 `input` 处理一致。

### 3.8 说明 — D1-09 复核通过

`inputNumberVariants` slots keys（root/control/decrement/increment/clear）与 headless `InputNumberUiSlot` 完全一致；配方首行 `// @unocss-include` 存在；`decrement`/`increment`/`clear` 复用 `miniButtonIconVariants` 基座。通过。

---

## 四、架构与模式要点

### 数字格式工厂（locale 驱动）

`context.ts` 按 locale + formatOptions 派生 `NumberFormatter` 与 `NumberParser`，格式化与解析、校验（`beforeinput` 拦截非法字符）、`inputmode`（decimal/numeric）全链路统一，输入体验与显示格式天然一致——区别于主流库的字符串拼装方案。

### 钳制-重置双通道

`onChangingValue` 先按 step 计算再 clamp 到 [min, max] 并 snap；`applyInputValue` 对 NaN 先重置为 `undefined` 再写回 input，避免非法值驻留输入框。

### 按住加速（longpress）

`usePressedHold`：按 400ms 后进入 60ms 循环 tick；`isPressed` 防重复触发、`event.button !== 0` 过滤右键、`contextmenu.prevent` 防长按弹出菜单、`onScopeDispose` 防卸载泄漏——与 AntD longpress 对标。

### 表单提交代理

与 input/textarea 族系一致：`name` 存在且 `formControl`（默认 true）时渲染 `VisuallyHiddenInput type="text"`，值随表单提交而不破坏视觉布局。

---

## 五、变更文件清单

| 文件                                                                     | 变更类型                                                                                                                      |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/input-number/input-number-control.vue` | 修复 Major 缺陷：`@keydown.up/down` 改为显式调用 `onIncrease()`/`onDecrease()`，消除 KeyboardEvent 作为 multiplier 导致的 NaN |
| `packages/headless/src/components/input-number/input-number-root.vue`    | `onClear` 增加 disabled/readonly 守卫，与 input/textarea 族系对齐                                                             |
| `packages/headless/src/components/input-number/shared.ts`                | `usePressedHold` 增加 `onScopeDispose(resetTimeout)` 防卸载后定时器泄漏                                                       |
| `packages/headless/src/components/input-number/input-number-clear.vue`   | 默认图标补 `:aria-hidden="true"`（D7-05）                                                                                     |
| `apps/docs/src/docs/zh-CN/components/number-input.md → input-number.md`  | `git mv` 重命名修复中文文档路由 404；内部 `<UsageCode>`/`<PlaygroundGallery>` 组件名修正为 `input-number`（D6 Major）         |
| `packages/ui/test/specs/components/input-number.spec.ts`                 | 单测 6 → 21 项（ARIA 数值语义 / 尺寸变体 / 表单代理 / 键盘全键位 / 边界禁用 / disabled/readonly / clear → null / axe ×2）     |
| `docs/check.md`                                                          | 标记 C29 各维度为 ✅                                                                                                          |

---

## 六、验证命令

```bash
# 单元测试（21 项全通过）
cd packages/ui && pnpm exec vp test run test/specs/components/input-number.spec.ts
# → Test Files 1 passed (1) | Tests 21 passed (21)

# 类型检查
cd /Users/soybean/Web/Projects/SoybeanJS/soybean-ui && pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck 全部通过
```

---

## 七、遗留增强项

- **`formatter` / `parser` 钩子**：AntD `InputNumber` 支持自定义格式化/解析（如货币、百分比）；本项目以 `Intl.NumberFormat` + formatOptions 覆盖主要场景，如需完全自定义可加 `formatter`/`parser` props。非阻塞。
- **`compact` / `controls` 显隐**：Element Plus 支持 `controls-position` 与隐藏控件；本项目 `center` 已覆盖左右布局差异，横向/隐藏控件可列统一评估。非阻塞。
- **wheel 行为细节**：当前 wheel 增量为 1 行滚动步进，与浏览器缩放/滚动冲突策略（如仅聚焦时响应）可进一步打磨。非阻塞。
