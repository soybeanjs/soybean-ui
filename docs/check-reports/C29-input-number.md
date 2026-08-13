# C29 `input-number` 检查优化报告

> **组件编号：** C29（`input-number`）
> **组件名称：** `SInputNumber`（headless 基座：`InputNumberCompact` 聚合 `InputNumberRoot`/`Control`/`Increment`/`Decrement`/`Clear`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01、D3-08、D7-05

---

## 一、执行摘要

对 `input-number` 完成全维度审计。组件为「多槽 + Compact」模式：headless `InputNumberCompact` 组合 Root/Control/Increment/Decrement/Clear，数值状态用 `useControllableState`，`Intl.NumberFormat` 本地化由 `@internationalized/number` 派生；步进/钳制/格式化收敛到纯函数。UI 层仅做配方（size/center）与插槽/属性转发。

**发现 Major ×1（已修复）**——文档 `precision` 与实现不符：

|    维度     | 状态 |                                                                                                                                   说明                                                                                                                                   |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  | 多槽 + Compact 正确：headless 持有数值状态/步进/格式化/表单代理；受控/非受控（`useControllableState`）、min/max/step 钳制、增减按钮（`usePressedHold` 长按 400ms→60ms）、输入格式化/钳制（`beforeinput` IME 友好）、disabled、键盘（Arrow/Page/Home/End/Enter/滚轮）完整 |
| D2 行业对标 |  ✅  |                                         对标 AntD/Element Plus/Mantine `NumberInput`：min/max/step/长按/键盘全对齐；差异化亮点为 `Intl.NumberFormat` 本地化与表单代理；`formatter`/`parser`/`controls` 开关列为遗留增强（D2-11）                                         |
| D3 API 设计 |  ✅  |                                             `modelValue`/`defaultValue`、`min`/`max`/`step`、`formatOptions`、`disabled`/`readonly`、`clearable`、`center` 命名与主流库一致；事件 `update:modelValue`/`clear` 清晰（D3-01）                                              |
| D4 类型系统 |  ✅  |                                                                    `InputNumberRootProps`/`CompactProps`/`Slots` 层级清晰；`ShallowRef<number\|null\|undefined>` 数值状态；JSDoc 覆盖完整；无类型逃逸                                                                    |
| D5 代码规范 |  ✅  |                                                                       `eslint` 0 errors；`useOmitProps` 含 `class`；步进/钳制/格式化纯函数；`usePressedHold` 卸载清理；模板无 `props.xxx`/内联箭头                                                                       |
|   D6 文档   |  ✅  |                          **Major 修复**：文档「特性」/「FAQ」/「对标表」中原先声称 `precision` prop，实为 `formatOptions.maximumFractionDigits` 能力；已修正 zh/en 表述（FAQ 明确指向 `formatOptions.maximumFractionDigits`），并同步修正对标表                          |
|   D7 其他   |  ✅  |                            data 属性遵循 D1-07（`data-soybean-input-number-*`）；SSR 安全（`usePressedHold` 内 `window` 访问有 `isClient` 守卫）；ARIA（`role="spinbutton"`/`aria-valuemin/max/now`/i18n 标签）axe 零违规；**21 项单测通过**                             |

---

## 二、行业对标矩阵

> `input-number` 是**数值输入**模式。AntD/Element Plus/Mantine `NumberInput` 为对标对象。

| 能力                     | SoybeanUI | AntD `InputNumber` | Element Plus | Mantine `NumberInput` |
| :----------------------- | :-------: | :----------------: | :----------: | :-------------------: |
| step / min / max / 精度  |    ✅     |         ✅         |      ✅      |          ✅           |
| 键盘 Arrow/Page/Home/End |    ✅     |         ✅         |      ✅      |          ✅           |
| 按住触发加速             |    ✅     |         ✅         |      —       |           —           |
| 边界按钮禁用             |    ✅     |         —          |      ✅      |           —           |
| 清除按钮（i18n 标签）    |    ✅     |         —          |      ✅      |           —           |
| 本地化数字格式（Intl）   |    ✅     |         —          |      —       |           —           |
| 尺寸变体（xs…2xl）       |    ✅     |         —          |      —       |          ✅           |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — 文档 `precision` 与实现不符（D6/D3）

**现象：** [input-number.md（zh/en）](../../apps/docs/src/docs/zh-CN/components/input-number.md) 的「特性」/「FAQ」声称可通过 `precision` prop 控制小数位，但 `InputNumberRootProps` 并无 `precision` prop，小数位实际由 `formatOptions.maximumFractionDigits` 控制。用户按文档传入 `precision` 会在 TS 层报错/运行时无效。

**修复：** 修正 zh/en 文档——FAQ「如何控制小数位数？」改为「通过 `formatOptions.maximumFractionDigits`（如 `{ maximumFractionDigits: 2 }`）」；特性与对标表同步修正表述。

### 3.2 核查结论（非缺陷）

- **D1-09 数值健壮性**：`onIncreasing`/`onDecreasing` 显式调用避免键盘 NaN 污染；`onClear` 有 disabled/readonly 守卫。
- **D5 规范**：`watch(() => textValue.value, ..., { deep: true })` 对原始字符串 `deep: true` 冗余（Minor，可清理）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/input-number.spec.ts`：**21 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 文档修复仅改 `*.md`，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项               | 对标依据 | 说明                                     |
| :------------------- | :------- | :--------------------------------------- |
| `formatter`/`parser` | D2-11    | 对标 AntD 自定义格式/解析钩子，排期评估  |
| `controls` 开关      | D2-11    | 对标 Element Plus 隐藏增减按钮，排期评估 |
| `change` 事件        | D2-11    | 原生 `change`（blur 触发），排期评估     |
