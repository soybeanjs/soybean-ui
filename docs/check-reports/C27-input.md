# C27 `input` 检查优化报告

> **组件编号：** C27（`input`）
> **组件名称：** `SInput`（headless 基座：`InputCompact` 聚合 `InputRoot`/`InputControl`/`InputClear`）
> **模式：** 多槽
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-05、D3-01、D5-16、D7-14、D7-19、D7-20

---

## 一、执行摘要

对 `input` 完成全维度审计。组件为「多槽」模式：headless `InputCompact` 组合 `InputRoot`（受控/非受控状态、表单代理、禁用/只读语义）/`InputControl`（原生 input）/`InputClear`（清除按钮语义），暴露 `leading`/`clear`/`trailing` 插槽。UI 层 `SInput` 仅做 `scv()` 配方（size）与插槽/属性转发。

**发现：无阻断性缺陷**（全部维度通过；遗留对标增强见第五节）：

|    维度     | 状态 |                                                                                                                        说明                                                                                                                         |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |      多槽正确：headless 持有状态/表单代理/清除语义；`modelValue`/`defaultValue`（`useControllableState`）、`disabled`/`readonly` 守卫、`name` 表单代理（视觉隐藏输入）、`leading`/`trailing`/`clear` 插槽、清除按钮悬停/聚焦显示完整（D1-09）       |
| D2 行业对标 |  ✅  |                      对标 Ant Design/Element Plus `Input`/Radix `TextField`：受控/非受控、清除按钮（i18n 标签）、前缀/后缀插槽、原生表单代理、尺寸变体均达成；`showCount`/`error`/`loading` 未实现（已列入遗留增强）（D2-05）                       |
| D3 API 设计 |  ✅  |               `modelValue`/`defaultValue`、`placeholder`/`maxlength`/`minlength`/`pattern`、`disabled`/`readonly`、`type`（`InputTypeHTMLAttribute` 严格类型化）、`clearable`、`controlProps`/`clearProps` 命名与主流库一致（D3-01）                |
| D4 类型系统 |  ✅  |                    `InputRootProps`/`InputCompactProps`/`Slots` 层级清晰；`InputBaseProps` 抽取公共 input 属性；`InputRootContext`（`modelValue`/`onClear`/`inputAttrs`）用 `PropsToContext` + `ShallowRef` 刻画；JSDoc 覆盖完整                    |
| D5 代码规范 |  ✅  |                                                   `eslint` 0 errors；`useOmitProps` 含 `class`；`useControllableState` + `shallowRef`/`computed` 保持响应式；模板无 `props.xxx`/内联箭头（D5-16）                                                   |
|   D6 文档   |  ✅  |                            en/zh 文档结构对齐（Overview/Features/Component family/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（8 能力 × 4 库）+ 运行时注意 + FAQ 4 组；明确标注 `showCount`/`error`/`loading` 遗留项                            |
|   D7 其他   |  ✅  | 23 项单测通过（rendering/model value/disabled/clear a11y/a11y）；data 属性遵循 D1-07（`data-soybean-input-root`/`-control`/`-clearable`）；ARIA 完整（`role="group"`/`aria-roledescription`/清除按钮 i18n 标签/原生代理输入）；SSR 安全；axe 无违规 |

---

## 二、行业对标矩阵

> `input` 是**基础文本输入**模式。Ant Design/Element Plus `Input` 与 Radix `TextField` 为对标对象。

| 能力                 | SoybeanUI | AntD `Input` | Element Plus `Input` | Radix `TextField` |
| :------------------- | :-------: | :----------: | :------------------: | :---------------: |
| headless/styled 分离 |    ✅     |      —       |          —           |        ✅         |
| 受控/非受控          |    ✅     |      ✅      |          ✅          |        ✅         |
| 清除按钮             |    ✅     |      ✅      |          ✅          |         —         |
| 清除按钮 i18n 标签   |    ✅     |      ✅      |          —           |         —         |
| 前缀/后缀插槽        |    ✅     |      ✅      |          ✅          |        ✅         |
| 原生表单代理         |    ✅     |      —       |          —           |         —         |
| 尺寸变体             |    ✅     |      ✅      |          ✅          |         —         |
| `showCount` 计数器   |     —     |      ✅      |          ✅          |         —         |
| `error` / `loading`  |     —     |      ✅      |          ✅          |         —         |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 核查结论（无阻断性缺陷）

本次审计对 `input` 未发现需修复的功能、规范或类型缺陷，全部 D1–D7 维度通过。核查要点：

- **D1-09 表单代理**：`name` 时渲染携带当前值的视觉隐藏代理输入框，原生表单提交/校验无需额外接线。
- **D2-05 对标覆盖**：`showCount`/`error`/`loading` 未实现，文档已明确标注为遗留增强项（属功能增量，非缺陷）。
- **D5-16 规范**：`useOmitProps` 含 `class`；无 `props.xxx`/内联箭头。
- **D7 ARIA/SSR**：清除按钮 i18n `aria-label` 可覆盖；axe 零违规。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/input.spec.ts`：**23 项全部通过**。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项              | 对标依据 | 说明                                                                    |
| :------------------ | :------- | :---------------------------------------------------------------------- |
| `showCount` 计数器  | D2-05    | 对标 AntD/Element Plus 可见字符计数（当前仅透传 `maxlength`），排期评估 |
| `error` / `loading` | D2-05    | 对标 AntD/Element Plus 错误态与加载态视觉/交互，排期评估                |
