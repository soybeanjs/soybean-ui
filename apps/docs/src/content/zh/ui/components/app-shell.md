---
head:
  title: AppShell
  description: '中后台应用外壳聚合组件，通过属性与插槽组装布局区域、菜单、面包屑、页签、品牌区与页脚。'
---

# AppShell

## Overview

`SAppShell` 是中后台应用的外壳聚合组件。一个 `mode`、一份菜单树，加上少量属性，就能组装出完整外壳：布局区域（侧栏、顶栏、页签、内容、页脚），以及填充这些区域的一切——导航、面包屑、页签、品牌区与页脚。

当应用需要在路由页面外用一层常驻外壳时使用它：侧栏或顶栏导航、顶栏面包屑、页签条、页脚，都不必自己连线。若组合方式不匹配，直接用底层组件（`SLayout`、`SSplitNav`、`STreeMenu`、`SNavMenu`、`SPageTabs`、`SBreadcrumb`）——「布局手写对照」示例展示了同一外壳的手写写法。

`SAppShell` 是 layout 族的聚合层，只负责底层组件无法负责的一件事：**模式骨架**——用哪种布局方向、哪个菜单渲染器、每个菜单面板挂到哪个区域、以及这些面板需要的侧栏宽度。其余全部留在各自归属的族里：`SLayout` 渲染区域，`SSplitNav` / `STreeMenu` / `SNavMenu` 渲染菜单，`SBreadcrumb` 与 `SPageTabs` 渲染各自的栏。

与 `SLayout` 一样，外壳与路由无关：菜单树、面包屑项、页签项都以数据传入，交互通过事件回传。路由、权限、页签集合与缓存策略都由宿主掌控，[示例](#demos) 给出了连线写法。

## Usage

<UsageCode component="app-shell" />

## Features

- 🧭 **六种模式** —— `sidebar`（侧栏嵌套菜单）、`top`（顶栏弹出菜单），以及 `SSplitNav` 的四个模式 `dual-vertical` / `vertical-horizontal` / `horizontal-vertical` / `horizontal-dual-vertical`，字面量原样转发。
- 📐 **侧栏跟随菜单变化** —— 含嵌套面板的模式只按"实际渲染出来的面板"计算侧栏宽度：一级菜单有子菜单时为 `轨道 + 树`，没有子菜单时只保留轨道。
- 🧩 **按模式选择渲染器** —— 同一份 `items` 树可喂给 `STreeMenu`、`SNavMenu` 或 `SSplitNav`；`menuProps` / `menuUi` 只转发给当前生效的渲染器。
- 🪆 **挂载点传送** —— 属于其他区域的面板（顶栏一级 + 侧栏树）会被挂载到外壳自有的挂载目标；id 由外壳生成，并通过 `menu` 插槽暴露。
- 🍞 **面包屑来自菜单数据** —— 顶栏面包屑由 `items` 与当前激活值推导：从根到激活菜单的路径，其中每个"自身有子菜单"的上级都会展开其子菜单的下拉；传入 `breadcrumbs` 则改为渲染你自己的数据。
- 📑 **页签与页脚** —— `tabs` 渲染在页签区，页脚为插槽；两者都支持各自的 props 与 `ui` 覆盖。
- 🗂️ **折叠时面板转为浮层** —— 侧栏折叠后只保留一级轨道；点击有子菜单的一级菜单时，嵌套面板贴着轨道浮出显示，不会撑宽布局。
- 🏷️ **品牌区为插槽** —— 外壳不渲染任何自带 logo：通过 `#logo` 注入标记、应用标题与副标题，插槽自带实时的 `collapsed` 状态与 `placement`。
- 📱 **移动端抽屉** —— `isMobile` 会把侧栏换成布局自带的对话框抽屉，复用同一份品牌区与菜单内容。
- 🎛️ **三层覆盖** —— `ui` 管外壳自身节点，`layoutUi` 管它代为着色的布局区域，`menuUi` 管菜单渲染器；每个区域同时提供插槽。
- ♿ **无障碍来自组合链** —— 键盘、焦点、ARIA、RTL 均由被组合的组件族承担，外壳只加结构与类名。

## Demos

<PlaygroundGallery component="app-shell" />

## API

<ComponentApi component="app-shell" />

## Notes

### 模式骨架

`mode` 决定布局方向、菜单渲染器与菜单面板的挂载位置。模式名描述的是**菜单形态**，不是布局方向——布局方向由「一级菜单是纵向还是横向」推导。

| `mode`                     | 一级位置 | 渲染器      | `layoutProps.orientation` | 品牌区 | 菜单面板                     |
| :------------------------- | :------- | :---------- | :------------------------ | :----- | :--------------------------- |
| `sidebar`                  | 侧栏     | `STreeMenu` | `horizontal`              | 侧栏   | 侧栏中一棵嵌套树             |
| `top`                      | 顶栏     | `SNavMenu`  | `vertical`                | 顶栏   | 顶栏一条弹出菜单             |
| `dual-vertical`            | 侧栏     | `SSplitNav` | `horizontal`              | 侧栏   | 侧栏内轨道 + 树并排          |
| `vertical-horizontal`      | 侧栏     | `SSplitNav` | `horizontal`              | 顶栏   | 轨道在侧栏，横向子导航在顶栏 |
| `horizontal-vertical`      | 顶栏     | `SSplitNav` | `vertical`                | 顶栏   | 顶栏一级条，树在侧栏         |
| `horizontal-dual-vertical` | 顶栏     | `SSplitNav` | `vertical`                | 顶栏   | 顶栏一级条，轨道 + 树在侧栏  |

方向列的规则：一级菜单在侧栏时，侧栏满高、顶栏从它右侧开始（`orientation="horizontal"`）；一级菜单在顶栏时，顶栏横跨整宽、侧栏压在它下方（`orientation="vertical"`）。这与 `SLayout` 原始的 prop 名称含义相反，请以本表为准，不要凭直觉猜。

嵌套面板只在"有内容可显示"时占位：`dual-vertical` 与 `horizontal-dual-vertical` 的侧栏在激活的一级菜单有子菜单时是"轨道 + 树"，否则只有轨道；`horizontal-vertical` 没有轨道，侧栏要么是树、要么完全不出现。侧栏折叠后面板脱离文档流、以浮层贴在轨道外侧，因此折叠状态下点击另一个有子菜单的一级菜单依然能看到它。

### 架构与同类对比

| 关注点        | SoybeanUI `SAppShell`                                                  | Ant Design Pro `ProLayout`         | Element Plus    | shadcn/ui        |
| :------------ | :--------------------------------------------------------------------- | :--------------------------------- | :-------------- | :--------------- |
| 分层          | headless `layout` 族之上的样式聚合层；`SLayout` 仍可单独使用           | 单一样式包                         | 单一样式包      | 复制即用块，非库 |
| 模式数量      | 6（`sidebar`、`top` + 4 种分栏形态），由单个 `mode` 驱动               | 6（`side`/`top`/`mix` 及顶栏变体） | —               | 1                |
| 菜单树        | 一份 `items` 树，按模式交给 `STreeMenu` / `SNavMenu` / `SSplitNav`     | 路由/属性                          | `el-menu` 配置  | 手写组合         |
| 侧栏几何      | 由 `mode` + `size` 推导，并与菜单面板对齐                              | 数值属性                           | 数值属性        | 手写 CSS         |
| 品牌区        | `#logo` 插槽（无默认渲染）                                             | `logo` / `title` 属性              | `el-aside` 内容 | 手写组合         |
| 面包屑 / 页签 | `breadcrumbs` / `tabs` 数据属性，交给 `SBreadcrumb` / `SPageTabs` 渲染 | `menu` 配置 + `PageContainer`      | 手写组合        | 手写组合         |
| 路由依赖      | 无——数据进、事件出                                                     | 默认依赖 Vue Router                | 无              | 无               |
| 覆盖能力      | `ui` / `layoutUi` / `menuUi` + 每区域插槽                              | `token` / 插槽                     | CSS 变量        | 改复制来的源码   |
| 无障碍        | 由被组合的 headless 组件族承担                                         | 包级实现                           | 包级实现        | 手动             |

### 注意事项

1. **品牌区完全由你实现。** 没有 `logo` / `title` 属性：应用标题属于 `#logo` 插槽内容。外壳只渲染区域，并交出 `collapsed` 与 `placement`，让注入的标记自行适配。
2. **`isMobile` 是声明式的。** 外壳从不读取 `matchMedia`，请传入 `@vueuse/core` 的 `useMediaQuery`（或服务端判断）。布局、抽屉、触发按钮都跟随该属性。
3. **侧栏宽度是推导值，不要随意覆盖。** `layoutProps.sidebarWidth` / `collapsedSidebarWidth` 的优先级高于推导值，但在分栏模式下既会导致侧栏与菜单面板失准，也会失去下面的动态行为。
4. **切换模式会重建菜单。** 不同模式渲染不同的菜单实例，因此面板的展开状态（保存在 `SSplitNav` / `STreeMenu` 内部）会在模式切换时回到激活路径。
5. **顶栏选中由链接驱动。** `SNavMenu` 的链接不回传带 key 的选中事件，因此 `top` 模式用条目上的 `selected` 标记当前项（由路由推导），`select` 仅由树类模式触发。
6. **页签集合会被就地修改。** `SPageTabs` 关闭页签、切换 `pinned` 时直接修改传入的 `tabs` 数组；`update:tabs` 只在批量操作（关闭其他/全部）与拖拽排序时触发。请保持集合为响应式（用深 `ref`，不要用 `shallowRef`），并监听 `tabClose` / `tabPin` 观察这两类动作。
7. **侧栏折叠时嵌套面板以浮层显示。** 此时侧栏只保留轨道宽度，面板带着布局的侧栏 z-index 贴在轨道外侧；它会一直保持打开，直到侧栏重新展开或激活菜单变化。若内容不能被遮挡（例如整屏画布），请只用展开态——保持侧栏展开、让面板占一列。
8. **侧栏内容不在任何地标内。** 布局的侧栏区域是普通元素，没有地标角色，因此环绕菜单注入的内容（品牌区、`sidebar-start`、`sidebar-end`）不在任何地标内。若要做无障碍审计，请自行包裹地标。

## FAQ

### 如何让面包屑与路由保持同步？

只要让 `v-model` 与路由保持同步，面包屑会自动跟随：它由 `items` 加激活值推导，路径、文案与下拉项都来自同一份菜单树。当路径需要与菜单不同（例如按权限裁剪、标题与菜单文案不一致）时，传入自己的 `breadcrumbs`，外壳就改为渲染这份数据。`breadcrumbClick` 报告的是面包屑条目的激活；而点击上级下拉里的菜单与点侧栏菜单效果一致——叶子发出 `select` / `update:modelValue`，父级发出 `open`。

### 为什么切换菜单时侧栏宽度会变？

因为嵌套面板只在"存在"时才属于侧栏。没有子菜单的一级菜单没有面板可显示，侧栏就回落到只有轨道；激活有子菜单的菜单时再变宽。覆盖 `layoutProps.sidebarWidth` 会得到固定宽度，同时失去这个行为。

### 怎么调整侧栏宽度？

`sidebar` 模式下设置 `layoutProps.sidebarWidth` / `collapsedSidebarWidth`。分栏模式下请保持默认：宽度由当前 `size` 的面板度量推导，覆盖会让侧栏与菜单错位。

### 为什么 `top` 模式不触发 `select`？

`SNavMenu` 渲染真实链接，其选中事件不携带菜单 key，顶栏预期通过 `href` 导航。请在匹配项上设置 `selected: true` 标记当前项（或用 `#menu` 插槽自行渲染 `SNavMenu`）。

### 如何在页签上方加页头或页脚？

`#header` 插槽替换顶栏中区（`#header-start` / `#header-end` 覆盖首尾区域），`#footer` 插槽填充页脚。若要在内容区内部加页面级页头，请在默认插槽里组合 `SCard` 或普通 header——外壳没有页面页头区域。

### 如何整体替换菜单？

使用 `#menu` 插槽。它替换的是菜单实例而非挂载目标：外壳仍渲染区域与传送目标，并把 `headerMountId` / `sidebarMountId` 传入插槽，供你自己的 `SSplitNav` 指向。
