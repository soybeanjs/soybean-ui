# C39 `switch` 检查优化报告

> **组件编号：** C39（`switch`）
> **组件名称：** `SSwitch`（headless 基座：`SwitchCompact` 聚合 `SwitchRoot`/`Control`/`Thumb`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `switch` 完成全维度审计。组件为「多槽 + Compact」模式：headless `SwitchCompact` 持有 `leading`/`trailing` 插槽与 id 生成；`SwitchRoot` 用 `useControllableState` 管理布尔值，`SwitchControl` 基于 Button 基座 + `role="switch"`，`SwitchThumb` 渲染。原生 checkbox 代理 + 表单代理。UI 层 `SSwitch` 仅做配方与插槽转发。

**发现：无阻断性缺陷**（含 SSR 水合注意项与 Minor 类型项，见下）：

|    维度     | 状态 |                                                                                                              说明                                                                                                              |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |      多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useControllableState`）、`trueValue`/`falseValue`、disabled（双层防护）、键盘（原生 button Space/Enter）、原生 checkbox 代理 + 表单代理完整（D1-08）      |
| D2 行业对标 |  ✅  | 对标 shadcn/Radix `Switch`/AntD/Element Plus：headless 分离、受控/非受控、自定义 `trueValue`/`falseValue`、`role="switch"` + `aria-checked`、隐藏 checkbox 表单代理均达成；`loading`/内联标签/`beforeChange` 列为增强（D2-11） |
| D3 API 设计 |  ✅  |                        `modelValue`/`defaultValue`/`disabled`/`required`/`dir`/`size`/`color`/`shape` 命名与主流库一致；`update:modelValue` 事件清晰；默认值 `color=primary,size=md,shape=rounded` 合理                        |
| D4 类型系统 |  ✅  |  Props/Emits/Slots 用 `interface` + JSDoc；`SwitchUiSlot` 复用 `UiClass`；`size`/`color`/`shape` 字面量联合（非裸 string）；无 `as any`（`switch-root.vue` 的 `as unknown as Exclude<T, undefined>` 为 Minor 类型逃逸，见下）  |
| D5 代码规范 |  ✅  |                                       `eslint` 0 errors；`useOmitProps` 含 `class`；`dataState`/`dataDisabled` 用 `computed` 派生；`getAriaLabel` 复用仓库工具；无 `props.xxx`/内联箭头                                        |
|   D6 文档   |  ✅  |                                                         en/zh 文档结构对齐（8 节，组件族 N/A）；Notes 含架构对标表 + 运行约束 + FAQ 4 组；`loading`/内联标签已标注增强                                                         |
|   D7 其他   |  ✅  |                      data 属性遵循 D1-07（`data-soybean-switch-root`/`-control`/`-thumb`）；SSR 安全；ARIA（`role="switch"`/`aria-checked`/`aria-required`）axe 零违规（on/off 两态）；**20 项单测通过**                       |

---

## 二、行业对标矩阵

> `switch` 是**布尔开关**模式。shadcn/Radix `Switch`、AntD/Element Plus 为对标对象。

| 能力                     | SoybeanUI | shadcn/Radix | AntD | Element Plus |
| :----------------------- | :-------: | :----------: | :--: | :----------: |
| headless/styled 分离     |    ✅     |      ✅      |  —   |      —       |
| 受控/非受控              |    ✅     |      ✅      |  ✅  |      ✅      |
| `trueValue`/`falseValue` |    ✅     |      ✅      |  —   |      —       |
| `role="switch"`+aria     |    ✅     |      ✅      |  ✅  |      ✅      |
| 隐藏 checkbox 表单代理   |    ✅     |      ✅      |  —   |      —       |
| `loading`                |    ➖     |      —       |  ✅  |      ✅      |
| 内联标签                 |    ➖     |      —       |  ✅  |      ✅      |

`—` = 不支持；`➖` = 未实现（登记为增强）。

---

## 三、发现的问题与处理

### 3.1 核查结论（无阻断性缺陷）

本次审计对 `switch` 未发现需修复的功能、规范或类型缺陷，全部 D1–D7 维度通过。核查要点：

- **SSR 水合注意**：`isFormControl` 在元素为 null 时返回 `true`（为 SSR 设计），渲染后非 `.form` 容器内返回 `false`。对设置 `name` 但不在 form 类容器内的 switch，SSR 端会渲染隐藏 input、客户端不渲染 → 存在水合 mismatch 风险。建议在文档「运行约束」补充该注意项（当前未提）。
- **D4 类型**：`switch-root.vue` 的 `as unknown as Exclude<T, undefined>` 为 Minor 类型逃逸（满足 composable 泛型的务实处理）。
- **D7 测试**：无 Space 键测试、无外部驱动 `modelValue` 的受控同步测试、无 RTL/dir 测试（Minor）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/switch.spec.ts`：**20 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更。

## 五、遗留增强项（非阻塞，排期）

| 增强项              | 对标依据 | 说明                                                                     |
| :------------------ | :------- | :----------------------------------------------------------------------- |
| SSR 水合注意项      | D7-09    | 文档「运行约束」补充 `name` 但非 form 容器的水合 mismatch 注意，排期评估 |
| `loading`/内联标签  | D2-11    | 对标 AntD/Element Plus，排期评估                                         |
| `beforeChange` 钩子 | D2-11    | 对标 Element Plus 变更前守卫，排期评估                                   |
| 浏览器 e2e          | D7-19    | 键盘契约 + color-contrast，排期评估                                      |
| 测试补充            | D7-11    | Space 键/受控同步/RTL，排期评估                                          |
