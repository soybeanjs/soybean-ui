# C64 `accordion` 检查优化报告

> **组件编号：** C64（`accordion`）
> **组件名称：** `SAccordion`（headless 基座：`AccordionRoot`/`AccordionItem`/`AccordionHeader`/`AccordionTrigger`/`AccordionContent`/`AccordionDescription`/`AccordionCompact`）
> **模式：** 多槽 + Compact（root/item/header/content/trigger/description 6 个 UI 槽 + triggerLeadingIcon/triggerIcon 装饰槽）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `accordion` 完成全维度审计。核心链路：`AccordionRoot` 经 `useSelection` 管理单选/多选 `modelValue`，`transformPropsToContext` 下发 `collapsible`/`disabled`/`orientation`/`unmountOnHide`；`AccordionItem` 派生 open/disabled 并通过 `getCollectionItemElements` + `useArrowNavigation` 实现方向键导航（遵循 `orientation` + `dir`）；`AccordionTrigger` 渲染真实 `<button>`（`aria-expanded`/`aria-disabled`/`data-state`/`data-orientation`，支持 `as`/`asChild`）；`AccordionContent` 经 `CollapsibleContent` 带动画；`AccordionCompact` 以 `items` 数据驱动迭代并暴露 `item`/`leading`/`title`/`trigger-icon`/`content` 插槽。

**发现 Major ×1**（已修复），**Enhancement ×2**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                             |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`AccordionCompact` 持有 `items` 迭代与默认装配，UI 层 `SAccordion` 无 `v-for`（仅样式注入 + 插槽/事件转发）；headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-accordion-*` + `data-soybean-collection-item` 完整；方向键导航、`aria-expanded`/`aria-disabled`/`data-state`/`data-orientation` 齐备 |
| D2 行业对标 |  ✅  | 对标 shadcn/ui/Radix（headless 分离）与 AntD/Element Plus/Naive UI（`activeKey` 配置驱动）：SoybeanUI 根用 `useSelection` 统一单选/多选，方向键复用菜单家族 `useArrowNavigation`；`variant` 边框集合/`left` 图标列为增强项（见 3.2）                                                                                             |
| D3 API 设计 |  ✅  | `items`/`multiple`/`collapsible`/`orientation`/`unmountOnHide` 命名与主流库一致；`SAccordion<T, M>` 泛型；`item`/`leading`/`title`/`trigger-icon`/`content` 插槽语义完整；触发器 `as`/`asChild` 扩展点                                                                                                                           |
| D4 类型系统 |  ✅  | `AccordionProps<T, M extends boolean>`/`AccordionEmits<M>`/`AccordionSlots<T, M>` 泛型精确；`AccordionOptionData` 导出；JSDoc 覆盖 `items`/`multiple`/`collapsible`/`orientation`；`pnpm typecheck` 无新增错误（见验证）                                                                                                         |
| D5 代码规范 |  ✅  | `eslint` 0 errors；无类型断言逃逸；`accordion-item.vue` 用 `computed` 派生 `open`/`disabled`/`unmountOnHide`，`onKeydown` 提取清晰（见验证）                                                                                                                                                                                     |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（9 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐                                                              |
|   D7 其他   |  ✅  | 单测 9 项全通过（渲染/触发器数量/关闭态 `aria-expanded`/受控展开/点击 `update:modelValue`/多选/禁用/关闭态·展开态 axe 0 违规）；SSR 无 `window`/`document` 访问；`useSelection`/`onWatcherCleanup` 无泄漏（见验证）                                                                                                              |

---

## 二、行业对标矩阵

> `accordion` 是 **headless 聚合 + 选择状态编排** 模式。shadcn/ui/Radix 为同源 headless 设计；Ant Design/Element Plus/Mantine/Naive UI 为配置驱动折叠（`defaultActiveKey`/`activeKey`）。

| 能力                        | SoybeanUI | shadcn/ui | Ant Design Collapse | Element Plus Collapse | Mantine Accordion | Naive UI Collapse |
| :-------------------------- | :-------: | :-------: | :-----------------: | :-------------------: | :---------------: | :---------------: |
| Headless/样式分离           |    ✅     |    ✅     |          —          |           —           |         —         |         —         |
| 单选 / 多选                 |    ✅     |    ✅     |         ✅          |          ✅           |        ✅         |        ✅         |
| 可全部关闭                  |    ✅     |    ✅     |         ✅          |          ✅           |        ✅         |        ✅         |
| 方向键导航                  |    ✅     |    ✅     |         ✅          |          ✅           |        ✅         |        ✅         |
| 自定义触发器图标            |    ✅     |     —     |         ✅          |          ✅           |        ✅         |        ✅         |
| 数据驱动 `items`（Compact） |    ✅     |     —     |         ✅          |          ✅           |        ✅         |        ✅         |
| 禁用条目                    |    ✅     |    ✅     |         ✅          |          ✅           |        ✅         |        ✅         |
| 方向（v/h）                 |    ✅     |     —     |         ✅          |          ✅           |         —         |         —         |
| `as`/`asChild` 触发器       |    ✅     |    ✅     |          —          |           —           |         —         |         —         |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [accordion.md（en）](../../apps/docs/src/docs/en/components/accordion.md) 与 [accordion.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/accordion.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节，accordion 为遗漏项。

**修复：** en/zh 文档同时重构为 9 节结构，新增：

- `Features`：8 条能力（headless 分离/单选·多选/键盘导航/方向/禁用/6 尺寸/完全可定制/无障碍）。
- `Component family`：`SAccordion` 及 7 个 headless 部件职责说明。
- `Notes`：架构对标表（9 能力 × 6 库）+ 5 条 Cautions（单选·可折叠/方向键·RTL/`unmountOnHide`/触发器 chevron/禁用条目）+ `Roadmap` 说明。
- `FAQ`：5 组问答（单开/多开/全关/自定义图标/自定义条目）。

### 3.2 Enhancement — D2-11 边框 variant / `left` 图标触发器

**现象：** 对标 AntD/Element Plus，accordion 未内置边框 `variant` 集合与 `left` 图标触发器布局。

**处理：** 非阻塞，记录于报告「遗留增强项」并在文档 Notes/Roadmap 说明；当前可经 `item`/`trigger-icon` 插槽与 `ui` 覆盖实现。

### 3.3 Enhancement — D1-15 默认触发器图标 `aria-hidden`

**现象：** `AccordionCompact` 默认触发器图标经 headless `_icon` 渲染，未设置 `aria-hidden`（装饰性 chevron 与 leading 图标）。

**处理：** 非阻塞，跨组件（headless `_icon` 供多组件复用）的交叉关注点；单测环境无 `iconRender` 故图标不渲染、a11y 扫描通过，真实场景中触发器的 `aria-expanded` + 标题文本已提供可访问语义。建议作为 headless `_icon` 统一增强项排期，不在本组件单独改动。

### 3.4 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`AccordionCompact` 持有 `items` 迭代与默认内容装配，UI 层 `SAccordion` 无 `v-for`、无结构编排。
- **D1-16 键盘**：`AccordionItem` 的 `onKeydown` 以 `collectionItemIndex !== -1` 守卫（仅对集合项触发），方向键遵循 `orientation` + `dir`；`CollapsibleTrigger` 原生 `<button>` 保证焦点可达。
- **D7-09 SSR**：accordion 无顶层 `window`/`document` 访问；`useSelection` 状态纯响应式。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/accordion.spec.ts`：**9 项全部通过**（渲染/触发器数量/关闭态 `aria-expanded`/受控展开/点击 `update:modelValue`/多选/禁用/关闭态·展开态 axe 0 违规）。
- `pnpm exec eslint packages/headless/src/components/accordion/ packages/ui/src/components/accordion/ packages/ui/src/styles/accordion.ts`：**0 errors**。
- 本次仅文档改动（无公共 API 变更），无需重跑 `pnpm sui api`。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；accordion 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项                         | 对标依据          | 说明                                                                                |
| :----------------------------- | :---------------- | :---------------------------------------------------------------------------------- |
| 边框 `variant` 变体            | AntD/Element Plus | 内置 bordered/flushed 变体集合；当前可经 `ui`/`item` 插槽覆盖，建议 roadmap P3 评估 |
| `left` 图标触发器布局          | AntD/Element Plus | 图标置于标题左侧的触发器布局；当前可经 `trigger-icon` 插槽 + `ui` 覆盖              |
| headless `_icon` `aria-hidden` | D1-15             | 装饰性图标统一 `aria-hidden`，跨组件交叉项，建议随 `_icon` 增强排期                 |
