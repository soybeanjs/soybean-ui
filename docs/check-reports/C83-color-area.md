# C83 `color-area` 检查优化报告

> **组件编号：** C83（`color-area`）
> **组件名称：** `SColorArea`（headless 基座：`ColorAreaRoot`/`ColorAreaArea`/`ColorAreaThumb`/`ColorAreaCompact`）
> **模式：** 多槽 + Compact（root/area/thumb 3 个 UI 槽）
> **优先级：** P3
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D3-01

---

## 一、执行摘要

对 `color-area` 完成全维度审计。`ColorAreaRoot` 经 `modelValue`/`color` 受控 + `colorSpace`/`format`/`xChannel`/`yChannel`，`updateValues`/`commitValues` 处理指针与键盘交互；`ColorAreaCompact` 组合 area + thumb 默认装配；UI 层 `SColorArea` `colorAreaVariants` 注入（6 尺寸）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                    多槽 + Compact 模式正确：`ColorAreaCompact` 持有聚合编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；指针拖拽 + 键盘方向键、`role="application"`/`role="slider"`、隐藏表单输入、`disabled` 完整（D1-16）                     |
| D2 行业对标 |  ✅  |                             对标 radix-ui-color/shadcn-ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（合并颜色选择器内嵌饱和度平面）：SoybeanUI 暴露独立可配置区域（轴通道/颜色空间/格式）+ 原生表单输入 + `size` 体系                             |
| D3 API 设计 |  ✅  |                     `modelValue`/`defaultValue`/`colorSpace`/`format`/`xChannel`/`yChannel`/`xName`/`yName`/`disabled` 命名与主流库一致；受控/非受控统一；事件 `update:modelValue`/`update:color`/`change`/`changeEnd` 语义清晰（D3-01）                      |
| D4 类型系统 |  ✅  |                                 `ColorAreaProps`/`Emits`/`Ui`（3 槽）导出完整；`ColorAreaAxisChannel`（Extract<ColorChannel, …>）精确；`ColorAreaRootProps` 层级清晰；JSDoc 覆盖 `modelValue`/`xChannel`/`yChannel`/`format`                                  |
| D5 代码规范 |  ✅  |                                                           `eslint` 0 errors；`useOmitProps` 含 `class`；`ColorAreaCompact` 委托键与 `ColorAreaCompactProps` 严格一致；`colorAreaVariants` 简洁规范                                                            |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 3 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                      单测 5 项全通过（application/slider role/隐藏 x·y 表单输入/键盘 `update:modelValue` + `changeEnd`/OKLCH 明度百分比保持/点击既有 thumb 不偏移）；SSR 无顶层 `window`/`document` 访问                                      |

---

## 二、行业对标矩阵

> `color-area` 是 **独立可配置 2D 颜色平面（headless 聚合）** 模式。radix/shadcn-ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 将饱和度平面内嵌于合并的颜色选择器。

| 能力              | SoybeanUI | shadcn/ui | Ant Design | Element Plus | Mantine | Naive UI |
| :---------------- | :-------: | :-------: | :--------: | :----------: | :-----: | :------: |
| Headless/样式分离 |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 可配置轴          |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 多种颜色空间      |    ✅     |    ✅     |     —      |      —       |   ✅    |    —     |
| 键盘交互          |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 原生表单输入      |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 尺寸（6）         |    ✅     |     —     |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型（多数仅提供合并的颜色选择器）。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [color-area.md（en）](../../apps/docs/src/docs/en/components/color-area.md) 与 [color-area.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/color-area.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（alert/toast/accordion 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：7 条能力（headless 分离/轴通道/颜色空间/键盘/表单字段/禁用/尺寸）。
- `Component family`：`SColorArea` + 4 个 headless 部件职责说明。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（`modelValue`/`format`/`xChannel`·`yChannel` 有效性/事件/表单提交/与 slider 配合）+ `Roadmap`。
- `FAQ`：3 组问答（使用/配置轴/与色相滑块配合）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`ColorAreaCompact` 持有 area + thumb 默认装配，UI 层 `SColorArea` 无结构编排。
- **D1-16 键盘**：方向键以微调/步进调整；指针拖拽 + 点击既有 thumb 不偏移（测试覆盖）。
- **D7-04 SSR**：color-area 无顶层 `window`/`document` 访问（指针捕获逻辑仅事件触发时使用）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/color-area.spec.ts`：**5 项全部通过**（application/slider role/隐藏 x·y 表单输入/键盘 `update:modelValue` + `changeEnd`/OKLCH 明度百分比保持/点击既有 thumb 不偏移）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                           |
| :-------------- | :---------- | :----------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 当前 color-area 重点项未含 e2e；真实拖拽/键盘/颜色计算建议浏览器覆盖，排期评估 |
