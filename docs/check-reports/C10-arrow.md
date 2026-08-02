# C10 `arrow` 检查优化报告

> **组件编号：** C10
> **组件名称：** `arrow` / `SArrow`
> **模式：** 单类（UI 层直接重新导出 headless，无 `cv()` 配方，无变体）
> **优先级：** P3
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D3-01

---

## 一、执行摘要

对 `SArrow` 完成全维度审计。组件为 headless 原语（UI 层直接重新导出，无样式变体），用于浮层箭头定位。发现 1 项 Minor a11y 缺陷（SVG 缺少 `aria-hidden="true"` 和 `focusable="false"` 默认值）、1 项 Major 文档缺口（缺少 Usage / Notes）、1 项 Minor 测试缺口（缺少 class/style 转发和默认 a11y 属性验证）。测试从 3 项扩展到 7 项，补充完整文档章节。整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                    |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | headless 原语；UI 层直接重新导出；`data-soybean-arrow`；`viewBox` + `preserveAspectRatio="none"` 可拉伸 |
| D2 行业对标 |  ✅  | 对标 Radix UI / Floating UI Arrow 原语；固定 SVG path + CSS transform 定位，与 shadcn/ui 一致           |
| D3 API 设计 |  ✅  | `ArrowProps extends BaseProps<SVGAttributes>`；class/style 透传                                         |
| D4 类型系统 |  ✅  | strict 通过；`SVGAttributes` 基础类型；JSDoc 完整                                                       |
| D5 代码规范 |  ✅  | script setup 简洁；props 通过 `inheritAttrs` 透传                                                       |
|   D6 文档   |  ✅  | 中英文统一；新增 Usage + Notes（架构 / 无障碍 / 样式 3 节）                                             |
|   D7 其他   |  ✅  | 7 项单元测试通过（渲染 / class 转发 / style 转发 / aria-hidden / focusable / a11y）；axe-core 零违规    |

---

## 二、发现的问题与处理

### 2.1 Minor — SVG 缺少 `aria-hidden="true"` 和 `focusable="false"` 默认值（已修复，D7-05）

**问题：** `arrow.vue` 的 `<svg>` 元素未设置 `aria-hidden="true"` 和 `focusable="false"`。箭头是纯装饰性元素（浮层定位指示器），不应被屏幕阅读器播报或被旧版浏览器纳入 tab 顺序。原 a11y 测试需手动传入 `aria-hidden="true"` 才通过。

**修复：** 在 headless `<svg>` 上硬编码 `aria-hidden="true"` 和 `focusable="false"`。箭头永远不承载语义信息，因此硬编码是正确做法。

```diff
-  <svg data-soybean-arrow viewBox="0 0 12 6" preserveAspectRatio="none">
+  <svg data-soybean-arrow viewBox="0 0 12 6" preserveAspectRatio="none" aria-hidden="true" focusable="false">
```

### 2.2 Major — 文档缺少 Usage / Notes 章节（已修复，D6-02 / D6-03 / D6-10）

**问题：** 中英文文档仅有 Overview（1 句话）、Demos、API，缺少 Usage、Notes 章节。未说明架构（headless 原语 + UI 重新导出）、无障碍默认行为、样式模式。

**修复：** 在中英文文档中新增：

- **Usage**：`<UsageCode component="arrow" />`
- **Notes → 架构**：说明 headless 原语 + UI 重新导出 + SVG viewBox/path + `preserveAspectRatio="none"` 拉伸
- **Notes → 无障碍**：说明 `aria-hidden="true"` + `focusable="false"` 硬编码原因
- **Notes → 样式**：3 种常见 class 模式（fill-popover stroke-border / fill-popover-foreground / w-8 h-4）+ CSS transform 定位

### 2.3 Minor — 测试覆盖不足（已修复，D7-11）

**问题：** 原测试 3 项，缺少 class/style 转发验证、默认 a11y 属性验证。a11y 测试需手动传入 `aria-hidden` 而非验证默认值。

**修复：** 测试从 3 项扩展到 7 项，新增覆盖：

| 套件          | 覆盖场景                                                                                 |
| :------------ | :--------------------------------------------------------------------------------------- |
| rendering     | `preserveAspectRatio` 属性；`class` 转发（w-8/h-4/fill-popover）；`style` 转发           |
| accessibility | 默认 `aria-hidden="true"`；默认 `focusable="false"`；a11y 测试无需手动传入 `aria-hidden` |

---

## 三、重点检查项结论

| 检查项               | 结论 | 证据                                                                                                        |
| :------------------- | :--: | :---------------------------------------------------------------------------------------------------------- |
| **D1-09** 样式配方   | N/A  | 无 `cv()` 配方——UI 层直接重新导出 headless `Arrow`。箭头为 headless 原语，样式通过 `class` 透传由父组件控制 |
| **D3-01** 命名一致性 |  ✅  | `ArrowProps extends BaseProps<SVGAttributes>` 命名规范；`data-soybean-arrow` 属性命名一致                   |

---

## 四、变更文件清单

| 文件                                               | 变更类型                                                                 |
| :------------------------------------------------- | :----------------------------------------------------------------------- |
| `packages/headless/src/components/arrow/arrow.vue` | 修复：`<svg>` 添加 `aria-hidden="true"` + `focusable="false"`（D7-05）   |
| `packages/ui/test/specs/components/arrow.spec.ts`  | 重写：3 项 → 7 项（class 转发、style 转发、默认 aria-hidden、focusable） |
| `apps/docs/src/docs/en/components/arrow.md`        | 文档：新增 Usage + Notes（架构 / 无障碍 / 样式 3 节）                    |
| `apps/docs/src/docs/zh-CN/components/arrow.md`     | 文档：新增用法 + 注意事项（架构 / 无障碍 / 样式 3 节）                   |
| `docs/check.md`                                    | 标记 C10 各维度为 ✅                                                     |

---

## 五、验证命令

```bash
# 单元测试（7 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/arrow.spec.ts
# → Test Files 1 passed (1) | Tests 7 passed (7)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C10，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
