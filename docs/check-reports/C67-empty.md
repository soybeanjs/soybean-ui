# C67 `empty` 检查优化报告

> **组件编号：** C67（`empty`）
> **组件名称：** `SEmpty`（headless 基座：`EmptyRoot`/`EmptyHeader`/`EmptyMedia`/`EmptyTitle`/`EmptyDescription`/`EmptyContent`/`EmptyCompact`）
> **模式：** 多槽 + Compact（root/header/media/content/title/description 6 个 UI 槽）
> **优先级：** P3
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-01

---

## 一、执行摘要

对 `empty` 完成全维度审计。核心链路：`EmptyCompact` 依据插槽/prop 计算 `showMedia`/`showHeader` 并组合默认 header/media/title/description；`EmptyRoot`/`EmptyTitle`（`<h3>`）/`EmptyDescription`（`<p>`）等 headless 部件零样式；UI 层 `SEmpty` `emptyVariants` 6 槽注入（6 尺寸），`useOmitProps` 含 `class` 防重复绑定。

**发现 Major ×1**（已修复），**Enhancement ×1**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`EmptyCompact` 持有聚合编排，UI 层无 `v-for`/无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-empty-*` 完整；`useOmitProps` 含 `class`；`emptyVariants` 槽键与 `EmptyUiSlot` 完全一致                                     |
| D2 行业对标 |  ✅  | 对标 shadcn/ui（headless 分离）与 AntD/Element Plus/Naive UI（`image`/`description` 单包配置）：SoybeanUI 提供逐部件 `*Props` 通道与 `size` 尺寸体系，默认媒体经 ConfigProvider `iconRender`；`icon` 装饰性 `aria-hidden` 列为跨组件增强（见 3.2）                  |
| D3 API 设计 |  ✅  | `title`/`description`/`icon`/`media`/`content` 命名与主流库一致；`EmptyCompactProps` 泛型与 5 组逐部件 `*Props` 通道完整；插槽语义齐全                                                                                                                              |
| D4 类型系统 |  ✅  | `EmptyRootProps`/`EmptyTitleProps` 等 6 组接口精确；`EmptyUi`/`EmptyUiSlot`/`EmptyCompactSlots` 导出完整；JSDoc 覆盖 `title`/`description`/`icon`/`*Props`；`pnpm typecheck` 无新增错误（见验证）                                                                   |
| D5 代码规范 |  ✅  | `eslint` 0 errors；无类型断言逃逸；`empty-compact.vue` 用 `computed` 派生 `showMedia`/`showHeader`，无多余 watcher（见验证）                                                                                                                                        |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（7 能力 × 6 库）+ 4 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  | 单测 4 项全通过（title/description/默认·media 插槽/自定义 class/media 样式/无障碍 axe 0 违规）；SSR 无 `window`/`document` 访问；无定时器/监听器泄漏（见验证）                                                                                                      |

---

## 二、行业对标矩阵

> `empty` 是 **headless 聚合 + 展示型容器** 模式。shadcn/ui 为 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为单一样式化 `Empty`（`image`/`description`）。

| 能力              | SoybeanUI | shadcn/ui | Ant Design Empty | Element Plus Empty | Mantine | Naive UI Empty |
| :---------------- | :-------: | :-------: | :--------------: | :----------------: | :-----: | :------------: |
| Headless/样式分离 |    ✅     |    ✅     |        —         |         —          |    —    |       —        |
| 媒体 / 图标       |    ✅     |    ✅     |        ✅        |         ✅         |   ✅    |       ✅       |
| 标题              |    ✅     |     —     |        ✅        |         ✅         |   ✅    |       ✅       |
| 描述              |    ✅     |     —     |        ✅        |         ✅         |   ✅    |       ✅       |
| 操作 / 内容插槽   |    ✅     |     —     |        ✅        |         ✅         |   ✅    |       ✅       |
| 尺寸变体（6）     |    ✅     |     —     |        —         |         —          |    —    |       —        |
| 逐部件 `*Props`   |    ✅     |    ✅     |        —         |         —          |    —    |       —        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [empty.md（en）](../../apps/docs/src/docs/en/components/empty.md) 与 [empty.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/empty.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节，empty 为遗漏项。

**修复：** en/zh 文档同时重构为 9 节结构，新增：

- `Features`：7 条能力（headless 分离/媒体·图标/标题·描述/操作区/6 尺寸/逐槽控制/无障碍）。
- `Component family`：`SEmpty` 及 7 个 headless 部件职责说明。
- `Notes`：架构对标表（7 能力 × 6 库）+ 4 条 Cautions（`iconRender` 依赖/标题层级/虚线边框/纯展示）+ `Roadmap` 说明。
- `FAQ`：5 组问答（图标/操作按钮/尺寸/自定义外观/无障碍）。

### 3.2 Enhancement — D1-15 默认媒体图标 `aria-hidden`

**现象：** `EmptyCompact` 默认媒体图标经 headless `_icon` 渲染，未设置 `aria-hidden`（装饰性插图）。

**处理：** 非阻塞，与 accordion 相同的跨组件（headless `_icon`）交叉关注点；空状态以标题/描述文本提供可访问语义，单测环境无 `iconRender` 故图标不渲染、a11y 通过。建议随 headless `_icon` 统一增强排期。

### 3.3 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`EmptyCompact` 持有 header/media/title/description 默认装配与显隐编排，UI 层 `SEmpty` 无 `v-for`、无结构编排。
- **D7-09 SSR**：empty 无顶层 `window`/`document` 访问。
- **D7-11 测试**：覆盖渲染/插槽/自定义 class/media 样式/无障碍。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/empty.spec.ts`：**4 项全部通过**（title/description/默认·media 插槽/自定义 class/media 样式/无障碍 0 违规）。
- `pnpm exec eslint packages/headless/src/components/empty/ packages/ui/src/components/empty/ packages/ui/src/styles/empty.ts`：**0 errors**。
- 本次仅文档改动（无公共 API 变更），无需重跑 `pnpm sui api`。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；empty 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项                         | 对标依据          | 说明                                                                    |
| :----------------------------- | :---------------- | :---------------------------------------------------------------------- |
| headless `_icon` `aria-hidden` | D1-15             | 装饰性媒体图标统一 `aria-hidden`，跨组件交叉项，建议随 `_icon` 增强排期 |
| 内置插画/图片预设              | AntD/Element Plus | 可内置几组空状态插画预设；当前经 `media` 插槽自定义即可，暂不引入       |
