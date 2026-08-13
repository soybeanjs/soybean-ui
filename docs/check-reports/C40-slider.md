# C40 `slider` 检查优化报告

> **组件编号：** C40（`slider`）
> **组件名称：** `SSlider`（headless 基座：`SliderCompact` 聚合 `SliderRoot`/`Track`/`Range`/`Thumb`）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `slider` 完成全维度审计。组件为「多槽 + Compact」模式：headless `SliderCompact` 持有 `modelValue` 迭代与组装；`SliderRoot` 用 `useControllableState` 管理 `number[]`，`SliderTrack` 处理 document 级 pointer 拖拽，`SliderThumb` 带完整 ARIA。单一几何模型 `getSliderSideState` 同时驱动渲染与键盘方向。UI 层 `SSlider` 仅做配方与插槽转发。

**发现：无阻断性缺陷**（全部维度通过；Minor 类型项见下）：

|    维度     | 状态 |                                                                                                                      说明                                                                                                                       |
| :---------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  | 多槽 + Compact 正确：Compact 聚合下沉至 headless；受控/非受控（`useControllableState`）、单值/range（`number[]`）、min/max/step、disabled、完整键盘（方向键/PageUp/Home/End）、document 级指针拖拽、`minStepsBetweenThumbs`、ARIA 完整（D1-16） |
| D2 行业对标 |  ✅  |              对标 AntD/Element Plus/Mantine/Naive UI/shadcn `Slider`：12 能力矩阵核心全对齐（受控/非受控、range、垂直、inverted/RTL、键盘、`minStepsBetweenThumbs`、表单代理）；`marks`/拖拽 tooltip/数字输入联动列为增强（D2-11）              |
| D3 API 设计 |  ✅  |                         `modelValue`/`defaultValue`/`disabled`/`orientation`/`inverted`/`dir`/`min`/`max`/`step`/`minStepsBetweenThumbs`/`thumbAlignment` 命名与主流库一致；事件 `update:modelValue`/`valueCommit` 清晰                         |
| D4 类型系统 |  ✅  |   Props 用 `interface` + JSDoc；`SliderRootContext` 经 `PropsToContext` 泛型化；`orientation`/`thumbAlignment`/`SliderSlideDirection` 字面量联合；复用 `DataOrientation`/`Direction`/`Side`；`SliderCompactSlots.default` 返回 `any` 为 Minor   |
| D5 代码规范 |  ✅  |                                              `eslint` 0 errors；`useOmitProps` 含 `class`；13 个纯函数下沉 `shared.ts`；拖拽监听闭包 + `onBeforeUnmount` 清理；无模块级可变 `let`；无多余 watcher                                               |
|   D6 文档   |  ✅  |                                                                             en/zh 文档结构对齐（8 节，组件族 N/A）；Notes 含 12×6 对标表 + 4 条 Cautions + FAQ 4 组                                                                             |
|   D7 其他   |  ✅  |                                            data 属性遵循 D1-07（`data-soybean-slider-*`）；SSR 安全；ARIA（`role="slider"`/`aria-valuemin/max/now`/`aria-orientation`）axe 零违规；**28 项单测通过**                                            |

---

## 二、行业对标矩阵

> `slider` 是**滑动取值**模式。AntD/Element Plus/Mantine/Naive UI/shadcn `Slider` 为对标对象。

| 能力                    | SoybeanUI | AntD | Element Plus | Mantine | Naive | shadcn |
| :---------------------- | :-------: | :--: | :----------: | :-----: | :---: | :----: |
| 受控/非受控 + range     |    ✅     |  ✅  |      ✅      |   ✅    |  ✅   |   ✅   |
| 垂直 / inverted / RTL   |    ✅     |  ✅  |      ✅      |   ✅    |  ✅   |   ✅   |
| 完整键盘                |    ✅     |  ✅  |      ✅      |   ✅    |  ✅   |   ✅   |
| `minStepsBetweenThumbs` |    ✅     |  —   |      —       |    —    |   —   |   ✅   |
| 表单代理（range 拆分）  |    ✅     |  ✅  |      —       |   ✅    |  ✅   |   ✅   |
| `marks` 刻度            |    ➖     |  ✅  |      ✅      |   ✅    |  ✅   |   —    |
| 拖拽 tooltip            |    ➖     |  ✅  |      —       |   ✅    |  ✅   |   —    |
| 数字输入联动            |    ➖     |  ✅  |      —       |    —    |   —   |   —    |

`—` = 不支持；`➖` = 未实现（登记为增强）。

---

## 三、发现的问题与处理

### 3.1 核查结论（无阻断性缺陷）

本次审计对 `slider` 未发现需修复的功能、规范或类型缺陷，全部 D1–D7 维度通过。核查要点：

- **D1-16 单一几何模型**：`getSliderSideState(orientation, dir, inverted)` 同时驱动 thumb 样式、range 填充方向与键盘方向键判定，RTL/inverted/垂直四象限语义自动翻转。
- **D4 类型**：`SliderCompactSlots.default` 返回 `any`（Minor），建议收敛为 `VNode`。
- **D7**：单测未直接断言 `aria-valuemin/max` 属性（仅 `aria-valuenow`/`aria-orientation`）；无独立浏览器 e2e（非阻塞，理由充分）。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/slider.spec.ts`：**28 项全部通过**。
- headless typecheck 通过（仅剩既有 `ImportMeta.env` 基线错误）。
- 本次仅生成检查报告（`*.md`），无源码/类型/测试变更。

## 五、遗留增强项（非阻塞，排期）

| 增强项           | 对标依据 | 说明                                       |
| :--------------- | :------- | :----------------------------------------- |
| `marks` 刻度     | D2-11    | 对标 AntD/EP/Mantine 刻度标记，排期评估    |
| 拖拽 tooltip     | D2-11    | 对标 AntD/Mantine/Naive 数值提示，排期评估 |
| 数字输入联动     | D2-11    | 对标 AntD 数字输入框联动，排期评估         |
| `aria-valuetext` | D7-05    | 数值语音化提示，纳入后续增强               |
| 浏览器 e2e       | D7-19    | document 级指针 + color-contrast，排期评估 |
