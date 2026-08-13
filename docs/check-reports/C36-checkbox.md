# C36 `checkbox` 检查优化报告

> **组件编号：** C36（`checkbox`）
> **组件名称：** `SCheckbox`（headless 基座：`CheckboxCompact` 聚合 `CheckboxRoot`/`Control`/`Indicator`/`Label`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-04、D7-05

---

## 一、执行摘要

对 `checkbox` 完成全维度审计。组件为「多槽 + Compact」模式：headless `CheckboxCompact` 持有迭代、默认组合与状态；`CheckboxRoot` 用 `useControllableState` 管理 `CheckedState | null`（含 `'indeterminate'`），原生 input 代理 + 表单代理。UI 层 `SCheckbox` 仅做配方与插槽转发。

**发现 P1 ×1（已修复）**——`CheckboxCardGroupCompact.rootProps` 被静默丢弃：

|    维度     | 状态 |                                                                                                                                                                                                                   说明                                                                                                                                                                                                                   |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                                                                多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useControllableState`）、半选 `indeterminate`（`CheckedState`/`aria-checked="mixed"`）、disabled、键盘（原生 button Space/Enter）、原生 input 代理 + 表单代理完整（D1-08）                                                                                                |
| D2 行业对标 |  ✅  |                                                                                                       对标 shadcn/Radix `Checkbox`/AntD/Element Plus：headless 分离、三态 indeterminate、表单 value 映射、卡片变体（SoybeanUI 独有）、组 roving-focus 均达成；独立 `indeterminate` prop/`button` variant/全选联动列为增强（D2-11）                                                                                                       |
| D3 API 设计 |  ✅  |                                                                                                                                      `modelValue`/`defaultValue`/`disabled`/`required`/`name`/`value`/`rovingFocus` 命名与主流库一致；`update:modelValue` 事件清晰；`CheckboxUiSlot` 复用 `UiClass`                                                                                                                                      |
| D4 类型系统 |  ✅  |                                                                                                                                   `CheckboxRootProps`/`CompactProps`/组 `generic="T extends CheckboxGroupOptionData"` 泛型化精确；`isValueEqualOrExist` 处理 `MaybeArray`；JSDoc 覆盖完整；无类型逃逸                                                                                                                                    |
| D5 代码规范 |  ✅  |                                                                                                                               `eslint` 0 errors；`useOmitProps` 含 `class`；`transformPropsToContext` 包裹响应式；模板无 `props.xxx`/内联箭头；UI 层 types 从 `@soybeanjs/headless/checkbox` 子路径再导出                                                                                                                                |
|   D6 文档   |  ✅  |                                                                                                                                                           en/zh 文档结构对齐（8 节，组件族 N/A）；Notes 含架构对标表 + 运行时注意 + FAQ；benchmark 表可补 min/max 行（见遗留）                                                                                                                                                           |
|   D7 其他   |  ✅  | **P1 修复**：[checkbox-card-group-compact.vue](../../packages/headless/src/components/checkbox/checkbox-card-group-compact.vue) 补 `v-bind="rootProps"`（对齐 checkbox-group-compact，此前 rootProps 声明后从未绑定、运行时静默丢弃）；data 属性遵循 D1-07（`data-soybean-checkbox-*`）；SSR 安全；ARIA（`role="checkbox"`/`aria-checked` 含 `mixed`）axe 零违规；**checkbox 18 项 + checkbox-group 14 项 + checkbox-card 9 项单测通过** |

---

## 二、行业对标矩阵

> `checkbox` 是**布尔/三态选择**模式。shadcn/Radix `Checkbox`、AntD/Element Plus 为对标对象。

| 能力                      | SoybeanUI | shadcn/Radix | AntD | Element Plus |
| :------------------------ | :-------: | :----------: | :--: | :----------: |
| headless/styled 分离      |    ✅     |      ✅      |  —   |      —       |
| 三态 indeterminate        |    ✅     |      ✅      |  ✅  |      ✅      |
| 表单 value 映射           |    ✅     |      ✅      |  ✅  |      ✅      |
| 独立 `indeterminate` prop |    ➖     |      —       |  ✅  |      ✅      |
| 卡片变体                  |    ✅     |      —       |  —   |      —       |
| 组 roving-focus 键盘      |    ✅     |      —       |  ✅  |      ✅      |
| `button` variant          |    ➖     |      —       |  ✅  |      ✅      |
| 全选联动辅助              |    ➖     |      —       |  ✅  |      —       |

`—` = 不支持或采用不同交互模型；`➖` = 未实现（登记为增强）。

---

## 三、发现的问题与处理

### 3.1 P1 — `CheckboxCardGroupCompact.rootProps` 被静默丢弃（D3/D1）

**现象：** `checkbox-card-group-compact.vue` 将 `rootProps` 列入 `useOmitProps` 忽略列表，但模板未绑定它（对比 `checkbox-group-compact.vue` 的 `v-bind="rootProps"`）。结果是类型声明了 `rootProps`（透传给每个卡片的 `CheckboxRoot`），实际运行时完全无效。

**修复：** 在 `CheckboxCardCompact` 的 `v-for` 上补 `v-bind="rootProps"`，与 `checkbox-group-compact` 对齐。

### 3.2 核查结论（非缺陷）

- **D2-11 对标**：独立 `indeterminate` prop/`button` variant/全选联动未实现（当前通过 `modelValue="indeterminate"` 驱动半选），列为增强项。
- **D7**：半选时原生代理 `:checked="!!state"`（truthy）会把半选视为勾选，严格语义建议 `state === true`（Minor）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/checkbox*.spec.ts`：**41 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 改动：`checkbox-card-group-compact.vue`（补 `rootProps` 绑定）。

## 五、遗留增强项（非阻塞，排期）

| 增强项                    | 对标依据 | 说明                                   |
| :------------------------ | :------- | :------------------------------------- |
| group `min`/`max` 约束    | D2-11    | 选择数上下限（AntD/EP 支持），排期评估 |
| 独立 `indeterminate` prop | D2-11    | 对标 AntD 独立控制半选，排期评估       |
| `button` variant          | D2-11    | 对标 AntD/EP 按钮形态，排期评估        |
| 全选联动辅助              | D2-11    | 对标 AntD 全选/半选联动，排期评估      |
