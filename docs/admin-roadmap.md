# @soybeanjs/admin — 中后台管理系统组件包路线图 (Roadmap)

> 本文档规划一个全新的 **`packages/admin`** 可发布包（发布名 **`@soybeanjs/admin`**），面向后端管理系统（Admin / 中后台）场景，遵循 `packages/ui`（`@soybeanjs/ui`）已确立的结构、分层、构建与发布模式。它以 **soybean-admin**（`/Users/soybean/Web/Projects/SoybeanJS/soybean-admin`）为参考蓝本，沉淀并形式化为可复用组件。

---

## 1. 概述 (Overview)

### 1.1 背景与目标

`@soybeanjs/ui` 提供原子化的通用 UI 组件（88 个已发布），定位「桌面优先、headless/styled 分离、企业级」。但其组件均为**单一职责的原子组件**，而真实的中后台系统由大量**复合/布局型模块**构成——侧边栏、顶栏、多页签、命令面板、主题抽屉、面包屑、页头、数据表格等。这些模块在 **soybean-admin** 中以应用内私有组件（`src/layouts/modules/**`、`src/components/**`）存在，无法直接复用。

`@soybeanjs/admin` 的目标：

1. **沉淀布局系统**：将统一 `SLayout`（原 `SLayout`/`SLayoutClassic` 合并）封装为 `AppLayout`，并把 soybean-admin 的 6 种布局/菜单模式组件化。
2. **沉淀菜单系统**：提供支持 6 种菜单模式的 `AppMenu`。
3. **提取通用中后台组件**：从 soybean-admin 中分析、提取、优先级化可复用的复合组件。
4. **研究并收录实用组件**：收录中后台高频但 `@soybeanjs/ui` 尚未提供的实用组件。
5. **保持与 `@soybeanjs/ui` / `@soybeanjs/headless` 的清晰边界**：`admin` 建立在 `ui` 之上，`ui` 提供原子组件，`admin` 提供业务/布局复合组件。

### 1.2 与现有包的关系（依赖方向）

```
@soybeanjs/headless  (逻辑层, 无样式)
        ▲
@soybeanjs/ui        (样式化原子组件, 88 个)         @soybeanjs/theme / ui-unocss
        ▲                                                      ▲
@soybeanjs/admin      (中后台复合/布局组件) ────────────────────┘ (复用同一套 token)
        ▲
    业务应用 (soybean-admin 等)
```

- **`packages/admin` 只允许向上依赖**：可导入 `@soybeanjs/ui`、`@soybeanjs/headless`、`@soybeanjs/theme`、`@soybeanjs/ui-unocss`；**不得**被 `ui` / `headless` 反向依赖。
- 复用 `@soybeanjs/ui` 的原子组件（`SButton`、`STabs`、`SBreadcrumb`、`SScrollbar`、`SDrawer`、`SPopover` 等）与 `@soybeanjs/cva` 的 `cv()` / `scv()` 样式方案。
- 复用 `@soybeanjs/theme` 的 token 与 `@soybeanjs/ui-unocss` 的 UnoCSS preset（含 `menu`、`sidebar` 等色族，见 `packages/ui-unocss/src/index.ts`）。

### 1.3 命名与导出约定

> **开发注意事项：所有组件统一采用 `S` 前缀**（与 `@soybeanjs/ui` 保持一致）。`@soybeanjs/admin` 不另行引入 `A` 前缀，避免同仓库内两套前缀并存造成混淆；复合组件通过 `App*` 内部命名区分，但对外导出统一为 `S` 前缀。

| 包                 | 前缀 | 示例                     |
| :----------------- | :--: | :----------------------- |
| `@soybeanjs/ui`    | `S`  | `SButton`, `SLayout`     |
| `@soybeanjs/admin` | `S`  | `SAppLayout`, `SAppMenu` |

- 复合组件内部以 `App*` 命名（职责名）：`AppLayout`, `AppMenu`, `AppPageHeader`, `AppMultiTab` 等，**对外导出统一为 `S*` 前缀**（`SAppLayout`…）。
- 每个组件遵循 `packages/ui` 的目录结构：`components/[name]/{index.ts, *.vue, types.ts}` + `packages/admin/src/styles/[name].ts`（`cv()` / `scv()`，顶部 `// @unocss-include`）。
- 组件名（`@soybeanjs/admin/app-layout` 等子路径）可参照 `@soybeanjs/ui` 的子路径导出方式。

---

## 2. 目标技术架构 (Architecture)

### 2.1 目录结构

```
packages/admin/
├── package.json           # name: @soybeanjs/admin
├── tsconfig.json          # path alias: @/ -> src/
├── vite.config.ts         # vp pack + unocss build
├── src/
│   ├── components/
│   │   ├── app-layout/    # index.ts, app-layout.vue, types.ts
│   │   ├── app-menu/      # 6 种菜单模式 + first-level-menu 等
│   │   ├── app-page-header/
│   │   ├── app-multi-tab/
│   │   ├── app-command-palette/
│   │   ├── app-theme-drawer/
│   │   └── ... (见 §5 / §6)
│   ├── styles/            # cv/scv recipe 文件
│   ├── composables/       # admin 级组合式 (useMenuData, useMultiTab, usePageTabCache…)
│   ├── types/             # admin 级类型 (App.Menu 等)
│   ├── resolver/          # unplugin-vue-components resolver
│   ├── nuxt/              # Nuxt module (可选)
│   └── index.ts           # barrel
```

### 2.2 构建与依赖（对齐 `packages/ui`）

参考 [packages/ui/package.json](../packages/ui/package.json)：

- `"build": "vp pack && pnpm build:css"`；`build:css` 用 `unocss 'src/styles/**/*.ts' -o dist/styles.css --minify`。
- `exports`：`.`、`./resolver`、`./nuxt`、`./styles.css`，以及按需的 `./*` 子路径。
- `dependencies`：`@soybeanjs/ui` (workspace)、`@soybeanjs/headless`、`@soybeanjs/cva`、`@soybeanjs/theme`、`@soybeanjs/utils`、`@soybeanjs/hooks`、`@iconify/vue`。
- `devDependencies`：`@soybeanjs/ui-unocss`、`unocss`、`vite-plus`、`vitest`、`vue-tsc` 等（与 `packages/ui` 保持一致）。
- `peerDependencies`：`vue >= 3.2`、`vue-router >= 4`（可选）、`@soybeanjs/ui`。
- 需要将 `packages/admin` 加入根 `pnpm-workspace.yaml` 的 `packages` 列表，并在 `docs/architecture.md` 的发布包清单中登记为第 7 个可发布包。

### 2.3 代码质量与护栏

- 编辑 `**/*.{ts,tsx}` 前加载全局技能 `typescript-functional-style`；编辑 `**/*.vue` 前加载 `typescript-functional-style` + `vue-sfc-structure`。
- `packages/admin` 仍遵循 headless/styled 边界：状态、a11y、键盘、焦点逻辑放 `@soybeanjs/headless` 或 admin 自身的 composables；`packages/admin` 负责样式与复合编排。
- 禁止在 `packages/admin` 中写原始 CSS/SCSS —— 仅 UnoCSS 工具类。
- 禁止 `as any` / `@ts-ignore` / `@ts-expect-error`。

### 2.4 UI 组件复用规范（Component Reuse Policy）

> **核心原则：查询优先、复用优先、避免重复实现。** 在 `packages/admin` 中开发任何组件前，必须先查询 `@soybeanjs/ui`（`packages/ui/src/index.ts`）与 `@soybeanjs/headless` 是否已提供等价能力；已有则直接复用/复合封装，绝不重复造原子组件。

`@soybeanjs/ui` 已内置大量可直接复用的组件，其中与本路线图强相关的包括：

| 类别         | 已内置 UI 组件                                                                                                                                                                       | 说明                                                                                                                                       | 对本路线图的意义                                                                                                     |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| **多页签**   | `SPageTabs`                                                                                                                                                                          | headless `PageTabsCompact` 聚合：pin（固定）/ close / `middleClickClose` / `menuFactory` 右键菜单 / `beforeClose` / 关闭左、右、其他、全部 | `AppMultiTab` **不再重复实现页签 UI**，仅用 `useMultiTab` composable 将路由状态映射为 `items`，交由 `SPageTabs` 渲染 |
| **主题设置** | `SThemeCustomizer`                                                                                                                                                                   | 无容器主题设置体，`sections`（mode/palette/radius/size/scheme/advanced）、`persist`、`showActions`、`labelResolver`                        | `AppThemeDrawer` **不再重复实现取色/圆角/预设控件**，仅提供抽屉容器并嵌入 `SThemeCustomizer`                         |
| **主题控件** | `SThemeModeSwitch` / `SThemeModeSelect` / `SPalettePicker` / `SConfigProvider`                                                                                                       | 暗色模式切换、主题模式选择、调色板取色、配置提供者                                                                                         | 主题相关 UI 全部复用                                                                                                 |
| **通用原子** | `STabs` / `SBreadcrumb` / `SScrollbar` / `SWatermark` / `SColorField` / `SRadio` / `SDrawer` / `SPopover` / `SDialog` / `SForm` / `STable` / `SPagination` / `SSkeleton` / `STag` 等 | 88 个已发布原子组件                                                                                                                        | admin 复合组件一律以这些为基础组装                                                                                   |

**复用检查清单（开发前必查）：**

1. 打开 `packages/ui/src/index.ts`，确认目标能力是否已有 `S*` 组件。
2. 若已有 → 直接复用，或做「薄封装」（仅补状态绑定 / 容器 / 业务插槽），不改其内部实现。
3. 若 `@soybeanjs/ui` 仅有 headless 原语（无样式）→ 由 `packages/admin` 做 styled 复合（与 `@soybeanjs/ui` 同套路）。
4. 若完全不存在 → 才考虑新增；且新增前先按 §7 的范围界定确认其属于 admin 核心。

**复用映射（防止重复实现）：**

| admin 候选（早期草案）              | 实际处理                                                            |
| :---------------------------------- | :------------------------------------------------------------------ |
| `AppMultiTab` 页签 UI               | **不实现** → 复用 `SPageTabs`，仅提供路由状态绑定                   |
| `AppThemeDrawer` 取色/圆角/预设控件 | **不实现** → 复用 `SThemeCustomizer` + `SPalettePicker`，仅提供容器 |
| `AppWatermark`                      | 复用 `SWatermark`，仅做设置化封装                                   |
| `AppBreadcrumb`                     | 复用 `SBreadcrumb`，仅做路由驱动绑定                                |
| `AppDarkModeContainer`              | 复用 `SConfigProvider` / theme token                                |

> 该规范适用于本路线图全部后续章节：任何「不实现 / 复用」决策都以本清单为准。

---

## 3. AppLayout 组件开发 (AppLayout)

### 3.1 现状评估：统一 `SLayout` 的完备性

> **2026-08 更新**：`SLayout` 与 `SLayoutClassic` 已由 `refactor(components): refactor layout` 合并为**单一 `SLayout`**（headless 侧统一为 `LayoutCompact` → `LayoutRoot`），原 `SLayoutClassic` / `LayoutClassicCompact` 已移除。经典固定式（fixed header/tab/footer + content 滚动）与流式/悬浮式（floating/inset + wrapper 滚动）现在通过同一组正交属性表达：`variant`、`orientation`、`scrollBehavior`、`fixedTop` / `fixedFooter` / `stretchFooter`、`baseZIndex` 与占位符。`AppLayout` 直接复用统一 `SLayout`，不再有 `engine` 双内核。

#### 已具备的能力（来自 headless 与 UI 层）

`SLayout`（[packages/ui/src/components/layout/layout.vue](../packages/ui/src/components/layout/layout.vue)）建立在 `@soybeanjs/headless/layout` 的 **Compact 聚合**之上，已提供：

| 维度       | 能力                                                                                                                                                                                                                           |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 结构插槽   | `sidebar` / `header` / `tab` / `content` / `footer` / default（`LayoutCompactSlots`）                                                                                                                                          |
| 开关       | `sidebarVisible` / `headerVisible` / `tabVisible` / `footerVisible`                                                                                                                                                            |
| 尺寸       | `sidebarWidth`(240) / `collapsedSidebarWidth`(50) / `mobileSidebarWidth` / `headerHeight`(56) / `tabHeight`(44) / `footerHeight`(48)                                                                                           |
| 折叠       | `collapsible: 'offcanvas' \| 'icon'`，`v-model:open`                                                                                                                                                                           |
| 变体       | `variant: 'sidebar' \| 'floating' \| 'inset'`                                                                                                                                                                                  |
| 方位       | `side: 'left' \| 'right'`                                                                                                                                                                                                      |
| 移动端     | `isMobile` + 抽屉式 mobile drawer + 遮罩                                                                                                                                                                                       |
| 内容       | `fullContent`（全屏/沉浸式）                                                                                                                                                                                                   |
| 方向/滚动  | `orientation: 'horizontal' \| 'vertical'`、`scrollBehavior: 'wrapper' \| 'content'`、`scrollId`、`fixedTop`、`fixedFooter`、`stretchFooter`、`baseZIndex` 与占位符（`headerPlaceholder`/`tabPlaceholder`/`footerPlaceholder`） |
| 响应式尺寸 | `size`（`ThemeSize`）与 `pxToRem`                                                                                                                                                                                              |
| 样式注入   | `provideLayoutUi(ui)`（`LayoutUiSlot` 全量槽位 map）                                                                                                                                                                           |

#### 主要缺口（AppLayout 需要补足）

1. **无「应用级」默认内容**：`SLayout` 只提供骨架插槽，不包含 Logo、面包屑、菜单、多页签、搜索、用户菜单等中后台默认行为（符合 `ui` 的原子定位，但 `admin` 需要提供默认实现）。
2. ~~**双布局未统一**~~：~~`SLayout`（悬浮式、flex）与 `SLayoutClassic`（经典固定式、含占位符）是两套不同 API，`AppLayout` 需以统一的 `mode` 属性收敛。~~（已随 `refactor layout` 合并为统一 `SLayout` 解决）
3. **无「混合/多栏」布局**：现代 AI 桌面应用式「左侧导航栏 + 次级上下文栏（双 sidebar）」结构，现有组件一次只支持一个 `sidebar` 插槽（`LayoutSide` 仅 left/right 之一）。
4. **无「顶部一级 + 侧边二级」等混合模式**：soybean-admin 的 `vertical-hybrid-*`、`top-hybrid-*` 结构无法由单 `SLayout` 直接表达。
5. **无页签滚动、页签右键菜单、命令面板等集成**（属上层 `AppLayout` 默认内容范畴）。
6. **无响应式断点驱动的自动模式切换**（如桌面 sidebar、移动 drawer 的自动判定，目前需调用方传 `isMobile`）。

### 3.2 AppLayout 封装设计

**目标**：`AppLayout` 是一个「配置驱动」的复合组件，内部基于统一 `SLayout`（headless `LayoutCompact`）组装，对外提供统一的 `mode`、业务插槽，并直接透传底层布局属性（`variant` / `orientation` / `scrollBehavior` / `fixedTop` / `fixedFooter` 等）。

```ts
// 组件名: SAppLayout (defineOptions name: 'SAppLayout')
export type AppLayoutMode =
  | 'vertical' // 侧边垂直：左 sidebar + 顶 header（固定式）
  | 'vertical-mix' // 垂直混合：一级图标 rail + 二级菜单抽屉
  | 'vertical-hybrid' // 顶部一级 + 侧边二级（vertical-hybrid-header-first）
  | 'horizontal' // 顶部水平菜单（无 sidebar 或窄 sider）
  | 'top-sidebar' // 顶部二级 + 侧边一级（top-hybrid-sidebar-first）
  | 'top-header'; // 顶部一级 + 侧边二级（top-hybrid-header-first）

export interface AppLayoutProps extends LayoutCompactProps {
  mode?: AppLayoutMode;
  /** 移动端断点（默认 768），自动切 drawer */
  mobileBreakpoint?: number;
  // 业务插槽通过 children 提供（见下）
}
```

**核心插槽（业务层默认内容由调用方注入，`admin` 提供默认实现但可覆盖）**：

| 插槽             | 说明                                                         |
| :--------------- | :----------------------------------------------------------- |
| `logo`           | 品牌 Logo 区                                                 |
| `header`         | 顶栏（含折叠按钮、面包屑、搜索、用户菜单等插槽位）           |
| `menu`           | 主菜单（由 `AppMenu` 按 `mode` 渲染，见 §4）                 |
| `sider`          | 侧栏（`vertical` / mix 模式下承载菜单）                      |
| `tab`            | 多页签栏（`AppMultiTab`）                                    |
| `content`        | 主内容（含路由 `<RouterView>`）                              |
| `footer`         | 页脚                                                         |
| `commandPalette` | 命令面板（`AppCommandPalette`，可选，默认注入 `Cmd/Ctrl+K`） |

**模式 → 结构映射**（对齐 soybean-admin `base-layout/index.vue` 的 `headerProps` / `siderVisible` / `siderWidth` 逻辑）：

| `mode`            | Logo 位置      | 一级菜单         | 二级/子菜单             | sidebar            | 说明        |
| :---------------- | :------------- | :--------------- | :---------------------- | :----------------- | :---------- |
| `vertical`        | sidebar 顶     | sidebar 垂直菜单 | sidebar 内嵌            | 有                 | 经典后台    |
| `vertical-mix`    | sidebar 顶     | 一级图标 rail    | 悬停/固定二级抽屉       | 有（rail + child） | mix 双栏    |
| `vertical-hybrid` | header（条件） | header 水平      | sidebar 二级 + 三级抽屉 | 有                 | 顶一 + 侧二 |
| `horizontal`      | header         | header 水平菜单  | 下拉                    | 无                 | 顶部导航    |
| `top-sidebar`     | header         | sidebar 一级     | header 二级             | 有                 | 顶二 + 侧一 |
| `top-header`      | header         | header 一级      | sidebar 二级            | 有                 | 顶一 + 侧二 |

**内部实现建议**：

- 优先**直接复用统一 headless layout**（`LayoutCompact`），由 `AppLayout` 决定如何摆放 `LayoutHeader` / `LayoutSidebar` / `LayoutTab` / `LayoutContent` / `LayoutFooter`，避免双封装损耗。
- `mode` 变化时通过计算属性切换结构；`AppMenu` 与 `AppLayout` 通过轻量 context（`provideAppLayoutContext`）共享 `mode`、折叠状态、菜单数据，避免 props 透传。
- 移动端：当视口 `< mobileBreakpoint` 时强制 `isMobile`，sidebar 自动转为 drawer + 遮罩（复用 `LayoutMobile` / `mobileOverlay`）。

### 3.3 主流布局模式研究

| 模式                    | 代表                                 | 说明                                       | 是否纳入                           |
| :---------------------- | :----------------------------------- | :----------------------------------------- | :--------------------------------- |
| 左侧固定导航            | Ant Design Pro / vue-element-admin   | 经典垂直 sidebar                           | ✅ 已覆盖 (`vertical`)             |
| 顶部水平导航            | 阿里中台 / 轻应用                    | 一级在顶栏                                 | ✅ 已覆盖 (`horizontal`)           |
| 双栏混合 (rail + panel) | Slack / Discord / Notion             | 窄图标 rail + 次级上下文栏                 | ✅ `vertical-mix` / 现代 AI 桌面   |
| **左右双 sidebar**      | VS Code / Linear / Raycast           | 左侧主导航 + 左侧次级上下文（文件树/列表） | ⏳ 新增 `AppLayout` 增强（见 3.4） |
| 右侧设置/上下文栏       | shadcn/ui、Notion、Gmail             | 右侧栏承载属性/设置                        | ⏳ 新增                            |
| 沉浸/专注模式           | Figma、Linear                        | 隐藏 chrome，全屏内容                      | ✅ `fullContent`                   |
| 浮动悬浮式              | shadcn/ui (`Sidebar` floating/inset) | 内容留白 + 悬浮卡片                        | ✅ `variant`                       |
| 顶部 Tabs（浏览器式）   | Ant Design Pro 多页签                | 多页签 + 右键菜单                          | ⏳ `AppMultiTab`                   |
| 命令面板                | Linear / Raycast                     | `Cmd/Ctrl+K` 全局搜索                      | ⏳ `AppCommandPalette`             |

### 3.4 增强点与新增布局类型

**P1 增强（对现有布局内核的加固）：**

1. `AppLayout` 统一 `mode` + 底层布局属性（`variant` / `orientation` / `scrollBehavior` / `fixedTop` / `fixedFooter`）双轴，基于统一 `SLayout` 收敛外壳呈现。
2. 自动响应式（`mobileBreakpoint`）与自动折叠逻辑内置化。
3. `AppLayoutContext`：共享 `mode` / `open` / `siderCollapse` / `menuData`。
4. 沉浸模式增强：`fullContent` 状态下隐藏 logo/menu/tab 的「专注模式」开关。

**P2 新增布局类型（可作为 `AppLayout` 的扩展 `mode` 或独立组件）：**

1. **`split-panel`（左右双栏，AI 桌面式）**：`AppSplitPanel` 或 `mode="split"`——左侧主 sidebar + 次级上下文栏（文件树/会话列表），可折叠、可拖拽调宽（复用 `LayoutRail` 拖拽能力，见 `packages/ui/src/styles/layout.ts` 中 rail 的 resize 交互）。**实现考量**：headless layout 需扩展支持第二个 `sidebar` 插槽或新增 `LayoutContextSidebar`；属 headless 层改动，成本 High。
2. **`right-context`（右侧设置/上下文栏）**：`AppRightPanel`——复用 `side: 'right'`，承载属性编辑、通知中心。成本 Medium。
3. **`topbar+subnav`（顶栏 + 次级水平子导航）**：适合文档型/内容型后台。成本 Medium。
4. **`command` 沉浸式导航**：类似 Raycast 的全屏命令导航模式。成本 High，P3。

---

## 4. AppMenu 组件开发 (AppMenu)

### 4.1 6 种菜单模式（命名约定）

参照 soybean-admin（`/Users/soybean/Web/Projects/SoybeanJS/soybean-admin/src/layouts/modules/global-menu/index.vue`）的 6 种 `ThemeLayoutMode`，为 `AppMenu` 定义 **`mode` 属性**，采用**简洁、准确、可读**的英文命名（去掉 soybean-admin 冗长的 `-hybrid-header-first` 后缀，保留语义）：

| `@soybeanjs/admin` mode 值 | soybean-admin 对应 mode        | 语义                               | 渲染位置                |
| :------------------------- | :----------------------------- | :--------------------------------- | :---------------------- |
| `vertical`                 | `vertical`                     | 垂直侧边菜单（含子级折叠）         | sidebar                 |
| `mix`                      | `vertical-mix`                 | 垂直混合：一级图标 rail + 二级抽屉 | sidebar（rail + child） |
| `vertical-hybrid`          | `vertical-hybrid-header-first` | 顶栏一级 + 侧边二级                | header + sidebar        |
| `horizontal`               | `horizontal`                   | 水平顶部菜单（子级下拉）           | header                  |
| `top-sidebar`              | `top-hybrid-sidebar-first`     | 顶栏二级 + 侧边一级                | header + sidebar        |
| `top-header`               | `top-hybrid-header-first`      | 顶栏一级 + 侧边二级                | header + sidebar        |

> **命名原则**：
>
> - 以 `mode` 属性（`AppMenuProps['mode']`）作为唯一区分键，`AppMenu` 内部按 `mode` 选择渲染分支（与 `global-menu/index.vue` 的 `menuMap[themeStore.layout.mode]` 同构，但用 props 而非全局 store）。
> - 命名遵循「方位 + 结构」：`vertical` / `horizontal` 表方向；`mix` 表「图标 rail + 抽屉」混合；`*` 前缀 `top-` 表「顶栏优先」，`vertical-` 表「侧边优先」。
> - `vertical-hybrid`（顶一 + 侧二）与 `top-header`（顶一 + 侧二）结构相同但菜单摆放侧不同 —— `vertical-hybrid` 强调「整体垂直，一级借道顶栏」，`top-header` 强调「顶部主导航」。如需简化可合并为 `vertical-hybrid`，本文档保留二者以便 1:1 对齐 soybean-admin。

**AppMenu 数据模型**（对齐 soybean-admin `App.Global.Menu` 与 `routeStore.menus`）：

```ts
export interface AppMenuData {
  key: string; // 唯一 key（可用路由名）
  routeKey?: string; // 跳转目标
  label: string; // 显示名
  icon?: Component; // 图标组件
  children?: AppMenuData[];
  hideInMenu?: boolean; // 不在菜单显示
  badge?: string | number; // 角标
  disabled?: boolean;
}
```

**AppMenu 核心 Props / Emits / Slots**：

```ts
export interface AppMenuProps {
  mode?: AppMenuMode; // 上述 6 值，默认 'vertical'
  data: AppMenuData[]; // 菜单数据
  selectedKey?: string; // 受控选中（v-model:selected-key）
  defaultSelectedKey?: string;
  siderCollapse?: boolean; // 折叠态（vertical/mix）
  inverted?: boolean; // 反色（深色 sidebar）
  /** 混合模式抽屉是否固定（mix/vertical-hybrid） */
  mixSiderFixed?: boolean;
  collapsedWidth?: number; // 折叠宽度
  collapsedIconSize?: number;
  /** 挂载点 id（对应 soybean-admin GLOBAL_HEADER_MENU_ID / GLOBAL_SIDER_MENU_ID） */
  headerMenuEl?: string;
  siderMenuEl?: string;
  autoSelectFirstMenu?: boolean; // 混合模式自动选中最深菜单
}
// emits: 'update:selected-key' | 'select' (key, menu)
// slots: item / icon / label（自定义菜单项渲染）
```

**内部结构建议**（对齐 soybean-admin `modules/*.vue`）：

- 各模式拆为内部子组件：`VerticalMenu` / `MixMenu` / `VerticalHybridMenu` / `HorizontalMenu` / `TopSidebarMenu` / `TopHeaderMenu` + 复用的 `FirstLevelMenu`（一级图标 rail，含折叠开关）。
- 通过 `Teleport` 挂载到 `headerMenuEl` / `siderMenuEl`，使 `AppMenu` 独立于具体布局容器。
- 展开路径、选中路径由 `AppMenu` 内部 computed（`getSelectedMenuKeyPath`）维护；混合模式的 first/second/child 三级状态抽成 `useMixMenuState` composable（对齐 `global-menu/context/index.ts`）。
- **默认使用 `@soybeanjs/ui` 原子组件**（`SMenu` / `STree` / `SDrawer` / `SScrollbar`）渲染，而非依赖 Naive UI（soybean-admin 用的是 Naive UI `NMenu`，需迁移为 Soybean 组件或内置轻量菜单渲染）。

### 4.2 其他主流菜单模式研究（潜在未来实现）

| 菜单模式                    | 代表                      | 说明                        | 优先级                   |
| :-------------------------- | :------------------------ | :-------------------------- | :----------------------- |
| 手风琴/折叠树               | Ant Design / Element Plus | 点击展开一项收起其余        | P2                       |
| 巨型菜单 (MegaMenu)         | PrimeVue                  | 顶栏展开大面板              | P3                       |
| 分级菜单 (TieredMenu)       | PrimeVue                  | 逐级弹出子菜单              | P3                       |
| 底部/顶部页签菜单 (TabMenu) | PrimeVue                  | 与多页签结合                | P2                       |
| 分组菜单 (PanelMenu)        | PrimeVue                  | 可折叠分组面板              | P2                       |
| 面包屑驱动                  | 文档站                    | 结合 breadcrumb 的扁平导航  | P3                       |
| 键盘命令导航                | Raycast / Linear          | 与 `AppCommandPalette` 联动 | P3                       |
| 双栏导航 (rail + tree)      | VS Code / Notion          | 左侧 rail + 次级树          | P2（联动 `split-panel`） |

> 优先级考量：`AppMenu` v1 聚焦 6 种模式 + 折叠 + 反色 + 混合抽屉；其余模式作为 P2/P3 扩展，避免 v1 膨胀。

### 4.3 AppLayoutMode 与 AppMenuMode 的统一设计（Design Unification）

#### 4.3.1 统一单一数据源

`AppLayoutMode` 与 `AppMenuMode` **共用同一个 6 值联合类型**，而非两套独立枚举：

```ts
// packages/admin/src/types.ts
export type AppLayoutMode =
  'vertical' | 'vertical-mix' | 'vertical-hybrid' | 'horizontal' | 'top-sidebar' | 'top-header';

// 菜单形态不是独立概念，而是「布局形态」在导航区上的投影：
export type AppMenuMode = AppLayoutMode; // 类型别名，值域完全一致
```

设计依据：**布局形态决定了导航区的空间布局**（顶栏/侧栏/双栏/抽屉），因此菜单形态应当**跟随布局形态自适应**，而不是让使用者分别维护两份可能冲突的配置。`AppLayout` 与 `AppMenu` 共享 `provideAppLayoutContext`，`mode` 只需设置一次。

#### 4.3.2 菜单形态对布局形态的适应性关联规则

「布局形态 → 菜单形态」的关联规则（同一 `mode` 值同时驱动布局结构与菜单摆放）：

| 布局/菜单 `mode`  | 布局特征                 | 菜单形态（AppMenu 渲染分支）                  | 关联规则                                                |
| :---------------- | :----------------------- | :-------------------------------------------- | :------------------------------------------------------ |
| `vertical`        | 左固定侧栏 + 顶栏        | `VerticalMenu`：侧栏垂直树（含子级折叠）      | 菜单 100% 位于 sidebar，宽度随 `siderWidth`             |
| `vertical-mix`    | 一级图标 rail + 二级抽屉 | `MixMenu`：rail 一级 + 抽屉二级               | 一级常驻 sidebar 窄栏；二级随 `mixSiderFixed` 固定/悬停 |
| `vertical-hybrid` | 顶栏一级 + 侧栏二级      | `VerticalHybridMenu`：顶栏水平一级 + 侧栏二级 | 一级横向，二级纵向；一级无子级时侧栏宽度收缩为 0        |
| `horizontal`      | 顶栏导航，无侧栏         | `HorizontalMenu`：顶栏水平（子级下拉）        | 菜单 100% 位于 header；`siderVisible=false`             |
| `top-sidebar`     | 顶栏二级 + 侧栏一级      | `TopSidebarMenu`：侧栏一级 + 顶栏二级         | 一级纵向（sidebar），二级横向（header）                 |
| `top-header`      | 顶栏一级 + 侧栏二级      | `TopHeaderMenu`：顶栏一级 + 侧栏二级          | 一级横向（header），二级纵向（sidebar）                 |

**关键自适应逻辑（`AppMenu` 消费 `AppLayoutContext` 后自动推导）：**

1. **渲染挂载点**：由 `mode` 推导 `Teleport` 目标 —— 含 header 级菜单的模式挂到 `headerMenuEl`，含 sidebar 级菜单的模式挂到 `siderMenuEl`（对齐 soybean-admin `GLOBAL_HEADER_MENU_ID` / `GLOBAL_SIDER_MENU_ID`）。
2. **折叠联动**：`vertical` / `vertical-mix` 下，`siderCollapse` 来自 `AppLayoutContext`；折叠时 sidebar 菜单收起为图标态（`collapsed` / `collapsedWidth`），混合模式同时收起二级抽屉。
3. **一级/二级/三级结构**：混合模式（`mix` / `vertical-hybrid` / `top-sidebar` / `top-header`）由 `useMixMenuState` 推导 `firstLevelMenus` / `secondLevelMenus` / `childLevelMenus` 与当前激活路径。
4. **侧栏宽度自适应**：`AppLayout` 依据 `mode` 与「当前层级是否有子菜单」动态计算 `siderWidth`（对齐 soybean-admin `base-layout/index.vue` 的 `getSiderAndCollapsedWidth`）——例如 `vertical-hybrid` 一级无子级时侧栏宽为 0。
5. **独立使用降级**：`AppMenu` 也可脱离 `AppLayout` 独立使用——此时未注入 context，`mode` 由 prop 直接提供（默认 `vertical`），仅影响菜单自身渲染，不涉及布局宽度。

#### 4.3.3 实现逻辑（伪码）

```ts
// packages/admin/src/composables/use-app-layout-context.ts
const [provideAppLayoutContext, useAppLayoutContext] = useContext(
  { name: 'AppLayout', key: Symbol.for('AppLayout') },
  () => ({ mode, open, siderCollapse, isMobile, mixSiderFixed })
);

// AppMenu 内部
const ctx = useAppLayoutContext('AppMenu'); // 可选注入
const resolvedMode = computed(() => props.mode ?? ctx?.mode ?? 'vertical');
const menuBranch = computed(() => MENU_MAP[resolvedMode.value]); // 6 分支映射
const headerHost = computed(() => (HEADER_MENU_HOSTS.has(resolvedMode.value) ? props.headerMenuEl : null));
const siderHost = computed(() => (SIDER_MENU_HOSTS.has(resolvedMode.value) ? props.siderMenuEl : null));
```

> **统一收益**：单一 `mode` 同时控制「布局骨架」与「导航形态」，杜绝两套配置漂移；`AppLayout` 与 `AppMenu` 可独立演进但仍保持一致，符合「布局为容器、菜单为投影」的单一职责设计。

---

## 5. 组件提取分析（基于 soybean-admin codegraph）

对 soybean-admin（`src/layouts/modules/**`、`src/components/**`）进行代码图分析后，提取可形式化进 `packages/admin` 的候选模块。以下按「复用性 × 复杂度 × 价值」综合排序。

### 5.1 高价值（P0/P1，优先提取）

| 组件                       | 来源 (soybean-admin)                                                                       | 说明                                                               | 复用性 | 复杂度 | 依赖                                                              |
| :------------------------- | :----------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :----: | :----: | :---------------------------------------------------------------- |
| **`AppPageHeader`**        | `global-header` + `global-breadcrumb`                                                      | 页头：面包屑 + 标题 + 操作区 + 返回按钮                            |   高   |   低   | `SBreadcrumb`, `SButton`, `SIcon`                                 |
| **`AppMultiTab`**          | `global-tab/index.vue` + `context-menu.vue`                                                | 多页签栏：滚动、关闭、右键菜单（刷新/关闭其他/关闭全部）、拖拽排序 |   高   |   高   | `STabs`, `SScrollbar`, `SDropdown`, `SDialog`, `useMultiTab`      |
| **`AppUserMenu`**          | `global-header/components/user-avatar.vue`                                                 | 用户头像 + 下拉（个人中心/设置/退出）                              |   高   |   低   | `SAvatar`, `SDropdownMenu`, `SIcon`                               |
| **`AppCommandPalette`**    | `global-search/index.vue` + `search-modal.vue` / `search-result.vue` / `search-footer.vue` | `Cmd/Ctrl+K` 命令面板：模糊搜索菜单/页面，键盘导航，结果分组       |   高   |   中   | `SDialog`, `SInput`, `SList`, `useFuse`/`useFuzzy`                |
| **`AppThemeDrawer`**       | `theme-drawer/**`                                                                          | 主题设置抽屉：布局模式卡片、主题色、圆角、暗色、预设、水印开关     |   中   |   高   | `SDrawer`, `SColorField`, `SRadio`, `SButton`, `@soybeanjs/theme` |
| **`AppLogo`**              | `global-logo/index.vue`                                                                    | Logo + 标题，支持仅图标                                            |   高   |   低   | `SIcon`                                                           |
| **`AppBreadcrumb`**        | `global-breadcrumb/index.vue`                                                              | 路由驱动面包屑                                                     |   高   |   低   | `SBreadcrumb`, `SRouterLink`                                      |
| **`AppFooter`**            | `global-footer/index.vue`                                                                  | 页脚文本/链接                                                      |   高   |   低   | —                                                                 |
| **`AppDarkModeContainer`** | `src/components/common/dark-mode-container.vue`                                            | 暗色容器（切换配色/背景）                                          |   高   |   低   | `@soybeanjs/theme`                                                |

### 5.2 中价值（P2，按需提取）

| 组件                       | 来源                                                          | 说明                                         | 复用性 | 复杂度 |
| :------------------------- | :------------------------------------------------------------ | :------------------------------------------- | :----: | :----: |
| **`AppPinToggler`**        | `src/components/common/pin-toggler.vue`                       | 「固定」切换按钮（mix sider 固定）           |   中   |   低   |
| **`AppSimpleScrollbar`**   | `src/components/common/simple-scrollbar.vue`                  | 自定义滚动条封装                             |   中   |   低   |
| **`AppLayoutModeCard`**    | `theme-drawer/components/layout-mode-card.vue`                | 布局模式可视化选择卡片                       |   中   |   低   |
| **`AppSettingItem`**       | `theme-drawer/components/setting-item.vue`                    | 设置项（标题 + 控件）布局                    |   中   |   低   |
| **`AppThemeColor`**        | `theme-drawer/modules/appearance/modules/theme-color.vue`     | 主题色选择器面板                             |   中   |   中   |
| **`AppThemeRadius`**       | `theme-drawer/modules/appearance/modules/theme-radius.vue`    | 圆角/紧凑度设置                              |   中   |   低   |
| **`AppThemePreset`**       | `theme-drawer/modules/preset/modules/theme-preset.vue`        | 主题预设选择                                 |   中   |   中   |
| **`AppWatermarkSettings`** | `theme-drawer/modules/general/modules/watermark-settings.vue` | 水印开关（结合 `SWatermark`）                |   中   |   低   |
| **`AppHeaderActions`**     | `global-header/index.vue` 各 action                           | 搜索、多语言、主题、通知、全屏等头部动作集合 |   中   |   中   |

### 5.3 优先级化说明（评估维度）

每个候选按以下维度打分（对齐 `docs/roadmap.md` 方法论）：

- **复用性 (Reusability)**：能否脱离具体业务独立使用。
- **复杂度 (Complexity)**：Low / Medium / High（实现与维护成本）。
- **价值 (Value)**：对中后台系统开发的通用价值与需求度。
- **独立性 (Independence)**：是否单聚焦职责，能否不依赖全局 store（soybean-admin 中很多模块耦合了 `appStore` / `themeStore` / `routeStore`，提取时需将 store 依赖转为 props / composable 注入，这是**最大的重构风险点**）。

> **提取原则**：凡强依赖全局 store 的状态（如 `appStore.siderCollapse`、`themeStore.layout.mode`）一律抽象为「受控 props + 可注入 composable」，使组件无 store 也能工作；内置默认 composable（如 `useAppLayoutStore`）可选，但保持可选注入。

---

## 6. 实用组件研究与收录（Additional Utility Components）

对中后台高频但 `@soybeanjs/ui` 尚未（或不打算）提供的实用组件进行调研与评估，形成收录候选。

### 6.1 收录候选（建议进入 `packages/admin`）

| 组件                                               | 说明                                                                                        | 用例               | 复杂度 | 依赖                                                   | 优先级 |
| :------------------------------------------------- | :------------------------------------------------------------------------------------------ | :----------------- | :----: | :----------------------------------------------------- | :----: |
| **`AppProTable` / `AppDataTable`**                 | 配置驱动的数据表格：列定义 + 搜索表单 + 分页 + 操作栏 + 加载态 + 插槽                       | 列表页、CRUD       |   高   | `STable`, `SForm`, `SPagination`, `SInput`, `SButton`  |   P0   |
| **`AppProForm` / `AppSearchForm`**                 | 配置驱动的搜索/表单区：字段 schema → 渲染 + 校验 + 重置                                     | 查询条件、表单页   |   高   | `SForm`, `SInput`, `SSelect`, `SDatePicker`, `SButton` |   P0   |
| **`AppPagination`**                                | 封装分页：页码/尺寸/总数/跳页 + 加载态                                                      | 列表分页           |   高   | `SPagination`                                          |   P0   |
| **`AppEmptyState`**                                | 空状态：图标 + 文案 + 动作（对齐 2026 设计规范）                                            | 空列表、无搜索结果 |   中   | `SIcon`, `SButton`                                     |   P1   |
| **`AppSkeletonTable` / `AppSkeletonPage`**         | 骨架屏：表格/页面级加载占位                                                                 | 首屏/加载          |   中   | `SSkeleton`, `STable`                                  |   P1   |
| **`AppResult`**                                    | 结果页：403/404/500/success/error + 动作                                                    | 异常页、操作反馈   |   低   | `SIcon`, `SButton`                                     |   P1   |
| **`AppWatermark`**                                 | 页面水印（soybean-admin 有 settings，`@soybeanjs/ui` 已有 `SWatermark`，此为其 admin 封装） | 数据安全           |   低   | `SWatermark`                                           |   P2   |
| **`AppPermissionButton` / `AppPermissionWrapper`** | 权限控制：按权限码/角色显隐组件                                                             | RBAC 按钮级权限    |   中   | `usePermission`                                        |   P1   |
| **`AppEllipsisText`**                              | 文本省略 + Tooltip（多行）                                                                  | 表格单元格长文本   |   低   | `STooltip`                                             |   P1   |
| **`AppStatusBadge` / `AppStatusDot`**              | 状态徽标/圆点（在线、成功、失败）                                                           | 状态列             |   低   | `SBadge`, `SIcon`                                      |   P2   |
| **`AppCountUp` / `AppStatisticCard`**              | 数字滚动 + 指标卡（标题 + 数值 + 趋势）                                                     | 数据看板           |   中   | `SStatistic`, `useCountUp`                             |   P2   |
| **`AppDescriptions`**                              | 描述列表（`@soybeanjs/ui` 路线图 P0，admin 可先出封装版）                                   | 详情页             |   中   | `SDescriptions`                                        |   P2   |
| **`AppQrCode`**                                    | 二维码（`@soybeanjs/ui` 路线图 P1）                                                         | 邀请、绑定         |   低   | `qrcode` (peer)                                        |   P3   |
| **`AppCopyText`**                                  | 复制文本 + 反馈                                                                             | 密钥、订单号       |   低   | `SButton`, clipboard                                   |   P2   |
| **`AppTagGroup` / `AppFilterTags`**                | 筛选条件标签集（可删除）                                                                    | 查询回显           |   低   | `STag`, `SIcon`                                        |   P2   |

### 6.2 明确不纳入（Out of Scope）

- **图表**（ECharts / Chart.js / Recharts）——独立领域，属 `@soybeanjs/charts` 类独立包。
- **富文本编辑器**——体量大，通常独立成包（Tiptap/ProseMirror）。
- **纯移动端组件**——`@soybeanjs/admin` 桌面优先。
- **强业务耦合**（如订单结算、专属审批流）——过窄。
- **`@soybeanjs/ui` 已有原子组件**（`SButton`、`STable`、`SForm` 等）——`admin` 只做复合封装，不重复造原子组件。

### 6.3 依赖分析（跨组件共享）

- **菜单数据/权限**：`AppMenu`、`AppCommandPalette`、`AppBreadcrumb`、`AppPermissionButton` 共享 `App.Menu` 数据模型与 `usePermission`。
- **布局状态**：`AppLayout`、`AppMenu`、`AppThemeDrawer` 共享 `AppLayoutContext`（`mode` / `siderCollapse` / `isMobile`）。
- **主题**：`AppThemeDrawer`、`AppDarkModeContainer`、`AppWatermark` 依赖 `@soybeanjs/theme` 与 `@soybeanjs/ui-unocss` token。
- **多页签**：`AppMultiTab` 与 `AppCommandPalette`（跳转）、`AppLayout`（`tab` 插槽）联动，需 `useMultiTab` composable 统一管理。

---

## 7. admin 包组件范围界定（核心与边界）

### 7.1 筛选标准（Component Scope Criteria）

`@soybeanjs/admin` 定位为「中后台**核心且重要**的复合/布局组件包」，不追求覆盖一切。仅当候选**同时满足**以下条件才纳入：

| 标准                       | 说明                                                                                                                             |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **S1 中后台核心场景**      | 属于布局、导航、多页签、查询列表、表单、权限、结果、空态等中后台高频场景                                                         |
| **S2 高复用 & 低业务耦合** | 可脱离具体业务独立使用；不强依赖全局 store（`appStore` / `themeStore` / `routeStore`），状态抽象为受控 props / 可注入 composable |
| **S3 无重复实现**          | `@soybeanjs/ui` / headless 未提供等价能力（见 §2.4 复用规范）；若有则仅做复合封装                                                |
| **S4 可独立交付**          | 有明确 props/slots/emits 边界，能独立发布、独立测试、配套 playground 与文档                                                      |
| **S5 收益>成本**           | 复用性/价值明显高于实现成本；低成本高价值优先（P0/P1）                                                                           |

> 任一标准不满足 → 按 §7.3 归类处理，而非简单纳入。

### 7.2 核心组件类别与功能（进入 admin）

按「布局 / 导航 / 数据展示 / 数据录入 / 权限安全 / 主题 / 反馈辅助」七大类收录核心组件：

#### 类别 A — 布局类（Layout）

| 组件            | 核心功能                                                                                                                                      |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `AppLayout`     | 6 种布局模式 + `variant`/`orientation`/`scrollBehavior`/`fixedTop`/`fixedFooter` 布局属性、`AppLayoutContext`、自动响应式、`fullContent` 沉浸 |
| `AppLogo`       | Logo + 标题，支持仅图标                                                                                                                       |
| `AppHeader`     | 顶栏：折叠按钮、面包屑、搜索、用户菜单插槽                                                                                                    |
| `AppSider`      | 侧栏：Logo 区 + 菜单挂载区                                                                                                                    |
| `AppBreadcrumb` | 路由驱动面包屑（复用 `SBreadcrumb`）                                                                                                          |
| `AppFooter`     | 页脚文本/链接                                                                                                                                 |

#### 类别 B — 导航类（Navigation）

| 组件                | 核心功能                                                     |
| :------------------ | :----------------------------------------------------------- |
| `AppMenu`           | 6 种菜单模式 + 折叠 + 反色 + 混合抽屉（见 §4）               |
| `AppMultiTab`       | 多页签（复用 `SPageTabs`，仅做路由状态绑定 + `useMultiTab`） |
| `AppCommandPalette` | `Cmd/Ctrl+K` 命令面板：模糊搜索页面/菜单、键盘导航、结果分组 |

#### 类别 C — 数据展示类（Data Display）

| 组件                              | 核心功能                                                       |
| :-------------------------------- | :------------------------------------------------------------- |
| `AppProTable`                     | 配置驱动表格：列定义 + 加载态 + 操作栏 + 插槽（基于 `STable`） |
| `AppStatisticCard`                | 指标卡：标题 + 数值 + 趋势（基于 `SStatistic` + `useCountUp`） |
| `AppDescriptions`                 | 描述列表详情（基于 `SDescriptions`）                           |
| `AppResult`                       | 结果页：403/404/500/success/error + 动作                       |
| `AppEmptyState`                   | 空状态：图标 + 文案 + 动作                                     |
| `AppStatusBadge` / `AppStatusDot` | 状态徽标/圆点                                                  |

#### 类别 D — 数据录入类（Data Entry）

| 组件            | 核心功能                                                     |
| :-------------- | :----------------------------------------------------------- |
| `AppProForm`    | 配置驱动表单：schema → 渲染 + 校验 + 重置（基于 `SForm`）    |
| `AppSearchForm` | 查询条件表单区（`AppProForm` 的搜索变体）                    |
| `AppPagination` | 分页封装：页码/尺寸/总数/跳页 + 加载态（基于 `SPagination`） |

#### 类别 E — 权限与安全类（Auth / Security）

| 组件                   | 核心功能                                      |
| :--------------------- | :-------------------------------------------- |
| `AppPermissionButton`  | 按权限码/角色显隐按钮（基于 `usePermission`） |
| `AppPermissionWrapper` | 权限包裹器：按权限控制任意内容显隐            |
| `AppWatermark`         | 页面水印（基于 `SWatermark` 的设置化封装）    |

#### 类别 F — 主题与个性化类（Theme）

| 组件                   | 核心功能                                             |
| :--------------------- | :--------------------------------------------------- |
| `AppThemeDrawer`       | 主题设置抽屉容器（嵌入 `SThemeCustomizer`，见 §2.4） |
| `AppDarkModeContainer` | 暗色容器（配色/背景随主题切换）                      |

#### 类别 G — 反馈与辅助类（Feedback / Utility）

| 组件                                   | 核心功能                            |
| :------------------------------------- | :---------------------------------- |
| `AppSkeletonTable` / `AppSkeletonPage` | 骨架屏加载占位（基于 `SSkeleton`）  |
| `AppCopyText`                          | 复制文本 + 反馈                     |
| `AppEllipsisText`                      | 文本省略 + Tooltip                  |
| `AppQrCode`                            | 二维码（peer 依赖 `qrcode`）        |
| `AppCountUp`                           | 数字滚动（`useCountUp` composable） |

### 7.3 非核心组件的处理方式

对不满足 §7.1 标准的候选项，按类别处理：

| 处理方式                 | 适用对象                                     | 说明                                                                                                                             |
| :----------------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **复用而非实现**         | 原子/主题/页签等已有能力                     | 直接复用 `@soybeanjs/ui`（`SPageTabs`、`SThemeCustomizer`、`SWatermark`、`SBreadcrumb` 等），`admin` 只做薄封装或不做（见 §2.4） |
| **延后 / 降级为 P3**     | 低价值、小众、成本高                         | `AppQrCode`、扩展菜单模式、`AppSplitPanel` 等暂缓，进入 backlog 而非 v1                                                          |
| **交由业务应用自行实现** | 强业务耦合                                   | 如专属审批流、订单结算、行业表单——不收录                                                                                         |
| **独立包范围外**         | 图表 / 富文本编辑器                          | 图表属 `@soybeanjs/charts` 类独立包；富文本通常独立成包（Tiptap/ProseMirror）                                                    |
| **明确拒绝**             | 移动端专用、`@soybeanjs/ui` 已覆盖、过窄组件 | 不进 `@soybeanjs/admin`（对齐 `docs/roadmap.md` 的范围外清单思路）                                                               |

**范围治理规则：**

- v1（M1–M4）只含 **类别 A–E 与 G 的 P0/P1 组件**；主题类（F）在 M5 追加。
- 新增组件前必须经过 §7.1 五条标准评审并在文档登记；避免 admin 包膨胀成「第二个 ui 库」。
- `@soybeanjs/admin` 的边界是「**中后台复合/布局层**」，原子能力一律留在 `@soybeanjs/ui`。

---

## 8. Layout 与 LayoutClassic 深度技术分析

### 8.1 功能特性对比（核心差异点）

基于对 `@soybeanjs/headless/layout` 与 `@soybeanjs/ui` 的源码级分析，两者共享同一套基础原语（`LayoutSidebar` / `LayoutHeader` / `LayoutTab` / `LayoutContent` / `LayoutFooter` / `LayoutRail` / `LayoutMobile` / `LayoutMain`），差异集中在 **Root / Compact / 占位符 / recipe** 四层：

| 维度            | `SLayout`（`LayoutCompact`→`LayoutRoot`）                          | `SLayoutClassic`（`LayoutClassicCompact`→`LayoutClassicRoot`）                                                       |
| :-------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| **布局模型**    | 流式 flex：`root=flex`，sidebar 绝对定位，main `flex-1` 自适应滚动 | 经典固定式：固定 header/tab/footer + 内容滚动，靠占位符预留空间                                                      |
| **变体**        | `variant: sidebar\|floating\|inset`                                | 无（`LayoutClassicRootProps` **Omit 掉** `variant`/`collapsible`）                                                   |
| **折叠方式**    | `collapsible: offcanvas\|icon`                                     | 无独立 collapsible 语义（由 `open` + 宽度收缩实现）                                                                  |
| **方向/滚动**   | 无 orientation/scrollBehavior                                      | `orientation: horizontal\|vertical`、`scrollBehavior: wrapper\|content`、`scrollId`                                  |
| **固定/占位**   | 无固定语义（天然流式）                                             | `fixedTop` / `fixedFooter` / `stretchFooter` / `LayoutClassicPlaceholder`(header/tab/footer) / `baseZIndex` 层级运算 |
| **默认值**      | `variant:'sidebar'`、`collapsible:'icon'`、`defaultOpen:true`      | `orientation:'vertical'`、`scrollBehavior:'content'`、`fixedTop:true`、`stretchFooter:true`、`defaultOpen:true`      |
| **CSS 变量**    | 宽高类（`sidebarWidth` 等 7 个）                                   | 宽高类 + 层级/间距类（`baseZIndex`、`sidebarTopGap`、`startGap` 等，共 17 个）                                       |
| **UI 槽位**     | `LayoutUiSlot`（root/sidebar/…/mobile 共 14 个）                   | `LayoutClassicUiSlot = LayoutUiSlot` + `headerPlaceholder`/`tabPlaceholder`/`footerPlaceholder`（共 17 个）          |
| **Recipe 规模** | `layoutVariants`（`scv()`，约 167 行）                             | `layoutClassicVariants`（`scv()`，约 281 行）                                                                        |

### 8.2 实现方式差异

- **共用基础**：两者调用同一个 `useControllableState(open)`、同一套 `layoutCssVars`、同一套基础原语；`provideLayoutClassicRootContext` 内部直接 `provideLayoutRootContext(params)`（上下文向后兼容）。
- **Root 层**：`layout-root.vue` 仅输出 7 个宽高 CSS 变量；`layout-classic-root.vue` 额外计算 `fixedTop`（`orientation==='vertical' && scrollBehavior==='wrapper'` 时强制固定）、`startGap`/`headerStartGap`/`footerStartGap`/`sidebarTopGap`/`sidebarBottomGap` 及四层 z-index（`sidebarZIndex=base-4`、`headerZIndex=base-3`、`tabZIndex=base-5`、`footerZIndex` 依 `footerStartGap` 动态取 `sider+1` 或 `sider-5`）。
- **Compact 层**：`layout-classic-compact.vue` 比 `layout-compact.vue` 多出 `LayoutClassicPlaceholder`（header/tab/footer）与 `resolvedScrollId` 注入（`scrollBehavior==='wrapper'` 时挂到 main，`==='content'` 时挂到 content）。
- **样式层**：`layoutClassicVariants` 通过 `data-[fixed-top=true]` / `data-[scroll-behavior=wrapper]` 等驱动绝对定位与占位；`layoutVariants` 通过 `data-[variant=floating/inset]` / `data-[collapsible=icon/offcanvas]` 驱动悬浮/嵌入与折叠。

### 8.3 使用场景与性能

| 维度     | `SLayout`                                                         | `SLayoutClassic`                                                 |
| :------- | :---------------------------------------------------------------- | :--------------------------------------------------------------- |
| 典型场景 | 现代工具型/类 AI 应用（floating/inset sidebar、内容优先、沉浸式） | 传统后台仪表盘（固定顶栏 + 多页签 + 页脚 + 内容滚动）            |
| 参考     | shadcn/ui `Sidebar`（floating/inset）                             | soybean-admin 经典布局、Ant Design Pro                           |
| 性能     | DOM 轻量；flex 流式，无额外占位元素                               | 多 3 个占位 div 与 z-index 计算；均为纯 CSS 变量驱动，无重排热点 |
| 可访问性 | 完整 data-attributes + ARIA（`LayoutMobile` 复用 `Dialog` 语义）  | 同左 + placeholder 相关 data 属性                                |
| 响应式   | `lt-md`/`lt-sm` 断点 + mobile drawer                              | 同左                                                             |

**性能结论**：两者都采用「CSS 变量 + data-attribute + transition 工具类」的声明式实现，无 JS 驱动的布局测量，动画由 GPU/合成器承担，性能都在可接受范围；`LayoutClassic` 的额外成本仅为 3 个占位元素与常量级 z-index 运算，可忽略。

### 8.4 合并为单一组件的可行性、风险与收益

**可行性评估**：可行但**成本偏高**。`LayoutClassic` 是 `Layout` 的「超集」（多了 orientation/scrollBehavior/fixed*/placeholder/baseZIndex），且基础原语与上下文高度共享（约 80% 已复用）。可设计单 `Layout` 以 `mode: 'fluid'\|'classic'` 切换内部 root/compact/recipe，技术上无阻塞。

**收益（Benefit）**：

- 单一入口、统一心智模型；调用方无需理解两套 API。
- 复用基础原语（已基本完成），避免重复封装。
- `AppLayout` 可隐藏内部选择。

**风险（Risk）与成本（Cost）**：

1. **Prop 爆炸**：合并后约 25+ 个 props 挤在同一组件，`variant/collapsible`（仅 fluid）与 `orientation/fixedTop/scrollBehavior`（仅 classic）语义冲突，`impossible state`（如同时 `variant=inset` 与 `fixedTop=false`）增多，TS 严格类型难以表达，DX 反而下降。
2. **Recipe 组合爆炸**：合并两个共 450+ 行的 `scv()` 需引入大量 `compoundVariants` 与条件 data 属性，UnoCSS 类串膨胀，可维护性显著下降。
3. **行为本质分歧**：流式 vs 固定是两种不同布局模型，靠一个开关堆叠会导致状态组合指数增长与回归面扩大。
4. **破坏性变更**：`SLayout` / `SLayoutClassic` 已是发布组件；合并将破坏 API，需长期 deprecation 过渡。

**技术推荐（结论）**：

> **2026-08 更新**：本节的「不合并」技术推荐已被推翻——`SLayout` / `SLayoutClassic` 已物理合并为统一 `SLayout`（`refactor(components): refactor layout`，headless 侧移除 `LayoutClassic*`，UI 侧移除 `SLayoutClassic`），经典固定式能力（`orientation`/`scrollBehavior`/`fixedTop`/`fixedFooter`/`stretchFooter`/占位符）全部并入统一 `SLayout`，`AppLayout` 不再有 `engine` 双内核。原有对「合并成本/风险」的评估记录保留于此作为历史分析。

### 8.5 演进建议（数据支持）

- 以 `docs/optimize.md` 的维护性评估口径看，`LayoutClassic` 的 17 个 CSS 变量 + 4 层 z-index 是复杂度最高点，建议抽 `computeClassicLayoutCssVars()` 纯函数并加单测（现状内联在 `layout-classic-root.vue` 的 `style` computed 中，可测性低）。
- 两套 Recipe 的 `size` / `trigger` / `mobileDrawer` 片段重复，建议抽为共享 `layoutCommonExtend`，消除约 40 行重复。
- 以上优化仅为 `packages/ui` 层内部重构，不影响公开 API，属 P2 改进。

---

## 9. 扩展布局能力的技术方案分析（双栏混合 / 左右双 Sidebar）

### 9.1 需求与现状

为对标现代 AI 桌面应用（VS Code / Linear / Slack）与 soybean-admin 混合布局，需要支持：

- **左右双 Sidebar**：左侧主导航 + 左侧次级上下文栏（文件树/会话列表）。
- **垂直混合（rail + 抽屉）**：一级图标 rail 常驻 + 二级菜单抽屉。
- **右侧上下文/设置栏**：右侧属性面板。

**现状约束**：headless 的 `LayoutCompact` / `LayoutClassicCompact` 目前**只渲染一个 `LayoutSidebar`**（`side: left|right` 之一），`LayoutRail` 仅作为折叠把手（`toggleSidebar`），无「常驻一级 rail + 二级面板」的组合能力，也无第二侧栏插槽。

### 9.2 三种实现方案

#### 方案 A：在 headless 层直接实现（新增第二侧栏 / 混合抽屉能力）

- **改动面**：`types.ts`（新增 `LayoutContextSidebar` 原语、`contextSidebarVisible`/`contextSidebarWidth`/`railFixed` 等 props、新 `LayoutUiSlot`）、`layout-compact.vue`/`layout-classic-compact.vue`（组合第二侧栏 + rail 常驻）、`context.ts`、`layout-rail.vue`（支持常驻 rail 与抽屉展开）、Recipe 与 CSS 变量、z-index/gap 矩阵扩展为三列。
- **架构影响**：中-高。headless 是被 `@soybeanjs/ui` 与所有下游共用的地基，改动需严格向后兼容（默认行为不变），回归测试矩阵（单/双/混合 × left/right × 断点）显著增大。
- **维护成本**：高。需长期维护三栏布局的层级/间距/响应式组合。

#### 方案 B：在业务组件层实现（`@soybeanjs/admin` 的 `AppLayout` / `AppMenu`）

- **实现方式**：不修改 headless/ui，`AppLayout` 在既有单 `SLayout` 之上，用绝对定位面板 + `Teleport` + admin Recipe 自行管理第二侧栏/rail/抽屉的宽度、间距、层级与响应式。
- **架构影响**：零 headless 改动，爆炸半径仅限 admin 包；可快速迭代、独立发版。
- **维护成本**：中。需在 admin 层重新实现一部分布局胶水（宽度/层级/响应式），并手动对齐 a11y 与主题 token；能力仅 admin 可用（其他应用不可复用）。

#### 方案 C：两阶段（先在 B 原型，验证后提升到 A）

- 先在 `@soybeanjs/admin` 用方案 B 快速产出可用原型，验证交互与价值；当确认有 ≥2 个独立消费方或成为通用范式后，再把「第二侧栏原语 + 常驻 rail/抽屉」作为**向后兼容的新增能力**提升进 headless（方案 A）。

### 9.3 优劣对比

| 维度                   | A：headless 层   | B：业务组件层      | C：两阶段               |
| :--------------------- | :--------------- | :----------------- | :---------------------- |
| 通用复用               | 高（全应用可用） | 低（仅 admin）     | 高（最终提升）          |
| 爆炸半径/风险          | 高（地基改动）   | 低                 | 低→高（受控）           |
| 交付速度               | 慢               | 快                 | 快（先 B）              |
| a11y/主题/响应式一致性 | 最高             | 需自行对齐         | 最终最高                |
| 维护成本               | 高               | 中                 | 中-高（需持续维护两套） |
| 是否引入第二份布局胶水 | 否               | 是（重复实现部分） | 最终否                  |
| 测试矩阵复杂度         | 高               | 中                 | 中-高                   |

### 9.4 技术实施建议（结论）

> **推荐方案 C（两阶段）**，并给出明确的判定门槛：

1. **第一阶段（M6，admin 层）**：在 `AppLayout` 内实现 `AppSplitPanel`（左右双栏）与混合 `vertical-mix`（rail + 抽屉），完全复用现有 `SLayout` 基础原语 + admin Recipe + `AppMenu`/`useMixMenuState`。仅当「有 ≥2 个独立消费方」或「已成为中后台通用范式」时才触发提升。
2. **提升规则（headless 层）**：新增能力必须**严格向后兼容**——默认行为与现有 `LayoutCompact`/`LayoutClassicCompact` 完全一致，仅当传入新 props（如 `contextSidebarVisible`）时才激活第二栏；新 `LayoutUiSlot` 以追加方式扩展 `LayoutUiSlot`（不破坏既有 UI 映射）。
3. **通用性判定**：双栏/混合本质是通用布局原语（VS Code / Linear / Slack 范式），**值得沉淀为 headless 能力**，但**不应在只有单一消费方时过早投入**——这正是方案 C 的意义。
4. **避免过度工程**：若仅 `soybean-admin` 类单一应用需要，维持方案 B 即可，不提升到 headless。

---

## 10. soybean-unify 布局实现调研与借鉴

调研对象：`/Users/soybean/Web/Projects/SoybeanJS/soybean-unify/apps/admin/src/layouts`（一个基于 `@soybeanjs/ui` 的轻量应用壳）。

### 10.1 整体评估

| 维度       | 评估      | 说明                                                                                                                                                                                            |
| :--------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 设计思路   | **优**    | 「store 驱动 + 薄组件」：`base/index.vue` 用 `v-bind="themeStore.layoutProps"` 一键注入布局配置；`getLayoutPropsFromConfig()` 将 Theme.Config 干净映射为 `LayoutProps`，实现「配置 ↔ 组件」解耦 |
| 代码质量   | **优**    | 高度复用 `@soybeanjs/ui`（`SLayout`/`SLayoutTrigger`/`STreeMenu`/`SPageTabs`/`SBreadcrumb`/`SDropdownMenu`），组件薄、职责单一、无重复造轮子；严格 TS                                           |
| 功能完整性 | **中-良** | 覆盖 header/sidebar/tab/content/footer/loading spinner/fullContent；多页签含 `KeepAlive` 缓存与右键菜单；但**仅单布局模式**（无 6 模式切换、无混合/双栏、无命令面板）                           |
| 性能       | **良**    | `KeepAlive` + `Transition`（`pageAnimateMode`）+ `refDebounced` 刷新；菜单用 `STreeMenu`；状态走 computed getter，重渲染面小                                                                    |

### 10.2 可借鉴的技术亮点（Best Practices）

| #   | 亮点                                                                                                    | 出处                               | 借鉴价值（引入 `@soybeanjs/admin`）                                            |
| :-- | :------------------------------------------------------------------------------------------------------ | :--------------------------------- | :----------------------------------------------------------------------------- |
| 1   | **配置→props 适配器** `getLayoutPropsFromConfig()`                                                      | `store/theme/shared.ts`            | `AppLayout` 提供「配置对象 → `LayoutProps`」映射，解耦主题配置与组件           |
| 2   | **菜单展开策略** `expandStrategy: 'keep'\|'active'`                                                     | `layout-sidebar/index.vue`         | `AppMenu` 增加 `expandStrategy` prop：keep 保留用户展开、active 仅展开激活路径 |
| 3   | **面包屑 + 下拉**（`SBreadcrumb`+`SBreadcrumbPage`+`SDropdownMenu`，有子级可悬停展开）                  | `layout-header/nav-breadcrumb.vue` | `AppBreadcrumb` 内置「可展开子级」能力                                         |
| 4   | **多页签 KeepAlive 集成**（`include=cachedRoutes`/`exclude=excludeCachedRoutes`/`key=getTabIdByRoute`） | `layout-content/index.vue`         | `AppMultiTab` 绑定路由缓存与页面状态隔离                                       |
| 5   | **富右键菜单** `menuFactory`（close/unpin/pin/新窗口/closeLeft/Right/Other/All）                        | `layout-tab/index.vue`             | `AppMultiTab` 直接以 `menuFactory` 暴露（复用 `SPageTabs`）                    |
| 6   | **局部 UiClass 覆写** `ui="{ content: 'p-layout' }"`                                                    | `base/index.vue`                   | 示范 scoped 样式覆写，`AppLayout` 应支持同类 `ui` 透传                         |
| 7   | **头部动作组合 + 响应式断点**（`lt-lg:hidden`/`lt-md:hidden`）                                          | `layout-header/index.vue`          | `AppHeader` 预设动作插槽位 + 内置断点显隐                                      |
| 8   | **全页签关闭回退**（`tabs.length===0 → router.push('/')`）                                              | `layout-tab/index.vue`             | `AppMultiTab` 空态回退逻辑                                                     |

### 10.3 与当前方案（soybean-admin）对比

| 对比点     | soybean-unify                                                                       | soybean-admin（本路线图参照）           |
| :--------- | :---------------------------------------------------------------------------------- | :-------------------------------------- |
| 布局引擎   | 统一 `SLayout`（`variant`/`orientation`/`scrollBehavior`/`fixedTop`/`fixedFooter`） | 统一 `SLayout` 多模式                   |
| 布局模式数 | 1（由 `layoutProps` 配置 side/variant/collapsible）                                 | 6 种 `ThemeLayoutMode`                  |
| 菜单       | `STreeMenu`（复用 ui 组件）                                                         | 自定义 `global-menu` 6 模式（Naive UI） |
| 命令面板   | 无（仅 `SearchDocument`）                                                           | 有 `global-search` 命令面板             |
| 主题抽屉   | 有 `ThemeCustomize` 按钮（配合 `SThemeCustomizer`）                                 | 有完整 `theme-drawer`                   |
| 多页签     | `SPageTabs` + `menuFactory` + KeepAlive                                             | `global-tab` + context-menu             |

**结论**：soybean-unify 的**组合方式与复用理念**（store 驱动、薄组件、复用 ui）与 `@soybeanjs/admin` 目标高度一致，是「如何用好 `SLayout` + ui 组件」的最佳范例；但其**模式覆盖度**远低于 soybean-admin，故 `@soybeanjs/admin` 应同时吸收两者——以 unify 的复用/解耦手法承载 admin 的 6 模式能力。

### 10.4 采纳建议与整合方案

1. **吸收「配置→props 适配器」**：`AppLayout` 提供 `layoutConfig`（`side/variant/collapsible/各宽度高度`）并内部映射到统一 `SLayout`，用户可直接绑定主题 store 配置（对应本路线图 §3.2 的 `mode` + 尺寸配置）。
2. **`AppMenu` 增加 `expandStrategy`**（keep/active），默认可选，贴合多页面深度菜单场景。
3. **`AppBreadcrumb` 内置子级下拉**（照搬 unify 的 `SBreadcrumb`+`SDropdownMenu` 组合）。
4. **`AppMultiTab` 直接基于 `SPageTabs` + `menuFactory`**，并按 §2.4 复用规范以 `App.Tab`（含 `routeName`/`fullPath`/`pinned`）驱动路由缓存与空态回退。
5. **`AppHeader` 预设动作插槽**（搜索/全屏/多语言/主题/用户菜单）并内置响应式断点显隐。
6. **整合到里程碑**：将上述亮点并入 M1（`AppLayout` 配置适配）、M2（`AppMenu` expandStrategy）、M4（`AppMultiTab`/`AppBreadcrumb`），使 `@soybeanjs/admin` 在复用手法与模式覆盖两个维度都达到最优。

---

## 11. 实施计划（Timeline / Milestones）

> 按「可独立发布、价值优先、渐进交付」拆分，每个里程碑结束后 `pnpm typecheck`、`pnpm test`、浏览器 e2e（`axe-core` 对比度）通过，并同步 `pnpm sui admin` 生成元数据（如适用）。

### 里程碑 M1 — 包脚手架与基础布局（P0）

- 初始化 `packages/admin` 脚手架（`package.json` / `tsconfig` / `vite.config` / `resolver` / barrel），加入 workspace。
- `AppLayout`（`vertical` / `horizontal` 起步）+ `AppLayoutContext` + 自动响应式。
- `AppLogo`、`AppBreadcrumb`、`AppFooter`、`AppPageHeader`。
- 交付：可在 playground 中运行的基础后台壳。

### 里程碑 M2 — 菜单系统（P0）

- `AppMenu` 6 种模式 + `FirstLevelMenu` + `useMixMenuState`。
- `AppMenu` 与 `AppLayout` 的 `mode` 联动。
- 交付：6 种布局/菜单模式全部可切换。

### 里程碑 M3 — 中后台高频复合组件（P0/P1）

- `AppProTable` / `AppProForm` / `AppSearchForm` / `AppPagination`。
- `AppEmptyState` / `AppSkeletonTable` / `AppResult`。
- 交付：覆盖列表/查询/详情三类典型页面。

### 里程碑 M4 — 协作与效率组件（P1）

- `AppMultiTab`（含右键菜单、滚动）、`AppCommandPalette`、`AppUserMenu`。
- `AppPermissionButton` / `AppPermissionWrapper`。
- 交付：接近 soybean-admin 完整交互的 admin 壳。

### 里程碑 M5 — 主题与增强（P2）

- `AppThemeDrawer`（布局/外观/通用/预设）、`AppDarkModeContainer`、`AppWatermark`。
- `AppStatisticCard` / `AppCountUp`、`AppDescriptions`、`AppCopyText`、`AppStatusBadge` 等。

### 里程碑 M6 — 扩展布局与菜单（P2/P3）

- `AppSplitPanel`（左右双栏）、`AppRightPanel`（右侧设置栏）。
- 扩展菜单模式（折叠/分组/巨型菜单等，视需求）。
- 交付：对标现代 AI 桌面应用的布局能力。

---

## 12. 评估标准（Evaluation Criteria）

每个组件在实现前/后按下述标准评估，通过才进入交付：

1. **可行性 (Feasibility)**：是否可基于现有 `@soybeanjs/ui` / headless 原子组件低成本实现；是否需要 headless 层新增能力（须先评估 headless 改动成本）。
2. **复用性 (Reusability)**：能否脱离具体业务独立使用；是否将 store 依赖抽象为受控 props / 可注入 composable。
3. **复杂度/收益比**：实现成本（Low/Med/High）与对中后台开发的通用价值是否匹配；优先低成本高价值。
4. **架构契合 (Alignment)**：遵守 headless/styled 边界、UnoCSS-only、`S` 前缀、`cv()`/`scv()` 配方、barrel 导出、`pnpm sui admin` 元数据同步。
5. **质量护栏**：`pnpm typecheck` / `pnpm test` 通过；浏览器 e2e + `axe-core`（对比度、ARIA）通过；无 `as any` / `@ts-ignore`。
6. **依赖健康**：新增第三方依赖（如 `qrcode`、`fuse.js`）仅以 peer/可选依赖引入，不污染核心包体积。
7. **文档与演示**：每个组件配套 playground 示例 + docs 页面（参照 `packages/ui` 的 surfaces 交付要求）。

**优先级图例**：

| 等级 | 含义                                           |
| :--: | :--------------------------------------------- |
|  P0  | 后台壳/列表/表单核心，高复用，低-中成本，M1–M3 |
|  P1  | 协作/效率组件，强需求，M4                      |
|  P2  | 主题与增强，中需求，M5–M6                      |
|  P3  | 小众/成本高，择机实现                          |

---

## 13. 附录 — 命名速查

| 概念                       | 约定                                                              | 示例                                                                                     |
| :------------------------- | :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| 包前缀                     | `S`                                                               | `SAppLayout`, `SAppMenu`                                                                 |
| 布局模式 (`AppLayoutMode`) | 方位 + 结构                                                       | `vertical`, `vertical-mix`, `vertical-hybrid`, `horizontal`, `top-sidebar`, `top-header` |
| 菜单模式 (`AppMenuMode`)   | 与布局模式一致                                                    | 同上 6 值                                                                                |
| 布局内核 (`layout props`)  | `variant`/`orientation`/`scrollBehavior`/`fixedTop`/`fixedFooter` | 默认 `variant="sidebar"`（统一 `SLayout`）                                               |
| 数据模型                   | `App.*`                                                           | `AppMenuData`, `AppTableColumn`, `AppFormSchema`                                         |
| 子路径导出                 | `@soybeanjs/admin/{name}`                                         | `@soybeanjs/admin/app-menu`                                                              |

---

## 14. 详细任务清单（Detailed Task List）

> 本清单由前文推荐方案推导生成：**§8.5**（布局共享逻辑抽取，不物理合并）、**§9.4**（扩展布局采用「方案 C：先业务层、后条件提升 headless」）、**§10.4**（吸收 soybean-unify 复用手法）、**§2.4**（查询/复用优先，避免重复实现）。每个任务以 `[ ]` 勾选，完成后按 §12 评估标准验收，并通过 `pnpm typecheck` / `pnpm test` / 浏览器 e2e（axe-core）。

### 14.1 里程碑 M1 — 包脚手架与基础布局（P0）

#### T1 脚手架初始化 ✅

- [x] `pnpm-workspace.yaml` 的 `packages` 增加 `packages/admin`（已由 `packages/**` 通配覆盖，无需改动）
- [x] 创建 `packages/admin/package.json`：`name: @soybeanjs/admin`、`exports`（`.` / `./resolver` / `./nuxt` / `./styles.css` / `./*`）、`build: vp pack && pnpm build:css`、`peerDependencies`（`vue>=3.2`、`@soybeanjs/ui`）、`dependencies`（`@soybeanjs/ui`、`@soybeanjs/headless`、`@soybeanjs/cva`、`@soybeanjs/theme`、`@soybeanjs/utils`、`@soybeanjs/hooks`、`@iconify/vue`）
- [x] `tsconfig.json`（path alias `@/ -> src/`）、`vite.config.ts`（`vp pack` + unocss）
- [x] 骨架目录：`src/components/` / `src/styles/` / `src/composables/` / `src/types/` / `src/resolver/` / `src/nuxt/` / `src/index.ts`
- [x] `src/resolver/`（unplugin-vue-components，`S` 前缀组件解析）与 `src/nuxt/` 模块（对照 `packages/ui` 的 resolver/nuxt）
- [x] 基础 `styles.css` 构建通过（`unocss 'src/styles/**/*.ts' -o dist/styles.css --minify`）
- [x] 将 `packages/admin` 登记进 `docs/architecture.md` 发布包清单（第 7 个可发布包）
- [x] 验收：`pnpm build` 产包成功（9 个 dist 文件，含 `types.d.ts`）
- [ ] 验收：`pnpm typecheck` — ⚠️ **被既有环境问题阻塞**：TS 6.0.3 + vue-tsc 在 `export default <call>` 处崩溃（`Debug Failure: parameter should have errors`），对未改动的 `packages/ui` 同样触发，属既有工具链 Bug，非本任务引入；待工具链修复或升级后补跑

#### T2 基础类型与上下文 ✅

- [x] `src/types.ts`：`AppLayoutMode`（6 值联合）、`AppMenuMode`、`AppMenuData`、`AppTableColumn`、`AppFormSchema`/`AppFormOption`/`AppFormControl`、`AppTab`
- [x] `src/composables/use-app-layout-context.ts`：`provideAppLayoutContext` / `useAppLayoutContext`（`mode` / `open` / `siderCollapse` / `isMobile` / `mixSiderFixed` 响应式 ref，可选注入 → 返回 `null`）
- [x] 单测：`test/specs/composables/use-app-layout-context.spec.ts`（2 例：提供/注入 + 未提供返回 null）
- [x] 验证：`pnpm build` 通过（新增 `dist/composables/use-app-layout-context.d.ts` 与扩充 `dist/types.d.ts`）；`pnpm test` 2/2 通过

#### T3 AppLayout（v1：vertical / horizontal + 统一 SLayout）✅

- [x] `src/styles/app-layout.ts`：`appLayoutVariants`（`scv()`，顶部 `// @unocss-include`，root + size 变体）
- [x] `src/components/app-layout/app-layout.vue`：基于统一 `SLayout`；`mode` 驱动 `AppLayoutContext`；layout 属性（`variant`/`orientation`/`scrollBehavior`/`fixedTop`/`fixedFooter` 等）直接透传
- [x] `AppLayoutContext` 注入 + `mobileBreakpoint` 自动响应式（默认 768，matchMedia 监听切换 mobile；`isMobile` prop 可覆盖）
- [x] 插槽透传：`sidebar`/`header`/`tab`/`content`(default)/`footer`（对齐底层引擎 default 槽承载内容）
- [x] **采纳 §10.4-1**：`size`/维度类 props 直接透传底层引擎（`ui`/`class` 合并注入）
- [x] **采纳 §10.4-6**：`ui` 透传支持 scoped 覆写（透传给底层引擎）
- [x] `index.ts` barrel 导出 `SAppLayout` + 类型；`constants/components.ts` 注册 `SAppLayout`
- [ ] 单测已在 T5 补齐（见下）

#### T4 基础壳组件 ✅

- [x] `AppLogo`（标题 + 仅图标，`SAppLogo`）
- [x] `AppBreadcrumb`（复用 `SBreadcrumb`；**采纳 §10.4-3** 内置子级下拉 `SDropdownMenu`）
- [x] `AppFooter`（页脚文本/链接，`SAppFooter`）
- [x] `AppPageHeader`（面包屑 + 标题 + 操作区 + 返回按钮，复用 `SBreadcrumb`/`SButton`，`SAppPageHeader`）
- [x] 以上组件 `types.ts` / `index.ts` / playground 示例
- [x] 单测：`shell.spec.ts`（5 例：logo 标题显隐、页头标题/返回、页脚文案/版权）

#### T5 M1 交付 ✅

- [x] playground 可运行基础后台壳（logo + sider + header + tab + content + footer）
- [x] 单测（AppLayout：classic/fluid 渲染 + 上下文 mode 提供；`use-app-layout-context` 2 例）— 5/5 通过
- [x] 浏览器验证：`pnpm dev:playground` + browser 实测 Admin 标签 — admin shell 全部区块正常渲染、无控制台错误
- [ ] 浏览器 e2e（对比度、ARIA）
- [ ] `pnpm sui admin` 生成 API 元数据；文档页面（docs）

### 14.2 里程碑 M2 — 菜单系统（P0）

#### T6 AppMenu 数据与状态 ✅（vertical 基础）

- [x] `src/components/app-menu/types.ts`：`AppMenuProps`（`data`/`mode`/`selectedKey`/`expanded`/`siderCollapse`/`inverted`/`collapsedWidth`）、`AppMenuEmits`/`AppMenuSlots`
- [x] `src/components/app-menu/shared.ts`：`toTreeMenuOptions`（`AppMenuData` → `TreeMenuOptionData`，裁剪 `hideInMenu`，递归子级）
- [x] `src/components/app-menu/app-menu.vue`（`SAppMenu`）：基于 `STreeMenu`，`mode`/`siderCollapse` 从 `AppLayoutContext` 可选注入（独立使用降级）
- [x] **采纳 §10.4-2**：`expanded` 受控展开（`v-model:expanded` 透传 `STreeMenu`）
- [x] `index.ts` barrel 导出 `SAppMenu`；`constants/components.ts` 注册 `SAppMenu`
- [x] 单测：`app-menu.spec.ts`（4 例：数据映射 + 隐藏裁剪 + 全隐藏裁剪 + 渲染）
- [x] `use-mix-menu-state.ts`（first/second/child 三级，可交互：active key 可写 + `handleSelectFirstLevel/SecondLevel`，M2 混合模式已补）

#### T7 6 种菜单模式

- [x] 内部子组件：`VerticalMenu` / `MixMenu` / `VerticalHybridMenu` / `HorizontalMenu` / `TopSidebarMenu` / `TopHeaderMenu` + `FirstLevelMenu`（`src/components/app-menu/modules/*`）
- [x] `AppMenu` 主组件：`MENU_MAP[resolvedMode]` 分支 + `Teleport` 到 `headerMenuEl`/`siderMenuEl`（对齐 `GLOBAL_HEADER_MENU_ID`/`GLOBAL_SIDER_MENU_ID`）
- [x] 复用 `@soybeanjs/ui`（`STreeMenu` / `SNavigationMenu` / `SIcon` / `SButtonIcon`）渲染，不依赖 Naive UI
- [x] 折叠联动（`siderCollapse` 来自 `AppLayoutContext`）+ 反色 `inverted`
- [x] 混合模式抽屉固定（`mixSiderFixed` 可切换）+ 一级无子级时二级/三级抽屉宽收缩为 0
- [x] 单测：`use-mix-menu-state.spec.ts`（4 例）+ `app-menu.spec.ts` 扩展（`toNavigationMenuOptions` 2 例 + 6 模式渲染分支 + 选中事件）
- [x] playground `01-shell.vue` 支持 6 模式一键切换 + `headerMenuEl`/`siderMenuEl` 挂载点；浏览器验证 6 模式全部正常渲染、无 console 报错

#### T8 AppMenu ↔ AppLayout 联动

- [x] `AppLayout` 的 `mode` 单向推导 `AppMenu` 渲染分支与挂载点：context 新增 `headerMenuEl`/`siderMenuEl`/`siderVisible`；`AppMenu` 从 context 自动读取挂载点与 `mode`（自身 props 优先）
- [x] `AppLayout` 依据 `mode` 推导 `sidebarVisible`（`horizontal` 时隐藏 sider）
- [x] 独立使用降级（未注入 context 时 `mode` 由 prop 提供，默认 `vertical`；无挂载点时菜单就地渲染）
- [x] `index.ts` barrel 导出 `SAppMenu`
- [x] **修复侧边栏默认折叠/无法展开 bug**：Vue 基于类型的 props 推断会把类型含 `boolean` 的可选 prop 默认成 `false`，导致 `props.open` 恒为 `false`，`open = props.open ?? defaultOpen` 被错误解析为折叠。修复：`AppLayout` 自持 `open` ref（由 `defaultOpen` 初始化）、显式 `:open` 控制布局、省略此类 prop 转发，并 `watch(props.open)` 支持受控 `v-model:open`；shell 头部新增折叠/展开按钮
- [x] 单测：`app-layout.spec.ts` 扩展（默认展开 + rail 切换 + context 提供 siderVisible/挂载点 + AppMenu 从 context 读取 mode 渲染分支）+ playground 全部模式可切换
- [x] 浏览器验证：6 模式在 AppMenu 仅依赖 context 的情况下全部正常渲染，`horizontal` 下 sider 隐藏、菜单 teleport 到 header，无 console 报错；侧边栏默认展开、按钮可折叠/展开

#### T9 M2 交付

- [ ] 6 种布局/菜单模式可在 playground 一键切换
- [ ] `pnpm typecheck`（⚠️ 既有工具链 bug 阻塞）/ `pnpm test` / e2e 通过
- [ ] e2e：`packages/admin/vitest.browser.config.ts` + `test/browser/**/*.e2e.spec.ts`（`@soybeanjs/admin` 布局默认展开、horizontal 隐藏 sider、菜单 vertical/horizontal 真实浏览器渲染）；`pnpm --filter @soybeanjs/admin test:e2e` 通过（注：全壳插槽 teleport 与树式菜单折叠重渲染在隔离测试容器中触发 Vue 3.5 重渲染 bug，故 e2e 断言拆分为独立渲染）

### 14.3 里程碑 M3 — 中后台高频复合组件（P0/P1）

#### T10 数据录入类

- [ ] `AppProForm`（schema → 渲染 + 校验 + 重置，基于 `SForm`）
- [ ] `AppSearchForm`（`AppProForm` 的查询变体）
- [ ] `AppPagination`（页码/尺寸/总数/跳页 + 加载态，基于 `SPagination`）

#### T11 数据展示类

- [ ] `AppProTable`（列定义 + 加载态 + 操作栏 + 插槽，基于 `STable`）
- [ ] `AppEmptyState`（图标 + 文案 + 动作）
- [ ] `AppSkeletonTable` / `AppSkeletonPage`（基于 `SSkeleton`）
- [ ] `AppResult`（403/404/500/success/error + 动作）

#### T12 M3 交付

- [ ] playground 覆盖「列表 / 查询 / 详情」三类典型页面
- [ ] 单测（表单校验、表格列渲染、分页交互）+ e2e

### 14.4 里程碑 M4 — 协作与效率组件（P1）

#### T13 AppMultiTab（复用 `SPageTabs`，§2.4）

- [ ] `src/composables/use-multi-tab.ts`：路由 → `App.Tab`（`routeName`/`fullPath`/`pinned`）映射
- [ ] **采纳 §10.4-4**：`KeepAlive` 缓存（`include=cachedRoutes`/`exclude=excludeCachedRoutes`/`key=getTabIdByRoute`）绑定
- [ ] **采纳 §10.4-5**：`menuFactory`（close/unpin/pin/新窗口/closeLeft/Right/Other/All，复用 `SPageTabs`）
- [ ] **采纳 §10.4-8**：空态回退（`tabs.length===0 → router.push('/')`）
- [ ] **不重复实现**：直接消费 `SPageTabs`，仅做状态/缓存胶水

#### T14 AppCommandPalette

- [ ] `Cmd/Ctrl+K` 全局快捷键 + `SDialog` 容器
- [ ] 模糊搜索（`AppMenuData`/页面），键盘导航，结果分组（`SList`/`SInput`）
- [ ] 与 `AppMultiTab`/路由跳转联动

#### T15 AppUserMenu / 权限

- [ ] `AppUserMenu`（`SAvatar` + `SDropdownMenu`：个人中心/设置/退出）
- [ ] `AppPermissionButton` / `AppPermissionWrapper`（基于 `usePermission`，按权限码/角色显隐）

#### T16 M4 交付

- [ ] 接近 soybean-admin 完整交互的 admin 壳
- [ ] 单测（页签缓存、右键菜单、权限显隐）+ e2e

### 14.5 里程碑 M5 — 主题与增强（P2）

#### T17 AppThemeDrawer（复用 `SThemeCustomizer`，§2.4）

- [ ] 抽屉容器 + 嵌入 `SThemeCustomizer`（`sections`/`persist`/`showActions`/`labelResolver`）
- [ ] **不重复实现**取色/圆角/预设控件（复用 `SThemeCustomizer`/`SPalettePicker`）
- [ ] 布局模式卡片选择（`layoutModeCard`）+ `@soybeanjs/theme` 预设
- [ ] `AppDarkModeContainer`（复用 `SConfigProvider`/theme token）
- [ ] `AppWatermark`（复用 `SWatermark` 设置化封装）

#### T18 数据展示增强

- [ ] `AppStatisticCard`（`SStatistic` + `useCountUp`）、`AppCountUp`
- [ ] `AppDescriptions`（基于 `SDescriptions`）、`AppCopyText`、`AppStatusBadge`/`AppStatusDot`

#### T19 M5 交付

- [ ] 主题抽屉全功能可用；`pnpm typecheck` / `pnpm test` 通过

### 14.6 里程碑 M6 — 扩展布局与菜单（P2/P3，按 §9.4 方案 C）

#### T20 AppSplitPanel（左右双栏，admin 层原型）

- [ ] **方案 B/C 第一阶段**：在 `AppLayout` 内用绝对定位面板 + `Teleport` + admin Recipe 实现左侧主导航 + 次级上下文栏
- [ ] 复用现有 `SLayout` 基础原语，不修改 headless
- [ ] 可折叠、可拖拽调宽；响应式断点处理
- [ ] `AppRightPanel`（右侧设置/上下文栏）

#### T21 扩展菜单模式

- [ ] 折叠/分组菜单（P2）
- [ ] 视需求：巨型菜单 / 分级菜单 / 双栏导航（rail + tree，联动 `AppSplitPanel`）

#### T22 headless 提升判定（§9.4 门槛）

- [ ] 评估是否有 ≥2 个独立消费方或已成为通用范式
- [ ] 若满足 → 以**向后兼容**方式提升：`LayoutContextSidebar` 原语、`contextSidebarVisible`/`contextSidebarWidth`/`railFixed` props、新 `LayoutUiSlot`（追加方式），默认行为不变
- [ ] 若不满足 → 维持 admin 层实现（方案 B），不提升

### 14.7 横切任务（贯穿全周期）

#### T23 packages/ui 布局共享抽取（§8.5，P2 内部重构）

> **2026-08 更新**：`SLayout` / `SLayoutClassic` 已合并为统一 `SLayout`（`refactor(components): refactor layout`），`LayoutClassic*` 已移除；以下条目大多随合并完成或不再适用。

- [x] 合并 `SLayout`/`SLayoutClassic` 为单一 `SLayout`（`variant`/`orientation`/`scrollBehavior`/`fixedTop`/`fixedFooter`/占位符统一）
- [ ] 抽 `computeLayoutCssVars()` 纯函数（替代 `layout-root.vue` 内联 `style` computed）+ 单测
- [ ] 抽 `layoutCommonExtend`（消除 `layoutVariants` 的 `size`/`trigger`/`mobileDrawer` 重复，约 40 行）
- [ ] 验收：公开 API 不变，`pnpm test`（含既有 layout 测试）全绿

#### T24 质量护栏与元数据（每里程碑）

- [ ] `pnpm typecheck`（vue-tsc strict）
- [ ] `pnpm test`（workspace 单测）
- [ ] 浏览器 e2e + `axe-core`（对比度/ARIA）
- [ ] `pnpm sui admin`（API 元数据）；如涉及 locale，`pnpm sui admin-translate`
- [ ] 每个组件：`types.ts` + `index.ts` barrel + playground 示例 + docs 页面
- [ ] 代码风格：`typescript-functional-style` + `vue-sfc-structure`；无 `as any`/`@ts-ignore`；UnoCSS-only

### 14.8 依赖与优先级总览

| 任务    | 里程碑 | 优先级 | 关键依据          |
| :------ | :----- | :----: | :---------------- |
| T1–T5   | M1     |   P0   | §10.4-1/3/6、§2.4 |
| T6–T9   | M2     |   P0   | §10.4-2、§4       |
| T10–T12 | M3     | P0/P1  | §7 类别 C/D       |
| T13–T16 | M4     |   P1   | §2.4、§10.4-4/5/8 |
| T17–T19 | M5     |   P2   | §2.4、§10.4       |
| T20–T22 | M6     | P2/P3  | §9.4 方案 C       |
| T23–T24 | 横切   |   P2   | §8.5、§12         |

> **推荐执行顺序**：严格按 M1→M6 推进；每个里程碑（含其内全部任务）验收通过后再进入下一里程碑。T23（ui 层共享抽取）可与 M1–M4 并行进行，因它仅改动 `packages/ui` 内部且不影响公开 API，但必须在合并前保证既有 layout 测试全绿。

---

_本路线图基于对 `packages/ui`（`SLayout` / `SLayoutClassic`）、`@soybeanjs/headless/layout`、soybean-admin（`src/layouts/**`、`src/components/**`）的代码图分析，以及 2026 年中后台/AI 桌面应用布局模式调研编写。目标：`@soybeanjs/admin` 作为第 7 个可发布包，以复合/布局组件补全 `@soybeanjs/ui` 的原子组件能力，形成「原子组件（ui）+ 中后台复合（admin）」的完整体系。_
