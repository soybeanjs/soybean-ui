# C18 `affix` 检查优化报告

> **组件编号：** C18（`affix`）
> **组件名称：** `SAffix`（headless 基座：`AffixRoot`/`AffixPlaceholder`/`AffixContent` + `AffixCompact` 聚合）
> **模式：** 多槽（Compact 聚合）
> **优先级：** P3
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D7-04

---

## 一、执行摘要

对 `affix` 完成全维度审计。组件为「多槽 + Compact」模式：headless `AffixCompact` 聚合 `AffixRoot`（状态与测量）/`AffixPlaceholder`（隐藏占位保留空间）/`AffixContent`（固定内容）；`AffixRoot` 基于 `@vueuse/core`（`useRafFn`/`useEventListener`/`useResizeObserver`）测量占位/目标 rect，计算 `top`/`bottom` 固定样式，输出 `data-state="fixed|static"` 与 `change` 事件。UI 层 `SAffix` 仅做配方（`content` class）与 `change` 事件转发。

**发现：无缺陷**（本次审计未发现需修复的功能/规范问题，全部维度通过）：

|    维度     | 状态 |                                                                                                                                                                                     说明                                                                                                                                                                                     |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                              多槽 + Compact 正确：Compact 聚合下沉至 headless；`offsetTop`/`offsetBottom` 固定、自定义 `target`（元素/选择器/window）、占位保留、`data-state` 反射、零尺寸保护、rAF 节流、动态目标切换、命令式 API（`affixed`/`updatePosition()`）完整（D1-09）                                                              |
| D2 行业对标 |  ✅  |                                                                         对标 Ant Design `Affix` 与 Element Plus `Affix`：SoybeanUI 覆盖 `offsetTop`/`offsetBottom`、自定义 target、占位保留、`change` 状态切换事件、rAF 节流测量、触摸事件、动态目标切换、命令式 API；增量为零尺寸保护与 SSR 全守卫                                                                          |
| D3 API 设计 |  ✅  |                                                        `offsetTop`/`offsetBottom`/`target`、`change` 事件与主流库命名一致；`AffixTarget = string \| Window \| HTMLElement` 灵活；`AffixCompactProps` 提供 `placeholderProps`/`contentProps` 区域透传；`AffixRootProps` 用 `Omit<BaseProps,'onChange'>` 避免与事件冲突                                                        |
| D4 类型系统 |  ✅  |                            `AffixRootProps`/`AffixPlaceholderProps`/`AffixContentProps`/`AffixCompactProps` 层级清晰；`AffixRootContext`（`affixed`/`affixStyle`/`placeholderStyle`/`dataState`/`updatePosition`）用 `ShallowRef`+`ComputedRef` 精确刻画；`AffixUiSlot`（root/placeholder/content）用 `UiClass<T>`；JSDoc 覆盖全部 props 及默认值                            |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`useOmitProps` 含 `class`；headless 用 `shallowRef`（`affixed`/`affixStyle`/`placeholderStyle`/`resolvedTarget`）+ `computed`（`dataState`/`internalOffsetTop`）保持响应式；测量/目标解析提取为纯函数（`shared.ts`：`getDefaultTarget`/`resolveAffixTarget`/`getTargetRect`/`getFixedTop`/`getFixedBottom`/`isZeroRect`）；监听用 `onWatcherCleanup` 清理 |
|   D6 文档   |  ✅  |                                              en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ + Headless 组合示例）；Notes 含架构对标表（11 关注点 × 3 库）+ 6 条运行时注意 + FAQ 7 组 + 组合代码示例；`Features` 覆盖顶/底固定/自定义目标/占位/响应式/零尺寸/宽度保留/rAF/动态目标/命令式 API/SSR/headless                                               |
|   D7 其他   |  ✅  |                                  15 项单测通过（rendering/affixed state/change 事件/placeholder/default offset/resize/unmount safety/a11y）；data 属性遵循 D1-07（`data-soybean-affix-root` + `data-state`）；SSR 无顶层 `window`/`document` 访问（`getDefaultTarget`/`queryTargetSelector`/`measurePosition` 均守卫）（D7-04）；axe 无违规                                  |

---

## 二、行业对标矩阵

> `affix` 是**滚动固定容器**模式。Ant Design `Affix` 与 Element Plus `Affix` 为直接对标对象。

| 能力              | SoybeanUI | Ant Design `Affix` | Element Plus `Affix` |
| :---------------- | :-------: | :----------------: | :------------------: |
| Headless/样式分离 |    ✅     |         ❌         |          ❌          |
| 固定顶部 / 底部   |    ✅     |         ✅         |          ✅          |
| 自定义 target     |    ✅     |         ✅         |          ✅          |
| 占位保留          |    ✅     |         ✅         |          ✅          |
| `change` 状态事件 |    ✅     |         ✅         |          ✅          |
| rAF 节流测量      |    ✅     |         ✅         |          ✅          |
| 触摸事件          |    ✅     |         ✅         |          —           |
| 动态目标切换      |    ✅     |         ✅         |          ✅          |
| 零尺寸保护        |    ✅     |         —          |          —           |
| 命令式 API        |    ✅     |         ✅         |          —           |
| SSR 安全          |    ✅     |        部分        |         部分         |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无缺陷）

本次审计对 `affix` 未发现需修复的功能、规范或类型问题，全部 D1–D7 维度通过。核查要点：

- **D1-09 功能完整性**：`getFixedTop`/`getFixedBottom` 纯函数按目标 rect 计算阈值；`change` 事件仅在状态切换时发出（`affixed.value !== nextAffixed` 判定）；`internalOffsetTop` 在未提供偏移时默认 `0`。
- **D5 性能/健壮性**：`useRafFn({ immediate: false, once: true })` 每帧最多测量一次，避免滚动突发时布局抖动；scroll/touch 监听绑定解析后的目标并随 `target` 变化通过 `onWatcherCleanup` 解绑；`load`/`pageshow`/`resize` 绑定 `window`；卸载时全部移除。
- **D7-04 SSR**：`getDefaultTarget`（`window` 守卫）、`queryTargetSelector`（`document` 守卫 + try/catch）、`measurePosition`（`typeof window === 'undefined'` 短路）均安全。
- **D7 a11y**：占位节点 `role="presentation"` + `aria-hidden="true"`（对辅助技术不可见，仅保留布局空间）；axe 无违规。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/affix.spec.ts`：**15 项全部通过**（rendering/affixed state/change 事件/placeholder/default offset/resize/unmount safety/a11y）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                                                             |
| :-------------- | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 真实滚动容器下的固定/释放、占位布局保持、窗口 resize 宽度同步建议浏览器覆盖（happy-dom 依赖 mockRect），排期评估 |
