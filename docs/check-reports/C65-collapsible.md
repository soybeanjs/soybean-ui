# C65 `collapsible` 检查优化报告

> **组件编号：** C65（`collapsible`）
> **组件名称：** `SCollapsible`（headless 基座：`CollapsibleRoot`/`CollapsibleTrigger`/`CollapsibleContent`）
> **模式：** 多槽（root/trigger/content 3 个 UI 槽）
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D1-16、D2-11

---

## 一、执行摘要

对 `collapsible` 完成全维度审计。核心链路：`CollapsibleRoot` 经 `useControllableState` 维护 `open`（`defaultOpen` 默认 `false`），`transformPropsToContext` 下发 `disabled`/`unmountOnHide`，根节点 `Primitive` 反映 `data-state`/`data-disabled`；`CollapsibleTrigger` 复用 `Button` 原语并绑定 `aria-expanded`/`aria-controls`/`data-state`；`CollapsibleContent` 经 `usePresence` + `getBoundingClientRect` 测量真实尺寸实现折叠动画，支持 `unmountOnHide`/`forceMount`/`as`/`asChild`。

**发现 Major ×1**（已修复），**Enhancement ×2**（非阻塞）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                           |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽模式正确：headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-collapsible-root/trigger/content` 完整；`collapsibleVariants` 槽键与 `CollapsibleUiSlot` 完全一致；`useOmitProps` 含 `class`；状态经 `aria-expanded`/`aria-controls`/`data-state`/`data-disabled` 反映（D1-08）；`as`/`asChild` 扩展点齐备 |
| D2 行业对标 |  ✅  | 对标 shadcn/ui/Radix（headless 分离）与 AntD/Element Plus/Mantine（配置式折叠）：SoybeanUI 触发器复用 `Button` 原语，`unmountOnHide`/`forceMount`/`as`/`asChild` 对齐 Radix 能力；`disabledCollapsible`（仅禁用折叠不改按钮禁用）为差异化细节                                                                  |
| D3 API 设计 |  ✅  | `open`/`defaultOpen`/`disabled`/`unmountOnHide`/`forceMount` 命名与 Radix/shadcn 一致；`v-model:open` 受控/非受控统一；`CollapsibleTriggerProps.disabledCollapsible` 语义清晰                                                                                                                                  |
| D4 类型系统 |  ✅  | `CollapsibleRootProps extends PrimitiveWithBaseProps`、`CollapsibleTriggerProps extends ButtonProps`、`CollapsibleContentProps extends ForceMountProps` 精确继承；`CollapsibleRootContextParams` 用 `PropsToContext` 精确建模；JSDoc 覆盖全部 props；`pnpm typecheck` 无新增错误（见验证）                     |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`collapsible-content.vue` 用 `computed`/`watch`（`flush: 'post'`）组织动画时序，`requestAnimationFrame` 挂载标记，无多余 watcher（见验证）                                                                                                                                                  |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为 9 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（7 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐                                            |
|   D7 其他   |  ✅  | 单测 6 项全通过（渲染/`ui` class/展开渲染/插槽 `open` prop/默认无事件/无障碍 axe 0 违规）；SSR 安全（`usePresence`/`getBoundingClientRect` 仅客户端路径）；`usePresence` 在 unmount 时清理（见验证）                                                                                                           |

---

## 二、行业对标矩阵

> `collapsible` 是 **headless 状态 + presence 动画** 模式。shadcn/ui/Radix 为同源 headless 设计；Ant Design/Element Plus/Mantine 为配置式折叠。

| 能力              | SoybeanUI | shadcn/ui | Radix Collapsible | Ant Design | Element Plus | Mantine |
| :---------------- | :-------: | :-------: | :---------------: | :--------: | :----------: | :-----: |
| Headless/样式分离 |    ✅     |    ✅     |        ✅         |     —      |      —       |    —    |
| 受控 / 非受控     |    ✅     |    ✅     |        ✅         |     ✅     |      ✅      |   ✅    |
| 高度动画          |    ✅     |    ✅     |        ✅         |     ✅     |      ✅      |   ✅    |
| `unmountOnHide`   |    ✅     |    ✅     |        ✅         |     —      |      —       |    —    |
| `forceMount`      |    ✅     |    ✅     |        ✅         |     —      |      —       |    —    |
| `as`/`asChild`    |    ✅     |    ✅     |        ✅         |     —      |      —       |    —    |
| 触发器复用 Button |    ✅     |     —     |         —         |     —      |      —       |    —    |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [collapsible.md（en）](../../apps/docs/src/docs/en/components/collapsible.md) 与 [collapsible.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/collapsible.md) 仅有 Overview/Usage/Demos/API 四节，缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节，collapsible 为遗漏项。

**修复：** en/zh 文档同时重构为 9 节结构，新增：

- `Features`：7 条能力（headless 分离/受控·非受控/带动画面板/`unmountOnHide`/`forceMount`/无障碍接线/多态）。
- `Component family`：`SCollapsible`/`CollapsibleRoot`/`CollapsibleTrigger`/`CollapsibleContent` 职责说明。
- `Notes`：架构对标表（7 能力 × 6 库）+ 5 条 Cautions（客户端动画/`unmountOnHide` 语义/`forceMount`/触发器接线/`data-state` 驱动）+ `Roadmap` 说明。
- `FAQ`：5 组问答（触发器/受控/保持挂载/自定义过渡/键盘无障碍）。

### 3.2 Enhancement — D2-11 playground 覆盖率偏低

**现象：** [playground/examples/collapsible/](../../apps/playground/src/examples/collapsible/) 仅有 `01-basic`，未覆盖 `unmountOnHide`/`forceMount`/受控等主要能力。

**处理：** 非阻塞，记录于报告「遗留增强项」排期补充示例；文档已完整说明各能力用法。

### 3.3 核查结论（非缺陷）

- **D1-08 状态反映**：`CollapsibleTrigger` 暴露 `aria-expanded`（布尔）+ `aria-controls`（`contentId` 经 `useId`），root/content 反映 `data-state`/`data-disabled`，非仅 class。
- **D1-16 键盘**：触发器为 `Button` 原生 `<button>`，空格/回车可触发；点击后焦点留在触发器。
- **D7-09 SSR**：`usePresence`/`getBoundingClientRect` 均在客户端路径；`isClient` 守卫。
- **D7-04 泄漏**：`usePresence` 在 unmount 清理监听；`requestAnimationFrame` 单次挂载标记，无残留。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/collapsible.spec.ts`：**6 项全部通过**（渲染/`ui` class/展开渲染/插槽 `open` prop/默认无事件/无障碍 0 违规）。
- `pnpm exec eslint packages/headless/src/components/collapsible/ packages/ui/src/components/collapsible/ packages/ui/src/styles/collapsible.ts`：**0 errors**。
- 本次仅文档改动（无公共 API 变更），无需重跑 `pnpm sui api`。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；collapsible 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项                     | 对标依据 | 说明                                                                                      |
| :------------------------- | :------- | :---------------------------------------------------------------------------------------- |
| playground 补充示例        | D6-05    | 补充 `02-controlled`/`03-unmount`/`04-force-mount` 示例，非当前阻塞                       |
| `disabledCollapsible` 文档 | D3-11    | 该差异化 prop 已在 API 生成，建议后续在 playground 增加「仅禁折叠不灰按钮」示例，排期评估 |
