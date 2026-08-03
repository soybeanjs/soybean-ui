# C63 `tree-menu` 检查优化报告

> **组件编号：** C63（`tree-menu`）
> **组件名称：** `STreeMenu`（headless 基座：`TreeMenuCompact`/`TreeMenuRoot`/`TreeMenuOptionCompact`/`TreeMenuSlotCompact` + 原语 `TreeMenuButton`/`TreeMenuItem`/`TreeMenuCollapsible`/`TreeMenuSub`/`TreeMenuGroup`/`TreeMenuGroupLabel`/`TreeMenuTooltipCompact`）
> **模式：** 多槽 + Compact
> **优先级：** P1
> **检查日期：** 2026-08-03
> **方法论：** [audit.md](../../.agents/skills/soybean-ui-component-development/audit.md) D1–D7
> **重点项：** D1-12、D1-16、D2-11、D7-01

---

## 一、执行摘要

对 `tree-menu` 完成全维度审计。核心链路：`TreeMenuRoot` 以 `useControllableState` 管理 `modelValue`（激活）/`expanded`（展开）/`collapsed`（折叠）三组受控/非受控双通道，折叠切换时 `backupExpanded` 暂存展开分支、恢复时原样还原；`TreeMenuOptionCompact` 在 headless 层完成单节点组合（叶子 = 按钮/链接 + 操作菜单；父项 = `TreeMenuCollapsible` 触发器 + 递归 `TreeMenuSub` + 折叠弹出 `DropdownMenuCompact`）；UI 层 `STreeMenu` 仅注入 8 档尺寸配方与插槽类，不承载状态。

**发现 Major ×3 + Minor ×2**，均已修复；另完成操作按钮 aria-label 13 语言本地化与样式死槽清理：

|    维度     | 状态 | 说明                                                                                                                                                                                                                                                                                                                                                                           |
| :---------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 功能合规 |  ✅  | **Major 修复**（D1-08）：操作菜单渲染在 `TreeMenuButton` 内部导致按钮套按钮（`nested-interactive`）→ 移出为按钮兄弟节点（叶子分支）/ `#extra` 插槽（父项分支）；**Major 修复**（D1-08）：三处 `TreeMenuButton` 未透传 `item.disabled` → 禁用叶节点缺失 `disabled`/`data-disabled`/`aria-disabled`（见 3.2、3.3）。激活/展开/折叠/受控通道/链接项/插槽转发核验通过（spec 覆盖） |
| D2 行业对标 |  ✅  | 折叠侧边栏（`collapsed` + `collapsedWidth`/`indent`）、折叠时子菜单弹出、操作菜单（`actions`）、徽标/标签/图标、分组、外链项对齐 Ant Design Menu/Element Plus Menu/Naive UI Menu；操作按钮 aria-label 走 13 语言包 `treeMenu.openActions` 模板（D2-11 本地化）                                                                                                                 |
| D3 API 设计 |  ✅  | `items: TreeMenuOptionData<T>[]` 泛型保留自定义字段；`modelValue`/`expanded`/`collapsed` 三组受控/非受控双通道；`actions` + `actionMenuProps` + `onActionSelect` 操作菜单契约；`item`/`item-leading`/`item-trailing`/`group-label`/`top`/`bottom` 插槽                                                                                                                         |
| D4 类型系统 |  ✅  | 操作菜单迁出后 `item.actions` 失去 `v-if` 直接收窄 → 两处 `:items="item.actions ?? []"` 显式兜底；`pnpm typecheck` 全绿（含 headless/ui/docs/playground 4 工作区）                                                                                                                                                                                                             |
| D5 代码规范 |  ✅  | `pnpm lint` 全绿；无 `as any`/`@ts-expect-error`；headless 无样式（D5-14）；样式 recipe 死槽清理（`subButton`/`subItem`，D1-09）；移除 slot-compact 迁移后死 import/computed                                                                                                                                                                                                   |
|   D6 文档   |  ✅  | en/zh 文档由 4 节重构为 8 节 Recommended structure（概述/用法/特性/**组件家族**/演示/API/说明/常见问题），含架构对标矩阵（8 能力 × 4 对标库）+ 8 条 Cautions + 9 组 FAQ；中英文结构完全对齐                                                                                                                                                                                    |
|   D7 其他   |  ✅  | 单测 6 → 25 项全通过（渲染/状态/展开折叠/折叠模式/禁用/键盘/axe 0 违规）；**Major 修复**（D7-01 共享组件缺陷）：`dropdown-menu-trigger` `ariaControls` 返回 shallowRef 对象 → DOM 渲染 `aria-controls="[object Object]"` → 补 `.value`；折叠触发器补 `role="button"` + `aria-label`；`pnpm typecheck`/`pnpm lint` 全绿；全量回归 109 文件 1636 项通过（D7-09）                 |

---

## 二、行业对标矩阵

> `tree-menu` 是**侧边导航菜单 + 折叠模式 + Compact 组合**模式。Ant Design Menu 与 Element Plus Menu 为同源设计（配置式 `items` + 受控 `selectedKeys`/`openKeys`）；Naive UI Menu 支持折叠弹出；SoybeanUI 以 headless 组合 + 数据驱动渲染表达（`items` 递归 + 内建操作菜单/徽标/标签/外链字段，折叠时内置弹出子菜单）。

| 能力                         | SoybeanUI | Ant Design | Element Plus | Naive UI |
| :--------------------------- | :-------: | :--------: | :----------: | :------: |
| headless/样式分离            |    ✅     |     —      |      —       |    —     |
| 受控激活/展开/折叠           |    ✅     |     ✅     |      ✅      |    ✅    |
| 折叠侧边栏（collapsed 宽度） |    ✅     |     ✅     |      ✅      |    ⚠️    |
| 折叠时子菜单弹出             |    ✅     |     ✅     |      ✅      |    ⚠️    |
| 内建操作菜单（actions）      |    ✅     |     —      |      —       |    —     |
| 徽标/标签（badge/tag）       |    ✅     |     ⚠️     |      —       |    —     |
| 分组/图标/外链               |    ✅     |     ✅     |      ✅      |    ✅    |
| 本地化 aria-label            |    ✅     |     ✅     |      ✅      |    ✅    |

`⚠️` = 部分支持（Naive UI 折叠弹出需额外配置 `collapsed` + 自定义弹出内容；Ant Design 的徽标经 `label` 自定义节点实现）。

---

## 三、发现的问题与处理

### 3.1 Major — D7-01 共享组件缺陷：`aria-controls` 渲染 `[object Object]`

**现象：** [dropdown-menu-trigger.vue](../../packages/headless/src/components/dropdown-menu/dropdown-menu-trigger.vue) 第 29 行：

```ts
const ariaControls = computed(() => (open.value ? popupId : undefined));
```

`popupId` 是 `menu/context.ts` 中的 **shallowRef**；模板 `:aria-controls="ariaControls"` 绑定的是计算属性返回值——脚本侧 computed 返回值中的 shallowRef **不会被模板解包**，展开时 DOM 渲染 `aria-controls="[object Object]"`。该缺陷影响**全部 dropdown-menu 系组件**（tree-menu 折叠弹出、操作菜单、table 操作等复用 `DropdownMenuTrigger` 的场景），并触发 axe `aria-allowed-attr` 违规（`[object Object]` 非合法 IDREF）。

**修复：** 解引用：

```ts
const ariaControls = computed(() => (open.value ? popupId.value : undefined));
```

**验证（测试驱动）：** tree-menu 折叠 a11y 用例（axe 0 违规）+ 展开折叠用例断言 `aria-controls` 为合法 ID `soybean-collapsible-content-v-0`；全量 1636 项回归通过。

### 3.2 Major — D1-08/D7-01 操作菜单嵌套交互违规（按钮套按钮）

**现象：** [tree-menu-slot-compact.vue](../../packages/headless/src/components/tree-menu/tree-menu-slot-compact.vue)（重构前）将操作菜单 `DropdownMenuCompact`（ellipsis 按钮触发器）渲染在 `TreeMenuSlotCompact` 内，而该组件被 `TreeMenuOptionCompact` 用作 `TreeMenuButton` 的**内容**——DOM 结构为 `<button>…<button>…</button></button>`，按钮套按钮违反 HTML 规范并触发 axe `nested-interactive`（违规节点 `.group\/button`，导航按钮内含可聚焦操作按钮）。样式 `itemAction: 'absolute end-0 … z-2'` 表明设计意图本就是 `.item`（`relative`）内的绝对定位兄弟节点。

**修复：** 操作菜单从 slot-compact 迁出至 [tree-menu-option-compact.vue](../../packages/headless/src/components/tree-menu/tree-menu-option-compact.vue)：

- **叶子分支**：`DropdownMenuCompact` 渲染在 `TreeMenuButton` 之后、作为 `TreeMenuItem` 内兄弟节点（`absolute end-0` 定位相对 `li` 不变）；
- **父项分支**：操作菜单置于 `TreeMenuCollapsible` 的 `#extra` 插槽（`v-else-if` 与折叠弹出互斥）；
- 删除 slot-compact 中操作菜单块与 `Button`/`DropdownMenuCompact`/`useLocaleMessages` 死 import/computed。

**验证（测试驱动）：** 「has no a11y violations with item actions」（axe 0 违规）+「renders the item actions trigger with a localized aria-label」通过；父项分支 `#extra` 保证含 `actions` 的父项行为不回归。

### 3.3 Major — D1-08 禁用态未透传（`disabled` 语义缺失）

**现象：** [tree-menu-option-compact.vue](../../packages/headless/src/components/tree-menu/tree-menu-option-compact.vue) 三处 `TreeMenuButton`（叶子链接分支 `as-child`、叶子按钮分支、父项触发器）均未透传 `item.disabled`。headless `Button` 对 `disabled` 渲染 `:disabled`/`:aria-disabled`/`data-disabled`/`tabindex="-1"`，缺失透传导致禁用叶节点无任何禁用语义——`wrapper.findAll('[data-soybean-tree-menu-button]')[1].attributes('data-disabled')` 为 `undefined`。

**修复：** 三处 `TreeMenuButton` 均补 `:disabled="item.disabled"`（叶子链接、叶子按钮、父项触发器）。

**验证（测试驱动）：** 「blocks activation for a disabled item」断言 `data-disabled` 存在 + 点击不派发 `update:modelValue`；「blocks expansion for a disabled parent」断言 `aria-expanded` 保持 `false`；「renders interactive elements as native buttons」确认禁用项仍为原生 `BUTTON`。

### 3.4 Minor — D7-01 折叠触发器 a11y 属性（无 role 的 div 携带 aria-expanded）

**现象：** 折叠模式弹出菜单触发器为 `<div :class="ui.itemAbsolute" />`（`DropdownMenuTrigger` `as-child` 合并 `aria-expanded`/`aria-haspopup` 等），通用 `div` 上 `aria-expanded`/`aria-haspopup` 非法 → axe `aria-allowed-attr` 违规。

**修复：** 补 `role="button"` + `:aria-label="item.label"`（可访问名称 + aria 属性合法化；触发器的 `aria-controls` 经 3.1 修复后为合法 ID）。

**验证（测试驱动）：** 「has no a11y violations in the collapsed state」（axe 0 违规）。

### 3.5 Minor — D1-12 测试时序：`aria-controls` 首帧未就绪

**现象：** `aria-controls` 由 content 组件 setup 中 `initContentId()` 初始化（`soybean-collapsible-content-{useId()}`）；trigger 首帧渲染时 ID 尚未生成，spec 断言 `aria-controls` 为空。

**处理：** 属组件生命周期时序（trigger 先于 content 渲染，Radix 同款模式），非缺陷——spec 断言前补 `await nextTick()`（×2）等待 content setup 完成。调试打印确认两次 nextTick 后 `aria-controls="soybean-collapsible-content-v-0"`。

### 3.6 D2-11/D1-16 — 操作按钮 aria-label 本地化（13 语言包）

**处理：** [tree-menu-slot-compact.vue](../../packages/headless/src/components/tree-menu/tree-menu-slot-compact.vue) 原硬编码 `Open ${label} actions` → `useLocaleMessages()` 走新增语言包模板：

- [locale/types.ts](../../packages/headless/src/locale/types.ts) 新增 `LocaleTreeMenuMessages.openActions`（含 `{label}` 占位符文档）并注册进 `LocaleMessages`；
- 13 个语言包（en/zh-CN/zh-TW/ja/ko/es/fr/de/pt-BR/ru/ar/tr/id）统一新增 `treeMenu.openActions` 翻译（如 zh-CN `打开 {label} 的操作`、ar `فتح إجراءات {label}`）；
- [tree-menu-option-compact.vue](../../packages/headless/src/components/tree-menu/tree-menu-option-compact.vue) 消费 `messages.value.treeMenu.openActions.replace('{label}', item.label)`。

**验证（测试驱动）：** 「renders the item actions trigger with a localized aria-label」断言 `Open Design Engineering actions`。

### 3.7 D1-09 — 样式 recipe 死槽清理（subButton/subItem）

**处理：** [styles/tree-menu.ts](../../packages/ui/src/styles/tree-menu.ts) 6 档 size 变体中的 `subButton`（git 历史确认自文件创建即存在，从未在 `slots` 中声明、从未被任何组件消费）→ 全部移除；[types.ts](../../packages/headless/src/components/tree-menu/types.ts) `TreeMenuUiSlot` 中 `subButton`/`subItem`（均无样式变体且无消费点）→ 一并移除。`useTreeMenuUi()` 单槽调用无消费者受影响（无 `.subButton`/`.subItem` 引用，grep 核验）。

### 3.8 D7-11 — 单测覆盖不足（已重写 6 → 25 项）

**处理：** 重写 [tree-menu.spec.ts](../../packages/ui/test/specs/components/tree-menu.spec.ts)（原 6 项）至 **25 项**，全部通过：

```bash
✓ test/specs/components/tree-menu.spec.ts (25 tests) 291ms
```

> 覆盖组：**rendering 9 项**（紧凑结构/嵌套展开渲染/分组标签/top·bottom 插槽/链接项 anchor/item-leading·item-trailing 插槽/操作按钮本地化 aria-label/`as`/`asChild` 不泄漏）；**state 3 项**（defaultValue 激活/点击派发 update:modelValue/受控 modelValue）；**expand and collapse 4 项**（点击展开/二次点击折叠/受控 update:expanded/**折叠恢复 expanded 状态**——watch collapsed 回滚 backupExpanded）；**collapsed 1 项**（折叠弹出菜单渲染子级）；**disabled 2 项**（禁用阻止激活/禁用父项阻止展开）；**keyboard 3 项**（原生 BUTTON 断言/aria-expanded + aria-controls/aria-current 语义）；**accessibility 3 项**（展开态/折叠态/操作菜单 axe 0 违规）。

> 关键测试要点：① 折叠模式用例须 `dropdownMenuProps.open: true + portalProps.disabled: true` 使弹出菜单直接渲染进 body；② `aria-controls` 断言前须 `nextTick`（content setup 初始化 ID，见 3.5）；③ axe 用例经 `getA11yViolations`（禁 color-contrast 等环境相关规则），三项分别锁定 3.1–3.4 的修复；④ 折叠恢复用例用 `setProps({ collapsed })` 双向往返断言 `data-state` 与文本渲染。

### 3.9 D6 — 文档重构（4 节 → 8 节 Recommended structure）

**处理：** en/zh 文档重构为 8 节：概述（headless/styled 分离 + 三组受控/非受控 + 折叠模式 + 操作菜单）、用法、特性（9 条 bullet）、组件家族（`STreeMenu` + `TreeMenuCompact`/`TreeMenuRoot`/`TreeMenuOptionCompact`/`TreeMenuSlotCompact` + 7 个基础原语）、演示（01 Basic 导览）、API、说明（架构与对标差异：**8 能力 × 4 对标库矩阵** + 8 条注意事项）、常见问题（9 组：折叠侧边栏/弹出子菜单/操作菜单/受控激活展开/分组/链接项/图标徽标标签/禁用/aria-label 本地化）。中英文结构一一对应；Cautions 收录本轮修复要点（折叠隐藏 actions、`dropdownMenuProps.trigger` 切换、collapsed 暂存恢复展开、13 语言本地化、禁用语义、`data-soybean-tree-menu-*` 数据属性等）；对标表如实标注 Naive UI/Ant Design 的部分支持项。

---

## 四、架构与模式要点

### 共享组件 bug 必须以「影响面」定位——`aria-controls` 泄漏是 dropdown-menu 系通病

`ariaControls` 返回 shallowRef 而非 `.value`，此类「脚本 computed 返回值中的 ref 不会被模板解包」的陷阱不会报错、只在展开态以 `[object Object]` 形式泄漏到 DOM。修复优先级高于本组件缺陷：任何复用 `DropdownMenuTrigger` 的组件（dropdown-menu/context-menu/table 操作列等）都受影响。**核查模式：** 审计共享底层组件时，先 grep 其下游复用面再评估严重度。

### Compact 组合的「内部节点归属」决定 a11y 树结构

操作菜单的视觉设计是绝对定位覆盖（`itemAction`），但 DOM 归属在 `TreeMenuButton` 内部 → 按钮套按钮。`nested-interactive` 类违规的修复不是改样式而是**重排 DOM 归属**：把操作触发器上移为 `.item` 内兄弟节点。Compact 聚合组件在 headless 层编排时，**凡视觉上浮层的节点（操作/弹出触发器）都应作为兄弟节点而非按钮内容**——这是「数据驱动组合」下 a11y 结构卫生的第一原则。

### 禁用语义必须沿「可交互路径」透传

`TreeMenuOptionCompact` 作为数据驱动聚合，`disabled` 定义在 `item` 数据上，但落到 DOM 需要 `TreeMenuButton → Button → Primitive` 逐层透传。任何一层透传缺失都会静默丢失禁用语义（无报错、仅 `data-disabled`/`disabled` 缺失）。**审计模式：** 对数据驱动组件，用 `findAll('[data-…-button]')[i].attributes('data-disabled')` 断言逐节点禁用态，可一次覆盖全部透传路径。

---

## 五、变更文件清单

| 文件                                                                                      | 变更类型                                                                                                                                                                                                                |
| :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/headless/src/components/dropdown-menu/dropdown-menu-trigger.vue`                | **Major 修复**（D7-01 共享组件缺陷）：`ariaControls` 返回 `popupId` → `popupId.value`（消除 `aria-controls="[object Object]"`，惠及全部 dropdown-menu 系）                                                              |
| `packages/headless/src/components/tree-menu/tree-menu-option-compact.vue`                 | **Major 修复**（D1-08/D7-01）：操作菜单迁出 `TreeMenuButton`（叶子分支兄弟节点 + 父项 `#extra` 插槽）；三处 `TreeMenuButton` 补 `:disabled`；折叠触发器补 `role="button"` + `aria-label`；`item.actions ?? []` 类型兜底 |
| `packages/headless/src/components/tree-menu/tree-menu-slot-compact.vue`                   | **Major 修复**（D1-08/D7-01）：移除嵌套操作菜单块与 `Button`/`DropdownMenuCompact`/`useLocaleMessages` 死 import/computed                                                                                               |
| `packages/headless/src/components/tree-menu/types.ts`                                     | **清理**（D1-09）：`TreeMenuUiSlot` 移除 `subButton`/`subItem` 死槽；**本地化**（D2-11）：`LocaleTreeMenuMessages.openActions` 类型（见 locale/types.ts）                                                               |
| `packages/headless/src/locale/types.ts`                                                   | **本地化**（D2-11）：新增 `LocaleTreeMenuMessages.openActions`（`{label}` 占位符）并注册进 `LocaleMessages`                                                                                                             |
| `packages/headless/src/locale/langs/{en,zh-CN,zh-TW,ja,ko,es,fr,de,pt-BR,ru,ar,tr,id}.ts` | **本地化**（D2-11）：13 语言包统一新增 `treeMenu.openActions` 翻译                                                                                                                                                      |
| `packages/ui/src/styles/tree-menu.ts`                                                     | **清理**（D1-09）：6 档 size 变体移除死槽 `subButton`（从未被消费）                                                                                                                                                     |
| `packages/ui/test/specs/components/tree-menu.spec.ts`                                     | 单测 6 → 25 项重写扩展（rendering/state/expand-collapse/collapsed/disabled/keyboard/axe 三态 0 违规）                                                                                                                   |
| `apps/docs/src/docs/en/components/tree-menu.md`                                           | 文档 4 节 → 8 节 Recommended structure（Component family + 8 能力 × 4 对标库矩阵 + Cautions 8 条 + FAQ 9 组）                                                                                                           |
| `apps/docs/src/docs/zh-CN/components/tree-menu.md`                                        | 与 en 一一对应的 8 节中文化版本                                                                                                                                                                                         |
| `docs/check.md`                                                                           | C63 行 7 维度 ⏳ → ✅；4.12 批次 11 记录表追加 C63 行 + 批次合计（1 单元，单测 6 → 25 项）                                                                                                                              |
| `docs/check-reports/C63-tree-menu.md`                                                     | **新建** 本审计报告                                                                                                                                                                                                     |

## 六、验证命令

```bash
pnpm vitest run --root packages/ui test/specs/components/tree-menu.spec.ts   # 25/25 全绿
pnpm vitest run --root packages/ui                                          # 全量 109 文件 1636/1636 全绿（D7-09 回归）
pnpm typecheck                                                               # 全仓 vue-tsc / tsc 全绿（headless/ui/docs/playground）
pnpm lint                                                                    # 0 errors / 0 warnings
```

## 七、遗留增强项（统一排期，非阻塞）

| 增强项                     | 对标依据 | 说明                                                                                                                                                                                                                                                                      |
| :------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 折叠弹出触发器键盘可达性   | 自研标准 | 折叠模式弹出菜单触发器为 `role="button"` 的绝对定位覆盖层（点击可达、axe 0 违规），但不可 Tab 聚焦；建议后续改为原生 `<button>` + 样式复位（`bg-transparent`/`border-none`/`p-0`）以获得完整键盘操作（Enter/Space 打开弹出菜单），本轮以 axe 静态检查为验收线，非 Blocker |
| `tree-menu` 独立浏览器 e2e | 自研标准 | 按 check.md 2.3.4 清单，`tree-menu` 属键盘导航类（D7-19）且含折叠弹出菜单，须补浏览器 e2e（真实 Tab/箭头序列 + 折叠往返 + axe），本轮以 happy-dom 单测 + axe 静态检查替代，非 Blocker                                                                                     |
| 演示示例扩展               | D6 标准  | 当前仅 01 Basic；建议补充「折叠往返」「操作菜单」「禁用项」独立 demo 与 docs 演示导览一一对应（`data.ts` 已含 actions/badge/tag/链接项数据）                                                                                                                              |
