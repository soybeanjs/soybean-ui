# 导航菜单

> **⚠️ 已废弃:** `NavigationMenu` 已被 [`NavMenu`](/components/nav-menu) 取代,后者是唯一准入的导航菜单家族。该家族已冻结——不再新增槽位、特性或 prop,仅修复关键缺陷——并将在 **v1.0** 移除。新代码请使用 `SNavMenu`;存量代码可参照下方[迁移到 NavMenu](#迁移到-navmenu) 立即迁移。

## 概述

NavigationMenu 用于构建站点级的水平或垂直导航，支持任意层级的子菜单、悬停 / 点击双触发、方向键键盘导航，以及随激活项平滑移动的指示器与视口。

`SNavigationMenu` 是数据驱动的聚合组件：传入 `items` 数组即可渲染完整的 `nav > ul > li` 结构、子菜单浮层、指示器与定位视口。逻辑与无障碍语义由 headless `NavigationMenuCompact` 承载，样式通过 `scv()` 配方注入。

> `SNavigationMenu` 把全部结构组合委托给 headless `NavigationMenuCompact`。无样式的数据驱动用法可导入 `@soybeanjs/headless/navigation-menu`。

## 功能特性

- **数据驱动组合** — 传 `items`（`NavigationMenuOptionData`）即可渲染导航；任意项可通过 `children` 声明子菜单，子项支持 `label` / `description` / `icon` / `href` / `to` / `disabled`。
- **点击 / 悬停双触发** — 默认鼠标悬停打开、点击切换；`disableClickTrigger` / `disableHoverTrigger` 可单独关闭某一种触发方式。
- **延迟与防抖** — `delayDuration`（默认 `200`ms）控制悬停打开延迟；项间切换有 150ms 宽限；`skipDelayDuration` 与 `disablePointerLeaveClose` 调节关闭行为。
- **子菜单浮层** — 子项渲染在定位视口中，支持移动方向动画（`from-start` / `from-end` 等）、箭头指示器与 `unmountOnHide` 控制卸载时机。
- **键盘导航** — 方向键在导航项间移动焦点（Roving Focus）；`Enter` / `Space` 激活链接或切换子菜单；子菜单打开后按入口方向键（横向 `ArrowDown`、纵向 `ArrowRight`）将焦点送入内容；`Escape` 关闭并归还焦点。
- **指示器与视口定位** — `NavigationMenuIndicator` 随激活项滑动，视口以激活触发器（或根节点）为参照定位，支持 `align` 对齐并在视口边缘自动钳制。
- **受控 / 非受控** — 提供 `modelValue` 时高亮跟随 prop 并触发 `update:modelValue`；否则使用 `defaultValue` 做非受控初始值。
- **双向方向** — `orientation` 支持水平 / 垂直；`dir` 支持 LTR / RTL，定位与动画均按逻辑方向处理。
- **逐项与全局链接属性** — 目标地址（`href` / `to`）、`target`、`external` 由每个项持有；`linkProps` 仅透传其余链接属性（例如全局 `disabled` 兜底，显式项值始终优先）。
- **禁用项** — 禁用链接渲染 `aria-disabled="true"`、`tabindex="-1"` 并阻断交互；禁用触发器不会打开子菜单。
- **六种尺寸** — `size`（xs…2xl）变体覆盖视口、列表、触发器、链接、子项与指示器的间距与字号。
- **19 个 UI 槽位** — `root` / `item` / `trigger` / `content` / `link` / `subLink` / `indicator` / `viewport` / `arrow` 等槽位均可通过 `ui` prop 逐一定制。
- **Headless 组合** — `NavigationMenuRoot` / `List` / `Item` / `Trigger` / `Content` / `Link` / `Indicator` / `Viewport` 及 `Compact` 系列均可从 `@soybeanjs/headless/navigation-menu` 导出。

## 用法

<UsageCode component="navigation-menu" />

## 演示

<PlaygroundGallery component="navigation-menu" />

## API

<ComponentApi component="navigation-menu" />

## 迁移到 NavMenu

[`NavMenu`](/components/nav-menu) 建模同一个领域——站点级导航、悬停 / 点击双触发、键盘导航、定位视口、数据驱动 `items` API——但直接构建在单个共享 Popper 表面上:整个 viewport 就是单个 `PopperPositioner`,其 reference 动态切换到激活触发器,悬停时序运行在单个共享状态机上。Root props 高度同构(`modelValue` / `defaultValue`、`orientation`、`dir`、`delayDuration`、`skipDelayDuration`、`disableClickTrigger`、`disableHoverTrigger`、`disablePointerLeaveClose`)。

### 组件映射

| NavigationMenu(已废弃)                                                               | NavMenu                                   |
| :----------------------------------------------------------------------------------- | :---------------------------------------- |
| `SNavigationMenu` / `NavigationMenuCompact`                                          | `SNavMenu` / `NavMenuCompact`             |
| `NavigationMenuRoot` / `List` / `Item` / `Trigger` / `Content` / `Link` / `Viewport` | 同名,前缀改为 `NavMenu`                   |
| `NavigationMenuSubList`                                                              | `NavMenuSubTrigger` + `NavMenuSubContent` |
| `NavigationMenuIndicator`                                                            | —(共享 viewport 自带 `PopperArrow`)       |
| `provideNavigationMenuUi`                                                            | `provideNavMenuUi`                        |

### 类型映射

所有导出的 `NavigationMenu*` 类型都有同后缀的 `NavMenu*` 对应物:`NavigationMenuRootProps` → `NavMenuRootProps`、`NavigationMenuOptionData` → `NavMenuOptionData`、`NavigationMenuUiSlot` → `NavMenuUiSlot`,以此类推。

### 行为差异

- **子菜单表面** — `NavigationMenu` 把子项渲染在指示器 + 视口组合内;`NavMenu` 在项的触发器旁打开嵌套浮层(`NavMenuSubTrigger` / `NavMenuSubContent`),`NavMenuViewport` 与 `NavMenuSubContent` 均支持 `sideOffset`。
- **指示器** — `NavMenu` 没有独立的指示器原语;箭头位于共享 viewport 上,跟随激活触发器。
- **挂载控制** — `NavigationMenuRoot` 暴露 `unmountOnHide`;`NavMenu` 改为在内容原语上支持 `forceMount`。
- **UI 槽位** — 槽位集合不同(`NavigationMenuUiSlot` 声明 19 个槽位,`NavMenuUiSlot` 20 个,新增 `subTrigger` / `subContent` / `positioner` 等);`class`、`size` 与 `ui` prop 含义不变。

## 备注

### 架构与行业对标

| 能力                 | SoybeanUI                                                             | Ant Design `Menu`  | Element Plus `Menu`          | Radix `NavigationMenu`         |
| :------------------- | :-------------------------------------------------------------------- | :----------------- | :--------------------------- | :----------------------------- |
| headless/styled 分离 | ✅ `@soybeanjs/headless/navigation-menu` + `scv()`                    | ❌ 单包            | ❌ 单包                      | ✅ `@radix-ui/navigation-menu` |
| 数据驱动 compact API | ✅ 泛型 `NavigationMenuCompact` + 嵌套 `items`                        | ✅ `items`         | ✅ `default-active` 数据模型 | ❌ 面向 JSX 组合               |
| 触发方式             | ✅ 悬停 / 点击双触发，可分别禁用                                      | ✅ 点击 + 悬停展开 | ✅ 点击 + 悬停展开           | ✅ 悬停 + 点击（可配置）       |
| 延迟控制             | ✅ `delayDuration` / `skipDelayDuration` / `disablePointerLeaveClose` | —                  | —                            | ✅ `delayDuration` 等          |
| 子菜单层级           | ✅ 任意嵌套                                                           | ✅ 任意嵌套        | ✅ 二级                      | ✅ 嵌套                        |
| 键盘导航             | ✅ Roving Focus + 入口方向键 + Escape                                 | ✅                 | ✅                           | ✅                             |
| 指示器               | ✅ 随激活项滑动 + 箭头                                                | ✅                 | ❌                           | ✅                             |
| 定位视口             | ✅ 参照触发器 / 根节点 + 边缘钳制 + `align`                           | —                  | —                            | ✅                             |
| 禁用项               | ✅ 逐项 + `linkProps` 兜底                                            | ✅ `disabled`      | ✅ `disabled`                | ✅ `disabled`                  |
| 自定义链接属性       | ✅ `linkProps` / `triggerProps` / `contentProps` 等按元素转发         | —                  | —                            | —                              |
| 方向                 | ✅ 水平 / 垂直 + LTR / RTL                                            | ✅ 水平 / 垂直     | ✅ 水平 / 垂直 + RTL         | ✅ 水平 / 垂直 + RTL           |
| 尺寸变体             | ✅ `size` xs…2xl                                                      | ✅ `size`          | —                            | —                              |
| 受控模式             | ✅ `modelValue` / `defaultValue`                                      | ✅ `selectedKeys`  | ✅ `default-active`          | ✅ `value` / `onValueChange`   |

### 运行时注意事项

1. **悬停延迟** — 子菜单默认在悬停 `delayDuration` 后打开；在不同触发器间快速移动时存在 150ms 宽限。若希望悬停即开，把 `delayDuration` 调小或使用点击触发。
2. **点击与悬停互斥** — 指针移动打开的子菜单会忽略随后的 click（`hasPointerMoveOpenedRef` 守卫），避免“移动时误关闭”。需要纯点击体验时设置 `disableHoverTrigger: true`。
3. **受控 / 非受控** — 提供 `modelValue` 时，内部写入仅触发 `update:modelValue`；高亮完全跟随 prop，外部改值即可切换打开项。
4. **卸载与动画** — `unmountOnHide`（默认 `true`）在关闭后卸载内容；视口播放退出动画期间，最后一个激活内容仍保持挂载，动画结束后统一移除。
5. **带链接的触发器** — 父项同时提供 `href` / `to` 与 `children` 时，触发器渲染为链接（`as-child`）。点击已打开的此类触发器会先由链接触发关闭（dismiss），随后触发器不再重新打开，行为为“再次点击关闭”。
6. **定位依赖测量** — 视口与指示器通过 `getBoundingClientRect` 计算位置并写入 CSS 变量；容器尺寸或滚动变化时会自动重测。若视口出现在错误位置，请检查是否在动画容器或 `transform` 祖先内渲染。
7. **禁用项** — 禁用链接完全惰性：`aria-disabled="true"`、`tabindex="-1"`，点击与键盘激活均被阻断；禁用触发器（`disabled: true` 的父项）同样不会展开子菜单。

## 常见问题

### 如何只保留点击触发？

设置 `disableHoverTrigger: true`，悬停将不再打开子菜单；同时可保留 `disableClickTrigger` 默认的 `false`。若希望点击完全不打开而仅悬停，则设置 `disableClickTrigger: true`。

### 如何精确控制打开的菜单项？

使用 `v-model` 绑定 `modelValue`。菜单项的 `value` 会成为受控值，切换即触发 `update:modelValue`；外部改值会同步高亮。未受控时用 `defaultValue` 指定初始打开的项。

### 父项能同时是链接又带子菜单吗？

可以——给项同时设置 `href` / `to` 与 `children`。此时触发器渲染为链接：子菜单关闭时点击进入目标页，打开时点击会先关闭菜单。若希望父项只展开不导航，省略 `href` / `to` 即可。

### 如何自定义子菜单宽度或整体样式？

`SNavigationMenu` 支持 `class`（根节点）与 `ui`（19 个槽位的类覆盖）。例如 `:ui="{ subLink: 'w-60' }"` 可固定子链接宽度，`:ui="{ root: 'z-10' }"` 调整浮层层级。

### 键盘如何操作？

`Tab` 聚焦导航项后，方向键在项间移动；`Enter` / `Space` 激活链接或切换子菜单；子菜单打开后按入口方向键进入内容、`Escape` 关闭并归还焦点到触发器。禁用项不在 Tab 顺序中。

### 为什么点击已打开的菜单项是关闭而不是导航？

当父项同时是链接与触发器时，链接的 `select` 流程会先发出 dismiss 关闭菜单，随后触发器识别到本次点击已关闭菜单而不再重开。这是刻意设计——再次点击同一触发器即“收起”菜单；导航请在子菜单关闭时通过链接完成。
