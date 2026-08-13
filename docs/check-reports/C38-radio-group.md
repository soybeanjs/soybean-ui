# C38 `radio-group` 检查优化报告

> **组件编号：** C38（`radio-group`）
> **组件名称：** `SRadioGroup` / `SRadioGroupCard`（headless 基座：`RadioGroupCompact`/`RadioGroupCardCompact` 聚合 `RadioGroupRoot`/`Item`/`Control`/`Indicator`/`Label`）
> **模式：** 多槽 + Compact
> **优先级：** P0
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-04、D7-05

---

## 一、执行摘要

对 `radio-group` 完成全维度审计。组件为「多槽 + Compact」模式：headless `RadioGroupCompact`/`RadioGroupCardCompact` 持有 items 迭代与默认组合；`RadioGroupRoot` 用 `useControllableState` 管理单选值，内嵌 `RovingFocusGroup` 提供键盘导航；`RadioGroupItem` 渲染原生 radio 代理。UI 层仅做配方与插槽转发。

**发现 Minor ×1（已修复）**——卡片 Compact 双转发：

|    维度     | 状态 |                                                                                                                                                                                                                 说明                                                                                                                                                                                                                 |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                                                                                                              多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useControllableState`）、单选互斥、disabled（组/条目合并）、roving-focus 键盘（方向键 + `loop`）、原生 radio 代理 + 表单代理完整（D1-08）                                                                                                               |
| D2 行业对标 |  ✅  |                                                                                                           对标 shadcn/Radix `RadioGroup`/AntD/Element Plus：headless 分离、roving-focus 键盘、受控/非受控、卡片变体（icon/描述，SoybeanUI 独有）、表单代理均达成；`button` variant/`Radio.Button` 组合子列为增强（D2-11）                                                                                                            |
| D3 API 设计 |  ✅  |                                                                                                                                 `modelValue`/`defaultValue`/`disabled`/`orientation`/`dir`/`loop`/`name`/`required` 命名与主流库一致；事件 `update:modelValue`/`select`（可取消自定义事件）语义清晰                                                                                                                                  |
| D4 类型系统 |  ✅  |                                                                                                                       泛型 `T extends RadioGroupOptionData`/`DefinedWithBooleanValue`；Props/Emits 用 `interface`；JSDoc 覆盖完整；无类型逃逸（`RadioGroupCardCompactSlots.description` 返回 `any` 为 Minor）                                                                                                                        |
| D5 代码规范 |  ✅  |                                                                                                                                 `eslint` 0 errors；`useOmitProps` 含 `class`；`transformPropsToContext` 包裹响应式；`RovingFocusGroup` 复用；`let isArrowKeyPressed` 模块级可变状态为 Minor（D5-06）                                                                                                                                 |
|   D6 文档   |  ✅  |                                                                                                                                                                 en/zh 文档结构对齐（8 节）；Notes 含架构对标表 + 运行时注意 + FAQ 4 组；`button` variant 已标注增强                                                                                                                                                                  |
|   D7 其他   |  ✅  | **Minor 修复**：[radio-group-card-compact.vue](../../packages/headless/src/components/radio-group/radio-group-card-compact.vue) 的 `useOmitProps` 补充排除 `contentProps`/`textContentProps`/`descriptionProps`（此前这些 props 既绑定到内部 div 又落到根节点，导致 class 重复绑定）；data 属性遵循 D1-07（`data-soybean-radio-group-*`）；SSR 安全；ARIA（`role="radiogroup"`/`radio`/`aria-checked`）axe 零违规；**17 项单测通过** |

---

## 二、行业对标矩阵

> `radio-group` 是**单选组**模式。shadcn/Radix `RadioGroup`、AntD/Element Plus 为对标对象。

| 能力                 | SoybeanUI | shadcn/Radix | AntD | Element Plus |
| :------------------- | :-------: | :----------: | :--: | :----------: |
| headless/styled 分离 |    ✅     |      ✅      |  —   |      —       |
| 单选互斥             |    ✅     |      ✅      |  ✅  |      ✅      |
| roving-focus 键盘    |    ✅     |      ✅      |  ✅  |      ✅      |
| 受控/非受控          |    ✅     |      ✅      |  ✅  |      ✅      |
| 卡片变体             |    ✅     |      —       |  —   |      —       |
| 表单代理             |    ✅     |      ✅      |  ✅  |      ✅      |
| `button` 变体        |    ➖     |      —       |  ✅  |      ✅      |

`—` = 不支持；`➖` = 未实现（登记为增强）。

---

## 三、发现的问题与处理

### 3.1 Minor — 卡片 Compact 双转发（D5）

**现象：** `radio-group-card-compact.vue` 的 `useOmitProps` 仅排除 `items/itemProps/controlProps/indicatorProps/labelProps`，未排除 `contentProps`/`textContentProps`/`descriptionProps`。这些 props 既被 `v-bind` 到内部内容元素，又会随 `forwardedProps` 落到 `RadioGroupRoot` 根节点，导致属性（尤其 class）重复绑定。

**修复：** `useOmitProps` 排除列表补充 `contentProps`/`textContentProps`/`descriptionProps`，与普通 Compact 一致。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 下沉**：`RadioGroupCompact`/`RadioGroupCardCompact` 在 headless 内完成 items 迭代与默认组合；UI 层仅转发配方与插槽。
- **D2-11 对标**：`button` variant/`Radio.Button` 组合子未实现，列为增强项。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/radio-group.spec.ts`：**17 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 改动：`radio-group-card-compact.vue`（补充 useOmitProps 排除项）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据 | 说明                                                                 |
| :-------------- | :------- | :------------------------------------------------------------------- |
| `button` 变体   | D2-11    | 对标 AntD/EP `Radio.Button` 组合子，排期评估                         |
| 浏览器 e2e spec | D7-19    | roving-focus 键盘 + color-contrast，排期评估                         |
| 卡片变体测试    | D7-11    | `SRadioGroupCard` 零覆盖，需补；键盘覆盖 ArrowUp/Left/Right/loop/RTL |
