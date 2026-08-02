# C24 `navigation-menu` 检查优化报告

> **组件编号：** C24
> **组件名称：** `navigation-menu` / `SNavigationMenu`
> **模式：** 多槽 + Compact（headless `NavigationMenuCompact` 聚合 Root + List + OptionCompact + Indicator + Viewport；`scv()` 配方 `navigationMenuVariants`，19 UI slots）
> **优先级：** P1
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-05

---

## 一、执行摘要

对 `SNavigationMenu` 完成全维度审计。组件架构清晰：headless 层拥有 13 个 SFC（Root / List / Item / Trigger / Content / ContentImpl / Link / Indicator / Viewport / SubList / OptionCompact / SubOptionCompact / ItemSlotCompact）+ `context.ts`（root 与 item 双 context，`useControllableState` 管理 modelValue）+ `shared.ts`（纯函数：视口/指示器定位、id 生成、槽位推导）。styled 层为 `scv()` 配方 + `size`（xs…2xl 6 变体），19 个 UI 槽位与 headless `NavigationMenuUiSlot` 逐一对应。

发现并修复 5 项问题：

1. **Blocker (D1-12 / D1-16)**：带链接的触发器（`as-child`）在菜单已打开时点击无法关闭——内层链接先 dispatch dismiss 关闭菜单，随后 trigger 的 `onClick` 读到 `open=false` 又把菜单重新打开（`onItemSelect(value)`）。核心交互“再次点击收起”失效。
2. **Major (D4)**：`linkProps` 类型为 `NavigationMenuLinkProps`，要求必填 `href`，但 `href` 恒由项的 `href` 决定——API 类型不诚实，且阻止 `linkProps={{ disabled: true }}` 合法用法。修正为 `Omit<NavigationMenuLinkProps, 'href'>`（`NavigationMenuSubOptionCompactProps` 与 `NavigationMenuOptionCompactProps` 两处）。
3. **Major (D3)**：两个 Compact SFC 的 `linkProps` computed 中 `...props.linkProps` 展开后显式绑定 `item.disabled` / `item.target` 等，`undefined` 会覆盖全局配置——`linkProps.disabled` / `linkProps.target` 被静默吞掉。
4. **Major (D7-05)**：测试仅含 8 项纯函数定位测试，缺组件渲染 / 交互 / 禁用 / linkProps 兜底 / a11y 覆盖。
5. **Major (D6)**：中英文档仅有 Overview(1 句)/Usage/Demos/API，缺 Features、Notes（架构对标 + 运行时注意事项）、FAQ 章节。

测试从 8 项扩展到 18 项（新增渲染结构、class/orientation、linkProps.disabled 兜底 + item 优先、linkProps.target 兜底 + item 优先、禁用惰性、打开/关闭切换、update:modelValue、axe ×2）。

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                |
| :---------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 数据驱动嵌套 items、点击/悬停双触发（可分别禁用）、延迟防抖（delayDuration / skipDelayDuration / disablePointerLeaveClose）、受控/非受控、水平/垂直 + LTR/RTL、键盘 Roving Focus + 入口方向键 + Escape、指示器/视口定位与边缘钳制全部就位；**修复 as-child 触发器“再次点击收起”失效**（Blocker）    |
| D2 行业对标 |  ✅  | 悬停/点击双触发 + 延迟控制与 Radix NavigationMenu 对齐；任意嵌套 + 指示器 + 定位视口 + `linkProps` 按元素转发 + 6 尺寸为差异化增强；键盘导航（Roving Focus + focus proxy）与 AntD/Element Plus 对齐，禁用惰性超出 Element Plus                                                                      |
| D3 API 设计 |  ✅  | 修复 linkProps 覆盖缺陷：`item.disabled ?? props.linkProps?.disabled` / `item.target ?? props.linkProps?.target` 等兜底链；`triggerProps` / `contentProps` / `viewportProps` / `indicatorProps` / `listProps` / `subListProps` / `subItemProps` 按元素完整转发；`update:modelValue` / `select` 事件 |
| D4 类型系统 |  ✅  | strict 通过；修复 `linkProps` 类型为 `Omit<NavigationMenuLinkProps, 'href'>`（两处）；`NavigationMenuOptionData` 递归 children / `NavigationMenuUiSlot`（19 槽位）/ Compact 三件套全类型化；JSDoc 齐全；生成物 navigation-menu.json 手动同步 4 处 Omit 类型                                         |
| D5 代码规范 |  ✅  | `shared.ts` 纯函数收敛（视口/指示器定位无副作用、可单测）；事件标记 `LINK_DISMISSED` 常量收敛于 shared.ts；`useOmitProps` 排除清单完整；监听器成对清理（`onWatcherCleanup` / `onBeforeUnmount`）；SSR 安全（window/document 全部守卫）                                                              |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（12 条）+ Notes（架构对标表 13 维度 + 运行时注意事项 7 条）+ FAQ（6 条）                                                                                                                                                                                                  |
|   D7 其他   |  ✅  | 18 项单元测试通过（axe-core 无违规，含子菜单打开场景）；新增 linkProps 兜底回归测试（修复核心）；a11y 测试对 focus proxy（`aria-hidden` + tabindex 0）按 Radix 同款模式豁免 `aria-hidden-focus` 规则                                                                                                |

---

## 二、行业对标矩阵

| 能力                  | SoybeanUI | Ant Design `Menu` | Element Plus `Menu` | Radix `NavigationMenu` |
| :-------------------- | :-------: | :---------------: | :-----------------: | :--------------------: |
| headless/styled 分离  |    ✅     |         —         |          —          |           ✅           |
| 数据驱动 compact API  |    ✅     |        ✅         |         ✅          |           —            |
| 悬停/点击双触发可禁用 |    ✅     |         —         |          —          |           ✅           |
| 延迟防抖控制          |    ✅     |         —         |          —          |           ✅           |
| 子菜单任意嵌套        |    ✅     |        ✅         |    部分（2 层）     |           ✅           |
| 键盘 Roving Focus     |    ✅     |        ✅         |         ✅          |           ✅           |
| 指示器                |    ✅     |        ✅         |          —          |           ✅           |
| 定位视口 + 边缘钳制   |    ✅     |         —         |          —          |           ✅           |
| 禁用项（逐项 + 兜底） |    ✅     |        ✅         |         ✅          |           ✅           |
| 自定义链接/触发器属性 |    ✅     |         —         |          —          |           —            |
| 水平/垂直 + LTR/RTL   |    ✅     |        ✅         |         ✅          |           ✅           |
| 尺寸变体              |    ✅     |        ✅         |          —          |           —            |
| 受控模式              |    ✅     |        ✅         |         ✅          |           ✅           |

---

## 三、发现的问题与处理

### 3.1 Blocker — as-child 链接触发器“再次点击收起”失效（已修复，D1-12 / D1-16）

**问题：** 父项同时提供 `href` / `to` 与 `children` 时，`NavigationMenuOptionCompact` 用 `as-child` 把触发器渲染为链接（`NavigationMenuTrigger :as-child="isLink"` + 内部 `NavigationMenuLink`）。`Primitive` 的 `Slot` 会把 trigger 的 `onClick` 与链接自身的 `onClick` 合并到同一元素上，点击事件依次触发：

1. `NavigationMenuLink.onClick` → dispatch `EVENT_ROOT_CONTENT_DISMISS`（bubbles 到 root）→ `onItemDismiss` 同步把 `modelValue` 置空（菜单关闭）；
2. `NavigationMenuTrigger.onClick` → 此时 `open`（computed）已为 `false` → 走 `else` 分支 `onItemSelect(value)` 把菜单**重新打开**。

结果：菜单打开后点击同一触发器永远无法收起（关闭又立即重开），`aria-expanded` 恒为 `true`。单测 `opens the content on trigger click and closes it again` 首次运行时即捕获此缺陷（`expected 'true' to be 'false'`）。

**修复：** 在 [navigation-menu-link.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/navigation-menu/navigation-menu-link.vue#L27-L52) 与 [navigation-menu-trigger.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/navigation-menu/navigation-menu-trigger.vue#L90-L109) 间建立事件标记协同：

- 链接仅在菜单打开时 dispatch dismiss（`if (!modelValue.value) return`），关闭态点击交由触发器处理打开；
- 链接 dispatch dismiss 前在共享 click 事件上打 `LINK_DISMISSED` 标记（[shared.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/navigation-menu/shared.ts#L9-L13)）；
- 触发器 `onClick` 读取标记，命中则直接返回，不再重开。

场景验证：关闭态点击 as-child 触发器 → 打开 ✓；打开态点击 → 链接关闭 + 触发器跳过重开，保持关闭 ✓；纯按钮触发器正常 toggle ✓；子菜单链接点击关闭菜单 ✓（原有行为保留）。

### 3.2 Major — `linkProps` 类型要求必填 `href`（已修复，D4）

**问题：** `NavigationMenuSubOptionCompactProps.linkProps?: NavigationMenuLinkProps` 与 `NavigationMenuOptionCompactProps.linkProps?: NavigationMenuLinkProps` 要求调用方传入 `href`，但该值恒由项的 `href` 决定、在 computed 中被覆盖——类型不诚实，且阻止 `linkProps={{ disabled: true }}` 这类合法用法（与 C23 anchor 相同缺陷）。

**修复：** 两处类型改为 `Omit<NavigationMenuLinkProps, 'href'>`（[types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/navigation-menu/types.ts#L330-L333)）。同步手动更新 [navigation-menu.json](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/apps/docs/src/generated/api/navigation-menu.json) 两处 props member `type` + 两处 props `resolvedType`（共 4 行 diff，referencedType 保持原样，JSON 校验通过），避免 `pnpm sui api` 全量重生成的 node_modules 路径漂移噪音。

### 3.3 Major — `linkProps` 全局属性被 item 的 undefined 覆盖（已修复，D3）

**问题：** [navigation-menu-option-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/navigation-menu/navigation-menu-option-compact.vue#L41-L52) 与 [navigation-menu-sub-option-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/navigation-menu/navigation-menu-sub-option-compact.vue#L31-L42) 的 `linkProps` computed 为 `{ ...props.linkProps, disabled: item.disabled, target: item.target, ... }`——展开后显式绑定优先，绝大多数项不声明 `disabled` / `target`（`undefined`），把全局 `linkProps.disabled` / `linkProps.target` 覆盖为未定义，全局配置被静默吞掉。

**修复：** computed 内改用 `??` 兜底链，item 显式值优先、`props.linkProps` 兜底：

```ts
const linkProps = computed(() =>
  isLink.value
    ? {
        ...props.linkProps,
        disabled: props.item.disabled ?? props.linkProps?.disabled,
        to: props.item.to ?? props.linkProps?.to,
        href: props.item.href,
        target: props.item.target ?? props.linkProps?.target,
        external: props.item.external ?? props.linkProps?.external
      }
    : {}
);
```

新增测试验证：`linkProps.disabled` 全局生效（无显式值项继承）、显式 `item.disabled` 优先、`linkProps.target` 兜底且 `item.target` 优先。

### 3.4 Major — 测试覆盖不足（已修复，D7-05）

**问题：** [navigation-menu.spec.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/ui/test/specs/components/navigation-menu.spec.ts) 仅含 8 项纯函数定位测试（viewport/indicator 的 LTR/RTL/vertical 坐标），无任何组件渲染 / 交互 / 禁用 / a11y 覆盖。

**修复：** 追加 `SNavigationMenu` 测试套件至 18 项：

- **rendering** — `nav > ul > li` 结构与项标签渲染；自定义 `class` 与 `orientation` 属性；
- **linkProps fallback** — `linkProps.disabled` 全局兜底、`item.disabled` 显式优先、`linkProps.target` 兜底 + `item.target` 优先（3.3 修复的回归测试）；
- **disabled item** — `aria-disabled` / `tabindex="-1"` / `data-disabled`、点击不打开内容；
- **open state** — 点击打开（`aria-expanded` / content 渲染）、再次点击收起（3.1 修复的回归测试）、`update:modelValue` 事件；
- **accessibility** — axe-core 闭合与子菜单打开两场景零违规；打开场景按 Radix 同款 focus proxy 模式豁免 `aria-hidden-focus`。

### 3.5 Major — 文档缺章节（已修复，D6）

**问题：** 中英文档 [navigation-menu.md](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/apps/docs/src/docs/zh-CN/components/navigation-menu.md) 仅有 Overview(1 句)/Usage/Demos/API，缺 Features、Notes（架构对标 + 运行时注意事项）、FAQ——D6-02 / 06-10 / 06-11 / 06-13 / 06-15 不通过。

**修复：** 中英文统一重写：Features（12 条）+ Notes（架构对标表 13 维度：AntD `Menu` / Element Plus `Menu` / Radix `NavigationMenu`，运行时注意事项 7 条）+ FAQ（6 条），并记录 3.1 的 as-child 触发器行为与 3.3 的 linkProps 兜底语义。

---

## 四、重点检查项结论

| 检查项               | 结论 | 证据                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------- | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-12** 数据驱动   |  ✅  | `NavigationMenuCompact` 以嵌套 `items`（`NavigationMenuOptionData` 递归 `children`）数据驱动渲染 Root/List/OptionCompact/SubOptionCompact/Indicator/Viewport；`optionPropKeys` 集中收口 9 个按元素转发 prop（[navigation-menu-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/navigation-menu/navigation-menu-compact.vue#L24-L38)）；**修复 as-child 触发器“再次点击收起”失效**（Blocker，见 3.1） |
| **D1-16** 交互一致性 |  ✅  | 点击/悬停双触发 + 延迟防抖（delayDuration/skipDelayDuration/disablePointerLeaveClose）+ pointermove 打开后 click 守卫（`hasPointerMoveOpenedRef`）+ 禁用惰性 + 键盘 Roving Focus / 入口方向键 / Escape 全链路；as-child 场景下链接先 dismiss、触发器跳过重开的协同通过事件标记实现，打开/关闭状态可逆（新增切换测试）                                                                                                                                     |
| **D2-11** 关键交互   |  ✅  | 悬停/点击双触发、延迟控制、键盘导航、指示器、定位视口五类能力与 Radix NavigationMenu 对齐；任意嵌套 + `linkProps` 按元素转发 + 6 尺寸为差异化增强；RTL 定位数学（`getNavigationMenuViewportPosition` / `getNavigationMenuIndicatorPosition`）经 8 项纯函数单测验证                                                                                                                                                                                        |
| **D7-05** 测试覆盖   |  ✅  | 18 项测试全通过（渲染 2 + linkProps 兜底 3 + 禁用 1 + 打开状态 2 + axe 2 + 定位 8）；3.1/3.3 修复均有回归测试；axe-core 闭合与打开两场景零违规；`RouterLink` 未注册警告为测试环境噪音（anchor 等既有测试一致），未处理                                                                                                                                                                                                                                    |

---

## 五、架构亮点

### 事件标记协同（`navigation-menu-link.vue` + `navigation-menu-trigger.vue`）

as-child 触发器把链接与触发器的 click 监听器合并到同一元素，点击会依次触发 dismiss（关闭）与 toggle（重开）。通过共享 click 事件上的 `LINK_DISMISSED` 标记建立单向协同：链接仅在菜单打开时 dispatch dismiss 并打标记，触发器读到标记即跳过重开。标记常量收敛于 `shared.ts`，不引入新的事件通道或全局状态，保持 headless 层纯逻辑。

### 双 context + 可取消内容挂载（`context.ts` + `navigation-menu-content.vue`）

Root context（`provideNavigationMenuRootContext`）持有 modelValue / values / previousValue / 延迟防抖 / dismiss 事件监听；Item context 派生 `open` / `dataState`。`useControllableState` 双通道管理 modelValue（受控 emit、非受控写回）。Content 通过 `isLastActiveValue` 在视口退出动画期间保留最后一个激活内容，避免动画闪烁。

### 视口 / 指示器纯函数定位（`shared.ts`）

`getNavigationMenuViewportPosition` 以激活触发器（或根节点）为参照计算左/上坐标、按 `align`（start/center/end）对齐、在屏幕边缘钳制、RTL 逻辑方向换算；`getNavigationMenuIndicatorPosition` 沿轨道随触发器滑动。两者均为无副作用纯函数，通过 DOMRect mock 单测覆盖 LTR/RTL × 水平/垂直。

### `useOmitProps` + `usePickProps` 收口转发（`navigation-menu-compact.vue`）

Compact 层用 `useOmitProps` 剥离 `items` 与 9 个选项转发 prop 后转发 Root；`usePickProps` 将同一批 prop 原样透传给每个 `NavigationMenuOptionCompact`——根级与选项级 props 单一来源，新增转发字段只需维护 `optionPropKeys` 一处。

---

## 六、变更文件清单

| 文件                                                                                      | 变更类型                                                                                                                                           |
| :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/navigation-menu/types.ts`                               | 修复类型：`linkProps` 改为 `Omit<NavigationMenuLinkProps, 'href'>`（NavigationMenuSubOptionCompactProps 与 NavigationMenuOptionCompactProps 两处） |
| `packages/headless/src/components/navigation-menu/navigation-menu-option-compact.vue`     | 修复 linkProps 覆盖：`disabled` / `to` / `target` / `external` 改 `??` 兜底链                                                                      |
| `packages/headless/src/components/navigation-menu/navigation-menu-sub-option-compact.vue` | 修复 linkProps 覆盖：同上兜底链（子项场景）                                                                                                        |
| `packages/headless/src/components/navigation-menu/navigation-menu-link.vue`               | 修复 as-child 关闭失效：菜单关闭时不 dismiss（交由触发器打开）；dismiss 前打 `LINK_DISMISSED` 标记                                                 |
| `packages/headless/src/components/navigation-menu/navigation-menu-trigger.vue`            | 修复 as-child 关闭失效：`onClick` 读取 `LINK_DISMISSED` 标记，命中即跳过重开                                                                       |
| `packages/headless/src/components/navigation-menu/shared.ts`                              | 新增 `LINK_DISMISSED` 事件标记常量（含 JSDoc 说明协同语义）                                                                                        |
| `apps/docs/src/generated/api/navigation-menu.json`                                        | 手动同步 linkProps 类型（2 处 member `type` + 2 处 props `resolvedType`，共 4 行 diff，JSON 校验通过）                                             |
| `packages/ui/test/specs/components/navigation-menu.spec.ts`                               | 从 8 项扩展到 18 项（rendering / linkProps fallback / disabled / open state / axe ×2；新增 3.1 与 3.3 的回归测试）                                 |
| `apps/docs/src/docs/en/components/navigation-menu.md`                                     | 重写：Features（12 条）+ Notes（架构对标表 13 维度 + 运行时注意事项 7 条）+ FAQ（6 条）                                                            |
| `apps/docs/src/docs/zh-CN/components/navigation-menu.md`                                  | 重写：功能特性（12 条）+ 备注（架构对标表 13 维度 + 运行时注意事项 7 条）+ 常见问题（6 条）                                                        |
| `docs/check.md`                                                                           | 标记 C24 各维度为 ✅                                                                                                                               |

---

## 七、验证命令

```bash
# 单元测试（18 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/navigation-menu.spec.ts
# → Test Files 1 passed (1) | Tests 18 passed (18)

# 类型检查
pnpm --filter @soybeanjs/ui typecheck
# → vue-tsc --noEmit --skipLibCheck 通过
```

---

## 八、遗留 P3 增强项

- **focus proxy 的 axe 规则**：打开态触发器渲染 `aria-hidden` + `tabindex="0"` 的 focus proxy（Radix 同款模式），axe 报 `aria-hidden-focus`；测试按规则豁免并注释说明。若后续引入 e2e，可在浏览器真实环境复核。非阻塞。
- **`Cmd`+点击 as-child 触发器**：链接的 `metaKey` 守卫跳过 dismiss 与标记，随后触发器仍执行 toggle；`Cmd`+点击通常表示新标签打开，当前行为为菜单状态照常切换。与 Radix 一致，记录为增强项。非阻塞。
- **悬停打开后的 click 守卫**：pointermove 打开的菜单会忽略随后的 click（`hasPointerMoveOpenedRef`），用户快速点击同一触发器时菜单不切换；这是防误触设计，文档已注明。非阻塞。
