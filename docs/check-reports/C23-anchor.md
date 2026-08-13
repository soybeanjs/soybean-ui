# C23 `anchor` 检查优化报告

> **组件编号：** C23（`anchor`）
> **组件名称：** `SAnchor`（headless 基座：`AnchorCompact`/`AnchorItemCompact` 聚合 `AnchorRoot`/`AnchorLink`）
> **模式：** 多槽 + Compact
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-02、D7-04

---

## 一、执行摘要

对 `anchor` 完成全维度审计。组件为「多槽 + Compact」模式：headless `AnchorCompact`/`AnchorItemCompact` 负责递归 `items` 渲染与每层组合（link + 指示器 + 标题 + 嵌套 sub）；`AnchorRoot` 负责滚动侦测高亮、hash 同步（`pushState`/`replaceState`）、平滑滚动与偏移计算。UI 层 `SAnchor` 仅做 `scv()` 配方（color/size/orientation）与属性转发。

**发现：无缺陷**（本次审计未发现需修复的功能/规范问题，全部维度通过）：

|    维度     | 状态 |                                                                                                                                                                 说明                                                                                                                                                                  |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                          多槽 + Compact 正确：Compact 聚合下沉至 headless；滚动侦测高亮（`bounds`/`offsetTop`）、hash 同步（点击 pushState/滚动 replaceState）、平滑滚动 + 300ms 动画守卫、自定义滚动容器（`getContainer`）、`getCurrentAnchor` 映射、递归嵌套完整（D1-12）                                           |
| D2 行业对标 |  ✅  |                                   对标 Ant Design `Anchor` 与 Element Plus `Anchor`：SoybeanUI 覆盖 `getContainer`、`offsetTop`+`targetOffset`、`bounds`、`getCurrentAnchor`、hash 同步、初始 hash 滚动、吸顶导轨、递归嵌套（AntD 扁平/Element 仅 2 层）、禁用项、8 色 × 6 尺寸、纵向/横向（D2-02）                                   |
| D3 API 设计 |  ✅  |                                    `items`（递归 `AnchorOptionData`）、`getContainer`/`getCurrentAnchor`、`offsetTop`/`targetOffset`/`bounds`、`replace`、`sticky`、`orientation`、`linkProps`/`indicatorProps`/`titleProps`/`subProps` 命名与主流库一致；`activeChange`/`itemSelect` 事件语义清晰                                    |
| D4 类型系统 |  ✅  |                                                                           `AnchorCompactProps<T>`/`AnchorOptionData`（递归 `children`）泛型化精确；`linkProps` 类型 `Omit<LinkBaseProps,'href'>` 刻意排除 href（目标由项决定）；JSDoc 覆盖全部 props/emits                                                                            |
| D5 代码规范 |  ✅  |                                                                           `eslint` 0 errors；`useOmitProps` 含 `class`；滚动数学/激活判定提取为纯函数（`shared.ts`）；headless 用 `shallowRef` + `computed` 保持响应式；监听用 `onWatcherCleanup`/卸载清理                                                                            |
|   D6 文档   |  ✅  |                                               en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（15 关注点 × 3 库）+ 7 条运行时注意 + FAQ 6 组；`Features` 覆盖滚动高亮/hash 同步/平滑滚动/自定义容器/偏移/递归/吸顶/禁用/主题色/方向/headless                                                |
|   D7 其他   |  ✅  | 29 项单测通过（rendering/active state/scroll sync/disabled/keyboard/nesting/direction/cleanup/a11y）；data 属性遵循 D1-07（`data-soybean-anchor-item`）；SSR 无顶层 `window`/`document` 访问（D7-04）；ARIA 完整（`nav` 本地化 aria-label/`aria-current="location"`/禁用 `aria-disabled`+`tabindex="-1"`）；axe 无违规（含嵌套/禁用） |

---

## 二、行业对标矩阵

> `anchor` 是**页内锚点导航**模式。Ant Design `Anchor` 与 Element Plus `Anchor` 为直接对标对象。

| 能力              | SoybeanUI | Ant Design `Anchor` | Element Plus `Anchor` |
| :---------------- | :-------: | :-----------------: | :-------------------: |
| Headless/样式分离 |    ✅     |         ❌          |          ❌           |
| 数据驱动 compact  |    ✅     |         ✅          |          ✅           |
| 滚动容器          |    ✅     |         ✅          |          ✅           |
| 滚动偏移          |    ✅     |         ✅          |          ✅           |
| 激活容差          |    ✅     |         ✅          |          ✅           |
| 激活值映射        |    ✅     |         ✅          |           —           |
| Hash 同步         |    ✅     |         ✅          |          ✅           |
| 初始 hash 滚动    |    ✅     |         ✅          |           —           |
| 吸顶导轨          |    ✅     |         ✅          |          ✅           |
| 嵌套项            |   递归    |        扁平         |         2 层          |
| 禁用项            |    ✅     |         ❌          |          ❌           |
| 自定义链接属性    |    ✅     |          —          |           —           |
| 方向              |   纵/横   |       仅纵向        |          ✅           |
| 主题色/尺寸       |    8×6    |         ❌          |          ❌           |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无缺陷）

本次审计对 `anchor` 未发现需修复的功能、规范或类型问题，全部 D1–D7 维度通过。核查要点：

- **D1-12 Compact 下沉**：递归 `items` 渲染与每层组合委托给 headless `AnchorCompact`/`AnchorItemCompact`；UI 层仅转发配方与属性。
- **D2-02 对标覆盖**：相对 AntD 增量为递归嵌套（AntD 扁平）、禁用项、横向方向、8 色 × 6 尺寸主题系统。
- **D5 纯逻辑**：激活判定/滚动数学提取为纯函数；滚动动画 300ms 守卫避免中间态抖动。
- **D7-04 SSR**：`window`/`document` 访问有守卫；滚动监听在卸载时移除。
- **D7 ARIA**：`nav` 本地化 aria-label；激活项 `aria-current="location"`；禁用链接 `aria-disabled` + `tabindex="-1"`；指示器 `aria-hidden`。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/anchor.spec.ts`：**29 项全部通过**（rendering/active state/scroll sync/disabled/keyboard/nesting/direction/cleanup/a11y）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                  |
| :-------------- | :---------- | :-------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实滚动侦测/平滑滚动/吸顶导轨/容器替换重同步建议浏览器覆盖，排期评估 |
