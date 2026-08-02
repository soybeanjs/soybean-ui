# C06 `kbd` 检查优化报告

> **组件编号：** C06
> **组件名称：** `kbd` / `SKbd`
> **模式：** 单类（`cv()` 配方，无 UiContext，无多槽）
> **优先级：** P3
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D3-01

---

## 一、执行摘要

对 `SKbd` 完成全维度审计。组件实现质量高，headless/styled 分离清晰，`useKbd` 组合式函数提供独特的符号化与平台感知能力。发现 1 项 Major 文档缺口（缺少 Features / Notes / FAQ，概述过简）、1 项 Minor 测试缺口（缺少 `symbolize: false`、`raised`、`variant`、`data-group` 覆盖）。测试从 5 项扩展到 14 项，补充完整文档章节。无代码层面缺陷。整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                               |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 单类模式；`cv()` 配方 `// @unocss-include`；`useOmitProps` 含 `class`；`data-soybean-kbd` + `data-group` 状态反射  |
| D2 行业对标 |  ✅  | 符号化 + 平台感知修饰键 + raised 效果 + 组合键字间距，功能远超 shadcn/ui / Mantine Kbd                             |
| D3 API 设计 |  ✅  | `value`/`symbolize`/`size`/`variant`/`raised` 命名规范；`KbdValue` 支持 `KbdKey                                    | string`；默认 slot 自定义内容 |
| D4 类型系统 |  ✅  | strict 通过；`KbdProps extends BaseProps`（HTMLAttributes）；`KbdKey` 联合字面量类型；JSDoc 完整                   |
| D5 代码规范 |  ✅  | script setup 顺序正确；模板无 `props.xxx`；`formattedValue` 用 `computed`；`useKbd` 用 `createSharedComposable`    |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（8 条）+ Notes（架构对标表 + 运行时注意事项）+ FAQ（4 条）；概述补充使用场景与符号化说明 |
|   D7 其他   |  ✅  | 14 项单元测试通过（symbolize/data-group/variants/raised/a11y）；SSR 平台检测安全；axe-core 零违规                  |

---

## 二、行业对标矩阵

| 能力                        | SoybeanUI | shadcn/ui `Kbd` | Mantine `Kbd` | Ant Design |
| :-------------------------- | :-------: | :-------------: | :-----------: | :--------: |
| headless/styled 分离        |    ✅     |       ✅        |       —       |     —      |
| 原生 `<kbd>` 语义元素       |    ✅     |       ✅        |      ✅       |     —      |
| 符号化（20 个键 → Unicode） |    ✅     |        —        |       —       |     —      |
| 平台感知修饰键（macOS/Win） |    ✅     |        —        |       —       |     —      |
| 变体（solid/outline/ghost） |    ✅     |        —        |       —       |     —      |
| 尺寸缩放（xs–2xl）          |    ✅     |      sm–lg      |     xs–xl     |     —      |
| 凸起效果（raised shadow）   |    ✅     |        —        |       —       |     —      |
| 组合键字间距（data-group）  |    ✅     |        —        |       —       |     —      |
| 暗色模式（语义 token）      |    ✅     |       ✅        |      ✅       |     —      |

**增强项（➕）：**

- **符号化 + 平台感知**：`useKbd` 组合式函数提供 20 个键名的 Unicode 符号映射（`shift`→`⇧`、`enter`→`↵`、`tab`→`⇥`、方向键等），并通过 `navigator.userAgent` 在 `onMounted` 中检测 macOS，将 `meta`/`alt`/`ctrl` 解析为平台对应符号（macOS: `⌘`/`⌥`/`⌃`，Windows: `⊞`/`alt`/`ctrl`）。shadcn/ui 与 Mantine 均无此能力。
- **凸起效果**：`raised` prop 通过 `shadow-[0_2px_0_0]` 模拟按键帽的 2px 立体阴影，主流库未提供。
- **组合键字间距**：当 `value` 为数组时自动添加 `data-group` 属性，配方中 `data-[group]:tracking-*` 按尺寸递增字间距，提升组合键可读性。

---

## 三、发现的问题与处理

### 3.1 Major — 文档缺少 Features / Notes / FAQ 章节（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-13 / D6-15）

**问题：** 中英文文档仅有 Overview（一句话）、Usage、Demos、API，缺少 Features、Notes、FAQ 章节。Overview 未说明符号化能力、平台感知、使用场景。

**修复：** 在中英文文档中新增：

- **Features**：8 条 emoji bullet，覆盖符号化/平台感知/变体/尺寸/凸起/组合键/语义化/暗色模式
- **Notes → 架构与对标差异**：7 维度对比表（架构/符号化/平台感知/变体/尺寸/凸起/组合键）
- **Notes → 运行时注意事项**：3 条（平台检测 SSR 水合、大小写敏感、单例组合式函数）
- **FAQ**：4 条问答（组合键显示、禁用符号化、SSR 修饰键空格、自定义内容）
- **Overview** 补充符号化说明与使用场景（tooltip / 帮助对话框 / 内联文档）

### 3.2 Minor — 测试覆盖不足（已修复，D7-11）

**问题：** 原测试 5 项，缺少 `symbolize: false`、`raised`、`variant` 各项、`data-group` 属性、符号化结果验证。

**修复：** 测试从 5 项扩展到 14 项，新增覆盖：

| 套件       | 覆盖场景                                                                      |
| :--------- | :---------------------------------------------------------------------------- |
| symbolize  | `shift` → `⇧` 符号化验证；`symbolize: false` 保留原始值；未知键 `F5` 大写回退 |
| data-group | 数组值设置 `data-group`；单字符串值不设置 `data-group`                        |
| variants   | outline（默认）/ solid / ghost 变体类名；raised（默认）/ non-raised 阴影类名  |

---

## 四、重点检查项结论

| 检查项                 | 结论 | 证据                                                                                                                       |
| :--------------------- | :--: | :------------------------------------------------------------------------------------------------------------------------- |
| **D1-09** 样式配方完整 |  ✅  | `kbd.ts` 首行 `// @unocss-include`；单类 `cv()` 配方；variants 覆盖 size（xs–2xl）/ variant（solid/outline/ghost）/ raised |
| **D3-01** 命名一致性   |  ✅  | `value`/`symbolize`/`size`/`variant`/`raised` 命名规范；`KbdKey` 联合字面量使用小写行业惯用名（shift/enter/tab/arrows）    |

---

## 五、变更文件清单

| 文件                                            | 变更类型                                                                                      |
| :---------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| `packages/ui/test/specs/components/kbd.spec.ts` | 重写：5 项 → 14 项（symbolize、data-group、variants、raised）                                 |
| `apps/docs/src/docs/en/components/kbd.md`       | 文档：新增 Features（8 条）+ Notes（架构对标表 + 运行时注意事项）+ FAQ（4 条）+ Overview 扩充 |
| `apps/docs/src/docs/zh-CN/components/kbd.md`    | 文档：新增功能（8 条）+ 注意事项（架构对标表 + 运行时注意事项）+ 常见问题（4 条）+ 概述扩充   |
| `docs/check.md`                                 | 标记 C06 各维度为 ✅                                                                          |

---

## 六、验证命令

```bash
# 单元测试（14 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/kbd.spec.ts
# → Test Files 1 passed (1) | Tests 14 passed (14)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

## 七、后续建议

1. **P3 增强：** 为符号化输出添加 `aria-label`（如 `⇧` 的 `aria-label="Shift"`），进一步提升屏幕阅读器体验。当前 `<kbd>` 内容为符号，部分屏幕阅读器可能无法正确朗读 Unicode 符号。
2. **P3 增强：** 支持大小写不敏感的键名匹配（如 `Shift` 和 `shift` 都解析为 `⇧`），降低用户使用门槛。当前需严格使用小写键名。

---

_报告生成于组件审计工作流 C06，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
