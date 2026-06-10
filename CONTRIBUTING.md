<p align="center">
  <samp>
    <a href="#contributing">English</a> ·
    <a href="#参与贡献">中文</a>
  </samp>
</p>

---

# Contributing

Thanks for your interest in contributing to SoybeanUI! This guide covers how to set up the project,
follow our conventions, and submit a pull request.

## Table of Contents

- [Project Overview](#project-overview)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [AI Skills & Agents](#ai-skills--agents)
- [Coding Conventions](#coding-conventions)
- [Component Development](#component-development)
- [Testing](#testing)
- [Documentation](#documentation)
- [Commit & Pull Request](#commit--pull-request)

## Project Overview

SoybeanUI is a Vue 3 component library built on a **headless / styled separation**:

| Package               | Path                 | Responsibility                                             |
| --------------------- | -------------------- | ---------------------------------------------------------- |
| `@soybeanjs/headless` | `packages/headless/` | Logic, state, accessibility, composables. **Zero styles.** |
| `@soybeanjs/ui`       | `packages/ui/`       | Styled wrappers (UnoCSS). Variants, theme, UI injection.   |
| Playground            | `apps/playground/`   | Interactive demos (Vite).                                  |
| Docs                  | `apps/docs/`         | Bilingual docs (en / zh-CN). Vite + vite-ssg.              |

Data flows one way: `headless` → `ui` (never reverse). The UI layer injects styles via
`provideXUi(ui)`; headless reads them through `useUiContext`.

**Tech stack:** Vue 3 + TypeScript (strict) + UnoCSS + Vitest + pnpm workspaces.

## Development Setup

### Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 9 (this repo uses `pnpm@11.5.2`)

### Install

```bash
git clone https://github.com/soybeanjs/soybean-ui.git
cd soybean-ui
pnpm install
```

### Local Development

```bash
# Stub packages for instant source-to-dist linking
pnpm stub

# Start the playground (hot-reload for component dev)
pnpm dev
```

Open the playground URL shown in the terminal to preview your changes in real time.

### Common Commands

| Command              | Purpose                              |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | Start playground dev server          |
| `pnpm build`         | Build headless → ui → CSS            |
| `pnpm lint`          | oxlint + eslint (Vue)                |
| `pnpm fmt`           | oxfmt (formatter)                    |
| `pnpm test`          | Vitest (happy-dom)                   |
| `pnpm typecheck`     | vue-tsc --noEmit                     |
| `pnpm sui headless`  | Regenerate headless barrel constants |
| `pnpm sui ui`        | Regenerate UI barrel constants       |
| `pnpm sui api`       | Regenerate API reference data        |
| `pnpm sui changelog` | Regenerate changelog data            |

## Development Workflow

1. **Pick or create an issue.** Discuss the scope and approach before coding large features.
2. **Create a branch.** Use `codex/` or a descriptive prefix:
   ```bash
   git checkout -b feat/your-feature
   ```
3. **Implement.** Follow the [Component Development](#component-development) phases below.
4. **Verify.** Run typecheck, lint, format, and tests before committing.
5. **Commit.** Follow the [commit convention](#commit--pull-request).
6. **Open a pull request.** Fill the PR template and link the issue.

## AI Skills & Agents

This project provides AI-assisted development tools — **Skills** (workflow shortcuts) and
**Agents** (specialized role prompts) — to help you build components faster and more
consistently.

### Project-Local Skill

| Skill                               | Trigger                                                     | What it does                                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$soybean-ui-component-development` | Any component work (new, migrate, fix, extend, standardize) | Classifies the component pattern, enforces headless/UI split, guides through all six delivery phases, and checks boundary rules. Lives at `.agents/skills/soybean-ui-component-development/`. |

When you invoke `$soybean-ui-component-development`, the skill:

- Classifies the task (new component / migration / standards alignment).
- Determines the component pattern (multi-slot / compact / single-class).
- Enforces the correct phase order: headless → UI → exports → delivery surfaces → verification.
- Prevents boundary violations (no styles in headless, no ARIA in UI).

### System Skills Useful for SoybeanUI

These skills are available in your Codex environment and are especially useful during
SoybeanUI development:

| Skill                  | Use when                                                                          |
| ---------------------- | --------------------------------------------------------------------------------- |
| `$a11y-auditor`        | Scanning HTML/JSX output for WCAG violations.                                     |
| `$a11y-checker`        | AI-powered accessibility fix suggestions for components.                          |
| `$a11y-debugging`      | Chrome DevTools-based accessibility debugging (focus, labels, contrast).          |
| `$accessibility-check` | Full semantic structure, keyboard, focus, and label audit with a Markdown report. |
| `$code-review`         | Comprehensive code review across all concerns before opening a PR.                |
| `$ai-slop-cleaner`     | Anti-slop cleanup and refactoring pass.                                           |
| `$analyze`             | Read-only deep repository analysis with ranked synthesis.                         |

### Agent Roles

Codex provides specialized **agent roles** (prompt surfaces) that you can route complex
subtasks to:

| Role              | Best for                                                                  |
| ----------------- | ------------------------------------------------------------------------- |
| `executor`        | Implementation, refactoring, feature work — the default for coding tasks. |
| `architect`       | System design, boundary decisions, long-horizon tradeoffs.                |
| `debugger`        | Root-cause analysis and regression isolation.                             |
| `code-reviewer`   | Comprehensive review before merging.                                      |
| `test-engineer`   | Test strategy, coverage gaps, flaky-test hardening.                       |
| `designer`        | UX/UI architecture and interaction design.                                |
| `verifier`        | Completion evidence, claim validation, test adequacy.                     |
| `explore`         | Fast repo-local file, symbol, and pattern lookup.                         |
| `code-simplifier` | Simplifies recently modified code without changing behavior.              |

**Default routing:** Use `executor` for implementation. Use `code-reviewer` before
opening a PR. Use `explore` to map existing patterns before starting a new component.
Route to specialists only when the task clearly benefits from deeper analysis or
specialized review.

## Coding Conventions

All code under this repository follows the instruction files in `.github/instructions/`:

| File                                            | Applies to                          |
| ----------------------------------------------- | ----------------------------------- |
| `typescript-functional-style.instructions.md`   | All `.ts`, `.tsx`, `.vue` files     |
| `vue-sfc.instructions.md`                       | All `.vue` files                    |
| `git-commit-convention.instructions.md`         | Commit messages, changelogs         |
| `soybean-ui-component-overview.instructions.md` | Component tasks                     |
| `soybean-ui-headless.instructions.md`           | `packages/headless/src/components/` |
| `soybean-ui-ui-layer.instructions.md`           | `packages/ui/src/components/`       |
| `soybean-ui-accessibility-rtl.instructions.md`  | ARIA, keyboard, RTL                 |
| `soybean-ui-testing.instructions.md`            | `packages/ui/test/`                 |
| `soybean-ui-playground.instructions.md`         | `apps/playground/`                  |
| `soybean-ui-docs.instructions.md`               | `apps/docs/`                        |
| `soybean-ui-checklist.instructions.md`          | Component completion checklist      |

### Key Rules

- **No styles in headless.** Not even `hidden` or `sr-only`.
- **No ARIA / keyboard logic in UI.** That belongs in headless.
- **UnoCSS utility classes only.** No raw CSS / SCSS.
- **No `as any`, `@ts-ignore`, or `@ts-expect-error`.**
- **Prefer pure functions.** Extract pure logic into `shared.ts` or composables.
- **Check `@vueuse/core` first** before writing a new composable from scratch.
- **Never manually edit generated files** (barrel constants, API JSON, changelog JSON).

## Component Development

A new component goes through six phases. See
`.github/instructions/soybean-ui-component-overview.instructions.md` for the full specification.

### Phase 0 — Determine Mode & Scope

Decide which pattern the component follows:

- **Multi-slot** (badge, dialog, accordion…) — uses `UiSlot`, `UiClass`, `provideXUi`.
- **Compact aggregation** (AccordionCompact, TableCompact…) — headless owns iteration and structure.
- **Single-class** (button, link…) — no UiContext, direct variant call.

### Phase 1 — Reference Study

Study at least one existing component of the same pattern in both `headless` and `ui`.

### Phase 2 — Headless Implementation

Files in `packages/headless/src/components/<name>/`, in order:

1. `types.ts` — slots, props, emits, context.
2. `context.ts` — provide/inject, reactive context values.
3. Base SFCs — one per slot (Root, Trigger, Content, Item…).
4. Optional `{Name}Compact.vue` — stable aggregation.
5. `index.ts` — re-exports.

### Phase 3 — UI Implementation

Files in `packages/ui/src/components/<name>/`:

1. `packages/ui/src/styles/<name>.ts` — style recipe (first line: `// @unocss-include`).
2. `types.ts` — wrapper props.
3. Wrapper `.vue` — injects styles, forwards props/slots.
4. `index.ts` — re-exports (including headless types).

### Phase 4 — Barrel Exports & Generated Files

```bash
# Update barrel index files
pnpm sui headless
pnpm sui ui

# If public API changed
pnpm sui api
pnpm sui api-translate -- --locale zh-CN
```

### Phase 5 — Delivery Surfaces

- **Playground demo:** `apps/playground/src/examples/<component>/`
- **Docs (en):** `apps/docs/src/docs/en/components/<component>.md`
- **Docs (zh-CN):** `apps/docs/src/docs/zh-CN/components/<component>.md`
- **Menu:** update `apps/docs/src/constants/menus.ts`
- **Tests:** `packages/ui/test/specs/components/<component>.spec.ts`

### Phase 6 — Verification

```bash
pnpm typecheck
pnpm lint
pnpm fmt
pnpm test
```

If any step fails, fix it before opening a PR. See the full checklist in
`.github/instructions/soybean-ui-checklist.instructions.md`.

## Testing

- **Framework:** Vitest + `@vue/test-utils` + `happy-dom`
- **Location:** `packages/ui/test/specs/components/<component>.spec.ts`
- **Required sections:** `rendering`, `{state} state`, `disabled state`, `accessibility`
- **Rule:** every `it()` block mounts and unmounts independently.
- **Accessibility:** use `axe-core` via `getA11yViolations`.

```bash
# Run all tests
pnpm test

# Run a specific component test
pnpm vitest packages/ui/test/specs/components/button.spec.ts
```

## Documentation

Docs live under `apps/docs/src/docs/<locale>/components/`. Every component needs both
English (`en`) and Chinese (`zh-CN`) documentation with matching structure.

API reference data is auto-generated. After changing public exports:

```bash
pnpm sui api                    # Regenerate baseline
pnpm sui api-translate -- --locale zh-CN   # Translate descriptions
```

## Commit & Pull Request

### Commit Convention

We follow **Conventional Commits** with mandatory scope:

```
<type>(<scope>): <subject>
```

Examples:

- `feat(button): add loading slot and loading prop`
- `fix(dialog): prevent outside click from closing nested popup`
- `docs(table): document remote pagination`

**Types:** `feat`, `fix`, `perf`, `refactor`, `docs`, `chore`

**Scope:** prefer the exact component name (e.g., `button`, `dialog`). Use broader scopes
(`ui`, `headless`, `composables`, `shared`, `docs`, `build`, `deps`) only when the change
is truly cross-cutting.

**Subject:** imperative, specific, and outcome-oriented. No trailing period.

Full rules: `.github/instructions/git-commit-convention.instructions.md`.

### Pull Request Guidelines

- One PR = one logical change. Prefer small, focused PRs.
- Link the related issue.
- Ensure CI passes (typecheck, lint, format, tests).
- If the PR adds a new component, include playground demos and bilingual docs.
- Keep the PR description concise: what, why, and how to verify.

---

# 参与贡献

感谢你对 SoybeanUI 的关注！本指南涵盖项目搭建、规范遵循和 PR 提交流程。

## 目录

- [项目概览](#项目概览)
- [开发环境搭建](#开发环境搭建)
- [开发流程](#开发流程)
- [AI Skills 与智能体](#ai-skills-与智能体)
- [编码规范](#编码规范)
- [组件开发](#组件开发)
- [测试](#测试)
- [文档](#文档)
- [Commit 与 Pull Request](#commit-与-pull-request)

## 项目概览

SoybeanUI 是一个基于 **headless / styled 分层架构** 的 Vue 3 组件库：

| 包                    | 路径                 | 职责                                         |
| --------------------- | -------------------- | -------------------------------------------- |
| `@soybeanjs/headless` | `packages/headless/` | 逻辑、状态、无障碍、composable。**零样式。** |
| `@soybeanjs/ui`       | `packages/ui/`       | 样式包装（UnoCSS）。变体、主题、UI 注入。    |
| Playground            | `apps/playground/`   | 交互式示例（Vite）。                         |
| Docs                  | `apps/docs/`         | 中英文档。Vite + vite-ssg。                  |

数据流单向：`headless` → `ui`（不可反向）。UI 层通过 `provideXUi(ui)` 注入样式；
headless 通过 `useUiContext` 读取。

**技术栈：** Vue 3 + TypeScript (strict) + UnoCSS + Vitest + pnpm workspaces。

## 开发环境搭建

### 前置条件

- **Node.js** ≥ 20
- **pnpm** ≥ 9（本仓库使用 `pnpm@11.5.2`）

### 安装

```bash
git clone https://github.com/soybeanjs/soybean-ui.git
cd soybean-ui
pnpm install
```

### 本地开发

```bash
# 建立源码到构建产物的软链接
pnpm stub

# 启动 playground（组件开发热更新）
pnpm dev
```

打开终端输出的 playground 地址，即可实时预览改动。

### 常用命令

| 命令                 | 用途                          |
| -------------------- | ----------------------------- |
| `pnpm dev`           | 启动 playground 开发服务器    |
| `pnpm build`         | 构建 headless → ui → CSS      |
| `pnpm lint`          | oxlint + eslint（Vue）        |
| `pnpm fmt`           | oxfmt（格式化）               |
| `pnpm test`          | Vitest（happy-dom）           |
| `pnpm typecheck`     | vue-tsc --noEmit              |
| `pnpm sui headless`  | 重新生成 headless barrel 常量 |
| `pnpm sui ui`        | 重新生成 UI barrel 常量       |
| `pnpm sui api`       | 重新生成 API 参考数据         |
| `pnpm sui changelog` | 重新生成 changelog 数据       |

## 开发流程

1. **选择或创建 issue。** 大型功能先讨论范围和方案再动手。
2. **创建分支。** 使用 `codex/` 或描述性前缀：
   ```bash
   git checkout -b feat/你的功能
   ```
3. **实现。** 按照下方 [组件开发](#组件开发) 的阶段顺序推进。
4. **验证。** 提交前运行 typecheck、lint、format 和测试。
5. **Commit。** 遵循 [commit 规范](#commit-与-pull-request)。
6. **提交 PR。** 填写 PR 模板并关联 issue。

## AI Skills 与智能体

本项目提供了 AI 辅助开发工具 —— **Skills**（工作流快捷方式）和 **Agents**（专用角色 prompt）
—— 帮助你更快、更一致地构建组件。

### 项目本地 Skill

| Skill                               | 触发条件                                       | 功能                                                                                                                                         |
| ----------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `$soybean-ui-component-development` | 任何组件工作（新建、迁移、修复、扩展、规范化） | 分类组件模式，强制执行 headless/UI 分层，引导完成全部六个交付阶段，并检查边界规则。位于 `.agents/skills/soybean-ui-component-development/`。 |

当你调用 `$soybean-ui-component-development` 时，该 skill 会：

- 分类任务（新建组件 / 迁移 / 规范化对齐）。
- 确定组件模式（多 slot / compact 聚合 / 单类名）。
- 强制执行正确的阶段顺序：headless → UI → 导出 → 交付面 → 验证。
- 防止边界违规（headless 中无样式，UI 中无 ARIA）。

### SoybeanUI 开发相关的系统 Skill

以下 skills 在你的 Codex 环境中可用，在 SoybeanUI 开发中尤其有用：

| Skill                  | 使用场景                                                   |
| ---------------------- | ---------------------------------------------------------- |
| `$a11y-auditor`        | 扫描 HTML/JSX 输出中的 WCAG 违规。                         |
| `$a11y-checker`        | AI 驱动的组件无障碍修复建议。                              |
| `$a11y-debugging`      | 基于 Chrome DevTools 的无障碍调试（焦点、标签、对比度）。  |
| `$accessibility-check` | 完整的语义结构、键盘、焦点和标签审计，生成 Markdown 报告。 |
| `$code-review`         | 提 PR 前的全面代码审查。                                   |
| `$ai-slop-cleaner`     | 反 AI slop 清理和重构。                                    |
| `$analyze`             | 只读深度仓库分析，带排序综合报告。                         |

### Agent 角色

Codex 提供专门的 **agent 角色**（prompt 面），你可以将复杂子任务路由给它们：

| 角色              | 最适合                                       |
| ----------------- | -------------------------------------------- |
| `executor`        | 实现、重构、功能开发 —— 编码任务的默认选择。 |
| `architect`       | 系统设计、边界决策、长期权衡。               |
| `debugger`        | 根因分析和回归隔离。                         |
| `code-reviewer`   | 合并前的全面审查。                           |
| `test-engineer`   | 测试策略、覆盖率缺口、flake 测试加固。       |
| `designer`        | UX/UI 架构和交互设计。                       |
| `verifier`        | 完成证据、声明验证、测试充分性。             |
| `explore`         | 快速仓库内文件、符号和模式查找。             |
| `code-simplifier` | 简化最近修改的代码而不改变行为。             |

**默认路由：** 实现用 `executor`。提 PR 前用 `code-reviewer`。开始新组件前用
`explore` 映射已有模式。仅在任务明确受益于更深入分析或专项审查时路由到专家角色。

## 编码规范

本仓库所有代码遵循 `.github/instructions/` 下的规范文件：

| 文件                                            | 适用范围                            |
| ----------------------------------------------- | ----------------------------------- |
| `typescript-functional-style.instructions.md`   | 所有 `.ts`、`.tsx`、`.vue` 文件     |
| `vue-sfc.instructions.md`                       | 所有 `.vue` 文件                    |
| `git-commit-convention.instructions.md`         | Commit message、changelog           |
| `soybean-ui-component-overview.instructions.md` | 组件任务                            |
| `soybean-ui-headless.instructions.md`           | `packages/headless/src/components/` |
| `soybean-ui-ui-layer.instructions.md`           | `packages/ui/src/components/`       |
| `soybean-ui-accessibility-rtl.instructions.md`  | ARIA、键盘、RTL                     |
| `soybean-ui-testing.instructions.md`            | `packages/ui/test/`                 |
| `soybean-ui-playground.instructions.md`         | `apps/playground/`                  |
| `soybean-ui-docs.instructions.md`               | `apps/docs/`                        |
| `soybean-ui-checklist.instructions.md`          | 组件完成清单                        |

### 核心规则

- **headless 中禁止样式。** 连 `hidden` 或 `sr-only` 也不行。
- **UI 层禁止 ARIA / 键盘逻辑。** 这些属于 headless。
- **仅使用 UnoCSS 工具类。** 禁止裸 CSS / SCSS。
- **禁止 `as any`、`@ts-ignore`、`@ts-expect-error`。**
- **优先纯函数。** 将纯逻辑提取到 `shared.ts` 或 composable。
- **新增 composable 前先检查 `@vueuse/core`。** 避免从零重写常见能力。
- **禁止手动编辑生成文件**（barrel 常量、API JSON、changelog JSON）。

## 组件开发

一个新组件经过六个阶段。详见 `.github/instructions/soybean-ui-component-overview.instructions.md`。

### Phase 0 — 确定模式与范围

判断组件属于哪种模式：

- **多 slot**（badge、dialog、accordion…）—— 使用 `UiSlot`、`UiClass`、`provideXUi`。
- **Compact 聚合**（AccordionCompact、TableCompact…）—— headless 负责迭代与结构。
- **单类名**（button、link…）—— 无 UiContext，直接调用 variant。

### Phase 1 — 参照学习

至少阅读一个同模式的 headless 参考和一个 UI 参考。

### Phase 2 — Headless 实现

文件在 `packages/headless/src/components/<name>/`，按顺序：

1. `types.ts` — slots、props、emits、context。
2. `context.ts` — provide/inject，响应式 context 值。
3. 基础 SFC — 每个 slot 一个文件（Root、Trigger、Content、Item…）。
4. 可选 `{Name}Compact.vue` — 稳定聚合。
5. `index.ts` — 重导出。

### Phase 3 — UI 实现

文件在 `packages/ui/src/components/<name>/`：

1. `packages/ui/src/styles/<name>.ts` — 样式配方（首行：`// @unocss-include`）。
2. `types.ts` — wrapper props。
3. wrapper `.vue` — 注入样式，转发 props/slots。
4. `index.ts` — 重导出（含 headless 类型）。

### Phase 4 — Barrel 导出与生成文件

```bash
# 更新 barrel index 文件
pnpm sui headless
pnpm sui ui

# 如果公开 API 有变化
pnpm sui api
pnpm sui api-translate -- --locale zh-CN
```

### Phase 5 — 交付面

- **Playground 示例：** `apps/playground/src/examples/<component>/`
- **英文文档：** `apps/docs/src/docs/en/components/<component>.md`
- **中文文档：** `apps/docs/src/docs/zh-CN/components/<component>.md`
- **菜单：** 更新 `apps/docs/src/constants/menus.ts`
- **测试：** `packages/ui/test/specs/components/<component>.spec.ts`

### Phase 6 — 验证

```bash
pnpm typecheck
pnpm lint
pnpm fmt
pnpm test
```

任一步骤失败，请在提 PR 前修复。完整清单见
`.github/instructions/soybean-ui-checklist.instructions.md`。

## 测试

- **框架：** Vitest + `@vue/test-utils` + `happy-dom`
- **位置：** `packages/ui/test/specs/components/<component>.spec.ts`
- **必须覆盖：** `rendering`、`{state} state`、`disabled state`、`accessibility`
- **规则：** 每个 `it()` 块独立挂载和卸载。
- **无障碍：** 使用 `axe-core` 通过 `getA11yViolations` 检查。

```bash
# 运行全部测试
pnpm test

# 运行指定组件测试
pnpm vitest packages/ui/test/specs/components/button.spec.ts
```

## 文档

文档位于 `apps/docs/src/docs/<locale>/components/`。每个组件需要中英文文档，结构一致。

API 参考数据自动生成。公开导出变化后：

```bash
pnpm sui api                    # 重新生成基线
pnpm sui api-translate -- --locale zh-CN   # 翻译描述
```

## Commit 与 Pull Request

### Commit 规范

遵循 **Conventional Commits**，scope 必填：

```
<type>(<scope>): <subject>
```

示例：

- `feat(button): add loading slot and loading prop`
- `fix(dialog): prevent outside click from closing nested popup`
- `docs(table): document remote pagination`

**类型：** `feat`、`fix`、`perf`、`refactor`、`docs`、`chore`

**Scope：** 优先精确组件名（如 `button`、`dialog`）。仅在真正跨领域时使用宽 scope
（`ui`、`headless`、`composables`、`shared`、`docs`、`build`、`deps`）。

**Subject：** 祈使语气，具体，面向结果。不以句号结尾。

完整规范：`.github/instructions/git-commit-convention.instructions.md`。

### Pull Request 指南

- 一个 PR = 一个逻辑变更。优先小 PR。
- 关联相关 issue。
- 确保 CI 通过（typecheck、lint、format、tests）。
- 新增组件须包含 playground 示例和中英文档。
- PR 描述简洁：做了什么、为什么、如何验证。
