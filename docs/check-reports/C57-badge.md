# C57 `badge` 检查优化报告

> **组件编号：** C57（`badge`）
> **组件名称：** `SBadge`（headless 基座：`BadgeRoot`/`BadgeContent`/`BadgeCompact`）
> **模式：** 多槽 + Compact（root/content 2 个 UI 槽）
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-01

---

## 一、执行摘要

对 `badge` 完成全维度审计。核心链路：`BadgeRoot` 经 `useControllableState` 维护 `open` 状态（默认 `true`）并通过 `provideBadgeRootContext` 下发；`BadgeContent` 在 `open` 为真时以 `v-if` 渲染气泡；`BadgeCompact` 组合 root/content 并以 `content` prop/插槽承载气泡内容；UI 层 `SBadge` `badgeVariants` 2 槽注入（8 颜色 × 6 尺寸 × 4 位置），`useOmitProps` 含 `class` 防重复绑定，角落定位使用逻辑 `start`/`end` + RTL `transform` 交换。

**发现 Major ×1**（已修复），**Enhancement ×2**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`BadgeCompact` 持有聚合编排，UI 层无 `v-for`/无结构装配；headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-badge-root/content` 完整；`useOmitProps` 含 `class`；`badgeVariants` 槽键与 `BadgeUiSlot` 完全一致；RTL 用逻辑属性          |
| D2 行业对标 |  ✅  | 对标 shadcn/ui/Radix（headless 分离）与 AntD/Element Plus/Naive UI（单一样式化，`count`/`max`/`dot`/`offset`）：SoybeanUI 以 `content` prop/插槽 + 受控 `open` 提供气泡，RTL 感知为差异化优势；`max`/`dot`/`offset` 列为增强项（见 3.2）                            |
| D3 API 设计 |  ✅  | `content`/`contentProps`/`position`/`open` 命名合理；`v-model:open` 受控/非受控统一（`useControllableState`）；`color`/`size` 复用 `ThemeColor`/`ThemeSize`；`position` 四向字面量联合                                                                              |
| D4 类型系统 |  ✅  | `BadgeRootContext.open: ShallowRef<boolean>` 精确；`BadgeCompactProps`/`BadgeProps`/`BadgeEmits` 导出完整；JSDoc 覆盖 `open`/`content`/`contentProps`；`pnpm typecheck` 无新增错误（见验证）                                                                        |
| D5 代码规范 |  ✅  | `eslint` 0 errors；无类型断言逃逸；`badge-root.vue` 用 `useControllableState`、`badge-content.vue` 用 `v-if` 条件渲染，无多余 watcher（见验证）                                                                                                                     |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（9 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  | 单测 6 项全通过（渲染/自定义 content 插槽/自定义 class/默认显示/`open=false` 隐藏/无障碍 axe 0 违规）；SSR 无 `window`/`document` 访问；无定时器/监听器泄漏；颜色对比 e2e 列为增强项（见 3.3）                                                                      |

---

## 二、行业对标矩阵

> `badge` 是 **headless 聚合 + 显隐状态编排** 模式。shadcn/ui 为纯样式标签（headless 分离）；Ant Design/Element Plus/Naive UI 为单一样式化 `Badge`（`count`/`max`/`dot`/`offset`）；Mantine 为纯标签无气泡语义。

| 能力                  | SoybeanUI | shadcn/ui | Ant Design Badge | Element Plus Badge | Mantine Badge | Naive UI Badge |
| :-------------------- | :-------: | :-------: | :--------------: | :----------------: | :-----------: | :------------: |
| Headless/样式分离     |    ✅     |    ✅     |        —         |         —          |       —       |       —        |
| 内容 / 通知气泡       |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| 位置（角落定位）      |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| 颜色变体（8）         |    ✅     |    ✅     |        ✅        |         ✅         |      ✅       |       ✅       |
| 尺寸变体（6）         |    ✅     |     —     |        ✅        |         ✅         |      ✅       |       ✅       |
| RTL 感知定位          |    ✅     |     —     |        —         |         —          |       —       |       —        |
| 受控显隐（`open`）    |    ✅     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| `max` 数量封顶（99+） |    ➕     |     —     |        ✅        |         ✅         |       —       |       ✅       |
| `dot` 模式 / `offset` |    ➕     |     —     |        ✅        |         ✅         |       —       |       ✅       |

`—` = 不支持或采用不同交互模型；`➕` = 有价值但尚未提供的增强项。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [badge.md（en）](../../apps/docs/src/docs/en/components/badge.md) 与 [badge.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/badge.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节，badge 为遗漏项。

**修复：** en/zh 文档同时重构为 9 节结构，新增：

- `Features`：8 条能力（headless 分离/`content` 插槽/受控显隐/8 色/6 尺寸/4 位置/RTL/无障碍）。
- `Component family`：`SBadge`/`BadgeRoot`/`BadgeContent`/`BadgeCompact` 职责说明。
- `Notes`：架构对标表（9 能力 × 6 库）+ 5 条 Cautions（相对定位裁剪/`open` 默认/`nowrap` 溢出/气泡可读性/RTL 镜像）+ `Roadmap` 说明。
- `FAQ`：5 组问答（未读数量/受控显隐/角落定位/颜色尺寸/自定义气泡）。

### 3.2 Enhancement — D2-11 `max` / `dot` / `offset` 特性缺失

**现象：** 对标 AntD/Element Plus/Naive UI，badge 未提供 `max`（数量封顶渲染 `99+`）、`dot`（纯圆点状态）与 `offset`（自定义偏移）三个高频便捷能力。

**处理：** 非阻塞，记录于报告「遗留增强项」并在文档 Notes/Roadmap 中说明；建议排期写入 `docs/roadmap.md` 评估，不在当前迭代引入以保持 API 精简。

### 3.3 Enhancement — D7-19 颜色对比浏览器 e2e 缺失

**现象：** [check.md](../../docs/check.md) 将 `badge`（C57）列为颜色对比类 e2e 目标（D7-19）；但已完成的对标组件 `link`（C04）等同样缺失 e2e spec，且 check.md 明确「缺失 e2e spec 非 Blocker」。

**处理：** 单测已用 `axe-core` 覆盖默认态对比扫描；浏览器 e2e 作为统一增强项排期，不单独阻塞。

### 3.4 核查结论（非缺陷）

- **D1-12 Compact 聚合下沉**：`BadgeCompact` 持有 root/content 的默认装配与显隐编排，UI 层 `SBadge` 无 `v-for`、无结构编排（仅样式注入 + 插槽/事件转发）。
- **D1-05 上下文响应式**：`BadgeRootContext.open` 为 `ShallowRef<boolean>`，经 `provideBadgeRootContext({ open })` 注入，无裸非响应式值。
- **D1-13 RTL**：`badge.ts` 位置变体使用逻辑 `start-0`/`end-0` 与 `rtl:-translate-x-1/2` 交换，符合 D1-13 逻辑属性要求。
- **D7-09 SSR**：badge 无顶层 `window`/`document` 访问；`useControllableState` 与 `v-if` 均无副作用依赖客户端环境。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/badge.spec.ts`：**6 项全部通过**（渲染/自定义 content 插槽/自定义 class/默认显示/`open=false` 隐藏/无障碍 0 违规）。
- `pnpm exec eslint packages/headless/src/components/badge/ packages/ui/src/components/badge/ packages/ui/src/styles/badge.ts`：**0 errors**。
- 本次仅文档改动（无公共 API 变更），无需重跑 `pnpm sui api`。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题，与 badge 改动无关；badge 代码经 vitest 编译运行通过。

## 五、遗留增强项（非阻塞，排期）

| 增强项              | 对标依据                | 说明                                                                                  |
| :------------------ | :---------------------- | :------------------------------------------------------------------------------------ |
| `max` 数量封顶      | AntD/Element Plus/Naive | `content` 为数字时渲染 `max+`（如 `99+`）；建议新增 `max` prop，排期评估              |
| `dot` 纯圆点模式    | AntD/Element Plus       | 无内容纯状态圆点，配合 `status` 语义；可经 `content` 插槽临时实现，核心不急于引入     |
| `offset` 自定义偏移 | AntD/Element Plus       | 微调气泡相对宿主的位置；可经 `ui` 覆盖实现，暂不新增 prop                             |
| 颜色对比浏览器 e2e  | D7-19                   | 与 `link`/`tag`/`alert` 统一补齐颜色对比 e2e spec（axe color-contrast），非当前阻塞项 |
