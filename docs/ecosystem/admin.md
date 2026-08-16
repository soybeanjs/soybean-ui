# @soybeanjs/admin — 中后台复合层技术方案

> 定位：**中后台复合 / 布局层**。只做布局、菜单、页签、查询列表、表单、权限、结果、空态等复合组件；原子能力一律留在 `@soybeanjs/ui`。以本机 soybean-admin 工程为**参考蓝本**，将其私有布局组件重新实现为基于 SoybeanUI 原子组件的复合层——**不依赖 Naive UI，不是应用脚手架，是组件库**。
>
> 状态：`admin` 分支（提交 `3ab3c2d09`，2026-08-13）已实现 6 个壳组件 + 6 种菜单模式（M1 完成、M2 实质完成待验收），M3+（ProTable / ProForm 等 15+ 项）未开始。分支独有 `docs/admin-roadmap.md`（1033 行）是本包最详细的规划资料。

## 1. 现状盘点（基于 `origin/admin` 分支）

### 1.1 已实现组件（6 个，`S` 前缀 + `App*`）

| 导出名           | 说明                                                                                                                                                                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SAppLayout`     | 统一 `SLayout` 底座（`variant` / `orientation` / `scrollBehavior` / `fixedTop` / `fixedFooter`）；6 种布局模式；`AppLayoutContext` 注入；`mobileBreakpoint`（默认 768）matchMedia 自动响应式；插槽 sidebar / header / tab / content / footer |
| `SAppMenu`       | 基于 `STreeMenu` / `SNavigationMenu`，`MENU_MAP[resolvedMode]` 分支到 6 个模式子模块 + `Teleport` 挂载点；`hideInMenu` 裁剪；`inverted` 反色；折叠联动                                                                                       |
| `SAppLogo`       | Logo + 标题，支持仅图标                                                                                                                                                                                                                      |
| `SAppBreadcrumb` | 复用 `SBreadcrumb` + 内置子级下拉 `SDropdownMenu`                                                                                                                                                                                            |
| `SAppPageHeader` | 面包屑 + 标题 + 操作区 + 返回按钮                                                                                                                                                                                                            |
| `SAppFooter`     | 页脚文本 / 链接                                                                                                                                                                                                                              |

### 1.2 统一模式体系（核心设计）

- `AppLayoutMode = AppMenuMode = 'vertical' | 'vertical-mix' | 'vertical-hybrid' | 'horizontal' | 'top-sidebar' | 'top-header'`——一个 `mode` 同时驱动布局骨架与菜单形态。
- `AppMenuData`（key / routeKey / label / icon / children / hideInMenu / badge / disabled）为菜单、面包屑、命令面板共用的导航数据模型。
- types 预留 `AppTab`（routeName / fullPath / pinned），面向 vue-router 驱动的多页签。

### 1.3 里程碑进度（据分支 roadmap §14）

| 里程碑 | 内容                                                                                    | 状态                                   |
| :----- | :-------------------------------------------------------------------------------------- | :------------------------------------- |
| M1     | 脚手架、类型 / 上下文、AppLayout、壳组件、playground 可运行后台壳                       | ✅ 完成（T1–T5）                       |
| M2     | 6 种菜单模式、AppMenu↔AppLayout 联动、侧栏折叠 bug 修复                                 | 🔵 实质完成待验收（T6–T8 ✅，T9 未勾） |
| M3+    | ProForm / ProTable / MultiTab / CommandPalette / ThemeDrawer / SplitPanel 等（T10–T24） | ⬜ 未开始                              |

M2 遗留：`pnpm typecheck` 被 TS 6.0.3 + vue-tsc 既有工具链 bug 阻塞（对应优化项 F8）；浏览器 e2e 因 Vue 3.5 重渲染 bug 导致断言拆分未通过。

## 2. 架构设计

### 2.1 依赖方向（单向向上）

```
@soybeanjs/headless ──► @soybeanjs/ui ──► @soybeanjs/admin ──(optional peerDep)──► @soybeanjs/chart
```

admin 依赖 `@soybeanjs/theme`、`@soybeanjs/cva`、`@soybeanjs/hooks`、`@soybeanjs/utils`、`@iconify/vue`；peer 依赖 `vue >=3.2`、`vue-router >=4`、nuxt / unplugin-vue-components（可选）。`admin → chart` 是跨外围包白名单唯一有向边（仪表盘嵌图表）。

### 2.2 状态注入模式（关键抽象）

soybean-admin 中的 `appStore / themeStore / routeStore` 依赖被抽象为「**受控 props + 可选注入的 `AppLayoutContext`**」：

- 组件无 store 也能独立工作（纯 props 驱动，playground / docs 可直接渲染）；
- 宿主应用可通过 `provideAppLayoutContext()` / `useAppLayoutContext()` 注入全局联动（折叠状态、菜单挂载点 `headerMenuEl` / `siderMenuEl`、移动端断点）。

### 2.3 包结构

```
packages/admin/
├── src/
│   ├── components/
│   │   ├── app-layout/          # 双引擎布局
│   │   ├── app-menu/            # MENU_MAP 分发 + modules/（vertical / mix / vertical-hybrid /
│   │   │                        # horizontal / top-sidebar / top-header / header-menu / first-level-menu）
│   │   └── app-logo|app-breadcrumb|app-page-header|app-footer/
│   ├── composables/use-app-layout-context.ts
│   ├── styles/                  # cv()/scv() recipe + @unocss-include
│   ├── constants/components.ts  # SApp* 名称注册表
│   ├── resolver/ · nuxt/
│   └── types.ts                 # AppLayoutMode / AppMenuMode / AppMenuData /
│                                # AppTableColumn / AppFormSchema / AppTab
└── test/                        # 单测 5 个 + browser e2e（app-shell.e2e.spec.ts）
```

### 2.4 UI 复用规范

- **查询优先**：先查 `@soybeanjs/ui` 是否已有原子组件，禁止重复造（多页签复用 `SPageTabs` + `useMultiTab`、主题抽屉复用 `SThemeCustomizer`）。
- 包装型组件只做组合与领域胶水；样式仅 UnoCSS `cv()/scv()` recipe；禁 `as any`。
- 分支已顺手修复核心包 `navigation-menu.ts` 的 `group` → `group/navigation-menu` 命名分组（避免复合组件 group 类冲突）。

## 3. 核心功能（M3+ 规划，T10–T24）

按「基于 soybean-admin codegraph 的组件提取分析（P0/P1/P2 分级）」与「实用组件收录候选」：

| 类别        | 组件 / composable                                                 | 优先级 |
| :---------- | :---------------------------------------------------------------- | :----: |
| 查询表格    | `SAppProTable`（`AppTableColumn` schema 驱动 + 搜索表单 + 分页）  |   P0   |
| Schema 表单 | `SAppProForm`（`AppFormSchema` 驱动，复用核心 form 家族）         |   P0   |
| 多页签      | `SAppMultiTab`（复用 `SPageTabs` + `useMultiTab`，`AppTab` 模型） |   P1   |
| 命令面板    | `SAppCommandPalette`（`AppMenuData` 驱动，复用 combobox）         |   P1   |
| 主题抽屉    | `SAppThemeDrawer`（复用 `SThemeCustomizer`）                      |   P1   |
| 分栏        | `SAppSplitPanel`                                                  |   P2   |
| 反馈        | `SAppEmptyState`、`SAppResult`、`SAppPermissionButton`            |   P2   |

**范围界定五标准（S1–S5）**：满足「复合型（组合原子组件）+ 中后台普适 + 无业务语义 + soybean-admin 可提取 + SoybeanUI 原子可覆盖」才收录。

## 4. 实现路径

| 阶段 | 内容                                                                               | 时间窗（建议） |
| :--: | :--------------------------------------------------------------------------------- | :------------- |
|  1   | M2 验收：解除 typecheck 工具链阻塞（联动 F8）、修复 e2e 断言拆分、补齐 M2 交付清单 | 08-14 ~ 08-25  |
|  2   | 分支合并到 main（含 admin→chart peerDep 接线、`ui-unocss` 改名冲突处理）           | 08-25 ~ 08-31  |
|  3   | M3：SAppProTable + SAppProForm（P0 实用组件，schema 模型已在 types.ts 预留）       | 09 月          |
|  4   | M4：SAppMultiTab + SAppCommandPalette + SAppThemeDrawer                            | 10 月          |
|  5   | M5–M6：SAppSplitPanel、反馈类组件、1.0 候选收敛                                    | Q4             |

## 5. 技术选型

| 选型        | 决策                                                                 | 理由                                |
| :---------- | :------------------------------------------------------------------- | :---------------------------------- |
| 组件底座    | 基于 `@soybeanjs/ui` 原子组件组合，**不引入 Naive UI**               | 保持单一组件体系与主题 token 一致性 |
| 蓝本        | soybean-admin（参考其布局形态与交互，重写实现）                      | 成熟中后台交互范式，避免从零设计    |
| 路由        | `vue-router >=4` peer，`AppMenuData.routeKey` 解耦具体路由表         | 组件库不绑定路由方案                |
| 状态        | 受控 props + `AppLayoutContext` 可选注入                             | 组件可独立渲染，无 store 依赖       |
| 构建 / 测试 | vite-plus `vp pack` + vitest（happy-dom）+ Playwright e2e + axe-core | 与 `packages/ui` 完全对齐           |
| 图表        | `@soybeanjs/chart` optional peerDep                                  | 白名单唯一跨外围包边                |

## 6. 兼容性考虑

- **响应式**：`mobileBreakpoint`（默认 768）matchMedia 自动切换移动端形态；SSR 下首屏按 Desktop 渲染需在文档标注（matchMedia 在客户端 hydrate 后生效）。
- **Nuxt**：提供 `./nuxt` module 与 resolver（optional peer）；菜单 / 面包屑依赖宿主提供 vue-router 实例。
- **主题**：样式完全走 `@soybeanjs/theme` token + `cv()/scv()`，自动获得亮暗色与 `inverted` 反色（暗色侧栏）。
- **版本**：lockstep 同步；对外统一 `S` 前缀（`SAppLayout`），内部 `App*`，数据模型 `App.*` 命名空间。
- **合并风险**：main 的 `ui-unocss → unocss` 改名与分支 `@soybeanjs/ui-uno` devDeps 冲突；合并前先重定向。

## 7. 风险

| 风险                                            | 缓解                                                                                              |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| typecheck 被 TS 6.0.3 + vue-tsc 工具链 bug 阻塞 | 联动优化项 F8（统一 TS 版本）；短期以 package 级 vue-tsc 门禁替代                                 |
| ProTable / ProForm schema 设计过早固化          | 先在 playground 用真实场景驱动两个迭代再定 API；`AppTableColumn` / `AppFormSchema` 保持最小字段集 |
| 与 soybean-admin 蓝本交互漂移                   | 以分支 `docs/admin-roadmap.md` 的 codegraph 提取分析为基准，范围严格按 S1–S5 标准裁剪             |
