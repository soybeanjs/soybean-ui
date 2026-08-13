# C24 `navigation-menu` 检查优化报告

> **组件编号：** C24（`navigation-menu`）
> **组件名称：** `SNavigationMenu`（headless 基座：`NavigationMenuRoot`/`List`/`Item`/`Trigger`/`Content`/`Link`/`SubList`/`Viewport`/`Indicator` + `NavigationMenuCompact`/`OptionCompact`/`SubOptionCompact`/`ItemSlotCompact` 聚合）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `navigation-menu` 完成全维度审计。组件为「多槽 + Compact」模式：headless 持有全部状态（viewport 悬浮定位、content 显示/隐藏、trigger 展开、键盘导航、activeItem 追踪、indicator），定位/钳制数学收敛到 `shared.ts` 纯函数；Compact 聚合（`NavigationMenuCompact`/`OptionCompact`/`SubOptionCompact`）下沉至 headless 编排 Root→List→Option→Indicator→Viewport。UI 层 `SNavigationMenu` 仅做 `scv()` 配方与插槽/类注入。

**发现 Major ×1（已修复）**——D7 ARIA 缺口：trigger 缺 `aria-haspopup`。

|    维度     | 状态 |                                                                                                                                                                                           说明                                                                                                                                                                                            |
| :---------: | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |                    多槽 + Compact 正确：Compact 聚合下沉至 headless；viewport 悬浮定位（start/center/end × 水平/垂直 × LTR/RTL × `screenOffset` 钳制）、content 显隐（`usePresence` + `unmountOnHide`）、trigger 展开（点击/悬停，`disableClickTrigger`/`disableHoverTrigger`）、键盘（roving focus/Enter/Space/Esc）、indicator、activeItem 追踪、禁用项完整（D1-12）                    |
| D2 行业对标 |  ✅  |                               对标 shadcn-vue/Radix NavigationMenu 与 Ant Design Menu：SoybeanUI 对齐 Radix 的 hover/click 双触发、延迟控制（`delayDuration`/`skipDelayDuration` + `disablePointerLeaveClose`）、roving focus + 入口方向键 + Esc、indicator、定位 viewport、`align`、`ForceMountProps`；相对 AntD 增量为 headless 分离与 RTL 定位（D2-11）                                |
| D3 API 设计 |  ✅  |                                                  `modelValue`/`defaultValue`、`dir`/`orientation`、`disableClickTrigger`/`disableHoverTrigger`、`delayDuration`/`skipDelayDuration`、`align`、区域 props（`linkProps`/`triggerProps`/`contentProps`/`viewportProps` 等）命名与 Radix 一致；事件 `update:modelValue`/`select` 元组化清晰                                                   |
| D4 类型系统 |  ✅  |                                                                                  `NavigationMenuOptionData`（含一级 `children`）/`SubOptionData` 类型清晰；Emits 用命名元组（`select: [payload: CustomEvent<{originalEvent}>]`）；`PropsToContext` 精确限定 context 键；JSDoc + `@defaultValue` 覆盖完整                                                                                  |
| D5 代码规范 |  ✅  |                                                                                `eslint` 0 errors；`useOmitProps` 含 `class`；定位/钳制数学提取为纯函数（`shared.ts`）；headless 用 `shallowRef` + `computed` 保持响应式；`useDismissableLayer`/`useCollection`/`usePresence` 复用；无 `props.xxx`/内联箭头                                                                                |
|   D6 文档   |  ✅  |                                                                                              en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表 + 7 条运行时注意 + FAQ 6 组；`Features` 覆盖双触发/延迟/键盘/indicator/定位/activeItem/禁用/19 UI 槽                                                                                               |
|   D7 其他   |  ✅  | **Major 修复**（D7-05 ARIA）：trigger 补 `aria-haspopup="menu"`（与 Radix 对齐），现具备 `aria-haspopup`/`aria-expanded`/`aria-controls`/`aria-owns`/`aria-labelledby`/`aria-current`；data 属性遵循 D1-07（`data-soybean-navigation-menu-*`）；SSR 安全（无顶层 `window`/`document`，`content` 用 `isClient` 守卫 Teleport）；**19 项单测通过**（含新增 aria-haspopup 测试）；axe 无违规 |

---

## 二、行业对标矩阵

> `navigation-menu` 是**响应式导航菜单**模式（hover/click 双触发 + 悬浮子菜单）。Radix/shadcn-vue NavigationMenu 与 Ant Design Menu 为对标对象。

| 能力               | SoybeanUI | Radix NavigationMenu | Ant Design Menu |
| :----------------- | :-------: | :------------------: | :-------------: |
| Headless/样式分离  |    ✅     |          ✅          |       ❌        |
| hover/click 双触发 |    ✅     |          ✅          |       ✅        |
| 延迟控制           |    ✅     |          ✅          |      部分       |
| 键盘（roving/Esc） |    ✅     |          ✅          |       ✅        |
| indicator          |    ✅     |          ✅          |       ❌        |
| 定位 viewport      |    ✅     |          ✅          |      部分       |
| 垂直 + 水平        |    ✅     |          ✅          |       ✅        |
| RTL 定位/动画      |    ✅     |          ✅          |       ❌        |
| `aria-haspopup`    |    ✅     |          ✅          |      部分       |
| 禁用项             |    ✅     |          ✅          |       ✅        |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Major — D7 ARIA：trigger 缺 `aria-haspopup`

**现象：** [navigation-menu-trigger.vue](../../packages/headless/src/components/navigation-menu/navigation-menu-trigger.vue) 的 trigger 具备 `aria-expanded`/`aria-controls`，但缺少 `aria-haspopup`。WAI-ARIA 的 navigation/disclosure 模式要求含子菜单的触发按钮标注 `aria-haspopup="menu"`，Radix NavigationMenu 亦如此设置。缺失会削弱屏幕阅读器对「此按钮会展开菜单」的提示。

**修复：** 在 trigger 上补 `aria-haspopup="menu"`，与 `aria-expanded`/`aria-controls` 共同构成完整的子菜单触发语义。新增测试断言 trigger 具备 `aria-haspopup="menu"` 且 `aria-expanded` 随开合反射。重跑 19 项全部通过。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 下沉**：`NavigationMenuCompact`/`OptionCompact`/`SubOptionCompact` 在 headless 内编排结构；UI 层 `SNavigationMenu` 仅转发配方与插槽。
- **D2-11 对标覆盖**：数据驱动 Compact 路径支持「根项 + 一级子项」浮层；任意深度嵌套通过 headless 组合达成（文档已区分）。
- **D7-05 SSR**：无顶层 `window`/`document`；`content` 用 `isClient` 守卫 Teleport 目标。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/navigation-menu.spec.ts`：**19 项全部通过**（4 定位 + 4 指示器 + 渲染/linkProps/禁用/open state/ARIA/a11y）。
- 源码仅改 trigger.vue（+1 属性），测试 +1 项；无类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项       | 对标依据    | 说明                                                                                              |
| :----------- | :---------- | :------------------------------------------------------------------------------------------------ |
| 键盘导航 e2e | D7-19/D7-20 | 真实 roving focus/入口方向键/Esc 归还焦点/焦点代理建议浏览器 e2e 覆盖（happy-dom 难模拟焦点代理） |
| 浏览器 e2e   | D7-19/D7-20 | hover 延迟/定位视口真实尺寸/指示器滑动动画建议浏览器覆盖，排期评估                                |
