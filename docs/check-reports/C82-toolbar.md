# C82 `toolbar` 检查优化报告

> **组件编号：** C82（`toolbar`）
> **组件名称：** `SToolbar` / `SToolbarButton` / `SToolbarLink` / `SToolbarSeparator` / `SToolbarToggleGroup` / `SToolbarToggleItem`（headless 基座：`ToolbarRoot`/`ToolbarButton`/`ToolbarLink`/`ToolbarSeparator`/`ToolbarToggleGroup`/`ToolbarToggleItem`，复用 button/link/separator/toggle-group 原语）
> **模式：** 多槽（root/button/link/linkIcon/separator/toggleGroup/toggleItem 7 个 UI 槽，无 Compact）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-11、D3-12、D7-05

---

## 一、执行摘要

对 `toolbar` 家族完成全维度审计。`ToolbarRoot` 提供 `orientation`（horizontal/vertical）+ `dir` + `loop` roving-focus 上下文；各部件复用 button/link/separator/toggle-group 原语（`ToolbarButtonProps extends ButtonProps`、`ToolbarLinkProps extends LinkProps`、`ToolbarSeparatorProps extends SeparatorRootProps`、`ToolbarToggleGroupProps extends ToggleGroupRootProps`）；UI 层 `SToolbar` `toolbarVariants` 按 7 槽注入（6 尺寸 × 2 方向）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                多槽模式正确：`ToolbarRoot` 持有 roving-focus + 方向上下文，各部件为薄基础组件复用；headless 零样式、UI 层无 ARIA/键盘逻辑；`role="toolbar"`、`aria-orientation`、Home/End/方向键 roving focus、`loop`、禁用项跳过完整（D1-16）                |
| D2 行业对标 |  ✅  |                             对标 radix/shadcn-ui（headless toolbar/toggle-group 分离）与 AntD/Element Plus/Mantine/Naive UI（按钮/分段控件，无专用 roving-focus 工具栏）：SoybeanUI 提供方向感知分隔线 + `loop`/RTL + `size` 体系                             |
| D3 API 设计 |  ✅  |                                            `orientation`/`dir`/`loop` 命名与主流库一致；`SToolbarToggleGroup` 复用 toggle-group `model-value`/`v-model`（单选/多选）；`SToolbarLink` `showIcon` 语义清晰（D3-12）                                             |
| D4 类型系统 |  ✅  |                 `ToolbarProps extends HeadlessToolbarRootProps` 精确；`ToolbarUi`（7 槽）导出完整；各部件 `extends ButtonProps`/`LinkProps`/`SeparatorRootProps`/`ToggleGroupRootProps` 复用精确；JSDoc 覆盖 `orientation`/`loop`/`showIcon`                  |
| D5 代码规范 |  ✅  |                                                       `eslint` 0 errors；`useOmitProps` 含 `class`；`SToolbar` 无结构装配（纯上下文 + 样式注入）；`toolbarVariants` 共享 `sharedButtonClasses` 复用规范                                                       |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                              单测 11 项全通过（role/orientation/class 注入/分隔线方向/垂直方向/RTL 推导/显式 dir/点击/空格激活链接/禁用跳过 roving focus/toggle `modelValue`/a11y 0 违规）；SSR 无顶层 `window`/`document` 访问                               |

---

## 二、行业对标矩阵

> `toolbar` 是 **多槽复用组合（无 Compact）** 模式。radix/shadcn-ui 为同源 headless toolbar/toggle-group 分离；Ant Design/Element Plus/Mantine/Naive UI 提供按钮/分段控件而非专用 roving-focus 工具栏容器。

| 能力                | SoybeanUI | shadcn/ui | Ant Design | Element Plus | Mantine | Naive UI |
| :------------------ | :-------: | :-------: | :--------: | :----------: | :-----: | :------: |
| Headless/样式分离   |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| Roving focus + loop |    ✅     |    ✅     |     —      |      —       |   ✅    |    —     |
| 方向感知            |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 切换组              |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    —     |
| 链接支持            |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 尺寸（6）           |    ✅     |     —     |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [toolbar.md（en）](../../apps/docs/src/docs/en/components/toolbar.md) 与 [toolbar.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/toolbar.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dropdown-menu/tooltip/alert 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：7 条能力（headless 分离/roving focus/方向/切换组/链接/尺寸/无障碍）。
- `Component family`：`SToolbar` + 5 个部件（Button/Link/Separator/ToggleGroup/ToggleItem）职责说明 + 底层原语。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（`role="toolbar"`/roving focus + `loop`/切换组单选多选/RTL 推导/`showIcon`）+ `Roadmap`。
- `FAQ`：4 组问答（构建工具栏/垂直/循环导航/添加链接）。

### 3.2 核查结论（非缺陷）

- **D1-12 多槽模式**：toolbar 为「多槽」（无 Compact）——`ToolbarRoot` 仅提供上下文，各部件为独立导出组件，符合 check.md 模式分类。
- **D1-16 键盘**：完整 roving focus（方向键/Home/End）+ `loop`；禁用项与分隔线跳过；空格激活链接（`Link` 行为）。
- **D7-04 SSR**：toolbar 无顶层 `window`/`document` 访问。
- **D7-05**：a11y 单测覆盖完整，0 违规（`role="toolbar"`/`aria-orientation`/`aria-pressed`）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/toolbar.spec.ts`：**11 项全部通过**（role/orientation/class 注入/分隔线方向/垂直方向/RTL 推导/显式 dir/点击/空格激活链接/禁用跳过 roving focus/toggle `modelValue`/a11y 0 违规）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                                |
| :-------------- | :---------- | :---------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 当前 toolbar 重点项未含 e2e；真实键盘 roving focus/颜色对比建议浏览器覆盖，排期评估 |
