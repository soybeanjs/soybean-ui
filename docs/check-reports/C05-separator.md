# C05 `separator` 检查优化报告

> **组件编号：** C05
> **组件名称：** `separator` / `SSeparator`
> **模式：** 多槽 + Compact（check.md 原标记为「单类」，经审计修正为「多槽 + Compact」）
> **优先级：** P3
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D3-01

---

## 一、执行摘要

对 `SSeparator` 完成全维度审计。发现并修复 2 项 Minor 级问题（`SeparatorCompactSlots` 类型定义 `default` 但实际插槽为 `label`；`decorative` 模式下仍设置 `aria-orientation`）、1 项 Major 文档缺口（缺少 Features / Notes / FAQ，概述过简）、1 项 Minor 测试缺口（缺少 `decorative` / `aria-orientation` / `border` 覆盖）。测试从 6 项扩展到 13 项，补充完整文档章节，修正 check.md 模式分类。整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                                      |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式；`SeparatorUiSlot`（root/label）；recipe `// @unocss-include` + slots 匹配；`useOmitProps` 含 `class` |
| D2 行业对标 |  ✅  | 标签/对齐/边框样式/尺寸/装饰模式/RTL 对标 Ant Design/Element Plus/MUI/Mantine/shadcn/ui；功能覆盖优于 shadcn/ui           |
| D3 API 设计 |  ✅  | `orientation`/`decorative`/`label`/`align`/`border`/`size`/`ui` 命名规范；修复 `SeparatorCompactSlots` 插槽名不匹配       |
| D4 类型系统 |  ✅  | strict 通过；`BaseProps` extends `HTMLAttributes`；JSDoc 完整；`SeparatorBorder` 从 `VariantProps` 推导                   |
| D5 代码规范 |  ✅  | script setup 顺序正确；模板无 `props.xxx`；派生状态均用 `computed`                                                        |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（8 条）+ Notes（架构对标表 + 运行时注意事项）+ FAQ（4 条）；概述补充使用场景与同级关系          |
|   D7 其他   |  ✅  | 13 项单元测试通过（orientation/aria-orientation/decorative/border/a11y）；SSR 安全；axe-core 零违规                       |

---

## 二、行业对标矩阵

| 能力                            | SoybeanUI | Ant Design `Divider` | Element Plus `ElDivider` | MUI `Divider` | Mantine `Divider` | shadcn/ui `Separator` |
| :------------------------------ | :-------: | :------------------: | :----------------------: | :-----------: | :---------------: | :-------------------: |
| headless/styled 分离            |    ✅     |          —           |            —             |       —       |         —         |          ✅           |
| 水平 / 垂直方向                 |    ✅     |          ✅          |            ✅            |      ✅       |        ✅         |          ✅           |
| 标签（prop + slot）             |    ✅     |          ✅          |            ✅            |       —       |        ✅         |           —           |
| 标签对齐（start/center/end）    |    ✅     |          ✅          |            ✅            |       —       |        ✅         |           —           |
| 边框样式（solid/dashed/dotted） |    ✅     |      ⚠️ dashed       |            ✅            |       —       |    ⚠️ variant     |           —           |
| 尺寸缩放（xs–2xl）              |    ✅     |          —           |            —             |       —       |        ✅         |           —           |
| 装饰模式（`role="none"`）       |    ✅     |          —           |            —             |       —       |         —         |          ✅           |
| `aria-orientation`              |    ✅     |          —           |            —             |       —       |         —         |          ✅           |
| RTL 适配                        |    ✅     |          —           |            —             |       —       |         —         |           —           |
| 按插槽覆盖（`ui` prop）         |    ✅     |          —           |            —             |       —       |         —         |           —           |

**增强项（➕）：**

- **边框样式完整**：支持 `solid`/`dashed`/`dotted` 三种线型，优于 Ant Design（仅 `dashed` 布尔）与 shadcn/ui（无边框样式）。
- **尺寸缩放**：六档 `size`（xs–2xl）控制标签字号与间距，仅 Mantine 提供类似能力。
- **RTL 适配**：标签使用 `rtl:translate-x-1/2` 与逻辑 `start-*` 定位，自动适配从右到左布局，主流库均未提供。
- **Compact 聚合**：headless 层 `SeparatorCompact` 组合 Root + Label，拥有标签可见性逻辑（垂直时隐藏标签），UI wrapper 保持轻量。

---

## 三、发现的问题与处理

### 3.1 Minor — `SeparatorCompactSlots` 类型插槽名与模板不匹配（已修复，D3-06 / D4-06）

**问题：** `SeparatorCompactSlots` 类型定义 `default?: () => any`，但 `SeparatorCompact` 模板使用 `<slot name="label">`，实际插槽名为 `label`。类型与实现不一致。

**修复：** 将类型中的 `default` 改为 `label`。

```diff
 export type SeparatorCompactSlots = {
-  default?: () => any;
+  label?: () => any;
 };
```

### 3.2 Minor — `decorative` 模式下仍设置 `aria-orientation`（已修复，D1-08）

**问题：** `separator-root.vue` 中 `ariaOrientation` 未考虑 `decorative` prop。当 `decorative: true`（`role="none"`）且 `orientation: vertical` 时，仍会设置 `aria-orientation="vertical"`，与 `role="none"`（从无障碍树移除）语义矛盾。shadcn/ui 在装饰模式下省略 `aria-orientation`。

**修复：** 在 `ariaOrientation` computed 中增加 `!props.decorative` 条件。

```diff
-const ariaOrientation = computed(() => (computedOrientation.value === 'vertical' ? props.orientation : undefined));
+const ariaOrientation = computed(() =>
+  !props.decorative && computedOrientation.value === 'vertical' ? props.orientation : undefined
+);
```

### 3.3 Major — 文档缺少 Features / Notes / FAQ 章节（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-13 / D6-15）

**问题：** 中英文文档仅有 Overview（过简，一句话）、Usage、Demos、API，缺少 Features、Notes、FAQ 章节。Overview 未说明使用场景与同级组件关系。

**修复：** 在中英文文档中新增：

- **Features**：8 条 emoji bullet，覆盖方向/标签/对齐/边框/尺寸/无障碍/插槽覆盖/RTL
- **Notes → 架构与对标差异**：6 维度对比表（架构/标签/边框样式/尺寸缩放/装饰模式/RTL）
- **Notes → 运行时注意事项**：3 条（垂直标签隐藏、装饰模式、满宽/满高）
- **FAQ**：4 条问答（decorative 使用时机、垂直标签不显示、自定义标签属性、满宽实现）
- **Overview** 补充使用场景与同级组件指引（优先 SCard / UnoCSS 间距）

### 3.4 Minor — 测试覆盖不足（已修复，D7-11）

**问题：** 原测试 6 项，缺少 `decorative` prop、`aria-orientation`、`border` 变体覆盖。

**修复：** 测试从 6 项扩展到 13 项，新增覆盖：

| 套件              | 覆盖场景                                                                            |
| :---------------- | :---------------------------------------------------------------------------------- |
| orientation state | 垂直时 `aria-orientation="vertical"`；水平时省略 `aria-orientation`                 |
| decorative        | `decorative: true` → `role="none"`；decorative + vertical 时省略 `aria-orientation` |
| border variants   | `dashed`/`dotted`/`solid`（默认）边框类名验证                                       |

### 3.5 Minor — check.md 模式分类标记错误（已修复）

**问题：** check.md 将 C05 标记为「单类」，但 separator 实际为「多槽 + Compact」——拥有 `SeparatorUiSlot`（root/label）、`scv()` 样式配方、`provideSeparatorUi` 上下文、`SeparatorCompact` 聚合。

**修复：** check.md C05 模式列从「单类」改为「多槽 + Compact」。

---

## 四、重点检查项结论

| 检查项                 | 结论 | 证据                                                                                                                                      |
| :--------------------- | :--: | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-09** 样式配方完整 |  ✅  | `separator.ts` 首行 `// @unocss-include`；`slots`（root/label）与 `SeparatorUiSlot` 完全匹配；variants 覆盖 size/orientation/align/border |
| **D3-01** 命名一致性   |  ✅  | `orientation`/`decorative`/`label`/`align`/`border`/`size` 与 shadcn/ui、Element Plus 命名一致；`labelProps` 转发标签属性                 |

---

## 五、变更文件清单

| 文件                                                            | 变更类型                                                                                      |
| :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/separator/types.ts`           | 修复：`SeparatorCompactSlots` 插槽名 `default` → `label`（D3-06 / D4-06）                     |
| `packages/headless/src/components/separator/separator-root.vue` | 修复：`ariaOrientation` 在 `decorative` 时省略（D1-08）                                       |
| `packages/ui/test/specs/components/separator.spec.ts`           | 重写：6 项 → 13 项（aria-orientation、decorative、border variants）                           |
| `apps/docs/src/docs/en/components/separator.md`                 | 文档：新增 Features（8 条）+ Notes（架构对标表 + 运行时注意事项）+ FAQ（4 条）+ Overview 扩充 |
| `apps/docs/src/docs/zh-CN/components/separator.md`              | 文档：新增功能（8 条）+ 注意事项（架构对标表 + 运行时注意事项）+ 常见问题（4 条）+ 概述扩充   |
| `docs/check.md`                                                 | 修正 C05 模式「单类」→「多槽 + Compact」；标记 C05 各维度为 ✅                                |

---

## 六、验证命令

```bash
# 单元测试（13 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/separator.spec.ts
# → Test Files 1 passed (1) | Tests 13 passed (13)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C05，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
