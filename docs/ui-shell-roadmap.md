# SoybeanUI 中后台壳组件路线图（ui-shell-roadmap）

> 状态：**Accepted · 2026-09**
> 适用仓库：`@soybeanjs/headless` + `@soybeanjs/ui`（核心两层，不新增任何包）
> 规范约束：组件开发 skill（[.agents/skills/soybean-ui-develop/](../.agents/skills/soybean-ui-develop/SKILL.md)），尤其是 [layers.md Headless admission（R1–R8）](../.agents/skills/soybean-ui-develop/layers.md#headless-admission)
> 关联文档：[ui-ai-roadmap.md](./ui-ai-roadmap.md)（AI 域同款决策）· [v0.50.0.md](./v0.50.0.md)（table/form 引擎重构）· [components.md](./components.md)（原子组件评估）

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
| 空态/结果    | `SEmpty`；`SResult` 在 [components.md](./components.md) P1 计划中                                                                                                                                                                                                                                                                                   | `SAppEmptyState`、`SAppResult`                 |
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

- 页脚 → `SLayoutFooter` 插槽；分栏 → `SSplitter`；空态 → `SEmpty`；结果页 → 已在 [components.md](./components.md) P1 的 `SResult`。
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

|  #  | 交付物                                                                          | 层                    | 验收要点                                                                                                       |
| :-: | :------------------------------------------------------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------- |
|  1  | `useMediaQuery`                                                                 | headless composable   | 单测覆盖订阅/清理/SSR 回退；从 `./composables` 导出                                                            |
|  2  | shell 导航模型 + `useShellNav`（`ShellNavNode`、裁剪、激活匹配、`activeTrail`） | headless `shell` 模块 | 纯函数单测（嵌套、隐藏节点仍参与匹配、最长前缀）；`@soybeanjs/headless/shell` 子路径 + barrel/catalog 生成     |
|  3  | `SLayoutShell`（`vertical` + `horizontal`）                                     | ui 复合               | 复用 LayoutCompact/Placeholder；受控 `mode`/`isMobile`/`open`；零新增 ARIA；recipe 走 `scv()`                  |
|  4  | `SShellMenu`（两模式）                                                          | ui 复合               | 消费 `useShellNav` 输出；侧栏折叠联动；顶栏挂载点渲染；键盘语义由菜单族保证                                    |
|  5  | `SPageHeader`                                                                   | ui 单类/少槽复合      | 标题/描述/面包屑插槽/返回事件/操作区；同步从 [components.md](./components.md) 「延后市场」表移除 PageHeader 行 |

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
| `SAppResult`                   | `SResult`                     | 已在 components.md P1                       |
| `SAppPermissionButton`         | —                             | 范围外                                      |
| `SAppProTable` / `SAppProForm` | —                             | 另见 v0.50 + table/form 提案                |

## 9. 实施顺序与里程碑

> 只定依赖顺序，不预设发布月份（历史路线图因绑死日期迅速过期）。建议排在 [v0.50.0.md](./v0.50.0.md) 重构窗口之后启动。

- **M1（headless 先行）**：H1 `useMediaQuery` → H2 导航模型与纯函数（先纯函数单测驱动）→ H3 `useTabs`；子路径 `@soybeanjs/headless/shell` 打通 + catalog/namespaced 生成。
- **M2（P0 组件）**：`SLayoutShell`（2 模式）→ `SShellMenu` → `SPageHeader`；playground + 双语 docs + Tier 1 e2e。
- **M3（P1 收口）**：4 个混合模式 + router tabs 示例 + 面包屑/Logo；Tier 2 shell 冒烟；Compact 下沉评估结论。
- **M4（配方）**：命令面板、主题抽屉示例；sbean 壳配方登记。

## 10. 决策记录

| ID  | 决策                                                                                          |
| :-- | :-------------------------------------------------------------------------------------------- |
| S1  | 不新增包；壳逻辑放 headless `src/shell/` 域模块（`./shell` 子路径），组件在 ui，统一 `S` 前缀 |
| S2  | 不使用 `App*` / `App.*` 命名；采用 `SLayoutShell` 等核心词汇与 `Shell.*` 类型空间             |
| S3  | 6 模式词汇沿用 admin 分支已验证成果；P0 只交付 2 主模式，契约先行                             |
| S4  | 导航模型路由无关（`ShellNavNode` + href/key），vue-router 仅出现在文档适配示例                |
| S5  | 响应式由通用 `useMediaQuery` 承担，`isMobile` 可受控；SSR 桌面态回退                          |
| S6  | `useTabs` 只管标签集合状态；keep-alive/路由同步属宿主适配层                                   |
| S7  | ProTable/ProForm/权限按钮不搭车，分别由 v0.50 与各提案决策、或列范围外                        |

> ADR 状态：[ADR-0001 外围包单包分层](./adr/0001-peripheral-package-layering.md) 对 admin 域同样标记为 superseded；若未来出现真正独立的领域包提案，须新立 ADR 而非复用该模型。
