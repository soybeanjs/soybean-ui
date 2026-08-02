# C23 `anchor` 检查优化报告

> **组件编号：** C23
> **组件名称：** `anchor` / `SAnchor`
> **模式：** 多槽 + Compact（递归 `AnchorCompact` / `AnchorItemCompact` 聚合 Root + Link；`scv()` 配方 `anchorVariants`，6 UI slots：root / link / sub / item / indicator / title）
> **优先级：** P2
> **检查日期：** 2026-08-02
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D2-02、D7-04

---

## 一、执行摘要

对 `SAnchor` 完成全维度审计。组件架构清晰：headless 层拥有 4 个 SFC（Root / Link / Compact / ItemCompact）+ `context.ts` + `shared.ts`（14 个纯函数：hash 解析、容器解析、偏移测量、激活推导、历史写入、滚动执行），`useControllableState` 双通道管理 modelValue，滚动侦测基于 scroll 事件 + `getAnchorSections` 逐帧测量。styled 层使用 `scv()` 配方 + 4 变体（color × orientation × size × sticky），以 CSS 变量 `--soybean-anchor-offset-top` 贯通滚动偏移与吸顶导轨。

发现并修复 3 项问题 + 1 项类型缺陷：

1. **Major (D3)**：`AnchorItemCompact` 中 `v-bind="linkProps"` 后的显式 `:target="item.target"` / `:disabled="item.disabled"` 会以 `undefined` 覆盖 `linkProps` 的全局值——`linkProps.disabled` / `linkProps.target` 被静默吞掉，全局配置失效。
2. **Major (D4)**：`linkProps` 类型为 `AnchorLinkProps`，要求必填 `href`，但 `href` 恒由项的 `href` 决定、用户传入也无意义——API 类型不诚实。修正为 `Omit<AnchorLinkProps, 'href'>`（`AnchorItemCompactProps` 与 `AnchorCompactProps` 两处）。
3. **Minor (D7-05)**：`AnchorLink.onClick` 先 emit `itemSelect` 再检查 disabled——禁用链接点击仍触发选择事件，与 AntD 行为不一致（禁用应完全惰性）。
4. **Minor (D7-05)**：`AnchorRoot` 显式 `:aria-label="messages.anchor.nav"` 覆盖用户传入的 `aria-label` 属性——locale 只应作回退。

测试从 7 项扩展到 29 项（新增 sticky CSS 变量、横向布局、aria-label 覆盖、offsetTop/targetOffset 滚动数学、bounds 容差、getCurrentAnchor 映射、受控跟随、禁用惰性、linkProps 兜底、键盘可聚焦、嵌套高亮、属性转发、RTL dir、滚动监听清理、axe ×2）。

|    维度     | 状态 | 说明                                                                                                                                                                                                                               |
| :---------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | 滚动侦测高亮 + hash 同步（点击 push / 滚动 replace）+ 初始 hash 滚动 + 自定义容器重同步 + 递归嵌套 + sticky 吸顶全部就位；`data-soybean-anchor-*` 全覆盖（root/link/item）+ `data-active`/`data-disabled`/`data-state` 状态钩子    |
| D2 行业对标 |  ✅  | `bounds`/`getContainer`/`getCurrentAnchor`/`offsetTop`/`targetOffset` 五项滚动调优参数与 Ant Design Anchor 对齐；递归任意层级 items + 禁用项 + 8 色 × 6 尺寸为增强项，超出 AntD（仅扁平、无禁用）与 Element Plus（仅 2 层）        |
| D3 API 设计 |  ✅  | 修复 linkProps 覆盖缺陷：`item.target ?? linkProps?.target` / `item.disabled ?? linkProps?.disabled` 兜底链；`replace`/`bounds`/`getContainer`/`getCurrentAnchor` 完整转发；`activeChange`/`itemSelect`/`update:modelValue` 三事件 |
| D4 类型系统 |  ✅  | strict 通过；修复 `linkProps` 类型为 `Omit<AnchorLinkProps, 'href'>`（API 诚实化，两处）；`AnchorOptionData` 递归 children / `AnchorContainer` / `AnchorUiSlot` 全类型化；JSDoc 齐全；生成物 anchor.json 手动同步 4 处 Omit 类型   |
| D5 代码规范 |  ✅  | `shared.ts` 纯函数收敛（14 个无副作用工具）；`useOmitProps` 排除清单完整；滚动监听用 `onWatcherCleanup` 成对清理；300ms 滚动动画守卫防中间态误切；SSR 安全（window/document 全部守卫）                                             |
|   D6 文档   |  ✅  | 中英文统一；新增 Features（12 条）+ Notes（架构对标表 15 维度 + 运行时注意事项 7 条）+ FAQ（6 条）                                                                                                                                 |
|   D7 其他   |  ✅  | 29 项单元测试通过（axe-core 无违规，含禁用+嵌套场景）；测试新增 beforeEach/afterEach 安全网（hash 恢复 + DOM 清理 + mock 还原）防止级联污染；`data-soybean-anchor-item` 补齐 D1-07 命名规范                                        |

---

## 二、行业对标矩阵

| 能力                  | SoybeanUI | Ant Design `Anchor` | Element Plus `Anchor` |
| :-------------------- | :-------: | :-----------------: | :-------------------: |
| headless/styled 分离  |    ✅     |          —          |           —           |
| 数据驱动 compact API  |    ✅     |         ✅          |          ✅           |
| 滚动容器              |    ✅     |         ✅          |          ✅           |
| 滚动偏移（双参数）    |    ✅     |         ✅          |          ✅           |
| 激活容差 bounds       |    ✅     |         ✅          |          ✅           |
| 激活值映射            |    ✅     |         ✅          |           —           |
| 点击/滚动 hash 双模式 |    ✅     |         ✅          |          ✅           |
| 初始 hash 滚动        |    ✅     |         ✅          |           —           |
| 吸顶导轨              |    ✅     |         ✅          |          ✅           |
| 嵌套项（任意层级）    |    ✅     |          —          |     部分（2 层）      |
| 禁用项                |    ✅     |          —          |           —           |
| 自定义链接/指示器属性 |    ✅     |          —          |           —           |
| 纵向 + 横向           |    ✅     |          —          |          ✅           |
| 主题色 / 尺寸变体     |    ✅     |          —          |           —           |

---

## 三、发现的问题与处理

### 3.1 Major — `linkProps` 全局属性被 item 的 undefined 覆盖（已修复，D3）

**问题：** [anchor-item-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/anchor/anchor-item-compact.vue) 中模板为 `<AnchorLink v-bind="linkProps" :href="item.href" :target="item.target" :disabled="item.disabled">`。`v-bind` 展开后显式绑定优先，`item.target` / `item.disabled` 为 `undefined` 时（绝大多数项不声明）会把 `linkProps.target`（如全局 `_blank`）与 `linkProps.disabled`（如全局禁用）覆盖为未定义——全局配置被静默吞掉。

**修复：** 显式绑定改为 `??` 兜底链，item 显式值优先、`linkProps` 兜底：

```html
<AnchorLink
  v-bind="linkProps"
  :href="item.href"
  :target="item.target ?? linkProps?.target"
  :disabled="item.disabled ?? linkProps?.disabled"
></AnchorLink>
```

新增测试验证：`linkProps.target='_blank'` 时无 target 项继承 `_blank`、显式 `target="_self"` 项保持 `_self`；`linkProps.disabled` 全局生效且 item 显式值可覆盖。

### 3.2 Major — `linkProps` 类型要求必填 `href`（已修复，D4）

**问题：** `AnchorItemCompactProps.linkProps?: AnchorLinkProps` 与 `AnchorCompactProps.linkProps?: AnchorLinkProps` 要求调用方传入 `href`，但该值恒被 `:href="item.href"` 覆盖、毫无作用——类型不诚实，且阻止了 `linkProps={{ disabled: true }}` 这类合法用法。

**修复：** 两处类型改为 `Omit<AnchorLinkProps, 'href'>`（[types.ts](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/anchor/types.ts#L133-L159)），`v-bind` 不再携带冗余 href。同步手动更新 [anchor.json](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/apps/docs/src/generated/api/anchor.json) 三处 props 的 `linkProps` 类型（2 个 member `type` + 1 个 member `resolvedType` + 2 个 props `resolvedType`，共 4 行 diff，验证 JSON 合法）。

### 3.3 Minor — 禁用链接点击仍触发 `itemSelect`（已修复，D7-05）

**问题：** [anchor-link.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/anchor/anchor-link.vue#L23-L38) 的 `onClick` 先 `onLinkClick(event, ...)`（emit `itemSelect`）再检查 `props.disabled`——禁用链接点击仍发出选择事件，`mousedown` 与键盘路径的防护不一致。

**修复：** disabled 检查前置，禁用链接完全惰性（preventDefault + stopPropagation 后直接返回）。新增测试验证禁用项点击不触发 scroll、`itemSelect` 与 `update:modelValue`。

### 3.4 Minor — `aria-label` 被 locale 默认值覆盖（已修复，D7-05）

**问题：** [anchor-root.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/anchor/anchor-root.vue#L50) 模板 `:aria-label="messages.anchor.nav"` 位于 `v-bind="forwardedProps"` 之后，显式绑定覆盖了用户传入的 `aria-label`——`<nav>` 地标命名无法定制。

**修复：** 改为 `forwardedProps['aria-label'] ?? messages.anchor.nav` 回退链（显式属性优先、locale 兜底），与 page-tabs 的 close/pin 按钮模式一致。新增测试验证自定义 `aria-label` 生效。

---

## 四、重点检查项结论

| 检查项             | 结论 | 证据                                                                                                                                                                                                                                                                                                                                                       |
| :----------------- | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1-12** 数据驱动 |  ✅  | 泛型 `AnchorCompact` 递归渲染任意层级 `items`；每层 `AnchorItemCompact` 组合 Link + indicator + title + sub，`subProps` 向下透传；`item.href` 决定目标，`item.title \|\| item.href` 兜底文案（[anchor-item-compact.vue](file:///Users/soybean/Web/Projects/SoybeanJS/soybean-ui/packages/headless/src/components/anchor/anchor-item-compact.vue#L26-L44)） |
| **D2-02** 对标能力 |  ✅  | 滚动侦测五参数（bounds/getContainer/getCurrentAnchor/offsetTop/targetOffset）与 AntD 对齐；递归嵌套、禁用项、linkProps 兜底、8 色 × 6 尺寸为差异化增强；滚动数学经 getAnchorScrollTop 逐容器验证（window 与自定义容器双路径）                                                                                                                              |
| **D7-04** 可维护性 |  ✅  | `shared.ts` 14 个纯函数无副作用、可单测；`useOmitProps` 排除清单与模板绑定一一对应；滚动监听 `onWatcherCleanup` 成对清理（新增清理测试）；动画守卫定时器 `onBeforeUnmount` 清理；SSR 安全（`typeof window/document` 全部守卫，无挂载期 DOM 访问）                                                                                                          |

---

## 五、架构亮点

### 滚动侦测管线（`anchor-root.vue` + `shared.ts`）

滚动事件 → `getCurrentAnchor()`（对已注册链接 `getAnchorSections` 逐帧测量 → `getCurrentAnchorHref` 取最近越过章节）→ `setActiveHref`（经 `getCurrentAnchor` 重映射后写 `useControllableState`）→ `updateAnchorHistory('replace')`。滚动数学双路径统一：window 容器 `scrollY + rect.top - clientTop`，元素容器 `scrollTop + rect.top - containerRect.top`，均减 `resolvedOffset`。

### 递归 Compact 组合（`anchor-compact.vue` + `anchor-item-compact.vue`）

`AnchorCompact` 用 `useOmitProps` 剥离 items/linkProps/indicatorProps/titleProps/subProps 后转发 Root；Root 通过 `v-slot="{ modelValue }"` 暴露 activeHref，`AnchorItemCompact` 递归自我组合——`hasActiveChild` 沿 children 树向上传播 `data-state="active"`，父项包裹层在子项激活时同步高亮。

### 双通道受控 + 惰性激活

`activeHref = useControllableState(() => props.modelValue, emit update, '')`：受控时内部写入仅 emit，DOM 跟随 prop（测试验证 setProps 后高亮迁移、外部改值不触发滚动）；非受控时写回内部状态。禁用链接保持注册（`registerLink` 在 `onWatcherCleanup` 中成对注销），子项仍可正常高亮。

### 吸顶导轨与偏移变量

`sticky` 变体把导轨钉在 `top: var(--soybean-anchor-offset-top, 0px)` 并将高度限制为视口余量；UI 层 `style` 计算把 `offsetTop` 写入同名 CSS 变量——滚动偏移与吸顶位置单源一致，`targetOffset` 仅影响滚动数学不影响导轨。

---

## 六、变更文件清单

| 文件                                                              | 变更类型                                                                                                                                                                                                                            |
| :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/anchor/anchor-item-compact.vue` | 修复 linkProps 覆盖：target/disabled 改 `??` 兜底链；包装层新增 `data-soybean-anchor-item`（D1-07）                                                                                                                                 |
| `packages/headless/src/components/anchor/anchor-link.vue`         | 修复禁用惰性：disabled 检查前置，禁用点击不 emit `itemSelect`                                                                                                                                                                       |
| `packages/headless/src/components/anchor/anchor-root.vue`         | 修复 aria-label 覆盖：`forwardedProps['aria-label'] ?? messages.anchor.nav` 回退链；补 `computed` 导入                                                                                                                              |
| `packages/headless/src/components/anchor/types.ts`                | 修复类型：`linkProps` 改为 `Omit<AnchorLinkProps, 'href'>`（AnchorItemCompactProps 与 AnchorCompactProps 两处）                                                                                                                     |
| `apps/docs/src/generated/api/anchor.json`                         | 手动同步 linkProps 类型（4 行最小 diff，JSON 校验通过），避免 `pnpm sui api` 全量重生成的 node_modules 路径漂移噪音                                                                                                                 |
| `packages/ui/test/specs/components/anchor.spec.ts`                | 从 7 项扩展到 29 项（rendering / active state（offsetTop/targetOffset/bounds/getCurrentAnchor/受控/空激活）/ disabled 惰性 + linkProps 兜底 / keyboard / nesting / direction / cleanup / axe ×2）；新增 beforeEach/afterEach 安全网 |
| `apps/docs/src/docs/en/components/anchor.md`                      | 重写：Features（12 条）+ Notes（架构对标表 15 维度 + 运行时注意事项 7 条）+ FAQ（6 条）                                                                                                                                             |
| `apps/docs/src/docs/zh-CN/components/anchor.md`                   | 重写：功能特性（12 条）+ 备注（架构对标表 15 维度 + 运行时注意事项 7 条）+ 常见问题（6 条）                                                                                                                                         |
| `docs/check.md`                                                   | 标记 C23 各维度为 ✅                                                                                                                                                                                                                |

---

## 七、验证命令

```bash
# 单元测试（29 项全通过）
cd packages/ui && pnpm exec vitest run test/specs/components/anchor.spec.ts
# → Test Files 1 passed (1) | Tests 29 passed (29)

# 类型检查（全工作区通过）
pnpm typecheck
# → packages/ui / apps/docs / apps/playground 全部 Done

# Lint
pnpm lint
# → Found 0 warnings and 0 errors.
```

---

## 八、遗留 P3 增强项

- **`getContainer` 不稳定引用**：watch 依赖 `props.getContainer?.()`，若每次调用返回新元素会反复重同步；已在文档运行时注意事项中提示记忆化，未加内部去抖。记录为增强项，非阻塞。
- **滚动节流**：每次 scroll 事件同步测量全部已注册链接位置（`getBoundingClientRect`），高频滚动下存在布局抖动；当前实现与 AntD 一致，可考虑 rAF 节流。记录为增强项，非阻塞。
- **`target="_blank"` + hash 链接**：hash 链接点击始终 preventDefault 并滚动当前页，即使 `target="_blank"` 也不会在新标签打开锚点；与 AntD 行为一致，但文档未明确。记录为增强项，非阻塞。
