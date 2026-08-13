# C15 `layout` 检查优化报告

> **组件编号：** C15（`layout`）
> **组件名称：** `SLayout` / `SLayoutClassic`（headless 基座：`LayoutRoot`/`LayoutSidebar`/`LayoutRail`/`LayoutMain`/`LayoutHeader`/`LayoutTab`/`LayoutContent`/`LayoutFooter`/`LayoutMobile`/`LayoutTrigger` + `LayoutCompact`/`LayoutClassicCompact` 聚合）
> **模式：** 多槽（Compact 聚合）
> **优先级：** P2
> **检查日期：** 2026-08-13
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-12、D7-09

---

## 一、执行摘要

对 `layout` 完成全维度审计。组件为「多槽 + Compact」模式：headless `LayoutCompact`/`LayoutClassicCompact` 持有 `open`（可控/非受控）、侧边栏尺寸、区域可见性等状态并聚合各区域基座（sidebar/rail/main/header/tab/content/footer/mobile/trigger）；UI 层 `SLayout`/`SLayoutClassic` 仅做 `scv()` 配方（variant/side/collapsible/fullContent/size）、CSS 变量与插槽转发。提供 `SLayout`（现代侧边栏流）与 `SLayoutClassic`（经典后台，固定头/底、方向、滚动行为、z-index 派生）两种模式。

**发现 Minor ×1**（已修复）——D7 测试名与行为不符：

|    维度     | 状态 |                                                                                                                                                   说明                                                                                                                                                    |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| D1 功能合规 |  ✅  |             多槽 + Compact 正确：Compact 聚合下沉至 headless（状态/装配），UI 层保持薄封装（variant/class/插槽转发）；区域级 `*Props` 透传（sidebarProps/headerProps/tabProps/contentProps/footerProps/mainProps/railProps/mobileProps）完整（D1-12）；headless 零样式、UI 层无 ARIA/状态逻辑             |
| D2 行业对标 |  ✅  |               对标 Ant Design `Layout`/`Sider`/`Header` 与 Element Plus `ElContainer`/`ElAside`：SoybeanUI 提供三种侧边栏变体（sidebar/floating/inset）、两种折叠模式（icon/offcanvas）、内置移动端抽屉、固定头/底、方向/滚动行为、CSS 变量尺寸、RTL 逻辑属性与 `baseZIndex` 协调（D2-11）                |
| D3 API 设计 |  ✅  | `v-model:open`/`default-open`、`side`/`variant`/`collapsible`/`fullContent`/`size`、区域可见性（`*Visible`）、尺寸（`*Width`/`*Height`）命名与主流库一致；`LayoutCompactSlots` 语义清晰（sidebar/header/tab/content/footer/default）；`LayoutTrigger`/`LayoutRail` 通过 `aria-expanded` 暴露状态（D3-12） |
| D4 类型系统 |  ✅  |                         `LayoutRootProps`/`LayoutCompactProps`/`LayoutClassicCompactProps` 层级清晰；`LayoutUiSlot`（15 槽）/`LayoutClassicUiSlot`（18 槽）用 `UiClass<T>`；`LayoutRootContextParams` 用 `PropsToContext` 与 `ShallowRef` 精确刻画；JSDoc 覆盖全部 props 及默认值                         |
| D5 代码规范 |  ✅  |                       `eslint` 0 errors；`useOmitProps` 含 `class`；headless 用 `shallowRef`（`open`/`mobileOpen`）+ `computed`（`sidebarState`/`dataCollapsible`/`style`）保持响应式；`pxToRem` 纯函数化；模板无 `props.xxx`、无内联箭头函数；`layoutCssVars` 集中定义 CSS 变量键                        |
|   D6 文档   |  ✅  |                                   en/zh 文档结构完全对齐（Overview/Features/Usage/Demos/API/Notes/FAQ）；Notes 含架构对标表（10 关注点 × 3 库）+ 6 条运行时注意 + FAQ 6 组；`Features` 21 条能力覆盖两种布局模式/三变体/折叠/移动端/固定头底/方向/滚动/z-index/RTL/SSR                                    |
|   D7 其他   |  ✅  |                   42 项单测通过（rendering/visibility/state 反射/variants/fullContent/mobile/CSS 变量/LayoutTrigger/LayoutRail）；data 属性遵循 D1-07（`data-soybean-layout-*`）；SSR 无顶层 `window`/`document` 访问（D7-09）；`update:open` 事件经 trigger 切换真实发出（Minor 修复）                   |

---

## 二、行业对标矩阵

> `layout` 是**管理后台布局外壳**模式。Ant Design `Layout` 家族与 Element Plus `ElContainer` 家族为直接对标对象；Mantine 采用 `AppShell`、Naive UI 采用 `Layout`/`LayoutSider`。

| 能力              |    SoybeanUI     | Ant Design  | Element Plus | Mantine |  Naive UI   |
| :---------------- | :--------------: | :---------: | :----------: | :-----: | :---------: |
| 布局外壳          |        ✅        |     ✅      |      ✅      |   ✅    |     ✅      |
| 侧边栏变体        |       3 种       |  仅 sider   |   仅 aside   |    —    |  仅 sider   |
| 折叠模式          | icon + offcanvas |     ✅      |      —       |    —    |     ✅      |
| 内置移动端抽屉    |        ✅        | 组合 Drawer | 组合 Drawer  |    —    | 组合 Drawer |
| 固定头部/底部     |        ✅        | 手动 sticky | 手动 sticky  |    —    | 手动 sticky |
| 方向/滚动行为     |        ✅        |      —      |      —       |    —    |      —      |
| CSS 变量尺寸      |        ✅        |  内联宽度   |   内联宽度   |    —    |  内联宽度   |
| RTL 支持          |        ✅        |      —      |      —       |    —    |      —      |
| Z-index 协调      |        ✅        |    手动     |     手动     |    —    |    手动     |
| Headless/样式分离 |        ✅        |     ❌      |      ❌      |    —    |     ❌      |

`—` = 不支持或采用不同交互模型。

---

## 三、发现的问题与处理

### 3.1 Minor — D7 测试「emits update:open when state changes via trigger」名实不符

**现象：** [layout.spec.ts](../../packages/ui/test/specs/components/layout.spec.ts) 中该测试仅挂载 `SLayout`（`defaultOpen: false`）并断言根元素 `data-state` 为 `collapsed`，**未放置 `LayoutTrigger` 也未触发任何交互**，与测试名所述的「state changes via trigger」不符，`update:open` 事件实际从未被验证。

**修复：** 该测试改为在 `header` 插槽放置 `LayoutTrigger`，点击后断言：

- `wrapper.emitted('update:open')` 已发出且最近一次载荷为 `[true]`；
- 根元素 `data-state` 由 `collapsed` 更新为 `expanded`。

从而真实验证可控状态的 `update:open` 事件链（trigger → `toggleSidebar` → 可控 `open` → emit）。重跑 42 项全部通过。

### 3.2 核查结论（非缺陷）

- **D1-12 Compact 下沉**：`LayoutCompact`/`LayoutClassicCompact` 在 headless 内迭代区域并聚合状态；UI 层 `SLayout`/`SLayoutClassic` 仅转发插槽与配方，无装配逻辑。
- **D3-12 命名一致性**：`open`/`default-open`、`side`/`variant`/`collapsible`、`*Visible`、`*Width`/`*Height` 与主流库语义对齐。
- **D7-09 SSR**：headless setup 无 `window`/`document`；`useId()` 生成稳定滚动 id；`pxToRem` 纯函数。
- **D1-07 data 属性**：`data-soybean-layout-root`、`-sidebar`、`-rail`、`-main`、`-header`、`-tab`、`-content`、`-footer`、`-mobile`、`-trigger`、`-classic-root`、`-{type}-placeholder` 全部遵循单命名空间规范，无冗余属性。

---

## 四、验证

- `pnpm --filter @soybeanjs/ui exec vitest run test/specs/components/layout.spec.ts`：**42 项全部通过**（改进后仍 42 项，含真实验证 `update:open` 事件）。
- 仅修改测试文件 `layout.spec.ts` 的单个用例，无源码/类型变更，`pnpm typecheck` 与 lint 不受影响（与既有基线一致）。

## 五、遗留增强项（非阻塞，排期）

| 增强项          | 对标依据    | 说明                                                                                                                   |
| :-------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------- |
| 浏览器 e2e spec | D7-19/D7-20 | 侧边栏折叠/移动端抽屉/固定头底占位/rail 拖拽建议浏览器覆盖（依赖真实布局尺寸与滚动，happy-dom 难以可靠断言），排期评估 |
