# C80 `command` 检查优化报告

> **组件编号：** C80（`command`）
> **组件名称：** `SCommand`（headless 基座：`CommandCompact` + `ListboxRoot`/`ListboxFilter`/`ListboxContent`/`ListboxGroup`/`ListboxGroupLabel`/`ListboxItem` + `Kbd`，构建于 `useFuse`）
> **模式：** 多槽 + Compact（`CommandCompact` 持有搜索/分组/过滤/默认条目组合；`commandVariants` 样式）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `command` 完成全维度审计。`CommandCompact` 基于 listbox 原语 + `useFuse` 实现命令面板：`searchTerm` 经 `useControllableState` 维护，Fuse 模糊搜索（`ignoreLocation`/`threshold: 0.1`/`resultLimit: 12`/match-all-on-empty），分组条目聚合（`getCommandSearchOptions`/`getCommandItemOptions`），默认条目组合（icon/shortcut/分隔线），空态本地化（`command.noResults`）；UI 层 `SCommand` `commandVariants` 注入（`root` 槽合并 class）。

**发现 Major ×1**（已修复）——D6 文档结构不完整：

|    维度     | 状态 |                                                                                                                             说明                                                                                                                              |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                       多槽 + Compact 模式正确：`CommandCompact` 持有搜索/分组/过滤/默认条目组合，UI 层无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`role="listbox"`/`option`、roving focus、`disabled`、清空、空态完整（D1-16）                        |
| D2 行业对标 |  ✅  |                             对标 cmdk/shadcn-ui（headless command 分离）与 AntD/Element Plus/Mantine/Naive UI（select/autocomplete 而非专用面板）：SoybeanUI 提供真正的 `⌘K` 式命令面板 + Fuse 模糊搜索 + 分组数据 + 图标/快捷键                              |
| D3 API 设计 |  ✅  |      `searchTerm`/`v-model:searchTerm`/`modelValue`/`items`/`placeholder`/`fuseOptions`/`emptyLabel`/`clearable`/`disabled` 命名清晰；`searchTerm` 受控/非受控统一；逐部分 `*Props`（input/list/item/group/groupLabel/shortcut/separator/empty）通道完整      |
| D4 类型系统 |  ✅  |                     `CommandProps<T>`/`Emits`/`Slots` 泛型化（`CommandSingleOptionData`/`CommandOptionData`）；`CommandCompactProps`/`CommandCompactSlots<T>` 精确；`fuseOptions` 类型清晰；JSDoc 覆盖 `items`/`searchTerm`/`fuseOptions`                     |
| D5 代码规范 |  ✅  |                         `eslint` 0 errors；`useOmitProps` 含 `class`；`CommandCompact` 委托键与 `CommandCompactProps` 严格一致；`useFuse`/`getCommandItemOptions` 等纯函数独立；`@vue-ignore` 仅限动态插槽转发类型抑制（非 TS 断言）                          |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap + 5 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  |                                 单测 7 项全通过（placeholder/自定义 class/分组渲染/输入过滤 + `update:searchTerm`/点击选择 + `update:modelValue` + `select`/禁用输入与选择/a11y 0 违规）；SSR 无顶层 `window`/`document` 访问                                 |

---

## 二、行业对标矩阵

> `command` 是 **基于 listbox + Fuse 的 headless 聚合命令面板** 模式。cmdk/shadcn-ui 为同源 headless command 分离；Ant Design/Element Plus/Mantine/Naive UI 提供 select/autocomplete 而非专用命令面板。

| 能力              | SoybeanUI | shadcn/ui (cmdk) | Ant Design | Element Plus | Mantine | Naive UI |
| :---------------- | :-------: | :--------------: | :--------: | :----------: | :-----: | :------: |
| Headless/样式分离 |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 模糊搜索（Fuse）  |    ✅     |        ✅        |     —      |      —       |    —    |    —     |
| 分组数据          |    ✅     |        ✅        |     ✅     |      ✅      |   ✅    |    ✅    |
| 图标 + 快捷键     |    ✅     |        ✅        |     —      |      —       |   ✅    |    —     |
| 键盘导航          |    ✅     |        ✅        |     ✅     |      ✅      |   ✅    |    ✅    |
| 空态              |    ✅     |        ✅        |     ✅     |      ✅      |   ✅    |    ✅    |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [command.md（en）](../../apps/docs/src/docs/en/components/command.md) 与 [command.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/command.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。与已完成组件（dropdown-menu/context-menu/alert 等）的 9 节结构不一致。

**修复：** en/zh 文档同时重构为完整 Recommended structure，新增：

- `Features`：8 条能力（模糊搜索/headless 分离/分组数据/键盘导航/图标快捷键/可清空/禁用/无障碍）。
- `Component family`：`SCommand` + `CommandCompact` + listbox 原语 + `Kbd` 职责说明。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（`searchTerm` 受控/Fuse 默认参数/`items` 分组 + `separator`/`shortcut`·`icon`/空态本地化）+ `Roadmap`。
- `FAQ`：5 组问答（命令面板/分组/搜索词控制/空态/选择处理）。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`CommandCompact` 持有 `useFuse` 搜索 + 分组聚合 + 默认条目组合，UI 层 `SCommand` 无 `v-for`、无结构编排。
- **D1-16 键盘**：listbox 原语提供完整方向键/roving focus 导航；选择经 `select`/`update:modelValue` 事件。
- **D7-04 SSR**：command 无顶层 `window`/`document` 访问。
- **D5 观察**：`command.vue` 动态插槽转发含 `@vue-ignore`（异构插槽签名类型抑制），与 popover 相同的合法 Vue 模式，非 `@ts-ignore` 类断言，不构成缺陷。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/command.spec.ts`：**7 项全部通过**（placeholder/自定义 class/分组渲染/输入过滤 + `update:searchTerm`/点击选择 + `update:modelValue` + `select`/禁用输入与选择/a11y 0 违规）。
- 文档重构仅改动 `*.md`，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。
- **typecheck 说明：** 沿用既有环境基线（`packages/ui/dist` 未构建导致的无关 `theme-customizer.vue` 自引用报错），本次仅改文档，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项                 | 对标依据    | 说明                                                                            |
| :--------------------- | :---------- | :------------------------------------------------------------------------------ |
| 浏览器 e2e spec        | D7-19/D7-20 | 当前 command 重点项未含 e2e；真实输入过滤/键盘导航/焦点建议浏览器覆盖，排期评估 |
| 快捷键 e2e（真实键盘） | D1-16/D7-20 | `⌘K` 等全局快捷键组合建议在真实浏览器验证，排期评估                             |
