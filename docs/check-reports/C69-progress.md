# C69 `progress` 检查优化报告

> **组件编号：** C69（`progress`）
> **组件名称：** `SProgress`/`SProgressCircle`/`SProgressProvider`（headless 基座：`ProgressRoot`/`ProgressIndicator`/`ProgressCompact`/`ProgressCircleCompact` + 命令式 `progress` API）
> **模式：** 多槽 + Compact（root/indicator 等 UI 槽 + 命令式 API 层）
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-09、D2-11、D3-01

---

## 一、执行摘要

对 `progress` 完成全维度审计。核心链路：`ProgressRoot` 经 `getValidMax`/`getValidModelValue` 规范化 `max`/`modelValue`，派生 `indeterminate`/`loading`/`complete` 状态与 `valuePercent`，渲染 `role="progressbar"` + `aria-valuemin/max/now`/`aria-valuetext`/`aria-label`/`data-state`/`data-value`/`data-max`；`ProgressIndicator` 以 CSS 变量 + `transform` 按 `dir` 定位填充；`SProgress`/`SProgressCircle` 分别注入 `progressVariants`/`progressCircleVariants`；`SProgressProvider` 挂载命令式 `progress` 控制器（`start`/`set`/`inc`/`done`/`configure` 等）。

**发现 Major ×1 + Minor ×1**（均已修复），**Enhancement ×0**：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                        |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact 模式正确：`ProgressCompact`/`ProgressCircleCompact` 持有聚合；headless 零样式、UI 层无 ARIA/键盘逻辑；`data-soybean-progress-root/indicator` 完整；`useOmitProps` 含 `class`；`progressVariants`/`progressCircleVariants` 槽键与 `ProgressUi` 一致；`role="progressbar"` + 完整 ARIA 契约（D1-08）                           |
| D2 行业对标 |  ✅  | 对标 shadcn/ui（headless 分离）与 AntD/Element Plus/Naive UI（单包配置）：SoybeanUI 差异化提供 `nprogress` 风格命令式 API 与 `SProgressCircle` 环形仪表盘；确定/不确定/自定义标签齐备；无阻塞缺口                                                                                                                                           |
| D3 API 设计 |  ✅  | `modelValue`/`max`/`getValueLabel`/`getValueText`/`strokeWidth` 命名与主流库一致；`v-model` 受控/非受控统一；命令式 `progress` API（`start`/`set`/`inc`/`done`/`configure`/`promise` 等）语义清晰                                                                                                                                           |
| D4 类型系统 |  ✅  | `ProgressRootProps`/`ProgressIndicatorProps`/`ProgressState` 精确；`shared.ts` 纯函数（`getValidMax`/`getValueLabel`/`getProgressCircleDashoffset` 等）类型明确；JSDoc 覆盖 `modelValue`/`max`/`getValueLabel`；`pnpm typecheck` 无新增错误（见验证）                                                                                       |
| D5 代码规范 |  ✅  | `eslint` 0 errors；`progress-root.vue` 用 `computed` 派生 `progressState`/`valuePercent`/`ariaLabel`，`watch` 规范化 max/modelValue 同步，`shared.ts` 纯函数下沉（见验证）                                                                                                                                                                  |
|   D6 文档   |  ✅  | **Major 修复**（D6-02/D6-10/D6-11/D6-13/D6-15）：en/zh 文档由 4 节重构为完整 Recommended structure（Overview/Usage/Features/**Component family**/Demos/**Circle Progress**/**Progress Provider**/API/Notes/FAQ），保留既有 Circle/Provider 内容，含架构对标表（8 能力 × 6 库）+ 5 条 Cautions + Roadmap 说明 + 5 组 FAQ；中英文结构完全对齐 |
|   D7 其他   |  ✅  | 单测 3 → 4 项全通过（progressbar 语义 + `aria-valuenow`/自定义 class/环形插槽 + 无障碍 0 违规/**新增**不确定态本地化 `aria-label` 断言）；SSR 无 `window`/`document` 访问（除命令式 API 在 provider 层）；`useControllableState`/watch 无泄漏（见验证）                                                                                     |

---

## 二、行业对标矩阵

> `progress` 是 **headless 状态 + 命令式 API 层** 模式。shadcn/ui 为同源 headless 分离；Ant Design/Element Plus/Mantine/Naive UI 为单一样式化进度组件。

| 能力                            | SoybeanUI | shadcn/ui | Ant Design Progress | Element Plus Progress | Mantine Progress | Naive UI Progress |
| :------------------------------ | :-------: | :-------: | :-----------------: | :-------------------: | :--------------: | :---------------: |
| Linear progress                 |    ✅     |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |
| Circle progress                 |    ✅     |     —     |         ✅          |          ✅           |        ✅        |        ✅         |
| Indeterminate                   |    ✅     |     —     |         ✅          |          ✅           |        ✅        |        ✅         |
| Imperative API (`start`/`done`) |    ✅     |     —     |          —          |           —           |        —         |         —         |
| Color variants (8)              |    ✅     |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |
| Size variants (6)               |    ✅     |     —     |          —          |           —           |        —         |         —         |
| `role="progressbar"` ARIA       |    ✅     |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |
| Custom value label              |    ✅     |     —     |          —          |          ✅           |        ✅        |        ✅         |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D6 文档结构不完整（缺 Features/Notes/FAQ）

**现象：** [progress.md（en）](../../apps/docs/src/docs/en/components/progress.md) 与 [progress.md（zh-CN）](../../apps/docs/src/docs/zh-CN/components/progress.md) 已有 Overview/Usage/Demos/**Circle Progress**/**Progress Provider**/API，但缺失 D6-02/D6-10/D6-11/D6-13/D6-15 要求的 `Features`、`Component family`、`Notes`（架构对标表 + 运行时注意 + Roadmap）与 `FAQ` 章节。对标 C66 carousel/C56 avatar 等已完成组件均重构为 9 节结构，progress 为遗漏项。

**修复：** en/zh 文档重构为完整 Recommended structure，保留并保留既有 Circle Progress/Progress Provider 内容，新增：

- `Features`：8 条能力（headless 分离/确定·不确定/8 色/6 尺寸/环形变体/自定义标签/命令式 API/无障碍）。
- `Component family`：`SProgress`/`SProgressCircle`/`SProgressProvider`/`ProgressRoot`/`ProgressIndicator`/Compact/命令式 `progress` 控制器职责说明。
- `Notes`：架构对标表（8 能力 × 6 库）+ 5 条 Cautions（确定值 aria-label 优先级/不确定无 `aria-valuenow`/Provider 依赖/`strokeWidth` 钳制/RTL 方向）+ `Roadmap` 说明。
- `FAQ`：5 组问答（确定值/不确定/顶部加载条/自定义标签/环形·线性）。

### 3.2 Minor — D1-15/D7-05 aria-label 回退硬编码英文

**现象：** [progress-root.vue](../../packages/headless/src/components/progress/progress-root.vue) 的 `aria-label` 末级回退硬编码 `'Progress'`（`?? 'Progress'`），未使用本地化文案——`LocaleProgressMessages` 已有 `loading` 却未作为 aria-label 使用，属本地化遗漏（对标 C66 carousel 已本地化 aria-label 回退）。

**修复：** 新增 `LocaleProgressMessages.ariaLabel`（13 语言包同步补齐：en `Progress`/zh-CN `进度`/…），`progress-root.vue` 经 `useLocaleMessages` 回退 `messages.value.progress.ariaLabel`：

```ts
const ariaLabel = computed(
  () => getStringAttr('aria-label') ?? getNonEmptyString(valueLabel.value) ?? messages.value.progress.ariaLabel
);
```

确定值优先级不变（百分比标签优先），仅不确定态末级回退本地化。新增单测「falls back to a localized aria-label when indeterminate」断言 `aria-label='Progress'`。

### 3.3 核查结论（非缺陷）

- **D1-08 状态反映**：`role="progressbar"` + `aria-valuemin/max/now`/`aria-valuetext`/`aria-label` + `data-state`/`data-value`/`data-max` 齐备。
- **D7-09 SSR**：组件层无顶层 `window`/`document` 访问；命令式 API 的计时器收敛于 `SProgressProvider` 层，`progress.reset()` 清理。
- **D7-11 测试**：覆盖渲染/ARIA/环形/无障碍，本次新增本地化 aria-label 断言。

---

## 四、验证

- `pnpm exec vitest run test/specs/components/progress.spec.ts`：**4 项全部通过**（progressbar 语义 + `aria-valuenow`/自定义 class/环形插槽 + axe 0 违规/**新增**不确定态本地化 `aria-label` 断言）。
- `pnpm exec eslint packages/headless/src/components/progress/`：**0 errors**（locale 文件由工程 eslint 配置忽略，属正常）。
- `pnpm sui api`：重新生成（`LocaleProgressMessages.ariaLabel` 为嵌套字段，`progress` 覆盖键已存在，仅 `index.json` generatedAt 变化），合法再生成。
- **typecheck 说明：** `pnpm typecheck` 唯一报错为无关文件 `theme-customizer.vue` 的 `@soybeanjs/ui` 自引用解析失败（`packages/ui/dist` 未构建、`pnpm stub` 因 IDE-only `oxfmt` 中断），属既有环境问题；progress 代码经 vitest 编译运行通过，无类型错误。

## 五、遗留增强项（非阻塞，排期）

| 增强项        | 对标依据          | 说明                                                       |
| :------------ | :---------------- | :--------------------------------------------------------- |
| 分段/步骤进度 | AntD/Element Plus | 多段 `steps` 进度条；当前可经多个 indicator 组合，排期评估 |
| 渐变/条纹进度 | AntD/Element Plus | `gradient`/条纹填充；当前经 `ui`/`class` 覆盖，暂不引入    |
