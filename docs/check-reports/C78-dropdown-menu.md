# C78 `dropdown-menu` 检查优化报告

> **组件编号：** C78（`dropdown-menu`）
> **组件名称：** `SDropdownMenu` / `SDropdownMenuCheckbox` / `SDropdownMenuRadio` / `SDropdownMenuWrapper`（headless 基座：`DropdownMenuCompact`/`DropdownMenuWrapperCompact`/`DropdownMenuCheckboxCompact`/`DropdownMenuRadioCompact` + 共享 `MenuOptions`/`MenuItem` 基础组件）
> **模式：** 多槽 + Compact（复用共享 menu 层 + popover portal；`menuVariants` 样式）
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `dropdown-menu` 家族完成全维度审计。`DropdownMenuCompact` 组合 `DropdownMenuWrapper`（popover 触发器/portal）+ `MenuOptions`（数据驱动条目、键盘导航、roving focus、子菜单）；复选/单选变体带 `v-model` 选择；`trigger` 支持 `click`/`hover`（`delayDuration`/`skipDelayDuration`）；UI 包装组件仅经 `provideMenuUi` 注入共享 `menuVariants` 类并转发 prop/插槽。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |       多槽 + Compact 模式正确：`DropdownMenuCompact` 持有菜单编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`role="menu"`/`menuitem`、键盘导航（方向键/Home/End/PageUp/PageDown）、子菜单开合、`aria-checked`（复选/单选）完整（D1-16）       |
| D2 行业对标 |  ✅  |                                        对标 radix/shadcn-ui（headless menu 分离）与 AntD/Element Plus/Mantine/Naive UI（`items`/`onSelect`）：SoybeanUI 提供专用复选/单选/自定义变体 + `size` 体系 + 完整键盘/类型过滤                                        |
| D3 API 设计 |  ✅  |                              `open`/`v-model:open`/`modal`/`trigger`(click/hover)/`items`/`delayDuration`/`skipDelayDuration`/`placement`/`showArrow` 命名与主流库一致；复选/单选变体 `v-model` 语义清晰；`MenuUiBaseProps` 复用                              |
| D4 类型系统 |  ✅  |                         `DropdownMenuProps<T>`/`Emits`/`Slots` 泛型化（`DefinedValue`/`AcceptableBooleanValue`）精确；`DropdownMenuCheckboxProps`/`RadioProps` 复用；JSDoc 覆盖 `trigger`/`delayDuration`/`skipDelayDuration`/`items`                         |
| D5 代码规范 |  ✅  |                            `eslint` 0 errors；`useOmitProps` 含 `class`；`DropdownMenuCompact` 用 `usePickProps`/`useOmitProps` 分离 wrapper/options prop 键，委托严格一致；共享 `menu` 上下文复用规范（`provideMenuUi` 单一来源）                            |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（7 能力 × 6 库）+ 5 条 Cautions + Roadmap + 5 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                                            单测 5 项全通过（触发器/菜单内容 `role="menu"`/自定义 class/触发 `update:open`/无障碍 menu role）；SSR 无顶层 `window`/`document` 访问                                                             |

---

## 二、行业对标矩阵

> `dropdown-menu` 是 **基于共享 menu 层的 headless 聚合** 模式。radix/shadcn-ui 为同源 headless menu 分离；Ant Design/Element Plus/Mantine/Naive UI 为带 `items`/`onSelect` prop 的单一样式化下拉。

| 能力              | SoybeanUI | shadcn/ui | Ant Design Dropdown | Element Plus Dropdown | Mantine Menu | Naive UI Dropdown |
| :---------------- | :-------: | :-------: | :-----------------: | :-------------------: | :----------: | :---------------: |
| Headless/样式分离 |    ✅     |    ✅     |          —          |           —           |      —       |         —         |
| 数据驱动条目      |    ✅     |    ✅     |         ✅          |          ✅           |      ✅      |        ✅         |
| 复选 / 单选       |    ✅     |    ✅     |          —          |           —           |      ✅      |         —         |
| 触发 click/hover  |    ✅     |    ✅     |         ✅          |          ✅           |      ✅      |        ✅         |
| 键盘 + 类型过滤   |    ✅     |    ✅     |          —          |           —           |      —       |         —         |
| 子菜单            |    ✅     |    ✅     |         ✅          |          ✅           |      ✅      |        ✅         |
| 尺寸（6）         |    ✅     |     —     |          —          |           —           |      —       |         —         |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [dropdown-menu.md（en）](../../apps/docs/src/docs/en/components/dropdown-menu.md) 与 [dropdown-menu.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/dropdown-menu.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dialog/alert/toast 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：9 条能力（headless menu/触发模式/数据驱动/复选变体/单选变体/自定义变体/定位/模态/子菜单/无障碍）。
- `Component family`：`SDropdownMenu`/`Checkbox`/`Radio`/`Wrapper` + 4 个 Compact + 共享 menu 原语职责说明。
- `Notes`：架构对标表（7 能力 × 6 库）+ 5 条 Cautions（默认模态/`trigger` 延迟/`items` 数据驱动/复选单选 `v-model`/portal 渲染）+ `Roadmap`。
- `FAQ`：5 组问答（基础菜单/复选/单选/自定义/悬停触发）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`DropdownMenuCompact` 用 `usePickProps`/`useOmitProps` 精确分离 wrapper/options prop，UI 层 `SDropdownMenu` 无结构编排。
- **D1-16 键盘**：完整方向键/Home/End/PageUp/PageDown 导航 + 类型过滤 + roving focus；Escape 关闭。
- **D7-04 SSR**：dropdown-menu 无顶层 `window`/`document` 访问。
- **D5 规范**：共享 `menu` 上下文（`provideMenuUi`）为复选/单选/自定义变体统一注入样式，单一来源，符合 Compact 下沉原则。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/dropdown-menu.spec.ts`：**5 项全部通过**（触发器/菜单内容 `role="menu"`/自定义 class/触发 `update:open`/无障碍 menu role）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项            | 对标依据    | 说明                                                                                       |
| :---------------- | :---------- | :----------------------------------------------------------------------------------------- |
| 复选/单选变体单测 | D7 覆盖度   | 当前仅覆盖主 `SDropdownMenu`；`Checkbox`/`Radio` 变体的 `v-model` 选择建议补单测，排期评估 |
| 浏览器 e2e spec   | D7-19/D7-20 | 当前 dropdown-menu 重点项未含 e2e；键盘导航/子菜单/portal 建议真实浏览器覆盖，排期评估     |
