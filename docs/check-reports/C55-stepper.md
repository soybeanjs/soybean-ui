# C55 `stepper` 检查优化报告

> **组件编号：** C55（`stepper`）
> **组件名称：** `SStepper`（headless 基座：`StepperRoot`/`StepperItem`/`StepperTrigger`/`StepperIndicator`/`StepperSeparator`/`StepperTitle`/`StepperDescription`/`StepperCompact`）
> **模式：** 多槽 + Compact（root/item/trigger/indicator/indicatorIcon/itemContent/separator/title/description 8 个 UI 槽）
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-04

---

## 一、执行摘要

对 `stepper` 完成全维度审计。核心链路：`StepperRoot` 用 `useControllableState` 统一受控/非受控，`getCollectionItemElements` 收集有序 trigger 集合并推导 `totalSteps`/`currentStep`；`canGoToStep` 以 `linear` 为门控（线性模式仅允许 `step <= currentStep + 1`）；`StepperItem` 按位置推导 `data-state`（`completed`/`active`/`inactive`）与 `isFocusable`，`StepperTrigger` 经 `useArrowNavigation`（`loop: false`、感知 `orientation`/`dir`）支持方向键/Home/End 导航；`StepperCompact` 聚合 7 个原语并暴露 6 个 `*Props` 通道；UI 层 `SStepper` `stepperVariants` 8 槽注入（7 色 × 7 尺寸）；根节点渲染 `role="group"` + 本地化 `aria-label` 回退 + `VisuallyHidden` 实时区域。

**发现 Major ×1 + Minor ×2**，均已修复（经探针验证定位）：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-12/D2-11）：UI 包装层 `linear` 布尔缺省被 Vue cast 为 `false` 并透传，覆盖 `StepperRoot` 的 `linear: true` 默认（SStepper 链路下未来步骤全部可聚焦、`data-linear` 缺失）→ 包装层 `withDefaults({ linear: true })` 镜像 headless 默认。**Minor 修复**（D1-08 硬编码英文）：实时区域 `Step {current} of {total}` 与 `aria-label` 回退硬编码 → `LocaleStepperMessages` 新增 `ariaLabel`/`stepOf` 经 `useLocaleMessages` 本地化（14 语言包同步） |
| D2 行业对标 |  ✅  | 线性门控、方向键导航、`completed`/`disabled` 逐项状态与 shadcn/ui stepper 区块同源；本地化实时区域与组 `aria-label` 超出 shadcn/ui（硬编码英文）；`StepperCompact` 复合 + 逐部件 props 超出主流库（AntD/Element Plus 仅声明式 Steps）                                                                                                                                                                                                                           |
| D3 API 设计 |  ✅  | `modelValue`/`defaultValue` 双通道 + `update:modelValue` 事件；根插槽暴露 `goToStep`/`nextStep`/`prevStep`/`hasNext`/`hasPrev`/`isNextDisabled`/`isPrevDisabled`/`isFirstStep`/`isLastStep`/`totalSteps`；`defineExpose` 同 API；`StepperCompact` 6 个 `*Props` 通道 + 5 槽 slot props 透传；`itemProps` 类型修正为 `Omit<StepperItemProps, 'step'>`（消除必填 `step` 的类型/运行时不一致，D3-01/D3-04）                                                        |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；spec 中 `iconRender: (icon: string)` 与 `IconValue`（含 `undefined`）不符 → `(icon: unknown)` + `String(icon)` 显式收窄（D4-05）；`itemProps` 声明修正消除类型谎报                                                                                                                                                                                                                                                                       |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；context 全部经 `transformPropsToContext` 响应式注入；7 个原语 `data-soybean-stepper-*` 数据属性齐备（D1-07）；探针文件删除（D5-15 隔离）                                                                                                                                                                                                                                            |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（8 能力 × 5 库）+ 6 条 Cautions + 6 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                                                                             |
|   D7 其他   |  ✅  | 单测 11 → 32 项全通过（渲染/状态/禁用/键盘导航/属性转发与插槽/本地化/无障碍，axe 0 违规）；`pnpm typecheck`/`pnpm lint` 全绿；源代码三处修改经全量单测回归无副作用（D7-09）                                                                                                                                                                                                                                                                                     |

---

## 二、行业对标矩阵

> `stepper` 是**线性门控状态机 + 有序集合导航**模式。shadcn/ui stepper 区块为同源设计（linear/orientation/status/disabled）；Ant Design Steps 与 Element Plus Steps 是声明式状态呈现（无导航门控）；Mantine Stepper 覆盖线性 + 受控 active。

| 能力                             | SoybeanUI | shadcn/ui (blocks) | Ant Design Steps | Element Plus Steps | Mantine Stepper |
| :------------------------------- | :-------: | :----------------: | :--------------: | :----------------: | :-------------: |
| headless/styled 分离             |    ✅     |         —          |        —         |         —          |        —        |
| 线性模式（按顺序完成）           |    ✅     |         ✅         |        ⚠️        |         ✅         |       ✅        |
| 水平 / 垂直方向                  |    ✅     |         ✅         |        ✅        |         ✅         |       ✅        |
| 方向键导航（Home/End）           |    ✅     |         —          |        —         |         —          |        —        |
| 本地化实时区域 + 组 `aria-label` |    ✅     |         ⚠️         |        —         |         —          |        —        |
| 受控 / 非受控                    |    ✅     |         —          |        ⚠️        |         ⚠️         |       ✅        |
| 复合组件 + 逐部件 props          |    ✅     |         —          |        —         |         —          |        —        |
| 每步 `completed`/`disabled`      |    ✅     |         ✅         |        ✅        |         ✅         |       ✅        |

`⚠️` = 部分支持（AntD 用 `status` prop 代替线性门控；Element Plus 提供 `process-status`/`finish-status` 但无导航门控；shadcn/ui 的 stepper 区块用硬编码英文渲染状态文本，且不是库组件；SoybeanUI 用 `useLocaleMessages` 本地化）。

---

## 三、发现的问题与处理

### 3.1 Major — D1-12/D2-11 UI 包装层布尔缺省被 cast 覆盖 `linear: true` 默认

**现象：** [stepper.vue](../../packages/ui/src/components/stepper/stepper.vue) UI 包装层 `SStepper` 为纯 `defineProps<StepperProps>()`。Vue 的布尔 prop 缺省 cast 规则：**声明为 Boolean 且未传值、无 `default` 的 prop 会被 cast 为 `false`**（`resolvePropValue` 的 `isAbsent && !hasDefault → value = false`）。`linear` 命中该规则后以显式 `linear: false` 沿 `SStepper → StepperCompact → StepperRoot` 透传——`StepperRoot` 的 `withDefaults({ linear: true })` 因值非 `undefined` 不生效。结果：**SStepper 默认链路下线性模式失效**——未来步骤全部可聚焦（`isFocusable` 对 `!linear` 恒真）、`data-linear` 属性缺失；而 `orientation`（字符串 prop）不受 cast 影响、默认值正常。

**探针复现（修复前）：** 三路对比探针（`StepperRoot` 直挂 / `StepperCompact` 显式 `linear: undefined` / `SStepper` 全链路）打印根节点属性与子组件 props：

```text
direct mount data-linear:                ""          ← 默认生效
Compact explicit-undefined data-linear:  ""          ← 默认生效
SStepper data-linear:                    undefined   ← 默认丢失！
compact props: {"linear": false}                     ← 根因：false 已穿透 Compact
```

修复前 SStepper 渲染的第二个 trigger 无 `disabled`、`tabindex="0"`（线性模式应为 `disabled` + `tabindex="-1"`）——**确认为真实缺陷**（默认行为被包装层篡改）而非测试伪影。

**修复：** 包装层镜像 headless 默认值（同 cascader/segment/layout 既有模式）：

```ts
const props = withDefaults(defineProps<StepperProps>(), {
  // 镜像 headless 默认值，避免缺失的 Boolean prop 被 cast 为 false 后透传覆盖 StepperRoot 的 linear: true 默认
  linear: true
});
```

**验证（测试驱动）：** 原「disables inaccessible future steps」测试移除显式 `linear: true` 改为默认链路回归断言（future step `disabled === true`）；新增「renders root data attributes and data-linear」断言 `data-linear=""` 经全链路渲染。修复后探针：

```text
SStepper data-linear:  ""
root props: {"linear": true, "orientation": "horizontal"}
```

**同款风险核查：** `stepper` 族其余 Boolean prop（`StepperItem` 的 `disabled`/`completed`）均在 headless 层 `withDefaults` 声明 `false` 默认，cast 后语义等价；`StepperSeparator` 的 `decorative` 同理——无其他缺省 `true` Boolean prop 依赖默认值。

### 3.2 Minor — D1-08 实时区域与 `aria-label` 回退硬编码英文

**现象：** [stepper-root.vue](../../packages/headless/src/components/stepper/stepper-root.vue) 实时区域硬编码 `Step {{ currentStep }} of {{ totalSteps }}`、组 `aria-label` 回退硬编码 `'Step-by-step progress'`——与库内既有本地化机制（`useLocaleMessages`）不一致，多语言环境下播报内容无法本地化（对标：editable/combobox 等组件的 trigger `aria-label` 均已本地化）。

**修复：**

```ts
// locale/types.ts — LocaleStepperMessages 新增两键
ariaLabel: string; // 组默认 aria-label 回退
stepOf: string; // 实时区域模板，支持 {current}/{total}
```

```vue
<!-- stepper-root.vue -->
:aria-label="ariaLabel"
{{ interpolate(messages.stepper.stepOf, { current: String(currentStep), total: String(totalSteps) }) }}
```

14 个语言包（en/zh-CN/zh-TW/ja/ko/ru/…）同步补充 `ariaLabel`/`stepOf` 翻译。

**验证（测试驱动）：** 新增「announces the current step in the live region」（默认 en `Step 2 of 3`）、「applies the ConfigProvider locale to the live region and aria-label fallback」（zh-CN `第 2 步，共 3 步` / `分步进度`）、「lets the user override the group aria-label」（显式 `aria-label` 优先）。

### 3.3 Minor — D3-01 `StepperCompactProps.itemProps` 类型要求必填 `step`

**现象：** [types.ts](../../packages/headless/src/components/stepper/types.ts) 中 `itemProps?: StepperItemProps` 声明 `StepperItemProps.step: number` 为**必填**，但 Compact 模板以 `:step="item.step"` 覆盖推导（`v-bind="itemProps"` 在前）——调用方传 `itemProps` 时被类型系统强制要求提供运行时会被忽略的 `step`，**类型谎报**（spec 中 `itemProps: { class, 'data-test' }` 触发 TS2741）。

**修复：**

```ts
itemProps?: Omit<StepperItemProps, 'step'>;
```

同步更新 `apps/docs/src/generated/api/stepper.json` 与 `api-locales/{en,zh-CN}.json` 中 `itemProps` 的类型/描述（手改最小 diff，避免全量 `sui api` 再生成引入 vue 版本号漂移）。

**验证：** `pnpm typecheck` 全绿；spec「forwards itemProps to the step item」保持通过（运行时行为不变）。

### 3.4 核查结论 — C42/C52 同款风险核查

- **C42 同款缺省 Boolean cast 风险：修复。** 见 3.1；这是全仓 51 个 UI 层纯 `defineProps<T>()` 组件排查中的又一命中点——`SStepper` 存在缺省 `true` Boolean prop（`linear`）依赖 headless 默认值，已按 C53 结论统一模式修复。
- **C52 同款 `*Props` 声明未绑定：已核验。** `StepperCompact` 的 6 个 `*Props` 通道（`itemProps`/`triggerProps`/`indicatorProps`/`separatorProps`/`titleProps`/`descriptionProps`）全部在模板 v-bind 消费，无静默丢弃。
- **C52 同款 `aschild` 泄漏：不存在。** 7 个 headless 原语均经 `useOmitProps` 转发 + `Primitive` 消费 `as`/`asChild`（探针断言根 HTML 无 `aschild`/`as=`）。
- **D1-07 数据属性：齐备。** root/item/trigger/indicator/separator/title/description 均渲染 `data-soybean-stepper-*`，无冗余属性。

### 3.5 D7-11 — 单测覆盖不足（已重写 11 → 32 项）

**处理：** 重写 [stepper.spec.ts](../../packages/ui/test/specs/components/stepper.spec.ts)（保留原 11 项语义并扩展）至 **32 项**，全部通过：

```bash
✓ test/specs/components/stepper.spec.ts (32 tests) 254ms
```

> 覆盖要点：**rendering 7 项**（trigger 数量/标题/step 由顺序推导/垂直连接线堆叠/root data 属性与 `data-linear`/`as`/`asChild` 不泄漏/实时区域播报）；**state 10 项**（`aria-current`/位置推导状态/显式 `completed` 优先/点击下一步发事件/线性模式禁跳步/线性模式回退上一步/`linear: false` 自由跳转/headless 根插槽 `nextStep`/`prevStep`/`goToStep`）；**disabled 3 项**（默认线性禁用未来步骤/显式 disabled 阻止交互/modelValue 越过时 disabled 同步）；**keyboard 4 项**（方向键 + 跳过禁用步/Enter/Space 选中/Home/End）；**props forwarding and slots 6 项**（`itemProps` 透传/`triggerProps` 透传/ConfigProvider `iconRender` 对勾图标/indicator 插槽 state+step/title 插槽数据/size variant）；**localization 2 项**（zh-CN 实时区域 + aria-label/显式 aria-label 覆盖）；**accessibility 2 项**（title/description id 关联 + axe 0 违规）。

> 关键测试要点：① `itemProps` 需适配 `Omit<StepperItemProps, 'step'>` 类型；② `iconRender` 回调参数类型为 `IconValue`（含 `undefined`）→ spec 用 `(icon: unknown)` + `String(icon)`；③ 线性模式默认链路回归测试（3.1 修复验证）不放显式 `linear` prop。

### 3.6 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：Overview（线性门控 + headless/styled 分离 + 本地化播报）、Usage、Features（8 条 bullet）、Component family（`SStepper` + 7 个 headless 原语 + `StepperCompact`）、Demos（4 示例导览）、API、Notes（架构链路 + **8 能力 × 5 库对标表** + 6 条 Cautions）、FAQ（6 组：非线性模式、按钮驱动、垂直布局、显式 completed、指示器自定义、本地化）。中英文结构一一对应；Cautions 收录本轮修复要点（step 连续性、`itemProps` 不含 `step`、线性门控语义、实时区域渲染条件、iconRender 回退、禁用步导航）。

---

## 四、架构与模式要点

### 布尔 prop 缺省 cast 是全仓 UI 透传层共性风险

Vue 运行时对声明为 Boolean、未传值且无 `default` 的 prop 统一 cast 为 `false`（`resolvePropValue`）。当 headless 层 `withDefaults` 声明 `true` 默认时，UI 包装层若为纯 `defineProps`，缺省值会被 `false` 覆盖并透传——**默认行为在包装层被静默篡改**。修复模式固化：**包装层用 `withDefaults` 镜像 headless 层的 `true` 默认值**（`linear`、`defaultValue` 类需镜像；字符串 prop 不受 cast 影响）。C42/C43/C53 结论一致：51 个 UI 层纯 `defineProps` 组件统一排期排查。

### 线性门控是「可达性 × 可聚焦性」的双通道一致问题

`isFocusable`（headless 计算）与 DOM `disabled`/`data-disabled`/`tabindex`（trigger 渲染）必须与 `canGoToStep`（root 门控）保持三处一致；本轮 Major 修复暴露的正是「门控真值被包装层篡改后，三通道同时失效」的连锁效应。审计默认值型状态机组件时，必须用**默认链路（不显式传关键 prop）**做回归，而不是只测显式传值场景。

### 本地化硬编码是 a11y 文本的第三处回退通道

组 `aria-label` 回退、实时区域播报与指示器默认内容构成 stepper 的三条 a11y 文本通道；本轮将前两条接入 `useLocaleMessages`（`ariaLabel`/`stepOf`），与指示器 `step` 消息齐平——与 ed/combobox 等组件的 trigger `aria-label` 本地化模式一致。

---

## 五、变更文件清单

| 文件                                                             | 变更类型                                                                                                                                                                           |
| :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/src/components/stepper/stepper.vue`                 | **Major 修复**（D1-12/D2-11）：纯 `defineProps` → `withDefaults({ linear: true })` 镜像 headless 默认（消除缺省 Boolean cast 覆盖线性门控默认行为）                                |
| `packages/headless/src/components/stepper/stepper-root.vue`      | **Minor 修复**（D1-08）：实时区域 `Step {current} of {total}` 与组 `aria-label` 回退硬编码英文 → `useLocaleMessages` + `interpolate`（`stepper.stepOf`/`stepper.ariaLabel`）       |
| `packages/headless/src/locale/types.ts`                          | `LocaleStepperMessages` 新增 `ariaLabel`/`stepOf` 键（含 JSDoc 占位符说明）                                                                                                        |
| `packages/headless/src/locale/langs/*.ts`（14 语言包）           | 同步补充 `ariaLabel`/`stepOf` 翻译（en/zh-CN/zh-TW/ja/ko/ru/de/fr/es/pt-BR/id/tr/ar）                                                                                              |
| `packages/headless/src/components/stepper/types.ts`              | **Minor 修复**（D3-01）：`itemProps?: StepperItemProps` → `Omit<StepperItemProps, 'step'>`（消除必填 `step` 类型谎报，step 由 item 顺序推导）                                      |
| `apps/docs/src/generated/api/stepper.json`                       | 同步 `itemProps` 类型与描述（手改最小 diff，未全量再生成）                                                                                                                         |
| `apps/docs/src/generated/api-locales/{en,zh-CN}.json`            | 同步 `itemProps` 描述（en 新文案 / zh-CN 翻译）                                                                                                                                    |
| `packages/ui/test/specs/components/stepper.spec.ts`              | 单测 11 → 32 项重写扩展（rendering/state/disabled/keyboard/props forwarding and slots/localization/accessibility）；默认链路回归 + `(icon: unknown)` 收窄 + `itemProps` 适配新类型 |
| `packages/ui/test/specs/components/stepper.probe.spec.ts`        | **删除**——三路探针验证完成，内容并入正式 spec（D5-15 隔离）                                                                                                                        |
| `packages/ui/test/specs/components/stepper.linear.probe.spec.ts` | **删除**——线性默认链路探针（direct/compact/SStepper 三路对比）验证完成（D5-15 隔离）                                                                                               |
| `apps/docs/src/docs/en/components/stepper.md`                    | 文档 4 节 → 8 节 Recommended structure（Component family + 8 能力 × 5 库对标表 + Cautions 6 条 + FAQ 6 组）                                                                        |
| `apps/docs/src/docs/zh-CN/components/stepper.md`                 | 与 en 一一对应的 8 节中文化版本                                                                                                                                                    |
| `docs/check.md`                                                  | C55 行 7 维度 ⏳ → ✅；4.9 批次 8 记录表追加 C55 行 + 批次合计（1 单元，单测 11 → 32 项）                                                                                          |
| `docs/check-reports/C55-stepper.md`                              | **新建** 本审计报告                                                                                                                                                                |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vitest run test/specs/components/stepper.spec.ts   # 32/32 全绿
pnpm lint                                # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 2.3.4）

| 增强项                                    | 对标依据       | 说明                                                                                                                                                                               |
| :---------------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stepper` 独立浏览器 e2e                  | 自研标准       | 按 check.md 2.3.4 清单，`stepper` 属键盘导航类（D7-19），须补浏览器 e2e（真实方向键焦点移动 + 真实 Tab 序列 + axe），本轮以 happy-dom 单测 + axe 静态检查替代，非 Blocker          |
| 51 个 UI 层纯 `defineProps<T>()` 组件排查 | Vue 运行时行为 | 承接 C42/C43/C53/C55 结论（UI 透传层缺 `withDefaults` → 缺省 Boolean prop 被 cast 为 `false` 覆盖子组件默认），统一排期排查；本轮已修复 `SStepper`（`linear`）命中点，仍剩待查清单 |
| `StepperItem` step 连续性校验             | 自研标准       | headless 自定义组合要求 `step` 从 1 开始连续（`canGoToStep`/焦点逻辑按 `step - 1` 索引集合）；目前不校验、仅文档 Cautions 说明；可考虑开发态 warn（非缺陷）                        |
