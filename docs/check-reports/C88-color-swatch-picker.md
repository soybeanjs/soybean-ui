# C88 `color-swatch-picker` 检查优化报告

> **组件编号：** C88（`color-swatch-picker`）
> **组件名称：** `SColorSwatchPicker`（headless 基座：`ColorSwatchPickerRoot`/`ColorSwatchPickerItem`/`ColorSwatchPickerItemSwatch`/`ColorSwatchPickerItemIndicator`/`ColorSwatchPickerCompact`，构建于 listbox）
> **模式：** 多槽 + Compact（root/item/itemIndicator/swatchRoot/swatchChecker/swatchFill 6 个 UI 槽）
> **优先级：** P3
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D3-04

---

## 一、执行摘要

对 `color-swatch-picker` 完成全维度审计。`ColorSwatchPickerCompact` 基于 listbox 将 `colors` 数组迭代为可选色块条目（`ColorSwatchPickerItem` + `ItemSwatch` + `ItemIndicator`），`M` 泛型支持单选/多选；UI 层 `SColorSwatchPicker` `colorSwatchPickerVariants` 注入（6 尺寸 × 2 形状）。

**发现 Major ×1**（已修复）——D6 文档结构不完整（且缺 API 节）：

|    维度     | 状态 |                                                                                                                                    说明                                                                                                                                     |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                      多槽 + Compact 模式正确：`ColorSwatchPickerCompact` 持有色板迭代编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`role="listbox"`/`option`、roving focus、单选/多选、勾选指示器完整                                      |
| D2 行业对标 |  ✅  |                                          对标 radix-ui-color/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（颜色选择器内预设行）：SoybeanUI 暴露独立基于 listbox 的色块选择器（单选/多选 + 指示器 + 形状/尺寸）                                           |
| D3 API 设计 |  ✅  |                                                       `colors`/`modelValue`/`multiple`/`shape`/`size` 命名与主流库一致；事件 `update:modelValue`/`select` 语义清晰；`swatch`/`indicator`/`default` 插槽完整（D3-04）                                                        |
| D4 类型系统 |  ✅  |                              `ColorSwatchPickerProps`/`Emits`/`Ui`（6 槽）导出完整；`M extends boolean` 泛型化（单选 `string`/多选 `string[]`）精确；`ColorSwatchPickerCompactSlotProps`/`ColorSlotProps` 复用；JSDoc 覆盖 `colors`/`multiple`                              |
| D5 代码规范 |  ✅  |                                                      `eslint` 0 errors；`useOmitProps` 含 `class`；`ColorSwatchPickerCompact` 委托键与 `ColorSwatchPickerCompactProps` 严格一致；`colorSwatchPickerVariants` 简洁规范                                                       |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 3 节（缺 API）重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/**API**/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                                                      单测 4 项全通过（listbox/option 渲染/色块内容/indicator 插槽转发/点击 `update:modelValue`）；SSR 无顶层 `window`/`document` 访问                                                                       |

---

## 二、行业对标矩阵

> `color-swatch-picker` 是 **基于 listbox 的预设色板选择器（headless 聚合）** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 在单个颜色选择器中提供预设行。

| 能力                  | SoybeanUI | shadcn/ui | Ant Design | Element Plus | Mantine | Naive UI |
| :-------------------- | :-------: | :-------: | :--------: | :----------: | :-----: | :------: |
| 基于 headless listbox |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 单选/多选             |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 勾选指示器            |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| Roving focus          |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 形状（方/圆）         |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 尺寸（6）             |    ✅     |     —     |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ，且缺 API 节）

**现象：** [color-swatch-picker.md（en）](../../apps/docs/src/docs/en/components/color-swatch-picker.md) 与 [color-swatch-picker.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/color-swatch-picker.md) 仅有 Overview/Usage/Demos 三节（**缺 API 节**），缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（color-swatch/color-area/alert 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：7 条能力（headless listbox/预设色板/单选多选/指示器/形状/尺寸/自定义内容）。
- `Component family`：`SColorSwatchPicker` + 5 个 headless 部件职责说明（含 listbox 复用）。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（`colors`/`update:modelValue` 单选多选/插槽/`shape`/listbox 契约）+ `Roadmap`。
- `FAQ`：4 组问答（构建/多选/圆形/自定义指示器）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`ColorSwatchPickerCompact` 用 `v-for` 迭代 `colors` 为条目（item + swatch + indicator），编排全部下沉 headless，UI 层无结构装配。
- **D1-16 键盘**：基于 listbox 的 roving focus/键盘导航完整。
- **D7-04 SSR**：color-swatch-picker 无顶层 `window`/`document` 访问。
- **D5 规范**：复用 listbox 上下文与 `ColorSwatchCompact` 基座，无重复逻辑。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/color-swatch-picker.spec.ts`：**4 项全部通过**（listbox/option 渲染/色块内容/indicator 插槽转发/点击 `update:modelValue`）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                                    |
| :-------------- | :---------- | :-------------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 当前 color-swatch-picker 重点项未含 e2e；真实键盘/多选/颜色渲染建议浏览器覆盖，排期评估 |
| 多选单测        | D7 覆盖度   | 当前仅覆盖单选；`multiple` 多选与 `select` 事件建议补单测，排期评估                     |
