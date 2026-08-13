# C79 `context-menu` 检查优化报告

> **组件编号：** C79（`context-menu`）
> **组件名称：** `SContextMenu` / `SContextMenuCheckbox` / `SContextMenuRadio` / `SContextMenuWrapper`（headless 基座：`ContextMenuCompact`/`ContextMenuWrapperCompact`/`ContextMenuCheckboxCompact`/`ContextMenuRadioCompact` + `ContextMenuRoot`/`ContextMenuTrigger`/`ContextMenuContent` + 共享 `MenuOptions`/`MenuItem`）
> **模式：** 多槽 + Compact（共享 menu 层 + 指针锚定 portal；`menuVariants` 样式）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `context-menu` 家族完成全维度审计。`ContextMenuRoot` 维护内部 `open`（`ref`）+ `pressOpenDelay`（默认 700ms）；`ContextMenuTrigger` 经 `contextmenu`（鼠标右键）或 `pointerdown` 长按（触屏/笔）在指针位置打开，并 `preventDefault` 抑制原生菜单；`ContextMenuCompact` 组合 `ContextMenuWrapper` + `MenuOptions`（数据驱动条目、键盘导航、roving focus）；复选/单选变体带 `v-model`；UI 包装组件仅经 `provideMenuUi` 注入共享 `menuVariants` 类并转发 prop/插槽。

**发现 Major ×1**（已修复，D6）+ **Minor ×1**（已修复，D7 测试覆盖薄弱）：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                   多槽 + Compact 模式正确：`ContextMenuCompact` 持有菜单编排，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`contextmenu`/长按触发、指针定位、`preventDefault`、`role="menu"`/`menuitem`、键盘导航完整（D1-16）                    |
| D2 行业对标 |  ✅  |                        对标 radix/shadcn-ui（headless menu 分离）与 AntD/Element Plus/Mantine/Naive UI（单一样式化右键菜单或 `trigger="contextmenu"` 复用下拉）：SoybeanUI 提供复选/单选/自定义变体 + `size` 体系 + 完整键盘/类型过滤                         |
| D3 API 设计 |  ✅  |                                                   `open`/`v-model:open`/`modal`/`items`/`pressOpenDelay`/`disabled`/`showArrow` 命名与主流库一致；复选/单选变体 `v-model` 语义清晰；`MenuUiBaseProps` 复用                                                    |
| D4 类型系统 |  ✅  |                                   `ContextMenuProps<T>`/`Emits`/`Slots` 泛型化（`DefinedValue`/`AcceptableBooleanValue`）精确；JSDoc 覆盖 `pressOpenDelay`/`items`/`disabled`；`ContextMenuCheckboxProps`/`RadioProps` 复用                                   |
| D5 代码规范 |  ✅  |                                          `eslint` 0 errors；`useOmitProps` 含 `class`；`ContextMenuCompact` 用 `usePickProps`/`useOmitProps` 分离 wrapper/options prop 键，委托严格一致；共享 `menu` 上下文复用规范                                           |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 4 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                     单测由 4 项重写为 5 项（**Minor 修复**：原测试仅断言触发器存在，未验证右键打开；现经 `contextmenu` 触发并断言 portal 中 `role="menu"`），全通过；SSR 无顶层 `window`/`document` 访问                                      |

---

## 二、行业对标矩阵

> `context-menu` 是 **基于共享 menu 层的指针锚定 headless 聚合** 模式。radix/shadcn-ui 为同源 headless menu 分离；Ant Design/Element Plus/Mantine/Naive UI 提供单一样式化右键菜单（或复用下拉 `trigger="contextmenu"`）。

| 能力            | SoybeanUI | shadcn/ui | Ant Design | Element Plus | Mantine | Naive UI |
| :-------------- | :-------: | :-------: | :--------: | :----------: | :-----: | :------: |
| 指针定位        |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |
| 右键触发        |    ✅     |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |
| 长按（触屏）    |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 复选 / 单选     |    ✅     |    ✅     |     —      |      —       |   ✅    |    —     |
| 键盘 + 类型过滤 |    ✅     |    ✅     |     —      |      —       |    —    |    —     |
| 尺寸（6）       |    ✅     |     —     |     —      |      —       |    —    |    —     |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [context-menu.md（en）](../../apps/docs/src/docs/en/components/context-menu.md) 与 [context-menu.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/context-menu.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dropdown-menu/dialog/alert 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：8 条能力（右键触发/长按触发/headless menu/数据驱动/复选单选变体/自定义变体/模态/无障碍）。
- `Component family`：`SContextMenu`/`Checkbox`/`Radio`/`Wrapper` + 4 个 Compact + `ContextMenuRoot`/`Trigger`/`Content` + 共享 menu 原语。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（指针打开/`pressOpenDelay`/默认模态/`items` 数据驱动/复选单选 `v-model`/portal 渲染 + `preventDefault`）+ `Roadmap`。
- `FAQ`：4 组问答（基础菜单/长按/复选单选/自定义）。

### 3.2 Minor — D7 单测覆盖薄弱（未验证右键打开）

**现象：** [context-menu.spec.ts](../../packages/ui/test/specs/components/context-menu.spec.ts) 原 4 项测试均只断言触发器 `button` 存在，未验证菜单经右键真正渲染；且错误地依赖 `open: true` prop（context-menu 打开由 `contextmenu` 事件驱动，`open` prop 不生效）。

**修复：** 重写测试为经 `trigger('contextmenu')` 打开，并断言 portal 中 `role="menu"` 存在（菜单内容经 portal 传送至 `document.body`，故用 `document.body.querySelector` 而非 `wrapper.find`）；**5 项全部通过**。

### 3.3 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`ContextMenuCompact` 用 `usePickProps`/`useOmitProps` 精确分离 wrapper/options prop，UI 层无结构编排。
- **D1-16 键盘**：完整方向键/Home/End/PageUp/PageDown 导航 + 类型过滤 + roving focus；Escape 关闭。
- **D7-04 SSR**：context-menu 无顶层 `window`/`document` 访问（长按计时仅在事件触发时使用 `window`）。
- **D5 规范**：共享 `menu` 上下文（`provideMenuUi`）为复选/单选/自定义变体统一注入样式。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/context-menu.spec.ts`：**5 项全部通过**（触发器渲染/右键打开 + portal `role="menu"`/自定义 class 挂载/右键打开 state/无障碍 menu role）。
- 文档/测试改动未改源码类型，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档与测试，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项            | 对标依据    | 说明                                                                                      |
| :---------------- | :---------- | :---------------------------------------------------------------------------------------- |
| 复选/单选变体单测 | D7 覆盖度   | 当前仅覆盖主 `SContextMenu`；`Checkbox`/`Radio` 变体的 `v-model` 选择建议补单测，排期评估 |
| 浏览器 e2e spec   | D7-19/D7-20 | 指针定位/长按/portal 建议真实浏览器覆盖，排期评估                                         |
