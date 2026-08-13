# C22 `tabs` 检查优化报告

> **组件编号：** C22（`tabs`）
> **组件名称：** `STabs`（headless 基座：`TabsCompact<T>` 聚合 `TabsRoot`/`TabsList`/`TabsTrigger`/`TabsContent`/`TabsIndicator`）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `tabs` 完成全维度审计。组件为「多槽 + Compact」模式：headless 泛型 `TabsCompact<T>` 负责条目迭代、默认触发器/内容组合、指示器渲染与每项 ARIA 接线；`TabsRoot` 基于 `useControllableState` 管理 `modelValue`，基于 `RovingFocusGroup` 提供键盘导航，基于 `ResizeObserver` + CSS 变量驱动动画指示器。UI 层 `STabs` 仅做 `scv()` 配方（size/orientation/shape/fill）与插槽转发。

**发现：无缺陷**（本次审计未发现需修复的功能/规范问题，全部维度通过）：

|    维度     | 状态 |                                                                                                                                                                         说明                                                                                                                                                                         |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                            多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useControllableState`）、激活模式（automatic/manual）、roving focus 键盘导航（跳过禁用）、Presence 内容挂载（`unmountOnHide`/`forceMount`）、动画指示器（CSS 变量 + ResizeObserver + RTL 镜像）、水平/垂直完整（D1-08/D1-16）                             |
| D2 行业对标 |  ✅  |                        对标 shadcn-vue/Radix `Tabs`、Ant Design `Tabs`、Element Plus `Tabs`：SoybeanUI 覆盖激活模式（automatic/manual，AntD/Element 仅自动）、roving focus + Enter/Space、禁用标签跳过、Presence/forceMount、动画指示器（Radix 无内置）、水平 + 垂直、6 变体、自动 ARIA 接线（controls/labelledby）（D2-11）                         |
| D3 API 设计 |  ✅  |                                 `modelValue`/`defaultValue`、`activationMode`、`orientation`、`unmountOnHide`、`forceMount`、`enableIndicator`、`fill`/`shape`/`size` 命名与主流库一致；`update:modelValue` 事件语义清晰；`TabsCompactSlots`（trigger/content/indicator）scoped props（`{ ...item, active }`）类型化                                 |
| D4 类型系统 |  ✅  |                                                                                   `TabsCompactProps<T>`/`Slots<T>` 泛型化精确；`TabsRootContext` 用 `PropsToContext` 刻画；`TabsTriggerProps`/`ContentProps`/`IndicatorProps` 层级清晰；JSDoc 覆盖全部 props/emits                                                                                   |
| D5 代码规范 |  ✅  |                                                                    `eslint` 0 errors；`useOmitProps` 含 `class`；指示器测量/偏移数学提取为纯函数（`shared.ts`）；headless 用 `useControllableState` + `shallowRef`/`computed` 保持响应式；确定性 ARIA id（`soybean-tabs-{trigger                                                                     | content}-{value}`） |
|   D6 文档   |  ✅  |                                                en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（13 关注点 × 4 库）+ 7 条运行时注意 + FAQ 6 组；`Features` 覆盖 WAI-ARIA 模式/数据驱动/受控/激活模式/键盘/Presence/动画指示器/水平垂直/3 槽/6 变体/headless                                                 |
|   D7 其他   |  ✅  | 30 项单测通过（rendering/active state/activation mode/keyboard/disabled/content mounting/aria wiring/indicator/variants/a11y）；data 属性遵循 D1-07（`data-soybean-tabs-*`）；WAI-ARIA 完整（`role="tab"`/`tablist`/`tabpanel`/`aria-selected`/`aria-controls`/`aria-labelledby`/`aria-orientation`）；axe 无违规（含 unmountOnHide false）（D7-05） |

---

## 二、行业对标矩阵

> `tabs` 是**分层内容标签**模式（WAI-ARIA tabs 模式）。shadcn-vue/Radix、Ant Design、Element Plus 为对标对象。

| 能力                             | SoybeanUI | shadcn-vue/Radix | Ant Design | Element Plus |
| :------------------------------- | :-------: | :--------------: | :--------: | :----------: |
| Headless/样式分离                |    ✅     |        ✅        |     ❌     |      ❌      |
| 数据驱动 Compact API             |    ✅     |        ✅        |     ✅     |      ✅      |
| 受控/非受控                      |    ✅     |        ✅        |     ✅     |      ✅      |
| 激活模式                         |    ✅     |        ✅        |     ❌     |      ❌      |
| 键盘导航                         |    ✅     |        ✅        |     ✅     |      ✅      |
| 禁用标签跳过                     |    ✅     |        ✅        |     ✅     |      ✅      |
| Presence / forceMount            |    ✅     |        ✅        |     ❌     |      ❌      |
| 动画指示器                       |    ✅     |        ❌        |     ✅     |      ❌      |
| 水平 + 垂直                      |    ✅     |        ✅        |     ✅     |      ✅      |
| 变体系统                         |   6 维    |        ❌        |    部分    |     部分     |
| 自定义插槽                       |   3 个    |        ✅        |    部分    |     部分     |
| ARIA 接线（controls/labelledby） |    ✅     |        ✅        |     ✅     |      ✅      |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无缺陷）

本次审计对 `tabs` 未发现需修复的功能、规范或类型问题，全部 D1–D7 维度通过。核查要点：

- **D1-08 键盘/ARIA**：roving focus（方向键 + Home/End）跳过禁用标签；`Enter`/`Space` 激活；自动模式聚焦即激活。
- **D1-16 焦点/面板语义**：`aria-controls`/`aria-labelledby` 确定性 id 自动接线；`unmountOnHide` 通过 Presence 控制内容挂载。
- **D2-11 对标覆盖**：激活模式与 Presence/forceMount 为相对 AntD/Element 的增量能力。
- **D5 纯函数**：指示器偏移/尺寸数学（含 RTL 镜像）提取为纯函数；CSS 变量驱动避免 DOM 直接定位。
- **D7-05 ARIA/a11y**：完整 WAI-ARIA tabs 模式；axe 无违规（含 unmountOnHide false 场景）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/tabs.spec.ts`：**30 项全部通过**（rendering/active state/activation mode/keyboard/disabled/content mounting/aria wiring/indicator/variants/a11y）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                        |
| :-------------- | :---------- | :-------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实指示器动画/退出动画/Presence 时序/roving focus 建议浏览器覆盖，排期评估 |
