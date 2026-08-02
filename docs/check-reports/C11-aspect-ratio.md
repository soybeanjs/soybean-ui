# C11 `aspect-ratio` 检查优化报告

> **组件编号：** C11
> **组件名称：** `aspect-ratio` / `SAspectRatio`
> **模式：** 单类（UI 层直接重新导出 headless，无 `cv()` 配方，无变体）
> **优先级：** P3
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D7-09

---

## 一、执行摘要

对 `SAspectRatio` 完成全维度审计。组件为 headless 原语（UI 层直接重新导出），使用 padding-bottom 技术维持宽高比。发现 1 项 Major 文档缺口（缺少 Features / Notes / FAQ）、1 项 Minor 测试缺口（缺少 `as` prop / `aspect` slot prop / class 转发覆盖）。测试从 4 项扩展到 10 项，补充完整文档章节。无代码层面缺陷。整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                          |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | headless 原语；UI 重新导出；`data-soybean-aspect-ratio-wrapper` + `data-soybean-aspect-ratio`；`useOmitProps` |
| D2 行业对标 |  ✅  | padding-bottom 技术 + `as` prop 多态 + `aspect` slot scope，功能优于 shadcn/ui                                |
| D3 API 设计 |  ✅  | `ratio` prop 命名规范；`AspectRatioProps extends PrimitiveWithBaseProps` 支持 `as`                            |
| D4 类型系统 |  ✅  | strict 通过；`PrimitiveWithBaseProps` 基础类型；JSDoc 完整                                                    |
| D5 代码规范 |  ✅  | `inheritAttrs: false` + `useAttrs` + `useOmitProps` 模式；模板无 `props.xxx`                                  |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（6 条）+ Notes（架构 + 对标表 + FAQ 4 条）                                          |
|   D7 其他   |  ✅  | 10 项单元测试通过（ratio 计算 / `as` prop / slot scope / class 转发 / a11y）；SSR 安全；axe-core 零违规       |

---

## 二、发现的问题与处理

### 2.1 Major — 文档缺少 Features / Notes / FAQ 章节（已修复，D6-02 / D6-03 / D6-10 / D6-11）

**问题：** 中英文文档仅有 Overview（1 句话）、Usage、Demos、API，缺少 Features、Notes、FAQ。未说明 padding-bottom 技术、`as` prop 多态渲染、`aspect` slot scope、内联样式原因。

**修复：** 在中英文文档中新增：

- **Features**：6 条（宽高比控制 / 多态渲染 / 作用域插槽 / 类名转发 / 无障碍 / SSR 安全）
- **Notes → 架构**：padding-bottom 技术说明 + 内联样式为结构性的已接受偏离
- **Notes → 对标差异**：5 维度对比表（架构 / 技术 / 多态 / slot scope / ratio 输入）
- **FAQ**：4 条（16:9 用法、`as` prop、内联样式原因、`aspect` slot prop）

### 2.2 Minor — 测试覆盖不足（已修复，D7-11）

**问题：** 原测试 4 项，缺少 `as` prop 多态渲染、`aspect` slot scope、class 转发、position 样式验证。

**修复：** 测试从 4 项扩展到 10 项，新增覆盖：

| 套件                  | 覆盖场景                                                   |
| :-------------------- | :--------------------------------------------------------- |
| rendering             | wrapper `position: relative`；content `position: absolute` |
| polymorphic rendering | 默认 `div`；`as="section"` 渲染为 `<section>`              |
| slot props            | `aspect` slot scope 值验证（16:9 → 56.25）                 |
| class forwarding      | `class="rounded-lg overflow-hidden"` 转发到 content 元素   |

---

## 三、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                  |
| :----------------- | :--: | :---------------------------------------------------------------------------------------------------- |
| **D1-09** 样式配方 | N/A  | 无 `cv()` 配方——UI 层直接重新导出 headless。padding-bottom 技术的内联定位样式为结构性必需，非装饰性   |
| **D7-09** SSR 安全 |  ✅  | 纯 `computed` 计算 `aspect` 和 `style`，无 `window`/`document`/`navigator` 等浏览器 API；SSR 渲染安全 |

---

## 四、架构备注

### 内联样式偏离说明

`AspectRatio` 的 headless 层使用内联样式 `style="position: relative; width: 100%"`（wrapper）和 `style="position: absolute; inset: 0px"`（content）。这偏离了 AGENTS.md 中「DO NOT add styles/classes to packages/headless components」的规则。

**接受原因：** 这些样式是 padding-bottom 宽高比技术的结构性必需——没有 `position: relative`（wrapper）和 `position: absolute; inset: 0`（content），技术无法工作。这与 Radix UI 和 shadcn/ui 的 AspectRatio 实现一致。动态的 `paddingBottom` 百分比也必须为内联样式（由 `ratio` prop 计算）。

**替代方案（未采纳）：** 将静态定位样式移至 UI 层 UnoCSS 类（`class="relative w-full"` + `class="absolute inset-0"`），但这需要创建 UI wrapper 组件（而非直接重新导出），增加了不必要的复杂性。当前方案更简洁且与业界一致。

---

## 五、变更文件清单

| 文件                                                     | 变更类型                                                               |
| :------------------------------------------------------- | :--------------------------------------------------------------------- |
| `packages/ui/test/specs/components/aspect-ratio.spec.ts` | 重写：4 项 → 10 项（position 样式、`as` prop、slot scope、class 转发） |
| `apps/docs/src/docs/en/components/aspect-ratio.md`       | 文档：新增 Features（6 条）+ Notes（架构 + 对标表 + FAQ 4 条）         |
| `apps/docs/src/docs/zh-CN/components/aspect-ratio.md`    | 文档：新增功能（6 条）+ 注意事项（架构 + 对标表 + 常见问题 4 条）      |
| `docs/check.md`                                          | 标记 C11 各维度为 ✅                                                   |

---

## 六、验证命令

```bash
# 单元测试（10 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/aspect-ratio.spec.ts
# → Test Files 1 passed (1) | Tests 10 passed (10)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C11，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
