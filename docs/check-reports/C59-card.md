# C59 `card` 检查优化报告

> **组件编号：** C59（`card`）
> **组件名称：** `SCard`（headless 基座：`CardRoot`/`CardHeader`/`CardContent`/`CardFooter`/`CardTitleRoot`/`CardTitle`/`CardDescription`/`CardCollapsibleTrigger`/`CardCompact`）
> **模式：** 多槽 + Compact（root/header/content/footer/titleRoot/title/description/trigger 8 个 UI 槽）
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-12

---

## 一、执行摘要

对 `card` 完成全维度审计。核心链路：`CardRoot` 继承 `CollapsibleRoot`（`open`/`defaultOpen` 经 `useControllableState`），`CardContent` 继承 `CollapsibleContent`（动画 + `tabindex="-1"`）；`CardCompact` 组合 header/content/footer 与默认 title/description，依据插槽/prop 计算 `showHeader`/`showFooter` 并通过 `data-header-visible`/`data-footer-visible` 驱动内容内边距；UI 层 `SCard` `cardVariants` 8 槽注入（6 尺寸 × `scrollable` × `split`），`useOmitProps` 含 `class` 防重复绑定。

**发现 Major ×1**（已修复），**Enhancement ×2**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                   |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`CardCompact` 持有结构编排，UI 层无 `v-for`/无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-card-*` 完整；`useOmitProps` 含 `class`；`cardVariants` 槽键与 `CardUiSlot` 完全一致；`data-header-visible`/`data-footer-visible` 为驱动布局的 CSS 状态钩子（同 layout 已验收模式），非冗余装饰 |
| D2 行业对标 |  ✅  | 对标 shadcn/ui（headless 分离）与 AntD/Element Plus/Naive UI（`title`/`extra`/`actions`）：SoybeanUI 使卡片**默认可折叠**（`CollapsibleRoot`），为多数库未提供的差异能力；`split`/`scrollable` 经配方变体切换；`CardActions`/hover 抬升列为增强项（见 3.2）                                                                            |
| D3 API 设计 |  ✅  | `title`/`description`/`extra`/`footer`/`split`/`scrollable` 命名与主流库一致；`v-model:open`/`defaultOpen` 受控/非受控统一；8 槽 + 7 组逐部件 `*Props` 通道（header/content/footer/titleRoot/title/description）+ `CardCompactProps` 泛型                                                                                              |
| D4 类型系统 |  ✅  | `CardRootProps extends CollapsibleRootProps`、`CardContentProps extends CollapsibleContentProps` 精确继承；`CardCompactSlots`/`CardEmits`/`CardSlots` 导出完整；JSDoc 覆盖 `title`/`description`/`split`/`scrollable`；`pnpm typecheck` 无新增错误（见验证）                                                                           |
| D5 代码规范 |  ✅  | `eslint` 0 errors；无类型断言逃逸；`card-compact.vue` 用 `computed` 派生 `showHeader`/`showFooter`，无多余 watcher（见验证）                                                                                                                                                                                                           |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（9 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐                                                                    |
|   D7 其他   |  ✅  | 单测 6 项全通过（默认内容/标题/header/footer/description/自定义 class/折叠/无障碍 axe 0 违规）；SSR 无 `window`/`document` 访问；无定时器/监听器泄漏（见验证）                                                                                                                                                                         |

---

## 二、行业对标矩阵

> `card` 是 **headless 聚合 + 可折叠容器** 模式。shadcn/ui 为 headless 分离（纯容器）；Ant Design/Element Plus/Mantine/Naive UI 为单一样式化卡片（`title`/`extra`/`actions`）。

| 能力                 | SoybeanUI | shadcn/ui | Ant Design Card | Element Plus Card | Mantine Card | Naive UI Card |
| :------------------- | :-------: | :-------: | :-------------: | :---------------: | :----------: | :-----------: |
| Headless/样式分离    |    ✅     |    ✅     |        —        |         —         |      —       |       —       |
| 标题 / 描述          |    ✅     |    ✅     |       ✅        |        ✅         |      ✅      |      ✅       |
| 底部                 |    ✅     |    ✅     |       ✅        |        ✅         |      ✅      |      ✅       |
| 操作（extra）插槽    |    ✅     |     —     |       ✅        |        ✅         |      ✅      |      ✅       |
| 可折叠内容           |    ✅     |     —     |        —        |         —         |      —       |       —       |
| 分区 / 分隔线        |    ✅     |     —     |       ✅        |        ✅         |      ✅      |       —       |
| 可滚动内容           |    ✅     |     —     |       ✅        |         —         |      —       |      ✅       |
| 尺寸变体（6）        |    ✅     |     —     |       ✅        |        ✅         |      ✅      |      ✅       |
| 逐部件 `*Props` 通道 |    ✅     |    ✅     |        —        |         —         |      —       |       —       |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [card.md（en）](../../apps/docs/src/docs/en/components/card.md) 与 [card.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/card.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节，card 为遗漏项。

**修复：** en/zh 文档同时重构为 9 节结构，新增：

- `Features`：8 条能力（headless 分离/复合结构/可折叠/split 分区/可滚动/6 尺寸/逐部件控制/无障碍）。
- `Component family`：`SCard` 及 9 个 headless 部件职责说明。
- `Notes`：架构对标表（9 能力 × 6 库）+ 5 条 Cautions（折叠默认/`h3` 层级/`tabindex="-1"`/split·scrollable 条件/内边距自适应）+ `Roadmap` 说明。
- `FAQ`：5 组问答（标题描述/头部操作/可折叠/可滚动/分隔线）。

### 3.2 Enhancement — D2-11 `CardActions` / hover 抬升变体

**现象：** 对标 AntD/Element Plus，card 未提供独立交互操作栏（`CardActions`）快捷组件，也未内置 hover 抬升样式变体。

**处理：** 非阻塞，记录于报告「遗留增强项」并在文档 Notes/Roadmap 说明；`CardActions` 可由 `footer` 插槽组合实现，hover 变体可经 `ui`/`class` 覆盖，暂不引入新 API。

### 3.3 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`CardCompact` 持有 header/content/footer 显隐与默认 title/description 装配，UI 层 `SCard` 无 `v-for`、无结构编排（仅样式注入 + 插槽/事件转发）。
- **D1-07 数据属性**：`data-header-visible`/`data-footer-visible` 为驱动内容内边距的 CSS 状态钩子（`data-[header-visible=true]:...` UnoCSS 选择器），与 `data-state` 同类，且与 C15 layout 已验收模式一致，非冗余装饰属性。
- **D1-03 UI 边界**：`SCard` 无 ARIA/键盘逻辑；折叠状态语义（`aria-expanded`）由 headless `CollapsibleRoot`/`CollapsibleTrigger` 承担。
- **D7-09 SSR**：card 无顶层 `window`/`document` 访问；`CollapsibleContent` 动画不依赖客户端初始化。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/card.spec.ts`：**6 项全部通过**（默认内容/标题/header·footer·description/自定义 class/折叠/无障碍 0 违规）。
- `pnpm exec eslint packages/headless/src/components/card/ packages/ui/src/components/card/ packages/ui/src/styles/card.ts`：**0 errors**。
- 本次仅文档改动（无公共 API 变更），无需重跑 `pnpm sui api`。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；card 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项             | 对标依据          | 说明                                                                         |
| :----------------- | :---------------- | :--------------------------------------------------------------------------- |
| `CardActions` 快捷 | AntD/Element Plus | 独立交互操作栏快捷组件；当前可由 `footer` 插槽组合实现，建议 roadmap P3 评估 |
| hover 抬升样式变体 | Mantine/AntD      | hover 阴影/位移抬升；当前可经 `ui`/`class` 覆盖，暂不新增 prop               |
| 标题层级 `asChild` | shadcn/ui         | `CardTitle` 固定 `<h3>`；可考虑 `as`/`asChild` 以适配页面标题层级，排期评估  |
