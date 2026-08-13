# C85 `color-picker` 检查优化报告

> **组件编号：** C85（`color-picker`）
> **组件名称：** `SColorPicker`（headless 基座：`ColorPickerCompact`/`ColorPickerRoot`/`ColorPickerTrigger` + 组合 `ColorAreaCompact`/`ColorSliderCompact`/`ColorFieldCompact`/`ColorSwatchCompact`/`ColorSwatchPickerCompact`/`PopoverCompact`/`SegmentCompact`）
> **模式：** 多槽 + Compact（跨颜色基础组件组合 + popover + segment 页签）
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-01、D3-08

---

## 一、执行摘要

对 `color-picker` 完成全维度审计。`ColorPickerCompact` 跨基础组件组合：`ColorPickerRoot`（共享 `color`/`hexValue`/`displayFormat`/`areaChannel`/`setColor`/`setFormat`）+ `PopoverCompact`（触发器/弹层）+ `SegmentCompact`（格式页签）+ `ColorAreaCompact`（饱和度平面）+ `ColorSliderCompact`（hue/alpha）+ `ColorFieldCompact`（格式化/alpha 输入）+ `ColorSwatchPickerCompact`（预设色板）；UI 层 `SColorPicker` 经 `provide*Ui` 逐部分注入 `colorPickerVariants`/`popoverVariants`/`colorAreaVariants`/… 类（6 尺寸）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                                  说明                                                                                                                                   |
| :---------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                   多槽 + Compact 模式正确：`ColorPickerCompact` 持有跨基础组件编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；格式页签切换、hue/alpha 滑块、格式化/alpha 输入、预设色板、popover 触发、`disabled` 完整（D1-12/D1-16）                    |
| D2 行业对标 |  ✅  |                                                 对标 radix-ui-color/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（`showAlpha`/`presets`）：SoybeanUI 提供格式页签 + 完整 `oklch` 编辑 + `size` 体系                                                  |
| D3 API 设计 |  ✅  | `modelValue`/`format`/`defaultFormat`/`colorSpace`/`showAlpha`/`showFields`/`showSwatches`/`swatches`/`open`/`modal`/`placement`/`disabled` 命名与主流库一致；受控/非受控统一；事件 `update:modelValue`/`update:color`/`update:format`/`change` 语义清晰（D3-01/D3-08） |
| D4 类型系统 |  ✅  |                               `ColorPickerProps`/`Emits`/`Ui` 导出完整；`ColorPickerCompactProps`/`ColorPickerRootProps` 层级清晰；`usePickProps` 分离 root/popover prop 键精确；JSDoc 覆盖 `colorSpace`/`format`/`showAlpha`/`swatches`                                |
| D5 代码规范 |  ✅  |                                   `eslint` 0 errors；`useOmitProps` 含 `class`；`ColorPickerCompact` 用 `usePickProps` 精确分离 root/popover prop；`colorPickerVariants` `extendBase` 复用按钮配方规范；逐部分 `provide*Ui` 单一来源                                    |
|   D6 文档   |  ✅  |      **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐      |
|   D7 其他   |  ✅  |                           单测 5 项全通过（触发器当前值/oklch 打开后控件/格式页签切换 `update:format`/格式化输入更新 `update:modelValue` + `update:color`/预设色板选择 `update:modelValue` + `change`）；SSR 无顶层 `window`/`document` 访问                            |

---

## 二、行业对标矩阵

> `color-picker` 是 **跨颜色基础组件的最高层聚合** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为带 `showAlpha`/`presets` prop 的单一样式化颜色选择器。

| 能力              | SoybeanUI | shadcn/ui | Ant Design | Element Plus | Mantine | Naive UI |
| :---------------- | :-------: | :-------: | :--------: | :----------: | :-----: | :------: |
| 组合式基础组件    |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 格式页签          |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 完整 oklch 编辑   |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 色相 + 透明度滑块 |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 预设色板          |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 尺寸（6）         |    ✅     |     —     |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [color-picker.md（en）](../../apps/docs/src/docs/en/components/color-picker.md) 与 [color-picker.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/color-picker.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（color-area/color-field/alert 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：9 条能力（组合式 headless/格式页签/完整 oklch/色相 + 透明度滑块/格式化输入/预设色板/popover 触发器/禁用/尺寸）。
- `Component family`：`SColorPicker` + `ColorPickerCompact`/`Root`/`Trigger` + 底层基础组件职责说明。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（`colorSpace`/`showAlpha`·`showFields`·`showSwatches`/`swatches`/popover 受控/嵌入式优先用单个组件）+ `Roadmap`。
- `FAQ`：4 组问答（使用/OKLCH 编辑/切换分区/控制 popover）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`ColorPickerCompact` 用 `usePickProps` 精确分离 root/popover prop 键，跨基础组件编排全部下沉，UI 层无结构装配。
- **D1-16 键盘**：各基础组件（area/slider/field）键盘交互完整；segment 页签经 tabs 键盘导航。
- **D7-04 SSR**：color-picker 无顶层 `window`/`document` 访问。
- **D5 规范**：`SColorPicker` 集中 `provide*Ui`（area/field/slider/swatch/swatch-picker/popover/tabs）为全部子部件注入样式，单一来源。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/color-picker.spec.ts`：**5 项全部通过**（触发器当前值/oklch 打开后控件/格式页签切换 `update:format`/格式化输入更新 `update:modelValue` + `update:color`/预设色板选择 `update:modelValue` + `change`）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                                          |
| :-------------- | :---------- | :-------------------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 当前 color-picker 重点项未含 e2e；真实 popover 打开/格式切换/颜色计算建议浏览器覆盖，排期评估 |
