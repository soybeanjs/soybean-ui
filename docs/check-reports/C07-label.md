# C07 `label` 检查优化报告

> **组件编号：** C07
> **组件名称：** `label` / `SLabel`
> **模式：** 单类（`cv()` 配方，无 UiContext，无多槽）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-14、D3-01、D7-05

---

## 一、执行摘要

对 `SLabel` 完成全维度审计。发现并修复 1 项 Major playground bug（`htms-for` 拼写错误导致标签与输入框未关联）、1 项 Minor 模式一致性问题（UI wrapper 未使用 `useOmitProps` 转发 props）、1 项 Major 文档缺口（缺少 Features / Demos / Notes / FAQ）、1 项 Minor 测试缺口（缺少尺寸变体、双击阻止选中、属性转发覆盖）。测试从 4 项扩展到 10 项，补充完整文档章节。整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                                    |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 单类模式；`cv()` 配方 `// @unocss-include`；`useOmitProps` 含 `class`；`data-soybean-label`；`for` 关联 |
| D2 行业对标 |  ✅  | 独立 `for` 关联 + 尺寸缩放 + 双击阻止选中 + peer-disabled 样式，对标 shadcn/ui，优于表单耦合库          |
| D3 API 设计 |  ✅  | `for`/`size`/`class` 命名规范；独立使用不耦合 Form；默认 slot 自定义内容                                |
| D4 类型系统 |  ✅  | strict 通过；`LabelProps extends BaseProps`（HTMLAttributes）；JSDoc 完整                               |
| D5 代码规范 |  ✅  | 修复：UI wrapper 改用 `useOmitProps` + `v-bind` 转发（D5-12 / D1-10 一致性）；模板无 `props.xxx`        |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（6 条）+ Demos + Notes（架构对标表 + 运行时注意事项）+ FAQ（4 条）            |
|   D7 其他   |  ✅  | 10 项单元测试通过（尺寸变体 / 双击阻止选中 / 属性转发 / a11y）；axe-core 零违规                         |

---

## 二、行业对标矩阵

| 能力                           | SoybeanUI | shadcn/ui `Label` | Ant Design `Form.Label` | Element Plus `FormLabel` | MUI `InputLabel` |
| :----------------------------- | :-------: | :---------------: | :---------------------: | :----------------------: | :--------------: |
| headless/styled 分离           |    ✅     |        ✅         |            —            |            —             |        —         |
| 原生 `<label>` 元素            |    ✅     |        ✅         |           ✅            |            ✅            |        ✅        |
| 独立 `for` 关联（不耦合 Form） |    ✅     |        ✅         |            —            |            —             |        —         |
| 尺寸缩放（xs–2xl）             |    ✅     |         —         |            —            |            —             |      `size`      |
| 双击阻止文本选中               |    ✅     |        ✅         |            —            |            —             |        —         |
| peer-disabled 样式             |    ✅     |        ✅         |            —            |            —             |        —         |

**增强项（➕）：**

- **独立使用**：与 Ant Design / Element Plus / MUI 中标签与 `<Form>` 耦合不同，`SLabel` 可独立使用——传入 `for="input-id"` 即可关联任意输入框。这与 shadcn/ui 的模式一致，灵活性更高。
- **尺寸缩放**：六档 `size`（xs–2xl）控制标签字号，shadcn/ui 未提供。

---

## 三、发现的问题与处理

### 3.1 Major — Playground 示例 `htms-for` 拼写错误（已修复，D6-05 / D6-14）

**问题：** `apps/playground/src/examples/label/01-basic.vue` 中 `<SLabel htms-for="email">` 使用了无效属性 `htms-for`（应为 `for`）。导致标签与输入框（`id="email"`）未关联，点击标签不会聚焦输入框，且 playground 演示功能失效。

**修复：** `htms-for` → `for`。

```diff
-    <SLabel htms-for="email">Email</SLabel>
+    <SLabel for="email">Email</SLabel>
```

### 3.2 Minor — UI wrapper 未使用 `useOmitProps` 转发 props（已修复，D5-12 / D1-10）

**问题：** UI `label.vue` 仅显式传递 `:for="props.for"` 和 `:class="cls"`，未使用 `useOmitProps` + `v-bind` 模式。与项目中其他单类组件（button、kbd、link 等）的 `useOmitProps` 模式不一致。此外，模板使用 `props.for` 违反 D5-14。

**修复：** 改用 `useOmitProps(props, ['class', 'size'])` + `v-bind="delegatedProps"` 模式，确保所有 props（含 `for` 与 HTML 属性）显式转发到 headless Label。

```diff
+import { useOmitProps } from '@soybeanjs/headless/composables';
 ...
-const props = defineProps<LabelProps>();
-
-const cls = computed(() => labelVariants({ size: props.size }, props.class));
+const props = defineProps<LabelProps>();
+
+const delegatedProps = useOmitProps(props, ['class', 'size']);
+
+const cls = computed(() => labelVariants({ size: props.size }, props.class));

 <template>
-  <Label :for="props.for" :class="cls">
+  <Label v-bind="delegatedProps" :class="cls">
     <slot />
   </Label>
 </template>
```

### 3.3 Major — 文档缺少 Features / Demos / Notes / FAQ 章节（已修复，D6-02 / D6-05 / D6-10 / D6-11 / D6-15）

**问题：** 中英文文档仅有 Overview、Usage、API，缺少 Features、Demos、Notes、FAQ 章节。文档未包含 `<PlaygroundGallery>` 标签。

**修复：** 在中英文文档中新增：

- **Features**：6 条 emoji bullet，覆盖原生 label / for 关联 / 尺寸缩放 / 阻止选中 / 无障碍 / 类名覆盖
- **Demos**：新增 `<PlaygroundGallery component="label" />`
- **Notes → 架构与对标差异**：6 维度对比表
- **Notes → 运行时注意事项**：3 条（独立使用、禁用状态、双击行为）
- **FAQ**：4 条问答（关联输入框、不带 for 使用、禁用变暗、取消阻止选中）

### 3.4 Minor — 测试覆盖不足（已修复，D7-11）

**问题：** 原测试 4 项，缺少尺寸变体类名、双击阻止选中行为、HTML 属性转发验证。

**修复：** 测试从 4 项扩展到 10 项，新增覆盖：

| 套件          | 覆盖场景                                                   |
| :------------ | :--------------------------------------------------------- |
| rendering     | HTML 属性（`id`、`data-testid`）转发到 `<label>` 元素      |
| size variants | `md`（默认）/ `lg` / `xs` 尺寸类名验证                     |
| interaction   | 双击（`detail: 2`）阻止默认行为；单击（`detail: 1`）不阻止 |

---

## 四、重点检查项结论

| 检查项               | 结论 | 证据                                                                                                                 |
| :------------------- | :--: | :------------------------------------------------------------------------------------------------------------------- |
| **D1-14** ID 关联    |  ✅  | `for` prop 正确映射到原生 `<label for>`；测试验证 `for="email-input"` 出现在 `<label>` 元素上；playground bug 已修复 |
| **D3-01** 命名一致性 |  ✅  | `for`/`size`/`class` 命名规范；`for` 与 HTML 标准 `<label for>` 一致                                                 |
| **D7-05** 无障碍     |  ✅  | 原生 `<label>` 天然无障碍；`peer-disabled:opacity-50` 禁用态样式；axe-core 零违规；双击阻止选中不影响聚焦            |

---

## 五、变更文件清单

| 文件                                              | 变更类型                                                                                           |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------- |
| `packages/ui/src/components/label/label.vue`      | 修复：改用 `useOmitProps` + `v-bind` 转发模式（D5-12 / D1-10）；移除 `props.for` 模板引用（D5-14） |
| `apps/playground/src/examples/label/01-basic.vue` | 修复：`htms-for` → `for`（playground bug）                                                         |
| `packages/ui/test/specs/components/label.spec.ts` | 重写：4 项 → 10 项（属性转发、尺寸变体、双击阻止选中）                                             |
| `apps/docs/src/docs/en/components/label.md`       | 文档：新增 Features（6 条）+ Demos + Notes（架构对标表 + 运行时注意事项）+ FAQ（4 条）             |
| `apps/docs/src/docs/zh-CN/components/label.md`    | 文档：新增功能（6 条）+ 演示 + 注意事项（架构对标表 + 运行时注意事项）+ 常见问题（4 条）           |
| `docs/check.md`                                   | 标记 C07 各维度为 ✅                                                                               |

---

## 六、验证命令

```bash
# 单元测试（10 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/label.spec.ts
# → Test Files 1 passed (1) | Tests 10 passed (10)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C07，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
