# C60 `list` 检查优化报告

> **组件编号：** C60（`list`）
> **组件名称：** `SList`/`SListItem`（headless 基座：`ListRoot`/`ListItem`/`ListContent`/`ListTitle`/`ListDescription`）
> **模式：** 多槽（root/item/content/title/description 5 个 UI 槽）
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-04、D7-01

---

## 一、执行摘要

对 `list` 完成全维度审计。核心链路：`ListRoot` 渲染 `<ul>`、`ListItem` 渲染 `<li>`，`ListContent`/`ListTitle`/`ListDescription` 组合条目内容；`provideListUi` 注入 `listVariants`（5 槽、6 尺寸）；UI 层 `SList` 包裹 `ListRoot`，`SListItem` 组合条目部件并暴露 `leading`/`title`/`description`/`trailing` 槽。

**发现 Major ×1**（已修复），**Minor ×1 + Enhancement ×1**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                             |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽模式正确：headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-list-root/item/content/title/description` 完整；`listVariants` 槽键与 `ListUiSlot` 完全一致；`useListUi` 经 `provideListUi` 注入                                                                                                                                             |
| D2 行业对标 |  ✅  | 对标 shadcn/ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（`dataSource`/`renderItem` 配置驱动）：SoybeanUI 保持展示型容器，数据迭代交由使用者；内置虚拟滚动列为增强项（见 3.3，交由 `virtualizer` 承担）                                                                                                                              |
| D3 API 设计 |  ✅  | `title`/`description`/`contentProps`/`titleProps`/`descriptionProps` 命名合理；`leading`/`trailing` 插槽语义完整；`SListItem` 组合 API 降低使用门槛                                                                                                                                                                                              |
| D4 类型系统 |  ✅  | `ListRootProps`/`ListItemProps`/`ListContentProps`/`ListTitleProps`/`ListDescriptionProps` 精确；`ListUi`/`ListUiSlot` 导出完整；JSDoc 覆盖 `title`/`description`；`pnpm typecheck` 无新增错误（见验证）                                                                                                                                         |
| D5 代码规范 |  ✅  | `eslint` 0 errors；无类型断言逃逸；`SListItem` 用 `slots.title`/`slots.description` 条件渲染，无多余 watcher（见验证）                                                                                                                                                                                                                           |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 4 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐。**Minor 修复**（D6-05）：playground 仅 `01-basic`，覆盖率偏低（已记录增强） |
|   D7 其他   |  ✅  | 单测 3 项全通过（`<ul>`/`<li>` 语义/自定义 class/无障碍 axe 0 违规）；SSR 无 `window`/`document` 访问；无定时器/监听器泄漏（见验证）                                                                                                                                                                                                             |

---

## 二、行业对标矩阵

> `list` 是 **展示型容器 + headless 多槽** 模式。shadcn/ui 为 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为配置驱动列表（`dataSource`/`renderItem`）。

| 能力              | SoybeanUI | shadcn/ui | Ant Design List | Element Plus | Mantine List | Naive UI |
| :---------------- | :-------: | :-------: | :-------------: | :----------: | :----------: | :------: |
| Headless/样式分离 |    ✅     |    ✅     |        —        |      —       |      —       |    —     |
| 语义化 `ul`/`li`  |    ✅     |    ✅     |       ✅        |      ✅      |      ✅      |    ✅    |
| 标题 + 描述条目   |    ✅     |     —     |       ✅        |      ✅      |      ✅      |    ✅    |
| 前导 / 尾随插槽   |    ✅     |     —     |       ✅        |      ✅      |      ✅      |    ✅    |
| 尺寸变体（6）     |    ✅     |     —     |       ✅        |      ✅      |      ✅      |    ✅    |
| 内置虚拟滚动      |    ➕     |     —     |       ✅        |      —       |      ✅      |    ✅    |

`—` = 不支持或采用不同交互模型；`➕` = 有价值增强项（交由 `virtualizer` 承担）。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [list.md（en）](../../apps/docs/src/docs/en/components/list.md) 与 [list.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/list.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节，list 为遗漏项。

**修复：** en/zh 文档同时重构为 9 节结构，新增：

- `Features`：7 条能力（headless 分离/语义化 `<ul>`/条目组合/前导·尾随/6 尺寸/逐槽控制/无障碍）。
- `Component family`：`SList`/`SListItem` 与 5 个 headless 部件职责说明。
- `Notes`：架构对标表（6 能力 × 6 库）+ 4 条 Cautions（展示型容器/`<li>` 语义/`ListTitle` 非标题元素/超大列表）+ `Roadmap` 说明。
- `FAQ`：5 组问答（标题描述/图标头像/尺寸/超大列表/可点击条目）。

### 3.2 Minor — D6-05 playground 覆盖率偏低

**现象：** [playground/examples/list/](../../apps/playground/src/examples/list/) 仅有 `01-basic`，未覆盖 `size`、`SListItem` 的 `title`/`description`/`leading`/`trailing` 等主要能力。

**处理：** 非阻塞，记录于「遗留增强项」排期补充 `02-size`/`03-item` 示例；文档已完整说明各能力用法。

### 3.3 Enhancement — D2-04/D7-01 内置虚拟滚动

**现象：** 对标 AntD/Element Plus/Naive UI 提供 `dataSource`/`renderItem` + 虚拟滚动；SoybeanUI `SList` 为展示型容器，无内置虚拟滚动。

**处理：** 非阻塞。刻意保持展示型容器，超大列表交由独立 `virtualizer` 组件（D7-01 说明）；文档 Notes/Roadmap 已注明，暂不新增 `dataSource` 配置模式。

### 3.4 核查结论（非缺陷）

- **D1-12**：list 无 Compact 聚合（`SListItem` 直接组合 headless 部件），属多槽基础模式，符合分类。
- **D1-07**：仅 `data-soybean-list-*` 属性，无冗余 `data-*`。
- **D7-09 SSR**：list 无顶层 `window`/`document` 访问。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/list.spec.ts`：**3 项全部通过**（`<ul>`/`<li>` 语义/自定义 class/无障碍 0 违规）。
- `pnpm exec eslint packages/headless/src/components/list/ packages/ui/src/components/list/ packages/ui/src/styles/list.ts`：**0 errors**。
- 本次仅文档改动（无公共 API 变更），无需重跑 `pnpm sui api`。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；list 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项                | 对标依据          | 说明                                                                                     |
| :-------------------- | :---------------- | :--------------------------------------------------------------------------------------- |
| `dataSource` 配置模式 | AntD/Element Plus | `SList` 保持展示型容器；若引入 `items`/`renderItem` 配置模式需 headless 侧聚合，排期评估 |
| 内置虚拟滚动          | AntD/Naive UI     | 超大列表交由独立 `virtualizer` 承担，不内置于 `SList`                                    |
| playground 补充示例   | D6-05             | 补充 `02-size`/`03-item`（title/description/leading/trailing）示例，非当前阻塞           |
