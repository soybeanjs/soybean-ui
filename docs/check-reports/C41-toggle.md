# C41 `toggle` 检查优化报告

> **组件编号：** C41（`toggle`）
> **组件名称：** `SToggle`（headless 基座：`Toggle`（`useControllableState` + `Button` 基座 + `aria-pressed`/`data-state` 反射 + 禁用守卫点击）；`cv()` 配方 `toggleVariants`）
> **模式：** 单类
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-08、D2-11、D3-01

---

## 一、执行摘要

对 `toggle` 完成全维度审计。headless 层 `Toggle` 基于 `Button` 基座构建：`useControllableState` 支撑受控/非受控；`aria-pressed`（布尔渲染）+ `data-state`（`on`/`off`）双通道反射状态；禁用时双保险（Button 原生 `disabled` + Toggle 层 `preventDefault`/`stopPropagation` 守卫，覆盖 `asChild` 非按钮场景）；Enter/Space 依赖 button 原生行为实现键盘可操作。UI 层 `SToggle` 为薄包装（`toggleVariants` 3 变体 × 6 尺寸 × 8 颜色 × 4 形状 + 16 组 soft/ghost 颜色 compoundVariants），`data-state` 经 UnoCSS `data-[state=on]:*` 选择器驱动按下样式。

**未发现 Blocker/Major 缺陷，补强单测 7 → 17 项 + 文档按 7 节 Recommended structure 重构：**

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                         |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | `aria-pressed` + `data-state`（`on`/`off`）双通道反射（D1-08）；受控/非受控闭环（`useControllableState`，D3-04）；禁用双保险（`disabled`/`aria-disabled`/`tabindex=-1` + 守卫点击，覆盖 `asChild` 非按钮场景）；Enter/Space 键盘可操作（button 原生行为，D1-16）；`useOmitProps` 均含 `class`（D1-10）；recipe 首行 `// @unocss-include`（D1-09）            |
| D2 行业对标 |  ✅  | `toggle` 为 Radix/shadcn 原生模式：受控、pressed 反射、变体、尺寸、禁用对齐 shadcn `Toggle`；AntD/Element Plus/Mantine/Naive UI 以「按钮 + 状态」或分段控件表达同一交互（无独立 toggle）。遗留增强：按下态图标动画（AntD 风格，见「遗留增强项」）                                                                                                            |
| D3 API 设计 |  ✅  | 受控/非受控（`v-model` + `defaultValue`）；`modelValue`/`defaultValue`/`disabled` 命名对齐主流（D3-01）；完整复用 `SButton` prop 面（`as`/`asChild`、`type`、loading 等，D3-08）；slot 暴露 `modelValue`/`pressed`/`state`/`disabled`；UI 层 `S` 前缀（D3-09）                                                                                               |
| D4 类型系统 |  ✅  | `pnpm typecheck` 全绿；props 全 interface + JSDoc（D4-03）；`ToggleProps extends ButtonProps`、`ToggleEmits` 独立声明；`ToggleVariant`/`ToggleShape` 由 `VariantProps` 派生（D4-05）                                                                                                                                                                         |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；`onClick` 守卫早退（guard clause）；`dataState` 用 `computed` 派生；无 `as any`/`@ts-expect-error`；模板无 `props.xxx`（D5-14）                                                                                                                                                                                                            |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 7 节 Recommended structure（Overview/Usage/Features/Demos/API/Notes/FAQ），含架构对标表（10 能力 × 6 库，以 shadcn `Toggle` 为主）+ 使用注意 + 4 组 FAQ；中英文结构完全对齐                                                                                                                                                          |
|   D7 其他   |  ✅  | 单测 7 → 17 项全通过（新增非受控 defaultValue/受控外部更新/非受控点击切换 data-state/变体+尺寸+形状+颜色类/slot props 反射/click 事件转发/disabled+aria-disabled 属性/on 态 axe）；axe 0 违规（off + on 双形态）；族系回归 toggle-group 8 项通过；无独立浏览器 e2e 文件，D7-19/20 由 happy-dom 单测覆盖（axe + 交互），与 button/checkbox 族系一致（非阻塞） |

---

## 二、行业对标矩阵

> `toggle` 是 Radix/shadcn 原生模式；Ant Design/Element Plus/Mantine/Naive UI 无独立 toggle 组件（以「按钮 + 状态切换」或分段控件表达），标记 `—`。

| 能力                          | SoybeanUI | Ant Design | Element Plus | Mantine | Naive UI | shadcn `Toggle` |
| :---------------------------- | :-------: | :--------: | :----------: | :-----: | :------: | :-------------: |
| headless/styled 分离          |    ✅     |     —      |      —       |    —    |    —     |       ✅        |
| 按下/未按下状态               |    ✅     |     —      |      —       |    —    |    —     |       ✅        |
| 受控/非受控                   |    ✅     |     —      |      —       |    —    |    —     |       ✅        |
| `aria-pressed` + `data-state` |    ✅     |     —      |      —       |    —    |    —     |       ✅        |
| 变体（outline/soft/ghost）    |    ✅     |     —      |      —       |    —    |    —     |       ✅        |
| 尺寸/形状（6 尺寸 × 4）       |    ✅     |     —      |      —       |    —    |    —     |        —        |
| 键盘（Enter/Space）           |    ✅     |     —      |      —       |    —    |    —     |       ✅        |
| 禁用态                        |    ✅     |     —      |      —       |    —    |    —     |       ✅        |
| axe 零违规                    |    ✅     |     —      |      —       |    —    |    —     |        —        |
| 按下态图标动画                |    ➕     |     ✅     |      —       |    —    |    —     |        —        |

---

## 三、发现的问题与处理

### 3.1 说明 — 无 Blocker/Major（关键路径逐项核对）

- **状态反射（D1-08）**：`:aria-pressed="modelValue"` 布尔绑定渲染 `"true"/"false"`；`data-state` 由 `computed(() => modelValue.value ? 'on' : 'off')` 派生，样式经 `data-[state=on]:*` 选择器驱动——双通道同源，无判定口径分歧（对比 C39 switch 的 `!!modelValue` 误判，toggle 为纯布尔值，无自定义值场景）。
- **禁用守卫**：Button 基座对 `as==='button'` 渲染原生 `disabled` + `tabindex="-1"`，非按钮（`asChild`）场景由 Toggle 层 `onClick` 守卫 `preventDefault`/`stopPropagation` 兜底——双保险覆盖两种渲染路径。
- **键盘（D1-16）**：Enter/Space 依赖 button 原生 click 行为（与 checkbox/switch 族系显式绑定 `@keydown.enter.prevent` 不同，但 button 语义本身正确且无 `prevent` 破坏）。
- **class 透传**：UI 层 `useOmitProps(props, ['class','color','variant','size','shape'])` 排除 class 后经 `toggleVariants({...}, props.class)` 合并注入，headless 层 class 原样透传至 button 元素——无双绑定（D1-10）。

### 3.2 D7-11 — 单测覆盖不足（已扩展 7 → 17 项）

**问题：** 原 [toggle.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/toggle.spec.ts) 仅 7 项：非受控 `defaultValue`、受控外部更新、点击后状态切换、变体/颜色/尺寸/形状类、slot props、click 事件转发、`disabled`+`aria-disabled` 属性、on 态 axe 均未覆盖。

**处理：** 扩展至 **17 项**，全部通过：

```bash
✓ test/specs/components/toggle.spec.ts (17 tests)
```

> 覆盖要点：非受控 `defaultValue`（D3-04）；受控 `setProps({ modelValue })` 外部更新（D3-04）；非受控点击 `data-state` off → on（D1-08）；变体 outline 类 + sm 尺寸 `h-7` + rounded 形状 `rounded-full`（D7-15）；颜色 primary 焦点环类（D7-15）；slot props `modelValue`/`pressed`/`state`/`disabled` 反射（D3-08）；原生 click 事件转发至使用者 `onClick`（D3-08）；`disabled` + `aria-disabled` 属性（D1-08）；on 态 axe 0 违规（D7-19）。

### 3.3 D7-05 — 文档重构（4 节 → 7 节 Recommended structure）

**问题：** en/zh 文档仅 `# / Overview / Usage / Demos / API` 4 节，缺 Features、Notes（架构与行业对标）、FAQ。

**处理：** 重构为 7 节（单 `SToggle` 导出，按规范省略 Component family）：Overview（含与 `SCheckbox` 的取舍）、Usage、Features（7 条 bullet）、Demos、API、Notes（架构链路 + **10 能力 × 6 库对标表** + 4 条 Cautions）、FAQ（4 组，含与 `SButton`/`SToggleGroup` 的区别）。中英文结构一一对应。

---

## 四、架构与模式要点

### 状态与视觉解耦

`data-state`（`on`/`off`）是连接状态与样式的唯一通道：headless 层只负责反射 `aria-pressed`/`data-state`，UI 层通过 UnoCSS `data-[state=on]:*` 与 `data-[state=off]:*` 选择器驱动 pressed 样式（16 组 soft/ghost 颜色 compoundVariants）。新增按下样式无需改组件逻辑，仅扩展 recipe。

### 复用与薄包装

`Toggle` 直接复用 `Button` 基座（`as`/`asChild`、`type`、disabled 处理、click 守卫），headless 层零样式；`SToggle` 仅 3 步：`useOmitProps` 剥离样式 props → `toggleVariants` 计算类 → 转发 `update:modelValue`。单类组件模式的标准落地样本。

---

## 五、变更文件清单

| 文件                                               | 变更类型                                                                                                              |
| :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `packages/ui/test/specs/components/toggle.spec.ts` | 单测 7 → 17 项（非受控/受控更新/点击切换/变体颜色尺寸形状/slot props/click 转发/disabled+aria-disabled/on 态 axe）    |
| `apps/docs/src/docs/en/components/toggle.md`       | 文档 4 节 → 7 节 Recommended structure（对标表 10 能力 × 6 库 + Cautions + FAQ）                                      |
| `apps/docs/src/docs/zh-CN/components/toggle.md`    | 与 en 一一对应的 7 节中文化版本                                                                                       |
| `docs/check.md`                                    | C41 行 7 维度 ⏳ → ✅；4.2 遗留增强项追加 `toggle` 行；批次 2 记录表追加 C41 行 + 批次合计更新（2 单元/单测 19 → 45） |
| `docs/check-reports/C41-toggle.md`                 | **新建** 本审计报告                                                                                                   |

## 六、验证命令

```bash
pnpm typecheck                          # 全仓 vue-tsc / tsc 全绿
cd packages/ui && pnpm exec vp test run toggle   # 17 项全通过（+ toggle-group 8）
pnpm lint && pnpm fmt                   # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞，见 check.md 4.2）

| 增强项         | 对标依据 | 说明                                                          |
| :------------- | :------- | :------------------------------------------------------------ |
| 按下态图标动画 | AntD     | 按压时图标轻微缩放/位移反馈，需在 `toggleVariants` 增补过渡类 |
