# C28 `textarea` 检查优化报告

> **组件编号：** C28（`textarea`）
> **组件名称：** `STextarea`（headless 基座：`TextareaCompact` 聚合 `TextareaRoot`/`TextareaControl`/`TextareaClear`/`TextareaCounter`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `textarea` 完成全维度审计。组件为「多槽 + Compact」模式：headless `TextareaCompact` 组合 `TextareaRoot`（受控/非受控、表单代理）/`TextareaControl`（原生 textarea + autosize）/`TextareaClear`/`TextareaCounter`，自动增高测量收敛到 `shared.ts` 纯函数（`adjustHeight`/`calculateLineHeight`）。UI 层 `STextarea` 仅做配方与插槽转发。

**发现 Major ×1（已修复）**——autosize 触发源单一：

|    维度     | 状态 |                                                                                                                                                           说明                                                                                                                                                            |
| :---------: | :--: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                    多槽 + Compact 正确：headless 持有状态/自动增高/表单代理/ARIA；受控/非受控（`useControllableState`）、autosize（`minRows`/`maxRows`）、maxlength/minlength、disabled/readonly、`clear`/`counter`/`footer` 插槽完整                                                     |
| D2 行业对标 |  ✅  |                                                              对标 AntD/Element Plus/Radix `TextArea`：`autosize`（布尔或 `{minRows,maxRows}`）API 对齐 AntD/EP；字符计数/清除按钮/resize 控制/表单代理齐全；`error` 态与 `change` 事件列为遗留增强（D2-11）                                                               |
| D3 API 设计 |  ✅  |                                                               `modelValue`/`defaultValue`、`autosize`/`autosizeOptions`、`maxlength`/`minlength`、`disabled`/`readonly`、`clearable`、`showCounter` 命名与主流库一致；事件 `update:modelValue`/`clear` 清晰                                                               |
| D4 类型系统 |  ✅  |                                                             `TextareaRootProps`/`CompactProps`/`Slots` 层级清晰；`TextareaControlProps extends BaseProps<TextareaHTMLAttributes>`；`TextareaRootContext` 用 `PropsToContext` 刻画；JSDoc 覆盖完整；无类型逃逸                                                             |
| D5 代码规范 |  ✅  |                                                                                      `eslint` 0 errors；`useOmitProps` 含 `class`；autosize 测量纯函数独立（`shared.ts`）；模板无 `props.xxx`/内联箭头；`defineOptions` 紧接 imports                                                                                      |
|   D6 文档   |  ✅  |                                                                          en/zh 文档结构对齐（Overview/Usage/Features/Component family/Demos/API/Notes/FAQ）；Notes 含架构对标表 + 运行时注意 + FAQ 4 组；明确标注 `error`/`change`/`IME` 遗留项                                                                           |
|   D7 其他   |  ✅  | **Major 修复**：autosize watch 由仅监听 `modelValue` 改为监听 `[modelValue, autosizeOptions]`，运行期切换 `autosize`/`minRows`/`maxRows` 也会重测高度；data 属性遵循 D1-07（`data-soybean-textarea-*`）；SSR 安全；ARIA（`aria-roledescription`/清除按钮 i18n 标签）axe 零违规；**26 项单测通过** + e2e 覆盖真实 autosize |

---

## 二、行业对标矩阵

> `textarea` 是**多行文本输入**模式。AntD/Element Plus `Input.TextArea` 与 Radix `TextArea` 为对标对象。

| 能力                      | SoybeanUI | AntD `TextArea` | Element Plus | Radix `TextArea` |
| :------------------------ | :-------: | :-------------: | :----------: | :--------------: |
| `autosize`（min/maxRows） |    ✅     |       ✅        |      ✅      |        ❌        |
| 字符计数                  |    ✅     |       ✅        |      ✅      |        ❌        |
| 清除按钮                  |    ✅     |       ✅        |      ✅      |        ❌        |
| `resize` 控制             |    ✅     |       ❌        |      ✅      |        —         |
| 原生表单代理              |    ✅     |        —        |      —       |        —         |
| `error` 态                |     —     |       ✅        |      ✅      |        —         |
| `change` 事件             |     —     |       ✅        |      ✅      |        ✅        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — autosize 触发源单一（D1）

**现象：** [textarea-control.vue](../../packages/headless/src/components/textarea/textarea-control.vue) 的 autosize `watch` 仅监听 `modelValue`。若运行期动态切换 `autosize`（false→true）或改变 `minRows`/`maxRows`，高度不会立即重算，直到下次输入才校正。

**修复：** watch 改为 `[modelValue, autosizeOptions]`，使 `autosizeOptions`（含 `minRows`/`maxRows`/开关）变化时也会在 `nextTick` 后重测高度。

### 3.2 核查结论（非缺陷）

- **D5 纯函数**：`adjustHeight`/`calculateLineHeight` 独立于 `shared.ts`，SSR 时 `textareaRef` 为 null 短路。
- **D2-05 对标**：`error` 态、`change` 事件、IME 组合处理未实现，文档已明确标注为遗留增强项。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/textarea.spec.ts`：**26 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 源码仅改 `textarea-control.vue` watch 源，无新增类型风险。

## 五、遗留增强项（非阻塞，排期）

| 增强项              | 对标依据 | 说明                                                                     |
| :------------------ | :------- | :----------------------------------------------------------------------- |
| `error` 态          | D2-05    | 对标 AntD/Element Plus 错误态视觉/交互，排期评估                         |
| `change` 事件 / IME | D2-05    | 原生 `change`（blur 触发）与 IME 组合处理，排期评估                      |
| 宽度 ResizeObserver | D1-09    | 容器宽度变化导致换行变化时高度滞后，建议补 ResizeObserver 重测，排期评估 |
