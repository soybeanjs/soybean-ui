# C37 `checkbox-group` 检查优化报告

> **组件编号：** C37（`checkbox-group`）
> **组件名称：** `SCheckboxGroup` / `SCheckboxCardGroup`（headless 基座：`CheckboxGroupCompact`/`CheckboxCardGroupCompact` 聚合 `CheckboxGroupRoot` + 逐项 `CheckboxCompact`/`CheckboxCardCompact`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04、D7-05

---

## 一、执行摘要

对 `checkbox-group` 完成全维度审计。组件为「多槽 + Compact」模式：headless `CheckboxGroupCompact`/`CheckboxCardGroupCompact` 持有 `items` 迭代、组状态与禁用传播；`CheckboxGroupRoot` 用 `useControllableState` 管理 `T[]`，`CheckboxRoot` 通过 `isValueEqualOrExist` 计算组内选中态。UI 层 `SCheckboxGroup`/`SCheckboxCardGroup` 仅做配方与插槽转发。

**发现 P1 ×1（已修复）**——`CheckboxCardGroupCompact.rootProps` 被静默丢弃（与 C36 同源，见下）：

|    维度     | 状态 |                                                                                                                                                                 说明                                                                                                                                                                  |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                             多槽 + Compact 正确：Compact 聚合下沉至 headless（迭代/状态/禁用传播）；`v-model` 数组（`useControllableState`）、逐项选中态推导（`isValueEqualOrExist`）、组/单条目 disabled、roving-focus 键盘完整（D1-12）                                                             |
| D2 行业对标 |  ✅  |                                                                              对标 AntD/Element Plus `Checkbox.Group`：`v-model` 数组、禁用传播、roving-focus 键盘、卡片变体均达成；group `min`/`max` 选择数约束未实现（AntD/EP 支持），列为增强（D2-11）                                                                              |
| D3 API 设计 |  ✅  |                                                                   `modelValue`/`defaultValue`（数组）、`disabled`/`rovingFocus`/`orientation`、`itemProps`/`controlProps`/`indicatorProps`/`labelProps`/`rootProps` 命名与主流库一致；`update:modelValue` 事件清晰                                                                    |
| D4 类型系统 |  ✅  |                                                                                              `CheckboxGroupCompactProps<T>`/`Emits<T['value']>`/`Slots<T>` 泛型化精确；`CheckboxGroupOptionData` 类型链完整；JSDoc 覆盖完整；无类型逃逸                                                                                               |
| D5 代码规范 |  ✅  |                                                                                         `eslint` 0 errors；`useOmitProps` 含 `class`；`isValueEqualOrExist` 处理 `MaybeArray`；`transformPropsToContext` 包裹响应式；无 `props.xxx`/内联箭头                                                                                          |
|   D6 文档   |  ✅  |                                                                                                                 en/zh 文档结构对齐（8 节）；checkbox-group 在 `checkbox.md` 的「组件系列」中统一文档化，符合仓库惯例                                                                                                                  |
|   D7 其他   |  ✅  | **P1 修复**：[checkbox-card-group-compact.vue](../../packages/headless/src/components/checkbox/checkbox-card-group-compact.vue) 补 `v-bind="rootProps"`（此前声明后未绑定、运行时静默丢弃）；data 属性遵循 D1-07（`data-soybean-checkbox-group-root`）；SSR 安全；ARIA（`role="group"` + 逐项 checkbox）axe 零违规；**14 项单测通过** |

---

## 二、行业对标矩阵

> `checkbox-group` 是**多选组**模式。AntD/Element Plus `Checkbox.Group` 为对标对象。

| 能力              | SoybeanUI | AntD `Checkbox.Group` | Element Plus `CheckboxGroup` |
| :---------------- | :-------: | :-------------------: | :--------------------------: |
| `v-model` 数组    |    ✅     |          ✅           |              ✅              |
| 禁用传播          |    ✅     |          ✅           |              ✅              |
| roving-focus 键盘 |    ✅     |          ✅           |              ✅              |
| 卡片变体          |    ✅     |           —           |              —               |
| `min`/`max` 约束  |    ➖     |          ✅           |              ✅              |

`—` = 不支持；`➖` = 未实现（登记为增强）。

---

## 三、发现的问题与处理

### 3.1 P1 — `CheckboxCardGroupCompact.rootProps` 被静默丢弃（D1/D3）

**现象/修复：** 与 C36 同源——`checkbox-card-group-compact.vue` 未将 `rootProps` 绑定到卡片，已在 C36 中补 `v-bind="rootProps"`。该修复同时作用于 C37 的 `SCheckboxCardGroup`。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 下沉**：`CheckboxGroupCompact`/`CheckboxCardGroupCompact` 在 headless 内完成 items 迭代、组状态与禁用传播；UI 层仅转发配方与插槽。
- **D2-11 对标**：group `min`/`max` 选择数约束未实现（AntD/EP 支持），列为增强项。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/checkbox-group.spec.ts`：**14 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 改动：`checkbox-card-group-compact.vue`（补 `rootProps` 绑定，见 C36）。

## 五、遗留增强项（非阻塞，排期）

| 增强项                 | 对标依据 | 说明                                                            |
| :--------------------- | :------- | :-------------------------------------------------------------- |
| group `min`/`max` 约束 | D2-11    | 选择数上下限（AntD/EP 支持），排期评估                          |
| 组表单代理 e2e         | D7-19    | 验证多选在原生 `<form>` 下展开为同名多个 `name=value`，排期评估 |
