# C18 `affix` 检查优化报告

> **组件编号：** C18
> **组件名称：** `affix` / `SAffix`
> **模式：** 多槽 + Compact（`scv()` 配方 `affixVariants`，3 slots：root / placeholder / content；headless `AffixCompact` 聚合 Root + Placeholder + Content）
> **优先级：** P3
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D7-04

---

## 一、执行摘要

对 `SAffix` 完成全维度审计。组件架构清晰：headless 层拥有 5 个 SFC（`AffixRoot` / `AffixPlaceholder` / `AffixContent` / `AffixCompact` + `context.ts` + `shared.ts` 纯函数），`AffixRoot` 通过 `useRafFn({ immediate: false, once: true })` 帧合并节流测量，`useResizeObserver` 观察 root/content，scroll/touch 监听器经 `onWatcherCleanup` 动态绑定到解析后的目标，`isZeroRect` 零尺寸保护，`defineExpose` 暴露命令式 API。styled 层使用 `scv()` 3 槽配方（content 槽 `data-[state=fixed]:z-50`）。

审计未发现逻辑 bug；主要问题为文档缺失（D6）与测试覆盖不足（D7）。测试从 9 项扩展到 15 项。

|    维度     | 状态 | 说明                                                                                                                                                                                                 |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 多槽 + Compact；`scv()` `// @unocss-include`；`useOmitProps` 含 `class`；`data-soybean-affix-*` 全覆盖；占位 `role="presentation"` + `aria-hidden`；`data-state="fixed\|static"`                     |
| D2 行业对标 |  ✅  | offsetTop/offsetBottom 双方向固定 + 自定义 target（元素/选择器/window）+ 占位保留 + change 状态事件 + rAF 节流 + 触摸事件 + 动态目标切换 + 零尺寸保护，与 Ant Design / Element Plus 对标             |
| D3 API 设计 |  ✅  | `offsetTop`/`offsetBottom`/`target?: AffixTarget\|null` + `placeholderProps`/`contentProps` 透传 + `change` 事件 + `defineExpose`（`affixed`/`updatePosition`）；`internalOffsetTop` 默认 0 逻辑清晰 |
| D4 类型系统 |  ✅  | strict 通过；`AffixTarget = string \| Window \| HTMLElement`；`AffixRootContext` 全 `ShallowRef`/`ComputedRef` 类型；`AffixUiSlot` 3 槽；JSDoc 齐全                                                  |
| D5 代码规范 |  ✅  | `useOmitProps` + `useForwardElement` + `useForwardListeners`；`shallowRef` + `computed`；`onWatcherCleanup` 监听清理；`onBeforeUnmount` 取消 rAF；`isZeroRect` 防御                                  |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（11 条）+ Notes（架构对标表 11 维度 + 运行时注意事项 6 条）+ FAQ（7 条），保留 Headless 组合章节                                                                           |
|   D7 其他   |  ✅  | 15 项单元测试通过；性能（`useRafFn` 帧合并 + `shallowRef` + 无 deep watch）；SSR 安全（`getDefaultTarget`/`queryTargetSelector`/`measurePosition` 三重守卫，setup 无 DOM 访问）                      |

---

## 二、行业对标矩阵

| 能力                  |         SoybeanUI         | Ant Design `Affix` | Element Plus `Affix` |
| :-------------------- | :-----------------------: | :----------------: | :------------------: |
| headless/styled 分离  |            ✅             |         —          |          —           |
| 固定顶部 / 底部       |            ✅             |         ✅         |          ✅          |
| 自定义 target         | ✅ 元素 / 选择器 / window |  ✅ `target` 函数  |   ✅ `target` 函数   |
| 占位保留              |            ✅             |         ✅         |          ✅          |
| `change` 状态切换事件 |            ✅             |         ✅         |          ✅          |
| rAF 节流测量          |            ✅             |         ✅         |          ✅          |
| 触摸事件              |            ✅             |         ✅         |          —           |
| 动态目标切换          |            ✅             |         ✅         |          ✅          |
| 零尺寸保护            |            ✅             |         —          |          —           |
| 命令式 API            |            ✅             |         ✅         |          —           |
| SSR 安全              |            ✅             |        部分        |         部分         |

---

## 三、发现的问题与处理

### 3.1 Major — 文档缺少 Features / Notes / FAQ（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**问题：** 中英文文档仅有 Overview / Usage / Demos / API / Headless Composition，缺少 Features、Notes（架构对标 + 运行时注意事项）、FAQ。

**修复：** 在中英文文档中新增：

- **Features**：11 条（固定顶部或底部 / 自定义滚动目标 / 占位保留 / 响应式状态 / 零尺寸保护 / 宽度与 left 保留 / rAF 节流 / 动态目标切换 / 命令式 API / SSR 安全 / Headless 组合）
- **Notes → 架构与对标**：11 维度对比表（含 Ant Design Affix、Element Plus Affix）
- **Notes → 运行时注意事项**：6 条（偏移计算 / 零尺寸保护 / rAF 合并 / 监听器生命周期 / internalOffsetTop / 目标缺失）
- **FAQ**：7 条（固定时机 / 自定义容器 / 宽度保留 / change 频率 / 占位播报 / 编程定位 / SSR）

### 3.2 Minor — 测试覆盖不足（已修复，D7）

**问题：** 9 项测试未覆盖 `change` 事件去重（状态不切换不触发）、占位条件渲染（静态时无占位）、默认 offsetTop=0（无 offset 固定到目标顶部）、resize 后 width 更新、卸载后监听器清理。

**修复：** 新增 6 项测试套件（15 项总计）：

- `change event`：状态切换去重 + 解除固定时 emit `false`
- `placeholder`：仅 affixed 时渲染（静态时不渲染，fixed 时 `aria-hidden` + width 保留）
- `default offset`：无 offset 时固定到目标顶部 `top: 50px`
- `resize`：window resize 后固定宽度更新（120px → 200px）
- `unmount safety`：卸载后目标 dispatch scroll 不抛错

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------------- | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-09** 状态事件 |  ✅  | `measurePosition` 中 `if (affixed.value !== nextAffixed) emit('change', nextAffixed)`（仅状态切换触发，重复测量不触发）；`resetPosition` 仅在已固定时 `emit('change', false)`（初始 static 无噪音）；`data-state` computed 输出 `fixed\|static`；占位 `v-if="affixed"` 条件渲染（[affix-placeholder.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/affix/affix-placeholder.vue#L18)） |
| **D7-04** SSR 安全 |  ✅  | `getDefaultTarget()` 检查 `typeof window === 'undefined'`；`queryTargetSelector()` 检查 `typeof document === 'undefined'` 且 try/catch 包裹；`measurePosition` 开头 `typeof window === 'undefined'` 守卫；setup 中 `resolveAffixTarget` 内部全部守卫；`useEventListener` 在 target 为 null 时自动忽略（SSR 下 `getDefaultTarget` 返回 null）                                                                                         |
| **D7-02** 性能     |  ✅  | `useRafFn({ immediate: false, once: true })` 滚动/touch/resize 帧合并（每帧最多一次 `measurePosition`）；全 `shallowRef`；`computed` 缓存派生值；无 deep watch；`onWatcherCleanup` 目标切换时清理旧监听；`onBeforeUnmount` 调用 `cancelUpdatePosition`                                                                                                                                                                               |

---

## 五、架构亮点

### 测量流程（`affix-root.vue`）

1. `resolvedTarget` 通过 `resolveAffixTarget` 解析（元素 / 选择器 / window，SSR 安全）。
2. `measurePosition` 读取占位元素 rect → `isZeroRect` 零尺寸保护 → `getFixedTop` / `getFixedBottom` 计算固定偏移 → 组装 `affixStyle`（`position: fixed` + `left` + `width` ± `top`/`bottom`）与 `placeholderStyle`（`height` + `width`）。
3. `useRafFn` 帧合并所有触发源（scroll / touch / resize / load / pageshow / ResizeObserver）。
4. `data-state` 与 `change` 事件仅在状态切换时更新。

### 固定数学（`shared.ts`）

- `getFixedTop(placeholderRect, targetRect, offsetTop)`：`targetRect.top > placeholderRect.top - offsetTop` 时返回 `offsetTop + targetRect.top`。
- `getFixedBottom(placeholderRect, targetRect, offsetBottom)`：`targetRect.bottom < placeholderRect.bottom + offsetBottom` 时返回 `offsetBottom + (window.innerHeight - targetRect.bottom)`。
- `isZeroRect`：rect 全零时跳过定位，避免错误固定。

### 监听器生命周期

- `watch(resolvedTarget)` + `onWatcherCleanup`：目标变化时解绑旧监听、绑定新监听（scroll / touchstart / touchmove / touchend）。
- `useEventListener(getDefaultTarget, ...)`：window 级 `load` / `pageshow` / `resize` 常驻监听。
- `useResizeObserver(rootElement / contentElement)`：占位与内容尺寸变化时重新测量。

---

## 六、变更文件清单

| 文件                                              | 变更类型                                                                                                                        |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| `packages/ui/test/specs/components/affix.spec.ts` | 从 9 项扩展到 15 项（change 事件去重 / 解除固定 emit false / 占位条件渲染 / 默认 offsetTop=0 / resize 宽度更新 / 卸载监听清理） |
| `apps/docs/src/docs/en/components/affix.md`       | 新增 Features（11 条）+ Notes（架构对标表 11 维度 + 运行时注意事项 6 条）+ FAQ（7 条），保留 Headless Composition               |
| `apps/docs/src/docs/zh-CN/components/affix.md`    | 新增功能（11 条）+ 注意事项（架构对标表 11 维度 + 运行时注意事项 6 条）+ 常见问题（7 条），保留 Headless 组合                   |
| `docs/check.md`                                   | 标记 C18 各维度为 ✅                                                                                                            |

---

## 七、验证命令

```bash
# 单元测试（15 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/affix.spec.ts
# → Test Files 1 passed (1) | Tests 15 passed (15)

# 类型检查（全工作区通过）
pnpm typecheck
# → 全部 Done

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C18，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
