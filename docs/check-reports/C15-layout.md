# C15 `layout` 检查优化报告

> **组件编号：** C15
> **组件名称：** `layout` / `SLayout` / `SLayoutClassic`
> **模式：** 多槽 + Compact（`scv()` 配方 `layoutVariants` + `layoutClassicVariants`；headless `LayoutCompact` / `LayoutClassicCompact` 聚合 Root + Sidebar + Header + Tab + Content + Footer + Rail + Mobile + Trigger）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-11、D3-12、D7-09

---

## 一、执行摘要

对 `SLayout` 与 `SLayoutClassic` 完成全维度审计。组件架构清晰：headless 层拥有 14 个 SFC（含 Root、Sidebar、Rail、Header、Tab、Content、Footer、Mobile、Trigger、ClassicRoot、ClassicCompact、ClassicPlaceholder、Compact、shared），通过 `provideLayoutRootContext` / `provideLayoutClassicRootContext` 管理状态，CSS 变量驱动尺寸，`useControllableState` 处理 `v-model:open`。styled 层使用 `scv()` 多槽配方（root / sidebar / sidebarRoot / sidebarWrapper / sidebarGapHandler / main / header / tab / content / footer / rail / trigger / mobile / mobileDrawer / mobileOverlay，classic 额外含 headerPlaceholder / tabPlaceholder / footerPlaceholder），3 种 variant（sidebar / floating / inset）、2 种 collapsible（icon / offcanvas）、2 种 side（left / right）、6 种 size。

发现并修复 4 项问题：

1. **Minor (D1-08)**：`LayoutTrigger` 与 `LayoutRail` 缺少 `aria-expanded` 反映侧边栏展开状态。
2. **Minor (D1-13)**：`layoutClassicVariants.rail` 缺少 `rtl:translate-x-1/2`（`layoutVariants.rail` 已有）。
3. **Minor**：`layout-compact.vue` 与 `layout-classic-compact.vue` 存在冗余外部 `v-if`（与子组件内部 `v-if` 重复，且 Header/Tab/Footer 三者不一致）。
4. **Major (D6)**：中英文文档仅有 Overview / Usage / Demos / API，缺少 Features / Notes / FAQ。

测试从 5 项扩展到 42 项（覆盖 SLayout 渲染 / 可见性 / 状态映射 / variants / fullContent / mobile / CSS 变量；SLayoutClassic 渲染 / 状态映射 / 可见性 / fullContent；LayoutTrigger 与 LayoutRail 的 aria-expanded 与点击切换）。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                              |
| :---------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| D1 功能合规 |  ✅  | 多槽 + Compact；`scv()` `// @unocss-include`；`useOmitProps` 含 `class`；`data-soybean-layout-*` 全覆盖；已补 `aria-expanded`；已补 RTL `rtl:translate-x-1/2`                                                                                     |
| D2 行业对标 |  ✅  | headless/styled 分离 + 3 variants + 2 collapsible + 移动端 Dialog 抽屉 + Classic 方向/滚动/固定头尾 + baseZIndex 协调，功能优于 Ant Design / Element Plus                                                                                         |
| D3 API 设计 |  ✅  | `open`/`defaultOpen`/`side`/`variant`/`collapsible`/`sidebarVisible`/`headerVisible`/`tabVisible`/`footerVisible`/`fullContent`/`pxToRem` + Classic `orientation`/`scrollBehavior`/`fixedTop`/`fixedFooter`/`stretchFooter`/`baseZIndex` 命名规范 |
| D4 类型系统 |  ✅  | strict 通过；`LayoutRootProps extends BaseProps`；`LayoutCompactProps extends LayoutRootProps, LayoutOthersProps`；`LayoutClassicRootProps extends Omit<LayoutRootProps, 'variant' \| 'collapsible'>`                                             |
| D5 代码规范 |  ✅  | `useOmitProps` + `transformPropsToContext`；`useControllableState` 受控状态；`useId()` 稳定 scrollId；已消除冗余外部 v-if                                                                                                                         |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（15 条）+ Notes（架构对标表 11 维度 + 运行时注意事项 6 条）+ FAQ（7 条）                                                                                                                                                |
|   D7 其他   |  ✅  | 42 项单元测试通过；SSR 安全（无 window/document 访问）；a11y（aria-expanded + tabindex + Dialog 焦点陷阱）                                                                                                                                        |

---

## 二、行业对标矩阵

| 能力                                 | SoybeanUI | Ant Design `Layout`/`Sider` | Element Plus `ElContainer`/`ElAside` |
| :----------------------------------- | :-------: | :-------------------------: | :----------------------------------: |
| headless/styled 分离                 |    ✅     |              —              |                  —                   |
| 侧边栏变体（sidebar/floating/inset） |    ✅     |              —              |                  —                   |
| 折叠模式（icon + offcanvas）         |    ✅     |             ✅              |                  —                   |
| 移动端抽屉（Dialog 内置）            |    ✅     |              —              |                  —                   |
| 固定头尾（fixedTop/fixedFooter）     |    ✅     |              —              |                  —                   |
| 方向切换（horizontal/vertical）      |    ✅     |              —              |                  —                   |
| 滚动行为（wrapper/content）          |    ✅     |              —              |                  —                   |
| CSS 变量尺寸                         |    ✅     |              —              |                  —                   |
| RTL 支持（逻辑属性 + rtl: 变体）     |    ✅     |              —              |                  —                   |
| baseZIndex 堆叠协调                  |    ✅     |              —              |                  —                   |
| 区域可见性 props                     |    ✅     |              —              |                  —                   |
| Headless 导出（Root/Sidebar/...）    |    ✅     |              —              |                  —                   |

---

## 三、发现的问题与处理

### 3.1 Minor — `LayoutTrigger` 与 `LayoutRail` 缺少 `aria-expanded`（已修复，D1-08）

**问题：** `LayoutTrigger`（头部按钮）与 `LayoutRail`（边缘拖拽热区）只有 `aria-label` / `title`，没有 `aria-expanded` 反映侧边栏展开状态。屏幕阅读器无法感知当前展开/折叠状态。

**修复：**

- `layout-trigger.vue`：新增 `:aria-expanded="!!open"`。
- `layout-rail.vue`：从 context 解构 `open`，新增 `:aria-expanded="!!open"`。

### 3.2 Minor — `layoutClassicVariants.rail` 缺少 RTL 支持（已修复，D1-13）

**问题：** `layoutVariants.rail` 的 class 含 `rtl:translate-x-1/2`，但 `layoutClassicVariants.rail` 只有 `-translate-x-1/2`，缺少 `rtl:translate-x-1/2`。RTL 模式下 Classic 布局的 rail 位置不正确。

**修复：** 在 `layoutClassicVariants.rail` 的首条 class 中补上 `rtl:translate-x-1/2`，与 `layoutVariants.rail` 保持一致。

### 3.3 Minor — Compact 组件冗余外部 v-if（已修复，D5）

**问题：** `layout-compact.vue` 对 `<LayoutTab>` 与 `<LayoutFooter>` 同时使用外部 `v-if` 与内部 `v-if`（子组件根元素已有 `v-if="tabVisible"` / `v-if="footerVisible"`），而 `<LayoutHeader>` 仅依赖内部 `v-if`。`layout-classic-compact.vue` 仅对 `<LayoutFooter>` 加外部 `v-if`，`<LayoutHeader>` / `<LayoutTab>` 未加。三个区域处理方式不一致。

**修复：** 移除 `layout-compact.vue` 中 `<LayoutTab>` 与 `<LayoutFooter>` 的外部 `v-if`，移除 `layout-classic-compact.vue` 中 `<LayoutFooter>` 的外部 `v-if`。统一由子组件内部 `v-if` 控制可见性。

### 3.4 Major — 文档缺少 Features / Notes / FAQ（已修复，D6-02 / D6-03 / D6-10 / D6-11 / D6-15）

**问题：** 中英文文档仅有 Overview / Usage / Demos / API，缺少 Features、Notes（架构对标 + 运行时注意事项）、FAQ。未说明两种布局模式区别、3 种 variants、collapsible 模式、mobile 抽屉机制、CSS 变量驱动、size 缩放、fixedTop/fixedFooter 占位机制、scrollId、baseZIndex 协调等。

**修复：** 在中英文文档中新增：

- **Features**：15 条（两种布局模式 / 三种 variants / 可折叠 / 侧边控制 / 移动端抽屉 / 槽位级覆盖 / CSS 变量 / size 缩放 / fullContent / Classic 方向 / Classic 滚动 / 固定头尾 / baseZIndex / Headless 组合 / SSR 安全）
- **Notes → 架构与对标**：11 维度对比表（含 Ant Design、Element Plus）
- **Notes → 运行时注意事项**：6 条（rem 转换 / size 缩放 / 声明式移动端 / Trigger vs Rail / Classic 占位 / scrollId）
- **FAQ**：7 条（SLayout vs SLayoutClassic / 控制展开状态 / 折叠为图标 / 移动端模式 / 右侧侧边栏 / z-index 协调 / 区域级属性定制）

---

## 四、重点检查项结论

| 检查项                 | 结论 | 证据                                                                                                                                                                                                                                                                                |
| :--------------------- | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-12** Compact 聚合 |  ✅  | `LayoutCompact` 聚合 Root + Sidebar + Rail + Main + Header + Tab + Content + Footer，UI 包装层（`layout.vue`）仅做 variant 计算 + slot 透传，无 `v-for` 默认渲染；`LayoutClassicCompact` 额外聚合 ClassicPlaceholder，UI 包装层（`layout-classic.vue`）同样仅做 variant + slot 透传 |
| **D2-11** 防篡改       |  —   | layout 为结构组件，无遮罩层防篡改需求；状态由 `useControllableState` + `data-state` 反映，不涉及 `MutationObserver`                                                                                                                                                                 |
| **D3-12** API 扩展性   |  ✅  | 每个区域接受 `*Props`（sidebarProps / headerProps / tabProps / contentProps / footerProps / mainProps / railProps / mobileProps）透传到 headless 区域组件；`pxToRem` 可自定义；`scrollId` 可自定义；`baseZIndex` 可自定义                                                           |
| **D7-09** SSR 安全     |  ✅  | setup 中无 `window`/`document` 访问；`useId()` 生成稳定 scrollId；`useControllableState` 基于 shallowRef；CSS 变量在服务端可正确序列化为 style 属性；`isMobile` 由外部传入，避免服务端猜测视口                                                                                      |

---

## 五、架构亮点

### 双布局模式

SoybeanUI 提供两种布局：

1. **`SLayout`（modern）**：`LayoutRoot` + `LayoutCompact` 聚合 Sidebar + Main（Header + Tab + Content + Footer）。Sidebar 通过 `sidebarGapHandler` 占位 + `sidebarWrapper` 绝对定位实现。支持 3 种 variant（sidebar / floating / inset）与 2 种 collapsible（icon / offcanvas）。

2. **`SLayoutClassic`（admin classic）**：`LayoutClassicRoot` + `LayoutClassicCompact` 聚合 Main（Header + Placeholder + Tab + Placeholder + Sidebar + Content + Footer + Placeholder）。支持 orientation（horizontal / vertical）、scrollBehavior（wrapper / content）、fixedTop / fixedFooter（通过 `LayoutClassicPlaceholder` 渲染占位 div 防止内容滑入固定区域）。

### CSS 变量驱动

`shared.ts` 定义 16 个 CSS 变量：

- 尺寸：`--soybean-sidebar-width`、`--soybean-collapsed-sidebar-width`、`--soybean-current-sidebar-width`、`--soybean-layout-header-height`、`--soybean-layout-tab-height`、`--soybean-layout-footer-height`
- 间距：`--soybean-layout-start-gap`、`--soybean-layout-sidebar-top-gap`、`--soybean-layout-sidebar-bottom-gap`、`--soybean-layout-header-start-gap`、`--soybean-layout-footer-start-gap`
- z-index：`--soybean-layout-base-z-index`、`--soybean-layout-sidebar-z-index`、`--soybean-layout-header-z-index`、`--soybean-layout-tab-z-index`、`--soybean-layout-footer-z-index`

所有尺寸经 `pxToRem` 转 rem，UI 包装层按 `themeSizeRatio[size] / themeSizeMap.md` 缩放。

### 移动端抽屉

`LayoutSidebar` 根据 `isMobile` 切换：

- 桌面：`sidebarRoot` > `sidebarGapHandler` + `sidebarWrapper` > `sidebar`
- 移动：`LayoutMobile`（基于 `Dialog` 的抽屉，含 `DialogPortal` + `DialogOverlay` + `DialogPopup`，继承 `mobileSidebarWidth`）

### 状态反映

`LayoutRoot` 在根元素上输出：

- `data-state="expanded|collapsed"`（基于 `open`）
- `data-collapsible`（折叠时输出 collapsible 模式）
- `data-side`、`data-variant`、`data-mobile`、`data-sidebar-visible`、`data-header-visible`、`data-tab-visible`、`data-footer-visible`、`data-full-content`

`LayoutTrigger` 与 `LayoutRail` 通过 `aria-expanded` 反映展开状态。

`LayoutClassicRoot` 额外输出 `data-orientation`、`data-scroll-behavior`、`data-fixed-top`、`data-fixed-footer`、`data-stretch-footer`。

---

## 六、变更文件清单

| 文件                                                                 | 变更类型                                                                                                                                                                            |
| :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/layout/layout-trigger.vue`         | 新增 `:aria-expanded="!!open"`                                                                                                                                                      |
| `packages/headless/src/components/layout/layout-rail.vue`            | 解构 `open`，新增 `:aria-expanded="!!open"`                                                                                                                                         |
| `packages/ui/src/styles/layout.ts`                                   | `layoutClassicVariants.rail` 补 `rtl:translate-x-1/2`                                                                                                                               |
| `packages/headless/src/components/layout/layout-compact.vue`         | 移除 `<LayoutTab>` 与 `<LayoutFooter>` 的外部 `v-if`                                                                                                                                |
| `packages/headless/src/components/layout/layout-classic-compact.vue` | 移除 `<LayoutFooter>` 的外部 `v-if`                                                                                                                                                 |
| `packages/ui/test/specs/components/layout.spec.ts`                   | 从 5 项扩展到 42 项（SLayout 渲染 / 可见性 / 状态映射 / variants / fullContent / mobile / CSS 变量；SLayoutClassic 全维度；LayoutTrigger / LayoutRail 的 aria-expanded 与点击切换） |
| `apps/docs/src/docs/en/components/layout.md`                         | 新增 Features（15 条）+ Notes（架构对标表 11 维度 + 运行时注意事项 6 条）+ FAQ（7 条）                                                                                              |
| `apps/docs/src/docs/zh-CN/components/layout.md`                      | 新增功能（15 条）+ 注意事项（架构对标表 11 维度 + 运行时注意事项 6 条）+ 常见问题（7 条）                                                                                           |
| `docs/check.md`                                                      | 标记 C15 各维度为 ✅                                                                                                                                                                |

---

## 七、验证命令

```bash
# 单元测试（42 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/layout.spec.ts
# → Test Files 1 passed (1) | Tests 42 passed (42)

# 类型检查（全工作区通过）
pnpm typecheck
# → 无错误

# Lint
pnpm lint
# → Found 0 warnings and 0 errors
```

---

_报告生成于组件审计工作流 C15，方法论见 [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md)。_
