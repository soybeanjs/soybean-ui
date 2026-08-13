# C68 `skeleton` 检查优化报告

> **组件编号：** C68（`skeleton`）
> **组件名称：** `SSkeleton`（headless 基座：`Skeleton`）
> **模式：** 单类（`cv()` 无 UiContext）
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D7-04

---

## 一、执行摘要

对 `skeleton` 完成全维度审计。核心链路：headless `Skeleton` 为无状态 `Primitive`，默认 `aria-hidden="true"`（经 `useAttrs` 读取，可覆盖），支持 `as`/`asChild`；UI 层 `SSkeleton` 以 `skeletonVariants` 注入类（6 尺寸 × 2 形状 × `animated` 开关，默认 `animate-pulse`），`useOmitProps` 含 `class` 防重复绑定。

**发现 Major ×1**（已修复），**Enhancement ×1**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 单类模式正确：headless 零样式、仅 `aria-hidden`/`as`/`asChild`；`data-soybean-skeleton` 存在；`skeletonVariants` 首行 `// @unocss-include`，槽/变体齐全；`useOmitProps` 含 `class`；`aria-hidden` 默认 true 且可覆盖（D1-15）                                       |
| D2 行业对标 |  ✅  | 对标 shadcn/ui（headless 分离）与 AntD/Element Plus/Mantine/Naive UI（`paragraph`/`avatar`/`title` 组合预设）：SoybeanUI 保持单一基础组件 + 组合式占位取向，`size` 尺寸体系与 `rounded` 胶囊为差异化能力；组合式骨架块预设列为增强项（见 3.2）                      |
| D3 API 设计 |  ✅  | `size`/`shape`/`animated` 命名与主流库一致；`animated` 默认 `true` 对齐多数库；`as`/`asChild` 扩展点齐备；`SkeletonShape` 字面量联合精确                                                                                                                            |
| D4 类型系统 |  ✅  | `SkeletonProps extends PrimitiveWithBaseProps`（headless）；UI `SkeletonProps extends _SkeletonProps` + `class`/`size`/`animated`/`shape`；`SkeletonShape`/`SkeletonProps` 导出完整；JSDoc 覆盖 `animated`/`shape`；`pnpm typecheck` 无新增错误（见验证）           |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`skeleton.vue`（UI）用 `computed` 派生 `cls`，headless 用 `computed` 派生 `ariaHidden`，无多余 watcher（见验证）                                                                                                                                 |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（6 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  | 单测 4 项全通过（默认 `<div>` + `aria-hidden="true"`/自定义 class/形状·动画变体/无障碍 axe 0 违规）；SSR 无 `window`/`document` 访问；无定时器/监听器泄漏（见验证）                                                                                                 |

---

## 二、行业对标矩阵

> `skeleton` 是 **headless 无状态基础组件 + 单类样式** 模式。shadcn/ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为单一样式化骨架屏（`paragraph`/`avatar`/`title` 组合）。

| 能力               | SoybeanUI | shadcn/ui | Ant Design Skeleton | Element Plus Skeleton | Mantine Skeleton | Naive UI Skeleton |
| :----------------- | :-------: | :-------: | :-----------------: | :-------------------: | :--------------: | :---------------: |
| Headless/样式分离  |    ✅     |    ✅     |          —          |           —           |        —         |         —         |
| 动画 pulse         |    ✅     |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |
| 尺寸变体（6）      |    ✅     |     —     |          —          |          ✅           |        ✅        |         —         |
| 形状（圆角/胶囊）  |    ✅     |     —     |          —          |           —           |        —         |         —         |
| 默认 `aria-hidden` |    ✅     |     —     |          —          |           —           |        —         |         —         |
| `as`/`asChild`     |    ✅     |    ✅     |          —          |           —           |        —         |         —         |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [skeleton.md（en）](../../apps/docs/src/docs/en/components/skeleton.md) 与 [skeleton.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/skeleton.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节，skeleton 为遗漏项。

**修复：** en/zh 文档同时重构为 9 节结构，新增：

- `Features`：7 条能力（headless 分离/6 尺寸/2 形状/动画/默认装饰性/多态/自定义尺寸）。
- `Component family`：`SSkeleton`/`Skeleton` 职责说明。
- `Notes`：架构对标表（6 能力 × 6 库）+ 5 条 Cautions（装饰性/动画默认/尺寸预设/组合占位/`<div>` 默认）+ `Roadmap` 说明。
- `FAQ`：5 组问答（圆形/关闭动画/自定义尺寸/无障碍/卡片形占位）。

### 3.2 Enhancement — D2-11 组合式骨架块预设

**现象：** 对标 AntD/Element Plus 的 `paragraph`/`avatar`/`title` 组合式骨架屏。

**处理：** 非阻塞。SoybeanUI 保持单一基础组件，组合占位交由使用者以 grid/flex 实现（文档已给出卡片示例），暂不引入组合预设，符合 API 精简取向。

### 3.3 核查结论（非缺陷）

- **D1-15 装饰元素**：headless `Skeleton` 默认 `aria-hidden="true"`，且允许使用者传入 `aria-hidden="false"` 覆盖——装饰性语义正确。
- **D7-04 内存泄漏**：skeleton 无定时器/监听器/动画循环（`animate-pulse` 为纯 CSS），无泄漏。
- **D7-09 SSR**：skeleton 无顶层 `window`/`document` 访问。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/skeleton.spec.ts`：**4 项全部通过**（默认 `<div>` + `aria-hidden="true"`/自定义 class/形状·动画变体/无障碍 0 违规）。
- `pnpm exec eslint packages/headless/src/components/skeleton/ packages/ui/src/components/skeleton/ packages/ui/src/styles/skeleton.ts`：**0 errors**。
- 本次仅文档改动（无公共 API 变更），无需重跑 `pnpm sui api`。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；skeleton 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项           | 对标依据          | 说明                                                                         |
| :--------------- | :---------------- | :--------------------------------------------------------------------------- |
| 组合式骨架块预设 | AntD/Element Plus | `paragraph`/`avatar`/`title` 组合预设；当前由使用者 grid/flex 组合，暂不引入 |
