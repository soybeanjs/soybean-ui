# SoybeanUI 中后台壳组件路线图（ui-shell-roadmap）

> 状态：**Accepted · 2026-09**（§11 为 2026-09 实施修订：四个 ui 复合组件收窄为一个 `SAppShell`）
> 适用仓库：`@soybeanjs/headless` + `@soybeanjs/ui`（核心两层，不新增任何包）
> 规范约束：组件开发 skill（[.agents/skills/soybean-ui-develop/](../.agents/skills/soybean-ui-develop/SKILL.md)），尤其是 [layers.md Headless admission（R1–R8）](../.agents/skills/soybean-ui-develop/layers.md#headless-admission)
> 关联文档：[ui-ai-roadmap.md](./ui-ai-roadmap.md)（AI 域同款决策）· [v0.50.0.md](./v0.50.0.md)（table/form 引擎重构）· [roadmap.md](./roadmap.md)（原子组件评估）

## 1. 背景与目标

### 1.1 为什么不再建 admin 包

- `@soybeanjs/admin` 中后台复合层提案已于 **v0.40.0 取消，包已删除**；`@soybeanjs/chart` 同步取消（图表改为文档站基于 [TanStack Charts](https://tanstack.com/charts) 的 shadcn 风格示例）。
- 原 `admin` 分支（2026-08，6 个 `SApp*` 壳组件 + 6 种菜单模式）验证了交互范式，但它是**独立第三层包**：独立依赖树、独立前缀叙事、与核心包 lockstep 发布，收益不抵维护成本。ADR-0001 的单包自治模型对 AI 域已 [superseded](./adr/0001-peripheral-package-layering.md)，本路线图对中后台壳域作出同样决策。
- 与 AI 域（见 [ui-ai-roadmap.md](./ui-ai-roadmap.md)）相同的结论：**壳组件今后全部在核心 headless/ui 内实现，统一 `S` 前缀，不使用 `App*` 命名**。

### 1.2 目标

1. 让用户用核心库组件即可组装出 soybean-admin 级别的中后台应用壳（多模式布局、菜单联动、面包屑、多页签、移动端响应式）。
2. 严格按两层契约落地：**交互/状态/派生逻辑进 headless（零样式），纯组合与样式进 ui**；不平行克隆既有布局原语。
3. 路由无关：库不依赖 `vue-router`，导航与页签模型接受任意数据输入；路由绑定以文档示例交付。

### 1.3 数量概览

| 分类                                              | 数量 | 内容                                                                                                  |
| :------------------------------------------------ | :--: | :---------------------------------------------------------------------------------------------------- |
| headless 逻辑（`src/shell/` 域模块 + composable） |  3   | `useMediaQuery`、shell 导航模型与派生、`useTabs` 标签集合状态                                         |
| ui 新增复合组件（统一 `S` 前缀）                  |  4   | `SLayoutShell`、`SShellMenu`、`SPageHeader`、`SLogo`                                                  |
| 配方/示例（不新增库组件）                         |  4   | 命令面板、主题抽屉、面包屑溢出、vue-router 多页签适配                                                 |
| 既有原子直接复用                                  | 12+  | layout 全家、page-tabs、nav-menu/tree-menu、breadcrumb、command、splitter、empty、theme-customizer 等 |
| 范围外（本路线不收录）                            | 3 类 | `ProTable`/`ProForm`（另见提案与 v0.50）、权限按钮、应用级业务功能（通知中心等）                      |

## 2. 现状盘点：核心库已有什么

原 admin 分支的绝大多数底座**已经存在于核心库**，这是回迁而非重建。

| 能力         | 核心库现状                                                                                                                                                                                                                                                                                                                                          | 原 admin 对应物                                |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| 布局骨架     | headless `layout`：root / sidebar / rail / header / tab / content / main / footer / mobile / placeholder / trigger + `LayoutCompact`；ui `SLayout`、`SLayoutTrigger`。支持 `orientation`、`variant(sidebar/floating/inset)`、`collapsible(offcanvas/icon)`、`isMobile`、显隐开关、固定头尾、尺寸 token、插槽 Teleport 挂载点（`LayoutPlaceholder`） | `SAppLayout`（双引擎 6 模式）                  |
| 页签原语     | headless `page-tabs`：root / item / close / pin / compact；ui `SPageTabs`                                                                                                                                                                                                                                                                           | `SAppMultiTab`（缺的是路由状态模型，不是原语） |
| 菜单族       | `SMenu` / `SNavMenu` / `SNavigationMenu` / `STreeMenu` / `SMenubar`                                                                                                                                                                                                                                                                                 | `SAppMenu`                                     |
| 面包屑       | `SBreadcrumb` + `SDropdownMenu`（子级溢出可组合）                                                                                                                                                                                                                                                                                                   | `SAppBreadcrumb`                               |
| 命令面板底座 | `SCommand`（fuzzy 过滤已内置，`useFuse` 在 headless）、`SCombobox`、`SDialog`                                                                                                                                                                                                                                                                       | `SAppCommandPalette`                           |
| 分栏         | `SSplitter`                                                                                                                                                                                                                                                                                                                                         | `SAppSplitPanel`                               |
| 空态/结果    | `SEmpty`；`SResult` 在 [roadmap.md](./roadmap.md) P1 计划中                                                                                                                                                                                                                                                                                         | `SAppEmptyState`、`SAppResult`                 |
| 主题         | `SThemeCustomizer`、`SThemeModeSelect`、`SThemeModeSwitch`                                                                                                                                                                                                                                                                                          | `SAppThemeDrawer`                              |
| 页脚         | `SLayoutFooter`（layout 插槽）                                                                                                                                                                                                                                                                                                                      | `SAppFooter`                                   |

**真正的缺口只有四类：**

1. **G1 模式编排**——一个 `mode` 同时驱动布局骨架与菜单挂载（侧栏 / 顶栏 / 混合 / 双栏 6 种形态），含折叠状态、双菜单挂载点、移动端断点联动。
2. **G2 统一导航模型**——菜单、面包屑、命令面板共用的导航树：规范化、`hideInMenu` 裁剪、激活项匹配、激活路径（面包屑）派生、混合模式一二级拆分。
3. **G3 多页签状态模型**——与路由无关的标签集合状态（打开/激活/关闭/固定/affix），vue-router 绑定属适配层。
4. **G4 小型复合与配方**——页头、Logo，以及命令面板/主题抽屉这类"组合即得"的配方。

## 3. Headless 准入总表（强制门）

准入依据 [layers.md R1–R8](../.agents/skills/soybean-ui-develop/layers.md#headless-admission)。headless 零样式（连 `hidden` / `sr-only` 都不允许），UI 层不写任何 ARIA/键盘语义。

### 3.1 准入：3 项纯逻辑（无新 DOM 组件家族）

逻辑放 `packages/headless/src/shell/`（域模块，参照 AI 域 `src/ai/` 的做法），通过子路径 `@soybeanjs/headless/shell` 导出；可复用钩子同时从 `./composables` 导出。

|  #  | 准入项                                                                                                                                | 形态               | 为什么是 headless                                                                                                                                   |
| :-: | :------------------------------------------------------------------------------------------------------------------------------------ | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | `useMediaQuery(query)`                                                                                                                | composable         | matchMedia 订阅 + SSR 安全降级（无 window 时回退桌面态），是通用响应式原语，shell 与未来任何响应式组件共用。当前 headless 28 个 composable 中无此项 |
| H2  | shell 导航模型：`ShellNavNode` 类型 + 纯函数 `filterNavTree` / `findActiveTrail` / `splitNavLevels` + `useShellNav(nodes, activeKey)` | 纯 TS + composable | 数据规范化、权限/隐藏裁剪、最长前缀激活匹配、面包屑路径派生、混合模式拆树——全部是无样式、无 DOM 的数据变换                                          |
| H3  | `useTabs(items, options)`                                                                                                             | composable         | 标签集合状态：受控/非受控、激活、关闭（含最后一页保护）、固定/affix 规则；不 import vue-router，不碰 `<keep-alive>`（缓存策略由宿主决定）           |

### 3.2 拒绝准入：4 个 UI-only 复合组件

| 组件           | 理由（R1–R8 判定）                                                                                                                                                |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SLayoutShell` | 模式矩阵是**对已准入 layout 家族的组合配方**（LayoutCompact + Placeholder + 插槽 + mode 分支），不产生新的可访问性交互原子。样式（侧栏宽度、反色、顶栏分割）属 UI |
| `SShellMenu`   | 组合 `SNavMenu` / `STreeMenu` 到 shell 挂载点，模式分支数据来自 H2；自身无新键盘/ARIA 语义（由菜单族承担）                                                        |
| `SPageHeader`  | 面包屑 + 标题 + 操作区 + 返回按钮的版式复合，纯展示组装                                                                                                           |
| `SLogo`        | 图标 + 标题 + 折叠态，纯版式                                                                                                                                      |

> **Compact 下沉条款**：P1 收口时，若 `SLayoutShell` 的模式矩阵演化为稳定的数据驱动结构（迭代渲染默认内容而非纯插槽），按既有规则评估下沉为 headless `layout` 家族的 `LayoutShellCompact`。**只能扩展现有 layout 家族，不另立 `shell` 布局组件家族。**

### 3.3 不新建组件：复用或配方交付

- 页脚 → `SLayoutFooter` 插槽；分栏 → `SSplitter`；空态 → `SEmpty`；结果页 → 已在 [roadmap.md](./roadmap.md) P1 的 `SResult`。
- `SCommandPalette` / 主题抽屉 / 面包屑溢出 / router-tabs 适配 → 以文档示例 + 可选 sbean 源码配方交付，不进库导出（见 §7.2）。
- 面包屑激活路径不新增组件：`useShellNav` 的 `activeTrail` 输出直接喂给既有 `SBreadcrumb`。

## 4. 架构决策

### 4.1 包结构（S1）：不新增包，逻辑走 shell 域模块

```
packages/headless/src/shell/
├── types.ts            # ShellMode / ShellNavNode / ShellTab / 派生结果类型
├── nav.ts              # filterNavTree / findActiveTrail / splitNavLevels（纯函数）
├── use-shell-nav.ts    # useShellNav（reactive 包装）
├── use-tabs.ts         # useTabs
└── index.ts            # @soybeanjs/headless/shell
packages/ui/src/components/layout-shell/   # SLayoutShell（UI-only 复合）
packages/ui/src/components/shell-menu/     # SShellMenu
packages/ui/src/components/page-header/    # SPageHeader
packages/ui/src/components/logo/           # SLogo
packages/ui/src/styles/{layout-shell,shell-menu,page-header,logo}.ts
```

依赖方向不变：**ui → headless**；shell 模块零 DOM 样式依赖，不引入 `vue-router`。

### 4.2 命名（S2）：统一 `S` 前缀

沿用核心库词汇，不使用 `App*`：`SLayoutShell`、`SShellMenu`、`SPageHeader`、`SLogo`。类型命名空间 `Shell.*`（`ShellMode`、`ShellNavNode`、`ShellTab`），不沿用 `App.*`。

### 4.3 模式词汇（S3）：沿用已验证的 6 模式

```ts
type ShellMode =
  | 'vertical' // 侧栏完整菜单
  | 'vertical-mix' // 侧栏一级（图标）+ 子面板二级
  | 'vertical-hybrid' // 侧栏一级 + 内嵌二级
  | 'horizontal' // 顶栏一级 + 弹出二级
  | 'top-sidebar' // 顶栏一级 + 侧栏二级
  | 'top-header'; // 顶栏混合 + 侧栏
```

`mode` 是 `SLayoutShell` 的单一编排输入，同步驱动布局骨架与 `SShellMenu` 形态；P0 只交付 `vertical` / `horizontal` 两种主模式跑通契约，其余 4 种 P1 跟进（避免一次性固化 6 套实现）。

### 4.4 导航模型（S4）：输入与路由无关

```ts
interface ShellNavNode {
  key: string; // 唯一键（路由场景可传 fullPath/routeName）
  label: string;
  icon?: string; // iconify 名称或渲染插槽键
  children?: ShellNavNode[];
  href?: string; // 链接型（组件库只负责渲染与激活匹配）
  disabled?: boolean;
  badge?: string | number;
  meta?: {
    hideInMenu?: boolean; // 裁剪但保留在激活匹配/面包屑中
    affixTab?: boolean; // 联动 useTabs 固定页签
    iconOnlyWhenCollapsed?: boolean;
    [key: string]: unknown;
  };
}
```

`useShellNav(nodes, activeKey)` 返回：

- `visibleTree`——裁剪后的渲染树；
- `flatMap`——id→node 索引；
- `activeTrail`——激活节点到根的路径（面包屑数据源）；
- `primaryLevels` / `secondaryOf(activePrimaryKey)`——混合模式一二级拆分结果。

### 4.5 响应式（S5）：useMediaQuery + 受控 isMobile

- `useMediaQuery('(max-width: 768px)')` 供组件与宿主共用；SSR 首屏按桌面态，hydrate 后切换，文档明确标注。
- `SLayoutShell` 的 `isMobile` 支持受控传入（宿主可接任意断点方案），非受控时内部用 `useMediaQuery(mobileBreakpoint)`。

### 4.6 多页签（S6）：状态在库，路由绑定在适配层

- `useTabs` 管理 `ShellTab { key, label, closable, pinned, affix }` 集合与打开/关闭/激活/固定规则；
- vue-router 适配（路由表 → tabs、afterEach 自动开页、affix 初始化、`<keep-alive :include>` 同步）以**文档示例**交付（`apps/docs/src/examples/` 或后续 sbean 配方），库不因此新增路由依赖。

### 4.7 范围边界（S7）：ProTable / ProForm 不进本路线

schema 驱动的查询表格 / 表单依赖 table/form 引擎选型（[v0.50.0.md](./v0.50.0.md) 的表格引擎更换，以及 [ecosystem/table.md](./ecosystem/table.md)、[ecosystem/form.md](./ecosystem/form.md) 提案），不搭壳组件便车，避免 schema 过早固化。权限按钮含业务/指令语义，收录标准 S1–S5 不通过，列为范围外。

## 5. P0 — 主链路（5 项）

|  #  | 交付物                                                                          | 层                    | 验收要点                                                                                                   |
| :-: | :------------------------------------------------------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------- |
|  1  | `useMediaQuery`                                                                 | headless composable   | 单测覆盖订阅/清理/SSR 回退；从 `./composables` 导出                                                        |
|  2  | shell 导航模型 + `useShellNav`（`ShellNavNode`、裁剪、激活匹配、`activeTrail`） | headless `shell` 模块 | 纯函数单测（嵌套、隐藏节点仍参与匹配、最长前缀）；`@soybeanjs/headless/shell` 子路径 + barrel/catalog 生成 |
|  3  | `SLayoutShell`（`vertical` + `horizontal`）                                     | ui 复合               | 复用 LayoutCompact/Placeholder；受控 `mode`/`isMobile`/`open`；零新增 ARIA；recipe 走 `scv()`              |
|  4  | `SShellMenu`（两模式）                                                          | ui 复合               | 消费 `useShellNav` 输出；侧栏折叠联动；顶栏挂载点渲染；键盘语义由菜单族保证                                |
|  5  | `SPageHeader`                                                                   | ui 单类/少槽复合      | 标题/描述/面包屑插槽/返回事件/操作区；同步从 [roadmap.md](./roadmap.md) 「延后市场」表移除 PageHeader 行   |

每个组件按 skill 流程交付：headless 单测 → ui 包装 → playground → docs 示例（en/zh）→ browser e2e（Tier 1）→ `gen catalog/api`。

## 6. P1 — 完整模式与页签（5 项）

|  #  | 交付物                                                                         | 说明                                                                                                |
| :-: | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
|  6  | 其余 4 模式：`vertical-mix` / `vertical-hybrid` / `top-sidebar` / `top-header` | 一二级拆分（`splitNavLevels`）、侧栏/顶栏双挂载点、折叠态保持；Tier 2 shell 冒烟 e2e                |
|  7  | `useTabs` + 与 `SPageTabs` 的接线示例                                          | 库内纯状态 + 文档站 router 适配示例（开/关/固定/affix/keep-alive）                                  |
|  8  | 面包屑派生落地                                                                 | `activeTrail` → `SBreadcrumb`；深层级溢出接 `SDropdownMenu` 的示例                                  |
|  9  | `SLogo`                                                                        | 图标/标题/仅图标折叠态                                                                              |
| 10  | Compact 下沉评估（§3.2 条款）                                                  | 达标则在 headless `layout` 家族新增 `LayoutShellCompact`，ui 包装变薄；不达标保留 UI 复合并记录原因 |

## 7. P2 与范围外

### 7.1 P2 配方（2 项）

11. **命令面板配方**——`SDialog` + `SCommand`（fuzzy 已内置）组合，数据源即 `useShellNav().flatMap`；先以 docs 示例交付，出现稳定默认内容再评估收录为 `SCommandPalette`。
12. **主题抽屉配方**——`SDrawer` + `SThemeCustomizer` 的文档示例，不新增导出。

### 7.2 延后至 sbean 组件市场（源码分发）

- 完整后台启动模板（壳 + router tabs 适配 + 菜单数据转换 + 主题初始化）以 **sbean 源码配方**分发，不进 npm 包；
- 与业务数据耦合的壳变体（标签页右键菜单策略、多标签缓存策略等）。

### 7.3 范围外

- `SProTable` / `SProForm`：跟随 v0.50 引擎结论与 table/form 提案；
- `SPermissionButton` / 权限指令：业务语义，应由宿主鉴权层实现；
- 通知中心、全局搜索后端、水印业务封装等应用级功能（`SWatermark` 等原子已在核心库）。

## 8. 旧 → 新迁移映射

| 旧 admin 分支（已删除）        | 新归属                        | 形态                                        |
| :----------------------------- | :---------------------------- | :------------------------------------------ |
| `SAppLayout`                   | `SLayoutShell`                | ui 复合（P1 评估下沉 `LayoutShellCompact`） |
| `SAppMenu`                     | `SShellMenu`                  | ui 复合                                     |
| `SAppLogo`                     | `SLogo`                       | ui 复合                                     |
| `SAppBreadcrumb`               | `SBreadcrumb` + `activeTrail` | 既有组件 + 数据接线                         |
| `SAppPageHeader`               | `SPageHeader`                 | ui 复合（P0）                               |
| `SAppFooter`                   | `SLayoutFooter`               | 既有插槽                                    |
| `SAppMultiTab`                 | `SPageTabs` + `useTabs`       | 既有原语 + headless 状态 + 适配示例         |
| `SAppCommandPalette`           | 命令面板配方（P2）            | docs 示例，待定是否收录                     |
| `SAppThemeDrawer`              | 主题抽屉配方（P2）            | docs 示例                                   |
| `SAppSplitPanel`               | `SSplitter`                   | 已有                                        |
| `SAppEmptyState`               | `SEmpty`                      | 已有                                        |
| `SAppResult`                   | `SResult`                     | 已在 roadmap.md P1                          |
| `SAppPermissionButton`         | —                             | 范围外                                      |
| `SAppProTable` / `SAppProForm` | —                             | 另见 v0.50 + table/form 提案                |

## 9. 实施顺序与里程碑

> 只定依赖顺序，不预设发布月份（历史路线图因绑死日期迅速过期）。建议排在 [v0.50.0.md](./v0.50.0.md) 重构窗口之后启动。

- **M1（headless 先行）**：H1 `useMediaQuery` → H2 导航模型与纯函数（先纯函数单测驱动）→ H3 `useTabs`；子路径 `@soybeanjs/headless/shell` 打通 + catalog/namespaced 生成。
- **M2（P0 组件）**：`SLayoutShell`（2 模式）→ `SShellMenu` → `SPageHeader`；playground + 双语 docs + Tier 1 e2e。
- **M3（P1 收口）**：4 个混合模式 + router tabs 示例 + 面包屑/Logo；Tier 2 shell 冒烟；Compact 下沉评估结论。
- **M4（配方）**：命令面板、主题抽屉示例；sbean 壳配方登记。

## 10. 决策记录

| ID  | 决策                                                                                                                                                                                                                         |
| :-- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | 不新增包；壳逻辑放 headless `src/shell/` 域模块（`./shell` 子路径），组件在 ui，统一 `S` 前缀                                                                                                                                |
| S2  | 不使用 `App*` / `App.*` 命名；采用 `SLayoutShell` 等核心词汇与 `Shell.*` 类型空间                                                                                                                                            |
| S3  | 6 模式词汇沿用 admin 分支已验证成果；P0 只交付 2 主模式，契约先行                                                                                                                                                            |
| S4  | 导航模型路由无关（`ShellNavNode` + href/key），vue-router 仅出现在文档适配示例                                                                                                                                               |
| S5  | 响应式由通用 `useMediaQuery` 承担，`isMobile` 可受控；SSR 桌面态回退                                                                                                                                                         |
| S6  | `useTabs` 只管标签集合状态；keep-alive/路由同步属宿主适配层                                                                                                                                                                  |
| S7  | ProTable/ProForm/权限按钮不搭车，分别由 v0.50 与各提案决策、或列范围外                                                                                                                                                       |
| S8  | **修订（§11）**：四个 ui 复合组件合并为一个聚合组件 `SAppShell`；命名例外采用 `App*`（`SAppShell`、`app-shell`），不再新增 `SLayoutShell` / `SShellMenu` / `SPageHeader` / `SLogo`                                           |
| S9  | **修订（§11）**：AppShell 仅落 UI 层，H1–H3 headless 准入项本期不实现；`isMobile` 只受控、面包屑与页签为纯数据输入                                                                                                           |
| S10 | **修订（§11）**：模式词汇直接继承 `SplitNavMode`（4 值逐字复用）+ 两个单面板模式 `sidebar` / `top`；`AppShellMode ⊇ SplitNavMode`                                                                                            |
| S11 | **修订（§11.4）**：单面板模式归属 `SAppShell`，不并入 `SSplitNav`；两个模式名固定为 `sidebar` / `top`（评估过 `tree` / `nav` 与 `vertical` / `horizontal`）；`SSplitNav` 保留 4 个分栏模式与原名，改名属破坏性变更，本次不做 |

> ADR 状态：[ADR-0001 外围包单包分层](./adr/0001-peripheral-package-layering.md) 对 admin 域同样标记为 superseded；若未来出现真正独立的领域包提案，须新立 ADR 而非复用该模型。

## 11. 交付记录：AppShell（2026-09 修订）

§3–§9 的原始规划（headless shell 域模块 + 四个 ui 复合组件）在实施前被收窄为**一个 UI 层聚合组件**。本节记录实际交付与偏差依据。

### 11.1 实际交付

| 交付物             | 位置                                                                                                                                                                                   | 形态                                                                  |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `SAppShell`        | `packages/ui/src/components/app-shell/`（`app-shell.vue` + 内部 `app-shell-menu.vue` + `shared.ts` + `types.ts`）                                                                      | UI 层聚合组件，模式驱动布局骨架 + 菜单渲染器                          |
| 样式配方           | `packages/ui/src/styles/app-shell.ts`                                                                                                                                                  | `scv()`，含注入给 `layoutVariants` 的 `layout*` 槽位                  |
| 分栏面板度量       | `packages/ui/src/styles/split-nav.ts` 的 `splitNavPaneMetrics`                                                                                                                         | rail/tree rem 数值导出，供侧栏宽度推导；单测断言与配方字面量同步      |
| 示例 / 文档 / 测试 | `apps/docs/src/examples/ui/app-shell/`、`content/{en,zh}/ui/components/app-shell.md`、`test/specs/components/app-shell.spec.ts`、`test/browser/specs/components/app-shell.e2e.spec.ts` | 7 个示例、双语文档、20 项单测、7 项浏览器 e2e（含侧栏几何与传送落点） |

### 11.2 偏差与理由

| 原始规划                                                         | 实际做法                                                                 | 理由                                                                                                                |
| :--------------------------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| H1 `useMediaQuery`（headless）                                   | 不做；`isMobile` 只接受受控属性                                          | `packages/ui` 运行时依赖白名单（`sui check deps`）不含 `@vueuse/core`；`isMobile` 受控与 `SLayout` 既有契约一致     |
| H2 shell 导航模型 + `useShellNav`                                | 不做；菜单为 `items` 数据输入，面包屑为 `breadcrumbs` 数据输入           | 激活路径/裁剪/拆分属逻辑，未建 headless 模块；宿主可从路由推导，后续可无破坏性下沉                                  |
| H3 `useTabs`                                                     | 不做；`tabs` 数组 + `v-model:tabs` + `v-model:tab-value`                 | 页签集合状态（关闭/固定/affix）由宿主决定，`SPageTabs` 已内置固定与右键菜单                                         |
| `SLayoutShell` / `SShellMenu` / `SPageHeader` / `SLogo` 四个组件 | 合并为一个 `SAppShell`，品牌区改为插槽注入；不提供 `SPageHeader`         | 一次编排即可覆盖全部能力，拆分为四个组件会重复传递同一份模式与折叠状态；页头未纳入范围                              |
| 6 模式词汇（S3）                                                 | 采用，且 4 个分栏模式**逐字复用 `SplitNavMode`**；新增 `sidebar` / `top` | 用户在 `SSplitNav` 学到的 4 个值在外壳中语义一致；`vertical`/`horizontal` 会与 `SLayout.orientation` 的反向语义撞名 |
| P0 只交付 2 主模式（S3）                                         | 6 模式一次性交付                                                         | 4 个分栏模式只是 `SSplitNav` 的委托 + 挂载点/宽度推导，分阶段反而会发布「类型允许但运行时不支持」的假契约           |

### 11.3 新增模式映射

| `AppShellMode`             | 一级位置 | 渲染器      | `SLayout.orientation` | 侧栏宽度                      | 品牌区 | 菜单挂载                       |
| :------------------------- | :------- | :---------- | :-------------------- | :---------------------------- | :----- | :----------------------------- |
| `sidebar`                  | 侧栏     | `STreeMenu` | `horizontal`          | 布局默认（240 / 50）          | 侧栏   | 就地                           |
| `top`                      | 顶栏     | `SNavMenu`  | `vertical`            | 无侧栏                        | 顶栏   | 就地                           |
| `dual-vertical`            | 侧栏     | `SSplitNav` | `horizontal`          | rail + tree / rail + 折叠面板 | 侧栏   | 就地（`dual-vertical` 独立块） |
| `vertical-horizontal`      | 侧栏     | `SSplitNav` | `horizontal`          | rail（`offcanvas` 折叠）      | 顶栏   | 传送：纵向→侧栏、横向→顶栏     |
| `horizontal-vertical`      | 顶栏     | `SSplitNav` | `vertical`            | tree / 折叠面板               | 顶栏   | 传送：横向→顶栏、纵向→侧栏     |
| `horizontal-dual-vertical` | 顶栏     | `SSplitNav` | `vertical`            | rail + tree / rail + 折叠面板 | 顶栏   | 传送：横向→顶栏、纵向→侧栏     |

侧栏宽度按 `size` 从 `splitNavPaneMetrics` 反推像素入参（`rem * 16 / themeSizeRatio[size]`），并由外壳统一注入的 `pxToRem` 换算回原 rem，从而与菜单面板逐像素对齐；浏览器 e2e 断言 `rail + tree === sidebar`。

### 11.4 决策：单面板模式不并入 SplitNav（S11）

评审时提出过一个替代方案：把 `sidebar` / `top` 也实现进 `SSplitNav`，让一个组件承载 6 种形态（并把它们命名为 `vertical` / `horizontal`），`mode` 词汇全库统一。**结论是维持现状**，理由如下。

1. **事件语义不同，不能共用一套状态机。** `SplitNavRoot` 的四个分栏模式共享 `openPath` + `firstLevelItems`/`childItems` 切片 + rail 注册表 + panes 焦点回退，并有一条硬语义：点有可见子节点的父级只展开面板并 `emit('open')`，不写 `modelValue`。`sidebar`（单棵嵌套树）里点父级应由 `TreeMenuCompact` 就地展开、不发 `open`；`top`（单条弹出菜单）连 `openPath` / rail 都不存在，`verticalMountedId` / `horizontalMountedId` / `collapsed` / `collapsedWidth` 全数失效。并入即意味着按模式分叉事件语义与"部分 prop 失效"的文档负担。
2. **两个模式是既有能力的别名。** `sidebar` ≈ `STreeMenu` 固定默认值，`top` ≈ `SNavMenu`；不新增任何能力，却让库内出现两条通往同一 DOM 契约的入口。而"单一 mode 词汇"的需求来自 `SAppShell` 只有一个 `mode` prop——需求属于 shell。
3. **命名会二次撞车。** `vertical` / `horizontal` 已是共享类型 `DataOrientation` 的字面量，且 `SLayout.orientation` 的 `horizontal`（侧栏满高）与"顶栏横向菜单"含义相反；同名不同义会把 AppShell 文档注意事项 1 的坑复制到菜单组件。`sidebar` / `top` 描述落点，无歧义。
4. **改名是破坏性变更而收益纯属命名。** `SSplitNav` 已随 0.40.1 发布，波及约 40 个手写文件（headless 家族 12 + ui 包装/配方 + 双语文档 + 迁移指南 + 7 个示例 + 2 个测试 + AppShell 三处）与生成物，并按 `process.md` 需要 `breaking` 说明与 en/zh 升级指南。

**若未来重新评估**：只有当 `SSplitNav` 的产品定位升级为"可独立分发的六形态后台导航组件"（而非 `SAppShell` 的零件）时，吸收单面板形态才值回成本；届时应同时选定中性名（避免 `AppMenu` 这类与 `SMenu` / `SNavMenu` / `SMenubar` / `STreeMenu` 家族无区分度的名字），并单独走破坏性变更流程。

### 11.5 交付后修复（2026-09-15）

评审发现三个问题，均已修复并补测试。

1. **布局根的裸 `group` 泄漏（跨组件）**：`layoutVariants` 的 root 是裸 `group` 且带 `data-orientation` / `data-state` / `data-variant`，而 CSS 的 `group-data-*` 是"任意匹配祖先"而非"最近祖先"，因此布局内部任何组件的裸 `group-data-[orientation=…]` 都会被布局根匹配。后果：`top` 模式下 `SNavMenu` 的列表被翻成纵向列（本次报告的问题 2），`horizontal-*` 模式的横向面板同样中招，侧栏折叠时 `data-state=collapsed` 还会污染内层树菜单的折叠样式。修复：布局根改为命名组 `group/layout`，并把 `layout.ts` 中 55 处 `group-data-…` 全部限定为 `group-data-…/layout`。这是**跨组件修复**（不改任何 API），受影响的其它族无需改动；未做的是反向清理——其它配方里仍有裸 `group-data-`，只要不再有"带同名 data 属性的通用祖先"就不会再撞。
2. **面包屑改为由菜单数据推导**：省略 `breadcrumbs` 时，外壳用 `items` + 激活值推导"根 → 激活菜单"的路径；其中每个自身有子菜单的上级渲染为下拉触发器，下拉项即该上级的子菜单（也就包含了激活项的同级），选中效果与点菜单一致（叶子发 `select` / `update:modelValue`，父级发 `open`）。显式传 `breadcrumbs` 仍是纯数据渲染，`#breadcrumb` 插槽可完全接管。实现落在 `app-shell/shared.ts` 的纯函数 `findMenuTrail` / `findMenuItem` / `hasVisibleChild`（`ui` 层，不新增 headless 模块）。
3. **分栏模式的侧栏宽度改为跟随面板**：原先按 mode+size 静态推导（`rail + tree` 恒定），导致激活无子菜单的一级菜单时仍保留一列空面板。现在 `resolveShellWidths` 按"面板当前是否存在"推导：`dual-vertical` / `horizontal-dual-vertical` 有子菜单时 `rail + tree`、否则仅 `rail`；`horizontal-vertical` 有内容时为 `tree`、否则为 `0`。侧栏折叠时只保留轨道，嵌套面板脱离文档流以浮层贴在轨道外侧（`ui.menuOverlay` + `menu-region data-overlay`），因此折叠状态下点另一个有子菜单的一级菜单仍能看到面板——与参考实现 `soybean-admin/src/layouts/modules/global-menu/modules/vertical-mix-menu.vue` 的 `hasChildMenus` 行为一致。代价：外壳需要镜像 `SSplitNav` 的 `openPath`（其内部状态），只镜像"面板归属的一级菜单 key"，并在 `modelValue` 变化时按 `SSplitNav` 自身的重置规则清空。

### 11.6 遗留项（未纳入本次交付）

1. **Compact 下沉评估**（§3.2 条款）：外壳的模式矩阵已是稳定数据表（`appShellSkeletons`），但默认内容仍由插槽注入，暂不满足下沉条件；如后续演化出数据驱动的默认内容，按既有规则只扩 `layout` 家族。
2. **H1–H3 的后续下沉**：三个 headless 准入项仍可按原规划实现，且能在不改动 `SAppShell` 公共 API 的前提下接管 `isMobile`、面包屑派生与页签集合状态。
3. **sbean 注册表登记**：`SAppShell` 未加入 `packages/cli/registry.json`（手工清单，83 条目）。外壳的源码分发需先定清 `registryDependencies`（layout / menu / split-nav / tree-menu / nav-menu / page-tabs / breadcrumb 等），否则 `sbean add` 会缺件；按 §7.2 在 sbean 组件市场配方阶段处理。
4. **上游组件发现（本次未修，属其他族）**：
   - `SPageTabs` 选中项为 `text-primary` on `bg-primary-50`，默认 indigo 调色板下对比度 3.99:1，低于 WCAG AA 4.5:1。
   - `SPageTabs` 关闭页签 / 切换 `pinned`（`usePageTabsState` 的 `removeTab` / `pinTab`）直接修改传入的 `items` 数组，不触发 `update:items`；只有 `removeTabs` / `sortTabs` 的赋值路径才 emit。
   - headless `layout` 的侧栏区域没有地标角色（`<main>`/`<header>` 有），因此侧栏插槽内容不被任何地标包含，axe `region` 规则会报错。
   - `SSplitNav` 的折叠面板宽度用固定 `px / 16`（`useSplitNavTreePane`），而嵌套 `STreeMenu` 的折叠宽度按 `size` 缩放，`size` 非 `md` 时面板会裁剪内部轨道。
