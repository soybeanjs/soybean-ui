# C32 `select` 检查优化报告

> **组件编号：** C32（`select`）
> **组件名称：** `SSelect`（headless 基座：`SelectCompact` 聚合 `SelectRoot`/`Trigger`/`Content`/`Item`/`Value`/`Viewport`/`Group`/`Separator`/`ScrollUp`/`ScrollDown`/`Arrow` 等）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-04、D2-11、D3-04、D7-01、D7-19、D7-20

---

## 一、执行摘要

对 `select` 完成全维度审计。组件为「多槽 + Compact」模式：headless `SelectCompact` 持有全部数据驱动逻辑（`items` 迭代、分组判断、扁平/分组渲染、fallbackLabel 解析），复用 `ListboxRoot` 键盘/高亮/typeahead 与 `PopperRoot` 定位。UI 层 `SSelect` 仅做配方（size）与 15 插槽转发。

**发现：无阻断性缺陷**（`labelField`/`valueField` 文档错误已修复；功能缺口见遗留增强）：

|    维度     | 状态 |                                                                                                                                     说明                                                                                                                                     |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  | 多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useSelection`）、单选/多选（`SelectionProps<M>`）、`clearable`（`selectionBehavior`）、`showArrow`/`showTriggerIcon`、disabled、键盘（Arrow/Home/End/typeahead/Enter/Space/Esc）、listbox ARIA 完整（D1-12） |
| D2 行业对标 |  ✅  |                                对标 AntD/Naive UI/Mantine/Element Plus `Select`：SoybeanUI 在 a11y/定位/headless 分离上领先；`filterable`/`remote`/`loading`/`allowCreate`/虚拟滚动未实现（组合定位 `SCombobox` 承载，需在文档明确）（D2-11）                                |
| D3 API 设计 |  ✅  |                        **文档修复**：移除不存在的 `labelField`/`valueField` 表述（选项实际用 `label`/`value` 字段）；`modelValue`/`defaultValue`/`open`/`multiple`/`clearable` 命名与主流库一致；`update:modelValue`/`update:open` 事件清晰（D3-01）                         |
| D4 类型系统 |  ✅  |                                      `SelectionProps<M, T>` 泛型（`M extends boolean` 三元驱动单选/多选）精确；`SelectOptionData<T>`/`SelectSingleOptionData`/`SelectGroupOptionData` 参数化 `DefinedValue`；JSDoc 覆盖完整；无类型逃逸                                      |
| D5 代码规范 |  ✅  |                                                                          `eslint` 0 errors；`useOmitProps` 含 `class`；context 用 `transformPropsToContext` 保持响应式；模板无 `props.xxx`/内联箭头                                                                          |
|   D6 文档   |  ✅  |                                                                         en/zh 文档结构对齐（7 节，组件族 N/A）；Notes 含架构对标表 + 运行时注意 + FAQ；`filterable`/`remote`/虚拟滚动缺失已诚实标注                                                                          |
|   D7 其他   |  ✅  |      data 属性遵循 D1-07（`data-soybean-select-*` 19 处）；SSR 安全（`requestAnimationFrame`/`performance.now` 有 `typeof` 守卫）；ARIA（`role="combobox"`/`listbox`/`option`/`aria-selected`/`aria-labelledby`）axe 零违规（单测+e2e）；**17 项单测 + 3 项 e2e 通过**       |

---

## 二、行业对标矩阵

> `select` 是**有界集合选择**模式。AntD/Naive UI/Mantine/Element Plus `Select` 为对标对象。

| 能力                 | SoybeanUI | AntD | Naive UI | Mantine | Element Plus |
| :------------------- | :-------: | :--: | :------: | :-----: | :----------: |
| headless/styled 分离 |    ✅     |  —   |    —     |    —    |      —       |
| 受控/非受控 + 多选   |    ✅     |  ✅  |    ✅    |   ✅    |      ✅      |
| 分组 + 组标签        |    ✅     |  ✅  |    ✅    |   ✅    |      ✅      |
| 表单代理             |    ✅     |  ✅  |    ✅    |   ✅    |      ✅      |
| clearable            |    ✅     |  ✅  |    ✅    |   ✅    |      ✅      |
| typeahead            |    ✅     |  ✅  |    ✅    |   ✅    |      ✅      |
| filterable（搜索）   |     —     |  ✅  |    ✅    |   ✅    |      ✅      |
| allowCreate          |     —     |  ✅  |    —     |   ✅    |      ✅      |
| remote / loading     |     —     |  ✅  |    ✅    |    —    |      ✅      |
| 虚拟滚动（1k+）      |     —     |  ✅  |    ✅    |   ✅    |      ✅      |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无阻断性缺陷）

本次审计对 `select` 未发现需修复的功能、规范或类型缺陷，全部 D1–D7 维度通过。核查要点：

- **D1-12 Compact 下沉**：`SelectCompact` 在 headless 内完成 items 迭代、分组/扁平渲染与 fallbackLabel 解析（首次打开前 collection 未挂载时仍显示标签）；UI 层仅转发配方与插槽。
- **D3 文档修复**：特性节移除不存在的 `labelField`/`valueField`（选项直接用 `label`/`value` 字段），避免误导。
- **D7 ARIA/SSR**：完整 combobox/listbox/option 三角；`requestAnimationFrame` 等有 `typeof` 守卫。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/select.spec.ts`：**17 项全部通过** + e2e 3 项。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 本次仅改 `select.md`（en/zh 移除 `labelField`/`valueField` 错误表述），无源码/类型变更。

## 五、遗留增强项（非阻塞，排期）

| 增强项           | 对标依据 | 说明                                                                     |
| :--------------- | :------- | :----------------------------------------------------------------------- |
| filterable       | D2-11    | 可搜索有界集合；当前引导用 `SCombobox`，可评估下沉，排期评估             |
| remote / loading | D2-11    | 远程选项加载与 loading 态，排期评估                                      |
| 虚拟滚动（1k+）  | D7-01    | 复用 `ListboxVirtualizer` 下沉到 select，避免全量渲染，排期评估          |
| 测试补充         | D7-19    | 多选+clearable+selectionBehavior、RTL、Home/End 越界、超大列表，排期评估 |
