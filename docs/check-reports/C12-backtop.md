# C12 `backtop` 检查优化报告

> **组件编号：** C12
> **组件名称：** `backtop` / `SBacktop`
> **模式：** 单类（`cv()` 配方 `backtopVariants` extends `buttonVariants`，无 UiContext）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-02、D7-04

---

## 一、执行摘要

对 `SBacktop` 完成全维度审计。组件实现质量高：headless 层负责滚动追踪、目标解析、RAF 动画、`prefers-reduced-motion` 支持和焦点管理；styled 层扩展 `buttonVariants` 加固定定位。测试覆盖全面（mock 滚动目标 + 可见性状态 + 点击滚动 + 禁用 + a11y）。发现 1 项 Major 文档缺口（缺少 Features / Notes / FAQ）、1 项 Minor 测试缺口（缺少 CSS 选择器目标解析）。测试从 7 项扩展到 9 项，补充完整文档章节。无代码层面缺陷。整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                                              |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 单类模式；`cv()` 配方 `// @unocss-include`；`useOmitProps` 含 `class`；`data-soybean-backtop` + `data-state`                      |
| D2 行业对标 |  ✅  | headless/styled 分离 + `prefers-reduced-motion` + `duration` 可配 + headless 导出 + disabled 继承，优于 Ant Design / Element Plus |
| D3 API 设计 |  ✅  | `visibilityHeight`/`target`/`duration` 命名规范；`BacktopProps extends Omit<ButtonProps, 'onChange'>`                             |
| D4 类型系统 |  ✅  | strict 通过；`BacktopTarget = AffixTarget`；`BacktopState = 'visible' \| 'hidden'`；JSDoc 完整                                    |
| D5 代码规范 |  ✅  | `useOmitProps` + `useForwardListeners` + `useForwardElement`；SSR 守护完备；`onWatcherCleanup` 清理                               |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（8 条）+ Notes（架构对标表 + 运行时注意事项 4 条）+ FAQ（5 条）                                         |
|   D7 其他   |  ✅  | 9 项单元测试通过（可见性 / 滚动 / 禁用 / 选择器目标 / a11y）；SSR 安全；axe-core 零违规                                           |

---

## 二、行业对标矩阵

| 能力                                    | SoybeanUI | Ant Design `BackTop` | Element Plus `Backtop` | Naive UI `BackTop` |
| :-------------------------------------- | :-------: | :------------------: | :--------------------: | :----------------: |
| headless/styled 分离                    |    ✅     |          —           |           —            |         —          |
| `prefers-reduced-motion`                |    ✅     |          —           |           —            |         —          |
| `duration` 可配                         |    ✅     |          —           |           —            |         —          |
| 目标类型（window/element/Ref/selector） |    ✅     |   element/function   |     element/string     |   element/string   |
| Headless 导出                           |    ✅     |          —           |           —            |         —          |
| 禁用状态（继承 Button）                 |    ✅     |          —           |           —            |         —          |
| 焦点管理（隐藏前 blur）                 |    ✅     |          —           |           —            |         —          |
| SSR 安全                                |    ✅     |          —           |           —            |         —          |

---

## 三、发现的问题与处理

### 3.1 Major — 文档缺少 Features / Notes / FAQ 章节（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**问题：** 中英文文档仅有 Overview（1 句话 + headless 注意）、Usage、Demos、API，缺少 Features、Notes、FAQ。未说明滚动目标配置、动画时长、`prefers-reduced-motion` 支持、headless 组合模式、`hidden` 属性行为、焦点管理。

**修复：** 在中英文文档中新增：

- **Features**：8 条（可见性阈值 / 平滑动画 / 减弱动画 / 灵活目标 / Headless 组合 / 完整 Button props / 事件 / SSR 安全）
- **Notes → 架构与对标差异**：8 维度对比表
- **Notes → 运行时注意事项**：4 条（`hidden` 属性 / 焦点管理 / 滚动监听清理 / `target` 响应性）
- **FAQ**：5 条（指定容器目标 / 禁用动画 / 自定义按钮 / 点击后消失 / 更换图标）

### 3.2 Minor — 测试缺少 CSS 选择器目标解析覆盖（已修复，D7-11）

**问题：** 原测试 7 项，覆盖 HTMLElement 目标，但缺少 CSS 选择器字符串目标解析验证。`resolveBacktopTarget` 支持字符串选择器，需测试覆盖。

**修复：** 新增 `target resolution` 套件，1 项测试验证 `target="#scroll-container"` CSS 选择器解析。测试从 7 项扩展到 9 项。

---

## 四、重点检查项结论

| 检查项               | 结论 | 证据                                                                                                                                                      |
| :------------------- | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-16** 可见性阈值 |  ✅  | `visibilityHeight: 400` 默认；`getScrollTop(target) >= props.visibilityHeight` 比较；测试验证阈值切换 + `change` 事件                                     |
| **D2-02** 行业对标   |  ✅  | headless/styled 分离 + `prefers-reduced-motion` + `duration` 可配 + headless 导出 + disabled 继承，功能优于 Ant Design / Element Plus / Naive UI          |
| **D7-04** 减弱动画   |  ✅  | `prefersReducedMotion()` 在 `scrollToTop` 中检查；若 `true` 则跳过 RAF 动画，`setScrollTop(target, 0)` 即时滚动；SSR 守护 `typeof window === 'undefined'` |

---

## 五、变更文件清单

| 文件                                                | 变更类型                                                                               |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `packages/ui/test/specs/components/backtop.spec.ts` | 新增：`target resolution` 套件（CSS 选择器目标解析），7 项 → 9 项                      |
| `apps/docs/src/docs/en/components/backtop.md`       | 文档：新增 Features（8 条）+ Notes（架构对标表 + 运行时注意事项 4 条）+ FAQ（5 条）    |
| `apps/docs/src/docs/zh-CN/components/backtop.md`    | 文档：新增功能（8 条）+ 注意事项（架构对标表 + 运行时注意事项 4 条）+ 常见问题（5 条） |
| `docs/check.md`                                     | 标记 C12 各维度为 ✅                                                                   |

---

## 六、验证命令

```bash
# 单元测试（9 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/backtop.spec.ts
# → Test Files 1 passed (1) | Tests 9 passed (9)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C12，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
