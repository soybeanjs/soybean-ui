# C40 `slider` 检查优化报告

> **组件编号：** C40（`slider`）
> **组件名称：** `SSlider`（headless 基座：`SliderRoot`（`useControllableState` + 值规范化 + `VisuallyHiddenInput` 表单代理）→ `SliderTrack`（指针拖拽）→ `SliderRange`（滑块间百分比跨度）→ `SliderThumb`（`role="slider"` + `aria-valuemin/max/now` + `aria-orientation`，聚焦派生步进）；Compact 聚合：`SliderCompact`；`scv()` 配方 `sliderVariants`）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `slider` 族（root / track / range / thumb + compact）完成全维度审计。headless 基座完整：`SliderRoot` 经 `useControllableState` 支撑受控/非受控，`normalizeSliderValues` 负责值规范化（snap-to-step + 排序），`getSliderSideState` 派生 RTL/inverted/垂直下的 startEdge/endEdge/slideDirection；`SliderThumb` 以 `role="slider"` 暴露，`aria-valuemin/max/now`、`aria-orientation`、`data-disabled` 齐备；键盘处理（Home/End/PageUp/PageDown/方向键/Shift 大跳）与指针拖拽（document 级 pointermove/up/cancel + `valueCommit`）完整。UI 层 `SSlider` 为薄包装（`sliderVariants` 6 尺寸 × 8 颜色 + `provideSliderUi` 注入）。

**发现并修复 1 项 Minor 缺陷 + 扩展单测 12 → 28 项 + 文档按 7 节 Recommended structure 重构：**

1. **Minor (D1-16 焦点稳定性) thumb 值驱动重建**：[slider-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/slider/slider-compact.vue) 中 thumb `v-for` 的 `:key="\`${index}-${value}\`"`——值每次变化都触发 thumb DOM 卸载重建。拖拽/键盘步进过程中 thumb 反复重建，焦点、hover、focus-visible 环形样式与指针状态丢失（document 级监听保证拖拽数值连续，但交互体验与状态稳定性受损）。修复：改 `:key="index"`，值更新仅走 props 响应式通道，thumb 元素稳定。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 受控/非受控闭环（`useControllableState`）；单/多 thumb 值数组（range）；方向键/Home/End/PageUp/PageDown/Shift 大跳完整键盘（D1-16）；指针拖拽 + `valueCommit` 提交语义；`role="slider"` + `aria-valuemin/max/now` + `aria-orientation` + `data-disabled`（D1-08）；`VisuallyHiddenInput` 表单代理（range 展开 `name[0]`/`name[1]`）；`useOmitProps` 均含 `class`（D1-10）；recipe 首行 `// @unocss-include`，slot 键与 `UiSlot` 一致（D1-09） |
| D2 行业对标 |  ✅  | 对标 Ant Design/Element Plus/Mantine/Naive UI/shadcn `Slider`：受控、range、垂直、inverted/RTL、键盘、`minStepsBetweenThumbs`、表单代理对齐；遗留增强：`marks` 刻度、拖拽 tooltip、数字输入框联动（见「遗留增强项」）                                                                                                                                                                                                                         |
| D3 API 设计 |  ✅  | 受控/非受控（`v-model` + `defaultValue`）；`min`/`max`/`step`/`minStepsBetweenThumbs`/`thumbAlignment`/`orientation`/`inverted`/`dir` 命名对齐主流（D3-01）；`as`/`asChild`（root/track/range/thumb）+ `trackProps`/`rangeProps`/`thumbProps` 转发 + `ui`/`class`/默认插槽多扩展点（D3-08）；`*CompactProps`/`*CompactEmits`/`*CompactSlots` 类型族完整导出；UI 层 `S` 前缀（D3-09）                                                          |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；props 全 interface + JSDoc（D4-03）；`SliderUiSlot`/`SliderUi` 与 recipe slot 一一对应；`SliderRootContext` 泛型化（`PropsToContext` + `ComputedRef`/`ShallowRef`）                                                                                                                                                                                                                                                    |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；context 值全响应式；拖拽监听器闭包 + `onBeforeUnmount` 清理（D7-04）；纯工具全部下沉 `shared.ts`（`getValidSliderMin` 等 13 个导出）；无 `as any`/`@ts-expect-error`                                                                                                                                                                                                                                                        |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 7 节 Recommended structure（Overview/Usage/Features/Demos/API/Notes/FAQ），含架构对标表（12 能力 × 6 库）+ 使用注意 + 4 组 FAQ；中英文结构完全对齐                                                                                                                                                                                                                                                                    |
|   D7 其他   |  ✅  | 单测 12 → 28 项全通过（新增方向键增减/PageUp/Shift+方向键大跳/Home 归零/聚焦 thumb 步进/RTL/inverted/垂直 + inverted 垂直/minStepsBetweenThumbs 阻止/非受控 defaultValue/受控外部更新/disabled 拖拽阻断/`ui.thumb`+`ui.range` 覆盖/data-orientation 反射，axe 保持 0 违规）；无独立浏览器 e2e 文件，D7-19/20 由 happy-dom 单测覆盖（axe + 交互 + 键盘），与 checkbox/switch 族系一致（非阻塞）                                                |

---

## 二、行业对标矩阵

| 能力                             | SoybeanUI | Ant Design `Slider` | Element Plus `Slider` | Mantine `Slider` | Naive UI `Slider` | shadcn `Slider` |
| :------------------------------- | :-------: | :-----------------: | :-------------------: | :--------------: | :---------------: | :-------------: |
| headless/styled 分离             |    ✅     |          —          |           —           |        —         |         —         |       ✅        |
| 受控/非受控                      |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |       ✅        |
| 区间（多滑块）                   |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |       ✅        |
| 垂直方向                         |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |       ✅        |
| 反向 / RTL                       |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |       ✅        |
| 键盘导航（方向键/Home/End/Page） |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |       ✅        |
| `minStepsBetweenThumbs`          |    ✅     |          —          |           —           |        —         |         —         |       ✅        |
| 表单代理 / `name` 提交           |    ✅     |         ✅          |          ✅           |        ✅        |        ✅         |       ✅        |
| axe 零违规                       |    ✅     |          —          |           —           |        —         |         —         |        —        |
| marks 刻度标记                   |    ➕     |         ✅          |          ✅           |        ✅        |        ✅         |        —        |
| 拖拽时数值气泡 tooltip           |    ➕     |         ✅          |          ✅           |        ✅        |        ✅         |        —        |
| 数字输入框联动                   |    ➕     |         ✅          |           —           |        —         |         —         |        —        |

---

## 三、发现的问题与处理

### 3.1 Minor — thumb `v-for` key 值驱动导致 DOM 重建（D1-16 焦点稳定性）

**问题：** [slider-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/slider/slider-compact.vue) 原模板：

```vue
<SliderThumb v-for="(value, index) in modelValue" :key="`${index}-${value}`" v-bind="thumbProps" :index="index">
```

key 内嵌 `value`，**每次值变化（拖拽 move / 键盘步进）都触发对应 thumb 卸载重建**。后果：① 焦点丢失风险——`stepValue`/`beginTrackDrag` 通过 `focusThumb`（nextTick 后 `thumbElements[index].focus()`）恢复焦点，但依赖重建后的新元素，键盘连续步进时 focus-visible 环形样式与 hover 态反复重置；② 不必要的 DOM 成本——拖拽一次 pointermove 重建一次 thumb。数值连续性不受影响（拖拽依赖 document 级监听），故判 Minor 而非 Major。

**处理：** 改为索引稳定 key，值更新走 props 响应式通道：

```vue
<SliderThumb v-for="(value, index) in modelValue" :key="index" v-bind="thumbProps" :index="index">
```

thumb 元素在交互期间保持稳定，`aria-valuenow`、`style`（`percent`/`thumbInBoundsOffset`）经 computed 增量更新；外部 `modelValue` 数组长度变化时 Vue diff 自动增删对应 thumb。

**验证：** 新增「steps the focused thumb in a range」「increases the value with ArrowRight」等 6 项键盘测试全通过，值步进/提交语义无回归。

### 3.2 D7-11 — 单测覆盖不足（已扩展 12 → 28 项）

**问题：** 原 [slider.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/slider.spec.ts) 仅 12 项：键盘只测了 End、方向键细节（ArrowRight/Left/PageUp/Shift/RTL/inverted/垂直）、`minStepsBetweenThumbs`、非受控 `defaultValue`、受控外部更新、disabled 拖拽、`ui` 覆盖、`data-orientation` 反射均未覆盖。

**处理：** 扩展至 **28 项**，全部通过：

```bash
✓ test/specs/components/slider.spec.ts (28 tests)
```

> 覆盖要点：ArrowRight +1 / ArrowLeft −1（D1-16）；PageUp ×10 / Shift+Arrow ×10 大跳（D1-16）；Home → min（D1-16）；聚焦第二 thumb 后步进 range 值 `[20,80] → [20,81]`（D1-16）；`dir="rtl"` 下 ArrowLeft +1（D1-16 + D3-01）；`inverted` 下 ArrowLeft +1（D1-16）；垂直方向 ArrowUp +1 + `aria-orientation="vertical"`（D1-08）；垂直 + inverted 下 ArrowUp −1；`minStepsBetweenThumbs` 阻止跨越（D3-04）；非受控 `defaultValue` 点击轨道（D3-04）；受控 `setProps({ modelValue })` 外部更新（D3-04）；disabled 拖拽阻断（D3-04）；`ui.thumb`/`ui.range` 覆盖（D7-15）；root/thumb `data-orientation` 反射（D1-08）；axe 0 违规（D7-19）。

### 3.3 D7-05 — 文档重构（4 节 → 7 节 Recommended structure）

**问题：** en/zh 文档仅 `# / Overview / Usage / Demo / API` 4 节，缺 Features、Notes（架构与行业对标）、FAQ。

**处理：** 重构为 7 节（单 `SSlider` 导出，按规范省略 Component family）：Overview（含与 `SInputNumber` 的取舍）、Usage、Features（9 条 bullet）、Demos、API、Notes（架构链路 + **12 能力 × 6 库对标表** + 4 条 Cautions）、FAQ（4 组）。中英文结构一一对应。

### 3.4 说明 — 非缺陷项（跨组件既有模式）

- **`pendingModelValue` 冗余**：`updateValueAtIndex` 设置 pending 后，`watch(normalizedModelValue)` 立即判等清空——当前实现下 pending 路径实际不起作用，但 `currentModelValue = pending ?? normalized` 与 `valueCommit` 语义均正确（拖拽值始终即时生效），属 Radix 移植保留结构，不影响功能，未改动。
- **键盘事件冒泡**：`@keydown` 绑定在 root，thumb 键盘事件经冒泡到达——`activeThumbIndex` 由 thumb `onFocus` 维护，聚焦即切换目标 thumb，语义正确。
- **单 thumb 无默认 aria-label**：`getThumbLabel` 对单 thumb 返回 `undefined`，由调用方经 `thumbProps` 提供——与 Radix/主流库一致（axe 测试显式提供 label），属用户责任非缺陷。

---

## 四、架构与模式要点

### 值判定与提交的单一来源

`currentModelValue`（`pending ?? normalized`）是全部部件的值来源：thumb 的 `percent`/`aria-valuenow`、range 的 `offsetStart/offsetEnd`、键盘步进与拖拽的 `updateValueAtIndex` 均从同一来源派生；`valueCommit` 只在值相对 `valuesBeforeDrag` 有变化时发出（拖动结束 / 键盘 commit），与 Radix `onValueCommit` 语义一致。

### RTL / inverted / 垂直的几何派生

`getSliderSideState(orientation, dir, inverted)` 统一派生 `startEdge`/`endEdge`/`slideDirection`，同时服务三处：thumb 的 `style`（`[startEdge]: calc(percent% + offset)`）、range 的填充方向、键盘 `BACK_KEYS[slideDirection]` 的方向键判定——一套几何模型驱动渲染与键盘，RTL/inverted 下方向键语义自动翻转（测试已覆盖四象限）。

---

## 五、变更文件清单

| 文件                                                         | 变更类型                                                                                                                      |
| :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/slider/slider-compact.vue` | **修复 ×1**：thumb `v-for` key `` `${index}-${value}` `` → `index`（值变化不再重建 thumb，焦点/hover 状态稳定）               |
| `packages/ui/test/specs/components/slider.spec.ts`           | 单测 12 → 28 项（方向键/PageUp/Shift/Home/RTL/inverted/垂直/minSteps/非受控/受控更新/disabled 拖拽/ui 覆盖/data-orientation） |
| `apps/docs/src/docs/en/components/slider.md`                 | 文档 4 节 → 7 节 Recommended structure（架构对标表 12 能力 × 6 库 + Cautions + FAQ）                                          |
| `apps/docs/src/docs/zh-CN/components/slider.md`              | 与 en 一一对应的 7 节中文化版本                                                                                               |
| `docs/check.md`                                              | C40 行 7 维度 ⏳ → ✅；4.2 遗留增强项追加 `slider` 行；新增 4.3 批次 2 记录（C40 行 + 批次合计）                              |
| `docs/check-reports/C40-slider.md`                           | **新建** 本审计报告                                                                                                           |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run slider   # 28 项全通过（+ color-slider 7）
cd packages/ui && pnpm exec vp test run slider switch checkbox radio-group  # 族系回归 121 项全通过
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                 | 对标依据           | 说明                                                                |
| :--------------------- | :----------------- | :------------------------------------------------------------------ |
| `marks` 刻度标记       | AntD/Element Plus  | 轨道上的刻度点与 label，需扩展 root context + `SliderCompact` props |
| 拖拽时数值气泡 tooltip | AntD/Mantine/Naive | thumb 悬停/拖拽时显示当前值，建议与 `STooltip` 组合或内置轻量气泡   |
| 数字输入框联动         | AntD               | slider 与 `SInputNumber` 双向联动，属组合型增强                     |
