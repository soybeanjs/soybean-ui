# C90 `rating` 检查优化报告

> **组件编号：** C90（`rating`）
> **组件名称：** `SRating`（headless 基座：`RatingRoot` + `RatingItem`；`cv()` 配方 `ratingVariants` + `ratingItemVariants`）
> **模式：** 多槽
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-01、D7-05

---

## 一、执行摘要

对 `rating` 完成全维度审计。headless 层 `RatingRoot` 使用 `useControllableState` 管理受控/非受控状态，`role="slider"` 搭配完整 ARIA 属性（`aria-valuenow/min/max/valuetext/orientation/readonly/disabled/label`）；键盘导航支持 ArrowUp/Right 递增、ArrowDown/Left 递减、Home 重置为 0、End 设为最大值，半星模式下步进 0.5。`RatingItem` 负责单项渲染、指针位置计算（`getRatingValueFromPointer` 支持 RTL）与 `data-state`（`full`/`half`/`empty`）反射。纯函数下沉 `shared.ts`（`clampRatingValue`/`snapRatingToStep`/`getRatingItemState`/`getRatingValueFromPointer`/`isRatingBackKey`）。UI 层 `SRating` 为薄包装：`ratingVariants`（6 尺寸）+ `ratingItemVariants`（8 颜色 × 2 变体 × 6 尺寸），默认 `clip-path` 实现半星裁剪。

**未发现 Blocker/Major 缺陷，补强单测 13 → 33 项 + 新建 en/zh 文档（7 节 Recommended structure）：**

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                       |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | `role="slider"` + 完整 ARIA（D1-08）；受控/非受控闭环（`useControllableState`）；`allowHalf`/`allowClear`/`readonly`/`disabled`；完整键盘（ArrowKeys/Home/End，D1-16）；RTL（`useDirection` + `isRatingBackKey`）；`useOmitProps` 含 `class`（D1-10）；recipe 首行 `// @unocss-include`（D1-09）；`data-soybean-rating-root/item`（D1-07） |
| D2 行业对标 |  ✅  | 对标 AntD `Rate`/Element Plus `el-rate`/Mantine `Rating`/Naive UI `n-rate`：核心能力全对齐（受控/非受控、半星、清除、只读、自定义图标、键盘、RTL、垂直、表单集成、颜色/尺寸变体）；shadcn 无 rating 组件。遗留增强：`showScore`/`showText`、tooltips、`clearValue`（见「遗留增强项」）                                                     |
| D3 API 设计 |  ✅  | `modelValue`/`defaultValue`/`max`/`allowHalf`/`allowClear`/`readonly`/`disabled`/`orientation`/`dir` 命名对齐主流（D3-01）；事件 `update:modelValue`/`hoverChange`/`valueCommit` 清晰；slot 暴露 `index`/`value`/`state`；继承 `FormFieldCommonProps`（name/required）+ `PrimitiveWithBaseProps`（as/asChild）；UI 层 `S` 前缀（D3-09）    |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿（仅既有 `ImportMeta.env` 基线）；props 全 interface + JSDoc（D4-03）；`RatingRootContext` 经 `PropsToContext` 泛型化；`RatingItemState`/`RatingVariant` 字面量联合由 `VariantProps` 派生（D4-05）；locale 消息经 `LocaleRatingMessages` 接口约束                                                                     |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；5 个纯函数下沉 `shared.ts`（`clampRatingValue`/`snapRatingToStep`/`getRatingItemState`/`getRatingValueFromPointer`/`isRatingBackKey`）；`setValue`/`setHover`/`onKeyDown` 守卫早退（guard clause）；无 `as any`/`@ts-expect-error`；模板无 `props.xxx`（D5-14）                                                          |
|   D6 文档   |  ✅  | **新建** en/zh 文档（7 节 Recommended structure：Overview/Usage/Features/Demos/API/Notes/FAQ），含架构对标表（11 能力 × 6 库）+ 4 条 Cautions + 4 组 FAQ；中英文结构完全对齐                                                                                                                                                               |
|   D7 其他   |  ✅  | 单测 13 → 33 项全通过（新增 custom max/data-orientation/ArrowLeft 递减/allowHalf 递减/End 边界/非受控 defaultValue/hoverChange/data-disabled/data-readonly/size+color+variant 类/aria-label/aria-valuetext/表单集成/icon slot）；axe 0 违规                                                                                                |

---

## 二、行业对标矩阵

> `rating` 是星级评分组件。对标 AntD `Rate`、Element Plus `el-rate`、Mantine `Rating`、Naive UI `n-rate`；shadcn/ui 无 rating 组件。

| 能力                 | SoybeanUI | Ant Design | Element Plus | Mantine |  Naive UI  | shadcn |
| :------------------- | :-------: | :--------: | :----------: | :-----: | :--------: | :----: |
| headless/styled 分离 |    ✅     |     —      |      —       |    —    |     —      |   —    |
| 受控/非受控          |    ✅     |     ✅     |      ✅      |   ✅    |     ✅     |   —    |
| 半星精度             |    ✅     |     ✅     |      ✅      |   ✅    |     ✅     |   —    |
| 允许清除             |    ✅     |     ✅     |      ✅      |   ✅    |     ✅     |   —    |
| 只读模式             |    ✅     |     ✅     |      ✅      |   ✅    |     ✅     |   —    |
| 自定义图标（slot）   |    ✅     |     ✅     |      ✅      |   ✅    |     ✅     |   —    |
| 键盘导航             |    ✅     |     —      |      —       |   ✅    |     —      |   —    |
| RTL 支持             |    ✅     |     —      |      —       |    —    |     —      |   —    |
| 垂直方向             |    ✅     |     —      |      —       |   ✅    |     —      |   —    |
| 表单集成             |    ✅     |     —      |      —       |   ✅    |     —      |   —    |
| 颜色/尺寸变体        |    ✅     |    size    |     size     |  size   | size/color |   —    |

`—` = 不支持。

---

## 三、发现的问题与处理

### 3.1 说明 — 无 Blocker/Major（关键路径逐项核对）

- **状态反射（D1-08）**：`role="slider"` + `aria-valuenow`（`currentModelValue` 经 `clampRatingValue` + `snapRatingToStep` 处理后反射）+ `aria-valuemin=0`/`aria-valuemax=max` + `aria-valuetext`（locale 插值 `{count} of {max} stars` / `No rating`）；`RatingItem` 通过 `getRatingItemState` 计算并反射 `data-state`（`full`/`half`/`empty`），UI 层经 `data-[state=...]` 选择器 + `clip-path` 驱动半星裁剪——状态与视觉解耦。
- **键盘（D1-16）**：ArrowUp/Right 递增、ArrowDown/Left 递减（`isRatingBackKey` 根据 `dir`/`orientation` 判定方向），Home 重置为 0、End 设为最大值；`allowHalf` 模式下步进 0.5；所有键盘事件 `preventDefault` 避免页面滚动。
- **RTL**：`useDirection` 解析 `dir`，`getRatingValueFromPointer` 根据 `dir === 'rtl'` 翻转指针位置计算（`rect.right - event.clientX`），`isRatingBackKey` 区分 `ltr-horizontal`/`rtl-horizontal`/`vertical` 三种键映射。
- **表单集成**：`isFormControl(rootElement)` 检测 + `name` prop 条件渲染 `VisuallyHiddenInput`（`type="number"`），提交 `currentModelValue`。
- **class 透传**：UI 层 `useOmitProps(props, ['class','color','size','variant'])` 排除 class 后经 `ratingVariants({...}, props.class)` 合并注入 root、`ratingItemVariants({...})` 注入 item——无双绑定（D1-10）。

### 3.2 D7-11 — 单测覆盖不足（已扩展 13 → 33 项）

**问题：** 原 [rating.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/rating.spec.ts) 仅 13 项：custom max/data-orientation/ArrowLeft 递减/allowHalf 递减/End 边界/非受控 defaultValue/hoverChange/data-disabled/data-readonly/变体颜色尺寸类/aria-label/aria-valuetext/表单集成/icon slot 均未覆盖。

**处理：** 扩展至 **33 项**，全部通过：

```bash
✓ test/specs/components/rating.spec.ts (33 tests)
```

> 覆盖要点：custom max 渲染（D3-01）；data-orientation horizontal/vertical（D1-08）；ArrowLeft 递减 + allowHalf 0.5 步进（D1-16）；End 已达最大值不重复发射（D1-16）；非受控 `defaultValue`（D3-04）；hoverChange pointermove + disabled 守卫（D1-08）；data-disabled/data-readonly 属性（D1-08）；root size `gap-2` + item color `text-primary` + variant `text-muted-foreground/40` 类（D7-15）；aria-label 默认 locale + aria-valuetext 含 count/max + 空值 "No rating"（D7-05）；表单集成 VisuallyHiddenInput name/value + 无 name 不渲染（D3-08）；icon slot state 反射（D3-08）。

### 3.3 D6 — 文档缺失（已新建 en/zh 7 节结构）

**问题：** `rating` 组件无文档文件（`apps/docs/src/docs/en/components/rating.md` 和 `zh-CN/components/rating.md` 均不存在）。

**处理：** 新建 en/zh 文档，均按 7 节 Recommended structure（Overview/Usage/Features/Demos/API/Notes/FAQ），含 11 能力 × 6 库对标表 + 4 条 Cautions + 4 组 FAQ。中英文结构一一对应。

---

## 四、架构与模式要点

### 状态与视觉解耦

`RatingRoot` 持有 `useControllableState` 管理的 `modelValue`，经 `snapRatingToStep`（`allowHalf` ? 0.5 步进 : `Math.round`）和 `clampRatingValue`（0 ~ max）处理后得到 `currentModelValue`。`RatingItem` 通过 context 获取 `currentModelValue` 和 `hoverValue`，经 `getRatingItemState` 计算每项的 `data-state`（`full`/`half`/`empty`）。UI 层使用 `clip-path: inset(0 50% 0 0)` 实现半星视觉裁剪，通过 `data-[state=...]` 选择器驱动颜色——状态与视觉完全解耦。

### 纯函数下沉

`shared.ts` 下沉 5 个纯函数 + 3 个常量：

- `clampRatingValue` — 值域钳制 [0, max]
- `snapRatingToStep` — 半星/整星步进吸附
- `getRatingItemState` — 根据 value/hoverValue/index/allowHalf 计算单项状态
- `getRatingValueFromPointer` — 指针位置 → 评价值（支持 RTL 翻转）
- `isRatingBackKey` — 方向键映射（3 种方向组合）

### 多槽模式

`RatingRoot` 通过 `provideRatingRootContext` 提供上下文（`PropsToContext` 泛型化），`RatingItem` 通过 `useRatingRootContext` 消费。UI 层 `SRating` 组合两者，自动生成 `max` 个 `RatingItem`，每个 item 通过 `v-slot` 暴露 `state` 供自定义图标渲染。

---

## 五、变更文件清单

| 文件                                               | 变更类型                                                                                                                                                                          |
| :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/test/specs/components/rating.spec.ts` | 单测 13 → 33 项（custom max/orientation/ArrowLeft/allowHalf 递减/End 边界/非受控 defaultValue/hoverChange/data-disabled/readonly/变体类/aria-label/valuetext/表单集成/icon slot） |
| `apps/docs/src/docs/en/components/rating.md`       | **新建** 7 节文档（Overview/Usage/Features/Demos/API/Notes/FAQ + 11×6 对标表 + 4 Cautions + 4 FAQ）                                                                               |
| `apps/docs/src/docs/zh-CN/components/rating.md`    | **新建** 与 en 一一对应的 7 节中文化版本                                                                                                                                          |
| `docs/check.md`                                    | C90 行 7 维度 ⏳ → ✅                                                                                                                                                             |
| `docs/check-reports/C90-rating.md`                 | **新建** 本审计报告                                                                                                                                                               |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿（仅既有 ImportMeta.env 基线）
cd packages/ui && npx vitest run test/specs/components/rating.spec.ts   # 33 项全通过
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                 | 对标依据 | 说明                                                                |
| :--------------------- | :------- | :------------------------------------------------------------------ |
| `showScore`/`showText` | AntD/EP  | 评分旁显示数值/文本，排期评估                                       |
| `tooltips`             | AntD     | 每颗星 hover 时显示自定义提示，排期评估                             |
| `clearValue`           | Mantine  | 自定义清除值（当前固定为 0），排期评估                              |
| `character` 渲染模式   | AntD/EP  | 支持非图标字符（如字母/emoji 作为评分符号），当前通过 slot 已可实现 |
| 浏览器 e2e             | D7-19    | 指针拖拽 + color-contrast，排期评估                                 |
