# C84 `color-field` 检查优化报告

> **组件编号：** C84（`color-field`）
> **组件名称：** `SColorField`（headless 基座：`ColorFieldRoot`/`ColorFieldInput`/`ColorFieldCompact`）
> **模式：** 多槽 + Compact（root/input 2 个 UI 槽）
> **优先级：** P3
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-01

---

## 一、执行摘要

对 `color-field` 完成全维度审计。`ColorFieldRoot` 经 `modelValue`/`color` 受控 + `format`/`colorSpace`/`channel`，提供键盘（Arrow/Page/Home/End）与滚轮增减辅助（`step`/`disableWheelChange`）；`ColorFieldCompact` 组合 root + input 默认装配；UI 层 `SColorField` `colorFieldVariants` 注入（6 尺寸）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                             多槽 + Compact 模式正确：`ColorFieldCompact` 持有聚合编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；完整/单通道编辑、键盘/滚轮增减、隐藏表单输入、`disabled`/`readonly` 完整（D1-16）                             |
| D2 行业对标 |  ✅  |                                  对标 radix-ui-color/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（合并颜色选择器 hex 输入）：SoybeanUI 暴露独立颜色输入框（多格式 + 单通道 + 键盘/滚轮 + 原生表单输入）                                   |
| D3 API 设计 |  ✅  |                            `modelValue`/`defaultValue`/`format`/`colorSpace`/`channel`/`placeholder`/`step`/`disableWheelChange`/`disabled`/`readonly` 命名与主流库一致；事件 `update:modelValue`/`update:color` 语义清晰（D3-01）                            |
| D4 类型系统 |  ✅  |                                `ColorFieldProps`/`Emits`/`Ui`（2 槽）导出完整；`ColorFieldRootProps`/`ColorFieldInputProps`（`BaseProps<InputHTMLAttributes>`）精确；JSDoc 覆盖 `channel`/`format`/`step`/`disableWheelChange`                                |
| D5 代码规范 |  ✅  |                                                          `eslint` 0 errors；`useOmitProps` 含 `class`；`ColorFieldCompact` 委托键与 `ColorFieldCompactProps` 严格一致；`colorFieldVariants` 简洁规范                                                          |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 3 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                                单测 5 项全通过（text input/attr 转发/隐藏表单输入/有效字符串提交 `update:modelValue`/单通道键盘 End 更新 `update:color`）；SSR 无顶层 `window`/`document` 访问                                                |

---

## 二、行业对标矩阵

> `color-field` 是 **独立多格式颜色输入（headless 聚合）** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 将 hex 输入内嵌于合并的颜色选择器。

| 能力              | SoybeanUI | shadcn/ui | Ant Design | Element Plus | Mantine | Naive UI |
| :---------------- | :-------: | :-------: | :--------: | :----------: | :-----: | :------: |
| Headless/样式分离 |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 多种格式          |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 单通道编辑        |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 键盘 + 滚轮       |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 原生表单输入      |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 尺寸（6）         |    ✅     |     —     |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [color-field.md（en）](../../apps/docs/src/docs/en/components/color-field.md) 与 [color-field.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/color-field.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（alert/toast/color-area 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：7 条能力（headless 分离/格式/单通道编辑/键盘/滚轮/占位禁用只读/表单字段/尺寸）。
- `Component family`：`SColorField` + 3 个 headless 部件职责说明。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（`modelValue`/`format`/单通道 `channel`+`colorSpace`/键盘滚轮 `step`/表单提交）+ `Roadmap`。
- `FAQ`：3 组问答（使用/单通道编辑/禁用滚轮）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`ColorFieldCompact` 持有 root + input 默认装配，UI 层 `SColorField` 无结构编排。
- **D7-04 SSR**：color-field 无顶层 `window`/`document` 访问。
- **D5 观察**：`ColorFieldCompact` 设 `inheritAttrs: false` 并将 attr 转发至 input（`ColorFieldInput` 复用），结构清晰。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/color-field.spec.ts`：**5 项全部通过**（text input/attr 转发/隐藏表单输入/有效字符串提交 `update:modelValue`/单通道键盘 End 更新 `update:color`）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                        |
| :-------------- | :---------- | :-------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 当前 color-field 重点项未含 e2e；真实键盘/滚轮/焦点建议浏览器覆盖，排期评估 |
