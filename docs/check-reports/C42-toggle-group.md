# C42 `toggle-group` 检查优化报告

> **组件编号：** C42（`toggle-group`）
> **组件名称：** `SToggleGroup` / `SToggleGroupItem`（headless 基座：`ToggleGroupRoot`（`useSelection` + `RovingFocusGroup` + 隐藏 input 表单代理）+ `ToggleGroupItem`（依据 `rovingFocus` 动态选择 `RovingFocusItem` 或 `Button` 基座）；`scv()` 配方 `toggleGroupVariants`）
> **模式：** 多槽（`root` / `item`）
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-04

---

## 一、执行摘要

对 `toggle-group` 完成全维度审计。headless 层 `ToggleGroupRoot` 由 `useSelection`（受控/非受控 + 单选/多选 + `clearable`）与 `RovingFocusGroup`（方向键导航/`loop` 循环/RTL 方向感知）组合，`ToggleGroupItem` 依据 context `rovingFocus` 动态切换 `RovingFocusItem` / `Button` 基座并反射 `aria-pressed`/`data-state`；UI 层 `SToggleGroup` 为薄透传包装（`toggleGroupVariants` 3 变体 × 6 尺寸 × 8 颜色 × 2 方向）。`name`/`required` 经隐藏 input 接入表单提交。

**发现并修复 Major 缺陷 ×1**（泛型 SFC `withDefaults` 字面量 Boolean 默认值被编译器静默丢弃），补强单测 8 → 24 项 + 文档按 Recommended structure 重构：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                             |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 单选/多选 + 受控/非受控（`useSelection`）；roving-focus 方向键导航/`loop` 循环/RTL 反转；`aria-pressed` + `data-state` 双通道反射（D1-08）；组级/条目级 `disabled` 并集；`useOmitProps` 均含 `class`（D1-10）；recipe 首行 `// @unocss-include`（D1-09）。**Major 修复见 3.1**                   |
| D2 行业对标 |  ✅  | `toggle-group` 为 Radix/shadcn 原生模式（单选/多选、roving focus、loop、`aria-pressed`）；AntD/Element Plus/Mantine/Naive UI 以 Radio/Button Group 或 Segmented 控件表达同一交互。遗留增强：无                                                                                                   |
| D3 API 设计 |  ✅  | `v-model`/`defaultValue` + `multiple` 泛型推断（D3-04）；`rovingFocus`/`loop`/`orientation`/`dir`/`clearable`/`name`/`required` 命名对齐主流（D3-01）；item 完整复用 `Button` props（`as`/`asChild`/`type`）；slot 暴露 `pressed`/`disabled`；UI 层 `S` 前缀（D3-09）                            |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；props 全 interface + JSDoc（D4-03）；`ToggleGroupRootProps<M, T>` 泛型 + `SelectionProps` 复用；`ToggleGroupVariant` 由 `VariantProps` 派生（D4-05）                                                                                                                      |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；`resolved*` 回退用 `computed` 派生；无 `as any`/`@ts-expect-error`；模板无 `props.xxx`（D5-14）                                                                                                                                                                                |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（Overview/Usage/Features/**Component family**/Demos/API/Notes/FAQ），含架构对标表（12 能力 × 6 库）+ 使用注意 + 5 组 FAQ；中英文结构完全对齐                                                                                                  |
|   D7 其他   |  ✅  | 单测 8 → 24 项全通过（新增渲染/状态反射/受控非受控/自定义泛型值/键盘导航/loop/RTL/禁用交集/ui 覆盖/slot props/axe 双形态）；axe 0 违规；族系回归 toggle/slider/switch/checkbox/radio-group/toolbar 全通过；无独立浏览器 e2e，D7-19/20 由 happy-dom 单测覆盖（与 toggle/button 族系一致，非阻塞） |

---

## 二、行业对标矩阵

> `toggle-group` 是 Radix/shadcn 原生模式；Ant Design/Element Plus/Mantine/Naive UI 以 Radio/Button Group 或 Segmented 控件表达同一交互。

| 能力                          | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn `ToggleGroup` |
| :---------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :------------------: |
| headless/styled 分离          |    ✅     |     —      |      —       |    —    |    —     |          ✅          |
| 单选 / 多选                   |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |          ✅          |
| 受控 / 非受控                 |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |          ✅          |
| Roving focus 方向键           |    ✅     |     —      |      —       |    —    |    —     |          ✅          |
| Loop 循环导航                 |    ✅     |     —      |      —       |    —    |    —     |          ✅          |
| RTL 方向感知                  |    ✅     |     —      |      —       |    —    |    —     |          ✅          |
| `aria-pressed` + `data-state` |    ✅     |     —      |      —       |    —    |    —     |          ✅          |
| 方向（横排/竖排）             |    ✅     |     —      |      ✅      |   ✅    |    —     |          ✅          |
| 变体 × 尺寸 × 颜色            |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |          —           |
| 隐藏 input 表单提交           |    ✅     |     —      |      —       |    —    |    —     |          —           |
| 单选可取消选中                |    ✅     |     ✅     |      —       |    —    |    —     |          —           |
| 禁用（组级 + 条目级）         |    ✅     |     ✅     |      ✅      |   ✅    |    ✅    |          ✅          |

---

## 三、发现的问题与处理

### 3.1 D1-08 / D7-11 — **Major**：泛型 SFC `withDefaults` 字面量 Boolean 默认值被编译器静默丢弃

**问题：** `ToggleGroupRoot` 初始 `withDefaults` 声明：

```ts
const props = withDefaults(defineProps<ToggleGroupRootProps<M, T>>(), {
  disabled: false,
  rovingFocus: true, // ← 字面量 Boolean 默认
  orientation: 'horizontal',
  loop: true, // ← 字面量 Boolean 默认
  clearable: true // ← 字面量 Boolean 默认
});
```

在 `<script setup lang="ts" generic="...">` 泛型组件中，**字面量 Boolean 默认值被编译器静默丢弃**（仅字符串默认 `orientation` 存活）。运行时 `type.props` 探针证实：

```json
{
  "rovingFocus": { "required": false },
  "disabled": { "required": false },
  "orientation": { "required": false, "default": "horizontal" },
  "loop": { "required": false },
  "clearable": { "required": false }
}
```

缺省挂载时 Vue 将 Boolean prop cast 为字面量 `false`（`resolvePropValue`：`isAbsent && !hasDefault → false`），于是：

1. **`rovingFocus` 实为 `false`** — root 退化为普通 `Primitive`（`role="group"`），方向键导航与 Tab 顺序管理静默失效；
2. **`loop` 实为 `false`** — 即便 rovingFocus 生效也无循环回绕；
3. **`clearable` 实为 `false`** — 受控单选点击已选项被 `useSelection` 静默吞掉（`updated === undefined && !clearable → return`），不发出 `update:modelValue`。

初版 `?? true` 回退**无效**：`props.rovingFocus` 缺失时为 `false` 而非 `undefined`，`??` 无法区分。`vnode.props` 探针确认缺省时无 `rovingFocus` 键（`{"ref":"VTU_COMPONENT"}`）。

**处理（双层修复）：**

① **headless 层改用函数式默认值**（编译器保留，运行时 `isFunction(defaultValue)` 分支执行）+ 运行时 `??` 回退防御显式 `undefined`：

```ts
const props = withDefaults(defineProps<ToggleGroupRootProps<M, T>>(), {
  disabled: () => false,
  rovingFocus: () => true,
  orientation: 'horizontal',
  loop: () => true,
  clearable: () => true
});
const resolvedDisabled = computed(() => props.disabled ?? false);
const resolvedRovingFocus = computed(() => props.rovingFocus ?? true);
const resolvedLoop = computed(() => props.loop ?? true);
```

② **UI 透传层同步声明函数式默认值**：`SToggleGroup` 未传 Boolean prop 时自身会被 cast 为 `false`，`useOmitProps` 将 `false` 作为显式值透传给 `ToggleGroupRoot`，**覆盖** headless 层默认值（透传链路的二次失效点）。UI 层同款 `withDefaults` 后缺省即传 `true`，用户显式 `:roving-focus="false"` 仍正确透传（测试 `falls back to a plain group when rovingFocus is disabled` 覆盖）。

**影响范围（同缺陷波及，已列入遗留排期）：**

| 组件                                           | 丢失的默认值                                | 后果                                                     |
| :--------------------------------------------- | :------------------------------------------ | :------------------------------------------------------- |
| `accordion-root.vue` / `accordion-compact.vue` | `collapsible: true` / `unmountOnHide: true` | 折叠行为失效（点击已展开项无法收起）；折叠内容默认不卸载 |
| `select-compact.vue`                           | `clearable: true`                           | 清除选择功能静默失效                                     |

`disabled: false` 类默认值虽同样被丢弃，但 cast 后仍为 `false`，行为无差异，不受影响。

### 3.2 D7-11 — 单测覆盖不足（已扩展 8 → 24 项）

**问题：** 原 [toggle-group.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/toggle-group.spec.ts) 仅 8 项，未覆盖受控去选（`clearable`）、方向键导航、loop 循环、RTL、泛型自定义值、禁用交集、slot props、axe 双形态。

**处理：** 扩展至 **24 项**，全部通过：

```bash
✓ test/specs/components/toggle-group.spec.ts (24 tests)
```

> 覆盖要点：渲染 4 项（含 `rovingFocus: false` 回退为普通组）；状态反射 3 项（`aria-pressed`/`data-state`/`data-orientation`）；选择 6 项（受控单选/多选 emit、**受控去选 `clearable`**、多选移除、非受控标量/数组 `defaultValue`、**自定义数值泛型**）；键盘 3 项（**方向键导航**、**loop 回绕**、**RTL 反转**）；禁用 3 项（组禁用防交互、条目级原生 `disabled`、组级 `data-disabled` + 全禁用）；`ui.item` 覆盖；slot props（`pressed`/`disabled`）；axe 2 形态（横排单选 + 竖排多选）。

> **注意：** 键盘/去选 4 项失败测试即 3.1 Major 缺陷的回归测试——修复前 20/24 通过，修复后 24/24 全绿，证明缺陷闭环。

### 3.3 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**问题：** en/zh 文档仅 `# / 概述 / 用法 / 演示 / API` 4 节，缺 Features、Component family、Notes（架构与行业对标）、FAQ。

**处理：** 重构为 8 节（`SToggleGroup` + `SToggleGroupItem` 双导出，按规范补充 Component family）：Overview（含与 `SSegment`/`SToggle` 的取舍）、Usage、Features（8 条 bullet）、Component family（2 条）、Demos、API、Notes（架构链路 + **12 能力 × 6 库对标表** + 6 条 Cautions）、FAQ（5 组，含与 `SToggle` 的区别、单选去选、loop 循环、竖排）。中英文结构一一对应。

---

## 四、架构与模式要点

### Boolean 默认值的透传链路陷阱（本次核心教训）

泛型 SFC 中 Boolean props 存在**两层默认值失效**：① `withDefaults` 字面量默认被编译器丢弃（cast 为 `false`）；② 透传层（UI 包装）自身未传 Boolean prop 时同样被 cast 为 `false`，经 `useOmitProps` 作为**显式值**下传，覆盖子组件默认。修复须**两层同步**：headless 用函数式默认 + 运行时回退，UI 透传层同款声明。`toolbar-toggle-group` 既有的 `useOmitProps(props, ['dir', 'loop', 'rovingFocus'])` + 显式 `:roving-focus="false"` 正是该问题的既有规避先例。

### 状态、导航、视觉三层解耦

`data-state` 连接状态与样式（UnoCSS `data-[state=on]:*`）；`RovingFocusGroup`/`RovingFocusItem` 独立承担键盘导航与 Tab 顺序；`ToggleGroupItem` 通过 `rovingFocus ? RovingFocusItem : Button` 动态切换基座——关闭 roving focus 时退化为纯按钮组，功能与样式互不耦合。

---

## 五、变更文件清单

| 文件                                                                  | 变更类型                                                                                                                                                 |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/toggle-group/toggle-group-root.vue` | 字面量 Boolean 默认 → **函数式默认**（`disabled`/`rovingFocus`/`loop`/`clearable`）+ 运行时 `??` 回退（`resolved*` computed）                            |
| `packages/ui/src/components/toggle-group/toggle-group.vue`            | 透传层同步声明函数式默认（防 Boolean cast `false` 覆盖子组件默认）                                                                                       |
| `packages/ui/test/specs/components/toggle-group.spec.ts`              | 单测 8 → 24 项（渲染/状态/受控非受控/泛型值/键盘/loop/RTL/禁用/ui/slot/axe）；4 项失败用例即缺陷回归测试                                                 |
| `apps/docs/src/docs/en/components/toggle-group.md`                    | 文档 4 节 → 8 节 Recommended structure（Component family + 12 能力 × 6 库对标表 + Cautions + FAQ）                                                       |
| `apps/docs/src/docs/zh-CN/components/toggle-group.md`                 | 与 en 一一对应的 8 节中文化版本                                                                                                                          |
| `docs/check.md`                                                       | C42 行 7 维度 ⏳ → ✅；4.2 遗留增强项追加 `toggle-group` 行（泛型 Boolean 默认值波及项）；批次 2 记录表追加 C42 行 + 批次合计更新（3 单元/单测 19 → 69） |
| `docs/check-reports/C42-toggle-group.md`                              | **新建** 本审计报告                                                                                                                                      |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run toggle-group   # 24 项全通过
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项                                         | 对标依据     | 说明                                                                                                                              |
| :--------------------------------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| 泛型 SFC 字面量 Boolean 默认值修复（波及组件） | Vue 编译行为 | `accordion-root`/`accordion-compact`（`collapsible`/`unmountOnHide`）、`select-compact`（`clearable`）待按本报告 3.1 同款方案修复 |
