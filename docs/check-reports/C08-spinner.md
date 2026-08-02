# C08 `spinner` 检查优化报告

> **组件编号：** C08
> **组件名称：** `spinner` / `SSpinner`
> **模式：** 单类（`cv()` 配方，无 UiContext，UI-only 无 headless 层）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D3-01

---

## 一、执行摘要

对 `SSpinner` 完成全维度审计。组件为 UI-only 预设（封装 `SIcon`，无 headless 层），实现简洁正确。发现 1 项 Major 文档缺口（仅有 4 章节，缺少 Features / Notes / FAQ）、1 项 Minor 测试缺口（缺少 color/size 变体覆盖和 `aria-label` 转发验证）。测试从 5 项扩展到 13 项，补充完整文档章节。无代码层面缺陷。整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                   |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | UI-only 单类模式；`cv()` 配方 `// @unocss-include`；`useOmitProps` 含 `class`；封装 `SIcon` 转发 props |
| D2 行业对标 |  ✅  | Iconify 可替换图标 + 8 色语义 token + 6 档尺寸 + IconProps 透传，功能优于 shadcn/ui / Mantine Loader   |
| D3 API 设计 |  ✅  | `icon`/`color`/`size`/`class` 命名规范；`SpinnerIcon` 模板字面量类型约束 `svg-spinners:*`              |
| D4 类型系统 |  ✅  | strict 通过；`SpinnerProps extends Omit<IconProps, 'icon' \| 'color'>`；JSDoc 完整                     |
| D5 代码规范 |  ✅  | script setup 顺序正确；模板无 `props.xxx`；`useOmitProps` + `v-bind` 转发                              |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（6 条）+ Notes（架构对标表 + 运行时注意事项）+ FAQ（4 条）；概述扩充         |
|   D7 其他   |  ✅  | 13 项单元测试通过（color/size 变体 + aria-label 转发 + a11y）；axe-core 零违规                         |

---

## 二、行业对标矩阵

| 能力                     |         SoybeanUI          | shadcn/ui `Spinner` | MUI `CircularProgress` | Mantine `Loader` | Ant Design `Spin` |
| :----------------------- | :------------------------: | :-----------------: | :--------------------: | :--------------: | :---------------: |
| 架构                     | UI-only 预设，封装 `SIcon` |     styled SVG      |       styled SVG       |    styled SVG    |  组件 + 提示文字  |
| 图标可替换               |             ✅             |          —          |           —            |        —         | `indicator` slot  |
| 颜色变体（8 语义 token） |             ✅             |          —          |        `color`         |     `color`      |         —         |
| 尺寸缩放（xs–2xl）       |             ✅             |        sm–lg        |      `size` prop       |      xs–xl       |   small/default   |
| IconProps 透传           |             ✅             |          —          |           —            |        —         |         —         |
| 暗色模式（语义 token）   |             ✅             |         ✅          |           ✅           |        ✅        |        ✅         |

**增强项（➕）：**

- **图标可替换**：`icon` prop 接受任意 `svg-spinners:*` 图标，用户可从 50+ 种动画中选择。shadcn/ui / MUI / Mantine 均使用固定内联 SVG，不可替换。
- **IconProps 透传**：`SpinnerProps extends Omit<IconProps, 'icon' | 'color'>`，`width`/`height`/`ssr`/`aria-label` 等 SIcon props 自然透传，无需额外 API。
- **8 色语义 token**：`current`/`primary`/`destructive`/`success`/`warning`/`info`/`carbon`/`secondary`/`accent`，使用语义化颜色 token 自动适配暗色模式。

---

## 三、发现的问题与处理

### 3.1 Major — 文档缺少 Features / Notes / FAQ 章节（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**问题：** 中英文文档仅有 Overview（2 句话）、Usage、Demos、API，缺少 Features、Notes、FAQ 章节。未说明颜色/尺寸变体、图标替换、无障碍注意事项、为何无 headless 层。

**修复：** 在中英文文档中新增：

- **Features**：6 条 emoji bullet，覆盖 Iconify svg-spinners / 主题色 / 尺寸缩放 / IconProps 透传 / 按需无障碍 / 暗色模式
- **Notes → 架构与对标差异**：6 维度对比表（架构 / 图标来源 / 颜色变体 / 尺寸缩放 / 自定义图标 / 无障碍）
- **Notes → 运行时注意事项**：3 条（无障碍 aria-hidden 默认行为、图标可替换性类型约束、color 与 class 覆盖关系）
- **FAQ**：4 条问答（屏幕阅读器可见、替换动画、自定义尺寸、无 headless 层原因）
- **Overview** 扩充使用场景说明

### 3.2 Minor — 测试覆盖不足（已修复，D7-11）

**问题：** 原测试 5 项，缺少 color 变体（仅验证 `success`）、size 变体（仅验证 `lg`）、`aria-label` 转发验证。

**修复：** 测试从 5 项扩展到 13 项，新增覆盖：

| 套件           | 覆盖场景                                                              |
| :------------- | :-------------------------------------------------------------------- |
| color variants | `current`（默认）/ `primary` / `destructive` / `success` 颜色类名验证 |
| size variants  | `md`（默认）/ `xs` / `2xl` 尺寸类名验证                               |
| accessibility  | `aria-label` 转发到 SIcon 的 `ariaLabel` prop 验证                    |

---

## 四、重点检查项结论

| 检查项                 | 结论 | 证据                                                                                                             |
| :--------------------- | :--: | :--------------------------------------------------------------------------------------------------------------- |
| **D1-09** 样式配方完整 |  ✅  | `spinner.ts` 首行 `// @unocss-include`；单类 `cv()` 配方；variants 覆盖 color（8 色）/ size（xs–2xl）            |
| **D3-01** 命名一致性   |  ✅  | `icon`/`color`/`size`/`class` 命名规范；`SpinnerIcon` 模板字面量类型 `` `svg-spinners:${string}` `` 约束合法图标 |

---

## 五、变更文件清单

| 文件                                                | 变更类型                                                                                      |
| :-------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| `packages/ui/test/specs/components/spinner.spec.ts` | 重写：5 项 → 13 项（color 变体、size 变体、aria-label 转发）                                  |
| `apps/docs/src/docs/en/components/spinner.md`       | 文档：新增 Features（6 条）+ Notes（架构对标表 + 运行时注意事项）+ FAQ（4 条）+ Overview 扩充 |
| `apps/docs/src/docs/zh-CN/components/spinner.md`    | 文档：新增功能（6 条）+ 注意事项（架构对标表 + 运行时注意事项）+ 常见问题（4 条）+ 概述扩充   |
| `docs/check.md`                                     | 标记 C08 各维度为 ✅                                                                          |

---

## 六、验证命令

```bash
# 单元测试（13 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/spinner.spec.ts
# → Test Files 1 passed (1) | Tests 13 passed (13)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

## 七、后续建议

1. **P3 增强：** 考虑为独立加载场景提供 `SSpinner` 的 `role="status"` + `aria-live="polite"` 包装组件（如 `SLoadingIndicator`），以支持屏幕阅读器自动播报加载开始/结束。当前 `SSpinner` 定位为内联图标预设，`aria-label` 需用户手动传入。

---

_报告生成于组件审计工作流 C08，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
