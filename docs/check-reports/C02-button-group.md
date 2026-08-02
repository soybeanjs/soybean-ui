# C02 `button-group` 检查优化报告

> **组件编号：** C02（与 C01 `button` 共享同一组件目录 `packages/ui/src/components/button/`）
> **组件名称：** `button-group` / `SButtonGroup`（UI）/ `ButtonGroup`（headless）
> **模式：** 单类（`buttonGroupVariants` 直接消费，无 UiContext；通过 `provideButtonGroupContext` 转发样式属性）
> **优先级：** P1
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7（105 项）

---

## 一、执行摘要

对 `button-group`（C02）完成全维度审计。C01 报告曾声明覆盖 C02，但本次专项审计发现 C01 遗留 1 项 Blocker 级问题（`button-group` 是项目中唯一缺少 headless 实现的分组组件，导致 `role="group"`、`data-soybean-button-group`、`data-orientation` 全部缺失）和 1 项 Minor 级问题（`fitContent` 属性泄漏到 DOM）。本次创建 headless `ButtonGroup` 组件，重构 UI 包装器，补充 7 项测试，整体达到可验收状态。

|    维度     | 状态 | 说明                                                                                            |
| :---------: | :--: | :---------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 新建 headless `ButtonGroup`，补齐 `role="group"`/`data-orientation`/`data-soybean-button-group` |
| D2 行业对标 |  ✅  | context 转发 + 子组件优先级机制与主流库对齐或领先                                               |
| D3 API 设计 |  ✅  | `ButtonGroupProps` 拆分为 headless（逻辑）+ UI（样式）两层；命名规范一致                        |
| D4 类型系统 |  ✅  | strict 通过；UI `ButtonGroupProps` 正确 extends headless `_ButtonGroupProps`                    |
| D5 代码规范 |  ✅  | script setup 顺序正确；模板无 `props.xxx`；无内联箭头函数                                       |
|   D6 文档   |  ✅  | zh/en button.md 已含 SButtonGroup FAQ；API 数据已重新生成                                       |
|   D7 其他   |  ✅  | 14 项 SButtonGroup 测试通过；axe-core 零违规；SSR 安全                                          |

---

## 二、行业对标矩阵（D2-02 / D2-05 / D2-11）

| 能力                                  | SoybeanUI | Ant Design | Element Plus | MUI  | Mantine | Naive UI | shadcn/ui |
| :------------------------------------ | :-------: | :--------: | :----------: | :--: | :-----: | :------: | :-------: |
| 水平/垂直方向                         |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| `role="group"` 语义                   |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 向子按钮转发 `color`/`size`/`variant` |    ✅     |     —      |      —       |  —   |    —    |    —     |    ✅     |
| 向子按钮转发 `disabled`               |    ✅     |     ✅     |      ✅      |  ✅  |   ✅    |    ✅    |    ✅     |
| 子组件 prop 优先于 group 值           |    ✅     |     —      |      —       |  —   |    —    |    —     |    ✅     |
| `as`/`asChild` 多态                   |    ✅     |     —      |      —       |  ✅  |    —    |    —     |    ✅     |
| RTL 支持（`dir` + 逻辑属性）          |    ✅     |     ✅     |      ✅      |  ✅  | 不完整  |  不完整  |  不完整   |
| Headless/Styled 分离                  |    ✅     |     —      |      —       | 部分 |    —    |    —     |    ✅     |

**增强项（➕）：**

- `SButtonGroup` 通过 `provideButtonGroupContext` 向后代透传 `color`/`size`/`variant`/`shape`/`shadow`/`disabled`/`fitContent`，且子组件自身 prop 优先级更高——优于 Ant Design / Element Plus / MUI / Mantine / Naive UI（均不支持 group 级别批量设置样式变体）。
- RTL 支持通过 `dir` prop + `ConfigProvider` + UnoCSS 逻辑属性（`border-e-0`/`rounded-s-0`/`rounded-e-0`），领先于 Mantine / Naive UI / shadcn/ui（均不完整）。

---

## 三、发现的问题与处理

### 3.1 Blocker — 缺少 headless `ButtonGroup` 实现（已修复）

**问题：** `button-group` 是项目中 **唯一** 缺少 headless 实现的分组组件。项目中所有其他分组组件（`toggle-group`、`radio-group`、`input-number`、`toolbar`、`tabs-list`、`stepper`、`tags-input`、`date-field`、`color-field` 等 13 个）均在 headless 层拥有 `role="group"` + `data-orientation` + `data-soybean-{name}` 属性。`button-group` 此前三项全部缺失，违反：

- **D1-02**（headless 责任边界）：a11y 语义（`role="group"`）未在 headless 层提供
- **D1-07**（`data-soybean-{name}`）：根元素缺少 `data-soybean-button-group`
- **D1-08**（状态反射）：`orientation` 状态未通过 `data-orientation` 反射
- **D7-05**（a11y 自动扫描）：屏幕阅读器无法识别分组语义

**根因：** 原 `SButtonGroup` 直接在 UI 层使用 `Primitive`，跳过了 headless 层，导致 a11y 语义无处安放。

**修复：** 创建 headless `ButtonGroup` 组件，重构 UI 包装器：

| 层级     | 文件                                                       | 变更                                                                                                                    |
| :------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| headless | `packages/headless/src/components/button/button-group.vue` | **新建**：`Primitive` + `role="group"` + `:data-orientation="orientation"` + `data-soybean-button-group` + `:dir="dir"` |
| headless | `packages/headless/src/components/button/types.ts`         | **新增** `ButtonGroupProps`（`orientation`/`dir`/`as`/`asChild` + `HTMLAttributes`）                                    |
| headless | `packages/headless/src/components/button/index.ts`         | 导出 `ButtonGroup` 组件 + `ButtonGroupProps` 类型                                                                       |
| UI       | `packages/ui/src/components/button/types.ts`               | `ButtonGroupProps` 改为 extends headless `_ButtonGroupProps` + 样式属性                                                 |
| UI       | `packages/ui/src/components/button/button-group.vue`       | 从 `Primitive` 改为包装 headless `ButtonGroup`；`:orientation`/`:dir` 显式传递                                          |

### 3.2 Minor — `fitContent` 属性泄漏到 DOM（已修复）

**问题：** `useOmitProps` 列表缺少 `fitContent`，导致该样式属性通过 `v-bind="forwardedProps"` 泄漏到 DOM（渲染为 `fitcontent="true"`）。

**修复：** 在 `useOmitProps` 列表中添加 `'fitContent'` 和 `'dir'`（`dir` 现由 headless 层渲染，无需在 UI 层转发）。

### 3.3 Minor — `ButtonGroupProps` 不恰当地继承 `ButtonProps`（已修复）

**问题：** 原 UI `ButtonGroupProps extends ButtonProps`，导致 `type`（button/submit/reset）属性出现在分组容器上——这在语义上不正确（分组容器不是按钮）。

**修复：** `ButtonGroupProps` 改为 extends headless `_ButtonGroupProps`，移除了 `type` 属性的继承。`disabled` 保留（用于转发给子按钮）。

### 3.4 测试增强（D7-11）

新增 7 项 SButtonGroup 测试：

| 测试                                              | 覆盖场景                                                                |
| :------------------------------------------------ | :---------------------------------------------------------------------- |
| `sets role="group" on the root element`           | D1-08：`role="group"` 存在                                              |
| `carries the data-soybean-button-group attribute` | D1-07：`data-soybean-button-group` 存在                                 |
| `reflects orientation via data-orientation`       | D1-08：`data-orientation` 随 `orientation` 变化                         |
| `reflects dir prop on the root element`           | D1-13：`dir` 属性正确渲染                                               |
| `does not leak style props to the DOM`            | 回归测试：`color`/`fitContent`/`shape`/`variant`/`shadow`/`size` 不泄漏 |
| `supports \`as\` polymorphism`                    | D7-14：`as="div"` 多态渲染                                              |
| `has no a11y violations`                          | D7-05：axe-core 零违规                                                  |

SButtonGroup 测试从 7 项扩展到 **14 项**；button 家族总测试从 34 项扩展到 **41 项**。

---

## 四、重点检查项结论

| 检查项                      | 结论 | 证据                                                                                         |
| :-------------------------- | :--: | :------------------------------------------------------------------------------------------- |
| **D1-09** 样式配方完整性    |  ✅  | `packages/ui/src/styles/button.ts` 首行 `// @unocss-include`；`buttonGroupVariants` 无 slots |
| **D3-05** 事件 payload 一致 |  ✅  | `button-group` 无自定义事件，仅通过 context 转发样式属性；子按钮 `click` payload 不变        |
| **D7-15** `class` 覆盖      |  ✅  | `buttonGroupVariants({ orientation }, props.class)` 支持 `class` 覆盖 root                   |

---

## 五、变更文件清单

| 文件                                                       | 变更类型                                                                                              |
| :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/button/button-group.vue` | **新建**：headless `ButtonGroup`（`role="group"` + `data-orientation` + `data-soybean-button-group`） |
| `packages/headless/src/components/button/types.ts`         | 新增 `ButtonGroupProps`（`orientation`/`dir`/`as`/`asChild`）                                         |
| `packages/headless/src/components/button/index.ts`         | 导出 `ButtonGroup` + `ButtonGroupProps`                                                               |
| `packages/ui/src/components/button/types.ts`               | `ButtonGroupProps` 改为 extends headless `_ButtonGroupProps`                                          |
| `packages/ui/src/components/button/button-group.vue`       | 重构：包装 headless `ButtonGroup`；修复 `fitContent`/`dir` 泄漏                                       |
| `packages/ui/test/specs/components/button.spec.ts`         | 新增 7 项 SButtonGroup 测试（共 14 项）                                                               |
| `packages/headless/src/constants/components.ts`            | 生成：`pnpm sui headless`                                                                             |
| `packages/headless/src/namespaced/index.ts`                | 生成：`pnpm sui headless`                                                                             |
| `apps/docs/src/generated/api/button.json`                  | 生成：`pnpm sui api`                                                                                  |
| `apps/docs/src/generated/api-locales/zh-CN.json`           | 生成：`pnpm sui api-translate -- --locale zh-CN`                                                      |

---

## 六、验证命令

```bash
# 单元测试（41 项全通过，含 14 项 SButtonGroup）
cd packages/ui && pnpm vitest run test/specs/components/button.spec.ts
# → Test Files 1 passed (1) | Tests 41 passed (41)

# 全量测试（无回归）
pnpm test
# → Test Files 106 passed (106) | Tests 801 passed (801)

# 类型检查（全工作区通过）
pnpm typecheck
# → vue-tsc --noEmit --skipLibCheck  无错误

# Lint
pnpm exec vp lint packages/headless/src/components/button/ packages/ui/src/components/button/
# → Found 0 warnings and 0 errors.
pnpm exec eslint packages/headless/src/components/button/button-group.vue packages/ui/src/components/button/button-group.vue --ext .vue
# → 无输出（无错误）
```

---

## 七、后续建议

1. **跨组件一致性：** 其他分组组件（`toggle-group`、`radio-group` 等）的 `dir` 属性目前需用户手动传入，而 `button-group` 通过 `useConfigProvider('ButtonGroup')` 自动拾取。可考虑在后续轮次统一此行为。
2. **P3 增强：** 可在 e2e spec 中补充 `SButtonGroup` 的 RTL 布局断言（验证 `dir="rtl"` 时边框圆角方向正确翻转）。

---

_报告生成于组件审计工作流 C02，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
